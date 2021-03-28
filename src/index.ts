import { ApolloServer } from "apollo-server-express";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { lexicographicSortSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import next from "next";
import { createContext, prisma } from "./context";
import { getSchema } from "./schema";
import {
  checkMissingEnvVars,
  IS_DEV,
  NEXT_PUBLIC_SHOPIFY_API_KEY,
  PORT,
  SHOPIFY_API_SCOPES,
  SHOPIFY_API_SECRET,
  SHOPIFY_APP_URL,
} from "./setup";
import {
  setShopOriginCookie,
  validateHMAC,
  validateHostname,
  validateWebhookHMAC,
} from "./utils";
import { configureWebhooks, WEBHOOKS } from "./webhooks";
import {
  customersDataRequest,
  customersRedact,
  shopRedact,
} from "./webhooks/handlers";
dotenv.config();

const port = PORT ? parseInt(PORT, 10) : 3000;
const nextApp = next({ dev: IS_DEV });
const handle = nextApp.getRequestHandler();

(async () => {
  checkMissingEnvVars();
  try {
    await nextApp.prepare();
    const schema = await getSchema();

    const server = new ApolloServer({
      introspection: IS_DEV,
      playground: IS_DEV,
      schema: applyMiddleware(lexicographicSortSchema(schema)),
      context: async ({ req, res }) => await createContext(req, res),
    });
    const app = express();

    server.applyMiddleware({ app });

    app.use(express.raw({ type: "application/json" }));

    // Webhooks
    WEBHOOKS.forEach((hook) => {
      app.post(`/webhook/${hook.topic}`, validateWebhookHMAC, hook.fn);
    });
    app.post("/webhook/customers/redact", validateWebhookHMAC, customersRedact);
    app.post("/webhook/shop/redact", validateWebhookHMAC, shopRedact);
    app.post(
      "/webhook/customers/data_request",
      validateWebhookHMAC,
      customersDataRequest,
    );

    app.get("/", validateHMAC, async (req, res) => {
      const { shop } = req.query as any;

      const store = await prisma.store.findUnique({ where: { shop } });

      if (store && store.isInstalled) {
        setShopOriginCookie(res, shop);
        return handle(req, res);
      }

      const nonce = await prisma.nonce.create({ data: {} });

      res.redirect(
        `https://${req.query.shop}/admin/oauth/authorize?client_id=${NEXT_PUBLIC_SHOPIFY_API_KEY}&scope=${SHOPIFY_API_SCOPES}&redirect_uri=${SHOPIFY_APP_URL}/auth/callback&state=${nonce.id}`,
      );
    });

    app.get(
      "/auth/callback",
      validateHMAC,
      validateHostname,
      async (req, res) => {
        const { state, code, shop } = req.query as any;

        const nonce = await prisma.nonce.findUnique({ where: { id: state } });

        if (
          !nonce ||
          nonce.createdAt.getTime() + 5 * 60 * 1000 <= new Date().getTime()
        )
          throw new Error("Nonce validation failed");

        let accessToken;
        try {
          const resp = await axios.post(
            `https://${shop}/admin/oauth/access_token`,
            {
              client_id: NEXT_PUBLIC_SHOPIFY_API_KEY,
              client_secret: SHOPIFY_API_SECRET,
              code,
            },
          );

          accessToken = resp.data.access_token;
        } catch (e) {
          console.error(e);
        }

        if (!accessToken) throw new Error("Auth error");

        const store = await prisma.store.findUnique({ where: { shop } });

        if (!store || !store.isInstalled) {
          const newStore = await prisma.store.upsert({
            where: { shop },
            create: { shop, accessToken, isInstalled: true },
            update: { accessToken, isInstalled: true },
          });

          await prisma.nonce.delete({ where: { id: nonce.id } });
          await configureWebhooks(newStore);
        }

        res.redirect(
          `https://${shop}/admin/apps/${NEXT_PUBLIC_SHOPIFY_API_KEY}`,
        );
      },
    );

    app.all("*", (req, res) => handle(req, res));

    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

import { Store } from ".prisma/client";
import axios from "axios";
import { SHOPIFY_APP_URL } from "../setup";
import {
  appUninstalled,
  productCreate,
  productDelete,
  productUpdate,
} from "./handlers";

export const WEBHOOKS = [
  { topic: "app/uninstalled", fn: appUninstalled },
  { topic: "products/create", fn: productCreate },
  { topic: "products/update", fn: productUpdate },
  { topic: "products/delete", fn: productDelete },
];

export const configureWebhooks = async (store: Store) => {
  try {
    const responses = await Promise.all(
      WEBHOOKS.map((hook) =>
        axios.post(
          `https://${store.shop}/admin/api/2021-01/webhooks.json`,
          {
            webhook: {
              topic: hook.topic,
              address: `${SHOPIFY_APP_URL}/webhook/${hook.topic}`,
              format: "json",
            },
          },
          {
            headers: {
              "X-Shopify-Access-Token": store.accessToken,
            },
          },
        ),
      ),
    );
    responses.forEach((r) =>
      console.log(
        `Webhook ${r.data?.webhook.topic} registered for ${store.shop}`,
      ),
    );
  } catch (e) {
    console.log("Failed registering webhook:");
    throw new Error(e);
  }
};

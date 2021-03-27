import { JsonFileLoader } from "@graphql-tools/json-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { stitchSchemas } from "@graphql-tools/stitch";
import { wrapSchema } from "@graphql-tools/wrap";
import axios from "axios";
import { print } from "graphql";
import { makeSchema } from "nexus";
import path from "path";
import * as types from "./modules";
import { IS_DEV } from "./setup";

export const executor = async ({ document, variables, context }: any) => {
  const query = print(document);
  try {
    const fetchResult = await axios.post(
      `https://${context.store.shop}/admin/api/2021-01/graphql.json`,
      {
        query,
        variables,
      },
      {
        headers: {
          "X-Shopify-Access-Token": context.store.accessToken,
        },
      },
    );
    return fetchResult.data;
  } catch (e) {
    throw new Error(e.response.data.errors);
  }
};

const getShopifyAdminSchema = async () =>
  wrapSchema({
    schema: await loadSchema(
      path.join(process.cwd(), "codegen/generated/shopify-admin-schema.json"),
      {
        loaders: [new JsonFileLoader()],
      },
    ),
    executor,
  });

const schema = makeSchema({
  types,
  contextType: {
    module: path.join(process.cwd(), "src/context.ts"),
    export: "Context",
  },
  outputs: {
    schema: path.join(process.cwd(), "codegen/generated/schema.graphql"),
    typegen: path.join(process.cwd(), "codegen/generated/nexus.d.ts"),
  },
  nonNullDefaults: { output: true },
  shouldGenerateArtifacts: IS_DEV,
});

export const getSchema = async () =>
  stitchSchemas({
    subschemas: [schema, await getShopifyAdminSchema()],
  });

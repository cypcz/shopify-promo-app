import { makeSchema } from "nexus";
import path from "path";
import * as types from "./modules";

export const schema = makeSchema({
  types,
  /*   outputs: {
    schema: path.join(__dirname, "../generated/schema.graphql"),
    typegen: path.join(__dirname, "../generated/nexus.ts"),
  }, */
  contextType: {
    module: path.join(__dirname, "./context.ts"),
    export: "Context",
  },
  nonNullDefaults: { output: true },
  shouldGenerateArtifacts: true, // false for prod
});

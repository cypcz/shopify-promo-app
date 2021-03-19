import { list, queryField } from "nexus";

export const promos = queryField("promos", {
  type: list("Promo"),
  resolve: (_root, _args, _ctx) => {
    return [{ id: "2", name: "test code" }];
  },
});

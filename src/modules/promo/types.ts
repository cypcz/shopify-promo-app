import { objectType } from "nexus";

export const Promo = objectType({
  name: "Promo",
  definition(t) {
    t.id("id");
    t.string("name");
  },
});

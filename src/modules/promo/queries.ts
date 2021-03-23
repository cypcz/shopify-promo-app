import { idArg, list, nonNull, nullable, queryField } from "nexus";

export const promos = queryField("promos", {
  type: list("Promo"),
  resolve: (_root, _args, { prisma }) => {
    return prisma.promo.findMany();
  },
});

export const promo = queryField("promo", {
  type: nullable("Promo"),
  args: { id: nonNull(idArg()) },
  resolve: (_root, { id }, { prisma }) => {
    return prisma.promo.findUnique({ where: { id } });
  },
});

import { arg, idArg, mutationField, nonNull, stringArg } from "nexus";

export const upsertPromo = mutationField("upsertPromo", {
  type: "Promo",
  args: {
    id: idArg(),
    code: nonNull(stringArg()),
    status: nonNull(arg({ type: "PromoStatus" })),
    discountType: nonNull(arg({ type: "PromoDiscountType" })),
    discountDefinition: nonNull(stringArg()),
  },
  resolve: (_root, args, { prisma, store }) => {
    const { id, ...argsRest } = args;
    return prisma.promo.upsert({
      where: { id: id || "" },
      create: { ...argsRest, store: { connect: { shop: store.shop } } },
      update: argsRest,
    });
  },
});

export const deletePromo = mutationField("deletePromo", {
  type: "Promo",
  args: { id: nonNull(idArg()) },
  resolve: (_root, { id }, { prisma }) => {
    return prisma.promo.delete({
      where: { id },
    });
  },
});

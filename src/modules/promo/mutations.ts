import { idArg, mutationField, nonNull, stringArg } from "nexus";

export const upsertPromo = mutationField("upsertPromo", {
  type: "Promo",
  args: { id: idArg(), code: nonNull(stringArg()) },
  resolve: (_root, { id, code }, { prisma }) => {
    return prisma.promo.upsert({
      where: { id: id || "" },
      create: { code },
      update: { code },
    });
  },
});

export const deletePromo = mutationField("deletePromo", {
  type: "Promo",
  args: { id: nonNull(idArg()) },
  resolve: (_root, { id }, { prisma }) => {
    return prisma.promo.delete({
      where: { id: id || "" },
    });
  },
});

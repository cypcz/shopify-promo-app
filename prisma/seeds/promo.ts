import {
  Prisma,
  PrismaClient,
  PromoDiscountType,
  PromoStatus,
} from "@prisma/client";

export const PROMO_1_ID = "promo-1";
export const PROMO_2_ID = "promo-2";

export const PROMO_1_CODE = "PROMO1CODE";
export const PROMO_2_CODE = "PROMO2CODE";

const promos: Prisma.PromoCreateInput[] = [
  {
    id: PROMO_1_ID,
    code: PROMO_1_CODE,
    discountType: PromoDiscountType.ABSOLUTE,
    discountDefinition: "10",
    status: PromoStatus.ACTIVE,
    store: { connect: { shop: "lams-test-app-store.myshopify.com" } },
  },
  {
    id: PROMO_2_ID,
    code: PROMO_2_CODE,
    discountType: PromoDiscountType.RELATIVE,
    discountDefinition: "20",
    status: PromoStatus.ACTIVE,
    store: { connect: { shop: "lams-test-app-store.myshopify.com" } },
  },
];

export async function wipePromos(prisma: PrismaClient) {
  await prisma.promo.deleteMany({});
}

export async function createPromos(prisma: PrismaClient) {
  for (const promo of promos) {
    console.info(`upserting promo id ${promo.id} with code ${promo.code}`);
    await prisma.promo.upsert({
      where: { id: promo.id },
      create: promo,
      update: promo,
    });
  }
}

import {
  PromoDiscountType as PrismaPromoDiscountType,
  PromoStatus as PrismaPromoStatus,
} from "@prisma/client";
import { enumType, objectType } from "nexus";

export const Promo = objectType({
  name: "Promo",
  definition(t) {
    t.id("id");
    t.string("code");
    t.field("status", { type: "PromoStatus" });
    t.field("discountType", { type: "PromoDiscountType" });
    t.string("discountDefinition");
  },
});

export const PromoStatus = enumType({
  name: "PromoStatus",
  members: Object.values(PrismaPromoStatus),
});

export const PromoDiscountType = enumType({
  name: "PromoDiscountType",
  members: Object.values(PrismaPromoDiscountType),
});

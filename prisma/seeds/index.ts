import { PrismaClient } from "@prisma/client";
import { createPromos } from "./promo";

export const prisma = new PrismaClient();

const seed = async () => {
  await createPromos(prisma);
};

seed()
  .catch((err: Error) => {
    throw err;
  })
  .finally(() => {
    prisma.$disconnect();
  });

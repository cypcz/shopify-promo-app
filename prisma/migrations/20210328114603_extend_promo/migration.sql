/*
  Warnings:

  - Added the required column `status` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountType` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountDefinition` to the `Promo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Promo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromoStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "PromoDiscountType" AS ENUM ('ABSOLUTE', 'RELATIVE');

-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "status" "PromoStatus" NOT NULL,
ADD COLUMN     "discountType" "PromoDiscountType" NOT NULL,
ADD COLUMN     "discountDefinition" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Promo" ADD FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The `descritor` column on the `AutoCheckUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AutoCheckUser" DROP COLUMN "descritor",
ADD COLUMN     "descritor" JSONB;

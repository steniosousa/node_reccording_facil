-- CreateEnum
CREATE TYPE "ReasonVacationType" AS ENUM ('FERIAS', 'EXIT', 'OBSERVATION');

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

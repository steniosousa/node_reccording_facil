-- CreateTable
CREATE TABLE "AutoCheckUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentedAt" TIMESTAMP(3),
    "photo" TEXT,

    CONSTRAINT "AutoCheckUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoCheckUser_plate_key" ON "AutoCheckUser"("plate");

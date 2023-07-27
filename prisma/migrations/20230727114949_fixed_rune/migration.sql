-- CreateTable
CREATE TABLE "RunesPrice" (
    "id" SERIAL NOT NULL,
    "id_effect" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RunesPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RunesPrice_id_key" ON "RunesPrice"("id");

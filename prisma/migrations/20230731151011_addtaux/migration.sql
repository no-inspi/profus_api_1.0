-- CreateTable
CREATE TABLE "TauxItemBrisage" (
    "id" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,
    "taux" INTEGER NOT NULL,
    "id_server" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TauxItemBrisage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TauxItemBrisage_id_key" ON "TauxItemBrisage"("id");

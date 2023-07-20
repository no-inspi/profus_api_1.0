/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pseudo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `pseudo` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_pseudo_key` ON `User`(`pseudo`);

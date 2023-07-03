/*
  Warnings:

  - You are about to drop the column `Image` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `composition` DROP FOREIGN KEY `Composition_id_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `Image`,
    ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `composition` ADD COLUMN `categoryId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Composition` ADD CONSTRAINT `Composition_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

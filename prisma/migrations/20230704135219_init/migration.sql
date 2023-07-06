/*
  Warnings:

  - You are about to drop the column `category` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `composition` on the `ingredients` table. All the data in the column will be lost.
  - Added the required column `milliliter` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredients` DROP COLUMN `category`,
    DROP COLUMN `composition`,
    ADD COLUMN `compositionId` INTEGER NULL,
    ADD COLUMN `milliliter` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_CategoryToIngredients` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToIngredients_AB_unique`(`A`, `B`),
    INDEX `_CategoryToIngredients_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredients` ADD CONSTRAINT `Ingredients_compositionId_fkey` FOREIGN KEY (`compositionId`) REFERENCES `Composition`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToIngredients` ADD CONSTRAINT `_CategoryToIngredients_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToIngredients` ADD CONSTRAINT `_CategoryToIngredients_B_fkey` FOREIGN KEY (`B`) REFERENCES `Ingredients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `ingredients` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `image` LONGBLOB NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `milliliter` INTEGER NULL;

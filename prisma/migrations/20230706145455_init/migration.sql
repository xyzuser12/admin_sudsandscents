/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Session_adminId_fkey` ON `session`;

-- CreateIndex
CREATE UNIQUE INDEX `Address_user_email_key` ON `Address`(`user_email`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

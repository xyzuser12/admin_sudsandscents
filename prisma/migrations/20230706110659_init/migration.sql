/*
  Warnings:

  - You are about to drop the column `adminId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_adminId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `adminId`;

-- DropTable
DROP TABLE `admin`;

/*
  Warnings:

  - You are about to drop the column `billingDay` on the `Enrollments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Enrollments` DROP COLUMN `billingDay`;

-- AlterTable
ALTER TABLE `Students` ADD COLUMN `billingDay` VARCHAR(191) NOT NULL DEFAULT '5';

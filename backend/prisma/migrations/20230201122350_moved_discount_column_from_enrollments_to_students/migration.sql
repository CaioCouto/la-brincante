/*
  Warnings:

  - You are about to drop the column `discount` on the `Enrollments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Enrollments` DROP COLUMN `discount`;

-- AlterTable
ALTER TABLE `Students` ADD COLUMN `discount` INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - Made the column `publishingId` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seriesId` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_publishingId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_seriesId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `publishingId` INTEGER NOT NULL,
    MODIFY `categoryId` INTEGER NOT NULL,
    MODIFY `authorId` INTEGER NOT NULL,
    MODIFY `seriesId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_publishingId_fkey` FOREIGN KEY (`publishingId`) REFERENCES `Publishing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

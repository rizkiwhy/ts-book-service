/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `BookGenre` DROP FOREIGN KEY `BookGenre_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `BookGenre` DROP FOREIGN KEY `BookGenre_genreId_fkey`;

-- DropTable
DROP TABLE `Author`;

-- DropTable
DROP TABLE `Book`;

-- DropTable
DROP TABLE `BookGenre`;

-- DropTable
DROP TABLE `Genre`;

-- CreateTable
CREATE TABLE `author` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `publihedYear` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_genre` (
    `bookId` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bookId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_genre` ADD CONSTRAINT `book_genre_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_genre` ADD CONSTRAINT `book_genre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

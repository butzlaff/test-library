/*
  Warnings:

  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "authors";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Authors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birth" DATETIME NOT NULL,
    "bio" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataBookId" INTEGER NOT NULL,
    CONSTRAINT "Authors_dataBookId_fkey" FOREIGN KEY ("dataBookId") REFERENCES "DataBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DataBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "launchDate" DATETIME NOT NULL,
    "category" TEXT NOT NULL
);

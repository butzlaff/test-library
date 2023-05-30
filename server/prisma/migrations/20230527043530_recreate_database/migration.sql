-- CreateTable
CREATE TABLE "Authors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birth" DATETIME NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DataBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "launchDate" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_AuthorsToDataBooks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AuthorsToDataBooks_A_fkey" FOREIGN KEY ("A") REFERENCES "Authors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorsToDataBooks_B_fkey" FOREIGN KEY ("B") REFERENCES "DataBook" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorsToDataBooks_AB_unique" ON "_AuthorsToDataBooks"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorsToDataBooks_B_index" ON "_AuthorsToDataBooks"("B");

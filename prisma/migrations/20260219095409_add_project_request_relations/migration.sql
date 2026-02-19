/*
  Warnings:

  - You are about to drop the column `title` on the `ProjectRequest` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProjectRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectRequest" ("createdAt", "description", "id") SELECT "createdAt", "description", "id" FROM "ProjectRequest";
DROP TABLE "ProjectRequest";
ALTER TABLE "new_ProjectRequest" RENAME TO "ProjectRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

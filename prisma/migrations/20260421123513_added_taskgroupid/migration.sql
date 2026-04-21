/*
  Warnings:

  - Added the required column `taskGroupId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskGroupId" INTEGER NOT NULL;

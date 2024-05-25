/*
  Warnings:

  - You are about to drop the `NoticiaMostrada` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NoticiaMostrada" DROP CONSTRAINT "NoticiaMostrada_noticiaId_fkey";

-- DropTable
DROP TABLE "NoticiaMostrada";

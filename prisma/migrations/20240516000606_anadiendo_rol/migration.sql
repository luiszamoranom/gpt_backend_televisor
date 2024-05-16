/*
  Warnings:

  - A unique constraint covering the columns `[rol]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "rol" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_rol_key" ON "Usuario"("rol");

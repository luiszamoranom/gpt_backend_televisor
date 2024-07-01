/*
  Warnings:

  - The `rol` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[nombre]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoRol" AS ENUM ('Administrador', 'Registrador');

-- DropIndex
DROP INDEX "Usuario_rol_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rol",
ADD COLUMN     "rol" "TipoRol" NOT NULL DEFAULT 'Registrador';

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

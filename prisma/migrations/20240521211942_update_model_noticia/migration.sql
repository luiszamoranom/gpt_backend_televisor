/*
  Warnings:

  - You are about to drop the `_CategoriaToNoticia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoriaToNoticia" DROP CONSTRAINT "_CategoriaToNoticia_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriaToNoticia" DROP CONSTRAINT "_CategoriaToNoticia_B_fkey";

-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "categoriaId" TEXT NOT NULL DEFAULT 'Sin categoría';

-- DropTable
DROP TABLE "_CategoriaToNoticia";

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToNoticia" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToNoticia_AB_unique" ON "_CategoriaToNoticia"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToNoticia_B_index" ON "_CategoriaToNoticia"("B");

-- AddForeignKey
ALTER TABLE "_CategoriaToNoticia" ADD CONSTRAINT "_CategoriaToNoticia_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToNoticia" ADD CONSTRAINT "_CategoriaToNoticia_B_fkey" FOREIGN KEY ("B") REFERENCES "Noticia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

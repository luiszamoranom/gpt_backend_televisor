-- CreateTable
CREATE TABLE "NoticiaMostrada" (
    "id" TEXT NOT NULL,
    "noticiaId" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoticiaMostrada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoticiaMostrada_noticiaId_key" ON "NoticiaMostrada"("noticiaId");

-- AddForeignKey
ALTER TABLE "NoticiaMostrada" ADD CONSTRAINT "NoticiaMostrada_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

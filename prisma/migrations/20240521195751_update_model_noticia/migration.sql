-- CreateEnum
CREATE TYPE "TipoNoticia" AS ENUM ('Normal', 'Publicacion', 'ConImagen', 'ConVideo', 'ConUrl');

-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "contenido" VARCHAR(1024),
ADD COLUMN     "duracion" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "habilitado" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "multimedia" TEXT,
ADD COLUMN     "multimedia_url" TEXT,
ADD COLUMN     "tipo" "TipoNoticia" NOT NULL DEFAULT 'Normal',
ADD COLUMN     "titulo" VARCHAR(50) NOT NULL DEFAULT 'Titulo por defecto';

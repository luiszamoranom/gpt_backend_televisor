/*
  Warnings:

  - The values [ConImagen,ConVideo,ConUrl] on the enum `TipoNoticia` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoNoticia_new" AS ENUM ('Normal', 'Publicacion', 'Multimedia', 'Url');
ALTER TABLE "Noticia" ALTER COLUMN "tipo" DROP DEFAULT;
ALTER TABLE "Noticia" ALTER COLUMN "tipo" TYPE "TipoNoticia_new" USING ("tipo"::text::"TipoNoticia_new");
ALTER TYPE "TipoNoticia" RENAME TO "TipoNoticia_old";
ALTER TYPE "TipoNoticia_new" RENAME TO "TipoNoticia";
DROP TYPE "TipoNoticia_old";
ALTER TABLE "Noticia" ALTER COLUMN "tipo" SET DEFAULT 'Normal';
COMMIT;

-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "extension" TEXT;

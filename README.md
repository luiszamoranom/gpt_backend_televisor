# VARIABLES DE ENTORNOS REQUERIDAS

- **JWT_SECRET_KEY:** Disponible en el canal de discord #recursos del servidor del profesor.
- **DATABASE_URL:** "postgresql://[NOMBRE-USUARIO]:[CONTRASENA]@localhost:5432/[NOMBRE-BD]?schema=public"

# PARA TENER EL SCHEMA DE LA APP EN TU BD LOCAL:

prisma db pull

# IDE para interactuar con la BD

npx prisma studio

import { Router } from "express";
import {PrismaClient} from "@prisma/client";
import Joi from "joi";

const router = Router();
const prisma = new PrismaClient();

// VIOLA UNIQUE
async function violaUniqueNombre(nombreUsuario: string): Promise<boolean> {
    const existePorNombre = await prisma.usuario.findUnique({ where: { nombreUsuario } });
    return  !!existePorNombre;
}

async function violaUniqueEmial(email: string): Promise<boolean> {
    const existePorEmail = await prisma.usuario.findUnique({ where: { email } });
    return !!existePorEmail; // Devuelve true si existingUser es verdadero (no nulo), false en caso contrario
}

// OBTENER TODOS LOS USUARIOS
router.get('/', async (req:any, res:any) => {
    const usuarios = await prisma.usuario.findMany()
    if(usuarios.length == 0 ){
        return res.status(204).end()
    }
    return res.status(200).send(usuarios)
})



const schemaBuscarPorId = Joi.object({
    id: Joi.string().required().uuid()
})

// OBTENER POR ID
router.get('/', async (req:any, res:any) => {
    const id = req.query.rut as string;
    const { error } = schemaBuscarPorId.validate(req.params);

    if (error) {
        return res.status(400)
            .end()
    }

    const usuarioEncontrado = await prisma.usuario.findFirst({
        where: {
            id: id
        }
    })

    if(usuarioEncontrado == null){
        return res.status(204).end()
    }
    return res.status(200).send(usuarioEncontrado)
})


router.get('/habilitados', async (req:any, res:any) => {
    try {
        const usuarioEncontrado = await prisma.usuario.findMany({
            where: {
                habilitado: true
            }
        });

        if (!usuarioEncontrado.length) {
            return res.status(204).end();
        }

        return res.status(200).json(usuarioEncontrado);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/deshabilitados', async (req:any, res:any) => {
    try {
        const usuarioEncontrado = await prisma.usuario.findMany({
            where: {
                habilitado: false
            }
        });

        if (!usuarioEncontrado.length) {
            return res.status(204).end();
        }

        return res.status(200).json(usuarioEncontrado);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
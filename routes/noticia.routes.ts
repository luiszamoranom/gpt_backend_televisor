import { Router } from "express";
import {PrismaClient} from "@prisma/client";
import Joi from "joi";

const router = Router();
const prisma = new PrismaClient();


const schemaPostNoticiaNormal = Joi.object({
    duracion: Joi.number().min(1).max(300).required().messages({
        'number.min': 'duracion, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'duracion, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    titulo: Joi.string().required().min(5).max(50).messages({
        'any.required': 'titulo, campo que registra el titulo de una noticia es obligatorio',
        'string.empty': 'titulo, campo que registra el titulo de una noticia, no puede estar vacio',
        'string.min': 'titulo, campo que registra el titulo de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'titulo, campo que registra el titulo de una noticia, debe tener un largo máximo de 50 caracteres',
    }),
    contenido: Joi.string().required().min(5).max(50).messages({
        'string.min': 'contenido, campo que registra el contenido de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'contenido, campo que registra el contenido de una noticia, debe tener un largo máximo de 1024 caracteres',
    }),
    tipo: Joi.string().pattern(/^(Normal)$/).required().messages({
        'any.required': 'tipo es obligatorio',
        'string.empty': 'el tipo no puede estar vacío',
        'string.pattern.base': 'El tipo debe ser Normal.'
    }),
    multimedia: Joi.string().base64().required().messages({
        'any.required': 'multimedia, campo que registra el archivo de la noticia, es obligatorio',
        'string.empty': 'multimedia, campo que registra el archivo de la noticia, no puede estar vacio',
    }),
    extension: Joi.string().pattern(/^(png|jpg|jpeg|mp4)$/).required().min(2).max(4).messages({
        'any.required': 'extension, campo que registra la extension del archivo, es obligatorio',
        'string.empty': 'extension, campo que registra la extension del archivo, no puede estar vacio',
        'string.pattern.base': 'Los tipos disponibles son: png,jpg,jpeg y mp4.'
    }),
});

const schemaPostNoticiaMultimedia = Joi.object({
    duracion: Joi.number().min(1).max(300).required().messages({
        'number.min': 'duracion, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'duracion, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    titulo: Joi.string().required().min(5).max(50).messages({
        'any.required': 'titulo, campo que registra el titulo de una noticia es obligatorio',
        'string.empty': 'titulo, campo que registra el titulo de una noticia, no puede estar vacio',
        'string.min': 'titulo, campo que registra el titulo de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'titulo, campo que registra el titulo de una noticia, debe tener un largo máximo de 50 caracteres',
    }),
    tipo: Joi.string().pattern(/^(Multimedia)$/).required().messages({
        'any.required': 'tipo es obligatorio',
        'string.empty': 'el tipo no puede estar vacío',
        'string.pattern.base': 'El tipo debe ser Multimedia.'
    }),
    multimedia: Joi.string().base64().required().messages({
        'any.required': 'multimedia, campo que registra el archivo de la noticia, es obligatorio',
        'string.empty': 'multimedia, campo que registra el archivo de la noticia, no puede estar vacio',
    }),
    extension: Joi.string().pattern(/^(png|jpg|jpeg|mp4)$/).required().min(2).max(4).messages({
        'any.required': 'extension, campo que registra la extension del archivo, es obligatorio',
        'string.empty': 'extension, campo que registra la extension del archivo, no puede estar vacio',
        'string.pattern.base': 'Los tipos disponibles son: png,jpg,jpeg y mp4.'
    }),
});

const schemaPostNoticiaPublicacion = Joi.object({
    duracion: Joi.number().min(1).max(300).required().messages({
        'number.min': 'duracion, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'duracion, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    titulo: Joi.string().required().min(5).max(50).messages({
        'any.required': 'titulo, campo que registra el titulo de una noticia es obligatorio',
        'string.empty': 'titulo, campo que registra el titulo de una noticia, no puede estar vacio',
        'string.min': 'titulo, campo que registra el titulo de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'titulo, campo que registra el titulo de una noticia, debe tener un largo máximo de 50 caracteres',
    }),
    tipo: Joi.string().pattern(/^(Publicacion)$/).required().messages({
        'any.required': 'tipo es obligatorio',
        'string.empty': 'el tipo no puede estar vacío',
        'string.pattern.base': 'El tipo debe ser Publicacion'
    })
});

const schemaPostNoticiaUrl = Joi.object({
    duracion: Joi.number().min(1).max(300).required().messages({
        'number.min': 'duracion, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'duracion, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    titulo: Joi.string().required().min(5).max(50).messages({
        'any.required': 'titulo, campo que registra el titulo de una noticia es obligatorio',
        'string.empty': 'titulo, campo que registra el titulo de una noticia, no puede estar vacio',
        'string.min': 'titulo, campo que registra el titulo de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'titulo, campo que registra el titulo de una noticia, debe tener un largo máximo de 50 caracteres',
    }),
    tipo: Joi.string().pattern(/^(Url)$/).required().messages({
        'any.required': 'tipo es obligatorio',
        'string.empty': 'el tipo no puede estar vacío',
        'string.pattern.base': 'El tipo debe ser Url.'
    }),
    multimedia_url: Joi.string().required().messages({
        'number.min': 'multimedia_url, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'multimedia_url, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    })
});


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
router.get('/', async (req, res) => {
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
router.get('/', async (req,res) => {
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


router.get('/habilitados', async (req, res) => {
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

router.get('/deshabilitados', async (req, res) => {
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

router.post('/noticia-normal', async (req,res) => {

});

export default router;
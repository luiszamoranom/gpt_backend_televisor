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
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
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
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
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
    contenido: Joi.string().required().min(5).max(50).messages({
        'string.min': 'contenido, campo que registra el contenido de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'contenido, campo que registra el contenido de una noticia, debe tener un largo máximo de 1024 caracteres',
    }),
    tipo: Joi.string().pattern(/^(Publicacion)$/).required().messages({
        'any.required': 'tipo es obligatorio',
        'string.empty': 'el tipo no puede estar vacío',
        'string.pattern.base': 'El tipo debe ser Publicacion'
    }),
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
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
    }),
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
});

const schemaPatchEstadoNoticiaList = Joi.object({
    array: Joi.array()
    .items(Joi.string().uuid().message('Cada elemento del array debe ser un UUID válido'))
    .min(1)
    .required()
    .messages({
        'array.base': 'El campo array debe ser un array',
        'array.min': 'El array debe contener al menos 1 UUID',
        'any.required': 'El campo array es obligatorio'
    }),
    estado: Joi.boolean().valid().required().messages({
        'boolean.base': 'estado debe ser booleano (true o false)'
    })
});
const schemaPatchEstadoNoticia = Joi.object({
    estado: Joi.boolean().valid().required().messages({
        'boolean.base': 'estado debe ser booleano (true o false)'
    }),
})
const schemaPatchNoticiaNormal = Joi.object({
    duracion: Joi.number().min(1).max(300).messages({
        'number.min': 'duracion, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'duracion, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    titulo: Joi.string().min(5).max(50).messages({
        'string.min': 'titulo, campo que registra el titulo de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'titulo, campo que registra el titulo de una noticia, debe tener un largo máximo de 50 caracteres',
    }),
    contenido: Joi.string().min(5).max(50).messages({
        'string.min': 'contenido, campo que registra el contenido de una noticia, debe tener un largo mínimo de 4 caracteres',
        'string.max': 'contenido, campo que registra el contenido de una noticia, debe tener un largo máximo de 1024 caracteres',
    }),
    multimedia: Joi.string().base64().messages({
        'string.empty': 'multimedia, campo que registra el archivo de la noticia, no puede estar vacio',
    }),
    extension: Joi.string().pattern(/^(png|jpg|jpeg|mp4)$/).min(2).max(4).messages({
        'string.pattern.base': 'Los tipos disponibles son: png,jpg,jpeg y mp4.'
    }),
    categoriaId : Joi.string().uuid().messages({
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
});
const schemaPatchNoticiaMultimedia = Joi.object({
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
    multimedia: Joi.string().base64().required().messages({
        'any.required': 'multimedia, campo que registra el archivo de la noticia, es obligatorio',
        'string.empty': 'multimedia, campo que registra el archivo de la noticia, no puede estar vacio',
    }),
    extension: Joi.string().pattern(/^(png|jpg|jpeg|mp4)$/).required().min(2).max(4).messages({
        'any.required': 'extension, campo que registra la extension del archivo, es obligatorio',
        'string.empty': 'extension, campo que registra la extension del archivo, no puede estar vacio',
        'string.pattern.base': 'Los tipos disponibles son: png,jpg,jpeg y mp4.'
    }),
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
});
const schemaPatchNoticiaPublicacion = Joi.object({
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
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
});
const schemaPatchNoticiaUrl = Joi.object({
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
    multimedia_url: Joi.string().required().messages({
        'number.min': 'multimedia_url, campo que registra la duración de una noticia, debe ser como mínimo 1 segundo',
        'number.max': 'multimedia_url, campo que registra la duración de una noticia, debe ser como máximo 300 segundos',
    }),
    categoriaId : Joi.string().uuid().required().messages({
        'any.required': 'El uuid de categoria es obligatorio',
        'string.guid': 'El uuid de categoria debe ser uuid/guid'
    })
});

const schemaBuscarPorId = Joi.object({
    id: Joi.string().required().uuid()
})
// OBTENER TODOS LOS USUARIOS
router.get('/', async (req, res) => {
    const usuarios = await prisma.noticia.findMany({
        select: {
            id: true,
            fechaRegistro: true,
            titulo: true,
            duracion: true,
            habilitado: true,
            tipo:true,
            categoria: {
                select: {
                  nombre: true
                }
            }
          }
    })
    if(usuarios.length == 0 ){
        return res.status(204).end()
    }
    return res.status(200).send(usuarios)
})
// OBTENER POR ID
router.get('/find-by-id', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});

    if (error) {
        console.log(error)
        return res.status(400)
            .end()
    }

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })

    if(noticiaId == null){
        return res.status(204).end()
    }
    return res.status(200).send(noticiaId)
})
router.get('/habilitadas', async (req, res) => {
    try {
        const noticias_habilitadas = await prisma.noticia.findMany({
            where: {
                habilitado: true
            },
            select: {
                id: true,
                fechaRegistro: true,
                titulo: true,
                duracion: true,
                categoria: {
                    select: {
                      nombre: true
                    }
                }
              }
        });

        if (!noticias_habilitadas.length) {
            return res.status(204).end();
        }

        return res.status(200).json(noticias_habilitadas);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/deshabilitadas', async (req, res) => {
    try {
        const noticia_deshabilitada = await prisma.noticia.findMany({
            where: {
                habilitado: false
            },
            select: {
                id: true,
                fechaRegistro: true,
                titulo: true,
                duracion: true,
                categoria: {
                    select: {
                      nombre: true
                    }
                }
              }
        });

        if (!noticia_deshabilitada.length) {
            return res.status(204).end();
        }

        return res.status(200).json(noticia_deshabilitada);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/noticia-normal', async (req,res) => {
    const { error } = schemaPostNoticiaNormal.validate(req.body);

    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
        .end()
    }
    
    const noticia = await prisma.noticia.create({
        data: {
          duracion: req.body.duracion,
          titulo: req.body.titulo,
          contenido: req.body.contenido,
          tipo: req.body.tipo,
          multimedia: req.body.multimedia,
          extension: req.body.extension,
          categoriaId: req.body.categoriaId
        }
    })

    if (noticia){
        return res.status(201)
        .set('x-mensaje', 'Noticia registrada.')
        .end();
    }
    console.log(noticia)
    return res.status(409).end();
});
router.post('/noticia-publicacion', async (req,res) => {
    const { error } = schemaPostNoticiaPublicacion.validate(req.body);

    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
        .end()
    }
    
    const noticia = await prisma.noticia.create({
        data: {
          duracion: req.body.duracion,
          titulo: req.body.titulo,
          contenido: req.body.contenido,
          tipo: req.body.tipo,
          categoriaId: req.body.categoriaId
        }
    })

    if (noticia){
        return res.status(201)
        .set('x-mensaje', 'Noticia registrada.')
        .end();
    }
    console.log(noticia)
    return res.status(409).end();
});
router.post('/noticia-multimedia', async (req,res) => {
    const { error } = schemaPostNoticiaMultimedia.validate(req.body);

    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
        .end()
    }
    
    const noticia = await prisma.noticia.create({
        data: {
          duracion: req.body.duracion,
          titulo: req.body.titulo,
          tipo: req.body.tipo,
          multimedia: req.body.multimedia,
          extension: req.body.extension,
          categoriaId: req.body.categoriaId
        }
    })

    if (noticia){
        return res.status(201)
        .set('x-mensaje', 'Noticia registrada.')
        .end();
    }
    console.log(noticia)
    return res.status(409).end();
});
router.post('/noticia-url', async (req,res) => {
    const { error } = schemaPostNoticiaUrl.validate(req.body);

    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
        .end()
    }
    
    const noticia = await prisma.noticia.create({
        data: {
          duracion: req.body.duracion,
          titulo: req.body.titulo,
          tipo: req.body.tipo,
          multimedia_url: req.body.multimedia_url,
          categoriaId: req.body.categoriaId
        }
    })

    if (noticia){
        return res.status(201)
        .set('x-mensaje', 'Noticia registrada.')
        .end();
    }
    return res.status(409).end();
});

router.patch('/cambiar-estado-list', async (req,res) => {
    const { error } = schemaPatchEstadoNoticiaList.validate(req.body);

    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
        .end()
    }
    
    const array = req.body.array
    const fails = []
    for (let i=0;i<array.length;i++){
        try {
            const update_noticia = await prisma.noticia.update({
                where: {
                    id: array[i]
                },
                data: {
                    habilitado: req.body.estado
                },
            });
            //console.log(`Noticia con id ${array[i]} creada exitosamente.`);
        } catch (error:any) {
            if (error.code === 'P2025') {
                console.log(`No se pudo actualizar la noticia con id ${array[i]}, no existe.`);
                fails.push(array[i]);
            } else {
                console.error(`Error inesperado al actualizar la noticia con id ${array[i]}: `, error);
                fails.push(array[i]);
            }
        }
    }
    if (fails.length === array.length) {
        return res.status(404)
            .set('x-mensaje', 'Ninguna de las noticias ingresadas se encontró.')
            .send(fails)
            .end();
    } else if (fails.length === 0) {
        return res.status(200)
            .set('x-mensaje', 'Todas las noticias se actualizaron correctamente.')
            .send(fails)
            .end();
    } else {
        return res.status(207)
            .set('x-mensaje', 'Algunas noticias se actualizaron, otras no se encontraron.')
            .send(fails)
            .end();
    }
});
router.patch('/cambiar-estado', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })
    if(!noticiaId){
        return res.status(404)
            .set('x-mensaje','No existe noticia con ese id')
            .end()
    }

    const { error:error2 } = schemaPatchEstadoNoticia.validate(req.body);
    if (error2) {
        return res.status(400)
        .set('x-mensaje', error2.details[0].message)
        .end()
    }    
    const estado = req.body.estado;
    const update_noticia = await prisma.noticia.update({
        where: {
          id: id
        },
        data: {
          habilitado: estado
        },
    });

    if (update_noticia){
        return res.status(204)
        .set('x-mensaje', 'Estado de noticia actualizado.')
        .end();
    }
    return res.status(409).end();
});
router.patch('/modificar-noticia-normal', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }
    
    const { error:error2 } = schemaPatchNoticiaNormal.validate(req.body);
    if (error2) {
        return res.status(400)
        .set('x-mensaje', error2.details[0].message)
        .end()
    }    

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })
    if(!noticiaId){
        return res.status(404)
            .set('x-mensaje','No existe noticia con ese id')
            .end()
    }
    const categoriaId = await prisma.categoria.findFirst({
        where: {
            id: req.body.categoriaId
        }
    })
    if(!categoriaId){
        return res.status(404)
        .set('x-mensaje','No existe categoria con ese id')    
        .end()
    }

    const data: { [key: string]: any } = {};

    if (req.body.duracion !== undefined && req.body.duracion !== noticiaId.duracion) {
      data.duracion = req.body.duracion;
    }
    if (req.body.titulo !== undefined && req.body.titulo !== noticiaId.titulo) {
      data.titulo = req.body.titulo;
    }
    if (req.body.contenido !== undefined && req.body.contenido !== noticiaId.contenido) {
      data.contenido = req.body.contenido;
    }
    if (req.body.multimedia !== undefined && req.body.multimedia !== noticiaId.multimedia) {
      data.multimedia = req.body.multimedia;
    }
    if (req.body.extension !== undefined && req.body.extension !== noticiaId.extension) {
      data.extension = req.body.extension;
    }
    if (req.body.categoriaId !== undefined && req.body.categoriaId !== noticiaId.categoriaId) {
      data.categoriaId = req.body.categoriaId;
    }

    const update_noticia = await prisma.noticia.update({
        where: {
          id: id
        },
        data: data,
    });

    if (update_noticia){
        return res.status(204)
        .set('x-mensaje', 'Noticia actualizada.')
        .end();
    }
    return res.status(409).end();
});
router.patch('/modificar-noticia-multimedia', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }
    
    const { error:error2 } = schemaPatchNoticiaMultimedia.validate(req.body);
    if (error2) {
        return res.status(400)
        .set('x-mensaje', error2.details[0].message)
        .end()
    }    

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })
    if(!noticiaId){
        return res.status(404)
            .set('x-mensaje','No existe noticia con ese id')
            .end()
    }
    const categoriaId = await prisma.categoria.findFirst({
        where: {
            id: req.body.categoriaId
        }
    })
    if(!categoriaId){
        return res.status(404)
        .set('x-mensaje','No existe categoria con ese id')    
        .end()
    }
    const data: { [key: string]: any } = {};

    if (req.body.duracion !== undefined && req.body.duracion !== noticiaId.duracion) {
      data.duracion = req.body.duracion;
    }
    if (req.body.titulo !== undefined && req.body.titulo !== noticiaId.titulo) {
      data.titulo = req.body.titulo;
    }
    if (req.body.multimedia !== undefined && req.body.multimedia !== noticiaId.multimedia) {
      data.multimedia = req.body.multimedia;
    }
    if (req.body.extension !== undefined && req.body.extension !== noticiaId.extension) {
      data.extension = req.body.extension;
    }
    if (req.body.categoriaId !== undefined && req.body.categoriaId !== noticiaId.categoriaId) {
      data.categoriaId = req.body.categoriaId;
    }

    const update_noticia = await prisma.noticia.update({
        where: {
          id: id
        },
        data: data,
    });

    if (update_noticia){
        return res.status(204)
        .set('x-mensaje', 'Noticia actualizada.')
        .end();
    }
    return res.status(409).end();
});
router.patch('/modificar-noticia-publicacion', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }
    
    const { error:error2 } = schemaPatchNoticiaPublicacion.validate(req.body);
    if (error2) {
        return res.status(400)
        .set('x-mensaje', error2.details[0].message)
        .end()
    }    

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })
    if(!noticiaId){
        return res.status(404)
            .set('x-mensaje','No existe noticia con ese id')
            .end()
    }
    const categoriaId = await prisma.categoria.findFirst({
        where: {
            id: req.body.categoriaId
        }
    })
    if(!categoriaId){
        return res.status(404)
        .set('x-mensaje','No existe categoria con ese id')    
        .end()
    }

    const data: { [key: string]: any } = {};

    if (req.body.duracion !== undefined && req.body.duracion !== noticiaId.duracion) {
      data.duracion = req.body.duracion;
    }
    if (req.body.titulo !== undefined && req.body.titulo !== noticiaId.titulo) {
      data.titulo = req.body.titulo;
    }
    if (req.body.contenido !== undefined && req.body.contenido !== noticiaId.contenido) {
        data.contenido = req.body.contenido;
    }
    if (req.body.categoriaId !== undefined && req.body.categoriaId !== noticiaId.categoriaId) {
      data.categoriaId = req.body.categoriaId;
    }

    const update_noticia = await prisma.noticia.update({
        where: {
          id: id
        },
        data: data,
    });

    if (update_noticia){
        return res.status(204)
        .set('x-mensaje', 'Noticia actualizada.')
        .end();
    }
    return res.status(409).end();
});
router.patch('/modificar-noticia-url', async (req,res) => {
    const id = req.query.id as string;
    const { error } = schemaBuscarPorId.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }
    
    const { error:error2 } = schemaPatchNoticiaUrl.validate(req.body);
    if (error2) {
        return res.status(400)
        .set('x-mensaje', error2.details[0].message)
        .end()
    }    

    const noticiaId = await prisma.noticia.findFirst({
        where: {
            id: id
        }
    })
    if(!noticiaId){
        return res.status(404)
            .set('x-mensaje','No existe noticia con ese id')
            .end()
    }
    const categoriaId = await prisma.categoria.findFirst({
        where: {
            id: req.body.categoriaId
        }
    })
    if(!categoriaId){
        return res.status(404)
        .set('x-mensaje','No existe categoria con ese id')    
        .end()
    }

    const data: { [key: string]: any } = {};

    if (req.body.duracion !== undefined && req.body.duracion !== noticiaId.duracion) {
      data.duracion = req.body.duracion;
    }
    if (req.body.titulo !== undefined && req.body.titulo !== noticiaId.titulo) {
      data.titulo = req.body.titulo;
    }
    if (req.body.multimedia_url !== undefined && req.body.multimedia_url !== noticiaId.multimedia_url) {
        data.multimedia_url = req.body.multimedia_url;
    }
    if (req.body.categoriaId !== undefined && req.body.categoriaId !== noticiaId.categoriaId) {
      data.categoriaId = req.body.categoriaId;
    }

    const update_noticia = await prisma.noticia.update({
        where: {
          id: id
        },
        data: data,
    });

    if (update_noticia){
        return res.status(204)
        .set('x-mensaje', 'Noticia actualizada.')
        .end();
    }
    return res.status(409).end();
});

export default router;
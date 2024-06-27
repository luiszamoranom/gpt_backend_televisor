import { Router } from "express";
import {PrismaClient} from "@prisma/client";
import Joi from "joi";

const router = Router();
const prisma = new PrismaClient();

const schemaPostCategoria = Joi.object({
    nombre: Joi.string().required().min(3).max(20).messages({
        'any.required': 'nombre, campo que registra el nombre de una categoría es obligatorio',
        'string.empty': 'nombre, campo que registra el nombre de una categoría, no puede estar vacio',
        'string.min': 'nombre, campo que registra el nombre de una categoría, debe tener un largo mínimo de 3 caracteres',
        'string.max': 'nombre, campo que registra el nombre de una categoría, debe tener un largo máximo de 20 caracteres',
    })
});
const schemaUuid = Joi.string().uuid().required().messages({
    'any.required': 'El path id es obligatorio',
    'string.guid': 'El path id debe ser uuid/guid'
})

router.post('/',async (req,res) => {
    const { error } = schemaPostCategoria.validate(req.body);
    if (error) {
        return res.status(400)
            .set('x-mensaje', error.details[0].message)
            .end()
    }

    const categoriaNombre = await prisma.categoria.findFirst({
        where: {
            nombre: req.body.nombre
        }
    })
    if(categoriaNombre){
        return res.status(405)
            .set('x-mensaje','Ya existe categoria con ese nombre')
            .end()
    }

    const categoria = await prisma.categoria.create({
        data:{
            nombre:req.body.nombre
        }
    });
    if (categoria){
        return res.status(201)
            .set('x-mensaje', 'Categoria registrada.')
            .end();
    }
    return res.status(409).end();
});

router.get('/',async (req,res) => {
    const categorias = await prisma.categoria.findMany()

    if(categorias.length == 0 ){
        return res.status(204).end()
    }
    return res.status(200).send(categorias)
});

router.get('/',async (req,res) => {
    const categorias = await prisma.categoria.findMany()

    if(categorias.length == 0 ){
        return res.status(204).end()
    }
    return res.status(200).send(categorias)
});


router.get('/:id', async (req, res) => {

    const categoriaPorId = await prisma.categoria.findFirst({
        where: {
            id: req.params.id
        }
    });

    if (categoriaPorId) {
        return res.status(200)
            .json(categoriaPorId);
    } else {
        return res.status(404)
            .set('x-mensaje', 'Categoria no encontrada.')
            .end();
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = schemaUuid.validate(id);
    if (error) {
        return res.status(400)
            .set('x-mensaje', error.details[0].message)
            .end();
    }

    const { nombre } = req.body;

    try {

        const categoriaExistente = await prisma.categoria.findFirst({
            where: {
                nombre: nombre,
                NOT: { id: id },
            },
        });

        if (categoriaExistente) {
            return res.status(400)
                .set('x-mensaje', 'El nombre de la categoría ya existe')
                .end();
        }

        const categoriaActualizada = await prisma.categoria.update({
            where: { id },
            data: { nombre },
        });

        if (categoriaActualizada) {
            return res.status(200)
                .json(categoriaActualizada)
                .end();
        } else {
            return res.status(404)
                .set('x-mensaje', 'Categoría no encontrada')
                .end();
        }
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        return res.status(500)
            .set('x-mensaje', 'Error interno del servidor')
            .end();
    }
});

export default router;
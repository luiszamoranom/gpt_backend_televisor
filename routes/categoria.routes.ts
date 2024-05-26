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


router.get('/',async (req,res) => {
    const categorias = await prisma.categoria.findMany()
    console.log(categorias)

    if(categorias.length == 0 ){
        return res.status(204).end()
    }
    return res.status(200).send(categorias)
});

router.post('/',async (req,res) => {
    const { error } = schemaPostCategoria.validate(req.body);
    if (error) {
        return res.status(400)
        .set('x-mensaje', error.details[0].message)
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

router.patch('/',async (req,res)=>{
    const id = req.query.id as string;
    const { error } = schemaUuid.validate({id:id});
    if (error) {
        return res.status(400)
            .end()
    }

    const categoriaId = await prisma.categoria.findFirst({
        where: {
            id:id
        }
    })
    if(!categoriaId){
        return res.status(404)
            .set('x-mensaje','No existe categoría con ese id')
            .end()
    }

    const categoriaNombre = await prisma.categoria.findFirst({
        where: {
            nombre:req.body.nombre
        }
    })
    if (categoriaNombre?.id != id){
        return res.status(400)
        .set('x-mensaje','El nombre de la categoría ya existe')
        .end()
    }

    const update_categoria = await prisma.categoria.update({
        where: {
          id: id
        },
        data: {
            nombre:req.body.nombre
        }
    });
    if (update_categoria){
        return res.status(204)
        .set('x-mensaje', 'Categoría actualizada.')
        .end();
    }
    return res.status(409).end();

});


export default router;
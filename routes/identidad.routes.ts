import {Router } from 'express';
import {PrismaClient} from "@prisma/client";
import Joi from 'joi';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validarRolEnToken } from '../utils/validarToken';

const router = Router();
const prisma = new PrismaClient();

const schemaLogin = Joi.object({
    email: Joi.string().required().email(),
    contrasena: Joi.string().required()
})


router.post("/login", async (req, res) => {
    const { error } = schemaLogin.validate(req.body);

    if (error) {
        return res.status(400)
            .send(error.details[0].message)
            .end()
    }

    const email = req.body.email
    const contrasena = req.body.contrasena

    const usuario = await prisma.usuario.findFirst({
        where: {
            email: email,
            habilitado: true
        }
    })

    if(!usuario){
        return res.status(204).send("Usuario no existe o se encuentra deshabilitado")
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if(!contrasenaValida){
        return res.status(409).send("Contrasena incorrecta")
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if(secretKey == undefined){
        return res.status(501)
            .send("Error, jwt secrey key en el servidor no definido.")
    }

    const rol = usuario.rol
    const accessToken =  jwt.sign({
        rol
    },secretKey,{ expiresIn: '1h' })

    const respuesta = {
        name: usuario.nombreUsuario,
        token: accessToken
    } 
    res.status(200)
        .send(respuesta)
        .end()
})


// VIOLA UNIQUE
async function violaUniqueNombre(nombreUsuario: string): Promise<boolean> {
    const existePorNombre = await prisma.usuario.findUnique({ where: { nombreUsuario } });
    return  !!existePorNombre;
}

async function violaEmailUnique(email: string): Promise<boolean> {
    const existePorEmail = await prisma.usuario.findUnique({ where: { email } });
    return !!existePorEmail; // Devuelve true si existingUser es verdadero (no nulo), false en caso contrario
}

const schemaRegistrarUsuario = Joi.object({
    nombreUsuario: Joi.string().required().min(5).max(10),
    email: Joi.string().email().required(),
    contrasena: Joi.string().min(5).max(15)
})

router.post('/registrar',async (req:any, res:any) => {
    const { error } = schemaRegistrarUsuario.validate(req.body);

    if (error) {
        return res.status(400).send(error)
    }

    if (await violaUniqueNombre(req.body.nombreUsuario) || await violaEmailUnique(req.body.email)){
        return res.status(409).send('Ya existe un usuario con ese nombre o email.');
    }

    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
    const rol_por_defecto = 'Registrador';        //ESTO HAY Q CAMBIARLO PORQUE NO ESTA BIEN
    const nuevoUsuario = await prisma.usuario.create({
        data: {
           ...req.body,
            contrasena: hashedPassword,
            rol: rol_por_defecto
        }
    });

    return res.status(200).send(nuevoUsuario)
})

export default router;
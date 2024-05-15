import {Router } from 'express';
import {PrismaClient} from "@prisma/client";
import Joi from 'joi';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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

    const accessToken =  jwt.sign({
    },secretKey,{ expiresIn: '1h' })

    res.status(200)
        .send(accessToken)
        .end()
})

export default router;
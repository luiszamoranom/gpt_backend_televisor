import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt, { Secret } from 'jsonwebtoken';

export const validarRolEnToken = (rolRequerido: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401)
            .set('x-mensaje', 'No posees token, por tanto, no puedes validar tu rol para acceder a este recurso.')
            .end()
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if(secretKey == undefined){
        return res.status(501)
            .set("x-mensaje", "Error, intentas acceder a una ruta por rol, pero en el servidor la jwt_secret_key no esta definida.")
            .end()
    }

    try {
        const tokenDecodificado = jwt.verify(token, secretKey as Secret) as {
            // modificar acá, si se añaden más atributos al token (ojo, esto se hace en identity - login
            rol: string
        };
        if (!rolRequerido.includes(tokenDecodificado.rol)) {
            // no esta autorizado por rol
            return res.status(403)
                .set("x-mensaje", "No posees el rol para acceder a este recurso.")
                .end()
        }
        next();
    } catch (error) {
        return res.status(403)
            .set("x-mensaje", "No estas autorizado para acceder a esta ruta (token en formato invalido).")
            .end()
    }
};
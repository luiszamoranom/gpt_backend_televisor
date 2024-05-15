// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors'
import usuarioRoute from './routes/usuario.routes'
import identidadRoute from './routes/identidad.routes'

export const app = express();
const PORT = 9999
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // incluir cookies, credenciales y certificados en el CORS
};
app.use(cors(corsOptions));
app.use(express.json({limit: '2mb'}));

// rutas individual de cada tabla
app.use("/identidad", identidadRoute)
app.use("/usuario", usuarioRoute)

app.get("/ping", async (req, res) => {
    res.send( {data: "pong"})
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
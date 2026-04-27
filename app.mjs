import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroesRoutes.mjs';
import heroesroutefrom from './routes/superHeroFront.mjs'

const app = express();
const PORT = process.env.PORT||3000;

//Middleware para parsear JSON (Mid para que las solicitudes se conviertan a JSON automáticamente)
app.use (express.json());

//Configurar ejs como motor de plantillas
app.set("view engine","ejs");

//Conexión a MongoDB
connectDB();

//Configuración de rutas- Rutas backend para la api de superheroes
app.use('/api', superHeroRoutes);

//ruta frontend/plantillas para el dashboard de heroes
app.use("/dashboard", heroesroutefrom);

//Manejo de errores para rutas no encontradas
app.use((req,res)=>{
    res.status(404).send({mensaje:"Ruta no encontrada"});
});

//Iniciar el servidor
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
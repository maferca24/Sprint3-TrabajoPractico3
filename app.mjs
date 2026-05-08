import express from 'express';//Importamos express para crear el servidor
import {connectDB} from './config/dbConfig.mjs';//Importamos la función de conexión a la base de datos
import superHeroRoutes from './routes/superHeroesRoutes.mjs';//Importamos las rutas de superheroes para usarlas como middleware en el servidor
import heroesroutefront from './routes/superHeroFront.mjs'//Importamos las rutas del frontend para el dashboard de heroes

const app = express();//Creamos una instancia de express para configurar el servidor
const PORT = process.env.PORT||3000;//Definimos el puerto en el que se ejecutará el servidor, usando una variable de entorno o el puerto 3000 por defecto

//Middleware para parsear JSON (Mid para que las solicitudes se conviertan a JSON automáticamente)
app.use (express.json());//Middleware para parsear datos de formularios (Mid para que las solicitudes con datos de formularios se conviertan a objetos JS automáticamente)

//Configurar ejs como motor de plantillas
app.set("view engine","ejs");

//Conexión a MongoDB
connectDB();//Llamamos a la función de conexión a la base de datos para establecer la conexión con MongoDB antes de iniciar el servidor

//Configuración de rutas- Rutas backend para la api de superheroes
app.use('/api', superHeroRoutes);

//ruta frontend/plantillas para el dashboard de heroes
app.use("/dashboard", heroesroutefront);

//Manejo de errores para rutas no encontradas
 app.use((req,res)=>{
     res.status(404).send({mensaje:"Ruta no encontrada"});
 });

//Iniciar el servidor
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
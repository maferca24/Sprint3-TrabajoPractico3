import express from "express";//Importamos express para crear el servidor y definir las rutas del frontend
import { getDashboardController } from "../controllers/superheroesControllers.mjs";
//Importamos el controlador para mostrar el dashboard con la lista de heroes

const router = express.Router();//Creamos una instancia de Router 
// para definir las rutas relacionadas con el frontend del dashboard de heroes
// // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo heroe
router.get("/nuevo", (req, res) => {
    res.render("addSuperhero");//Renderizamos la vista addSuperhero.ejs para mostrar el formulario de creación de un nuevo heroe
});
//ruta para mostrar el formulario de edición de un heroe existente, 
// obteniendo los datos del heroe desde la API
router.get("/modificar/:id", async (req, res) => {
    //console.log("ID del héroe a modificar:", req.params.id);
    const respuesta = await fetch(
        `/api/heroes/${req.params.id}`,
    );
    const heroe = await respuesta.json();//Obtenemos los datos del heroe desde 
    // la API usando el id pasado como parámetro en la ruta
    //console.log("Datos del héroe obtenido de la API:", heroe);
    if (!heroe){
        return res.status(404).send("Superhéroe no encontrado en la API");
    }
    else{
    //console.log("Datos del héroe a renderizar en la vista:", heroe);

      res.render("editSuperhero", { heroe });

    }
}); 

export default router;

// //ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo 
//consumiendo la APi desde el backend y renderizando la vista con los datos obtenidos

// router.get("/", getDashboardController);
// const respuesta = await fetch("http://localhost:3000/api/heroes");
// const heroes = await respuesta.json();
// res.render("dashboard", { heroes });    
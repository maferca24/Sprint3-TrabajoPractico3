import express from "express";
import { getDashboardController } from "../controllers/superheroesControllers.mjs";

const router = express.Router();
// // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo heroe
router.get("/nuevo", (req, res) => {
    res.render("addSuperhero");
});
//ruta para mostrar el formulario de edición de un heroe existente, obteniendo los datos del heroe desde la API
router.get("/modificar/:id", async (req, res) => {
    const respuesta = await fetch(
        `http://localhost:3000/api/heroes/id/${req.params.id}`,);
    const heroe = await respuesta.json();
    if (!heroe){
        return res.status(404).send("Superhéroe no encontrado en la API");
    }
    res.render("editSuperhero", { heroe });
}); 

export default router;

// //ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo 
//consumiendo la APi desde el backend y renderizando la vista con los datos obtenidos

// router.get("/", getDashboardController);
// const respuesta = await fetch("http://localhost:3000/api/heroes");
// const heroes = await respuesta.json();
// res.render("dashboard", { heroes });    
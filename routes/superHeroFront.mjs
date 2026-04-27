import express from "express";
import { getDashboardController } from "../controllers/superheroesControllers.mjs";

const router = express.Router();
// // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo heroe
router.get("/nuevo", (req, res) => {
    res.render("addSuperhero");
});

// // //Ruta para mostrar el formulario de edición de un heroe
router.get("/modificar/:id", async (req, res) => {
    const respuesta = await fetch(
        'http://localhost3000/api/heroes/id/${req.params.id}',
    );
    const heroe = respuesta.json();
    if (!hero) {
        return res.status(404).send("Superheroe no encontrado");
    }
    res.render("editSuperhero", { heroe });
});
export default router;


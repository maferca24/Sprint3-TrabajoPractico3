import express from "express";
import { getDashboardController } from "../controllers/superheroesControllers.mjs";

const router = express.Router();
// // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo heroe
router.get("/nuevo", (req, res) => {
    res.render("addSuperhero");
});

// Ruta para mostrar el formulario de edición de un heroe
router.get("/modificar/:id", async (req, res) => {
    try {
        // 1. Usamos backticks `` para que ${req.params.id} funcione
        const respuesta = await fetch(`http://dashboard/${req.params.id}`); 
        
        // 2. IMPORTANTE: Debes usar await aquí también
        const heroe = await respuesta.json(); 

        // 3. Verificamos si el héroe existe (usando la variable correcta 'heroe')
        if (!heroe) {
            return res.status(404).send("Superheroe no encontrado");
        }

        res.render("editSuperhero", { heroe });
    } catch (error) {
        console.error("Error al obtener el héroe:", error);
        res.status(500).send("Error interno del servidor");
    }
});
//Ruta para mostrar el formulario de edición de un heroe
// router.get("/modificar/:id", async (req, res) => {
//     const respuesta = await fetch(
//         'http://localhost:3000/dashboard/modificar/${req.params.id}');
//     const heroe = respuesta.json();
//     if (!hero) {
//         return res.status(404).send("Superheroe no encontrado");
//     }
//     res.render("editSuperhero", { heroe });
// });

export default router;


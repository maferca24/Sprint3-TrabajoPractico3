import express from "express";
import { getDashboardController } from "../controllers/superheroesControllers.mjs";

const router = express.Router();
// // //Ruta para mostrar el dashboard con la lista de heroes desde el controlador nuevo
router.get("/", getDashboardController);

//Ruta para mostrar el formulario de creación de un nuevo heroe
router.get("/nuevo", (req, res) => {
    res.render("addSuperhero");
});
// router.get("/modificar/:id", async (req, res) => {
//     try {
//         // La URL debe ser COMPLETA y apuntar a tu API
//         const url = `http://localhost:3000/api/heroes/${req.params.id}`;
        
//         const respuesta = await fetch(url);

//         if (!respuesta.ok) {
//             return res.status(404).send("Superhéroe no encontrado en la API");
//         }

//         const heroe = await respuesta.json();
//         res.render("editSuperhero", { heroe });
        
//     } catch (error) {
//         // Aquí es donde te salía el error ENOTFOUND
//         console.error("Error al obtener el héroe:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });
router.get("/modificar/:id", async (req, res) => {
    const respuesta = await fetch(`http://localhost:3000/api/heroes/${req.params.id}`);
    const heroe = await respuesta.json();
    if (!heroe)
return res.status(404).send("Superhéroe no encontrado en la API");
    res.render("editSuperhero", { heroe });
}); 

export default router;


//Define las rutas necesarias para cada operación del controlador
//La capa de ruta define los endpoints y mapea cada uno a su respectivo controlador
//permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible

import express from 'express';//Importamos express para crear el router
import { validateSuperHeroe } from '../middlewares/middlewareSuperheroes.mjs';
//Importamos el middleware de validación 
// para validar los datos de entrada al crear o actualizar un superhéroe

//import { body, validationResult } from 'express-validator';//
// body:declara las reglas de validación sobre los campos del req. body. Devuelve un middleware.
//validationResult: lee los errores que body()acumuló en la request y los expone.
import {
    obtenerTodosLosSuperheroesController, crearSuperHeroeController, actualizarSuperHeroeController,
    eliminarSuperHeroeporIdController, eliminarSuperHeroeporNombreController, 
    obtenerSuperheroesMayoresDe30Controller, obtenerSuperheroePorIdController,buscarSuperheroesPorAtributoController,
    getDashboardController
}    from '../controllers/superheroesControllers.mjs';//Importamos los controladores para mapearlos a las rutas correspondientes

const router = express.Router();//Creamos una instancia de Router para definir las rutas relacionadas con los superhéroes

//Rutas fijas:
//TP3-S2
//Superheroes mayores a 30 años
//http://localhost:3000/api/heroes/mayores-30
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
//Rutas con parámetros
//Superheroes por id
//http://localhost:3000/api/heroes/69c6fd59d90e243b1c0fad1b
router.get('/heroes/:id', obtenerSuperheroePorIdController);
//Superheroes por atributo
//http://localhost:3000/api/heroes/buscar/planetaOrigen/Tierra
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//Rutas para operaciones CRUD
//Todos los superheroes
//GET- Mostrar todos los superheroes
// http://localhost:3000/api/heroes
router.get('/heroes', obtenerTodosLosSuperheroesController);

//POST- Crear un superheroe (sin validacion)
//http://localhost:3000/api/heroes
// router.post('/heroes', crearSuperHeroeController);

//POST- Crear un superheroe
//http://localhost:3000/api/heroes
router.post('/heroes', validateSuperHeroe, crearSuperHeroeController);

//PUT- Actualizar un superheroe por id
//http://localhost:3000/api/heroes/id/69fcae060ee8a98eb62df9b7
router.put('/heroes/id/:id', validateSuperHeroe, actualizarSuperHeroeController);


//DELETE- Eliminar un superheroe por id
//http://localhost:3000/api/heroes/id/69fdd8b855861cc38be5b6c1
router.delete('/heroes/id/:id', eliminarSuperHeroeporIdController);

//DELETE- Eliminar un superheroe por nombre
//http://localhost:3000/api/heroes/nombre/Hombre Mosquita
router.delete('/heroes/nombre/:nombre', eliminarSuperHeroeporNombreController);

//POST- Validación
//http://localhost:3000/api/heroes/con-validacion
router.post('/heroes/con-validacion',
    validateSuperHeroe,
    (req, res) => {
        //si llegamos hasta aca todas las validaciones pasaron. Procesamos normalmente.
        const { nombreSuperHeroe, nombreReal, edad, poderes } = req.body;
        console.log("validación exitosa", req.body);
        res.send(req.body);
    },
);
export default router;

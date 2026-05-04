//Define las rutas necesarias para cada operación del controlador
//La capa de ruta define los endpoints y mapea cada uno a su respectivo controlador
//permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible

import express from 'express';
import { validateSuperHeroe } from '../middlewares/middlewareSuperheroes.mjs';

//import { body, validationResult } from 'express-validator';
//body:declara las reglas de validación sobre los campos del req. body. Devuelve un middleware.
//validationResult: lee los errores que body()acumulóen la rquest y los epone.
import {
    obtenerTodosLosSuperheroesController, crearSuperHeroeController, actualizarSuperHeroeController,
    eliminarSuperHeroeporIdController, eliminarSuperHeroeporNombreController, 
    obtenerSuperheroesMayoresDe30Controller, obtenerSuperheroePorIdController,buscarSuperheroesPorAtributoController,
    getDashboardController
}    from '../controllers/superheroesControllers.mjs';

const router = express.Router();

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

//
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
//http://localhost:3000/api/heroes/:id
router.put('/heroes/:id', validateSuperHeroe, actualizarSuperHeroeController);
//router.put('/heroes/id/:id',  actualizarSuperHeroeController);

//Modifique ruta del put para que sea mas descriptiva, indicando que se actualiza por id,
//  y agregue el middleware de validación para asegurar que los datos enviados sean correctos 
// antes de intentar actualizar el superhéroe en la base de datos.
//anteriormente era:
//router.put('/heroes/:id', actualizarSuperHeroeController); (Ejercicio anterior falta validar con postman)



/********
 Requerimiento: Agregar un endpoint que al realizarle una peticion
Borre un superheroe por ID en la base de datos, y nos devuelva el superheroe borrado
*********/
//DELETE- Elimnar un superheroe por id
//http://localhost:3000/api/heroes/:id
//http://localhost:3000/api/heroes/69e00b5f98572b8f21c7876d
router.delete('/heroes/id/:id', eliminarSuperHeroeporIdController);

//DELETE- Elimnar un superheroe por nombre
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

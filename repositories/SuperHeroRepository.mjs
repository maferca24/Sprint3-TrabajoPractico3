//Implementa los metodos definidos en la Interfaz,
//interactuando directamente con MongoDB a traves de Mongoose

import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs'

class SuperHeroRepository extends IRepository {// Implementamos los métodos definidos en la interfaz IRepository
    async obtenerTodos() {// Método para obtener todos los superhéroes de la base de datos
        return await SuperHero.find({});
    }
    async crearSuperHeroe(datosHeroe) {// Método para crear un nuevo superhéroe en la base de datos
        try {// Recibimos los datos del superhéroe a crear como argumento (datosHeroe)
            // Usamos 'datosHeroe' que es lo que recibe la función
            const nuevoSuperheroe = new SuperHero(datosHeroe);// Creamos una nueva instancia del modelo SuperHero con los datos recibidos

            // Lo guardamos en MongoDB
            console.log('Superheroe creado con exito');
            //console.log(datosHeroe);
            return await nuevoSuperheroe.save();

        } catch (error) {
            // Es buena idea imprimir el error real en consola para debuguear
            console.error("Error en Repository:", error);
            throw new Error('Error al guardar el superhéroe en la base de datos');
        }

    }
    async actualizarSuperHeroe(id, datosActualizados) {
        try {
            return await SuperHero.findByIdAndUpdate(
                id,
                { $set: datosActualizados },
                { returnDocument:"after" }
            );
        } catch (error) {
            throw new Error('Error al actualizar el superhéroe en la base de datos');
        }
    }
    async eliminarSuperHeroeporID(id) {
        try {
            return await SuperHero.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar el superhéroe en la base de datos');
        }
    }
    async eliminarSuperHeroeporNombre(nombre) {
        try {
            return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        } catch (error) {
            throw new Error('Error al eliminar el superhéroe en la base de datos');
        }
    }
    ////
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }
    //Busqueda por atributo

    async buscarPorAtributo(atributo, valor) {
        //new RegExp Crea un patrón de búsqueda flexible (comodín).
        const query = { [atributo]: new RegExp(valor, 'i') }; // 'i' para que no importe mayúsculas/minúsculas
        return await SuperHero.find(query);
    }

    //Superheroes mayores a 30 años del Planeta Tierra y con mas de dos poderes
    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },// Mayor a 30 años
            planetaOrigen: 'Tierra',// Planeta de origen Tierra
            'poderes.2': { $exists: true }// Más de dos poderes (índice 2 existe)
        });
    }
}

export default new SuperHeroRepository();



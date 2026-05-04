//Capa de Servicios: Contiene la lógica de negocio
//se encarga de validar y transformar los datos cuando sea necesario

import superHeroRepository from '../repositories/SuperHeroRepository.mjs';


export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}
export async function crearSuperHeroe(superheroe) {
    //Agregamos control para validar los datos antes de pasarlo al repositorio
    if (!superheroe.nombreSuperHeroe || !superheroe.nombreReal) {
        throw new Error("El nombre del superhéroe y su nombre real son obligatorios.");
    }
    return await superHeroRepository.crearSuperHeroe(superheroe);
}
export async function actualizarSuperHeroe(id, datosActualizados) {
    return await superHeroRepository.actualizarSuperHeroe(id, datosActualizados);
}
export async function eliminarSuperHeroeporID(id) {
    return await superHeroRepository.eliminarSuperHeroeporID(id);
}
export async function eliminarSuperHeroeporNombre(nombre) {
    return await superHeroRepository.eliminarSuperHeroeporNombre(nombre);
}
///////
export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}
export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);

}
export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}






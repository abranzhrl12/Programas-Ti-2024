import datosPelis from "../Datos/datosPelis";

export const peliculas = datosPelis.Peliculas.Extreno;

export function generarPlantillaPelicula(pelicula) {
    return `
    <div class="Peliculas__card" data-id="${pelicula.id}">
            <figure class="Peliculas__figure">
                <img class="Peliculas__img" src="${pelicula.imagen}" alt="">
            </figure>
            <p class="Peliculas__nombre">${pelicula.nombre}</p>
        </div>
    `;
}

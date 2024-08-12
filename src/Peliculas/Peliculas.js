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


// export function generarPlantillaPelicula(pelicula) {
 
//         return `
//         <div class="Peliculas__card" data-id="${pelicula.id}">
//             <figure class="Peliculas__figure">
//                 <picture>
//                     <!-- Imagen para pantallas grandes (TV, desktop) -->
//                     <source media="(min-width: 1919px)" srcset="${pelicula.imagen_tv}">
//                     <!-- Imagen para pantallas medianas (tablet, desktop) -->
//                     <source media="(min-width: 768px)" srcset="${pelicula.imagen}">
//                     <!-- Imagen para pantallas pequeñas (móvil) -->
//                     <source media="(min-width: 365px)" srcset="${pelicula.imagen_small}">
//                     <!-- Fallback en caso de que ninguna de las condiciones anteriores sea verdadera -->
//                         <img class="Peliculas__img" src="${pelicula.imagen}" alt="${pelicula.nombre}">
//                 </picture>
//             </figure>
//             <p class="Peliculas__nombre">${pelicula.nombre}</p>
//         </div>
//         `;
   
   
// }

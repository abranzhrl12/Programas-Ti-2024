
export const iconobusqueda = document.querySelector('.busqueda-label');
export const buscarPelicula = document.querySelector('.buscar-pelicula');
export const buscarPeliculaInput = document.querySelector('.buscar__input');
export const btnBuscarPelicula = document.querySelector('.buscar__btn');
export const seccionPeliculas = document.querySelector('.Peliculas');

try {
  const busquedaclose=document.querySelector('.busqueda__close')
busquedaclose.addEventListener('click',()=>
  {
    buscarPelicula.classList.toggle('buscar-pelicula--active');
  })

} catch (error) {
  
}

// Función para filtrar las películas por nombre
export function filtrarPeliculasPorNombre(nombre, peliculas) {
    if (!peliculas || !Array.isArray(peliculas)) {
        console.log("La variable 'peliculas' no está definida o no es un array.");
        return [];
    }

    return peliculas.filter(pelicula => {
        if (pelicula && pelicula.nombre) {
            return pelicula.nombre.toLowerCase().includes(nombre.toLowerCase());
        } else {
            console.warn("Un objeto en 'peliculas' no tiene la propiedad 'nombre'.", pelicula);
            return false;
        }
    });
}

// Función para actualizar las películas basadas en la búsqueda
export function actualizarPeliculas(buscarPeliculaInput, peliculas, generarPeliculas, generarPaginacion, seccionPeliculas, paginaActual) {
    const nombre = buscarPeliculaInput.value.trim(); // Eliminamos espacios en blanco
    console.log('Valor de búsqueda:', nombre);

    if (nombre === '') {
        // Si el campo de búsqueda está vacío, mostrar todas las películas
        paginaActual = 1; // Restablecer a la primera página
        generarPeliculas(peliculas);
        generarPaginacion(peliculas);
    } else {
        const peliculasFiltradas = filtrarPeliculasPorNombre(nombre, peliculas);
        console.log('Películas filtradas:', peliculasFiltradas);
        paginaActual = 1; // Restablecer a la primera página
        generarPeliculas(peliculasFiltradas);
        generarPaginacion(peliculasFiltradas); // Actualizar la paginación según las películas filtradas
    }
    // Desplazar al inicio de la sección de películas
    seccionPeliculas.scrollIntoView({ behavior: 'smooth' });
}

// Función para inicializar el evento de clic en el ícono de búsqueda
export function inicializarBusqueda(iconobusqueda, buscarPelicula, buscarPeliculaInput) {
    iconobusqueda.addEventListener('click', () => {
        buscarPelicula.classList.add('buscar-pelicula--active');
        buscarPeliculaInput.focus(); // Asegúrate de enfocar el input cuando se hace clic en el icono
        console.log('Icono de búsqueda clicado, input activado.');
    });
}
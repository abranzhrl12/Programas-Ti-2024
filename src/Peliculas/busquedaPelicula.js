import {calcularProgramasPorPaginaActual} from "./cantidaPagina";
export const iconobusqueda = document.querySelector('.busqueda-label');
export const buscarPelicula = document.querySelector('.buscar-pelicula');
export const buscarPeliculaInput = document.querySelector('.buscar__input');
export const btnBuscarPelicula = document.querySelector('.buscar__btn');
export const seccionPeliculas = document.querySelector('.Peliculas');

const {limite}=calcularProgramasPorPaginaActual;

try {
    
  const busquedaclose=document.querySelector('.busqueda__close')
busquedaclose.addEventListener('click',()=>
  {
    buscarPelicula.classList.toggle('buscar-pelicula--active');
    buscarPeliculaInput.value='';
    inicializarBusqueda(iconobusqueda, buscarPelicula, buscarPeliculaInput)
    

   
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

export function actualizarPeliculas(buscarPeliculaInput, peliculas, generarPeliculas, generarPaginacion, setPage,seccionPeliculas, paginaActual) {
    const nombre = buscarPeliculaInput.value.trim(); // Eliminamos espacios en blanco
    console.log('Valor de búsqueda:', nombre);

    if (nombre === '') {
        // Si el campo de búsqueda está vacío, mostrar todas las películas
        paginaActual = 1; // Restablecer a la primera página
        generarPeliculas(peliculas); // Actualizar el grid con todas las películas
        
        // Verificar el ancho de la pantalla y generar paginación solo si es mayor a 900px
        if (window.innerWidth > 900) {
            generarPaginacion(peliculas); // Actualizar la paginación
            console.log(window.innerWidth ,"holaaaaa")
        }
    } else {
        const peliculasFiltradas = filtrarPeliculasPorNombre(nombre, peliculas);
        console.log('Películas filtradas:', peliculasFiltradas);
        paginaActual = 1; // Restablecer a la primera página
       
        generarPeliculas(peliculasFiltradas,limite); // Actualizar el grid con las películas filtradas
        
        // Verificar el ancho de la pantalla y generar paginación solo si es mayor a 900px
        if (window.innerWidth > 900) {
            paginaActual = 1; // Restablecer a la primera página
        setPage(1)
       
        generarPeliculas(peliculasFiltradas,limite); // Actualizar el grid con las películas filtradas
            generarPaginacion(peliculasFiltradas); // Actualizar la paginación según las películas filtradas
        }
    }
    
    // Desplazar al inicio de la sección de películas
    seccionPeliculas.scrollIntoView({ behavior: 'smooth' });
}

export function inicializarBusqueda(iconobusqueda, buscarPelicula, buscarPeliculaInput) {
    iconobusqueda.addEventListener('click', () => {
        buscarPelicula.classList.add('buscar-pelicula--active');
        buscarPeliculaInput.focus(); // Asegúrate de enfocar el input cuando se hace clic en el icono
        console.log('Icono de búsqueda clicado, input activado.');
    });
}
import Peliculas from "./../Datos/datosPelis";

// Función para filtrar películas por múltiples géneros
export function filtrarPeliculasPorGeneros(generosBuscados) {
  const peliculas = Peliculas.Peliculas.Extreno;

  if (!peliculas) {
    console.error("La lista de películas no está definida.");
    return [];
  }

  // Convertir la cadena de géneros en un array
  const generosArray = generosBuscados.split(',').map(genre => genre.trim());

  const peliculasFiltradas = peliculas
    .filter(pelicula => 
      pelicula.Generos?.some(genero => generosArray.includes(genero))
    )
    .map(({ id, nombre, imagen, Video, Generos }) => ({
      id,
      nombre,
      imagen,
      Video,
      Generos
    }));

  if (peliculasFiltradas.length === 0) {
    console.warn(`No se encontraron películas para los géneros: ${generosBuscados}`);
  }

  return peliculasFiltradas;
}

export function manejarClickGenero(event) {
    const elemento = event.target.closest('[data-genre]');
    if (elemento) {
      const generosBuscados = elemento.getAttribute('data-genre');
      const peliculasFiltradas = filtrarPeliculasPorGeneros(generosBuscados);
  
      // Actualiza la grid con las películas filtradas
      generarPeliculas(peliculasFiltradas);
      generarPaginacion(peliculasFiltradas);
      agregarBotonVerMas(peliculasFiltradas);
  
      // Opcional: Hacer scroll al inicio
      const grid = document.querySelector('.Peliculas__grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

// Asocia el manejador de eventos al contenedor de géneros
document.querySelectorAll('.Genero-categorias__figura').forEach(elemento => {
  elemento.addEventListener('click', manejarClickGenero);
});

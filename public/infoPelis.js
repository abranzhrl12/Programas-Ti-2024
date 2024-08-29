const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ5ZDM1YzVhODI5YTFlMWZiOWYxNmU4NGVmZDBkMyIsIm5iZiI6MTcyMzczOTI5OC4yMzY4ODcsInN1YiI6IjY2YjhiZjA2Yjk5M2E0YWM3YWY2ZWRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IjYIcnw-1YdzrBn-HlxfNmiNUbyz2oZwLoNFQ3B9rsE';

let MOVIE_NAME = 'Deadpool & Wolverine';
getMovieIdByName(MOVIE_NAME);



//api themviedb
async function getMovieIdByName(movieName) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&language=es-MX`, {
          headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json;charset=utf-8'
          }
      });

      if (!response.ok) {
          throw new Error('Failed to search movie by name');
      }

      const searchResults = await response.json();
      
      if (searchResults.results && searchResults.results.length > 0) {
          const firstResult = searchResults.results[0];
          const movieId = firstResult.id;
          
          fetchMovieDetailsById(movieId);
      } else {
          console.log('No se encontraron resultados.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

async function fetchMovieDetailsById(movieId) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-ES`, {
          headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json;charset=utf-8'
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch movie details');
      }

      const movieDetails = await response.json();
      
      // Usar w780 para el fondo (backdrop) y w342 para el póster
      document.querySelector('.Detalle-Pelicula__back').src = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
      // document.querySelector('.Detalle-Pelicula__img').src = `https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`;
      document.querySelector('.Detalle-Pelicula__titulo').textContent = movieDetails.title;
      let descr  = movieDetails.overview;
      const durate= `${movieDetails.runtime}`;
  
   // Duración
       document.querySelector('.Detalle-Pelicula__duracion').textContent =formatDuration(durate)

       document.querySelector('.Detalle-Pelicula__descripcion').textContent=cortarDescripcion(descr)
      document.getElementById('movie-year').textContent = `${movieDetails.release_date.split('-')[0]}`;
    //calificacion
     // Calificación
     const rating = movieDetails.vote_average; // Calificación en escala de 0 a 10
     document.querySelector('.Detalle-Pelicula__calif').textContent = `${rating}`;

      //clasificacion
      const releaseDatesResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    
    if (!releaseDatesResponse.ok) {
        throw new Error('Failed to fetch release dates');
    }

    const releaseDates = await releaseDatesResponse.json();
    // Encuentra la clasificación en Estados Unidos
    const releaseInfo = releaseDates.results.find(result => result.iso_3166_1 === 'US'); 
    const certification = releaseInfo ? releaseInfo.release_dates[0].certification : 'No disponible';
    
    // Interpretar la clasificación
    const interpretation = interpretCertification(certification);
    document.querySelector('.Detalle-Pelicula__clasification').textContent = `  ${interpretation}`;


  } catch (error) {
      console.log('Error:', error);
  }
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  
  function interpretCertification(certification) {
    switch (certification) {
        case 'G':
            return '5+'; // Apto para todas las edades
        case 'PG':
            return '7+'; // Apto para mayores de 7 años
        case 'PG-13':
            return '13+'; // Apto para mayores de 13 años
        case 'R':
            return '17+'; // Apto para mayores de 17 años
        case 'NC-17':
            return '18+'; // Solo para mayores de 18 años
        default:
            return 'Desconocida'; // Para clasificaciones no listadas
    }
  }
  
  function cortarDescripcion(texto) {
    // Divide el texto en partes utilizando el punto (.) como delimitador
    const partes = texto.split('.');
  
    // Verifica si hay al menos tres partes
    if (partes.length > 3) {
        // Une las primeras tres partes y añade puntos al final para mantener la estructura
        return partes.slice(0, 3).join('.') + '.';
    } else {
        // Si hay menos de tres puntos, devuelve el texto tal cual
        return texto;
    }
  }
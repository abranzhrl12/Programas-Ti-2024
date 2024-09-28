
document.addEventListener('DOMContentLoaded', async function () {
    let MOVIE_NAME2 = 'Robot salvaje (The Wild Robot)';
    getMovieIdByName(MOVIE_NAME2);
            const video = document.getElementById('video');
            const source = 'https://vz-6c2d4433-dec.b-cdn.net/778f9e1b-5035-4911-bb11-f2a96f427601/playlist.m3u8';

            const hls = new Hls();

            if (Hls.isSupported()) {
                hls.loadSource(source);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    video.play().catch(error => {
                        console.error('Error al intentar reproducir el video:', error);
                    });
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = source;
                video.addEventListener('loadedmetadata', function () {
                    video.play().catch(error => {
                        console.error('Error al intentar reproducir el video:', error);
                    });
                });
            }
            // Agregar evento de clic para alternar reproducción
            video.addEventListener('click', function () {
                if (video.paused) {
                    video.play().catch(error => {
                        console.error('Error al intentar reproducir el video:', error);
                    });
                } else {
                    video.pause();
                }
            });    
        });
        const cerrarModal = document.querySelector('.videoModal__close');
        cerrarModal.addEventListener('click', () => {
            const modalAbierto = document.querySelector('.videoModal');
            modalAbierto.style.display = 'none';

            // Activar el audio al cerrar el modal
            const video = document.getElementById('video');
            video.muted = false; // Desmutear el video
        });
        const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ5ZDM1YzVhODI5YTFlMWZiOWYxNmU4NGVmZDBkMyIsIm5iZiI6MTcyMzczOTI5OC4yMzY4ODcsInN1YiI6IjY2YjhiZjA2Yjk5M2E0YWM3YWY2ZWRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IjYIcnw-1YdzrBn-HlxfNmiNUbyz2oZwLoNFQ3B9rsE';
        const starTemplates = {
            "vacia": `
                <svg class="trailers__estrella-vacia" width="22" id="Capa_2" data-name="Capa 2" viewBox="0 0 11.86 11.33" stroke="1" stroke-width="0.3">
          <g id="Capa_1-2" data-name="Capa 1" >
          <path stroke="yellow"  class="cls-1"  d="m5.93.51l1.44,2.93c.14.29.42.49.74.54l3.24.45-2.35,2.29c-.23.23-.34.55-.28.88l.57,3.23-2.91-1.53c-.14-.07-.3-.11-.46-.11s-.32.04-.46.11l-2.89,1.54.56-3.24c.06-.32-.05-.65-.28-.88L.49,4.45l3.25-.47c.32-.05.6-.25.74-.54l1.44-2.92m0-.51c-.17,0-.35.09-.44.27l-1.45,2.95c-.07.14-.21.24-.37.27l-3.25.47c-.4.06-.56.55-.27.83l2.35,2.29c.12.11.17.27.14.43l-.56,3.24c-.05.32.2.57.48.57.08,0,.15-.02.23-.06l2.91-1.53c.07-.04.15-.06.23-.06s.16.02.23.06l2.91,1.53c.07.04.15.06.23.06.28,0,.54-.26.48-.57l-.56-3.24c-.03-.16.03-.32.14-.43l2.35-2.29c.29-.28.13-.78-.27-.83l-3.25-.47c-.16-.02-.3-.12-.37-.27L6.37.27c-.09-.18-.26-.27-.44-.27h0Z"/>
          </g>
          </svg>
            `,
          "15":`
          <svg class="trailers__estrella-15" width="22"  id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.87 11.33" stroke="1" stroke-width="0.3">
          <defs>
          <style>
          .cls-1 {
          fill: yellow !important;
          }
          </style>
          </defs>
          <g id="Capa_1-2" data-name="Capa 1">
          <path stroke="yellow" class="cls-1" d="m11.71,4.79c.29-.28.13-.77-.27-.83l-3.25-.47c-.16-.02-.3-.12-.37-.27L6.37.28c-.09-.19-.27-.28-.44-.28-.18,0-.35.09-.44.28l-1.45,2.94c-.03.06-.07.11-.11.14-.07.08-.16.12-.26.13l-3.25.47c-.26.04-.42.26-.42.49,0,.12.05.24.15.34l2.35,2.3c.11.11.17.27.14.43l-.56,3.24c-.06.4.35.7.71.51l1.14-.6,1.77-.93c.07-.03.15-.05.23-.05s.15.02.23.05l2.9,1.53c.08.04.15.06.23.06.28,0,.54-.26.48-.57l-.55-3.24c-.03-.16.02-.32.14-.43l2.35-2.3Zm-2.41,6.04l-2.91-1.53c-.14-.07-.3-.11-.46-.11s-.32.04-.46.11l-1.54.82-.64.34v-6.41l.45-.07c.07-.01.13-.02.19-.05.24-.08.44-.26.55-.49l1.45-2.92,1.44,2.92c.15.29.42.5.75.54l3.24.46-2.35,2.29c-.24.23-.34.55-.29.87l.58,3.23Z"/>
          </g>
          </svg>
          `,
          
          
            "25": `
              <svg class="trailers__estrella-25" width="22"  id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.87 11.33" stroke="1" stroke-width="0.3">
          <defs>
          <style>
          .cls-1 {
          fill: yellow!important;
          }
          </style>
          </defs>
          <g id="Capa_1-2" data-name="Capa 1">
          <path stroke="yellow"  class="cls-1" d="m11.72,4.8c.29-.29.13-.78-.27-.84l-3.25-.47c-.16-.02-.3-.12-.37-.27L6.37.28c-.09-.18-.26-.28-.43-.28-.18,0-.35.1-.44.28l-1.46,2.94c-.07.15-.21.25-.36.27l-3.25.47c-.41.06-.57.55-.28.84l2.36,2.29c.11.11.16.27.14.43l-.56,3.24c-.05.31.2.57.48.57.08,0,.16-.02.23-.06l2.91-1.53c.07-.03.15-.05.23-.05.07,0,.15.02.22.05l2.91,1.53c.07.04.15.06.23.06.28,0,.53-.26.48-.57l-.56-3.24c-.02-.16.03-.32.14-.43l2.36-2.29Zm-2.42,6.03l-2.9-1.53c-.15-.07-.31-.11-.46-.11-.16,0-.32.04-.46.11l-2.9,1.54.56-3.23c.05-.33-.05-.65-.28-.88L.5,4.46l3.25-.48c.32-.04.6-.24.74-.54l1.45-2.92,1.44,2.92c.14.3.42.5.74.54l3.25.46-2.35,2.29c-.24.23-.34.55-.29.88l.57,3.22Z"/>
          <path class="cls-1" d="m3.89,3.94v6.2l-1.31.7.56-3.23c.05-.33-.05-.65-.28-.88L.5,4.46l3.25-.48s.1-.02.14-.04Z"/>
          </g>
          </svg>
            `,
            "50": `
               <svg class="trailers__estrella-50" width="22" id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.87 11.33" stroke="1" stroke-width="0.3">
          <defs>
          <style>
          .cls-1 {
          fill: yellow!important;
          }
          </style>
          </defs>
          <g id="Capa_1-2" data-name="Capa 1">
          <path stroke="yellow" class="cls-1" d="m11.72,4.8c.29-.29.13-.78-.27-.84l-3.25-.47c-.16-.02-.3-.12-.37-.27L6.37.28c-.09-.18-.26-.28-.43-.28-.18,0-.35.1-.44.28l-1.46,2.94c-.07.15-.21.25-.36.27l-3.25.47c-.41.06-.57.55-.28.84l2.36,2.29c.11.11.16.27.14.43l-.56,3.24c-.05.31.2.57.48.57.08,0,.16-.02.23-.06l2.91-1.53c.07-.03.15-.05.23-.05.07,0,.15.02.22.05l2.91,1.53c.07.04.15.06.23.06.28,0,.53-.26.48-.57l-.56-3.24c-.02-.16.03-.32.14-.43l2.36-2.29Zm-2.42,6.03l-2.9-1.53c-.15-.07-.31-.11-.46-.11-.16,0-.32.04-.46.11l-2.9,1.54.56-3.23c.05-.33-.05-.65-.28-.88L.5,4.46l3.25-.48c.32-.04.6-.24.74-.54l1.45-2.92,1.44,2.92c.14.3.42.5.74.54l3.25.46-2.35,2.29c-.24.23-.34.55-.29.88l.57,3.22Z"/>
          <path class="cls-1" d="m5.94.52v8.67c-.16,0-.32.04-.46.11l-2.9,1.54.56-3.23c.05-.33-.05-.65-.28-.88L.5,4.46l3.25-.48c.32-.04.6-.24.74-.54l1.45-2.92Z"/>
          </g>
          </svg>
            `,
            "75": `
                 <svg class="trailers__estrella-75" width="22" id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.87 11.33" stroke="1" stroke-width="0.3">
          
          <g id="Capa_1-2" data-name="Capa 1">
          <path stroke="yellow" class="cls-1" d="m11.72,4.8c.29-.29.13-.78-.27-.84l-3.25-.47c-.16-.02-.3-.12-.37-.27L6.37.28c-.09-.18-.26-.28-.43-.28-.18,0-.35.1-.44.28l-1.46,2.94c-.07.15-.21.25-.36.27l-3.25.47c-.41.06-.57.55-.28.84l2.36,2.29c.11.11.16.27.14.43l-.56,3.24c-.05.31.2.57.48.57.08,0,.16-.02.23-.06l2.91-1.53c.07-.03.15-.05.23-.05.07,0,.15.02.22.05l2.91,1.53c.07.04.15.06.23.06.28,0,.53-.26.48-.57l-.56-3.24c-.02-.16.03-.32.14-.43l2.36-2.29Zm-2.42,6.03l-1.32-.7V3.94c.05.02.09.03.14.04l3.25.46-2.35,2.29c-.24.23-.34.55-.29.88l.57,3.22Z"/>
          </g>
          </svg>
            `,
          
            "90":`
          <svg class="trailers__estrella-90" width="22"  id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.87 11.33" stroke="1" stroke-width="0.3">
          <defs>
          <style>
          .cls-1 {
          fill: #yellow;
          }
          </style>
          </defs>
          <g stroke="yellow" id="Capa_1-2" data-name="Capa 1">
          <path class="cls-1" d="m11.71,4.79c.29-.28.13-.77-.27-.83l-.2-.03-2.68-.39-.37-.05c-.16-.02-.3-.12-.37-.27L6.37.28c-.09-.19-.27-.28-.44-.28-.18,0-.35.09-.44.28l-1.45,2.94c-.03.06-.07.11-.11.14-.07.08-.16.12-.26.13l-3.25.47c-.26.04-.42.26-.42.49,0,.12.05.24.15.34l2.35,2.3c.11.11.17.27.14.43l-.56,3.24c-.06.4.35.7.71.51l1.14-.6,1.77-.93c.07-.03.15-.05.23-.05s.15.02.23.05l2.9,1.53c.07.04.14.06.21.06h.02c.28,0,.54-.26.48-.57l-.55-3.24c-.03-.16.02-.32.14-.43l2.35-2.3Zm-2.99,2.71l.07.5.51,2.83-.11-.06-.63-.33v-6.4l2.3.33.5.07-2.35,2.29c-.19.19-.29.44-.3.69v.02s.01.04.01.06Z"/>
          </g>
          </svg>
          `,
          
          
            "100": `
                <svg class="trailers__estrella-100" width="22" id="Capa_2" data-name="Capa 2"  viewBox="0 0 11.86 11.33" stroke="1" stroke-width="0.3">
          <defs>
          <style>
          .cls-1 {
          fill: yellow;
          }
          </style>
          </defs>
          <g id="Capa_1-2" data-name="Capa 1">
          <path stroke="yellow" class="cls-1" d="m6.37.27l1.45,2.95c.07.14.21.24.37.27l3.25.47c.4.06.56.55.27.83l-2.35,2.29c-.12.11-.17.27-.14.43l.56,3.24c.07.4-.35.7-.71.52l-2.91-1.53c-.14-.07-.31-.07-.45,0l-2.91,1.53c-.36.19-.78-.12-.71-.52l.56-3.24c.03-.16-.03-.32-.14-.43L.15,4.79c-.29-.28-.13-.78.27-.83l3.25-.47c.16-.02.3-.12.37-.27L5.49.27c.18-.36.7-.36.88,0Z"/>
          </g>
          </svg>
            `
          };
          function generateStars(rating) {
          const container = document.querySelector('.trailers__estrellas');
          container.innerHTML = ''; // Limpiar el contenedor
          
          const fullStars = Math.floor(rating);
          const remainder = rating - fullStars;
          
          // Añadir estrellas completas
          for (let i = 0; i < fullStars; i++) {
          container.innerHTML += starTemplates["100"];
          }
          
          // Añadir estrella con porcentaje según el decimal
          if (remainder > 0 && remainder <= 0.20) {
          container.innerHTML += starTemplates["15"];
          } else if (remainder > 0.20 && remainder <= 0.40) {
          container.innerHTML += starTemplates["25"];
          } else if (remainder > 0.40 && remainder <= 0.60) {
          container.innerHTML += starTemplates["50"];
          } else if (remainder > 0.60 && remainder <= 0.80) {
          container.innerHTML += starTemplates["75"];
          } else if (remainder > 0.80 && remainder <= 1.00) {
          container.innerHTML += starTemplates["90"];
          }
          // Añadir estrella completa si el decimal es exacto (1)
          if (remainder === 1.00) {
          container.innerHTML += starTemplates["100"];
          }
          
          // Añadir estrellas vacías si es necesario
          const totalStars = 5;
          const starsToFill = fullStars + (remainder > 0 ? 1 : 0);
          const emptyStars = totalStars - starsToFill;
          
          for (let i = 0; i < emptyStars; i++) {
          container.innerHTML += starTemplates["vacia"];
          }
          }      
          //para trailers
          async function getMovieIdByName(movieName) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&language=es-ES`, {
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
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-MX`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
          
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
          
                const movieDetails = await response.json();
                
                let descr  = movieDetails.overview;
                const durate= `${movieDetails.runtime}`;
            
             // Duración
                  document.querySelector('.trailers__tiempo').textContent =`${durate} min`
          
                 document.querySelector('.trailers__resumen').textContent=cortarDescripcion(descr)
                document.querySelector('.trailers__año').textContent = `${movieDetails.release_date.split('-')[0]}`;
              //calificacion
               // Calificación
               const rating = movieDetails.vote_average; // Calificación en escala de 0 a 10
                console.log(rating + "holaaa")
               generateStars(rating/2)
              //  generateStars(rating/2)
          
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
               document.querySelector('.trailers__interpretacion').textContent = `  ${interpretation}`;
          
          
            } catch (error) {
                console.log('Error:', error);
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
          }
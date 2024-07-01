import { verificarCredenciales } from "./Conexion/conexion";
 function cargarDatosUsuario() {
    try {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            console.log(JSON.parse(usuarioGuardado))
            return JSON.parse(usuarioGuardado);
        } else {
            console.log('No se encontraron datos guardados en localStorage.');
            return null;
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario desde localStorage:', error);
        return null;
    }
}
 
import {peliculas , generarPlantillaPelicula} from "./Peliculas/Peliculas";
import seguridad from "./Peliculas/Seguridad";
import {calcularProgramasPorPaginaActual} from "./Peliculas/cantidaPagina"
let widthViewport = window.innerWidth;
let programasPorPagina =  calcularProgramasPorPaginaActual();;
let paginaActual = 1;
// Variable para controlar el estado anterior de las herramientas de desarrollador
let herramientasAbiertasPrevias = false;

let view2=window.innerWidth;

let view=window.innerWidth;

function agregarPeliculasAlGrid(peliculas) {
    generarPeliculas(peliculas);

    try {
        const grid = document.querySelector('.Peliculas__grid');
        grid.addEventListener('click', async (event) => {
            const tarjeta = event.target.closest('.Peliculas__card');
        
            // Verificar si el usuario está autenticado y obtener sus datos
            const usuarioActual = cargarDatosUsuario();
            console.log("Usuario actual:", usuarioActual);

            if (usuarioActual && usuarioActual.usuario && usuarioActual.contraseña) {
                console.log('Usuario autenticado:', usuarioActual.usuario);
                if (tarjeta) {
                    const idPelicula = tarjeta.getAttribute('data-id');
                    const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
                    if (peliculaSeleccionada) {
                        // Comparar los datos del usuario con los datos en Firebase para la película seleccionada
                        const authenticated = await verificarCredenciales(usuarioActual.usuario, usuarioActual.contraseña);
                        
                        if (authenticated) {
                            // Si los datos coinciden, cargar el video de la película seleccionada
                            await cargarVideoPelicula(peliculaSeleccionada.Video);
                            const irVideo=document.querySelector("#fullscreenBtn")
                            console.log(irVideo)
                            irVideo.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            // Si los datos no coinciden, redirigir al usuario a la página de inicio de sesión
                            console.log('Los datos del usuario en localStorage no coinciden con los datos en Firebase.');
                             window.location.href = 'login.html';
                        }
                    }
                }
            } else {
                console.log('No se encontraron datos de usuario guardados o el usuario no está autenticado.');
                
                // Redirigir a la página de inicio de sesión si el usuario no está autenticado
                window.location.href = 'login.html'; 
            }
        });
    } catch (error) {
        console.error('Error al manejar el evento click en la tarjeta:', error);
    }
}

// function agregarPeliculasAlGrid(peliculas) {
//         generarPeliculas(peliculas);
//     try {
//         grid.addEventListener('click', async (event) => {
//             const tarjeta = event.target.closest('.Peliculas__card');
        
//             // Verificar si el usuario está autenticado
//             const usuarioActual = cargarDatosUsuario();
//             if (usuarioActual) {
//                 console.log('Usuario autenticado:', usuarioActual.email);
//                 if (tarjeta) {
//                     const idPelicula = tarjeta.getAttribute('data-id');
//                     const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
//                     if (peliculaSeleccionada) {
//                         // Llamar a la función para cargar el video de la película seleccionada
//                         await cargarVideoPelicula(peliculaSeleccionada.Video);
//                         irVideo.scrollIntoView({ behavior: 'smooth' });
//                     }
//                 }
//             } else {
//                 console.log('No se encontraron datos de usuario guardados o el usuario no está autenticado.');
                
//                 // Redirigir a la página de inicio de sesión si el usuario no está autenticado
//                  window.location.href = 'login.html'; 
//             }
//         });
//     } catch (error) {
        
//     } 
// }
function generarPeliculas(pelicula){
    let irVideo = document.querySelector("#Videosplay");
    const grid = document.querySelector('.Peliculas__grid');
    if (!grid) {
        throw new Error("No se encontró el contenedor Peliculas__grid.");
    }
    grid.innerHTML = ""; // Limpiar contenido anterior
    
    // Obtener el número actual de programas por página
    const programasPorPaginaActual = calcularProgramasPorPaginaActual();
    
    // Calcular inicio y fin según la página actual y programasPorPaginaActual
    const inicio = (paginaActual - 1) * programasPorPaginaActual;
    const fin = inicio + programasPorPaginaActual;
    
    // Obtener las películas de la página actual
    const programasPagina = peliculas.slice(inicio, fin);

    programasPagina.forEach(pelicula => {
        const peliculaHTML = generarPlantillaPelicula(pelicula);
        grid.innerHTML += peliculaHTML;
    });
}

function generarPaginacion() {
    try {
        // Obtener el número actual de programas por página
        const programasPorPaginaActual = calcularProgramasPorPaginaActual();

        // Calcular el total de páginas según el número actual de programas por página y la cantidad de películas
        const totalPaginas = Math.ceil(peliculas.length / programasPorPaginaActual);

        const contenedorPaginacion = document.querySelector(".paginas");
        contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
        const currentPage = getCurrentPage();

        // Generar botones de paginación hasta el número total de páginas
        for (let index = 1; index <= totalPaginas; index++) {
            const btnpaginacion = document.createElement("button");
            btnpaginacion.classList.add("paginas__btn");
            btnpaginacion.textContent = index;

            if (index === currentPage) {
                btnpaginacion.classList.add("active"); // Marcar el botón de la página actual
            }

            btnpaginacion.addEventListener("click", () => {
                setPage(index); // Establecer la página al hacer clic
                agregarPeliculasAlGrid(peliculas);

                contenedorPaginacion.querySelectorAll(".paginas__btn").forEach((btn) => {
                    btn.classList.remove("active");
                });

                // Agregar la clase "active" solo al botón de la página actual
                btnpaginacion.classList.add("active");
            });

            contenedorPaginacion.appendChild(btnpaginacion);
        }
    } catch (error) {
        console.error("Error al generar la paginación:", error);
    }
}


window.addEventListener("resize", () => {
    view2=window.innerWidth;
      try {
      //   calcularProgramasPorPaginaActual();
      //   agregarPeliculasAlGrid(peliculas)
      // verificarHerramientasDesarrollador();
      // herramientasDev()
      programasPorPagina = calcularProgramasPorPaginaActual();
  
      // Actualizar la página actual para asegurar que esté dentro de los límites de las páginas disponibles
      if (paginaActual > Math.ceil(peliculas.length / programasPorPagina)) {
          paginaActual = Math.ceil(peliculas.length / programasPorPagina);
      }
  
      // Volver a agregar las películas al grid con el nuevo número de programas por página
      agregarPeliculasAlGrid(peliculas);
      
      // Volver a generar la paginación con el nuevo número de programas por página
      generarPaginacion();
      } catch (error) {
          console.error("Error al manejar el evento resize:", error);
      }
  });
  
  function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    let hash = window.location.hash; // Obtener el hash actual
    
    // Si el hash está vacío o no es '#peliculas', establecerlo en '#peliculas'
    if (!hash || hash !== '#peliculas') {
        hash = '#peliculas';
        window.history.replaceState({}, "", `${window.location.pathname}?peliculas&page=${params.get("page")}`);
    }
    
    return parseInt(params.get("page")) || 1;
}

function setPage(page) {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
    );
    paginaActual = page; // Actualizar la página actual
    agregarPeliculasAlGrid(peliculas); // Cargar los programas de la página actual
    generarPaginacion(); // Volver a generar la paginación para reflejar el cambio de página
}

window.addEventListener('DOMContentLoaded', (event) => {
    try {
    
        view=window.innerWidth;
        agregarPeliculasAlGrid(peliculas);
        generarPaginacion();
        cargarDatosUsuario(); 
    } catch (error) {
        
    }
    
  });
  function cargarVideoPelicula(pelicula) {
try {
    const videoPelicula = document.querySelector('.DetallePrograma__ConVideo');
    if (!videoPelicula) {
        throw new Error("No se encontró el contenedor .DetallePrograma__ConVideo.");
    }

    const plantilla = `
      <iframe id="myIframe" src=${pelicula}?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>
    `;
    videoPelicula.innerHTML = plantilla;
} catch (error) {
    
}

  
}
window.addEventListener("popstate", () => {
    paginaActual = getCurrentPage(); // Actualizar la página actual según la URL
    setPage(paginaActual);
    agregarPeliculasAlGrid(peliculas); // Cargar los programas de la página actual
    generarPaginacion(); // Regenerar la paginación para marcar el botón de la página actual
  });
  
  
  window.addEventListener("load", () => {
    try {
        cargarDatosUsuario(); 
    } catch (error) {
        
    }
   
    const currentPage = getCurrentPage(); // Obtener la página actual desde la URL
    setPage(currentPage); // Establecer la página actual y cargar los programas
  });
  
document.getElementById('fullscreenBtn').addEventListener('click', function() {
    var iframe = document.getElementById('myIframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
  });

  
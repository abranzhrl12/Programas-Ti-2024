// import platform from 'platform';
import { obtenerDetallesDispositivo } from "./Peliculas/dispostivo"; // Importa la función desde dispositivo.js
import {
  verificarCredenciales,
  verificarDispositivo,
  verificarFechaExpiracion,
} from "./Conexion/conexion";
import peliss from "./Peliculas/categoriasPeliculas";
import { peliculas, generarPlantillaPelicula } from "./Peliculas/Peliculas";
import { calcularProgramasPorPaginaActual } from "./Peliculas/cantidaPagina";
import { cargarDatosUsuario } from "./Peliculas/datosUsuario";
import {
  iconobusqueda,
  buscarPelicula,
  buscarPeliculaInput,
  btnBuscarPelicula,
  seccionPeliculas,
  inicializarBusqueda,
  actualizarPeliculas,
} from "./Peliculas/busquedaPelicula";
import {
  desactivarMenuContextual,
  desactivarTeclasDesarrollo,
} from "./Peliculas/Seguridad";
import peliculasData from "./Datos/datosPelis";
// import '@justinribeiro/lite-youtube';

// Llama a las funciones para activar la desactivación de menú y teclas de desarrollo
desactivarMenuContextual();
desactivarTeclasDesarrollo();

// import {initializeSwiper} from './Peliculas/swipper.js';
let widthViewport = window.innerWidth;
let programasPorPagina = calcularProgramasPorPaginaActual();
let paginaActual = 1;
let view = window.innerWidth;
let MOVIE_NAME = 'Tadeo ';
let usuarioAutenticado = cargarDatosUsuario();
const gridd = document.querySelector(".Peliculas__grid");

function generarPeliculas(peliculas, cantidadMostrar = 0) {
  const grid = document.querySelector(".Peliculas__grid");
  if (!grid) {
    throw new Error("No se encontró el contenedor Peliculas__grid.");
  }
  grid.innerHTML = ""; // Limpiar contenido anterior

  if (!peliculas || !Array.isArray(peliculas)) {
    console.log("La variable 'peliculas' no está definida o no es un array.");
    return;
  }

  const { inicial, incremento, limite } = programasPorPagina;
  const cantidad = cantidadMostrar || inicial;

  // Si el ancho de la ventana es menor a 900 píxeles, omite el límite
  const esPantallaPequena = window.innerWidth < 920;
  const limiteReal = esPantallaPequena ? peliculas.length : limite;

  // Calcular inicio y fin según la página actual y cantidad de películas a mostrar
  const inicio = (paginaActual - 1) * cantidad;
  const fin = Math.min(inicio + cantidad, peliculas.length);

  // Obtener las películas de la página actual
  const programasPagina = peliculas.slice(inicio, fin);

  programasPagina.forEach((pelicula) => {
    const peliculaHTML = generarPlantillaPelicula(pelicula);
    grid.innerHTML += peliculaHTML;
  });

  const botonVerMas = document.querySelector(".boton-vermas");
  if (cantidad >= limiteReal || fin >= peliculas.length) {
    botonVerMas.style.display = "none";
  } else {
    botonVerMas.style.display = "block";
  }
}
function agregarPeliculasAlGrid(peliculas) {
  generarPeliculas(peliculas);

  try {
    const grid = document.querySelector(".Peliculas__grid");

    // Remover cualquier evento existente antes de agregar uno nuevo
    grid.removeEventListener("click", handlePeliculaClick);
    grid.addEventListener("click", handlePeliculaClick);
  } catch (error) {
    console.log("Error al manejar el evento click en la tarjeta:", error);
  }
}


async function handlePeliculaClick(event) {
  event.preventDefault();

  const tarjeta = event.target.closest(".Peliculas__card");

  if (!tarjeta) return;

  buscarPeliculaInput.value = "";

  // generarPaginacion(peliculas);

  usuarioAutenticado = cargarDatosUsuario(); // Recargar datos del usuario desde localStorag

  if (usuarioAutenticado) {
    const idPelicula = tarjeta.getAttribute("data-id");
    const peliculaSeleccionada = peliculas.find(
      (pelicula) => pelicula.id == idPelicula
    );
    if (peliculaSeleccionada) {
      const { correo, contraseña, usuarioId } = usuarioAutenticado;

      let detallesDispositivo = await obtenerDetallesDispositivo(); // Declarar aquí

      const credencialesResultado = await verificarCredenciales(
        correo,
        contraseña
      );
      if (!credencialesResultado.authenticated) {
        alert(credencialesResultado.reason);
        localStorage.removeItem("usuarioAutenticado");
        localStorage.removeItem("usuario");
        localStorage.removeItem("deviceId");
        window.location.href = "login.html";
        return;
      }

      const fechaExpiracionResultado = verificarFechaExpiracion(
        credencialesResultado.userData.fechaExpiracion
      );
      if (fechaExpiracionResultado.expired) {
        alert(
          "Tu cuenta ha expirado. Por favor, comunícate con el administrador del servicio."
        );
        return;
      }

      const dispositivoResultado = await verificarDispositivo(
        usuarioId,
        detallesDispositivo.deviceId
      );
      if (!dispositivoResultado.verified) {
        alert(dispositivoResultado.reason);
        localStorage.removeItem("usuarioAutenticado");
        localStorage.removeItem("usuario");
        localStorage.removeItem("deviceId");
        window.location.href = "login.html";
        return;
      }
      // const infopeli=document.querySelector(".Detalle-Pelicula")
      // infopeli.classList.toggle.add('active')
      MOVIE_NAME =  peliculaSeleccionada.nombre;
      getMovieIdByName(MOVIE_NAME);
      await cargarVideoPelicula(peliculaSeleccionada.Video);
      const irVideo = document.querySelector("#fullscreenBtn");
      irVideo.scrollIntoView({ behavior: "smooth" });
      // Agregar un retraso de 200ms antes de ejecutar la función generarPeliculas
     
    }
  } else {
    alert(
      "No se encontraron datos de usuario guardados o el usuario no está autenticado."
    );
    window.location.href = "login.html";
  }
}
inicializarBusqueda(iconobusqueda, buscarPelicula, buscarPeliculaInput);

btnBuscarPelicula.addEventListener("click", () => {

  actualizarPeliculas(
    buscarPeliculaInput,
    peliculas,
    generarPeliculas,
    generarPaginacion,
    seccionPeliculas,
    paginaActual
  );
});

const iconobus=document.querySelector(".icono-busqueda")

iconobus.addEventListener("click", () => {

  actualizarPeliculas(
    buscarPeliculaInput,
    peliculas,
    generarPeliculas,
    generarPaginacion,
    seccionPeliculas,
    paginaActual
  );
});


buscarPeliculaInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se realice el comportamiento predeterminado
    actualizarPeliculas(
      buscarPeliculaInput,
      peliculas,
      generarPeliculas,
      generarPaginacion,
      seccionPeliculas,
      paginaActual
    );
  }
});

function agregarBotonVerMas(peliculas) {
  const botonVerMas = document.querySelector(".boton-vermas");
  if (!botonVerMas) return;

  botonVerMas.style.display = "block"; // Asegurarse de que el botón esté visible

  // Remove any existing event listeners to prevent multiple increments
  const newButton = botonVerMas.cloneNode(true);
  botonVerMas.parentNode.replaceChild(newButton, botonVerMas);

  newButton.addEventListener("click", () => {
    const grid = document.querySelector(".Peliculas__grid");
    const peliculasMostradas = grid.querySelectorAll(".Peliculas__card").length;
    const { incremento, limite } = programasPorPagina;
    const nuevasPeliculas = peliculasMostradas + incremento;

    if (nuevasPeliculas >= limite) {
      newButton.style.display = "none";
    }

    generarPeliculas(peliculas, nuevasPeliculas);
  });
}

function generarPaginacion(peliculas) {
  if (!peliculas || !Array.isArray(peliculas)) {
    console.log("La variable 'peliculas' no está definida o no es un array.");
    return;
  }

  try {
    const totalPaginas = Math.ceil(
      peliculas.length / programasPorPagina.limite
    );
    const contenedorPaginacion = document.querySelector(".paginas");
    contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
    const currentPage = getCurrentPage();

    for (let index = 1; index <= totalPaginas; index++) {
      const btnpaginacion = document.createElement("button");
      btnpaginacion.classList.add("paginas__btn");
      btnpaginacion.textContent = index;

      if (index === currentPage) {
        btnpaginacion.classList.add("active");
      }

      btnpaginacion.addEventListener("click", () => {
        setPage(index);
        paginaActual = index;
        generarPeliculas(peliculas);
        agregarBotonVerMas(peliculas);
     
        contenedorPaginacion
          .querySelectorAll(".paginas__btn")
          .forEach((btn) => {
            btn.classList.remove("active");
          });

        btnpaginacion.classList.add("active");
        setTimeout(() => {
          // Selecciona todos los elementos con la clase '.Peliculas__card'
          const cards = document.querySelectorAll(".Peliculas__card");
        
          // Verifica si hay al menos una tarjeta en la lista
          if (cards.length > 0) {
            // Selecciona la última tarjeta
            const ultimaCard = cards[cards.length - 8];
        
      
        
            // Desplaza suavemente a la última tarjeta
            ultimaCard.scrollIntoView({
              behavior: "smooth", // Activa el desplazamiento suave
              block: "start", // Desplaza el contenedor al principio del área visible
            });
          } else {
            console.log("No se encontraron tarjetas con la clase '.Peliculas__card'");
          }
        }, 200); // Ajusta el tiempo si es necesario
        
      });

      contenedorPaginacion.appendChild(btnpaginacion);
    }
  } catch (error) {
    console.error("Error al generar la paginación:", error);
  }
}

// agregarPeliculasAlGrid(peliculas)
window.addEventListener("DOMContentLoaded", async ()=> {
  try {
    await verificarYConfigurar2();
    // programasPorPagina = programasPorPagina;
    // Asegúrate de que la variable 'peliculas' esté definida y no sea nula
    if (peliculas && peliculas.length > 0) {

      agregarPeliculasAlGrid(peliculas);

      // Verificar el ancho de la pantalla antes de generar la paginación
      if (window.innerWidth > 920) {
        // Volver a generar la paginación solo si el ancho de la pantalla es mayor a 900 píxeles
        generarPaginacion(peliculas);
      }
    }
  } catch (error) {
    console.error("Error al manejar el evento DOMContentLoaded:", error);
  }
});
window.addEventListener("resize", async() => {

  await verificarYConfigurar2()
});
async function verificarYConfigurar2() {
  // Verificar si hay datos de usuario en localStorage
  const usuario = localStorage.getItem('usuarioAutenticado');
  const btnperfil = document.querySelector(".navegacion__boton");
  const btnlogueoperfil=document.querySelector(".navegacion__perfil")
  
  if (usuario) {
    // El usuario está autenticado, configurar la interfaz
  

   
    if (btnperfil) {
      btnperfil.textContent = "";
      btnperfil.style.display = "none";
    
      if (window.innerWidth > 924) {
        
        btnlogueoperfil.style.display="block"
        btnlogueoperfil.addEventListener('click',()=>{
          window.location.href="perfiles.html"
        })

      }else{
    
         btnlogueoperfil.style.display="none"
      }
      // console.log(busquedainputt)
      //   busquedainputt.style.right = "19%"
    } else {
      console.log("Botón de perfil no encontrado.");
      
    }
  } else {
 
    console.log("No hay usuario autenticado en localStorage.");
  }
}



function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  let hash = window.location.hash; // Obtener el hash actual

  // Si el hash está vacío o no es '#peliculas', establecerlo en '#peliculas'
  if (!hash || hash !== "#peliculas") {
    hash = "#peliculas";
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?peliculas&page=${params.get("page")}`
    );
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
  paginaActual = page;
  generarPeliculas(peliculas);
  agregarBotonVerMas(peliculas); // Volver a agregar el botón "Ver más"
  // generarPaginacion(peliculas);
}

function cargarVideoPelicula(pelicula) {
  try {
    buscarPelicula.classList.remove("buscar-pelicula--active");
    const videoPelicula = document.querySelector(".DetallePrograma__ConVideo");
    if (!videoPelicula) {
      throw new Error(
        "No se encontró el contenedor .DetallePrograma__ConVideo."
      );
    }

    const plantilla = `
      <iframe id="myIframe" src=${pelicula}?autoplay=true&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>
    `;
    videoPelicula.innerHTML = plantilla;
  } catch (error) {}
}
window.addEventListener("popstate", () => {
  paginaActual = getCurrentPage(); // Actualizar la página actual según la URL
  setPage(paginaActual);
  agregarPeliculasAlGrid(peliculas); // Cargar los programas de la página actual
  generarPaginacion(); // Regenerar la paginación para marcar el botón de la página actual
});

window.addEventListener("load", () => {
  const currentPage = getCurrentPage(); // Obtener la página actual desde la URL
  setPage(currentPage); // Establecer la página actual y cargar los programas
});

import { enableFullscreen } from "./Peliculas/botonAgrandarVideo";

// Activa el modo fullscreen al hacer clic en el botón
enableFullscreen();
const peliculasEstreno = peliculasData.Peliculas.Extreno;
function configurarEventosGeneros() {
  const categorias = document.querySelectorAll(".Genero-categorias__figura");

  // Mostrar en la consola el número de elementos encontrados
  // console.log(`Número de categorías encontradas: ${categorias.length}`);

  categorias.forEach((categoria, index) => {
    

    categoria.addEventListener("click", manejarClickGenero);
  });
}
configurarEventosGeneros();

// Filtrar películas por género (como en tu función manejarClickGenero)
function manejarClickGenero(event) {
  const generoSeleccionado = event.currentTarget.getAttribute("data-genre");

  if (generoSeleccionado) {
    if (generoSeleccionado.trim() === "") {
      // Si el valor de data-genre está vacío, mostrar todas las películas
      console.log(
        "No se seleccionó ningún género. Mostrando todas las películas."
      );
      agregarPeliculasAlGrid(peliculas);
      agregarBotonVerMas(peliculas);

      // Solo genera la paginación si el ancho de la pantalla es mayor a 900 píxeles
      if (window.innerWidth > 920) {
        generarPaginacion(peliculas);
      }

      // Restablecer la página actual a 1
      paginaActual = 1;

      // Esperar a que el DOM se actualice antes de aplicar el desplazamiento
      setTimeout(() => {
     

        if (gridd) {
          gridd.scrollIntoView({
            behavior: "smooth", // Activa el desplazamiento suave
            block: "start", // Desplaza el contenedor al principio del área visible
          });
        }
      }, 100); // Ajusta el tiempo si es necesario
    } else {
      // Dividir el género seleccionado en un array de géneros
      const generosSeleccionados = generoSeleccionado
        .split(",")
        .map((g) => g.trim());
   

      // Filtrar las películas por el género seleccionado
      const peliculasFiltrada = peliculas.filter((pelicula) => {
        // Asegúrate de que 'Generos' existe y es un array
        if (Array.isArray(pelicula.Generos)) {
          // Verifica si alguno de los géneros de la película coincide con los géneros seleccionados
          return pelicula.Generos.some((genero) =>
            generosSeleccionados.includes(genero)
          );
        } else {
          console.warn(
            "La propiedad 'Generos' no está definida o no es un array:",
            pelicula
          );
          return false; // Excluye esta película del filtrado
        }
      });

      setPage(1);
      // Aquí puedes llamar a la función que actualiza la vista con las películas filtradas
      agregarPeliculasAlGrid(peliculasFiltrada);
    
      if(peliculasFiltrada.length>24){
        agregarBotonVerMas(peliculasFiltrada);
      }
      // Solo genera la paginación si el ancho de la pantalla es mayor a 900 píxeles
      if (window.innerWidth > 920) {
        generarPaginacion(peliculasFiltrada);   
      }else{
        const paginasss=document.getElementById("sectionpaginas")
        const generadopaginas=document.getElementById("paginastotales")
        paginasss.style.margin="0"
        generadopaginas.innerHTML="";
      
      }
     
      

      setTimeout(() => {
  

        if (gridd) {
          gridd.scrollIntoView({
            behavior: "smooth", // Activa el desplazamiento suave
            block: "start", // Desplaza el contenedor al principio del área visible
          });
        }
      }, 100);
    }
  } else {
    console.log(
      "No se encontró el atributo 'data-genre' en el elemento clickeado."
    );
  }
}

let botones = document.querySelectorAll(
  "#Movile_Home, #Movile_Peliculas, #Movile_Series, #Movile_Favoritos, #Movile_Settings"
);

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    remov_Activ();
    boton.classList.add("activ");
  });
});

function add_Active(element) {
  element.classList.add("activ");
}

function remov_Activ() {
  botones.forEach((boton) => boton.classList.remove("activ"));
}



async function verificarYConfigurar() {

  if (usuarioAutenticado) {
    const { correo, contraseña } = usuarioAutenticado;

    // Verificar las credenciales del usuario
    const credencialesResultado = await verificarCredenciales(correo, contraseña);

    if (credencialesResultado.authenticated) {
     
      // Usuario autenticado, configurar el botón de ajustes
      const settings = document.getElementById("Movile_Settings");
      settings.addEventListener('click', () => {
        window.location.href = "perfiles.html";
      });
    } else {
      alert("Credenciales incorrectas. Por favor, vuelve a iniciar sesión.");
      window.location.href = "login.html";
    }
  }
}

// Llamar a la nueva función en el contexto adecuado
verificarYConfigurar();
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ5ZDM1YzVhODI5YTFlMWZiOWYxNmU4NGVmZDBkMyIsIm5iZiI6MTcyMzczOTI5OC4yMzY4ODcsInN1YiI6IjY2YjhiZjA2Yjk5M2E0YWM3YWY2ZWRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IjYIcnw-1YdzrBn-HlxfNmiNUbyz2oZwLoNFQ3B9rsE';

  // Nombre en español

//api themviedb
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

const botonsession=document.querySelector(".navegacion__boton")

botonsession.addEventListener("click", () => {
  window.location.href = "login.html";
});
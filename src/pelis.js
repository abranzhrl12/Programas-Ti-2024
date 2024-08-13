// import platform from 'platform';
import { obtenerDetallesDispositivo } from './Peliculas/dispostivo'; // Importa la función desde dispositivo.js
import { verificarCredenciales, verificarDispositivo, verificarFechaExpiracion } from './Conexion/conexion';
import { peliculas, generarPlantillaPelicula } from "./Peliculas/Peliculas";
import { calcularProgramasPorPaginaActual } from "./Peliculas/cantidaPagina";
import { cargarDatosUsuario } from './Peliculas/datosUsuario'; 
import { iconobusqueda, buscarPelicula, buscarPeliculaInput, btnBuscarPelicula, seccionPeliculas, inicializarBusqueda, actualizarPeliculas } from './Peliculas/busquedaPelicula';
import { desactivarMenuContextual, desactivarTeclasDesarrollo } from './Peliculas/Seguridad';
// Importa la función de filtrado
// Llama a las funciones para activar la desactivación de menú y teclas de desarrollo
desactivarMenuContextual();
desactivarTeclasDesarrollo();


let widthViewport = window.innerWidth;
let programasPorPagina =  calcularProgramasPorPaginaActual();;
let paginaActual = getCurrentPage();
let herramientasAbiertasPrevias = false;
let view2=window.innerWidth;
let view=window.innerWidth;
let click=false;
console.log(click)
let paginaActual2 = 1;
let usuarioAutenticado = cargarDatosUsuario();

export function generarPeliculas(peliculas, cantidadMostrar = 0) {
  const grid = document.querySelector('.Peliculas__grid');
  if (!grid) throw new Error("No se encontró el contenedor Peliculas__grid.");
  grid.innerHTML = ""; // Limpiar contenido anterior

  if (!peliculas || !Array.isArray(peliculas)) {
      console.error("La variable 'peliculas' no está definida o no es un array.");
      return;
  }

  const { inicial, incremento, limite } = calcularProgramasPorPaginaActual();
  const cantidad = cantidadMostrar || inicial;
  const inicio = (paginaActual - 1) * limite;
  const fin = Math.min(inicio + cantidad, peliculas.length);
  const programasPagina = peliculas.slice(inicio, fin);

  programasPagina.forEach(pelicula => {
      const peliculaHTML = generarPlantillaPelicula(pelicula);
      grid.innerHTML += peliculaHTML;
  });

  const botonVerMas = document.querySelector('.boton-vermas');
  botonVerMas.style.display = (cantidad >= limite || fin >= peliculas.length) ? 'none' : 'block';
}


function inicializarAplicacion() {
  generarPeliculas(peliculas);
  agregarBotonVerMas(peliculas);
}

inicializarAplicacion();

function agregarPeliculasAlGrid(peliculas) {
  generarPeliculas(peliculas);
  try {
      const grid = document.querySelector('.Peliculas__grid');
      grid.removeEventListener('click', handlePeliculaClick);
      grid.addEventListener('click', handlePeliculaClick);
  } catch (error) {
      console.error('Error al manejar el evento click en la tarjeta:', error);
  }
}


async function handlePeliculaClick(event) {
  event.preventDefault();
  const tarjeta = event.target.closest('.Peliculas__card');
  if (!tarjeta) return;

  buscarPeliculaInput.value = '';
  generarPeliculas(peliculas);
  generarPaginacion(peliculas);

  usuarioAutenticado = cargarDatosUsuario();
  if (usuarioAutenticado) {
      const idPelicula = tarjeta.getAttribute('data-id');
      const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
      if (peliculaSeleccionada) {
          const { correo, contraseña, usuarioId } = usuarioAutenticado;
          try {
              let detallesDispositivo = await obtenerDetallesDispositivo();
              const credencialesResultado = await verificarCredenciales(correo, contraseña);

              if (!credencialesResultado.authenticated) {
                  throw new Error(credencialesResultado.reason);
              }

              const fechaExpiracionResultado = verificarFechaExpiracion(credencialesResultado.userData.fechaExpiracion);
              if (fechaExpiracionResultado.expired) {
                  throw new Error('Tu cuenta ha expirado. Por favor, comunícate con el administrador del servicio.');
              }

              const dispositivoResultado = await verificarDispositivo(usuarioId, detallesDispositivo.deviceId);
              if (!dispositivoResultado.verified) {
                  throw new Error(dispositivoResultado.reason);
              }

              await cargarVideoPelicula(peliculaSeleccionada.Video);
              document.querySelector('#fullscreenBtn').scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
              alert(error.message);
              localStorage.removeItem('usuarioAutenticado');
              localStorage.removeItem('usuario');
              localStorage.removeItem('deviceId');
              window.location.href = 'login.html';
          }
      }
  } else {
      alert('No se encontraron datos de usuario guardados o el usuario no está autenticado.');
      window.location.href = 'login.html';
  }
}

inicializarBusqueda(iconobusqueda, buscarPelicula, buscarPeliculaInput);
btnBuscarPelicula.addEventListener('click', () => {
    actualizarPeliculas(buscarPeliculaInput, peliculas, generarPeliculas, generarPaginacion, seccionPeliculas, paginaActual);
});

buscarPeliculaInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault();
      actualizarPeliculas(buscarPeliculaInput, peliculas, generarPeliculas, generarPaginacion, seccionPeliculas, paginaActual);
  }
});


export function agregarBotonVerMas(peliculas) {
  const botonVerMas = document.querySelector('.boton-vermas');
  if (!botonVerMas) return;

  botonVerMas.style.display = 'block';
  const newButton = botonVerMas.cloneNode(true);
  botonVerMas.parentNode.replaceChild(newButton, botonVerMas);

  newButton.addEventListener('click', () => {
      const grid = document.querySelector('.Peliculas__grid');
      const peliculasMostradas = grid.querySelectorAll('.Peliculas__card').length;
      const { incremento, limite } = calcularProgramasPorPaginaActual();
      const nuevasPeliculas = peliculasMostradas + incremento;

      if (nuevasPeliculas >= limite) {
          newButton.style.display = 'none';
      }

      generarPeliculas(peliculas, nuevasPeliculas);
  });
}

let filtrosAplicados = '';
export function generarPaginacion(peliculas) {
  if (!peliculas || !Array.isArray(peliculas)) {
    console.error("La variable 'peliculas' no está definida o no es un array.");
    return;
  }

  const limite = calcularProgramasPorPaginaActual().limite;
  const totalPaginas = Math.ceil(peliculas.length / limite);
  const contenedorPaginacion = document.querySelector(".paginas");

  if (!contenedorPaginacion) {
    console.error("No se encontró el contenedor .paginas.");
    return;
  }

  contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior

  for (let index = 1; index <= totalPaginas; index++) {
    const btnpaginacion = document.createElement("button");
    btnpaginacion.classList.add("paginas__btn");
    btnpaginacion.textContent = index;

    if (index === paginaActual) {
      btnpaginacion.classList.add("active");
    }

    btnpaginacion.addEventListener("click", () => {
      setPage(index);
    });

    contenedorPaginacion.appendChild(btnpaginacion);
  }
}

agregarPeliculasAlGrid(peliculas)


window.addEventListener("DOMContentLoaded",()=>{
  
  try {
    programasPorPagina = calcularProgramasPorPaginaActual();
    // Asegúrate de que la variable 'peliculas' esté definida y no sea nula
    if (peliculas && peliculas.length > 0) {
        // Actualizar la página actual para asegurar que esté dentro de los límites de las páginas disponibles
        if (paginaActual > Math.ceil(peliculas.length / programasPorPagina)) {
            paginaActual = Math.ceil(peliculas.length / programasPorPagina);
        }

       
    }
} catch (error) {
    console.error("Error al manejar el evento resize:", error);
}
   // Volver a agregar las películas al grid con el nuevo número de programas por página
   agregarPeliculasAlGrid(peliculas);
          
   // Volver a generar la paginación con el nuevo número de programas por página
   generarPaginacion(peliculas);
})


window.addEventListener("resize", () => {
  view2 = window.innerWidth;
 
});


function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  console.log(params)
  return parseInt(params.get("page")) || 1;
}
function getGenerosBuscados() {
  const elementoActivo = document.querySelector('.Genero-categorias__figura.active');
  return elementoActivo ? elementoActivo.getAttribute('data-genre') : '';
}

function setPage(pageNumber) {
 

  if(!click){
    console.log("Paginación actual antes de actualizar:", paginaActual);
    paginaActual = pageNumber; // Actualizar la página actual
    console.log("Paginación actual después de actualizar:", paginaActual);
  
    const peliculasFiltradas = peliculas; // No filtramos por géneros
  
    if (peliculasFiltradas.length === 0) {
      console.log("No se encontraron películas para mostrar.");
      return;
    }
    generarPeliculas(peliculasFiltradas); // Regenerar películas
    generarPaginacion(peliculasFiltradas); // Regenerar paginación
    actualizarURL(pageNumber); // Actualizar la URL con la nueva página
  }else{
    console.log("Paginación actual antes de actualizar:", paginaActual);
    paginaActual2 = pageNumber; // Actualizar la página actual
    console.log("Paginación actual después de actualizar:", paginaActual);
  
    const peliculasFiltradas = peliculas; // No filtramos por géneros
  
    if (peliculasFiltradas.length === 0) {
      console.log("No se encontraron películas para mostrar.");
      return;
    }
    generarPeliculas2(peliculasFiltradas); // Regenerar películas
    generarPaginacion2(peliculasFiltradas); // Regenerar paginación
    actualizarURL2(pageNumber); // Actualizar la URL con la nueva página
  }

}

function actualizarURL(pageNumber) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", pageNumber);
  window.history.pushState({}, '', url);
  console.log(url)
}

  function cargarVideoPelicula(pelicula) {
try {
    buscarPelicula.classList.remove('buscar-pelicula--active');
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
  if(!click){
    paginaActual = getCurrentPage(); // Actualizar la página actual según la URL
    const peliculasFiltradas = filtrarPeliculasPorGeneros(getGenerosBuscados());
    generarPeliculas(peliculasFiltradas); // Cargar las películas de la página actual
    generarPaginacion(peliculasFiltradas); // Regenerar la paginación para marcar el botón de la página actual
  }else{
    paginaActual2 = getCurrentPage(); // Actualizar la página actual según la URL
    const peliculasFiltradas = filtrarPeliculasPorGeneros(getGenerosBuscados());
    generarPeliculas2(peliculasFiltradas); // Cargar las películas de la página actual
    generarPaginacion2(peliculasFiltradas); // Regenerar la paginación para marcar el botón de la página 
  }
 
});

  window.addEventListener("load", () => {
   

    // Filtrar las películas según los géneros seleccionados
    const peliculasFiltradas = filtrarPeliculasPorGeneros(getGenerosBuscados());

    if (peliculasFiltradas.length === 0) {
        console.log("No se encontraron películas para mostrar.");
        return;
    }
    console.log(click)
    if(!click){
      const currentPage = getCurrentPage();
      paginaActual = currentPage; // Establecer la página actual
      generarPeliculas(peliculasFiltradas); // Cargar las películas
      generarPaginacion(peliculasFiltradas); // Generar la paginación
      agregarBotonVerMas(peliculasFiltradas); // Agregar el botón "ver más"
    }else{
      const currentPage = paginaActual2;
      paginaActual = currentPage; // Establecer la página actual
      generarPeliculas2(peliculasFiltradas); // Cargar las películas
      generarPaginacion2(peliculasFiltradas); // Generar la paginación
      agregarBotonVerMas2(peliculasFiltradas); // Agregar el botón "ver más"
    }
});

  import { enableFullscreen } from './Peliculas/botonAgrandarVideo';

  // Activa el modo fullscreen al hacer clic en el botón
  enableFullscreen();
  // import { filtrarPeliculasPorGeneros, manejarClickGenero } from './Peliculas/categoriasPeliculas'; 

  export function agregarBotonVerMas2(peliculas) {
    const botonVerMas = document.querySelector('.boton-vermas');
    if (!botonVerMas) return;
  
    botonVerMas.style.display = 'block';
    const newButton = botonVerMas.cloneNode(true);
    botonVerMas.parentNode.replaceChild(newButton, botonVerMas);
  
    newButton.addEventListener('click', () => {
        const grid = document.querySelector('.Peliculas__grid');
        const peliculasMostradas = grid.querySelectorAll('.Peliculas__card').length;
        const { incremento, limite } = calcularProgramasPorPaginaActual();
        const nuevasPeliculas = peliculasMostradas + incremento;
  
        if (nuevasPeliculas >= limite) {
            newButton.style.display = 'none';
        }
  
        generarPeliculas2(peliculas, nuevasPeliculas);
    });
  }
  
  export function filtrarPeliculasPorGeneros(generosBuscados) {
   
  
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
      console.log(`No se encontraron películas para los géneros: ${generosBuscados}`);
    }
  
    return peliculasFiltradas;
  }
  
  export function manejarClickGenero(event) {
    click=true;
    const elemento = event.target.closest('[data-genre]');
    if (elemento) {
      const generosBuscados = elemento.getAttribute('data-genre');
      const peliculasFiltradas = filtrarPeliculasPorGeneros(generosBuscados);
  
      // Actualiza la grid con las películas filtradas
      actualizarVista2(peliculasFiltradas);
  
      // Opcional: Hacer scroll al inicio
      const grid = document.querySelector('.Peliculas__grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  



  function actualizarVista2(peliculasFiltradas) {
    // Genera las películas en la grid
    generarPeliculas2(peliculasFiltradas);
  
    // Genera la paginación
    generarPaginacion2(peliculasFiltradas);
  
    // Agrega el botón "ver más" si es necesario
    agregarBotonVerMas2(peliculasFiltradas);
  }
  
  // Asocia el manejador de eventos al contenedor de géneros
  document.querySelectorAll('.Genero-categorias__figura').forEach(elemento => {
    elemento.addEventListener('click', manejarClickGenero);
  });


  
  export function generarPaginacion2(peliculas) {
    if (!peliculas || !Array.isArray(peliculas)) {
      console.error("La variable 'peliculas' no está definida o no es un array.");
      return;
    }
  
    const limite = calcularProgramasPorPaginaActual().limite;
    const totalPaginas = Math.ceil(peliculas.length / limite);
    const contenedorPaginacion = document.querySelector(".paginacion");
  
    if (!contenedorPaginacion) {
      console.error("No se encontró el contenedor .paginacion.");
      return;
    }
  
    contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
  
    // Botones de páginas numéricas
    for (let index = 1; index <= totalPaginas; index++) {
      const btnPaginacion = document.createElement("button");
      btnPaginacion.classList.add("paginas__btn");
      btnPaginacion.textContent = index;
  
      if (index === paginaActual2) {
        btnPaginacion.classList.add("active");
      }
  
      btnPaginacion.addEventListener("click", () => {
        paginaActual2 = index;
        actualizarVista2(peliculas); // Actualiza la vista con la página seleccionada
      });
  
      contenedorPaginacion.appendChild(btnPaginacion);
    }
  }
  
export function generarPeliculas2(peliculas, cantidadMostrar = 0) {
  const grid = document.querySelector('.Peliculas__grid');
  if (!grid) throw new Error("No se encontró el contenedor Peliculas__grid.");
  grid.innerHTML = ""; // Limpiar contenido anterior

  if (!peliculas || !Array.isArray(peliculas)) {
      console.error("La variable 'peliculas' no está definida o no es un array.");
      return;
  }

  const { inicial, incremento, limite } = calcularProgramasPorPaginaActual();
  const cantidad = cantidadMostrar || inicial;
  const inicio = (paginaActual2 - 1) * limite;
  const fin = Math.min(inicio + cantidad, peliculas.length);
  const programasPagina = peliculas.slice(inicio, fin);

  programasPagina.forEach(pelicula => {
      const peliculaHTML = generarPlantillaPelicula(pelicula);
      grid.innerHTML += peliculaHTML;
  });

  const botonVerMas = document.querySelector('.boton-vermas');
  botonVerMas.style.display = (cantidad >= limite || fin >= peliculas.length) ? 'none' : 'block';
}

function setPage2(pageNumber, filtros) {
  console.log("Paginación actual antes de actualizar:", paginaActual2);
  paginaActual2 = pageNumber; // Actualizar la página actual
  console.log("Paginación actual después de actualizar:", paginaActual2);

  const peliculasFiltradas = filtrarPeliculasPorGeneros(filtros); // Filtrar según filtros

  if (peliculasFiltradas.length === 0) {
    console.log("No se encontraron películas para mostrar.");
    return;
  }

  generarPeliculas2(peliculasFiltradas); // Regenerar películas
  generarPaginacion2(peliculasFiltradas); // Regenerar paginación
  actualizarURL2(pageNumber); // Actualizar la URL con la nueva página
}
function actualizarURL2(pageNumber) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", pageNumber);
  window.history.pushState({}, '', url);
}

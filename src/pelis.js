import platform from 'platform';
import { verificarCredenciales, verificarDispositivo, verificarFechaExpiracion } from './Conexion/conexion';

function cargarDatosUsuario() {
  try {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
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
const iconobusqueda = document.querySelector('.busqueda-label');
const buscarPelicula = document.querySelector('.buscar-pelicula');
const buscarPeliculaInput = document.querySelector('.buscar__input');
const btnBuscarPelicula = document.querySelector('.buscar__btn');
const seccionPeliculas = document.querySelector('.Peliculas');

try {
  const busquedaclose=document.querySelector('.busqueda__close')
busquedaclose.addEventListener('click',()=>
  {
    buscarPelicula.classList.toggle('buscar-pelicula--active');
  })

} catch (error) {
  
}

let usuarioAutenticado = cargarDatosUsuario();
let detallesDispositivo = null;

async function obtenerDetallesDispositivo() {
  if (!detallesDispositivo) {
    detallesDispositivo = await getDeviceDetails();
    detallesDispositivo.deviceId = localStorage.getItem('deviceId');
  }
  return detallesDispositivo;
}

// function inicializarAplicacion() {
//   agregarPeliculasAlGrid(peliculas);
// }

// inicializarAplicacion();
function inicializarAplicacion() {
  generarPeliculas(peliculas);
  agregarBotonVerMas(peliculas);
}

inicializarAplicacion();

function agregarPeliculasAlGrid(peliculas) {
  generarPeliculas(peliculas);

  try {
    const grid = document.querySelector('.Peliculas__grid');

    // Remover cualquier evento existente antes de agregar uno nuevo
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

  usuarioAutenticado = cargarDatosUsuario(); // Recargar datos del usuario desde localStorage

  if (usuarioAutenticado) {
    const idPelicula = tarjeta.getAttribute('data-id');
    const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
    if (peliculaSeleccionada) {
      const { correo, contraseña, usuarioId } = usuarioAutenticado;
      detallesDispositivo = await obtenerDetallesDispositivo();

      const credencialesResultado = await verificarCredenciales(correo, contraseña);
      if (!credencialesResultado.authenticated) {
        alert(credencialesResultado.reason);
        localStorage.removeItem('usuarioAutenticado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('deviceId');
        window.location.href = 'login.html';
        return;
      }

      const fechaExpiracionResultado = verificarFechaExpiracion(credencialesResultado.userData.fechaExpiracion);
      if (fechaExpiracionResultado.expired) {
        alert('Tu cuenta ha expirado. Por favor, comunícate con el administrador del servicio.');
        return;
      }

      const dispositivoResultado = await verificarDispositivo(usuarioId, detallesDispositivo.deviceId);
      if (!dispositivoResultado.verified) {
        alert(dispositivoResultado.reason);
        localStorage.removeItem('usuarioAutenticado');
        localStorage.removeItem('usuario');
        localStorage.removeItem('deviceId');
        window.location.href = 'login.html';
        return;
      }

      await cargarVideoPelicula(peliculaSeleccionada.Video);
      const irVideo = document.querySelector('#fullscreenBtn');
      irVideo.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    alert('No se encontraron datos de usuario guardados o el usuario no está autenticado.');
    window.location.href = 'login.html';
  }
}

async function getDeviceDetails() {
  const platformInfo = platform.parse(navigator.userAgent);
  const { name, os } = platformInfo;

  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();

  return {
    navegadorNombre: name,
    sistemaOperativo: `${os.family} ${os.version}`,
    ipPublica: ipData.ip
  };
}



  iconobusqueda.addEventListener('click', () => {
    buscarPelicula.classList.add('buscar-pelicula--active');
    console.log('Icono de búsqueda clicado, input activado.');
  });
  
  // Función para filtrar las películas por nombre
  function filtrarPeliculasPorNombre(nombre) {
    if (!peliculas || !Array.isArray(peliculas)) {
      console.error("La variable 'peliculas' no está definida o no es un array.");
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
  
  function actualizarPeliculas() {
    const nombre = buscarPeliculaInput.value.trim(); // Eliminamos espacios en blanco
    console.log('Valor de búsqueda:', nombre);
  
    if (nombre === '') {
      // Si el campo de búsqueda está vacío, mostrar todas las películas
      paginaActual = 1; // Restablecer a la primera página
      generarPeliculas(peliculas);
      generarPaginacion(peliculas);
    } else {
      const peliculasFiltradas = filtrarPeliculasPorNombre(nombre);
      console.log('Películas filtradas:', peliculasFiltradas);
      paginaActual = 1; // Restablecer a la primera página
      generarPeliculas(peliculasFiltradas);
      generarPaginacion(peliculasFiltradas); // Actualizar la paginación según las películas filtradas
    }
    // Desplazar al inicio de la sección de películas
    seccionPeliculas.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Eliminar el evento input del campo de búsqueda
  // buscarPeliculaInput.removeEventListener('input', actualizarPeliculas);
  
  // Añadir evento click al botón de búsqueda para realizar la búsqueda
  btnBuscarPelicula.addEventListener('click', actualizarPeliculas);
  
  // Función para generar las películas en el grid
  // function generarPeliculas(peliculas) {
  //   const grid = document.querySelector('.Peliculas__grid');
  //   if (!grid) {
  //     throw new Error("No se encontró el contenedor Peliculas__grid.");
  //   }
  //   grid.innerHTML = ""; // Limpiar contenido anterior
  
  //   if (!peliculas || !Array.isArray(peliculas)) {
  //     console.error("La variable 'peliculas' no está definida o no es un array.");
  //     return;
  //   }
  
  //   // Obtener el número actual de programas por página
  //   const programasPorPaginaActual = calcularProgramasPorPaginaActual();
  
  //   // Calcular inicio y fin según la página actual y programasPorPaginaActual
  //   const inicio = (paginaActual - 1) * programasPorPaginaActual;
  //   const fin = inicio + programasPorPaginaActual;
  
  //   // Obtener las películas de la página actual
  //   const programasPagina = peliculas.slice(inicio, fin);
  
  //   programasPagina.forEach(pelicula => {
  //     const peliculaHTML = generarPlantillaPelicula(pelicula);
  //     grid.innerHTML += peliculaHTML;
  //   });
  // }
//   function generarPeliculas(peliculas, cantidad = 0) {
//     const grid = document.querySelector('.Peliculas__grid');
//     if (!grid) {
//         throw new Error("No se encontró el contenedor Peliculas__grid.");
//     }
//     grid.innerHTML = ""; // Limpiar contenido anterior

//     if (!peliculas || !Array.isArray(peliculas)) {
//         console.error("La variable 'peliculas' no está definida o no es un array.");
//         return;
//     }

//     const { inicial, incremento, limite } = calcularProgramasPorPaginaActual();
//     const cantidadMostrar = cantidad || inicial;

//     // Calcular inicio y fin según la página actual y cantidad de películas a mostrar
//     const inicio = (paginaActual - 1) * limite;
//     const fin = inicio + cantidadMostrar;

//     // Obtener las películas de la página actual
//     const programasPagina = peliculas.slice(inicio, fin);

//     programasPagina.forEach(pelicula => {
//         const peliculaHTML = generarPlantillaPelicula(pelicula);
//         grid.innerHTML += peliculaHTML;
//     });

//     if (cantidadMostrar >= limite) {
//         document.querySelector('.ver-mas-btn').style.display = 'none';
//     }
// }
function generarPeliculas(peliculas, cantidadMostrar = 0) {
  const grid = document.querySelector('.Peliculas__grid');
  if (!grid) {
      throw new Error("No se encontró el contenedor Peliculas__grid.");
  }
  grid.innerHTML = ""; // Limpiar contenido anterior

  if (!peliculas || !Array.isArray(peliculas)) {
      console.error("La variable 'peliculas' no está definida o no es un array.");
      return;
  }

  const { inicial, incremento, limite } = calcularProgramasPorPaginaActual();
  const cantidad = cantidadMostrar || inicial;

  // Calcular inicio y fin según la página actual y cantidad de películas a mostrar
  const inicio = (paginaActual - 1) * limite;
  const fin = Math.min(inicio + cantidad, peliculas.length);

  // Obtener las películas de la página actual
  const programasPagina = peliculas.slice(inicio, fin);

  programasPagina.forEach(pelicula => {
      const peliculaHTML = generarPlantillaPelicula(pelicula);
      grid.innerHTML += peliculaHTML;
  });

  const botonVerMas = document.querySelector('.boton-vermas');
  if (cantidad >= limite || fin >= peliculas.length) {
      botonVerMas.style.display = 'none';
  } else {
      botonVerMas.style.display = 'block';
  }
}
function agregarBotonVerMas(peliculas) {
  const botonVerMas = document.querySelector('.boton-vermas');
  if (!botonVerMas) return;

  botonVerMas.style.display = 'block'; // Asegurarse de que el botón esté visible

  // Remove any existing event listeners to prevent multiple increments
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
  // Función para generar la paginación
  // function generarPaginacion(peliculas) {
  //   if (!peliculas || !Array.isArray(peliculas)) {
  //     console.error("La variable 'peliculas' no está definida o no es un array.");
  //     return;
  //   }
  
  //   try {
  //     // Obtener el número actual de programas por página
  //     const programasPorPaginaActual = calcularProgramasPorPaginaActual();
  
  //     // Calcular el total de páginas según el número actual de programas por página y la cantidad de películas
  //     const totalPaginas = Math.ceil(peliculas.length / programasPorPaginaActual);
  
  //     const contenedorPaginacion = document.querySelector(".paginas");
  //     contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
  //     const currentPage = getCurrentPage();
  
  //     // Generar botones de paginación hasta el número total de páginas
  //     for (let index = 1; index <= totalPaginas; index++) {
  //       const btnpaginacion = document.createElement("button");
  //       btnpaginacion.classList.add("paginas__btn");
  //       btnpaginacion.textContent = index;
  
  //       if (index === currentPage) {
  //         btnpaginacion.classList.add("active"); // Marcar el botón de la página actual
  //       }
  
  //       btnpaginacion.addEventListener("click", () => {
  //         setPage(index); // Establecer la página al hacer clic
  //         generarPeliculas(peliculas);
  
  //         contenedorPaginacion.querySelectorAll(".paginas__btn").forEach((btn) => {
  //           btn.classList.remove("active");
  //         });
  
  //         // Agregar la clase "active" solo al botón de la página actual
  //         btnpaginacion.classList.add("active");
  //       });
  
  //       contenedorPaginacion.appendChild(btnpaginacion);
  //     }
  //   } catch (error) {
  //     console.error("Error al generar la paginación:", error);
  //   }
  // }
  function generarPaginacion(peliculas) {
    if (!peliculas || !Array.isArray(peliculas)) {
        console.error("La variable 'peliculas' no está definida o no es un array.");
        return;
    }

    try {
        const totalPaginas = Math.ceil(peliculas.length / calcularProgramasPorPaginaActual().limite);
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

                contenedorPaginacion.querySelectorAll(".paginas__btn").forEach((btn) => {
                    btn.classList.remove("active");
                });

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

// function setPage(page) {
//     const params = new URLSearchParams(window.location.search);
//     params.set("page", page);
//     window.history.pushState(
//         {},
//         "",
//         `${window.location.pathname}?${params.toString()}`
//     );
//     paginaActual = page; // Actualizar la página actual
//     agregarPeliculasAlGrid(peliculas); // Cargar los programas de la página actual
//     generarPaginacion(); // Volver a generar la paginación para reflejar el cambio de página
// }

function setPage(page) {
  const params = new URLSearchParams(window.location.search);
  params.set("page", page);
  window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
  paginaActual = page;
  generarPeliculas(peliculas);
  agregarBotonVerMas(peliculas); // Volver a agregar el botón "Ver más"
  generarPaginacion(peliculas);
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

 

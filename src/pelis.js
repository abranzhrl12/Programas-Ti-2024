import datosPelis from "./Datos/datosPelis";

document.addEventListener('contextmenu', function(e) {
e.preventDefault();
})
document.addEventListener('keydown', function(e) {
    // Desactivar la tecla F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});

const peliculas = datosPelis.Peliculas.Extreno;

function generarPlantillaPelicula(pelicula) {
    return `
    <div class="Peliculas__card" data-id="${pelicula.id}">
            <figure class="Peliculas__figure">
                <img class="Peliculas__img" src="${pelicula.imagen}" alt="">
            </figure>
            <p class="Peliculas__nombre">${pelicula.nombre}</p>
        </div>
    `;
}

let widthViewport = window.innerWidth;

let programasPorPagina =  calcularProgramasPorPaginaActual();;
let paginaActual = 1;

function herramientasDesarrolladorAbiertas() {
    try {
        const widthThreshold = 300; // Umbral de ancho para considerar las herramientas de desarrollador
        const heightThreshold = 200; // Umbral de alto para considerar las herramientas de desarrollador
    
        // Diferencia entre el tamaño exterior e interior de la ventana del navegador
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
    
        // Verificar si alguna de las diferencias supera los umbrales establecidos
        return widthDiff > widthThreshold || heightDiff > heightThreshold;
    } catch (error) {
        
    }
  
}

// Variable para controlar el estado anterior de las herramientas de desarrollador
let herramientasAbiertasPrevias = false;


let view2=window.innerWidth;

let view=window.innerWidth;


window.addEventListener("resize", () => {
  view2=window.innerWidth;
    try {
    //   calcularProgramasPorPaginaActual();
    //   agregarPeliculasAlGrid(peliculas)
    // verificarHerramientasDesarrollador();
    herramientasDev()
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
function herramientasDev(){
    try {
        let herramientasAbiertas = herramientasDesarrolladorAbiertas();
  
        const modal = document.getElementById('modalDesarrollador');
       
    
        // Mostrar el modal si las herramientas de desarrollador están abiertas
        if (herramientasAbiertas && view!=view2) {
            modal.classList.add('modal'); // Agregar clase para mostrar el modal
            setTimeout(() => {
                location.reload();
            }, 3500);
            
        } else {
            
           
            // modal.classList.remove('modal');
        }  
    } catch (error) {
        
    }

   
}  
function cargarDatosUsuario() {
 try {
    const usuarioGuardado = localStorage.getItem('usuario');
    console.log('Datos guardados en localStorage:', usuarioGuardado);

    if (usuarioGuardado) {
        try {
            const usuarioParseado = JSON.parse(usuarioGuardado);
            
            return usuarioParseado;
        } catch (error) {
            console.error('Error al parsear datos del usuario:', error);
            return null;
        }
    } else {
        console.log('No se encontraron datos guardados en localStorage.');
        return null; // No hay datos guardados
    }
 } catch (error) {
    
 }
   
}


function agregarPeliculasAlGrid(peliculas) {
    
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

    try {
        grid.addEventListener('click', async (event) => {
            const tarjeta = event.target.closest('.Peliculas__card');
        
            // Verificar si el usuario está autenticado
            const usuarioActual = cargarDatosUsuario();
            if (usuarioActual) {
                console.log('Usuario autenticado:', usuarioActual.email);
                if (tarjeta) {
                    const idPelicula = tarjeta.getAttribute('data-id');
                    const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
                    if (peliculaSeleccionada) {
                        // Llamar a la función para cargar el video de la película seleccionada
                        await cargarVideoPelicula(peliculaSeleccionada.Video);
                        irVideo.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else {
                console.log('No se encontraron datos de usuario guardados o el usuario no está autenticado.');
                
                // Redirigir a la página de inicio de sesión si el usuario no está autenticado
                 window.location.href = 'login.html'; 
            }
        });
    } catch (error) {
        
    }
   
}

// Función para calcular el número actual de programas por página
function calcularProgramasPorPaginaActual() {
   try {
    if(window.innerWidth > 369 && window.innerWidth < 564){
        return 26;
    }
  else if(window.innerWidth > 563 && window.innerWidth < 1242){
    return 24;
   }
   
   else if (window.innerWidth > 1243 && window.innerWidth < 1495) {
        return 25;
    } else if(window.innerWidth > 1495) {
        console.log(window.window.innerWidth)
        return 30;
    }
    else{
        return 25;
    }
   } catch (error) {
    
   }
    
     
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
        let herramientasAbiertas = herramientasDesarrolladorAbiertas();

        const modal = document.getElementById('modalDesarrollador');
       
        if (herramientasAbiertas ) {
            modal.classList.add('modal'); // Agregar clase para mostrar el modal
            setTimeout(() => {
                location.reload();
            }, 3500);
    
        } else {
            console.log("aaa")
           
            // modal.classList.remove('modal');
        }
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

  
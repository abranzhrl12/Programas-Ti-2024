import "./cargarProgramas.js";

import { programasDeEdicion, programasUtilidades } from "./cargarProgramas.js";
let programasTodos = [...programasDeEdicion, ...programasUtilidades];
let programasActuales = programasTodos;
const diseño = document.querySelector("#programas");

let programasPorPagina = 12;

const busqueda = document.querySelector(".busqueda__item");
const busquedabtn = document.querySelector(".busqueda__btn");

let paginaActual = 1;
try {
  const catDiseño = document.querySelector("#diseño");

catDiseño.addEventListener("click", () => {
  programasActuales = programasDeEdicion; // Cambiar a programas de edición
  paginaActual = 1;
  cargarProgramasPagina(); // Cargar programas de la nueva categoría
  generarPaginacion();
});
} catch (error) {
  
}

try {
  const utilidades = document.querySelector("#utilidades");
utilidades.addEventListener("click", () => {
  programasActuales = programasUtilidades; // Cambiar a programas de utilidades
  paginaActual = 1;
  cargarProgramasPagina(); // Cargar programas de la nueva categoría
  setPage(paginaActual);
  generarPaginacion();
});
} catch (error) {
  
}
try {
  busquedabtn.addEventListener("click", () => {
    // Obtiene el valor del campo de entrada de búsqueda
    const terminoBusqueda = busqueda.value.trim().toLowerCase();
    console.log(terminoBusqueda);
    // Filtra los programas que coincidan con el término de búsqueda en su nombre
    programasActuales = programasTodos.filter((programa) =>
      programa.nombre.toLowerCase().includes(terminoBusqueda)
    );
    // Actualiza la página a la primera página después de la búsqueda
    paginaActual = 1;
    // Vuelve a cargar los programas en la página y genera la paginación
    cargarProgramasPagina();
    generarPaginacion();
  });
} catch (error) {
  
}

try {
  busqueda.addEventListener("input", () => {
    // Obtiene el valor del campo de entrada de búsqueda
    const terminoBusqueda = busqueda.value.trim().toLowerCase();
    // Verifica si el campo de búsqueda está vacío
    if (terminoBusqueda === "") {
      // Restaura los programas a la lista completa
      programasActuales = programasTodos;
      paginaActual = 1;
      // Carga nuevamente los programas y genera la paginación
      cargarProgramasPagina();
      generarPaginacion();
    }
  });
} catch (error) {
  
}


function precargarImagenes(programas) {
  programas.forEach((programa) => {
    const img = new Image();
    img.src = programa.imagen;
  });
}


// Función para cargar los programas de la página actual
function cargarProgramasPagina() {
  try {
    diseño.innerHTML = ""; // Limpiar contenido anterior

    // Calcular el índice inicial y final de los programas a mostrar en la página actual
    const inicio = (paginaActual - 1) * programasPorPagina;
    const fin = inicio + programasPorPagina;
  
    // Obtener los programas correspondientes a la página actual usando slice
    const programasPagina = programasActuales.slice(inicio, fin);
    
  // Iterar sobre los programas de la página y crear las tarjetas para cada uno
  programasPagina.forEach((programa) => {
    // Crear un elemento div para la tarjeta
    const cardDiseño = document.createElement("div");
    // Crear la plantilla HTML con los datos del programa
    const plantilla = `
       
        <div class="card__picture">
          <img src="${programa.imagen}" alt="" class="card__img" width="256.5" height="144.28" />
        </div>
      <a href="index3.html#programa${programa.id}"  style="text-decoration:none; color:white;">
        <div class="card__contenedorTitulo">
         <h3 class="card__titulo">${programa.nombre}</h3>
       
        <div class="card__iconos">
        <svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
        <svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#ffff" d="M512 32H64C46.3 32 32 46.3 32 64V256H544V64c0-17.7-14.3-32-32-32zm64 224v32 64c0 35.3-28.7 64-64 64H362.9l10.7 64H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H360 216 144c-8.8 0-16-7.2-16-16s7.2-16 16-16h58.4l10.7-64H64c-35.3 0-64-28.7-64-64V288 256 64C0 28.7 28.7 0 64 0H512c35.3 0 64 28.7 64 64V256zM32 288v64c0 17.7 14.3 32 32 32H231.7c.2 0 .4 0 .6 0H343.7c.2 0 .4 0 .6 0H512c17.7 0 32-14.3 32-32V288H32zM234.9 480H341.1l-10.7-64H245.6l-10.7 64z"/></svg>
       </div>
       </div>
        <div class="card__textos">
          <p class="card__parrafo">
            ${programa.Descripcion} 
          </p>
        </div>
        </a>

      `;

    // Agregar la plantilla HTML a la tarjeta
    cardDiseño.innerHTML = plantilla;
    // Agregar una clase CSS a la tarjeta
    cardDiseño.classList.add("card");
    cardDiseño.style.setProperty("--contentcardbefore", `"${programa.tipo}"`);
    // Agregar la tarjeta al contenedor de diseño
    diseño.appendChild(cardDiseño);
  });
  if (paginaActual === 1) {
    const programasPagina2 = programasActuales.slice(
      programasPorPagina,
      programasPorPagina * 2
    );
    const programasPagina3 = programasActuales.slice(
      programasPorPagina * 2,
      programasPorPagina * 3
    );
    precargarImagenes(programasPagina2);
    precargarImagenes(programasPagina3);
  }
  } catch (error) {
    
  }
 

}

// Función para generar la paginación
function generarPaginacion() {
  try {
    const totalPaginas = Math.ceil(programasActuales.length / programasPorPagina);
    const contenedorPaginacion = document.querySelector(".paginas");
    contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
    const currentPage = getCurrentPage();
    for (let index = 1; index <= totalPaginas; index++) {
      const btnpaginacion = document.createElement("button");
      btnpaginacion.classList.add("paginas__btn");
      btnpaginacion.textContent = index;
  
      if (index === currentPage) {
        btnpaginacion.classList.add("active"); // Marcar el botón de la página actual
      }
  
      btnpaginacion.addEventListener("click", () => {
        setPage(index); // Establecer la página al hacer clic
        cargarProgramasPagina();
  
        contenedorPaginacion.querySelectorAll(".paginas__btn").forEach((btn) => {
          btn.classList.remove("active");
        });
  
        // Agregar la clase "active" solo al botón de la página actual
        btnpaginacion.classList.add("active");
      });
      contenedorPaginacion.appendChild(btnpaginacion);
    }
  } catch (error) {
    
  }
 
}

function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
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
  cargarProgramasPagina(); // Cargar los programas de la página actual
}

//cargarProgramasPagina(programasTodos);

generarPaginacion();
window.addEventListener("popstate", () => {
  paginaActual = getCurrentPage(); // Actualizar la página actual según la URL
  setPage(paginaActual);
  cargarProgramasPagina(); // Cargar los programas de la página actual
  generarPaginacion(); // Regenerar la paginación para marcar el botón de la página actual
});


window.addEventListener("load", () => {
  const currentPage = getCurrentPage(); // Obtener la página actual desde la URL
  setPage(currentPage); // Establecer la página actual y cargar los programas
});

// try {
//   const peliculasLink = document.querySelector('.lista__link--peliculas');

 
  

//     const nuevaURL = this.href; 
//     const url = new URL(nuevaURL); 


//     url.pathname = 'index2.html'; 
//     url.hash = 'peliculas'; 


//     url2.search = '';

    
//     window.history.pushState({}, '', url.href);

   
//     window.location.href = url.href;
  
// } catch (error) {
//   console.error('Error al configurar el evento de clic para "Peliculas":', error);
// }

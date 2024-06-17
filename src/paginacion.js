import "./cargarProgramas.js";
import { programasDeEdicion, programasUtilidades } from "./cargarProgramas.js";
let programasTodos = [...programasDeEdicion, ...programasUtilidades];
let programasActuales = programasTodos;
const diseño = document.querySelector("#programas");

let programasPorPagina = 12;

const busqueda = document.querySelector(".busqueda__item");
const busquedabtn = document.querySelector(".busqueda__btn");

let paginaActual = 1;
const catDiseño = document.querySelector("#diseño");

catDiseño.addEventListener("click", () => {
  programasActuales = programasDeEdicion; // Cambiar a programas de edición
  paginaActual = 1;
  cargarProgramasPagina(); // Cargar programas de la nueva categoría
  generarPaginacion();
});
const utilidades = document.querySelector("#utilidades");
utilidades.addEventListener("click", () => {
  programasActuales = programasUtilidades; // Cambiar a programas de utilidades
  paginaActual = 1;
  cargarProgramasPagina(); // Cargar programas de la nueva categoría
  setPage(paginaActual);
  generarPaginacion();
});
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

function precargarImagenes(programas) {
  programas.forEach((programa) => {
    const img = new Image();
    img.src = programa.imagen;
  });
}
// Función para cargar los programas de la página actual
function cargarProgramasPagina() {
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
        <h3 class="card__titulo">${programa.nombre}</h3>
        <div class="card__picture">
          <img src="${programa.imagen}" alt="" class="card__img" width="256.5" height="144.28" />
        </div>
        <div class="card__textos">
          <p class="card__parrafo">
            ${programa.Descripcion} 
          </p>
        </div>
        <div class="card__botones">
        <a class="btn" href="#" >
            <span>mediafire</span>
          <svg class="btn__icono" height="40" viewBox="-6.8887712 -3.69853465 81.96659882 46.80035628" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m20.7 8.3a51.47 51.47 0 0 1 9.34 1c2.9.55 5.85 1.56 8.83 1.55 2.28 0 4.12-1.6 4.1-3.53s-1.85-3.57-4.17-3.56a13.35 13.35 0 0 0 -3.9.65c.33-.23.66-.47 1-.68a26.14 26.14 0 0 1 15.1-3.68c5.6.26 11.46 2 15.8 5.72a19.9 19.9 0 0 1 6.62 17.82 19.75 19.75 0 0 1 -12.17 15.07 24 24 0 0 1 -14.45.52c-6.2-1.58-11.64-5-17.48-7.54a46.86 46.86 0 0 0 -10.57-2.68h.05a9 9 0 0 0 4.1-.7c1.74-.83 1.73-2.83.83-4.3-1.07-1.73-3.23-2.44-5.1-3a24.36 24.36 0 0 0 -10-.48 15.06 15.06 0 0 0 -6.83 2.52 5.67 5.67 0 0 0 -1.8 2.2c3.08-8.53 9.2-7.57 13-9.9a2.16 2.16 0 0 0 -1.57-3.94 7.24 7.24 0 0 0 -2.92 1.46l-.85.65s3.04-5.17 13.04-5.17z" fill="#07f"/><path d="m23.64 23.78.06.06zm32.46-10.73c-4.08 0-5.76 2.57-10.18 5-7.65 4.18-12.2 2.4-12.2 2.62s3.1 1.53 10.7 5.22a27 27 0 0 0 11.73 3.15 8 8 0 1 0 0-16z" fill="#fff"/></svg>
          </a>
          <a href="${programa.link_drive}" class="btn" target=_blank>
            <span>Drive</span>
          <svg class="btn__icono" width="32"  viewBox="0 0 256.002 228.731" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M19.3542312,196.033928 L30.644172,215.534816 C32.9900287,219.64014 36.3622164,222.86588 40.3210929,225.211737 C51.6602421,210.818376 59.5534225,199.772864 64.000634,192.075201 C68.5137119,184.263529 74.0609657,172.045039 80.6423954,155.41973 C62.9064315,153.085282 49.4659974,151.918058 40.3210929,151.918058 C31.545465,151.918058 18.1051007,153.085282 0,155.41973 C0,159.964996 1.17298825,164.510261 3.51893479,168.615586 L19.3542312,196.033928 Z" fill="#0066DA"/><path d="M215.681443,225.211737 C219.64032,222.86588 223.012507,219.64014 225.358364,215.534816 L230.050377,207.470615 L252.483511,168.615586 C254.829368,164.510261 256.002446,159.964996 256.002446,155.41973 C237.79254,153.085282 224.376613,151.918058 215.754667,151.918058 C206.488712,151.918058 193.072785,153.085282 175.506888,155.41973 C182.010479,172.136093 187.484394,184.354584 191.928633,192.075201 C196.412073,199.863919 204.329677,210.909431 215.681443,225.211737 Z" fill="#EA4335"/><path d="M128.001268,73.3111515 C141.121182,57.4655263 150.162898,45.2470011 155.126415,36.6555757 C159.123121,29.7376196 163.521739,18.6920726 168.322271,3.51893479 C164.363395,1.1729583 159.818129,0 155.126415,0 L100.876121,0 C96.1841079,0 91.638842,1.31958557 87.6799655,3.51893479 C93.7861943,20.9210065 98.9675428,33.3058067 103.224011,40.6733354 C107.927832,48.8151881 116.186918,59.6944602 128.001268,73.3111515 Z" fill="#00832D"/><path d="M175.360141,155.41973 L80.6420959,155.41973 L40.3210929,225.211737 C44.2799694,227.557893 48.8252352,228.730672 53.5172481,228.730672 L202.485288,228.730672 C207.177301,228.730672 211.722567,227.411146 215.681443,225.211737 L175.360141,155.41973 Z" fill="#2684FC"/><path d="M128.001268,73.3111515 L87.680265,3.51893479 C83.7213885,5.86488134 80.3489013,9.09044179 78.0030446,13.1960654 L3.51893479,142.223575 C1.17298825,146.329198 0,150.874464 0,155.41973 L80.6423954,155.41973 L128.001268,73.3111515 Z" fill="#00AC47"/><path d="M215.241501,77.7099697 L177.999492,13.1960654 C175.653635,9.09044179 172.281148,5.86488134 168.322271,3.51893479 L128.001268,73.3111515 L175.360141,155.41973 L255.855999,155.41973 C255.855999,150.874464 254.682921,146.329198 252.337064,142.223575 L215.241501,77.7099697 Z" fill="#FFBA00"/></g></svg>
          </a>
         
        </div>
      `;
    // Agregar la plantilla HTML a la tarjeta
    cardDiseño.innerHTML = plantilla;
    // Agregar una clase CSS a la tarjeta
    cardDiseño.classList.add("card");
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
}

// Función para generar la paginación
function generarPaginacion() {
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
  console.log(programasActuales);
  console.log(cargarProgramasPagina());
  const currentPage = getCurrentPage(); // Obtener la página actual desde la URL
  setPage(currentPage); // Establecer la página actual y cargar los programas
});

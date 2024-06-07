import "./cargarProgramas.js";
import {
  cargarprogramas,
  programasDeEdicion,
  programasUtilidades,
} from "./cargarProgramas.js";
let programasTodos = [...programasDeEdicion, ...programasUtilidades];
let programasActuales = programasTodos;
const diseño = document.querySelector("#programas");
const programasPorPagina = 3;

let paginaActual = 1;
const catDiseño = document.querySelector("#diseño");
catDiseño.addEventListener("click", () => {
  programasActuales = programasDeEdicion; // Cambiar a programas de edición
  paginaActual = 1;
  cargarProgramasPagina(programasActuales); // Cargar programas de la nueva categoría
  generarPaginacion();
});

const utilidades = document.querySelector("#utilidades");
utilidades.addEventListener("click", () => {
  programasActuales = programasUtilidades; // Cambiar a programas de utilidades
  paginaActual = 1;
  cargarProgramasPagina(programasActuales); // Cargar programas de la nueva categoría
  generarPaginacion();
});

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
          <img src="${programa.imagen}" alt="" class="card__img" />
        </div>
        <div class="card__textos">
          <p class="card__parrafo">
            ${programa.Descripcion}
          </p>
        </div>
        <div class="card__botones">
          <button id="btnPotoshop-m" class="btn btn--mediafire">
            <span>mediafire</span>
            <img class="btn__icono" src="/Imagenes/mediafire2.svg" alt="" />
          </button>
          <button id="btnPotoshop-d" class="btn btn--drive">
            <span>Drive</span>
            <img class="btn__icono" src="/Imagenes/drivesvf.svg" alt="" />
          </button>
        </div>
      `;

    // Agregar la plantilla HTML a la tarjeta
    cardDiseño.innerHTML = plantilla;

    // Agregar una clase CSS a la tarjeta
    cardDiseño.classList.add("card");

    // Agregar la tarjeta al contenedor de diseño
    diseño.appendChild(cardDiseño);
  });
}

// Función para generar la paginación
function generarPaginacion() {
  const totalPaginas = Math.ceil(programasActuales.length / programasPorPagina);
  const contenedorPaginacion = document.querySelector(".paginas");
  contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior

  for (let index = 1; index <= totalPaginas; index++) {
    const btnpaginacion = document.createElement("button");
    btnpaginacion.classList.add("paginas__btn");
    btnpaginacion.textContent = index;
    btnpaginacion.addEventListener("click", () => {
      paginaActual = index;
      cargarProgramasPagina(); 
    });
    contenedorPaginacion.appendChild(btnpaginacion);
  }
}
cargarProgramasPagina(programasTodos);

generarPaginacion();


// import Peliculas from "./../Datos/datosPelis";
// import { generarPeliculas, generarPaginacion, agregarBotonVerMas } from "./../pelis";

// Función para filtrar películas por múltiples géneros
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
      setPage(index, filtrosAplicados); // Pasar filtrosAplicados al cambiar de página
    });

    contenedorPaginacion.appendChild(btnpaginacion);
  }
}

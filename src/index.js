import "./paginacion";

window.addEventListener("resize", () => {
  try {
    let check = document.getElementById("icono");
    let nav = document.querySelector("#nav");
    const desplegable = document.querySelector(".lista__item--desplegable");
    const listadrop = document.querySelector(".lista__drop");
    const tamaño = nav ? nav.offsetWidth : 0; // Asegúrate de verificar si nav es nulo antes de acceder a su propiedad offsetWidth
    if (tamaño > 768) {
      console.log(tamaño);
      check.checked = false;

      let click = false;

      desplegable.addEventListener("click", (e) => {
        if (!click) {
          click = true;
          listadrop.style.display = "block";
        } else {
          listadrop.style.display = "none";

          click = false;
        }
      });
    } else {
      console.log("El checkbox está marcado.");
      listadrop.style.display = "none";
      desplegable.addEventListener("mouseover", function () {
        listadrop.style.display = "block";
      });
    }
  } catch (error) {}
});

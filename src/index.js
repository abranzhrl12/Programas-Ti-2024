import "./paginacion";

window.addEventListener("resize", () => {
  try {
    let check = document.getElementById("icono");
    let nav = document.querySelector("#nav");
    const desplegable = document.querySelector(".lista__item--desplegable");
    const listadrop = document.querySelector(".lista__drop");
    const tamaño = nav ? nav.offsetWidth : 0; // Asegúrate de verificar si nav es nulo antes de acceder a su propiedad offsetWidth
    if (tamaño > 768) {
      check.checked = false;
      console.log("aaaaa");
      listadrop.style.display = "none";
      // desplegable.addEventListener("click", (e) => {
      //   if (!click) {
      //     console.log("se desplego11");
      //     click = true;
      //     listadrop.style.display = "block";
      //   } else {
      //     listadrop.style.display = "none";
      //     console.log("se desplegoaaaa");
      //     click = false;
      //   }
      // });
    } else {
      // listadrop.style.display = "none";
      // desplegable.addEventListener("mouseover", function () {
      //   listadrop.style.display = "block";
      // });
    }
  } catch (error) {}
});

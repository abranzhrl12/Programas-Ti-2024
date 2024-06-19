import "./paginacion";
try {
  let loader = document.querySelector(".loader");
let overlay = document.querySelector(".overlay");
let nombrelogo23 = document.querySelector(".nombrelogo23");

// Escuchar el evento animationend en el loader y el overlay
loader.addEventListener("animationend", function () {
  // Eliminar el elemento loader una vez que la animación haya terminado
  loader.remove();
});

overlay.addEventListener("animationend", function () {
  // Eliminar el elemento overlay una vez que la animación haya terminado
  overlay.remove();

  // Ocultar el elemento nombrelogo23 después de que la animación haya terminado
  nombrelogo23.remove();
});
} catch (error) {
  
}


function prueba() {
  try {
    let clickd = false;
    let viewportWidth = window.innerWidth;
    const desplegable = document.querySelector(".lista__item--desplegable");
    const listadrop = document.querySelector(".lista__drop");
  
    function toggleListadrop() {
      if (clickd) {
        listadrop.style.display = "none";
        clickd = false;
      } else {
        listadrop.style.display = "block";
        listadrop.style.position = "static";
        clickd = true;
      }
    }
  
    if (viewportWidth < 768) {
      desplegable.addEventListener("click", toggleListadrop);
    } else {
      desplegable.removeEventListener("click", toggleListadrop);
    }
  } catch (error) {
    
  }
 
}
prueba();
let mouseEnterHandler = function () {
  console.log("");
};

let mouseLeaveHandler = function () {
  console.log("El cursor ya no está sobre la sublista");
  let listadrop = document.querySelector(".lista__drop");
  listadrop.style.display = "none";
  // Aquí puedes hacer lo que necesites cuando la sublista ya no está en hover
};

window.addEventListener("resize", () => {
  try {
    let viewportWidth2 = window.innerWidth;
    let check = document.getElementById("icono");
    let nav = document.querySelector("#nav");
    const desplegable = document.querySelector(".lista__item--desplegable");
    const listadrop = document.querySelector(".lista__drop");
    prueba();
    const tamaño = nav ? nav.offsetWidth : 0; // Asegúrate de verificar si nav es nulo antes de acceder a su propiedad offsetWidth
    if (tamaño > 768) {
      check.checked = false;
      listadrop.style.display = "none";
      listadrop.style.display = "absolute";
    } else {
      // Si el viewportWidth2 es menor o igual a 768, quita los event listeners
      listadrop.removeEventListener("mouseenter", mouseEnterHandler);
      listadrop.removeEventListener("mouseleave", mouseLeaveHandler);
    }
    if (viewportWidth2 > 768) {
      // Si el viewportWidth2 es mayor que 768, agrega los event listeners
      listadrop.addEventListener("mouseenter", mouseEnterHandler);
      listadrop.addEventListener("mouseleave", mouseLeaveHandler);
    }

  } catch (error) {}
});


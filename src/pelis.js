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
function agregarPeliculasAlGrid(peliculas) {
    const grid = document.querySelector('.Peliculas__grid');
    if (!grid) {
        throw new Error("No se encontró el contenedor Peliculas__grid.");
    }

    peliculas.forEach(pelicula => {
        const peliculaHTML = generarPlantillaPelicula(pelicula);
        grid.innerHTML += peliculaHTML;
    });
    grid.addEventListener('click',()=>{
        const tarjeta = event.target.closest('.Peliculas__card');
        const idPelicula = tarjeta.getAttribute('data-id');
        console.log(idPelicula)
          const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id == idPelicula);
         
        console.log(peliculaSeleccionada.Video)
         cargarVideoPelicula(peliculaSeleccionada.Video)
    })
}
window.addEventListener('DOMContentLoaded', (event) => {
    // Cambiar el hash de la URL una vez que la página se ha cargado
    window.location.hash = 'peliculas';
    agregarPeliculasAlGrid(peliculas);
  });
  function cargarVideoPelicula(pelicula) {
try {
    const videoPelicula = document.querySelector('.DetallePrograma__ConVideo');
    if (!videoPelicula) {
        throw new Error("No se encontró el contenedor .DetallePrograma__ConVideo.");
    }

    const plantilla = `
      <iframe src=${pelicula}?autoplay=false&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>
    `;
    videoPelicula.innerHTML = plantilla;
} catch (error) {
    
}
  
}

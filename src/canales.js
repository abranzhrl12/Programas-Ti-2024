import canales from "./Datos/DatosTV";

const canal = canales.canales.tv;
console.log(canal);
function generarPlantillaCanal(canal) {
    return `
    <figure class="canales__figure" data-id="${canal.id}">
        <img class="canales__img" src="${canal.imagen}" alt="${canal.nombre}">
    </figure>
    `;
}
function agregarCanalesAlContenedor(canal) {
    const contenedor = document.querySelector('.canales__flex');
    if (!contenedor) {
        throw new Error("No se encontró el contenedor canales__flex.");
    }

    canal.forEach(canaltv => {
        const canalHTML = generarPlantillaCanal(canaltv);
        contenedor.innerHTML += canalHTML;
    });
    contenedor.addEventListener('click', (event) => {
        const figura = event.target.closest('.canales__figure');
        const idCanal = figura.getAttribute('data-id');
      
         const canalSeleccionado = canal.find(canal => canal.id == idCanal);
       agregarCanal(canalSeleccionado.link_m3u8);
    });
}

// Esperar a que se cargue el DOM y agregar los canales al contenedor
window.addEventListener('DOMContentLoaded', () => {
    agregarCanalesAlContenedor(canal);
});

function agregarCanal(linkCanal) {
    const canaltv = document.querySelector('.canales__Video');
    try {
        canaltv.innerHTML = `<video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360" data-setup='{}'>
            <source src="${linkCanal}" type="application/x-mpegURL">
            <p class="vjs-no-js">
                Para ver este video, por favor habilita JavaScript y considera actualizar a un navegador web que soporte HTML5 video.
            </p>
        </video>`;

        // Destruir el reproductor de Video.js existente si ya está inicializado
        if (videojs.getPlayers()['my-video']) {
            videojs.getPlayers()['my-video'].dispose(); // Destruye el reproductor existente
        }

        // Inicializar Video.js para el nuevo video
        videojs("my-video", {}, function () {
            console.log("Video.js inicializado correctamente para el nuevo video.");
        });
    } catch (error) {
        console.error("Error al agregar el video:", error);
    }
}

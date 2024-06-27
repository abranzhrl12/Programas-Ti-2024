import programas from "./Datos/datos.js";

export const programasDeEdicion = programas.programas.Edicion;

export const programasUtilidades = programas.programas.Utilidades;
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('keydown', function(e) {
    // Desactivar la tecla F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});

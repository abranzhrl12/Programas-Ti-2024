

export function cargarDatosUsuario() {
    try {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            return JSON.parse(usuarioGuardado);
        } else {
            console.log('No se encontraron datos guardados en localStorage.');
            return null;
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario desde localStorage:', error);
        return null;
    }
}



import { actualizarNombreYAvatarUsuario,obtenerDatosActualizadosUsuario } from './../Conexion/conexion';
import AvataresData from './../Datos/Avatares';

document.addEventListener('DOMContentLoaded', async function() {
    // 1. Obtener datos del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Usuario recuperado desde localStorage:', usuario);

    if (!usuario || !usuario.usuarioId) {
        console.error('Datos del usuario no encontrados en localStorage');
        return;
    }

    // 2. Obtener datos actualizados desde la base de datos
    const datosActualizados = await obtenerDatosActualizadosUsuario(usuario.usuarioId);
    console.log('Datos actualizados obtenidos:', datosActualizados);

    // 3. Mostrar datos actualizados en la interfaz
    mostrarDatosUsuario(datosActualizados);

    // Configurar eventos de la interfaz
    configurarEventosUI();
});

function mostrarDatosUsuario(datos) {
    if (!datos) return;

    // Mostrar el nombre del usuario
    const profileNameElement = document.querySelector('.profile-name'); // Asegurándonos de usar .profile-name para el nombre
    if (profileNameElement) {
        profileNameElement.textContent = datos.nombreUsuario;
        console.log('Nombre de usuario asignado al elemento .profile-name:', datos.nombreUsuario);
    } else {
        console.error('No se encontró el elemento .profile-name');
    }

    // Mostrar el avatar del usuario
    const avatarElement = document.getElementById('avatarImg');
    if (avatarElement && datos.avatarId) {
        const rutaAvatar = obtenerRutaAvatar(parseInt(datos.avatarId, 10));
        if (rutaAvatar) {
            avatarElement.src = rutaAvatar;
            avatarElement.dataset.avatarId = datos.avatarId;
            console.log('Ruta del avatar obtenida:', rutaAvatar);
        } else {
            console.error('Ruta del avatar no encontrada para el ID:', datos.avatarId);
        }
    } else {
        console.error('No se encontró el elemento de avatar o el campo avatarId está vacío');
    }
}

function obtenerRutaAvatar(id) {
    const avatar = AvataresData.Avatares.find(avatar => avatar.id === id);
    console.log('Ruta del avatar buscada para el ID', id, ':', avatar ? avatar.ruta : 'No encontrado');
    return avatar ? avatar.ruta : null;
}


function configurarEventosUI() {
    const saveNameButton = document.getElementById('saveNameButton');
    const saveNewNameButton = document.getElementById('savenewname');

    saveNameButton.addEventListener('click', toggleProfileEdit);
    saveNewNameButton.addEventListener('click', actualizarNombre);

    // Redirigir a index.html al hacer clic en el avatar si hay datos en localStorage
    const profileElement = document.querySelector('.profile_img');
    if (profileElement) {
        profileElement.addEventListener('click', () => {
            if (localStorage.getItem('usuario')) {
                window.location.href = 'index.html';
            }
        });
    }
}

function toggleProfileEdit() {
    const profilenewdata = document.querySelector('.profiledatenew');
    const inputNameNew = document.querySelector('.inputnamenew');
    const saveNewNameButton = document.getElementById('savenewname');

    profilenewdata.classList.toggle('active');  // Muestra u oculta el contenedor de edición
    inputNameNew.classList.toggle('active');   // Muestra u oculta el campo de entrada de texto
    saveNewNameButton.classList.toggle('active');  // Muestra u oculta el botón de guardar
    inputNameNew.value = document.querySelector('.profile-name').textContent;
}

async function actualizarNombre() {
    const inputNameNew = document.querySelector('.inputnamenew');
    const nuevoNombre = inputNameNew.value.trim();
    const avatarId = document.getElementById('avatarImg').dataset.avatarId;

    if (!nuevoNombre) {
        alert('El nombre no puede estar vacío');
        return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    try {
        const resultado = await actualizarNombreYAvatarUsuario(usuario.usuarioId, nuevoNombre, parseInt(avatarId, 10));

        if (resultado.success) {
            // Actualizar localStorage después de una actualización exitosa en Firebase
            usuario.nombre = nuevoNombre;
            localStorage.setItem('usuario', JSON.stringify(usuario));

            // Actualizar el nombre en la interfaz
            document.querySelector('.profile-name').textContent = nuevoNombre;
            alert('Nombre actualizado correctamente.');
        } else {
            alert(`Error: ${resultado.reason}`);
        }
    } catch (error) {
        console.error('Error al intentar guardar el nuevo nombre:', error);
        alert('Ocurrió un error al intentar guardar el nuevo nombre');
    }
}
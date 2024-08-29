

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
    const inputNameNew = document.querySelector('.inputnamenew');
    const saveNewNameButton = document.getElementById('savenewname');
    const profilenewdata = document.querySelector('.profiledatenew');
    const profileImg = document.querySelector('.profile_img');

    if (saveNameButton && inputNameNew && saveNewNameButton) {
        saveNameButton.addEventListener('click', function() {
            console.log('Botón "Administrar perfiles" clickeado');
            profilenewdata.classList.toggle('active');

            setTimeout(() => {
                inputNameNew.classList.toggle('active');
                saveNewNameButton.classList.toggle('active');
                const profileName = document.querySelector('.profile-name').textContent;
                inputNameNew.value = profileName;
                console.log('Campo de edición mostrado con valor:', inputNameNew.value);
            }, 40);
        });
    } else {
        console.error('No se encontraron los elementos necesarios para editar el nombre');
    }

    if (saveNewNameButton) {
        saveNewNameButton.addEventListener('click', async function() {
            try {
                const nuevoNombre = inputNameNew.value.trim();
                console.log('Nuevo nombre ingresado:', nuevoNombre);

                if (nuevoNombre && nuevoNombre !== '') {
                    const usuario = JSON.parse(localStorage.getItem('usuario'));
                    const avatarId = document.getElementById('avatarImg').dataset.avatarId;

                    const resultado = await actualizarNombreYAvatarUsuario(usuario.usuarioId, nuevoNombre, parseInt(avatarId, 10));

                    if (resultado.success) {
                        usuario.nombre = nuevoNombre;
                        localStorage.setItem('usuario', JSON.stringify(usuario));

                        document.querySelector('.profile-name').textContent = nuevoNombre;
                        inputNameNew.classList.remove('active');
                        saveNewNameButton.classList.remove('active');
                        setTimeout(() => {
                            profilenewdata.classList.remove('active');
                            console.log('Nombre actualizado y campo de edición oculto');
                        }, 250);
                    } else {
                        alert(`Error: ${resultado.reason}`);
                    }
                } else {
                    alert('El nombre no puede estar vacío');
                }
            } catch (error) {
                console.error('Error en el evento del botón "Guardar":', error);
                alert('Ocurrió un error al intentar guardar el nuevo nombre');
            }
        });
    } else {
        console.error('No se encontró el botón de guardar');
    }

    if (profileImg) {
        profileImg.addEventListener('click', () => {
            if (localStorage.getItem('usuario')) {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'login.html';
            }
        });
    }
}
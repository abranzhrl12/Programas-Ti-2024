import { actualizarNombreUsuario } from './../Conexion/conexion';

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar los datos del usuario desde localStorage
    console.log("holaaaaaa");
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verificar que el usuario y el nombre existan en los datos recuperados
    if (usuario && usuario.nombre) {
        // Asignar el nombre al elemento con la clase 'profile-name'
        document.querySelector('.profile-name').textContent = usuario.nombre;

        // Configurar el evento del botón "Administrar perfiles"
        const saveNameButton = document.getElementById('saveNameButton');
        const inputNameNew = document.querySelector('.inputnamenew');
        const saveNewNameButton = document.getElementById('savenewname');
        const profilenewdata = document.querySelector('.profiledatenew');
        
        if (saveNameButton && inputNameNew && saveNewNameButton) {
            saveNameButton.addEventListener('click', function() {
                // Alternar la clase 'active' en los elementos para mostrar el campo de edición
                profilenewdata.classList.toggle('active')
                
                setTimeout(() => {
                    inputNameNew.classList.toggle('active');
                    saveNewNameButton.classList.toggle('active');
                    inputNameNew.value = usuario.nombre; // Establecer el valor actual del nombre
                }, 40); // Ajusta el tiempo según lo necesites (en milisegundos)
            });
        }

        // Configurar el evento del botón "Guardar" para actualizar el nombre
        if (saveNewNameButton) {
            saveNewNameButton.addEventListener('click', async function() {
                const nuevoNombre = inputNameNew.value;

                if (nuevoNombre.trim() && usuario && usuario.usuarioId) {
                    const resultado = await actualizarNombreUsuario(usuario.usuarioId, nuevoNombre);

                    if (resultado.success) {
                    
                        document.querySelector('.profile-name').textContent = nuevoNombre;
                        inputNameNew.classList.remove('active'); // Ocultar el campo de edición
                        saveNewNameButton.classList.remove('active'); // Ocultar el botón de guardar
                        setTimeout(() => {
                            profilenewdata.classList.remove('active'); // Ocultar el campo de edición
                            // profilenewdata.style.display="none"
                        }, 250); // Ajusta el tiempo según lo necesites (en milisegundos)
                      
                    } else {
                        alert(`Error: ${resultado.reason}`);
                    }
                } else {
                    alert('El nombre no puede estar vacío');
                }
            });
        }

        // Configurar el evento del elemento con la clase 'profile'
        const profileElement = document.querySelector('.profile_img');
        if (profileElement) {
            profileElement.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    } else {
        console.log('No se encontró el nombre del usuario en localStorage.');
    }
});
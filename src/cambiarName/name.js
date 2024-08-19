import { actualizarNombreUsuario,handleImageUpload } from './../Conexion/conexion';

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Recuperar los datos del usuario desde localStorage
     
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        // Verificar que el usuario y el nombre existan en los datos recuperados
        if (usuario && usuario.nombre) {
            console.log('Usuario recuperado:', usuario);
            
            // Asignar el nombre al elemento con la clase 'profile-name'
            const profileNameElement = document.querySelector('.profile-name');
            if (profileNameElement) {
                profileNameElement.textContent = usuario.nombre;
            } else {
                console.error('No se encontró el elemento .profile-name');
            }

            // Configurar el evento del botón "Administrar perfiles"
            const saveNameButton = document.getElementById('saveNameButton');
            const inputNameNew = document.querySelector('.inputnamenew');
            const saveNewNameButton = document.getElementById('savenewname');
            const profilenewdata = document.querySelector('.profiledatenew');
            
            if (saveNameButton && inputNameNew && saveNewNameButton) {
                saveNameButton.addEventListener('click', function() {
                    console.log('Botón "Administrar perfiles" clickeado');
                    // Alternar la clase 'active' en los elementos para mostrar el campo de edición
                    profilenewdata.classList.toggle('active');
                    
                    setTimeout(() => {
                        inputNameNew.classList.toggle('active');
                        saveNewNameButton.classList.toggle('active');
                        inputNameNew.value = usuario.nombre; // Establecer el valor actual del nombre
                        console.log('Campo de edición mostrado con valor:', inputNameNew.value);
                    }, 40); // Ajusta el tiempo según lo necesites (en milisegundos)
                });
            } else {
                console.error('No se encontraron los elementos necesarios para editar el nombre');
            }

            // Configurar el evento del botón "Guardar" para actualizar el nombre
            if (saveNewNameButton) {
                saveNewNameButton.addEventListener('click', async function() {
                    try {
                        const nuevoNombre = inputNameNew.value;
                        console.log('Nuevo nombre ingresado:', nuevoNombre);

                        if (nuevoNombre.trim() && usuario && usuario.usuarioId) {
                            const resultado = await actualizarNombreUsuario(usuario.usuarioId, nuevoNombre);

                            if (resultado.success) {
                                document.querySelector('.profile-name').textContent = nuevoNombre;
                                inputNameNew.classList.remove('active'); // Ocultar el campo de edición
                                saveNewNameButton.classList.remove('active'); // Ocultar el botón de guardar
                                setTimeout(() => {
                                    profilenewdata.classList.remove('active'); // Ocultar el campo de edición
                                    console.log('Nombre actualizado y campo de edición oculto');
                                }, 250); // Ajusta el tiempo según lo necesites (en milisegundos)
                            
                            } else {
                                console.error('Error al actualizar el nombre:', resultado.reason);
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

            // Configurar el evento del elemento con la clase 'profile'
            const profileElement = document.querySelector('.profile_img');
            if (profileElement) {
                profileElement.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
            } else {
                console.error('No se encontró el elemento con la clase .profile_img');
            }
        } else {
            console.log('No se encontró el nombre del usuario en localStorage.');
        }
    } catch (error) {
        console.error('Error al inicializar la página:', error);
    }
});
// document.addEventListener('DOMContentLoaded', function() {
//     try {
//         // Recuperar los datos del usuario desde localStorage
//         const usuario = JSON.parse(localStorage.getItem('usuario'));

//         // Verificar que el usuario y el nombre existan en los datos recuperados
//         if (usuario && usuario.nombre) {
//             console.log('Usuario recuperado:', usuario);
            
//             // Asignar el nombre al elemento con la clase 'profile-name'
//             const profileNameElement = document.querySelector('.profile-name');
//             if (profileNameElement) {
//                 profileNameElement.textContent = usuario.nombre;
//             } else {
//                 console.error('No se encontró el elemento .profile-name');
//             }

//             // Configurar el evento del botón "Administrar perfiles"
//             const saveNameButton = document.getElementById('saveNameButton');
//             const inputNameNew = document.querySelector('.inputnamenew');
//             const saveNewNameButton = document.getElementById('savenewname');
//             const profilenewdata = document.querySelector('.profiledatenew');
//             const saveImageButton = document.getElementById('saveImageButton');
//             const fileInput = document.getElementById('fileInput');
//             const profileImage = document.getElementById('profileImage');

//             if (saveNameButton && inputNameNew && saveNewNameButton) {
//                 saveNameButton.addEventListener('click', function() {
//                     console.log('Botón "Administrar perfiles" clickeado');
//                     // Alternar la clase 'active' en los elementos para mostrar el campo de edición
//                     profilenewdata.classList.toggle('active');
                    
//                     setTimeout(() => {
//                         inputNameNew.classList.toggle('active');
//                         saveNewNameButton.classList.toggle('active');
//                         inputNameNew.value = usuario.nombre; // Establecer el valor actual del nombre
//                         console.log('Campo de edición mostrado con valor:', inputNameNew.value);
//                     }, 40); // Ajusta el tiempo según lo necesites (en milisegundos)
//                 });
//             } else {
//                 console.error('No se encontraron los elementos necesarios para editar el nombre');
//             }

//             // Configurar el evento del botón "Guardar" para actualizar el nombre
//             if (saveNewNameButton) {
//                 saveNewNameButton.addEventListener('click', async function() {
//                     try {
//                         const nuevoNombre = inputNameNew.value;
//                         console.log('Nuevo nombre ingresado:', nuevoNombre);

//                         if (nuevoNombre.trim() && usuario && usuario.usuarioId) {
//                             const resultado = await actualizarNombreUsuario(usuario.usuarioId, nuevoNombre);

//                             if (resultado.success) {
//                                 profileNameElement.textContent = nuevoNombre;
//                                 inputNameNew.classList.remove('active'); // Ocultar el campo de edición
//                                 saveNewNameButton.classList.remove('active'); // Ocultar el botón de guardar
//                                 setTimeout(() => {
//                                     profilenewdata.classList.remove('active'); // Ocultar el campo de edición
//                                     console.log('Nombre actualizado y campo de edición oculto');
//                                 }, 250); // Ajusta el tiempo según lo necesites (en milisegundos)
                            
//                             } else {
//                                 console.error('Error al actualizar el nombre:', resultado.reason);
//                                 alert(`Error: ${resultado.reason}`);
//                             }
//                         } else {
//                             alert('El nombre no puede estar vacío');
//                         }
//                     } catch (error) {
//                         console.error('Error en el evento del botón "Guardar":', error);
//                         alert('Ocurrió un error al intentar guardar el nuevo nombre');
//                     }
//                 });
//             } else {
//                 console.error('No se encontró el botón de guardar');
//             }

//             // Configurar el evento del botón "Guardar Imagen"
//             if (saveImageButton && fileInput && profileImage) {
//                 saveImageButton.addEventListener('click', function() {
//                     const file = fileInput.files[0];
//                     handleImageUpload(file, profileImage);
//                 });
//             } else {
//                 console.error('No se encontraron los elementos necesarios para guardar la imagen.');
//             }

//             // Configurar el evento del elemento con la clase 'profile'
//             const profileElement = document.querySelector('.profile_img');
//             if (profileElement) {
//                 profileElement.addEventListener('click', () => {
//                     window.location.href = 'index.html';
//                 });
//             } else {
//                 console.error('No se encontró el elemento con la clase .profile_img');
//             }
//         } else {
//             console.log('No se encontró el nombre del usuario en localStorage.');
//         }
//     } catch (error) {
//         console.error('Error al inicializar la página:', error);
//     }
// });
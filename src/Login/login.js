
import { registrarDispositivoYAutenticar } from '../Conexion/conexion';
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            try {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                // Simular funciones async
                const getDeviceDetails = async () => ({ /* detalles del dispositivo */ });
                const generateDeviceId = () => 'some-device-id';
                const registrarDispositivoYAutenticar = async (email, password, deviceDetails) => ({ authenticated: true, reason: '' });
                const showModal = (message) => alert(message);

                const deviceDetails = await getDeviceDetails();
                const deviceId = localStorage.getItem('deviceId') || generateDeviceId();
                deviceDetails.deviceId = deviceId;
                localStorage.setItem('deviceId', deviceId);
                
                const result = await registrarDispositivoYAutenticar(email, password, deviceDetails);
                
                if (result.authenticated) {
                    const userData = JSON.parse(localStorage.getItem('usuario')) || { nombre: 'Usuario' };
                    showModal(`¡Inicio de sesión exitoso! Bienvenido, ${userData.nombre}.`);
                    
                    setTimeout(function() {
                        window.location.href = 'perfiles.html';
                    }, 900);
                } else {
                    showModal(result.reason);
                    if (result.reason === 'Máximo de dispositivos alcanzado') {
                        localStorage.removeItem('deviceId');
                    }
                }
            } catch (error) {
                console.error("Error al verificar credenciales:", error);
                showModal("Error al intentar iniciar sesión. Por favor, inténtalo más tarde.");
            }
        });
    } else {
        console.log("Formulario con ID 'loginForm' no encontrado.");
    }
});

async function getDeviceDetails() {
    try {
        const platformInfo = platform.parse(navigator.userAgent);
    const { name, os } = platformInfo;
    
    // Obtener la dirección IP pública
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();

    return {
        navegadorNombre: name,
        sistemaOperativo: `${os.family} ${os.version}`,
        ipPublica: ipData.ip
    }; 
    } catch (error) {
        
    }
   
}

function generateDeviceId() {
    return 'device-' + Math.random().toString(36).substr(2, 9);
}

function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    modal.style.display = 'block'; // Mostrar el modal
    
    // Asignar mensaje al contenido del modal
    modalText.innerHTML = `<p>${message}</p>`;
    
    // Agregar evento para cerrar el modal al hacer clic en la X
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none'; // Ocultar el modal al hacer clic en la X
    }
    
    // Cerrar automáticamente el modal después de 2.5 segundos
    setTimeout(function() {
        modal.style.display = 'none';
    }, 2500);
}




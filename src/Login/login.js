import { verificarCredenciales } from '../Conexion/conexion';

try {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
      
        try {
            const authenticated = await verificarCredenciales(email, password);
            
            if (authenticated) {
                // Obtener datos del usuario autenticado desde localStorage
                const userData = JSON.parse(localStorage.getItem('usuario'));
    
                // Mostrar mensaje de éxito
                showModal("¡Inicio de sesión exitoso!");
    
                // Redirigir al usuario a otra página (opcional)
                setTimeout(function() {
                    window.location.href = 'index.html';
    
                }, 900);
              
            } else {
                // Mostrar mensaje de error
                showModal("Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al verificar credenciales:", error);
            showModal("Error al intentar iniciar sesión. Por favor, inténtalo más tarde.");
        }
    });
    
    
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
        
        // Cerrar automáticamente el modal después de 2 segundos
        setTimeout(function() {
            modal.style.display = 'none';
        }, 2500);
    }
    
     
} catch (error) {
    
}

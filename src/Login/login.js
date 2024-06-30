import { verificarCredenciales } from '../Conexion/conexion';


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
        const authenticated = await verificarCredenciales(email, password);
        if (authenticated) {
            // Solo si las credenciales son correctas, guardar en localStorage
            localStorage.setItem('usuario', JSON.stringify({ nombre: 'John', email: 'john@example.com' }));
            localStorage.setItem('usuarioAutenticado', 'true');
  
            // Redirigir al usuario a otra página
            window.location.href = 'index.html';
            
            console.log("Acceso concedido.");
            alert("Acceso concedido. Redirigiendo a la página principal...");
        } else {
            console.log("Acceso denegado.");
            alert("Email o contraseña incorrectos. Por favor, intenta de nuevo.");
        }
    } catch (error) {
        console.error("Error al verificar credenciales:", error);
        alert("Error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.");
    }
});
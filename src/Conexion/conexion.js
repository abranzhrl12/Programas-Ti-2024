import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyAKf5D2G62O_F80u7GvKqb0zKheyXYCnVo",
  authDomain: "programas-ti.firebaseapp.com",
  projectId: "programas-ti",
  storageBucket: "programas-ti.appspot.com",
  messagingSenderId: "535089377431",
  appId: "1:535089377431:web:ba7b861507806d214839d2"
};
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);


// Función para verificar credenciales de usuario
export async function verificarCredenciales(email, password) {
  try {
    // Consulta para buscar usuarios con el email y contraseña especificados
    const usersRef = collection(db, 'Usuarios');
    const q = query(usersRef, where('usuario', '==', email), where('contraseña', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Usuario encontrado, credenciales válidas
      console.log("Usuario autenticado correctamente.");
      return true;
    } else {
      // Usuario no encontrado o credenciales inválidas
      console.log("Usuario no encontrado o credenciales inválidas.");
      return false;
    }
  } catch (error) {
    console.error("Error al verificar credenciales:", error);
    return false;
  }
}















// // Función para verificar credenciales de usuario
// async function verificarCredenciales(email, password) {
//   try {
//       // Consulta para buscar usuarios con el email y contraseña especificados
//       const usersRef = collection(db, 'Usuarios'); // Reemplaza 'Usuarios' con el nombre de tu colección
//       const q = query(usersRef, where('usuario', '==', email), where('contraseña', '==', password));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.size > 0) {
//           // Usuario encontrado, credenciales válidas
//           console.log("Usuario autenticado correctamente.");
//           return true;
//       } else {
//           // Usuario no encontrado o credenciales inválidas
//           console.log("Usuario no encontrado o credenciales inválidas.");
//           return false;
//       }
//   } catch (error) {
//       console.error("Error al verificar credenciales:", error);
//       return false;
//   }
// }

// // Manejo del formulario de inicio de sesión
// document.getElementById('loginForm').addEventListener('submit', async function(event) {
//   event.preventDefault();
  
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   try {
//       const authenticated = await verificarCredenciales(email, password);
//       if (authenticated) {
//           // Aquí puedes redirigir al usuario o realizar acciones adicionales
//           console.log("Acceso concedido.");
//           alert("Acceso concedido. Redirigiendo a la página principal...");
//           // Aquí puedes redirigir al usuario a otra página
//       } else {
//           console.log("Acceso denegado.");
//           alert("Email o contraseña incorrectos. Por favor, intenta de nuevo.");
//       }
//   } catch (error) {
//       console.error("Error al verificar credenciales:", error);
//       alert("Error al intentar iniciar sesión. Por favor, intenta de nuevo más tarde.");
//   }
// });
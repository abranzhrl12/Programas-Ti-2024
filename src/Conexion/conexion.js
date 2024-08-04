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

export async function verificarCredenciales(email, password) {
  try {
    // Consulta para buscar usuarios con el email y contraseña especificados
    const usersRef = collection(db, 'usuarios');
    const q = query(usersRef, where('usuario', '==', email), where('contraseña', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Usuario encontrado, obtener datos del primer documento (asumiendo que hay solo uno)
      const userData = querySnapshot.docs[0].data();

      // Guardar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('usuarioAutenticado', 'true');

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

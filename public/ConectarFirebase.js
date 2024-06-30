// const firebaseConfig = {
//   apiKey: "AIzaSyAKf5D2G62O_F80u7GvKqb0zKheyXYCnVo",
//   authDomain: "programas-ti.firebaseapp.com",
//   projectId: "programas-ti",
//   storageBucket: "programas-ti.appspot.com",
//   messagingSenderId: "535089377431",
//   appId: "1:535089377431:web:3e6c39ccf6a971804839d2"
// };
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// auth.languageCode = "es";

// async function login() {
//   try {
//     const response = await auth.signInWithPopup(provider);
//     console.log("Usuario autenticado:", response.user.displayName);
//     return response.user; // Accede al objeto de usuario desde response
//   } catch (error) {
//     throw new Error(error.message); // Lanza un error con el mensaje de error
//   }
// }

// function logout() {
//   auth.signOut();
// }

// let currentUser;



// const btnLogin = document.querySelector(".btn");
// btnLogin.addEventListener('click', async (e) => {
//   try {
//     // currentUser =
//    currentUser= await login();
//   } catch (error) {
//     console.error("Error al iniciar sesión:", error);
//   }
// });

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAKf5D2G62O_F80u7GvKqb0zKheyXYCnVo",
  authDomain: "programas-ti.firebaseapp.com",
  projectId: "programas-ti",
  storageBucket: "programas-ti.appspot.com",
  messagingSenderId: "535089377431",
  appId: "1:535089377431:web:3e6c39ccf6a971804839d2"
};

// firebase-config.js



// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de servicios Firebase
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); // opcional, si utilizas analytics

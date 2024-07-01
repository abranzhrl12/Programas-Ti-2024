

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

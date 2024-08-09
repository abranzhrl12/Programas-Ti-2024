import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore/lite';

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

const MAX_DEVICES = 2; // Máximo número de dispositivos permitidos por usuario

export async function registrarDispositivoYAutenticar(correo, contraseña, detallesDispositivo) {
  try {
    const usersRef = collection(db, 'usuarios');
    const q = query(usersRef, where('correo', '==', correo), where('contraseña', '==', contraseña));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Verificar cuántos dispositivos están registrados para este usuario
      const dispositivosRef = collection(db, 'dispositivos');
      const dispositivosQuery = query(dispositivosRef, where('usuarioId', '==', userId));
      const dispositivosSnapshot = await getDocs(dispositivosQuery);

      if (dispositivosSnapshot.size >= MAX_DEVICES) {
        console.log("Máximo de dispositivos alcanzado.");
        return { authenticated: false, reason: 'Máximo de dispositivos alcanzado' };
      }

      // Verificar si el dispositivo ya está registrado
      const dispositivoExistenteQuery = query(dispositivosRef, where('usuarioId', '==', userId), where('deviceId', '==', detallesDispositivo.deviceId));
      const dispositivoExistenteSnapshot = await getDocs(dispositivoExistenteQuery);

      if (dispositivoExistenteSnapshot.size === 0) {
        // Registrar el nuevo dispositivo
        const dispositivoDocRef = doc(dispositivosRef);
        await setDoc(dispositivoDocRef, {
          usuarioId: userId,
          fechaRegistro: new Date().toISOString(),
          navegadorNombre: detallesDispositivo.navegadorNombre,
          sistemaOperativo: detallesDispositivo.sistemaOperativo,
          ipPublica: detallesDispositivo.ipPublica,
          deviceId: detallesDispositivo.deviceId
        });
      }

      // Guardar datos del usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify({ correo, contraseña, usuarioId: userId, nombre: userData.nombre }));
      localStorage.setItem('usuarioAutenticado', 'true');

      console.log("Usuario autenticado y dispositivo registrado correctamente.");
      return { authenticated: true, usuarioId: userId };
    } else {
      console.log("Usuario no encontrado o credenciales inválidas.");
      return { authenticated: false, reason: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error("Error al registrar dispositivo y autenticar:", error);
    return { authenticated: false, reason: 'Error al verificar credenciales' };
  }
}

export async function verificarCredenciales(correo, contraseña) {
  try {
    console.log('Iniciando verificación de credenciales');
    const usersRef = collection(db, 'usuarios');
    console.log('Colección de usuarios obtenida');
    
    const q = query(usersRef, where('correo', '==', correo), where('contraseña', '==', contraseña));
    console.log('Consulta construida:', q);
    
    const querySnapshot = await getDocs(q);
    console.log('Resultado de la consulta obtenida:', querySnapshot);

    if (querySnapshot.size > 0) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log('Datos del usuario obtenidos:', userData);

      return { authenticated: true, userData };
    } else {
      console.log('Usuario no encontrado o credenciales inválidas.');
      return { authenticated: false, reason: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error('Error al verificar credenciales:', error);
    return { authenticated: false, reason: 'Error al verificar credenciales', details: error.message };
  }
}

export async function verificarDispositivo(usuarioId, deviceId) {
  try {
    const dispositivosRef = collection(db, 'dispositivos');
    const dispositivosQuery = query(dispositivosRef, where('usuarioId', '==', usuarioId), where('deviceId', '==', deviceId));
    const dispositivosSnapshot = await getDocs(dispositivosQuery);
    
    if (dispositivosSnapshot.size > 0) {
      console.log('Dispositivo verificado correctamente.');
      return { verified: true };
    } else {
      console.log('El dispositivo no está registrado.');
      return { verified: false, reason: 'El dispositivo no está registrado' };
    }
  } catch (error) {
    console.error('Error al verificar dispositivo:', error);
    return { verified: false, reason: 'Error al verificar dispositivo', details: error.message };
  }
}

export function verificarFechaExpiracion(fechaExpiracion) {
  const ahora = Timestamp.now();
  console.log('Fecha y hora actual:', ahora.toDate());

  if (fechaExpiracion.toDate() < ahora.toDate()) {
    console.log('La cuenta del usuario ha expirado.');
    return { expired: true };
  } else {
    return { expired: false };
  }
}
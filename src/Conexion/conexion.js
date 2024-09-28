

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, Timestamp,updateDoc,deleteDoc,getDoc } from 'firebase/firestore/lite';

import { obtenerDetallesDispositivo } from './../Peliculas/dispostivo';
const firebaseConfig = {
  apiKey: "AIzaSyDs8wTtgLSOg-bnLpBK4K5Hege66pg9wVQ",
  authDomain: "streamixmovie.firebaseapp.com",
  projectId: "streamixmovie",
  storageBucket: "streamixmovie.appspot.com",
  messagingSenderId: "724237092696",
  appId: "1:724237092696:web:7e2f773517853bb6b5872d"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


const MAX_DEVICES = 3; // Máximo número de dispositivos permitidos por usuario

let dispo="";
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
      dispo=detallesDispositivo.deviceId;
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
      localStorage.setItem('usuario', JSON.stringify({ correo, contraseña, usuarioId: userId, nombre: userData.nombreUsuario ,avatarId: userData.avatarId,Plan: userData.Plan,deviceId: detallesDispositivo.deviceId }));
      localStorage.setItem('usuarioAutenticado', 'true');

      console.log("Usuario autenticado y dispositivo registrado correctamente." ,detallesDispositivo.deviceId);
      console.log("holaaaa , " ,JSON.parse(localStorage.getItem('usuario')));
      console.log(detallesDispositivo.deviceId)
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
      console.log("veeeeeeeeeeeeeeeeeeeeeeeeeee")

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
      return { verified: false, reason: 'El dispositivo no está registrado error' };
    }
  } catch (error) {
    console.error('Error al verificar dispositivo:', error);
    return { verified: false, reason: 'Error al verificar dispositivo', details: error.message };
  }
}

export function verificarFechaExpiracion(fechaExpiracion) {
  try {
    const ahora = Timestamp.now();
    console.log('Fecha y hora actual:', ahora.toDate());
  
    if (fechaExpiracion.toDate() < ahora.toDate()) {
      console.log('La cuenta del usuario ha expirado.');
      return { expired: true };
    } else {
      return { expired: false };
    }
  } catch (error) {
    
  }
 
}
export async function actualizarNombreYAvatarUsuario(usuarioId, nuevoNombre, avatarId) {
  try {
    const usuarioRef = doc(db, 'usuarios', usuarioId);
    
    await updateDoc(usuarioRef, {
      nombreUsuario: nuevoNombre,
      avatarId: parseInt(avatarId, 10)
    });

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      usuario.nombre = nuevoNombre;
      usuario.avatarId = parseInt(avatarId, 10);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    console.log('Nombre y avatar del usuario actualizados correctamente.');
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar el nombre y avatar del usuario:', error);
    return { success: false, reason: 'Error al actualizar el nombre y avatar del usuario', details: error.message };
  }
}

// export async function obtenerDatosActualizadosUsuario(usuarioId) {
//   try {
//       const usuarioRef = doc(db, 'usuarios', usuarioId);
//       const usuarioSnapshot = await getDoc(usuarioRef);
      
//       if (usuarioSnapshot.exists()) {
//           const usuarioData = usuarioSnapshot.data();
//           // Actualizar localStorage con los datos más recientes
//           localStorage.setItem('usuario', JSON.stringify({ 
//               correo: usuarioData.correo, 
//               contraseña: usuarioData.contraseña, 
//               usuarioId: usuarioId, 
//               nombre: usuarioData.nombreUsuario,
//               avatarId: usuarioData.avatarId 
//           }));
//           console.log('Datos del usuario actualizados en localStorage:', usuarioData);
//           return usuarioData;
//       } else {
//           console.error('El usuario no existe en la base de datos.');
//           return null;
//       }
//   } catch (error) {
//       console.error('Error al obtener datos del usuario:', error);
//       return null;
//   }
// }

export async function obtenerDatosActualizadosUsuario(usuarioId) {
  try {
      const usuarioRef = doc(db, 'usuarios', usuarioId);
      const usuarioSnapshot = await getDoc(usuarioRef);
      
      if (usuarioSnapshot.exists()) {
          const usuarioData = usuarioSnapshot.data();
          
          // Recuperar los datos existentes del usuario en localStorage
          const usuarioActual = JSON.parse(localStorage.getItem('usuario')) || {};

          // Actualizar solo los campos que han cambiado o son nuevos
          const datosActualizados = {
              ...usuarioActual, // Mantener los datos existentes
              correo: usuarioData.correo,
              contraseña: usuarioData.contraseña,
              usuarioId: usuarioId,
              nombre: usuarioData.nombreUsuario,
              avatarId: usuarioData.avatarId
          };
          // Guardar los datos actualizados en localStorage
          localStorage.setItem('usuario', JSON.stringify(datosActualizados));
          console.log('Datos del usuario actualizados en localStorageeee:', datosActualizados);
          return datosActualizados;
      } else {
          console.error('El usuario no existe en la base de datos.');
          return null;
      }
  } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
  }
}


export async function cerrarSesion() {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario || !usuario.usuarioId) {
      console.log("No hay un usuario autenticado.");
      return;
    }

    const detallesDispositivo = await obtenerDetallesDispositivo();
    const deviceId = detallesDispositivo.deviceId;

    // Elimina el dispositivo asociado a este usuario
    const dispositivosRef = collection(db, 'dispositivos');
    const dispositivoQuery = query(dispositivosRef, where('usuarioId', '==', usuario.usuarioId), where('deviceId', '==', deviceId));
    const dispositivoSnapshot = await getDocs(dispositivoQuery);

    if (dispositivoSnapshot.size > 0) {
      const dispositivoDocRef = dispositivoSnapshot.docs[0].ref;
      await deleteDoc(dispositivoDocRef);
      console.log("Dispositivo eliminado correctamente.");
    } else {
      console.log("No se encontró el dispositivo en la base de datos.");
    }

    // Limpia el localStorage para cerrar sesión
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioAutenticado');
    console.log("Sesión cerrada correctamente.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}


export default async function obtenerDispositivosPorUserId() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log("Valor de usuario desde localStorage:", usuario);  // Verificar el objeto completo

  if (usuario && usuario.usuarioId) {
      const userId = usuario.usuarioId;
      console.log("Valor de userId:", userId);  // Verificar el valor de userId

      try {
          // Crear referencia a la colección y la consulta
          const dispositivosRef = collection(db, 'dispositivos');
          const dispositivosQuery = query(dispositivosRef, where('usuarioId', '==', userId));
       
          // Ejecutar la consulta
          const dispositivosSnapshot = await getDocs(dispositivosQuery);

          console.log("Cantidad de dispositivos encontrados:", dispositivosSnapshot.size);  // Verificar cuántos documentos devuelve la consulta
          const cuentadevice=document.querySelector("#deviceId")
          const fechaRegistro=document.querySelector("#fechaRegistro")
          const dispositivoentrante=document.querySelector("#dispositivos")
          const sistemaOperativo=document.querySelector("#sistemaOperativo")

                   
          
          if (dispositivosSnapshot.empty) {
              console.log("No hay dispositivos enlazados a este usuario.");
          } else {
              dispositivosSnapshot.forEach((doc) => {
                  console.log(`Dispositivo ID: ${doc.id}`, doc.data());
                cuentadevice.innerHTML=`${doc.id}`
                fechaRegistro.innerHTML=`${doc.data().fechaRegistro}`
                dispositivoentrante.innerHTML=`${doc.data().navegadorNombre}`
                sistemaOperativo.innerHTML=`${doc.data().sistemaOperativo}`
              });
          }
      } catch (error) {
          console.error("Error obteniendo los dispositivos:", error);
      }
  } else {
      console.log("No se encontró el 'usuarioId' en el objeto 'usuario' en localStorage.");
  }
}
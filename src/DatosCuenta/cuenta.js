import obtenerDispositivosPorUserId from "../Conexion/conexion";

async function llamarFuncion() {
    const dispositivos = await obtenerDispositivosPorUserId();
    console.log( " probemosssss" ,dispositivos);
}

llamarFuncion();

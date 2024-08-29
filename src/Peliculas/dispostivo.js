import  platform  from 'platform';

let detallesDispositivo = null;

export async function obtenerDetallesDispositivo() {
  if (!detallesDispositivo) {
    detallesDispositivo = await getDeviceDetails();
    detallesDispositivo.deviceId = localStorage.getItem('deviceId');
  }
  return detallesDispositivo;
}

async function getDeviceDetails() {
  const platformInfo = platform.parse(navigator.userAgent);
  const { name, os } = platformInfo;

  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();

  return {
    navegadorNombre: name,
    sistemaOperativo: `${os.family} ${os.version}`,
    ipPublica: ipData.ip
  };
}


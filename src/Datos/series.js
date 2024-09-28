export default {
    Series: [
      {
        id: 5000,
        nombre: "Serie Ejemplo 1",
        imagen: "../../Assets/ImagenesSeries/serie_ejemplo_1.webp",
        imagen_small: "../../Assets/ImagenesSeries/serie_ejemplo_1-small.webp",
        imagen_tv: "../../Assets/ImagenesSeries/tv/serie_ejemplo_1-tv.webp",
        Generos: ["Drama", "Ciencia Ficción"],
        Año: "2024",
        Temporadas: [
          {
            temporada: 1,
            capitulos: [
              {
                capitulo: 1,
                nombre: "Capítulo 1: El Comienzo",
                imagen: "../../Assets/ImagenesSeries/serie_ejemplo_1_temp1_cap1.webp",
                Video:
                  "https://iframe.mediadelivery.net/embed/261653/abcd1234-temp1-cap1",
                Duracion: "45 min"
              },
              {
                capitulo: 2,
                nombre: "Capítulo 2: La Revelación",
                imagen: "../../Assets/ImagenesSeries/serie_ejemplo_1_temp1_cap2.webp",
                Video:
                  "https://iframe.mediadelivery.net/embed/261653/abcd1234-temp1-cap2",
                Duracion: "50 min"
              }
            ]
          },
          {
            temporada: 2,
            capitulos: [
              {
                capitulo: 1,
                nombre: "Capítulo 1: El Retorno",
                imagen: "../../Assets/ImagenesSeries/serie_ejemplo_1_temp2_cap1.webp",
                Video:
                  "https://iframe.mediadelivery.net/embed/261653/abcd1234-temp2-cap1",
                Duracion: "52 min"
              }
              // Puedes seguir agregando más capítulos y temporadas aquí
            ]
          }
        ]
      },
    ]
  };
  
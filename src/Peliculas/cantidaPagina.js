// Función para calcular el número actual de programas por página
// export function calcularProgramasPorPaginaActual() {
//     try {
//      if(window.innerWidth > 369 && window.innerWidth < 455){
//          return 39;  //esto debe tener hasta 75  cargia si doy ver mas 12 en 12 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//      }
//    else if(window.innerWidth > 456 && window.innerWidth < 572){
//      return 40;   //esto debe tener hasta 88  cargia si doy ver mas 16 en 16 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//     }
//     else if(window.innerWidth > 573 && window.innerWidth < 599){
//         return 45;  //esto debe tener hasta 90  cargia si doy ver mas 15 en 15 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//        }
//        else if(window.innerWidth > 600 && window.innerWidth < 714){
//         return 39;  //esto debe tener hasta 75  cargia si doy ver mas 12 en 12 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//        }
//        else if(window.innerWidth > 715 && window.innerWidth < 767){
//         return 40;  //esto debe tener hasta 88  cargia si doy ver mas 16 en 16 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//        }
//        else if(window.innerWidth > 768 && window.innerWidth < 824){
//         return 39;  //esto debe tener hasta 75  cargia si doy ver mas 12 en 12 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//        }
//        else if(window.innerWidth > 825 && window.innerWidth < 1299){
//         return 40; //esto debe tener hasta 88  cargia si doy ver mas 16 en 16 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//        }
//     else if (window.innerWidth > 1300 && window.innerWidth < 1495) {
//          return 50;   //esto debe tener hasta 95  cargia si doy ver mas 15 en 15 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//      } else if(window.innerWidth > 1495) {
//          console.log(window.window.innerWidth)
//          return 56; //esto debe tener hasta 77  cargia si doy ver mas 14 en 14 3 veces y luego se ocultaria el boton o eliminaria creo seria mejor
//      }
//      else{
//          return 54;
//      }
//     } catch (error) {
     
//     }
     
      
//  }
export function calcularProgramasPorPaginaActual() {
    try {
        if (window.innerWidth > 369 && window.innerWidth < 455) {
            return { inicial: 39, incremento: 12, limite: 75 };
        } else if (window.innerWidth > 456 && window.innerWidth < 572) {
            return { inicial: 40, incremento: 16, limite: 88 };
        } else if (window.innerWidth > 571 && window.innerWidth < 599) {
            return { inicial: 45, incremento: 16, limite: 89 };
        } else if (window.innerWidth > 600 && window.innerWidth < 714) {
            return { inicial: 39, incremento: 12, limite: 75 };
        } else if (window.innerWidth > 715 && window.innerWidth < 767) {
            return { inicial: 40, incremento: 16, limite: 88 };
        } else if (window.innerWidth > 768 && window.innerWidth < 824) {
            return { inicial: 39, incremento: 12, limite: 75 };
        } else if (window.innerWidth > 825 && window.innerWidth < 1299) {
            return { inicial: 40, incremento: 16, limite: 88 };
        } else if (window.innerWidth > 1300 && window.innerWidth < 1495) {
            return { inicial: 50, incremento: 15, limite: 95 };
        } else if (window.innerWidth > 1495) {
            return { inicial: 56, incremento: 14, limite: 77 };
        } else {
            return { inicial: 54, incremento: 12, limite: 75 };
        }
    } catch (error) {
        console.error("Error en calcularProgramasPorPaginaActual:", error);
        return { inicial: 40, incremento: 12, limite: 75 };
    }
}
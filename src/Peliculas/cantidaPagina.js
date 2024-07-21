// Función para calcular el número actual de programas por página
export function calcularProgramasPorPaginaActual() {
    try {
     if(window.innerWidth > 369 && window.innerWidth < 564){
         return 26;
     }
   else if(window.innerWidth > 563 && window.innerWidth < 1242){
     return 28;
    }
    
    else if (window.innerWidth > 1243 && window.innerWidth < 1495) {
         return 40;
     } else if(window.innerWidth > 1495) {
         console.log(window.window.innerWidth)
         return 56;
     }
     else{
         return 25;
     }
    } catch (error) {
     
    }
     
      
 }
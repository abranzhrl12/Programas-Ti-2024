// Función para calcular el número actual de programas por página
export function calcularProgramasPorPaginaActual() {
    try {
     if(window.innerWidth > 369 && window.innerWidth < 564){
         return 54;
     }
   else if(window.innerWidth > 563 && window.innerWidth < 1242){
     return 54;
    }
    
    else if (window.innerWidth > 1243 && window.innerWidth < 1495) {
         return 60;
     } else if(window.innerWidth > 1495) {
         console.log(window.window.innerWidth)
         return 70;
     }
     else{
         return 54;
     }
    } catch (error) {
     
    }
     
      
 }
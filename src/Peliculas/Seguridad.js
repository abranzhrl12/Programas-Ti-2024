
export function desactivarMenuContextual() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}

// Desactivar la tecla F12 y otras teclas de desarrollo
export function desactivarTeclasDesarrollo() {
    document.addEventListener('keydown', function(e) {
        // Desactivar la tecla F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Desactivar otras teclas de desarrollo como Ctrl+Shift+I y Ctrl+U
        if (e.ctrlKey && (e.shiftKey || e.key === 'I' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });
}


// function herramientasDesarrolladorAbiertas() {
//     try {
//         const widthThreshold = 300; // Umbral de ancho para considerar las herramientas de desarrollador
//         const heightThreshold = 200; // Umbral de alto para considerar las herramientas de desarrollador
    
//         // Diferencia entre el tamaño exterior e interior de la ventana del navegador
//         const widthDiff = window.outerWidth - window.innerWidth;
//         const heightDiff = window.outerHeight - window.innerHeight;
    
//         // Verificar si alguna de las diferencias supera los umbrales establecidos
//         return widthDiff > widthThreshold || heightDiff > heightThreshold;
//     } catch (error) {
        
//     }
  
// }

// function herramientasDev(){
//     try {
//         let herramientasAbiertas = herramientasDesarrolladorAbiertas();
  
//         const modal = document.getElementById('modalDesarrollador');
       
    
//         // Mostrar el modal si las herramientas de desarrollador están abiertas
//         if (herramientasAbiertas && view!=view2) {
//             modal.classList.add('modal'); // Agregar clase para mostrar el modal
//             setTimeout(() => {
//                 location.reload();
//             }, 3500);
            
//         } else {
            
           
//             // modal.classList.remove('modal');
//         }  
//     } catch (error) {
        
//     }

   
// }  
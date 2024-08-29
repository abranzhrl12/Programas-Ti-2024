export function calcularProgramasPorPaginaActual() {
    try {
        const anchoVentana = window.innerWidth;

        if (anchoVentana > 350 && anchoVentana < 455) {
            return { inicial: 21, incremento: 15, limite: 75 };
        } else if (anchoVentana > 455 && anchoVentana < 572) {
            return { inicial: 201, incremento: 15, limite: 88 };
        } else if (anchoVentana > 571 && anchoVentana < 599) {
            return { inicial: 29, incremento: 16, limite: 89 };
        } else if (anchoVentana > 598 && anchoVentana < 714) {
            return { inicial: 27, incremento: 12, limite: 75 };
        } else if (anchoVentana > 715 && anchoVentana < 767) {
            return { inicial: 28, incremento: 16, limite: 88 };
        } else if (anchoVentana > 767 && anchoVentana < 900) {
            return { inicial: 27, incremento: 12, limite: 75 };
        } else if (anchoVentana > 900 && anchoVentana < 1024) {
            return { inicial: 48,incremento: 0, limite: 48 };  
        } else if (anchoVentana > 1024 && anchoVentana < 1300) {
            return { inicial: 56 ,incremento: 0, limite: 28}; // Sin incremento ni límite
        } else if (anchoVentana > 1300 && anchoVentana < 1584) {
            return { inicial: 55 , incremento: 0, limite: 55}; // Sin incremento ni límite
        } else if (anchoVentana > 1584 && anchoVentana < 1853) {
            return { inicial: 60 ,incremento: 0, limite: 60}; // Sin incremento ni límite
        } else if (anchoVentana > 1853) {
            return { inicial: 63,incremento: 0, limite: 63 }; // Sin incremento ni límite
        } else {
            return { inicial: 21, incremento: 0, limite: 75 }; // Valor predeterminado
        }
    } catch (error) {
        console.error("Error en calcularProgramasPorPaginaActual:", error);
        return { inicial: 28, incremento: 12, limite: 99 }; // Valor predeterminado en caso de error
    }
}

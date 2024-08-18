export function calcularProgramasPorPaginaActual() {

  
    try {
        if (window.innerWidth > 369 && window.innerWidth < 455) {
            return { inicial: 21, incremento: 9, limite: 75 };
        } else if (window.innerWidth > 456 && window.innerWidth < 572) {
            return { inicial: 20, incremento: 9, limite: 88 };
        } else if (window.innerWidth > 571 && window.innerWidth < 599) {
            return { inicial: 29, incremento: 16, limite: 89 };
        } else if (window.innerWidth > 600 && window.innerWidth < 714) {
            return { inicial: 27, incremento: 12, limite: 75 };
        } else if (window.innerWidth > 715 && window.innerWidth < 767) {
            return { inicial: 28, incremento: 16, limite: 88 };
        } else if (window.innerWidth > 768 && window.innerWidth < 900) {
            return { inicial: 27, incremento: 12, limite: 75 };
        }
        else if (window.innerWidth > 899 && window.innerWidth < 1023) {
            return { inicial: 24, incremento: 12, limite: 72 };
        }
        else if (window.innerWidth > 1036 && window.innerWidth < 1300) {
            return { inicial: 28, incremento: 12, limite: 76 };
        } else if (window.innerWidth > 1300 && window.innerWidth < 1584) {
            return { inicial: 45, incremento: 10, limite: 95 };
        } 
        else if (window.innerWidth > 1585 && window.innerWidth < 1853) {
            return { inicial: 30, incremento: 18, limite: 84 };
        }
        else if (window.innerWidth > 1853) {
            return { inicial: 56, incremento: 14, limite:84 };
        } else {
            return { inicial: 21, incremento: 9, limite: 75 };
        }
    } catch (error) {
        console.error("Error en calcularProgramasPorPaginaActual:", error);
        return { inicial: 28, incremento: 12, limite: 99 };
    }
}
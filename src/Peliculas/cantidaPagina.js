
export function calcularProgramasPorPaginaActual() {

  
    try {
        if (window.innerWidth > 369 && window.innerWidth < 455) {
            return { inicial: 27, incremento: 12, limite: 75 };
        } else if (window.innerWidth > 456 && window.innerWidth < 572) {
            return { inicial: 24, incremento: 16, limite: 88 };
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
            return { inicial: 42, incremento: 12, limite: 75 };
        }
    } catch (error) {
        console.error("Error en calcularProgramasPorPaginaActual:", error);
        return { inicial: 40, incremento: 12, limite: 75 };
    }
}
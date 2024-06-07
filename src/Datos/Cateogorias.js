import datos from "./datos";
const { programas } = datos;
export default {
  categorias: [
    {
      id: "Diseño",
      nombre: "Diseño",
      numeroProgramas: programas["Edicion"].length,
    },
  ],
};

// rollup.config.mjs

   import terser from "@rollup/plugin-terser";


// export default {
//   input: "./src/index.js",
//   output: [
//     {
//       file: "./public/bundle.js",
//       format: "cjs",
//     },
//     {
//       file: "./public/bundle.js",
//       format: "iife",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
// };

// export default {
//   input: "./src/index2.js",
//   output: [
//     {
//       file: "./public/bundle2.js",
//       format: "cjs",
//     },
//     {
//       file: "./public/bundle2.js",
//       format: "iife",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
     
// };



export default {
  input: "./src/pelis.js",
  output: [
    {
      file: "./public/Pelis.js",
      format: "cjs",
    },
    {
      file: "./public/Pelis.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
    },
  ],
     
};


// export default {
//   input: "./src/canales.js",
//   output: [
//     {
//       file: "./public/canalestv.js",
//       format: "cjs",
//     },
//     {
//       file: "./public/canalestv.js",
//       format: "cjs",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
     
// };



// import { nodeResolve } from '@rollup/plugin-node-resolve';

// export default {
//   input: 'src/Login/login.js', // archivo de entrada de tu aplicación
//   output: {
//     file: 'dist/bundle6.js', // archivo de salida generado
//     sourcemap: 'inline', // mapeo de código fuente para depuración
//     format: 'iife' // formato de salida, en este caso autoinvocable
//   },
//   plugins: [
//     nodeResolve() // resuelve los módulos npm durante la construcción
//   ]
// };
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




import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

// export default {
//   input: 'src/Login/login.js',
//   output: {
//     file: 'dist/bundle7.js',
//     sourcemap: 'inline',
//     format: 'iife'
//   },
//   plugins: [
//     nodeResolve(),
//     commonjs() // Convierte los módulos CommonJS a ES6 para que Rollup los pueda procesar
//   ]
// };
import resolve from '@rollup/plugin-node-resolve';

// export default {
//   input: 'dist/bundle7.js', // Ruta a tu archivo pelis.js
//   output: {
//     file: 'dist/bundle8.js', // Ruta y nombre del archivo minificado
//     format: 'iife', // Formato del bundle (IIFE para navegador)
   
//   },
//   plugins: [
//     resolve(), // Permite resolver módulos desde node_modules
//     terser({
//       format: {
//         comments: false, // Elimina todos los comentarios
//       }
//     })
//   ]
// };



// export default {
//   input: "./src/cambiarName/name.js",
//   output: [
//     {
//       file: 'dist/name.js',
//       format: "cjs",
//     },
//     {
//       file: 'dist/name.js',
//       format: "iife",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
     
// };



// export default {
//   input: "src/cambiarName/name.js", // Ruta a tu archivo pelis.js
//   output: {
//     file: 'dist/name2.js', // Ruta y nombre del archivo minificado
//     format: 'iife', // Formato del bundle (IIFE para navegador)
   
//   },
//   plugins: [
//     resolve(), // Permite resolver módulos desde node_modules
//     terser({
//       format: {
//         comments: false, // Elimina todos los comentarios
//       }
//     })
//   ]
// };






// export default {
//   input: "src/cambiarName/name.js",
//   output: {
//     file: 'dist/name2.js',
//     format: 'iife',
//   },
//   plugins: [
//     resolve(),
//     commonjs({
//       namedExports: {
//         'node_modules/platform/platform.js': ['platform'] // especifica los exports aquí
//       }
//     }),
//     terser({
//       format: {
//         comments: false,
//       }
//     })
//   ]
// };



// export default {
//   input: "./src/pelis.js",
//   output: [
//     {
//       file: "./public/Pelis.js",
//       format: "cjs",
//     },
//     {
//       file: "./public/Pelis.js",
//       format: "iife",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
     
// };



// export default {
//   input: "./src/pelis.js",
//   output: [
//     {
//       file: "./public/Pelis.js",
//       format: "cjs",
//     },
//     {
//       file: "./public/Pelis.js",
//       format: "iife",
//       name: "version",
//       plugins: [terser()],
//     },
//   ],
     
// };


import commonjs from '@rollup/plugin-commonjs';
// export default {
//   input: "./src/pelis.js",
//   output: {
//     file: "./public/Pelis.js",
//     sourcemap: 'inline',
//     format: 'iife',
//     name: 'MyBundle'
//   },
//   plugins: [
//     nodeResolve(),
//     commonjs() // Añade el plugin commonjs
//   ]
// };




// import resolve from '@rollup/plugin-node-resolve';


// export default {

//   input: 'public/Pelis.js', // Ruta a tu archivo pelis.js
//   output: {
//     file: 'dist/pelis.min.js', // Ruta y nombre del archivo minificado
//      format: 'iife', // Formato del bundle (IIFE para navegador)
//      name: 'Pelis' // Nombre global para el bundle (opcional)
//   },
//    plugins: [
//      resolve(), // Permite resolver módulos desde node_modules
//     terser({
//        format: {
//          comments: false, // Elimina todos los comentarios
//        }
//     })
//    ]
//  };








 
// export default {
//   input: "./src/DatosCuenta/cuenta.js",
//   output: {
//     file: "./public/cuenta.js",
//     sourcemap: 'inline',
//     format: 'iife',
//     name: 'MyBundle'
//   },
//   plugins: [
//     nodeResolve(),
//     commonjs() // Añade el plugin commonjs
//   ]
// };




export default {
  input: "./src/detalepelis.js",
  output: {
    file: "./public/dettallepelis.js",
    format: 'iife',
    name: 'MyBundle',
    sourcemap: false // Desactiva la creación de sourcemaps
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser({
      format: {
        comments: false // Elimina los comentarios
      }
    })
  ]
}
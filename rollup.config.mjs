// rollup.config.mjs

import terser from "@rollup/plugin-terser";

export default {
  input: "./src/index.js",
  output: [
    {
      file: "./public/bundle.js",
      format: "cjs",
    },
    {
      file: "./public/bundle.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
    },
  ],
};

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

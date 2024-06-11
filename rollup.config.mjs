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

import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from '@rollup/plugin-json';
import scss from "rollup-plugin-scss";
import image from "@rollup/plugin-image";
import { terser } from 'rollup-plugin-terser';
import babel from "@rollup/plugin-babel";


export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
    globals: { 
      'lucide-react': 'lucideReact',
    },
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    json(),
    scss({ fileName: "assets/style.css" }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // Utilisez "production" pour le déploiement
    }),
    babel({
      presets: ["@babel/preset-react"],
      exclude: 'node_modules/**', // Exclure les fichiers dans node_modules
      babelHelpers: 'bundled',
    }),
    image(),
    commonjs(),
    terser(), // Minifier le code pour la production
  ],
};
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: 'named'
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: 'named'
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sizeSnapshot(),
    production && terser({
      format: {
        comments: false
      },
    })
  ],
};

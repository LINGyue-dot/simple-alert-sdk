import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "SimpleAlertSDK",
    globals: {
      axios: "axios", // 将 Axios 设置为全局变量
      "error-stack-parser": "ErrorStackParser",
    },
  },
  plugins: [
    commonjs(),
    typescript({ declaration: true, declarationDir: "dist" }),
    nodeResolve({
      browser: true,
    }),
    json(),
  ],
};

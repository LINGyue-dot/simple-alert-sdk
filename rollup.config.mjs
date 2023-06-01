import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "SimpleAlertSDK",
  },
  plugins: [
    commonjs(),
    typescript({ declaration: true, declarationDir: "dist" }),
    resolve({
      moduleDirectories: ["node_modules"],
    }),
  ],
  external: ["axios", "error-stack-parser"],
};

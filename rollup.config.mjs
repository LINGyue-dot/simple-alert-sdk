import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";
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
    externals({
      devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
    }),
  ],
  external: ["axios", "error-stack-parser"],
};

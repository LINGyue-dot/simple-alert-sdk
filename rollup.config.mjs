import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";
import path from 'path'
export default {
  input: "src/index.ts",
  output: {
    file:'dist/bundle.js',
    format: "umd",
    name:'SimpleAlertSDK'
  },
  plugins: [
    commonjs(),
    typescript({
      outDir: "dist",
      declaration: true,
      declarationDir: "dist",
    }),
    externals({
      devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
    }),
  ],
  external: ["axios", "error-stack-parser"],
};

import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";
import path from 'path'
export default {
  input: "src/index.ts",
  output: {
    dir: path.dirname("dist/bundle.js"),
    format: "es",
    exports: "named", // 指定导出模式（自动、默认、命名、无）
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
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

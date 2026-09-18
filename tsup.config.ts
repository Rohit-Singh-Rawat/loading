import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/*.ts", "src/*.tsx"],
  external: ["react", "react-dom"],
  format: ["esm"],
  splitting: true,
});

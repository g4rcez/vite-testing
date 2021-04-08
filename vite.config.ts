import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import reactRefresh from "@vitejs/plugin-react-refresh";
import commonjs from "@rollup/plugin-commonjs";

import fs from "fs";
import viteCompression from "vite-plugin-compression";

import usePluginImport from "vite-plugin-importer";

import { join } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [reactRefresh()],
    base: mode === "development" ? undefined : "/app/0.0.1/",
    json: {
      stringify: true,
    },
    build: {
      rollupOptions: {
        plugins: [commonjs(), resolve(), babel({ babelHelpers: "bundled" })],
        output: {
          assetFileNames: "assets/[name][extname]",
          entryFileNames: (a) =>
            a.name.endsWith(".js") ? a.name : "[name].js",
          chunkFileNames: (a) =>
            a.name.endsWith(".js") ? a.name : "[name].js",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const [, module] = /node_modules\/(@?[a-z0-9-]+?[a-z0-9-]+)/.exec(
                id
              );
              const path = join(
                process.cwd(),
                "node_modules",
                module,
                "package.json"
              );
              if (fs.existsSync(path)) {
                try {
                  const packageJson = require(path);
                  const version = packageJson.version;
                  console.log(module, version);
                  return `@vendor/${module}_${version}.js`;
                } catch (error) {}
              }
            }
          },
        },
      },
    },
  });

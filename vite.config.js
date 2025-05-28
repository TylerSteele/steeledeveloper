import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "assets",

  build: {
    outDir: "dist",
    assetsDir: "assets",

    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },

  assetsInclude: [
    "**/*.gif",
    "**/*.png",
    "**/*.svg",
    "**/*.woff",
    "**/*.woff2",
  ],
});

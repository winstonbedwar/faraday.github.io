import { defineConfig } from "vite";
import { resolve } from "path";

import fs from "fs";


function getHtmlEntries() {
  const inputs = {};

  function scanDir(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = resolve(dir, file);
      const stats = fs.statSync(fullPath);

      if (stats.isFile() && file.endsWith(".html")) {
        const name = file.replace(/\.html$/, "") + "/index.html"; 
        inputs[name] = fullPath;
      } else if (stats.isDirectory()) {
        scanDir(fullPath);
      }
    });
  }

  scanDir(__dirname);
  return inputs;
}
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: getHtmlEntries(),
    },
    assetsInclude: [
      "**/*.jpeg",
      "**/*.jpg",
      "**/*.png",
      "**/*.svg",
      "**/*.gif",
    ],
    copyPublicDir: true,
  },
});

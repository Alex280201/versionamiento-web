import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        informe: resolve(__dirname, 'informe.html'),
        investigacion: resolve(__dirname, 'investigacion.html'),
        presentacion: resolve(__dirname, 'presentacion.html'),
        recursos: resolve(__dirname, 'recursos.html'),
      },
    },
  },
});

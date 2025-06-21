// vite.config.js
import { defineConfig } from 'vite';
import astro from '@astrojs/astro/vite';

export default defineConfig({
  plugins: [astro()],
  json: {
    // Desactiva la conversión de JSON a módulos en todo el proyecto
    namedExports: false,
    stringify: false,
    // excluye todos los .json para que Vite no intente importarlos
    exclude: ['**/*.json'],
  },
});




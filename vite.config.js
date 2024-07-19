// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/playtronica-midi/', // This should be the name of your repository
  build: {
    outDir: 'dist',
  },
});


import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [react(), envCompatible()],
  base: './',
});

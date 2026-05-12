import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/healthcare-premium-demos/',
  plugins: [react()],
});

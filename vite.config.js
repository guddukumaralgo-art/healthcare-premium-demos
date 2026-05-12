import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/healthcare-premium-demos/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons':  ['lucide-react'],
        },
      },
    },
  },
});

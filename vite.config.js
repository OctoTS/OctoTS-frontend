import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': resolve('./node_modules/react'),
      'react-dom': resolve('./node_modules/react-dom'),
      'octots-frontend-lib': resolve('./node_modules/octots-frontend-lib')
    }
  },
  optimizeDeps: {
    exclude: ['octots-frontend-lib']
  },
  base: '/OctoTS-demo/'
});

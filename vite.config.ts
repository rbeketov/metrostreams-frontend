import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '0.0.0.0';
const base_path = isLocal ?  '/' : '/metrostreams-frontend/';


// https://vitejs.dev/config/
export default defineConfig({
  base: base_path,
  plugins: [react()],
  server: {
    port: 3000,
  },
})

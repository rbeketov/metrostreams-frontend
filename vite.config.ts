import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const base_path = isGitHubActions ? '/metrostreams-frontend/' : '/';

export default defineConfig({
  base: base_path,
  plugins: [react()],
  server: {
    port: 3000,
  },
});

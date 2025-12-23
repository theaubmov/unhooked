import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 1998,
    },
    define: {
      'import.meta.env.YOUTUBE_API_KEY': JSON.stringify(env.YOUTUBE_API_KEY),
      'import.meta.env.YOUTUBE_CLIENT_ID': JSON.stringify(env.YOUTUBE_CLIENT_ID),
      'import.meta.env.YOUTUBE_ACCESS_TOKEN': JSON.stringify(env.YOUTUBE_ACCESS_TOKEN),
    },
  };
});

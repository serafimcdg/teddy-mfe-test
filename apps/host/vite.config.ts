import { defineConfig,type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(() => {
  const REMOTE_DOCKER='http://clients:80/remoteEntry.js'; 
  const REMOTE_DEV = 'http://localhost:5174/remoteEntry.js';
  const REMOTE_PROD = 'https://teddy-mfe-test-clients.vercel.app/remoteEntry.js';

  const CLIENTS = REMOTE_PROD; 
  

  const mf = federation({
    name: 'host',
    remotes: {
      clients: { name: 'clients', type: 'module', entry: CLIENTS },
    },
    shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
  }) as unknown as PluginOption[] 
  return {
    server: { port: 5173, strictPort: true, cors: true },
    plugins: [react(), ...mf],
    build: { target: 'esnext' },
  }
})

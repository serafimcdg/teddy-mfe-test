import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'
  const CLIENTS = isProd
    ? 'http://localhost:8080/remoteEntry.js'
    : env.VITE_REMOTE_CLIENTS_URL || 'https://teddy-mfe-test-clients.vercel.app/remoteEntry.js'

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

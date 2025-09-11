import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const CLIENTS = env.VITE_REMOTE_CLIENTS_URL || 'http://localhost:5174/remoteEntry.js'
  const DS      = env.VITE_REMOTE_DESIGN_SYSTEM_URL || 'http://localhost:5175/remoteEntry.js'

  return {
    server: { port: 5173, strictPort: true, cors: true },
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          clients:       { name: 'clients',       type: 'module', entry: CLIENTS },
          design_system: { name: 'design_system', type: 'module', entry: DS },
        },
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      }),
    ],
    build: { target: 'esnext' },
  }
})

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const DS = env.VITE_REMOTE_DESIGN_SYSTEM_URL || 'http://localhost:5175/remoteEntry.js'

  return {
    server: { port: 5174, strictPort: true, cors: true },
    plugins: [
      react(),
      federation({
        name: 'clients',
        filename: 'remoteEntry.js',
        remotes: {
          design_system: { name: 'design_system', type: 'module', entry: DS }, 
        },
        exposes: {
          './CustomersRoot': './src/CustomersRoot.tsx',
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

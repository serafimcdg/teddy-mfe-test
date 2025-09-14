import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(() => {
  const mf = federation({
    name: 'clients',
    filename: 'remoteEntry.js',
    exposes: {
      './CustomersRoot': './src/CustomersRoot.tsx',
      './SelectedClients': './src/SelectedClients.tsx',
    },
    shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
  }) as unknown as PluginOption[]

  return {
    server: { port: 5174, strictPort: true, cors: true },
    plugins: [react(), ...mf],
    build: { target: 'esnext' },
  }
})

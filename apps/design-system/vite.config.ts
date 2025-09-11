import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: { port: 5175, strictPort: true, cors: true },
  plugins: [
    react(),
    federation({
      name: 'design_system',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
        './Card': './src/components/Card.tsx',
        './index': './src/index.ts',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  build: { target: 'esnext' },
})

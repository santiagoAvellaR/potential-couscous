import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    outDir: 'dist',
  },
  server: {
    fs: {
      strict: false,
    },
    port: Number(process.env.PORT) || 5173, // Usa el puerto del .env o 5173 por defecto
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
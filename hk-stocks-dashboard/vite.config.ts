import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/git-journey/hk-stocks-dashboard/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com'],
  },
})

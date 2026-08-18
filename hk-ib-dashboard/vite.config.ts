import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/git-journey/hk-ib-dashboard/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      'disclosure-angeles-period-perl.trycloudflare.com',
      'industries-fitted-clothing-papua.trycloudflare.com',
      '.trycloudflare.com'
    ]
  }
})

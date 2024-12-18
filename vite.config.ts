import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/SimpleLift/",
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000, // Optional: specify the port you want to use
    open: true, // Optional: open the browser automatically
  },
})

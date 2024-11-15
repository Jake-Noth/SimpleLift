import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Makes the server accessible on any network interface
    port: 3000, // You can specify any port number you prefer
  }
})

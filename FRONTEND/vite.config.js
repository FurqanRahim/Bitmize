

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),
      tailwindcss(),
  ],
  server: {
        
     // Don't try other ports if this one is taken
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      
      },
    },
  },
})



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Show chunk size warnings at 500kb
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunk splitting for demonstration
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        }
      }
    }
  }
})

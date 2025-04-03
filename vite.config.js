import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: 'monitor-chart',
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the static build can be hosted from any path.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsInlineLimit: 0 },
})

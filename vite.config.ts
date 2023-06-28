import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'app1/index': '/src/app1/index.html',
        'app2/index': '/src/app2/index.html',
        'app3/index': '/src/app3/index.html'
      }
    },
    sourcemap: true,
  }
})
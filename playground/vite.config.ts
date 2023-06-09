import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    https: false,
    proxy: {
      '/api': {
        target: 'https://tev-admin.qstcloud.net',
        secure: false,
        changeOrigin: true,
      },
    },
  },
})

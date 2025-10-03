import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true, // browser opens automatically
  },

  build: {
    rollupOptions: {
      input: {
        404: './html/404.html'
      }
    }
  }
})

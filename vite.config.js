import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true, // browser opens automatically
  },

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        404: './html/404.html',
        About: './html/about.html'
      }
    }
  }
})

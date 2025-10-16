import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true // browser opens automatically
  },

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        404: '404.html',
        About: './html/about.html',
        Campaigns: './html/campaigns.html',
        News: './html/news.html',
        Contact: './html/contact.html',
        Impact: './html/impact.html',
        queriesCss: './src/styles/queries.css'
      }
    }
  },

  plugins: [
    {
      name: 'dev-rewrite-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'GET') {
            const url = req.url.split('?')[0].split('#')[0]

            // if path doesn’t include a file extension and isn’t root, rewrite
            if (!url.includes('.') && url !== '/') {
              req.url = `/html${url}.html`
            }
          }
          next()
        })
      }
    }
  ]
})

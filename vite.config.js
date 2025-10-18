import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        '404': '404.html',
        About: './html/about.html',
        Campaigns: './html/campaigns.html',
        News: './html/news.html',
        Contact: './html/contact.html',
        Impact: './html/impact.html',
        'sign-in': './html/sign-in.html',
        'sign-up': './html/sign-up.html',
        'forgot-password': './html/forgot-password.html',
        queriesCss: './src/styles/queries.css'
      }
    }
  },
  plugins: [
    {
      name: 'dev-rewrite-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Only rewrite GET requests
          if (req.method === 'GET') {
            // remove query & hash
            let url = req.url.split('?')[0].split('#')[0]

            // Ignore requests for actual files or vite client
            if (!url.includes('.') && !url.startsWith('/@vite')) {
              // root path stays as is
              if (url === '/') url = '/index.html'
              else url = `/html${url}.html`
              req.url = url
            }
          }
          next()
        })
      }
    }
  ]
})

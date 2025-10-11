/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    './html/**/*.html',
  ],
  theme: {
    extend: {
      backgroundImage: {

        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {
        'header-color': '#111618',
        'brand-color': '#13a4ec',
        'btn-hover': ' #067fc3',
        'brand-dark-accent': '#092e48',
        'white-accent': '#f0f3f4',
        'border-b-color': '#eee'

      },
      fontFamily: {
        'heading': ['Montserrat', 'Arial', 'Verdana', 'sans-serif'],
        'body': ['Lato', 'Arial', 'Verdana', 'sans-serif'],
        'accent': ['Raleway', 'Arial', 'Verdana', 'sans-serif'],
      },
      fontSize: {
        h1: ['3.5rem', { lineHeight: '1.2' }],     // 56px
        h2: ['2.8rem', { lineHeight: '1.25' }],    // 45px
        h3: ['2.25rem', { lineHeight: '1.3' }],    // 36px
        h4: ['1.75rem', { lineHeight: '1.35' }],   // 28px
        h5: ['1.375rem', { lineHeight: '1.4' }],   // 22px
        h6: ['1.125rem', { lineHeight: '1.7' }],   // 18px
        lead: ['1.25rem', { lineHeight: '1.7' }], // 20px - Intro paragraphs
        body: ['1rem', { lineHeight: '1.7' }],     // 16px
        small: ['0.875rem', { lineHeight: '1.6' }], // 14px
        xs: ['0.75rem', { lineHeight: '1.5' }],    // 12px - Legal/fine print
      },
      spacing: {
        xxs: '0.25rem',  // 4px - Micro-adjustments
        xs: '0.5rem',    // 8px
        sm: '1rem',      // 16px
        md: '1.5rem',    // 24px
        lg: '2rem',      // 32px
        xl: '3rem',      // 48px
        xxl: '4rem',     // 64px
        section: '5rem'   // 80px
      },
      borderRadius: {
        none: '0',        // Square corners
        sm: '0.25rem',    // 4px
        md: '0.5rem',     // 8px
        lg: '0.75rem',    // 12px
        xl: '1rem',       // 16px
        xxl: '1.5rem',    // 24px - Large containers
        full: '9999px',   // Pill/circle
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          green: '#25D366',
          dark: '#128C7E',
          light: '#DCF8C6',
          bg: '#ECE5DD',
        },
        dalsat: {
          primary: '#128C7E',
          accent: '#25D366',
          dark: '#0B5E55',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

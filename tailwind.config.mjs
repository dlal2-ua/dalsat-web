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
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurTransition: {
          '0%': { opacity: '0', filter: 'blur(14px)', transform: 'scale(0.96) translateY(12px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'scale(1) translateY(0px)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'translateX(-130px) scale(0.92)' },
          '40%': { opacity: '0.35', filter: 'blur(8px)', transform: 'translateX(-45px) scale(0.96)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateX(0px) scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'translateX(130px) scale(0.92)' },
          '40%': { opacity: '0.35', filter: 'blur(8px)', transform: 'translateX(45px) scale(0.96)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateX(0px) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        blurTransition: 'blurTransition 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInLeft: 'slideInLeft 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInRight: 'slideInRight 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

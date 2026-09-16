/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Identidad DALSAT. Estos cinco colores son todo el sistema.
        // navy: base, cabeceras y fondos oscuros.
        navy: {
          DEFAULT: '#072847',
          800: '#0A3459',
          900: '#051E36',
          950: '#03131F',
        },
        // cian: acentos de marca, iconos y detalles. Nunca en botones de accion.
        cian: {
          DEFAULT: '#14CDEC',
          dark: '#0FA8C4',
          light: '#7FE4F5',
        },
        // terracota: EXCLUSIVO para conversion (CTAs y enlaces de accion
        // principal). Unico color calido del sistema. Si aparece en un icono
        // decorativo o en un fondo, es un error: hay que quitarlo de ahi.
        // Navegar entre paginas ("saber mas", "ver catalogo") no es conversion
        // y va en cian.
        terracota: {
          DEFAULT: '#D9642C',
          dark: '#B84E1C',
          light: '#E88A57',
        },
        // crema: fondo claro, sustituye al blanco puro.
        crema: '#F6F1E7',
        // grafito: texto de cuerpo sobre fondo claro.
        grafito: '#2B2924',
        // Verde WhatsApp: solo dentro de las maquetas de simulador, donde
        // representa la interfaz de WhatsApp. Nunca como color de la web.
        whatsapp: {
          green: '#25D366',
          dark: '#128C7E',
          incoming: '#005C4B',
          bg: '#ECE5DD',
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
          '0%': { opacity: '0', transform: 'translate3d(-35px, 0, 0) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translate3d(35px, 0, 0) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        blurTransition: 'blurTransition 0.4s ease-out forwards',
        slideInLeft: 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInRight: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

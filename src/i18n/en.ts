import type { Contenido } from './es';

// English content. Mirrors the shape of `es.ts`, which is the original: the
// `Contenido` type comes from there, so a missing key fails the build instead
// of silently rendering Spanish to an English visitor.
//
// The register is deliberately the same as the Spanish: plain, second person,
// no consultant-speak. "Pyme" has no real English equivalent, so it reads as
// "small business" rather than "SME", which nobody says out loud.

export const en: Contenido = {
  nav: {
    principal: 'Main menu',
    servicios: 'Services',
    demos: 'Demos',
    calculadora: 'Calculator',
    faq: 'FAQ',
    sobreNosotros: 'About us',
    contacto: 'Contact',
    panel: 'Log in to the panel',
    cta: 'Talk to us',
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
    cambiarIdioma: 'Change language',
  },

  comun: {
    volverArriba: 'Back to top',
    volverAlInicio: 'Back to home',
    escribirWhatsApp: 'Message us on WhatsApp',
    hablarWhatsApp: 'Shall we talk on WhatsApp?',
    verCatalogo: 'See the full catalogue',
    saberMas: 'Find out more',
    probarDemo: 'Try a demo',
  },

  cierreContacto: {
    home: {
      titulo: 'Start with whatever weighs on you most',
      texto:
        'Tell us how you work today. We will tell you what can be automated, what is not worth it, and how much time it saves you.',
      cta: 'Talk to us',
    },
    servicios: {
      titulo: 'Where would you start?',
      texto:
        'Tell us how you work today and we will tell you what can be taken off your hands. No strings attached.',
      cta: 'Talk to us',
    },
    demos: {
      titulo: 'And with your own business data?',
      texto:
        'We will set up a free trial with your services, your prices and the way you talk to customers.',
      cta: 'Ask for a trial with my data',
    },
    calculadora: {
      titulo: 'Do the numbers add up for you?',
      texto:
        'We look at your particular case and tell you what can be automated and what is not worth the trouble.',
      cta: 'Talk to us',
    },
  },

  clientes: {
    titulo: 'Businesses that no longer answer the same question twenty times a day',
    entradilla: 'Each with its own: bookings, enquiries and handovers to the team.',
  },

  cookies: {
    aviso: 'Cookie notice',
    texto:
      'One technical cookie to remember this answer and, if you let us, visit statistics. No advertising and no tracking across sites.',
    verPolitica: 'See the cookie policy',
    rechazar: 'Reject',
    aceptar: 'Accept',
  },

  barraMovil: {
    cta: 'Talk to us',
    whatsapp: 'Message us on WhatsApp',
  },

  servicios: {
    saas: {
      nombre: 'Custom software',
      titulo: 'The tool your business actually needs, built for you',
      texto:
        'No more fighting spreadsheets and off-the-shelf software where nothing quite fits. We build your tool: customers, appointments, quotes, stock, or whatever you handle by hand today.',
      puntos: ['Only what you use', 'Your team works from their phones', 'Grows with you'],
    },
    agentes: {
      nombre: 'AI agents',
      titulo: 'Agents that field enquiries for you, each one for its own job',
      texto:
        'An agent that knows your business and answers the way you would. On WhatsApp, on Instagram or inside your own site. It settles questions, takes bookings and calls in your team when a person is needed.',
      puntos: ['WhatsApp and Instagram', 'An agent inside your site', 'Enquiries and bookings'],
    },
    panel: {
      nombre: 'Your management panel',
      titulo: 'One place you run all of it from',
      texto:
        'The panel where you change what your chat and voice agents say, see and move bookings, read the conversations and look at your numbers. It acts as a CRM for everything that passes through the agent.',
      puntos: ['Agent, bookings and metrics', 'From your phone or your desk', 'Included with whatever you take on'],
    },
    procesos: {
      nombre: 'Process mapping and automation',
      titulo: 'First we understand how you work, then we automate it',
      texto:
        'We sit down with you and draw how your business really runs, step by step. That is where the weekly repetition becomes visible. That is what we take out of the way.',
      puntos: ['A map of your business', 'You see where time goes', 'Tasks that run themselves'],
    },
    seo: {
      nombre: 'SEO',
      titulo: 'Get found when people look for you',
      texto:
        'We work so your business shows up when someone nearby searches Google for what you offer. Your Google listing, content worth reading, and a site that loads fast.',
      puntos: ['Searches in your area', 'Google listing kept current', 'No tricks'],
    },
    web: {
      nombre: 'Web development',
      titulo: 'Sites that work, not brochures',
      texto:
        'A fast, clear site built so that whoever lands on it does something: book, write to you, or buy. And connected to the tools you already use.',
      puntos: ['Loads fast on mobile', 'Built to get you messages', 'Connected to your agent'],
    },
  },

  footer: {
    descripcion:
      'A digitalisation studio for small businesses across Spain. Custom software, AI agents, process automation, SEO and web development.',
    estado: 'Systems running right now',
    navegacion: 'Navigation',
    calculadoraAhorro: 'Savings calculator',
    servicios: 'Services',
    saas: 'Custom software',
    agentes: 'AI agents',
    panel: 'Management panel',
    procesos: 'Process mapping and automation',
    seoWeb: 'SEO and web development',
    contactoRapido: 'Quick contact',
    invitacion: 'Want to see a demo built around your business? Write to us directly.',
    instagram: 'DALSAT on Instagram (@dalsat.co)',
    legal: 'Legal information',
    avisoLegal: 'Legal notice and terms',
    privacidad: 'Privacy policy',
    cookies: 'Cookie policy',
    derechos: '© 2026 DALSAT. All rights reserved.',
    ambito: 'All of Spain',
  },
};

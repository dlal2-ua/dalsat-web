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

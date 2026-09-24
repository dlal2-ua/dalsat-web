// Pagina /seguridad (y /en/seguridad).
//
// Reglas de contenido:
// - Solo se afirma lo que se puede comprobar en el codigo de la plataforma
//   (cada bloque lleva encima el comentario de donde se comprueba).
// - Nada de "100% seguro", certificaciones ni promesas sobre donde estan los
//   servidores: la politica de privacidad ya lista los proveedores y las
//   transferencias fuera de la UE, y esta pagina no la contradice. Tampoco se
//   detallan limites ni cabeceras concretas: describir como se defiende algo
//   no debe servir de mapa a quien lo ataca.
import type { Idioma } from '../i18n/config';

export interface BloqueSeguridad {
  titulo: string;
  texto: string;
}

export interface TextoSeguridad {
  seoTitulo: string;
  seoDescripcion: string;
  etiqueta: string;
  h1: string;
  intro: string;
  bloques: BloqueSeguridad[];
  limitesTitulo: string;
  limites: string[];
  privacidadTexto: string;
  privacidadEnlace: string;
  cta: { titulo: string; texto: string; cta: string };
}

export const SEGURIDAD: Record<Idioma, TextoSeguridad> = {
  es: {
    seoTitulo: 'Seguridad de tus datos y de tu asistente de WhatsApp | DALSAT',
    seoDescripcion:
      'Cómo protegemos la información de tu negocio y de tus clientes: cada negocio aislado, contraseñas protegidas, control sobre lo que dice el asistente y accesos registrados.',
    etiqueta: 'Seguridad',
    h1: 'Tus clientes te confían sus datos. Nosotros los tratamos con cuidado.',
    intro:
      'Un asistente que habla con tus clientes tiene que ser de fiar. Esto es lo que hacemos para proteger la información de tu negocio, explicado sin tecnicismos.',
    bloques: [
      {
        // Aislamiento: cada consulta del portal se limita al negocio de la sesion
        // (routers/portal.py); historial e indice de cada negocio son propios.
        titulo: 'Cada negocio, por separado',
        texto:
          'La información de cada negocio va aparte: sus conversaciones, sus documentos y su configuración. Cuando entras a tu panel solo ves lo tuyo, y el asistente solo usa lo que tú le has dado.',
      },
      {
        // Contrasenas con scrypt (services/client_auth.py) y bloqueo de intentos.
        titulo: 'Contraseñas protegidas',
        texto:
          'Tu contraseña no se guarda tal cual: se guarda de forma que ni nosotros podemos leerla. Si alguien intenta adivinarla, el acceso se bloquea temporalmente.',
      },
      {
        // Credenciales de terceros con AES-256-GCM (services/crypto.py).
        titulo: 'Accesos de terceros, cifrados',
        texto:
          'Si conectas algo tuyo, como un correo, sus credenciales se guardan cifradas, no en claro.',
      },
      {
        // Prompt guard (services/prompt_guard.py) y herramientas de dueno solo
        // para el dueno (agents/conversation.py).
        titulo: 'Un asistente difícil de manipular',
        texto:
          'Lo que escribe un cliente o lo que contiene un documento se trata como información, no como órdenes. Y las funciones de gestión del negocio solo las puede usar el dueño, nunca un cliente que escribe por WhatsApp o por la web.',
      },
      {
        // Limites de uso (services/rate_limiter). Las alertas por email de
        // intentos sospechosos (SEC-06) NO se mencionan hasta que el bloque A
        // este en Produccion.
        titulo: 'Protección frente a abusos',
        texto:
          'Hay límites de uso para que nadie pueda saturar el asistente con mensajes repetidos.',
      },
      {
        // Impersonacion auditada: evento admin.impersonate (routers/admin.py).
        titulo: 'Los accesos de soporte quedan registrados',
        texto:
          'Cuando alguien de nuestro equipo entra en el panel de un negocio para ayudarle, queda anotado quién, cuándo y a qué negocio.',
      },
      {
        // Pausa, traspaso a persona, conversaciones visibles y reservas por enlace.
        titulo: 'Tú mandas',
        texto:
          'Puedes pausar el asistente cuando quieras, ver cada conversación y recibir el aviso cuando un cliente necesita a una persona. Las reservas las hace el propio cliente en tu enlace: el asistente no reserva ni cancela por su cuenta.',
      },
    ],
    limitesTitulo: 'Lo que tenemos claro',
    limites: [
      'Ningún sistema es infalible. Por eso limitamos qué puede hacer el asistente y no guardamos los mensajes para siempre.',
      'Trabajamos con proveedores tecnológicos para que el servicio funcione; en la política de privacidad tienes cuáles son y para qué se usan.',
    ],
    privacidadTexto: 'Todo el detalle sobre tus datos está en nuestra',
    privacidadEnlace: 'política de privacidad',
    cta: {
      titulo: '¿Tienes dudas sobre tus datos?',
      texto: 'Pregúntanos lo que quieras antes de empezar. Te lo explicamos con palabras sencillas.',
      cta: 'Habla con nosotros',
    },
  },
  en: {
    seoTitulo: 'Security of your data and your WhatsApp assistant | DALSAT',
    seoDescripcion:
      'How we protect your business and customer information: every business kept separate, protected passwords, control over what the assistant says and logged support access.',
    etiqueta: 'Security',
    h1: 'Your customers trust you with their data. We handle it with care.',
    intro:
      'An assistant that talks to your customers has to be trustworthy. This is what we do to protect your business information, explained without jargon.',
    bloques: [
      {
        titulo: 'Every business kept separate',
        texto:
          'Each business has its own conversations, documents and settings. When you sign in to your panel you only see your own data, and the assistant only uses what you have given it.',
      },
      {
        titulo: 'Protected passwords',
        texto:
          'Your password is not stored as you typed it: it is stored in a way that not even we can read it. If someone tries to guess it, access is temporarily blocked.',
      },
      {
        titulo: 'Third-party access, encrypted',
        texto:
          'If you connect something of yours, such as an email account, its credentials are stored encrypted, not in plain text.',
      },
      {
        titulo: 'An assistant that is hard to manipulate',
        texto:
          'What a customer writes, or what a document contains, is treated as information, not as orders. And the business-management functions can only be used by the owner, never by a customer writing over WhatsApp or the web.',
      },
      {
        titulo: 'Protection against abuse',
        texto:
          'There are usage limits so nobody can flood the assistant with repeated messages.',
      },
      {
        titulo: 'Support access is logged',
        texto:
          'When someone on our team enters a business panel to help, it is recorded who did it, when and for which business.',
      },
      {
        titulo: 'You are in charge',
        texto:
          'You can pause the assistant whenever you want, see every conversation and get notified when a customer needs a person. Bookings are made by the customer on your link: the assistant does not book or cancel on its own.',
      },
    ],
    limitesTitulo: 'What we are clear about',
    limites: [
      'No system is infallible. That is why we limit what the assistant can do and do not keep messages forever.',
      'We work with technology providers to run the service; our privacy policy lists which ones and what they are used for.',
    ],
    privacidadTexto: 'Full details about your data are in our',
    privacidadEnlace: 'privacy policy',
    cta: {
      titulo: 'Questions about your data?',
      texto: 'Ask us anything before you start. We will explain it in plain words.',
      cta: 'Talk to us',
    },
  },
};

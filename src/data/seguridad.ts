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
      'Lo que hacemos para proteger la información de tu negocio, sin tecnicismos.',
    bloques: [
      {
        // Aislamiento: cada consulta del portal se limita al negocio de la sesion
        // (routers/portal.py); historial e indice de cada negocio son propios.
        titulo: 'Cada negocio, por separado',
        texto:
          'Conversaciones, documentos y configuración van aparte. En tu panel solo ves lo tuyo.',
      },
      {
        // Contrasenas con scrypt (services/client_auth.py) y bloqueo de intentos.
        titulo: 'Contraseñas protegidas',
        texto:
          'Ni nosotros podemos leerla. Si alguien intenta adivinarla, el acceso se bloquea un rato.',
      },
      {
        // Credenciales de terceros con AES-256-GCM (services/crypto.py).
        titulo: 'Accesos de terceros, cifrados',
        texto:
          'Si conectas tu correo, sus credenciales se guardan cifradas.',
      },
      {
        // Prompt guard (services/prompt_guard.py) y herramientas de dueno solo
        // para el dueno (agents/conversation.py).
        titulo: 'Un asistente difícil de manipular',
        texto:
          'Lo que escribe un cliente se trata como información, no como órdenes. Las funciones de gestión solo las usa el dueño.',
      },
      {
        // Limites de uso (services/rate_limiter). Las alertas por email de
        // intentos sospechosos (SEC-06) NO se mencionan hasta que el bloque A
        // este en Produccion.
        titulo: 'Protección frente a abusos',
        texto:
          'Hay límites de uso para que nadie sature el asistente.',
      },
      {
        // Impersonacion auditada: evento admin.impersonate (routers/admin.py).
        titulo: 'Los accesos de soporte quedan registrados',
        texto:
          'Si alguien de nuestro equipo entra en tu panel para ayudarte, queda anotado.',
      },
      {
        // Pausa, traspaso a persona, conversaciones visibles y reservas por enlace.
        titulo: 'Tú mandas',
        texto:
          'Pausas el asistente cuando quieras, ves cada conversación y te avisa si un cliente necesita a una persona. No reserva ni cancela por su cuenta.',
      },
    ],
    limitesTitulo: 'Lo que tenemos claro',
    limites: [
      'Ningún sistema es infalible: por eso limitamos lo que puede hacer el asistente.',
      'Usamos proveedores tecnológicos; en la política de privacidad tienes cuáles.',
    ],
    privacidadTexto: 'Más detalle en nuestra',
    privacidadEnlace: 'política de privacidad',
    cta: {
      titulo: '¿Tienes dudas sobre tus datos?',
      texto: 'Pregúntanos antes de empezar.',
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
      'What we do to protect your business information, without jargon.',
    bloques: [
      {
        titulo: 'Every business kept separate',
        texto:
          'Conversations, documents and settings are kept apart. In your panel you only see your own.',
      },
      {
        titulo: 'Protected passwords',
        texto:
          'Not even we can read it. If someone tries to guess it, access is blocked for a while.',
      },
      {
        titulo: 'Third-party access, encrypted',
        texto:
          'If you connect your email, its credentials are stored encrypted.',
      },
      {
        titulo: 'An assistant that is hard to manipulate',
        texto:
          'What a customer writes is treated as information, not as orders. Management functions are only for the owner.',
      },
      {
        titulo: 'Protection against abuse',
        texto:
          'Usage limits stop anyone from flooding the assistant.',
      },
      {
        titulo: 'Support access is logged',
        texto:
          'If someone on our team enters your panel to help, it is logged.',
      },
      {
        titulo: 'You are in charge',
        texto:
          'Pause the assistant whenever you want, see every conversation and get notified when a customer needs a person. It does not book or cancel on its own.',
      },
    ],
    limitesTitulo: 'What we are clear about',
    limites: [
      'No system is infallible: that is why we limit what the assistant can do.',
      'We use technology providers; our privacy policy lists which ones.',
    ],
    privacidadTexto: 'More detail in our',
    privacidadEnlace: 'privacy policy',
    cta: {
      titulo: 'Questions about your data?',
      texto: 'Ask us before you start.',
      cta: 'Talk to us',
    },
  },
};

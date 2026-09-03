// Contenido en castellano. Es el original: `en.ts` copia esta forma.
//
// Vive aqui y no dentro de cada componente para que las dos versiones no se
// separen. Si aqui aparece una clave, en `en.ts` tiene que existir tambien:
// el tipo `Contenido` sale de este fichero, asi que a `en.ts` le falta una y
// TypeScript lo canta al compilar.

export const es = {
  nav: {
    principal: 'Menú principal',
    servicios: 'Servicios',
    demos: 'Demos',
    calculadora: 'Calculadora',
    faq: 'Preguntas Frecuentes',
    sobreNosotros: 'Sobre Nosotros',
    contacto: 'Contacto',
    panel: 'Entrar al panel',
    cta: 'Hablar con nosotros',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    cambiarIdioma: 'Cambiar idioma',
  },

  comun: {
    volverArriba: 'Volver arriba',
    volverAlInicio: 'Volver al inicio',
    escribirWhatsApp: 'Escríbenos por WhatsApp',
    hablarWhatsApp: '¿Hablamos por WhatsApp?',
    verCatalogo: 'Ver el catálogo completo',
    saberMas: 'Saber más',
    probarDemo: 'Probar una demo',
  },

  cierreContacto: {
    home: {
      titulo: 'Empieza por lo que más te pese',
      texto:
        'Cuéntanos cómo trabajas hoy. Te decimos qué se puede automatizar, qué no merece la pena y cuánto tiempo te ahorra.',
      cta: 'Hablar con nosotros',
    },
    servicios: {
      titulo: '¿Por dónde empezarías tú?',
      texto:
        'Cuéntanos cómo trabajas hoy y te decimos qué se puede quitar de en medio. Sin compromiso.',
      cta: 'Habla con nosotros',
    },
    demos: {
      titulo: '¿Y con los datos de tu negocio?',
      texto:
        'Te preparamos una prueba gratis con tus servicios, tus precios y tu forma de hablar.',
      cta: 'Pedir una prueba con mis datos',
    },
    calculadora: {
      titulo: '¿Te cuadran los números?',
      texto:
        'Miramos tu caso concreto y te decimos qué se puede automatizar y qué no merece la pena.',
      cta: 'Habla con nosotros',
    },
  },

  clientes: {
    // Titular de la seccion, en voz de DALSAT. No es una cita de nadie: las
    // frases atribuidas a cada cliente van en el campo `frase` de
    // SatisfiedClients y solo se rellenan con sus palabras y su permiso.
    titulo: 'Negocios que ya no responden lo mismo veinte veces al día',
    entradilla: 'Cada uno con lo suyo: reservas, consultas y avisos al equipo.',
  },

  cookies: {
    aviso: 'Aviso de cookies',
    texto:
      'Una cookie técnica para recordar esta respuesta y, si nos dejas, estadísticas de visitas. Ni publicidad ni seguimiento entre webs.',
    verPolitica: 'Ver la política de cookies',
    rechazar: 'Rechazar',
    aceptar: 'Aceptar',
  },

  barraMovil: {
    cta: 'Hablar con nosotros',
    whatsapp: 'Escribirnos por WhatsApp',
  },

  servicios: {
    saas: {
      nombre: 'SaaS a medida',
      titulo: 'El programa que tu negocio necesita, hecho para ti',
      texto:
        'Dejas de pelearte con hojas de cálculo y con programas genéricos donde nada encaja. Construimos tu herramienta: clientes, citas, presupuestos, stock o lo que hoy llevas a mano.',
      puntos: ['Solo lo que usas', 'Tu equipo entra desde el móvil', 'Crece contigo'],
    },
    agentes: {
      nombre: 'Agentes de IA',
      titulo: 'Agentes que atienden por ti, cada uno para lo suyo',
      texto:
        'Un agente que conoce tu negocio y responde como responderías tú. Por WhatsApp, por Instagram o dentro de tu propia web. Resuelve dudas, coge reservas y avisa a tu equipo cuando hace falta una persona.',
      puntos: ['WhatsApp e Instagram', 'Agente dentro de tu web', 'Atención y reservas'],
    },
    panel: {
      nombre: 'Tu panel de gestión',
      titulo: 'Un sitio desde el que lo llevas todo',
      texto:
        'El panel donde cambias lo que responde tu agente de chat y el de voz, ves y mueves las reservas, lees las conversaciones y miras los números de tu negocio. Hace de CRM para todo lo que pasa por el agente.',
      puntos: ['Agente, reservas y métricas', 'Desde el móvil o el ordenador', 'Entra con lo que contrates'],
    },
    procesos: {
      nombre: 'Mapeo y automatización',
      titulo: 'Primero entendemos cómo trabajas, después lo automatizamos',
      texto:
        'Nos sentamos contigo y dibujamos cómo funciona tu negocio de verdad, paso a paso. Ahí se ve solo lo que se repite cada semana. Eso es lo que quitamos de en medio.',
      puntos: ['Mapa de tu negocio', 'Se ve dónde se pierde el tiempo', 'Tareas que se hacen solas'],
    },
    seo: {
      nombre: 'SEO',
      titulo: 'Que te encuentren cuando te buscan',
      texto:
        'Trabajamos para que tu negocio aparezca cuando alguien de tu zona busca en Google lo que tú ofreces. Ficha de Google, contenido útil y una web que carga rápido.',
      puntos: ['Búsquedas de tu zona', 'Ficha de Google al día', 'Sin trucos raros'],
    },
    web: {
      nombre: 'Desarrollo web',
      titulo: 'Webs que trabajan, no folletos',
      texto:
        'Una web rápida y clara, pensada para que quien entre haga algo: pedir cita, escribirte o comprar. Y conectada con las herramientas que ya usas.',
      puntos: ['Carga rápido en el móvil', 'Pensada para que te escriban', 'Conectada a tu agente'],
    },
  },

  footer: {
    descripcion:
      'Estudio de digitalización para pymes de toda España. Programas a medida, agentes de IA, automatización de procesos, SEO y desarrollo web.',
    estado: 'Sistemas funcionando ahora mismo',
    navegacion: 'Navegación',
    calculadoraAhorro: 'Calculadora Ahorro',
    servicios: 'Servicios',
    saas: 'SaaS a medida',
    agentes: 'Agentes de IA',
    panel: 'Panel de gestión',
    procesos: 'Mapeo y automatización',
    seoWeb: 'SEO y desarrollo web',
    contactoRapido: 'Contacto Rápido',
    invitacion: '¿Quieres ver una demo personalizada para tu negocio? Escríbenos directamente.',
    instagram: 'DALSAT en Instagram (@dalsat.co)',
    legal: 'Información legal',
    avisoLegal: 'Aviso legal y condiciones',
    privacidad: 'Política de privacidad',
    cookies: 'Política de cookies',
    derechos: '© 2026 DALSAT. Todos los derechos reservados.',
    ambito: 'Toda España',
  },
};

// Sin `as const` a proposito. Con el, cada cadena seria su propio tipo literal
// ('Servicios' en vez de string) y en.ts no podria escribir otra cosa.
export type Contenido = typeof es;

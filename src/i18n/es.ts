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

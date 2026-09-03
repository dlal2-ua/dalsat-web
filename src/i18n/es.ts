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
    etiqueta: 'Clientes',
    titulo: 'Nuestros clientes',
    entradilla: 'Negocios de toda España que ya tienen parte de su trabajo automatizado.',
    // Linea nuestra, no una cita: dice por que repiten sin poner palabras en
    // boca de nadie. Las frases atribuidas a cada cliente van en el campo
    // `frase` de SatisfiedClients y solo con sus palabras y su permiso.
    porQue: 'Siguen con nosotros porque dejaron de responder lo mismo veinte veces al día.',
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

  sobreNosotros: {
    etiqueta: 'Quiénes Somos',
    titulo: 'Ingenieros enfocados en tu rentabilidad',
    entradilla: 'Implantamos IA sólida para que dejes de perder tiempo en tareas repetitivas.',
    pilares: {
      real: {
        titulo: 'Tecnología real, no demos',
        texto:
          'Todo lo que montamos está funcionando en un negocio real, cada día. Se adapta a tu información, no a un ejemplo genérico.',
        badge: 'Funcionando cada día',
      },
      trato: {
        titulo: 'Hablas con quien lo ha montado',
        texto:
          'Sin tickets ni centralitas. Escribes por WhatsApp a las personas que han construido tu sistema.',
        enlace: 'Escribir por WhatsApp',
      },
      datos: {
        titulo: 'Tus datos, en tu propio servidor',
        texto:
          'Todo se instala en tu servidor. Tus datos y tus conversaciones no salen de ahí ni se comparten con nadie.',
      },
      mejora: {
        titulo: 'Lo revisamos y lo mejoramos',
        texto:
          'Cada semana miramos cómo va con casos reales y lo ajustamos. No se queda como el primer día.',
        badge: 'Revisión semanal',
      },
    },
    cifras: {
      sistemas: 'Sistemas funcionando en negocios reales',
      mensajes: 'Mensajes gestionados',
      tiempo: 'Tiempo que están funcionando',
    },
  },

  calculadora: {
    mensajesDia: 'Mensajes y llamadas al día',
    valorHora: 'Lo que vale una hora de tu equipo',
    horasMes: 'horas/mes',
    porAno: '/año',
    cta: 'Ver qué se puede automatizar',
    porDia: '/día',
    horasLibres: 'Horas Libres Recuperadas',
    ahorroMes: 'Ahorro Estimado al Mes',
    ahorroAno: 'Ahorro Proyectado al Año',
    nota:
      'La cuenta sale de 2,8 minutos por mensaje o llamada atendidos a mano, y de que el agente resuelve solo la mayor parte. Es una estimación para hacerte una idea, no una promesa: lo que ahorre tu negocio se ve mirando tu caso.',
  },

  formulario: {
    nombre: 'Nombre',
    nombrePista: 'Tu nombre o empresa',
    email: 'Email',
    emailPista: 'tu@email.com',
    negocio: 'Tipo de negocio',
    negocioPista: 'Gimnasio, clínica, autoescuela…',
    mensaje: 'Mensaje',
    mensajePista: 'Cuéntanos sobre tu negocio o qué te gustaría automatizar',
    opcional: '(opcional)',
    enviar: 'Empezar ahora',
    enviando: 'Enviando…',
    enviandoAviso: 'Enviando el formulario',
    errores: {
      nombre: 'Dinos cómo te llamas o cómo se llama tu negocio.',
      emailFalta: 'Necesitamos un correo para contestarte.',
      emailMal: 'Ese correo no parece bien escrito. Revísalo.',
      mensajeCorto: 'Cuéntanos un poco más, con dos palabras no sabemos por dónde empezar.',
      nombreLargo: 'Ese nombre es demasiado largo.',
      emailLargo: 'Ese correo es demasiado largo.',
      mensajeLargo: 'El mensaje no puede pasar de {max} caracteres.',
    },
    falloTitulo: 'No hemos podido enviarlo',
    falloTextoAntes: 'Puede ser cosa de la conexión. Vuelve a darle al botón, o escríbenos a',
    falloTextoO: 'o',
    falloWhatsApp: 'por WhatsApp',
  },

  pasos: {
    etiqueta: 'Cómo trabajamos',
    titulo: 'En 3 pasos, sin liarte',
    entradilla: 'De la primera reunión a tenerlo funcionando. Sin sorpresas por el camino.',
    lista: [
      {
        titulo: 'Miramos cómo trabajas',
        texto:
          'Nos cuentas tu día a día y dibujamos tu negocio paso a paso. Ahí se ve solo lo que se repite cada semana.',
        etiqueta: 'Una reunión de 30 minutos',
      },
      {
        titulo: 'Lo construimos',
        texto:
          'Montamos lo que haga falta: tu programa a medida, tu agente, la automatización o la web. Conectado con lo que ya usas.',
        etiqueta: 'Días, no meses',
      },
      {
        titulo: 'Lo ponemos en marcha',
        texto:
          'Entra en funcionamiento y lo vamos ajustando con lo que pasa de verdad cada semana. No te dejamos solo con ello.',
        etiqueta: 'Seguimos encima',
      },
    ],
  },

  plataforma: {
    etiqueta: 'Tu panel',
    titulo: 'No te dejamos con una caja negra',
    texto:
      'Todo lo que montamos se gestiona desde un mismo sitio, con tu usuario y tu contraseña. Entras desde el móvil o desde el ordenador y ves qué está pasando en tu negocio sin llamar a nadie.',
    pieCaptura: 'Lo primero que ves al entrar. Los datos son de una cuenta de pruebas.',
    altCaptura:
      'Pantalla de inicio del panel de DALSAT: reservas de la semana, facturación estimada, clientes únicos, mensajes atendidos por el agente y tiempo medio de respuesta.',
    incluido: 'El panel entra con lo que contrates. No se paga aparte ni hay que instalar nada.',
    entrar: 'Ya soy cliente, entrar al panel',
    capacidades: {
      chat: {
        titulo: 'Tu agente de chat',
        texto:
          'Cambias lo que responde, sus precios y sus horarios cuando quieras. Y lees las conversaciones que ha tenido.',
      },
      voz: {
        titulo: 'Tu agente de voz',
        texto:
          'El que coge el teléfono. Eliges su voz, qué puede decir y cuándo tiene que pasarte la llamada a ti.',
      },
      reservas: {
        titulo: 'Las reservas',
        texto:
          'Todas las citas que ha cogido el agente, en un calendario. Puedes moverlas, cancelarlas o meter una a mano.',
      },
      metricas: {
        titulo: 'Los números de tu negocio',
        texto:
          'Cuánto se ha respondido solo, a qué horas te escriben más y cuántas horas te has ahorrado esta semana.',
      },
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

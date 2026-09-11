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
    faq: 'Preguntas frecuentes',
    sobreNosotros: 'Sobre nosotros',
    contacto: 'Contacto',
    panel: 'Entrar al CRM',
    cta: 'Hablar con nosotros',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    cambiarIdioma: 'Cambiar idioma',
  },

  comun: {
    volverArriba: 'Volver arriba',
    saltarContenido: 'Saltar al contenido',
    volverAlInicio: 'Volver al inicio',
    escribirWhatsApp: 'Escríbenos por WhatsApp',
    avisoChat: 'Hola, soy el asistente virtual de DALSAT. Si tienes cualquier duda, pulsa sobre mí y te atiendo al momento.',
    cerrarAviso: 'Cerrar aviso',
    mensajeWhatsApp: 'Hola, me interesa lo que hacéis y me gustaría recibir más información.',
    hablarWhatsApp: '¿Hablamos por WhatsApp?',
    verCatalogo: 'Ver el catálogo completo',
    saberMas: 'Saber más',
    probarDemo: 'Probar una demo',
    verVideo: 'Ver cómo funciona',
    videoPendiente: 'Vídeo en camino',
  },

  // Lo que dice la mascota de soporte.
  // - `paginas`: al llegar a cada página (ruta sin /en ni barra final).
  // - `secciones`: al llegar a cada sección; la clave es su
  //   `data-mascot-perch` o, si no tiene, su id.
  // Las de `conCta` llevan debajo el botón a /contacto.
  mascota: {
    etiqueta: 'Asistente DALSAT',
    paginas: {
      '/servicios': 'Seis servicios pensados para que tu negocio haga menos cosas a mano. Si no sabes por dónde empezar, pregúntame.',
      '/demos': 'Aquí vamos publicando un vídeo por servicio y ves cómo contestan agentes como yo. Spoiler: el que estás viendo ahora mismo también es uno.',
      '/calculadora': '¿Cuánto tiempo pierde tu equipo contestando siempre lo mismo? Baja y compruébalo con tus propios números.',
      '/faq': '¿No encuentras tu pregunta? Pulsa sobre mí y te la respondo al momento.',
      '/sobre-nosotros': 'Aquí te contamos quién hay detrás de DALSAT y cómo trabajamos.',
      '/contacto': 'Si prefieres una respuesta inmediata, pulsa sobre mí y lo resolvemos ahora.',
      '/gracias': 'Mensaje recibido. Mientras te respondemos, puedo resolver cualquier duda: pulsa sobre mí.',
      '/aviso-legal': 'Si algo de este texto no queda claro, pulsa sobre mí y te lo explico con palabras sencillas.',
      '/cookies': 'Si algo de este texto no queda claro, pulsa sobre mí y te lo explico con palabras sencillas.',
      '/politica-privacidad': 'Si algo de este texto no queda claro, pulsa sobre mí y te lo explico con palabras sencillas.',
    } as Record<string, string>,
    secciones: {
      're-digitalizacion': 'Aquí explicamos qué cambia cuando los procesos de tu negocio pasan a funcionar solos.',
      servicios: '¿No tienes claro qué servicio encaja con tu negocio? Te orientamos sin compromiso.',
      clientes: 'Estas empresas ya trabajan con nosotros. Debajo de cada logo, lo que nos cuentan.',
      pruebalo: 'Aquí ves cómo contesta un agente. Si te encaja, te montamos uno con tus datos y lo pruebas gratis.',
      catalogo: 'Cada tarjeta es un servicio. Si dudas entre dos, pulsa sobre mí y te digo cuál encaja mejor con tu caso.',
      calculadora:
        'Mueve los dos controles con tus datos: mensajes al día y lo que vale una hora de tu equipo. Justo debajo verás las horas y el dinero que recuperarías.',
      'demos-video': 'Elige un servicio y mira en qué consiste. Los vídeos van saliendo uno a uno.',
      combinables: 'Si no sabes qué combinación te encaja, pregúntame y lo vemos con tu caso.',
      'demos-sector': 'Elige tu sector y mira cómo contesta el agente a un cliente. Si quieres uno así, te lo montamos con tus datos.',
      'demos-voz': 'Dale al play y escucha cómo atiende una llamada un agente de voz.',
      'quienes-somos': 'Y ya que estás por aquí: ¿te gustaría tener un asistente como yo en tu web?',
      cierre: '¿Te gustaría tener un asistente como yo en tu web? Es justo lo que hacemos.',
      'no-encontrada': 'Esta página no existe, pero yo sí. Pulsa sobre mí y te ayudo a encontrar lo que buscabas.',
    } as Record<string, string>,
    conCta: ['servicios', 'quienes-somos', 'cierre'],
    cta: 'Hablar con nosotros',
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
      cta: 'Hablar con nosotros',
    },
    demos: {
      titulo: '¿Y con los datos de tu negocio?',
      texto:
        'Te montamos una demo con tus servicios, tus precios y tu forma de hablar, y la pruebas gratis antes de pagar nada.',
      cta: 'Pedir mi demo gratis',
    },
    calculadora: {
      titulo: '¿Te cuadran los números?',
      texto:
        'Miramos tu caso concreto y te decimos qué se puede automatizar y qué no merece la pena.',
      cta: 'Hablar con nosotros',
    },
  },

  clientes: {
    etiqueta: 'Clientes',
    titulo: 'Nuestros clientes',
    entradilla: 'Negocios de toda España que ya tienen parte de su trabajo automatizado.',
    // Las citas son literales de cada cliente y no se traducen: se citan como
    // se dijeron. En ingles se añade debajo la traduccion, marcada como tal.
    etiquetaTraduccion: '',
    traducciones: {} as Record<string, string>,
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
    whatsapp: 'Escríbenos por WhatsApp',
  },

  servicios: {
    saas: {
      nombre: 'Software a medida',
      titulo: 'El programa que tu negocio necesita, hecho para ti',
      texto:
        'Dejas de pelearte con hojas de cálculo y con programas genéricos donde nada encaja. Construimos tu herramienta: clientes, citas, presupuestos, stock o lo que hoy llevas a mano.',
      puntos: ['Solo lo que usas', 'Tu equipo entra desde el móvil', 'Crece contigo'],
    },
    agentes: {
      nombre: 'Agentes de IA',
      titulo: 'Agentes que atienden por ti, cada uno para lo suyo',
      texto:
        'Un agente que conoce tu negocio y responde como responderías tú. Por WhatsApp, por Instagram, dentro de tu propia web o al teléfono, y en el idioma de tu cliente. Resuelve dudas, coge reservas y avisa a tu equipo cuando hace falta una persona.',
      puntos: ['WhatsApp, Instagram y web', 'Llamadas con agente de voz', 'Atención y reservas'],
    },
    panel: {
      nombre: 'CRM con IA',
      titulo: 'Tu CRM: clientes, reservas y agentes en un mismo sitio',
      texto:
        'La plataforma desde la que llevas lo que pasa con tus clientes: lees cada conversación, ves y mueves las reservas, cambias lo que responden tus agentes de chat y de voz y miras los números de tu negocio. Un CRM para pymes con la IA ya dentro.',
      puntos: ['Conversaciones, reservas y métricas', 'Desde el móvil o el ordenador', 'Entra con lo que contrates'],
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
    etiqueta: 'Quiénes somos',
    titulo: 'Montamos lo que te quita trabajo y lo dejamos funcionando',
    entradilla: 'Somos un estudio pequeño: hablas con quien lo construye y lo revisa cada semana.',
    pilares: {
      real: {
        titulo: 'Funciona en negocios reales',
        texto:
          'Todo lo que montamos está funcionando en un negocio real, cada día. Se adapta a tu información, no a un ejemplo genérico.',
        badge: 'Funcionando cada día',
      },
      trato: {
        titulo: 'Hablas con quien lo ha montado',
        texto:
          'Sin tickets ni centralitas. Escribes por WhatsApp a las personas que han construido tu sistema.',
        enlace: 'Escribir por WhatsApp',
        badge: 'Trato directo',
      },
      datos: {
        titulo: 'Los datos de tus clientes, a salvo',
        texto:
          'Se guardan en nuestro servidor, junto a la información de tu negocio, y nosotros no tenemos acceso a los datos privados de tus clientes. No se comparten con nadie.',
      },
      mejora: {
        titulo: 'Lo revisamos y lo mejoramos',
        texto:
          'Cada semana miramos cómo va con casos reales y lo ajustamos. No se queda como el primer día.',
        badge: 'Revisión semanal',
      },
    },
  },

  calculadora: {
    mensajesDia: 'Mensajes y llamadas al día',
    valorHora: 'Lo que vale una hora de tu equipo',
    horasMes: 'horas/mes',
    porAno: '/año',
    cta: 'Hablar con nosotros',
    porDia: '/día',
    horasLibres: 'Horas libres recuperadas',
    ahorroMes: 'Ahorro estimado al mes',
    ahorroAno: 'Ahorro proyectado al año',
    resultadoEstimado: 'Resultado estimado de ahorro',
    formula: '{mensajes} mensajes/día × 70% que resuelve el agente × 2,8 min × 22 días laborables',
    nota:
      'La cuenta sale de 2,8 minutos por mensaje o llamada atendidos a mano, de que el agente resuelve solo unos 7 de cada 10 y de 22 días laborables al mes. Es una estimación para hacerte una idea, no una promesa: lo que ahorre tu negocio se ve mirando tu caso.',
  },

  hero: {
    lema: 'Automatizamos pymes de toda España',
    titulo: 'Automatización e IA para pymes de toda España',
    subtitulo: 'Quitamos a tu negocio el trabajo que se repite: mensajes, llamadas, citas y papeleo.',
    ctaPrincipal: 'Cuéntanos cómo trabajas',
    ctaSecundario: 'Ver qué hacemos',
    pista: 'Baja para ver qué hacemos',
    escribir: 'Escríbenos por WhatsApp',
    escribirPista: 'Escríbenos por WhatsApp…',
    chat: [
      { from: 'client', text: '¿Qué hace DALSAT?', time: '14:46' },
      { from: 'bot', text: 'Programas a medida, agentes de IA, automatización de procesos, SEO y webs. Todo para pymes.', time: '14:46' },
      { from: 'client', text: '¿Y a mí de qué me sirve?', time: '14:47' },
      { from: 'bot', text: 'Para dejar de hacer a mano lo que se repite cada semana.', time: '14:47' },
      { from: 'client', text: '¿Por dónde se empieza?', time: '14:48' },
      { from: 'bot', text: 'Miramos cómo trabajas hoy y lo dibujamos paso a paso. Ahí se ve qué sobra.', time: '14:48' },
      { from: 'client', text: '¿Trabajáis en mi zona?', time: '14:49' },
      { from: 'bot', text: 'Sí, con pymes de toda España. Te lo contamos sin compromiso.', time: '14:49' },
    ],
  },

  audio: {
    etiqueta: 'Agente de voz',
    titulo: 'Escucha cómo habla un agente de voz',
    entradilla: 'Muestras grabadas, con entonación natural. Habla en el idioma de quien llama.',
    cargando: 'Cargando el audio…',
    escuchar: 'Escuchar muestra de voz',
    transcripcion: 'Transcripción',
    reproductor: 'Reproductor de voz',
    reproduciendo: 'Reproduciendo ({velocidad}x)…',
    pausar: 'Pausar muestra de voz ({velocidad}x)',
    fallo: 'No se ha podido reproducir el audio. Vuelve a intentarlo, y si sigue igual escríbenos y te lo mandamos por WhatsApp.',
    avisoIdioma: '',
    etiquetaTraduccion: '',
    lista: [
      {
        id: 'cita',
        title: 'Nota de voz: reserva de cita',
        subtitle: 'Respuesta de voz inmediata para reservar mesa o consulta.',
        category: 'Voz WhatsApp',
        sender: 'Agente DALSAT (restaurante)',
        traduccion: '',
      },
      {
        id: 'soporte',
        title: 'Atención telefónica 24/7',
        subtitle: 'Resolución de dudas frecuentes de cliente con voz natural.',
        category: 'Agente de Voz',
        sender: 'Agente DALSAT (ingeniería)',
        traduccion: '',
      },
      {
        id: 'recordatorio',
        title: 'Recordatorio de peluquería',
        subtitle: 'Aviso por audio para confirmar asistencia a la cita de peluquería.',
        category: 'Fidelización',
        sender: 'Agente DALSAT (peluquería)',
        traduccion: '',
      },
    ],
  },

  sectores: {
    etiqueta: 'Ejemplos por sector',
    titulo: 'Así contesta un agente en tu sector',
    entradilla: 'Elige tu tipo de negocio y mira una conversación de ejemplo.',
    probarEnVivo: 'Quiero una demo para mi negocio',
    repetir: 'Repetir ejemplo',
    escribiendo: 'El agente está escribiendo',
    agenteIaPara: 'Agente de IA para {sector}',
    agenteDalsat: 'Agente DALSAT',
    enLinea: 'En línea',
    respuestaInmediata: 'Respuesta inmediata',
    escribiendoRespuesta: 'Escribiendo respuesta…',
    lista: [
      {
        id: 'tattoo',
        name: 'Tatuajes y estética',
        badge: 'Ejemplo · estudio de tatuaje',
        description: 'Reserva de citas, consulta de estilos, precios orientativos y disponibilidad de agenda sin interrumpir el trabajo.',
        whatsappMessage: 'Hola, me gustaría que me montarais una demo del agente para un estudio de tatuajes y estética.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: '¡Buenas! Quería saber si tenéis hueco para un tatuaje pequeño en el brazo esta semana.', time: '17:40' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Sí, tenemos hueco libre este jueves a las 11:30 o el viernes a las 16:00. ¿Cuál te viene mejor para agendar la cita?', time: '17:40' },
          { sender: 'user' as 'user' | 'bot', text: 'El viernes a las 16:00 me va perfecto', time: '17:41' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Genial! Cita reservada para el viernes 16:00. Te enviamos la ubicación y recordatorio 24h antes.', time: '17:41' },
        ],
      },
      {
        id: 'restaurante',
        name: 'Restauración y hostelería',
        badge: 'Restaurantes',
        description: 'Reservas de mesas en terraza/comedor, consulta de carta, alérgenos y horarios automáticos 24/7.',
        whatsappMessage: 'Hola, me gustaría que me montarais una demo del agente para mi restaurante.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hola, me gustaría reservar una mesa para 4 personas este sábado por la noche.', time: '21:15' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Tenemos mesa libre en comedor interior a las 21:30 o en terraza a las 22:15. ¿En qué zona prefieres?', time: '21:15' },
          { sender: 'user' as 'user' | 'bot', text: 'En terraza a las 22:15 por favor.', time: '21:16' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Mesa en terraza para 4 a las 22:15 reservada a tu nombre! Nos vemos el sábado.', time: '21:16' },
        ],
      },
      {
        id: 'salud',
        name: 'Clínicas y salud',
        badge: 'Clínicas y médicos',
        description: 'Citas médicas, odontológicas o fisioterapia con recordatorios automáticos para que se te queden menos huecos sin avisar.',
        whatsappMessage: 'Hola, me gustaría que me montarais una demo del agente para mi clínica.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hola, necesito cita con el fisioterapeuta para un dolor de espalda.', time: '10:05' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Tenemos consulta libre mañana a las 10:15 o el jueves a las 17:00. ¿Te agendamos la de mañana?', time: '10:05' },
          { sender: 'user' as 'user' | 'bot', text: 'Sí, mañana a las 10:15 perfecto.', time: '10:06' },
          { sender: 'bot' as 'user' | 'bot', text: 'Cita confirmada para mañana a las 10:15. Recibirás un aviso 2h antes. ¡Que te mejore la espalda!', time: '10:06' },
        ],
      },
      {
        id: 'asesoria',
        name: 'Asesorías y servicios',
        badge: 'Ejemplo · asesoría',
        description: 'Atención de dudas sobre facturación, Renta, documentación de clientes y cita directa con el especialista.',
        whatsappMessage: 'Hola, me gustaría que me montarais una demo del agente para mi asesoría.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Buenas, ¿qué documentación necesito aportar para la campaña de la Renta?', time: '12:30' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Necesitaremos tu borrador, certificado de retenciones y datos catastrales. ¿Te agendo cita con tu asesor fiscal?', time: '12:30' },
          { sender: 'user' as 'user' | 'bot', text: 'Sí por favor, para la semana que viene.', time: '12:31' },
          { sender: 'bot' as 'user' | 'bot', text: 'Te he reservado cita con tu asesor para el martes a las 11:00. Te enviamos el listado detallado de documentos a tu email.', time: '12:31' },
        ],
      },
    ],
  },

  faq: {
    etiqueta: 'Preguntas frecuentes',
    titulo: 'Lo que nos preguntan siempre',
    entradilla: 'Si te falta algo, escríbenos y te lo contamos.',
    sinResultados: 'No hay preguntas en esta categoría.',
    todas: 'Todas',
    borrar: 'Borrar',
    preguntarWhatsApp: 'Preguntar por WhatsApp',
    masCategorias: 'Ver todas las demás categorías ({n} preguntas en total)',
    soporteDirecto: 'Soporte directo DALSAT',
    consultarMensaje: 'Hola, quiero consultar mi caso con alguien de DALSAT.',
    dudaWhatsApp: 'Hola, tengo una duda sobre:',
    consultar: 'Consultar mi caso',
    buscar: 'Buscar una duda (ej. WhatsApp, voz, contrato, RGPD...)',
    sinNada: 'No encontramos respuestas para "{q}"',
    sinNadaPista: 'Prueba con otras palabras o escríbenos directamente por WhatsApp.',
    volverPrimera: 'Ver las preguntas sobre servicios',
    utilPregunta: '¿Te resulta útil esta respuesta?',
    utilVota: 'Sí, me sirve',
    utilSi: 'Respuesta útil',
    cierreTitulo: '¿Tienes una duda específica sobre tu negocio?',
    cierreTexto: 'Miramos tu caso sin compromiso y te decimos qué te compensa automatizar.',
    items: [
      {
        id: 'empezar',
        category: 'Servicios',
        badge: 'Primer paso',
        question: '¿Por dónde se empieza?',
        answer: 'Por una reunión de media hora en la que nos cuentas cómo trabajas hoy: qué haces cada día, quién lo hace y dónde se apunta. De ahí sale el mapa de tu negocio y la lista de lo que se puede quitar de en medio. Si vemos que no hay nada que te compense, te lo decimos y no pasa nada.',
      },
      {
        id: 'ya-tengo-web',
        category: 'Servicios',
        badge: 'Re-digitalización',
        question: 'Ya tengo web, redes y ficha en Google. ¿Esto para qué me sirve?',
        answer: 'Todo eso sirve para que te encuentren, y sigue haciendo falta. Lo que no hace es quitarte trabajo: las llamadas, los mensajes de WhatsApp, las citas y los apuntes a mano siguen siendo tuyos. La re-digitalización es la parte de después: mirar cómo funciona tu negocio de verdad y hacer que lo que se repite cada semana se haga solo.',
      },
      {
        id: 'panel',
        category: 'Servicios',
        badge: 'Incluido',
        question: '¿Desde dónde gestiono mi agente y mis reservas?',
        answer: 'Desde tu CRM de DALSAT, con tu usuario y tu contraseña, en app.dalsats.com. Ahí cambias lo que responde el agente de chat y el de voz, ves y mueves las reservas que han cogido, lees las conversaciones y tienes los números de tu negocio: cuánto se ha respondido solo, a qué horas te escriben más y cuántas horas te has ahorrado. Es el CRM de todo lo que pasa por tus agentes. Entra con lo que contrates, no se paga aparte y no hay que instalar nada.',
      },
      {
        id: 'que-haceis',
        category: 'Servicios',
        badge: 'Seis servicios',
        question: '¿Solo hacéis agentes de IA?',
        answer: 'No. Hacemos seis cosas: programas a medida para tu negocio, agentes de IA que atienden por WhatsApp, Instagram, dentro de tu web o por teléfono, el CRM desde el que gestionas todo eso, mapeo y automatización de procesos, SEO para que te encuentren en Google y desarrollo web. Los agentes son la parte más visible, pero rara vez es por donde más se gana.',
      },
      {
        id: 'combinar',
        category: 'Servicios',
        badge: 'Combinables',
        question: '¿Tengo que contratarlo todo o puedo coger solo una cosa?',
        answer: 'Puedes coger solo una. Cada servicio funciona por su cuenta, pero están hechos para encajar: la web se conecta con el agente, el agente apunta las reservas en tu CRM y el mapeo de procesos dice qué conviene automatizar primero. Lo normal es empezar por lo que más te pesa y sumar lo demás cuando tenga sentido.',
      },
      {
        id: 'saas-medida',
        category: 'Servicios',
        badge: 'Software a medida',
        question: '¿Qué es eso de un programa a medida y en qué se diferencia de uno normal?',
        answer: 'Un programa hecho para cómo trabajas tú, en vez de uno genérico donde acabas peleándote con campos que no usas y echando de menos los que necesitas. Suele sustituir a la hoja de cálculo y a los papeles: clientes, citas, presupuestos, stock. Solo lleva lo que usáis y entra tu equipo desde el móvil.',
      },
      {
        id: 'mapeo',
        category: 'Servicios',
        badge: 'Mapeo de procesos',
        question: '¿Qué es mapear los procesos de mi negocio?',
        answer: 'Sentarnos contigo y dibujar cómo funciona tu negocio de verdad, paso a paso: qué entra, quién lo toca, qué se apunta y dónde. Cuando está dibujado se ve solo lo que se repite cada semana y lo que se puede quitar de en medio. Es el punto de partida de casi todo lo demás, y a veces la conclusión es que no hace falta ninguna IA.',
      },
      {
        id: 'seo-web',
        category: 'Servicios',
        badge: 'SEO y web',
        question: '¿También hacéis la web y el posicionamiento en Google?',
        answer: 'Sí. Hacemos webs rápidas y pensadas para que quien entre haga algo: pedir cita, escribirte o comprar. Y trabajamos el SEO para que tu negocio salga cuando alguien de tu zona busca lo que ofreces: ficha de Google al día, contenido útil y una web que carga rápido en el móvil.',
      },
      {
        id: 'zona',
        category: 'Servicios',
        badge: 'Toda España',
        question: '¿Trabajáis en mi zona?',
        answer: 'Trabajamos con pymes de toda España. El mapeo inicial sale mejor cara a cara, así que si estás cerca vamos en persona, y si no lo hacemos por videollamada. El resto lo llevamos en remoto sin que se note la distancia.',
      },
      {
        id: 'idiomas',
        category: 'Servicios',
        badge: 'Cualquier idioma',
        question: '¿En qué idiomas atiende el agente?',
        answer: 'En el que use tu cliente. Si te escriben o te llaman en inglés, en francés o en alemán, el agente contesta en ese idioma.',
      },
      {
        id: 'numero',
        category: 'WhatsApp',
        badge: 'Sin cambio de número',
        question: '¿Tengo que cambiar el número de WhatsApp de mi empresa?',
        answer: 'No. El agente se conecta al número de WhatsApp Business que ya usas. Mantienes tus contactos, tu historial y tu perfil de empresa, y tus clientes no notan ningún cambio.',
      },
      {
        id: 'multimedia',
        category: 'WhatsApp',
        badge: 'Archivos y multimedia',
        question: '¿El agente de WhatsApp puede enviar catálogos, imágenes o documentos PDF?',
        answer: 'Sí. Manda catálogos en PDF, fotos de tus servicios, listas de precios o la ubicación en Google Maps, según lo que le pida el cliente.',
      },
      {
        id: 'notas_voz',
        category: 'WhatsApp',
        badge: 'Notas de voz',
        question: '¿Y si el cliente manda un audio en vez de escribir?',
        answer: 'Lo escucha, entiende lo que le piden y contesta al momento, por escrito o con otra nota de voz.',
      },
      {
        id: 'limite',
        category: 'WhatsApp',
        badge: 'Sin esperas',
        question: '¿Cuántas conversaciones lleva a la vez?',
        answer: 'Muchas. No atiende de una en una, así que nadie se queda esperando a que termine con otro cliente.',
      },
      {
        id: 'voz',
        category: 'Agentes de voz',
        badge: 'Voz natural',
        question: '¿Cómo suena la voz de las llamadas telefónicas?',
        answer: 'Suena a persona, con sus pausas y su entonación, y habla en el idioma de quien llama. En la página de demos puedes escuchar muestras grabadas y juzgarlo tú.',
      },
      {
        id: 'llamadas_salientes',
        category: 'Agentes de voz',
        badge: 'Llamadas automáticas',
        question: '¿Puede el agente realizar llamadas salientes para recordar citas?',
        answer: 'Sí. Llama uno o dos días antes para confirmar, y el cliente puede confirmar o cambiar la cita en esa misma llamada. Así se te quedan muchos menos huecos sin avisar.',
      },
      {
        id: 'horario_voz',
        category: 'Agentes de voz',
        badge: 'Atención 24/7',
        question: '¿El agente telefónico atiende fuera del horario comercial?',
        answer: 'Sí, las 24 horas y todos los días del año. Si te llaman de madrugada o un domingo, el agente coge el recado, da la cita o resuelve la duda.',
      },
      {
        id: 'conectar',
        category: 'Integraciones',
        badge: 'Lo que ya usas',
        question: '¿Se puede conectar con las herramientas que ya uso?',
        answer: 'Depende de la herramienta. Cuéntanos qué usas (tu agenda, tu programa de facturación o de gestión) y te decimos si se puede conectar y cómo. Si no se puede, te lo decimos antes de empezar.',
      },
      {
        id: 'fallo',
        category: 'Seguridad y RGPD',
        badge: 'Traspaso a humano',
        question: '¿Y si el agente no sabe contestar?',
        answer: 'Te lo pasa a ti. Cuando la consulta se sale de lo que sabe o hace falta el criterio de una persona, avisa a tu equipo con el resumen de lo hablado y seguís vosotros desde ahí. No se inventa una respuesta para salir del paso.',
      },
      {
        id: 'rgpd',
        category: 'Seguridad y RGPD',
        badge: 'RGPD',
        question: '¿Cumple el RGPD?',
        answer: 'Sí. Los datos se guardan en nuestro servidor, junto a la información de tu negocio, y nosotros no tenemos acceso a los datos privados de tus clientes: no los vemos ni los compartimos con nadie.',
      },
      {
        id: 'precio',
        category: 'Contrato y plazos',
        badge: 'Precio',
        question: '¿Cuánto cuesta?',
        answer: 'Depende de lo que montemos: no cuesta lo mismo un agente de WhatsApp que un programa a medida para tu negocio. Miramos tu caso, te decimos qué merece la pena y qué no, y te pasamos un precio cerrado antes de empezar. Antes de pagar nada, te montamos una demo con tus datos y la pruebas gratis durante un periodo de prueba. La primera reunión no se cobra y no te compromete a nada.',
      },
      {
        id: 'tiempo',
        category: 'Contrato y plazos',
        badge: '2-3 días',
        question: '¿En cuánto tiempo queda instalado y funcionando?',
        answer: 'Un agente, en 2 o 3 días laborables desde que tenemos tu información. Lo montamos nosotros: le enseñamos tus precios, tus horarios y tus servicios, lo probamos y te lo entregamos funcionando. Un programa a medida o una web llevan más, y te decimos el plazo antes de empezar.',
      },
      {
        id: 'permanencia',
        category: 'Contrato y plazos',
        badge: 'Sin permanencia',
        question: '¿Hay permanencia?',
        answer: 'No. Vamos mes a mes, sin permanencia y sin penalización si lo dejas. Si no te compensa, avisas y se acaba.',
      },
    ],
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
    enviar: 'Enviar mensaje',
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
        etiqueta: 'Una reunión de 30 minutos, gratis',
      },
      {
        titulo: 'Lo construimos',
        texto:
          'Montamos lo que haga falta: tu programa a medida, tu agente, la automatización o la web. Conectado con lo que ya usas.',
        etiqueta: 'Plazo cerrado antes de empezar',
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
    etiqueta: 'Tu CRM',
    titulo: 'No te dejamos con una caja negra',
    texto:
      'Todo lo que montamos se gestiona desde tu CRM, con tu usuario y tu contraseña. Entras desde el móvil o desde el ordenador y ves qué está pasando en tu negocio sin llamar a nadie.',
    pieCaptura: 'Lo primero que ves al entrar. Los datos son de una cuenta de pruebas.',
    altCaptura:
      'Pantalla de inicio del CRM de DALSAT: reservas de la semana, facturación estimada, clientes únicos, mensajes atendidos por el agente y tiempo medio de respuesta.',
    incluido: 'El CRM entra con lo que contrates. No se paga aparte ni hay que instalar nada.',
    entrar: 'Ya soy cliente, entrar al CRM',
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

  // Paginas de cada servicio (/servicios/{slug}). Solo lo que ya dice el
  // resto de la web: nada de funciones, integraciones ni cifras que no esten
  // confirmadas. `faq` son ids de faq.items que se repiten en esa pagina.
  paginaServicio: {
    migas: 'Servicios',
    paraQuien: 'Para quién es',
    incluye: 'Qué incluye',
    video: 'Así funciona',
    preguntas: 'Preguntas sobre este servicio',
    otros: 'Los otros servicios',
    verServicio: 'Ver el servicio',
    lista: {
      saas: {
        h1: 'Software a medida para pymes',
        seoTitulo: 'Software a medida para pymes | DALSAT',
        seoDescripcion:
          'Un programa hecho para cómo trabaja tu pyme: clientes, citas, presupuestos o stock, desde el móvil. Solo lo que usas, con precio y plazo cerrados.',
        intro: [
          'Dejas de pelearte con hojas de cálculo y con programas genéricos donde nada encaja. Construimos la herramienta que tu negocio necesita: clientes, citas, presupuestos, stock o lo que hoy llevas a mano.',
          'Lleva solo lo que usáis, sin campos que sobran ni pantallas que nadie abre. Tu equipo entra desde el móvil o desde el ordenador, y el programa crece contigo cuando cambia tu forma de trabajar.',
        ],
        paraQuien: [
          'Negocios que llevan clientes, citas o presupuestos en hojas de cálculo o en papel.',
          'Equipos que usan un programa genérico donde sobran campos y faltan los que necesitan.',
          'Pymes que quieren que su gente trabaje desde el móvil, esté donde esté.',
        ],
        incluye: [
          'Una reunión para ver cómo trabajáis antes de diseñar nada',
          'Solo las pantallas y los datos que usáis de verdad',
          'Acceso de tu equipo desde el móvil o el ordenador',
          'Precio y plazo cerrados antes de empezar',
        ],
        faq: ['saas-medida', 'precio', 'tiempo'],
      },
      agentes: {
        h1: 'Agentes de IA para WhatsApp, Instagram, web y teléfono',
        seoTitulo: 'Agente de IA para WhatsApp y teléfono | DALSAT',
        seoDescripcion:
          'Un agente de IA que atiende a tus clientes por WhatsApp, Instagram, tu web o teléfono, en su idioma: resuelve dudas, coge reservas y te avisa si hace falta.',
        intro: [
          'Un agente que conoce tu negocio y responde como responderías tú. Por WhatsApp, por Instagram, dentro de tu propia web o al teléfono, y en el idioma de tu cliente. Resuelve dudas, coge reservas y avisa a tu equipo cuando hace falta una persona.',
          'Se conecta al número de WhatsApp Business que ya usas, así que tus clientes no notan ningún cambio. Si le mandan un audio, lo escucha y contesta. Y cuando algo se sale de lo que sabe, no se inventa la respuesta: te lo pasa con el resumen de lo hablado.',
        ],
        paraQuien: [
          'Negocios que pierden tiempo contestando siempre las mismas preguntas.',
          'Quien coge reservas o citas por WhatsApp o por teléfono y no llega a todo.',
          'Negocios a los que escriben o llaman fuera de horario.',
        ],
        incluye: [
          'Agente de chat para WhatsApp, Instagram y tu web',
          'Agente de voz que coge el teléfono y puede llamar para recordar citas',
          'Atiende en el idioma de tu cliente, a cualquier hora',
          'Traspaso a tu equipo cuando hace falta una persona',
          'Lo gestionas desde tu CRM: qué responde, sus precios y sus horarios',
        ],
        faq: ['numero', 'notas_voz', 'fallo', 'idiomas', 'tiempo'],
      },
      panel: {
        h1: 'CRM con IA para pymes',
        seoTitulo: 'CRM con IA para pymes | DALSAT',
        seoDescripcion:
          'El CRM desde el que llevas tu negocio: conversaciones, reservas, lo que responden tus agentes de chat y voz y los números de la semana. Incluido, sin instalar nada.',
        intro: [
          'La plataforma desde la que llevas lo que pasa con tus clientes: lees cada conversación, ves y mueves las reservas, cambias lo que responden tus agentes de chat y de voz y miras los números de tu negocio. Un CRM para pymes con la IA ya dentro.',
          'Entras en app.dalsats.com con tu usuario y tu contraseña, desde el móvil o desde el ordenador, y ves qué está pasando en tu negocio sin llamar a nadie. Entra con lo que contrates: no se paga aparte y no hay que instalar nada.',
        ],
        paraQuien: [
          'Negocios que ya tienen, o van a tener, un agente atendiendo a sus clientes.',
          'Quien quiere ver las reservas y las conversaciones en un solo sitio.',
          'Dueños que quieren saber cuánto trabajo se han quitado de encima cada semana.',
        ],
        incluye: [
          'Tu agente de chat: qué responde, sus precios y sus horarios',
          'Tu agente de voz: su voz, qué puede decir y cuándo te pasa la llamada',
          'Las reservas en un calendario: moverlas, cancelarlas o meter una a mano',
          'Los números: cuánto se ha respondido solo, a qué horas te escriben más y cuántas horas te has ahorrado',
        ],
        faq: ['panel', 'rgpd', 'combinar'],
      },
      procesos: {
        h1: 'Mapeo y automatización de procesos para pymes',
        seoTitulo: 'Automatización de procesos para pymes | DALSAT',
        seoDescripcion:
          'Dibujamos cómo funciona tu negocio paso a paso, vemos lo que se repite cada semana y lo automatizamos. A veces la conclusión es que no hace falta IA.',
        intro: [
          'Nos sentamos contigo y dibujamos cómo funciona tu negocio de verdad, paso a paso: qué entra, quién lo toca, qué se apunta y dónde. Cuando está dibujado, se ve solo lo que se repite cada semana. Eso es lo que quitamos de en medio.',
          'Es el punto de partida de casi todo lo demás. De ahí sale la lista de lo que conviene automatizar primero, lo que no merece la pena y, a veces, la conclusión de que no hace falta ninguna IA.',
        ],
        paraQuien: [
          'Negocios que notan que se les va el día en tareas que se repiten.',
          'Quien no tiene claro por dónde empezar a automatizar.',
          'Pymes que ya tienen web y redes, pero siguen haciéndolo casi todo a mano.',
        ],
        incluye: [
          'Una reunión, cara a cara si estás cerca o por videollamada',
          'El mapa de tu negocio, paso a paso',
          'La lista de lo que se repite y de lo que no compensa tocar',
          'La automatización de lo que decidamos quitar de en medio',
        ],
        faq: ['mapeo', 'empezar', 'ya-tengo-web'],
      },
      seo: {
        h1: 'SEO para pymes: que te encuentren en Google',
        seoTitulo: 'SEO para pymes y negocios locales | DALSAT',
        seoDescripcion:
          'Trabajamos para que tu negocio salga cuando alguien de tu zona busca en Google lo que ofreces: ficha de Google al día, contenido útil y una web rápida.',
        intro: [
          'Trabajamos para que tu negocio aparezca cuando alguien de tu zona busca en Google lo que tú ofreces. Ficha de Google al día, contenido útil y una web que carga rápido en el móvil.',
          'Sin trucos raros: lo que funciona a medio plazo es que Google entienda qué haces y dónde, y que quien entra encuentre lo que buscaba. Y si además tienes un agente, quien llega desde Google puede pedir cita en ese mismo momento.',
        ],
        paraQuien: [
          'Negocios que dependen de clientes de su zona.',
          'Quien tiene web pero no sale cuando le buscan.',
          'Pymes con la ficha de Google a medio hacer o sin tocar desde hace tiempo.',
        ],
        incluye: [
          'Trabajo sobre las búsquedas de tu zona',
          'Ficha de Google al día',
          'Contenido útil para quien te busca',
          'Una web que carga rápido en el móvil',
        ],
        faq: ['seo-web', 'zona', 'combinar'],
      },
      web: {
        h1: 'Desarrollo web para pymes',
        seoTitulo: 'Desarrollo web para pymes | DALSAT',
        seoDescripcion:
          'Webs rápidas y claras, pensadas para que quien entre pida cita, te escriba o compre. Conectadas con tu agente de IA y con las herramientas que ya usas.',
        intro: [
          'Una web rápida y clara, pensada para que quien entre haga algo: pedir cita, escribirte o comprar. Y conectada con las herramientas que ya usas.',
          'No hacemos folletos. Cada página tiene un trabajo, y la web entera está pensada para el móvil, que es desde donde te van a ver casi siempre. Si tienes un agente, vive dentro de la web y atiende a quien entra.',
        ],
        paraQuien: [
          'Negocios sin web, o con una que no les trae clientes.',
          'Quien quiere que la web sirva para pedir cita o escribir, no solo para estar.',
          'Pymes que quieren juntar web, agente y SEO en un mismo proyecto.',
        ],
        incluye: [
          'Diseño pensado primero para el móvil',
          'Páginas hechas para que te escriban o pidan cita',
          'Conexión con tu agente de IA',
          'Una base preparada para el SEO',
        ],
        faq: ['seo-web', 'combinar', 'tiempo'],
      },
    },
  },

  // Sección "se combinan" de /servicios. Los servicios de cada combinación
  // van por id en components/Combinaciones.astro; aquí solo el texto.
  combinables: {
    etiqueta: 'Se combinan',
    titulo: 'Coge uno o júntalos: están hechos para encajar',
    texto:
      'Cada servicio funciona por su cuenta, pero rinden más juntos. Todo se conecta entre sí y se gestiona desde el mismo CRM. Estas son las combinaciones que más montamos.',
    lista: {
      captar: {
        titulo: 'De la visita a la reserva, sin tocar nada',
        texto: 'Tu web capta, el agente atiende y coge la cita, y todo queda apuntado en tu CRM sin copiar nada a mano.',
      },
      medida: {
        titulo: 'Un programa que encaja a la primera',
        texto: 'Primero dibujamos cómo trabajas; después te hacemos el programa justo para eso, sin pantallas de más.',
      },
      encontrar: {
        titulo: 'Que te encuentren y te escriban',
        texto: 'El SEO trae a quien busca lo tuyo en tu zona, y la web está hecha para que, al entrar, pida cita o te escriba.',
      },
    },
    mas: '¿Tienes otra combinación en mente? Casi seguro que se puede.',
  },

  legal: {
    actualizado: 'Última actualización',
    otros: 'Los otros documentos',
    documentos: 'Documentos legales',
    // En castellano no hay aviso: este ES el documento que obliga.
    aviso: '',
    verOriginal: '',
  },

  footer: {
    descripcion:
      'Estudio de digitalización para pymes de toda España. Programas a medida, agentes de IA, automatización de procesos, SEO y desarrollo web.',
    navegacion: 'Navegación',
    calculadoraAhorro: 'Calculadora de ahorro',
    servicios: 'Servicios',
    saas: 'Software a medida',
    agentes: 'Agentes de IA',
    panel: 'CRM con IA',
    procesos: 'Mapeo y automatización',
    seoWeb: 'SEO y desarrollo web',
    contactoRapido: 'Contacto rápido',
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

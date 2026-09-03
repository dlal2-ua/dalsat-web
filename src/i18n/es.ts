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

  hero: {
    lema: 'Re-digitalizamos pymes de toda España',
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
    etiqueta: 'Demo de Voz IA Real',
    titulo: 'Escucha cómo habla tu Agente',
    entradilla: 'Locución en voz alta con entonación natural en español.',
    cargando: 'Cargando el audio…',
    escuchar: 'Escuchar Muestra de Voz',
    avisoIdioma: '',
    etiquetaTraduccion: '',
    lista: [
      {
        id: 'cita',
        title: 'Nota de Voz: Reserva de Cita',
        subtitle: 'Respuesta de voz inmediata para reservar mesa o consulta.',
        category: 'Voz WhatsApp',
        sender: 'Agente Dalsat (Restaurante)',
        traduccion: '',
      },
      {
        id: 'soporte',
        title: 'Atención Telefónica 24/7',
        subtitle: 'Resolución de dudas frecuentes de cliente con voz natural.',
        category: 'Agente de Voz',
        sender: 'Agente Dalsat (Ingeniería)',
        traduccion: '',
      },
      {
        id: 'recordatorio',
        title: 'Recordatorio de Peluquería',
        subtitle: 'Aviso por audio para confirmar asistencia a la cita de peluquería.',
        category: 'Fidelización',
        sender: 'Agente Dalsat (Peluquería)',
        traduccion: '',
      },
    ],
  },

  sectores: {
    etiqueta: 'Prueba en Tu Sector',
    titulo: 'Demostración por Sector',
    entradilla: 'Selecciona tu tipo de negocio y observa la simulación en tiempo real.',
    probarEnVivo: 'Probar esta demo en mi WhatsApp en vivo',
    repetir: 'Repetir Demo',
    escribiendo: 'Agente IA redactando',
    lista: [
      {
        id: 'tattoo',
        name: 'Tatuajes & Estética',
        badge: 'Caso Víbora Studio',
        description: 'Reserva de citas, consulta de estilos, precios orientativos y disponibilidad de agenda sin interrumpir el trabajo.',
        whatsappMessage: 'Hola, me gustaría probar la demo de IA para un estudio de Tatuajes y Estética.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: '¡Buenas! Quería saber si tenéis hueco para un tatuaje pequeño en el brazo esta semana.', time: '17:40' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Sí, tenemos hueco libre este jueves a las 11:30h o el viernes a las 16:00h. ¿Cuál te viene mejor para agendar la cita?', time: '17:40' },
          { sender: 'user' as 'user' | 'bot', text: 'El viernes a las 16:00 me va perfecto ', time: '17:41' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Genial! Cita reservada para el viernes 16:00h. Te enviamos la ubicación y recordatorio 24h antes. ', time: '17:41' },
        ],
      },
      {
        id: 'restaurante',
        name: 'Restauración & Hostelería',
        badge: 'Restaurantes',
        description: 'Reservas de mesas en terraza/comedor, consulta de carta, alérgenos y horarios automáticos 24/7.',
        whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Restaurante u Hostelería.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hola, me gustaría reservar una mesa para 4 personas este sábado por la noche.', time: '21:15' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Disponemos de mesa libre en comedor interior a las 21:30h o en terraza a las 22:15h. ¿En qué zona prefieres?', time: '21:15' },
          { sender: 'user' as 'user' | 'bot', text: 'En terraza a las 22:15h por favor.', time: '21:16' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Mesa en terraza para 4 a las 22:15h reservada a tu nombre! Nos vemos el sábado. ', time: '21:16' },
        ],
      },
      {
        id: 'salud',
        name: 'Clínicas & Salud',
        badge: 'Clínicas & Médicos',
        description: 'Citas médicas, odontológicas o fisioterapia con recordatorios automáticos para reducir plantones a cero.',
        whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Clínica o Centro de Salud.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hola, necesito cita con el fisioterapeuta para un dolor de espalda.', time: '10:05' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Disponemos de consulta libre mañana a las 10:15h o el jueves a las 17:00h. ¿Te agendamos la de mañana?', time: '10:05' },
          { sender: 'user' as 'user' | 'bot', text: 'Sí, mañana a las 10:15h perfecto.', time: '10:06' },
          { sender: 'bot' as 'user' | 'bot', text: 'Cita confirmada para mañana a las 10:15h. Recibirás un aviso 2h antes. ¡Que te mejore la espalda! ', time: '10:06' },
        ],
      },
      {
        id: 'asesoria',
        name: 'Asesorías & Servicios',
        badge: 'Caso Atrio Asesores',
        description: 'Atención de dudas sobre facturación, Renta, documentación de clientes y cita directa con el especialista.',
        whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Asesoría o Gestoría.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Buenas, ¿qué documentación necesito aportar para la campaña de la Renta?', time: '12:30' },
          { sender: 'bot' as 'user' | 'bot', text: '¡Hola! Necesitaremos tu borrador, certificado de retenciones y datos catastrales. ¿Te agendo cita con tu asesor fiscal?', time: '12:30' },
          { sender: 'user' as 'user' | 'bot', text: 'Sí por favor, para la semana que viene.', time: '12:31' },
          { sender: 'bot' as 'user' | 'bot', text: 'Te he reservado cita con tu asesor para el martes a las 11:00h. Te enviamos el listado detallado de documentos a tu email. ', time: '12:31' },
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
    consultar: 'Consultar mi caso',
    buscar: 'Buscar una duda (ej. WhatsApp, voz, contrato, RGPD...)',
    sinNada: 'No encontramos respuestas para "{q}"',
    sinNadaPista: 'Prueba con otras palabras o escríbenos directamente por WhatsApp.',
    volverPrimera: 'Ver las preguntas sobre servicios',
    utilPregunta: '¿Te resulta útil esta respuesta?',
    utilVota: 'Sí, me sirve',
    utilSi: 'Respuesta útil',
    cierreTitulo: '¿Tienes una duda específica sobre tu negocio?',
    cierreTexto: 'Analizamos tu caso sin compromiso y te mostramos cómo adaptar la IA a tu empresa.',
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
        answer: 'Desde tu panel, con tu usuario y tu contraseña, en app.dalsats.com. Ahí cambias lo que responde el agente de chat y el de voz, ves y mueves las reservas que han cogido, lees las conversaciones y tienes los números de tu negocio: cuánto se ha respondido solo, a qué horas te escriben más y cuántas horas te has ahorrado. Hace las veces de CRM para lo que pasa por el agente. Entra con lo que contrates, no se paga aparte y no hay que instalar nada.',
      },
      {
        id: 'que-haceis',
        category: 'Servicios',
        badge: 'Seis servicios',
        question: '¿Solo hacéis agentes de IA?',
        answer: 'No. Hacemos seis cosas: programas a medida para tu negocio, agentes de IA que atienden por WhatsApp, Instagram o dentro de tu web, el panel desde el que gestionas todo eso, mapeo y automatización de procesos, SEO para que te encuentren en Google y desarrollo web. Los agentes son la parte más visible, pero rara vez es por donde más se gana.',
      },
      {
        id: 'saas-medida',
        category: 'Servicios',
        badge: 'SaaS a medida',
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
        id: 'numero',
        category: 'WhatsApp',
        badge: 'Sin cambio de número',
        question: '¿Tengo que cambiar el número de WhatsApp de mi empresa?',
        answer: 'No. El agente se conecta al número de WhatsApp Business que ya usas. Mantienes tus contactos, tu historial y tu perfil de empresa, y tus clientes no notan ningún cambio.',
      },
      {
        id: 'multimedia',
        category: 'WhatsApp',
        badge: 'Archivos & Multimedia',
        question: '¿El agente de WhatsApp puede enviar catálogos, imágenes o documentos PDF?',
        answer: 'Sí. Manda catálogos en PDF, fotos de tus servicios, listas de precios o la ubicación en Google Maps, según lo que le pida el cliente.',
      },
      {
        id: 'pagos',
        category: 'WhatsApp',
        badge: 'Cobros automáticos',
        question: '¿Puede el agente de WhatsApp enviar enlaces de pago o señal de reserva?',
        answer: 'Sí. Lo conectamos con Stripe, Bizum o Redsys para que el agente mande un enlace de cobro seguro y no confirme la cita hasta que esté pagada la señal.',
      },
      {
        id: 'notas_voz',
        category: 'WhatsApp',
        badge: 'Notas de voz',
        question: '¿Qué ocurre si un cliente envía un audio de WhatsApp en lugar de escribir?',
        answer: 'Lo escucha, entiende lo que le piden y contesta al momento, por escrito o con otra nota de voz.',
      },
      {
        id: 'limite',
        category: 'WhatsApp',
        badge: 'Sin esperas',
        question: '¿Hay algún límite en el número de clientes atendidos simultáneamente?',
        answer: 'Ninguno. Lleva cientos de conversaciones a la vez sin ir más lento y sin dejar a nadie esperando.',
      },
      {
        id: 'voz',
        category: 'Agentes de Voz',
        badge: 'Voz Natural',
        question: '¿Cómo suena la voz de las llamadas telefónicas?',
        answer: 'Suena a persona: español de España, con sus pausas y su entonación. En la página de demos puedes escuchar muestras reales y juzgarlo tú.',
      },
      {
        id: 'llamadas_salientes',
        category: 'Agentes de Voz',
        badge: 'Llamadas automáticas',
        question: '¿Puede el agente realizar llamadas salientes para recordar citas?',
        answer: 'Sí. Llama uno o dos días antes para confirmar, y el cliente puede confirmar o cambiar la cita en esa misma llamada. Así se te quedan muchos menos huecos sin avisar.',
      },
      {
        id: 'horario_voz',
        category: 'Agentes de Voz',
        badge: 'Atención 24/7',
        question: '¿El agente telefónico atiende fuera del horario comercial?',
        answer: 'Sí, las 24 horas y todos los días del año. Si te llaman de madrugada o un domingo, el agente coge el recado, da la cita o resuelve la duda.',
      },
      {
        id: 'agenda',
        category: 'Integraciones',
        badge: 'Citas automáticas',
        question: '¿Se conecta a mi agenda actual (Google Calendar, Booksy, etc.)?',
        answer: 'Sí. Mira los huecos libres en Google Calendar, Outlook, Booksy o Calendly antes de dar una cita, y la guarda ahí mismo. No coge dos citas para la misma hora.',
      },
      {
        id: 'crm',
        category: 'Integraciones',
        badge: 'CRM & ERP',
        question: '¿Se puede integrar con mi programa de facturación o sistema propio?',
        answer: 'Sí. Nos conectamos con tu programa de facturación, tu software de gestión o el que uses en tu sector, para que los datos de un cliente no haya que meterlos dos veces.',
      },
      {
        id: 'fallo',
        category: 'Seguridad & RGPD',
        badge: 'Traspaso a humano',
        question: '¿Qué ocurre si la IA no sabe responder una consulta o el cliente requiere atención personalizada?',
        answer: 'Te lo pasa a ti. Cuando la consulta se sale de lo que sabe o hace falta el criterio de una persona, avisa a tu equipo con el resumen de lo hablado y seguís vosotros desde ahí. No se inventa una respuesta para salir del paso.',
      },
      {
        id: 'rgpd',
        category: 'Seguridad & RGPD',
        badge: 'RGPD Europeo',
        question: '¿Cumple con la Ley de Protección de Datos (RGPD)?',
        answer: 'Sí. Los datos van cifrados y se guardan en servidores europeos. Los de tus clientes no se comparten con nadie ni se usan para entrenar modelos públicos.',
      },
      {
        id: 'precio',
        category: 'Contrato & Tiempos',
        badge: 'Precio',
        question: '¿Cuánto cuesta?',
        answer: 'Depende de lo que montemos: no cuesta lo mismo un agente de WhatsApp que un programa a medida para tu negocio. Miramos tu caso, te decimos qué merece la pena y qué no, y te pasamos un precio cerrado antes de empezar. La primera reunión no se cobra y no te compromete a nada.',
      },
      {
        id: 'tiempo',
        category: 'Contrato & Tiempos',
        badge: '48-72 Horas',
        question: '¿En cuánto tiempo queda instalado y funcionando?',
        answer: 'Un agente, entre 48 y 72 horas laborables. Lo montamos nosotros: le enseñamos tus precios, tus horarios y tus servicios, lo probamos y te lo entregamos funcionando. Un programa a medida o una web llevan más, y te decimos el plazo antes de empezar.',
      },
      {
        id: 'permanencia',
        category: 'Contrato & Tiempos',
        badge: 'Sin permanencia',
        question: '¿Existe algún tipo de contrato o permanencia obligatoria?',
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

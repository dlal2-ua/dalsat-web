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
    panel: 'Log in to the CRM',
    cta: 'Talk to us',
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
    cambiarIdioma: 'Change language',
  },

  comun: {
    volverArriba: 'Back to top',
    saltarContenido: 'Skip to content',
    volverAlInicio: 'Back to home',
    escribirWhatsApp: 'Message us on WhatsApp',
    avisoChat: "Hello, I'm DALSAT's virtual assistant. If you have any questions, click on me and I'll help you right away.",
    cerrarAviso: 'Dismiss',
    mensajeWhatsApp: 'Hi, I am interested in what you do and would like to know more.',
    hablarWhatsApp: 'Shall we talk on WhatsApp?',
    verCatalogo: 'See the full catalogue',
    saberMas: 'Find out more',
    probarDemo: 'Try a demo',
    verVideo: 'See how it works',
    videoPendiente: 'Video on its way',
  },

  mascota: {
    etiqueta: 'DALSAT assistant',
    paginas: {
      '/servicios': "Six services built so your business does fewer things by hand. If you're not sure where to start, ask me.",
      '/demos': "This is where we are publishing a video for each service, and you can see how agents like me answer. Spoiler: the one you're looking at right now is one too.",
      '/calculadora': 'How much time does your team lose answering the same things over and over? Scroll down and check it with your own numbers.',
      '/faq': "Can't find your question? Click on me and I'll answer it right away.",
      '/sobre-nosotros': "Here's who is behind DALSAT and how we work.",
      '/contacto': "If you'd rather have an answer straight away, click on me and we'll sort it out now.",
      '/gracias': 'Message received. While we get back to you, I can answer any question: click on me.',
      '/aviso-legal': "If anything in this text isn't clear, click on me and I'll explain it in plain words.",
      '/cookies': "If anything in this text isn't clear, click on me and I'll explain it in plain words.",
      '/politica-privacidad': "If anything in this text isn't clear, click on me and I'll explain it in plain words.",
    },
    secciones: {
      're-digitalizacion': 'This is where we explain what changes once your business processes start running on their own.',
      servicios: 'Not sure which service fits your business? We will point you in the right direction, no strings attached.',
      clientes: 'These businesses already work with us. Under each logo, what they tell us.',
      pruebalo: 'This is how an agent answers. If it fits, we set one up with your data and you try it free.',
      catalogo: "Each card is a service. If you're torn between two, click on me and I'll tell you which one fits your case.",
      calculadora:
        "Move the two sliders with your figures: messages per day and what an hour of your team's time is worth. Right below you'll see the hours and money you'd get back.",
      'demos-video': 'Pick a service and see what it is about. The videos are coming out one by one.',
      combinables: "Not sure which combination fits you? Ask me and we'll look at your case.",
      'demos-sector': 'Pick your sector and see how the agent answers a customer. If you want one like it, we set it up with your data.',
      'demos-voz': 'Press play and hear how a voice agent handles a call.',
      'quienes-somos': 'And while you are here: would you like an assistant like me on your website?',
      cierre: "Would you like an assistant like me on your website? That's exactly what we do.",
      'no-encontrada': "This page doesn't exist, but I do. Click on me and I'll help you find what you were looking for.",
    },
    conCta: ['servicios', 'quienes-somos', 'cierre'],
    cta: 'Talk to us',
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
        'We set up a demo with your services, your prices and the way you talk to customers, and you try it free before paying anything.',
      cta: 'Get my free demo',
    },
    calculadora: {
      titulo: 'Do the numbers add up for you?',
      texto:
        'We look at your particular case and tell you what can be automated and what is not worth the trouble.',
      cta: 'Talk to us',
    },
  },

  clientes: {
    etiqueta: 'Clients',
    titulo: 'Our clients',
    entradilla: 'Businesses across Spain with part of their work already automated.',
    etiquetaTraduccion: 'In English:',
    traducciones: {
      'vibora-studio':
        'We used to stop tattooing to pick up the phone, and messages still slipped through overnight. Now the booking comes in on its own while we work, and in the morning we just look at the diary.',
      'atrio-asesores':
        'During tax return season the same four questions rained on us all day. Now the agent answers them and only the case that really needs looking at reaches us.',
      beniabogados:
        'We did not even have a logo, and we explained the firm over the phone one person at a time. Now we have our own identity and a site that tells it for us before they call.',
    } as Record<string, string>,
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
        'An agent that knows your business and answers the way you would. On WhatsApp, on Instagram, inside your own site or on the phone, and in your customer\'s language. It settles questions, takes bookings and calls in your team when a person is needed.',
      puntos: ['WhatsApp, Instagram and web', 'Calls with a voice agent', 'Enquiries and bookings'],
    },
    panel: {
      nombre: 'AI-powered CRM',
      titulo: 'Your CRM: customers, bookings and agents in one place',
      texto:
        'The platform you run your customer side from: read every conversation, see and move bookings, change what your chat and voice agents say, and look at your numbers. A CRM for small businesses with the AI already built in.',
      puntos: ['Conversations, bookings and metrics', 'From your phone or your desk', 'Included with whatever you take on'],
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

  sobreNosotros: {
    etiqueta: 'Who we are',
    titulo: 'We build what takes work off you, and keep it running',
    entradilla: 'We are a small studio: you talk to the people who build it and review it every week.',
    pilares: {
      real: {
        titulo: 'It runs in real businesses',
        texto:
          'Everything we build is running in a real business, every day. It adapts to your information, not to a generic example.',
        badge: 'Running every day',
      },
      trato: {
        titulo: 'You talk to the people who built it',
        texto:
          'No tickets and no switchboards. You message the people who built your system, on WhatsApp.',
        enlace: 'Message us on WhatsApp',
        badge: 'Direct contact',
      },
      datos: {
        titulo: 'Your customers\' data, kept safe',
        texto:
          'It is stored on our server, alongside your business information, and we have no access to your customers\' private data. It is not shared with anyone.',
      },
      mejora: {
        titulo: 'We review it and improve it',
        texto:
          'Every week we look at how it is doing against real cases and adjust. It does not stay as it was on day one.',
        badge: 'Weekly review',
      },
    },
  },

  calculadora: {
    mensajesDia: 'Messages and calls per day',
    valorHora: 'What an hour of your team is worth',
    horasMes: 'hours/month',
    porAno: '/year',
    cta: 'Talk to us',
    porDia: '/day',
    horasLibres: 'Hours freed up',
    ahorroMes: 'Estimated monthly saving',
    ahorroAno: 'Projected annual saving',
    resultadoEstimado: 'Estimated saving',
    formula: '{mensajes} messages/day × 70% settled by the agent × 2.8 min × 22 working days',
    nota:
      'The maths comes from 2.8 minutes per message or call handled by hand, the agent settling about 7 in 10 on its own, and 22 working days a month. It is an estimate to give you an idea, not a promise: what your business saves comes out of looking at your case.',
  },

  hero: {
    lema: 'Automating small businesses across Spain',
    titulo: 'Automation and AI for small businesses across Spain',
    subtitulo: 'We take the repetitive work off your business: messages, calls, appointments and paperwork.',
    ctaPrincipal: 'Tell us how you work',
    ctaSecundario: 'See what we do',
    pista: 'Scroll to see what we do',
    escribir: 'Message us on WhatsApp',
    escribirPista: 'Message us on WhatsApp…',
    chat: [
      { from: 'client', text: 'What does DALSAT do?', time: '14:46' },
      { from: 'bot', text: 'Custom software, AI agents, process automation, SEO and websites. All of it for small businesses.', time: '14:46' },
      { from: 'client', text: "What's in it for me?", time: '14:47' },
      { from: 'bot', text: 'You stop doing by hand whatever repeats every week.', time: '14:47' },
      { from: 'client', text: 'Where do we start?', time: '14:48' },
      { from: 'bot', text: 'We look at how you work today and draw it step by step. That is where the waste shows.', time: '14:48' },
      { from: 'client', text: 'Do you work in my area?', time: '14:49' },
      { from: 'bot', text: 'Yes, with small businesses all over Spain. We will talk you through it, no strings attached.', time: '14:49' },
    ],
  },

  audio: {
    etiqueta: 'Voice agent',
    titulo: 'Hear how a voice agent sounds',
    entradilla: "Recorded samples with natural intonation. It speaks the caller's language.",
    cargando: 'Loading the audio…',
    escuchar: 'Listen to a voice sample',
    transcripcion: 'Transcript',
    reproductor: 'Voice player',
    reproduciendo: 'Playing ({velocidad}x)…',
    pausar: 'Pause voice sample ({velocidad}x)',
    fallo: 'We could not play the audio. Try again, and if it still fails, message us and we will send it to you on WhatsApp.',
    avisoIdioma: 'The samples are in Spanish; the agents answer in whatever language your customer uses.',
    etiquetaTraduccion: 'In English:',
    lista: [
      {
        id: 'cita',
        title: 'Voice note: booking an appointment',
        subtitle: 'An immediate spoken reply to book a table or a consultation.',
        category: 'WhatsApp voice',
        sender: 'DALSAT agent (restaurant)',
        traduccion: 'Hello! How are you? So yes, we have exactly one table left on the outside terrace for tonight at ten. If you like, I will hold it in your name. Can you confirm?',
      },
      {
        id: 'soporte',
        title: 'Phone cover, 24/7',
        subtitle: 'Common customer questions settled in a natural voice.',
        category: 'Voice agent',
        sender: 'DALSAT agent (engineering)',
        traduccion: 'Good afternoon. I am calling from the Dalsat team. I saw your enquiry about WhatsApp automation. If you like, tell me what sort of business you have and I will show you a live demo.',
      },
      {
        id: 'recordatorio',
        title: 'Hair salon reminder',
        subtitle: 'A spoken reminder to confirm a salon appointment.',
        category: 'Retention',
        sender: 'DALSAT agent (hair salon)',
        traduccion: 'Hello Carlos, hope you are well. I am getting in touch to remind you that you have an appointment tomorrow at a quarter past ten at the salon, for a cut and style. Reply to this audio if that still works and I will confirm it, all right?',
      },
    ],
  },

  sectores: {
    etiqueta: 'Examples by sector',
    titulo: 'How an agent answers in your sector',
    entradilla: 'Pick your type of business and watch a sample conversation.',
    probarEnVivo: 'I want a demo for my business',
    repetir: 'Replay example',
    escribiendo: 'AI agent typing',
    agenteIaPara: 'AI agent for {sector}',
    agenteDalsat: 'DALSAT agent',
    enLinea: 'Online',
    respuestaInmediata: 'Instant reply',
    escribiendoRespuesta: 'Typing a reply…',
    lista: [
      {
        id: 'tattoo',
        name: 'Tattoo and beauty',
        badge: 'Example · tattoo studio',
        description: 'Booking appointments, asking about styles, ballpark prices and calendar availability without interrupting the work.',
        whatsappMessage: 'Hi, I would like you to set up an agent demo for a tattoo and beauty studio.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi there! I wanted to know if you have a slot for a small tattoo on the arm this week.', time: '17:40' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! Yes, we have a free slot this Thursday at 11:30 or Friday at 16:00. Which suits you better for the appointment?', time: '17:40' },
          { sender: 'user' as 'user' | 'bot', text: 'Friday at 16:00 is perfect for me', time: '17:41' },
          { sender: 'bot' as 'user' | 'bot', text: 'Great! Appointment booked for Friday at 16:00. We will send you the location and a reminder 24h beforehand.', time: '17:41' },
        ],
      },
      {
        id: 'restaurante',
        name: 'Restaurants and hospitality',
        badge: 'Restaurants',
        description: 'Table bookings on the terrace or indoors, menu and allergen questions, and opening hours answered 24/7.',
        whatsappMessage: 'Hi, I would like you to set up an agent demo for my restaurant or hospitality business.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi, I would like to book a table for 4 this Saturday evening.', time: '21:15' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! We have a free table indoors at 21:30 or on the terrace at 22:15. Which would you prefer?', time: '21:15' },
          { sender: 'user' as 'user' | 'bot', text: 'On the terrace at 22:15 please.', time: '21:16' },
          { sender: 'bot' as 'user' | 'bot', text: 'Terrace table for 4 at 22:15 booked in your name! See you on Saturday.', time: '21:16' },
        ],
      },
      {
        id: 'salud',
        name: 'Clinics and health',
        badge: 'Clinics and doctors',
        description: 'Medical, dental or physiotherapy appointments with automatic reminders, so fewer slots are left empty without notice.',
        whatsappMessage: 'Hi, I would like you to set up an agent demo for my clinic or health centre.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi, I need an appointment with the physiotherapist for back pain.', time: '10:05' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! We have a free consultation tomorrow at 10:15 or Thursday at 17:00. Shall we book you in for tomorrow?', time: '10:05' },
          { sender: 'user' as 'user' | 'bot', text: 'Yes, tomorrow at 10:15 is perfect.', time: '10:06' },
          { sender: 'bot' as 'user' | 'bot', text: 'Appointment confirmed for tomorrow at 10:15. You will get a reminder 2h beforehand. Hope your back feels better!', time: '10:06' },
        ],
      },
      {
        id: 'asesoria',
        name: 'Accountants and services',
        badge: 'Example · accountancy',
        description: 'Answering questions on invoicing, tax returns and client paperwork, and booking straight in with the specialist.',
        whatsappMessage: 'Hi, I would like you to set up an agent demo for my accountancy or admin practice.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi, what paperwork do I need to bring for the tax return season?', time: '12:30' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! We will need your draft return, your withholding certificate and your property details. Shall I book you in with your tax adviser?', time: '12:30' },
          { sender: 'user' as 'user' | 'bot', text: 'Yes please, for next week.', time: '12:31' },
          { sender: 'bot' as 'user' | 'bot', text: 'I have booked you in with your adviser for Tuesday at 11:00. We are sending the detailed document list to your email.', time: '12:31' },
        ],
      },
    ],
  },

  faq: {
    etiqueta: 'Frequently asked questions',
    titulo: 'What people always ask us',
    entradilla: 'If something is missing, write to us and we will explain it.',
    sinResultados: 'No questions in this category.',
    todas: 'All',
    borrar: 'Clear',
    preguntarWhatsApp: 'Ask on WhatsApp',
    masCategorias: 'See all the other categories ({n} questions in total)',
    soporteDirecto: 'Direct DALSAT support',
    consultarMensaje: 'Hi, I would like to talk through my case with someone at DALSAT.',
    dudaWhatsApp: 'Hi, I have a question about:',
    consultar: 'Ask about my case',
    buscar: 'Search a question (e.g. WhatsApp, voice, terms, GDPR...)',
    sinNada: 'We found no answers for "{q}"',
    sinNadaPista: 'Try other words, or write to us directly on WhatsApp.',
    volverPrimera: 'See the questions about services',
    utilPregunta: 'Was this answer useful?',
    utilVota: 'Yes, that helps',
    utilSi: 'Marked useful',
    cierreTitulo: 'Got a specific question about your business?',
    cierreTexto: 'We look at your case with no strings attached and tell you what is worth automating.',
    items: [
      {
        id: 'empezar',
        category: 'Services',
        badge: 'First step',
        question: 'Where do we start?',
        answer: 'With a half-hour meeting where you talk us through how you work today: what you do each day, who does it, and where it gets written down. Out of that comes the map of your business and the list of what can be taken off your hands. If we see nothing there that would pay for itself, we say so and that is that.',
      },
      {
        id: 'ya-tengo-web',
        category: 'Services',
        badge: 'After being found',
        question: 'I already have a site, social accounts and a Google listing. What is this for?',
        answer: 'All of that is for being found, and you still need it. What it does not do is take work off you: the calls, the WhatsApp messages, the appointments and the notes by hand are all still yours. What we do is the part that comes after: looking at how your business really runs and making the weekly repetition happen on its own.',
      },
      {
        id: 'panel',
        category: 'Services',
        badge: 'Included',
        question: 'Where do I manage my agent and my bookings from?',
        answer: 'From your DALSAT CRM, with your own username and password, at app.dalsats.com. That is where you change what the chat and voice agents answer, see and move the bookings they have taken, read the conversations and get your numbers: how much was answered without you, when people message you most, and how many hours you saved. It is the CRM for everything that goes through your agents. It is included with whatever you take on, there is no separate charge and nothing to install.',
      },
      {
        id: 'que-haceis',
        category: 'Services',
        badge: 'Six services',
        question: 'Do you only build AI agents?',
        answer: 'No. We do six things: custom software for your business, AI agents that handle WhatsApp, Instagram, your own site or the phone, the CRM you run all of it from, process mapping and automation, SEO so people find you on Google, and web development. The agents are the most visible part, but they are rarely where the most is gained.',
      },
      {
        id: 'combinar',
        category: 'Services',
        badge: 'Combinable',
        question: 'Do I have to take on everything, or can I pick just one thing?',
        answer: 'You can pick just one. Each service works on its own, but they are built to fit together: the site connects to the agent, the agent logs bookings in your CRM, and process mapping tells you what is worth automating first. Most people start with whatever weighs on them most and add the rest when it makes sense.',
      },
      {
        id: 'saas-medida',
        category: 'Services',
        badge: 'Custom software',
        question: 'What is custom software, and how is it different from ordinary software?',
        answer: 'Software built for the way you work, instead of a generic package where you end up fighting fields you never use and missing the ones you need. It usually replaces the spreadsheet and the paperwork: customers, appointments, quotes, stock. It carries only what your team uses, and they work from their phones.',
      },
      {
        id: 'mapeo',
        category: 'Services',
        badge: 'Process mapping',
        question: 'What does mapping my business processes mean?',
        answer: 'Sitting down with you and drawing how your business really runs, step by step: what comes in, who touches it, what gets recorded and where. Once it is drawn, the weekly repetition becomes obvious, and so does what can be taken out of the way. It is the starting point for nearly everything else, and sometimes the conclusion is that you need no AI at all.',
      },
      {
        id: 'seo-web',
        category: 'Services',
        badge: 'SEO and web',
        question: 'Do you also build the site and handle Google rankings?',
        answer: 'Yes. We build fast sites made so that whoever lands on one does something: book, write to you, or buy. And we work the SEO so your business shows up when someone nearby searches for what you offer: your Google listing kept current, content worth reading, and a site that loads fast on a phone.',
      },
      {
        id: 'zona',
        category: 'Services',
        badge: 'All of Spain',
        question: 'Do you work in my area?',
        answer: 'We work with small businesses across Spain. The initial mapping goes better face to face, so if you are nearby we come in person, and if not we do it on a video call. The rest we handle remotely and you will not feel the distance.',
      },
      {
        id: 'idiomas',
        category: 'Services',
        badge: 'Any language',
        question: 'Which languages does the agent answer in?',
        answer: 'Whichever your customer uses. If they write or call in English, French or German, the agent answers in that language.',
      },
      {
        id: 'numero',
        category: 'WhatsApp',
        badge: 'Same number',
        question: 'Do I have to change my company\'s WhatsApp number?',
        answer: 'No. The agent connects to the WhatsApp Business number you already use. You keep your contacts, your history and your business profile, and your customers notice no change at all.',
      },
      {
        id: 'multimedia',
        category: 'WhatsApp',
        badge: 'Files and media',
        question: 'Can the WhatsApp agent send catalogues, images or PDF documents?',
        answer: 'Yes. It sends PDF catalogues, photos of your services, price lists or your Google Maps location, depending on what the customer asks for.',
      },
      {
        id: 'notas_voz',
        category: 'WhatsApp',
        badge: 'Voice notes',
        question: 'What if a customer sends a voice note instead of typing?',
        answer: 'It listens, understands what they are asking, and answers straight away, either in writing or with a voice note of its own.',
      },
      {
        id: 'limite',
        category: 'WhatsApp',
        badge: 'No queues',
        question: 'How many conversations can it handle at once?',
        answer: 'Many. It does not answer one at a time, so nobody is left waiting for it to finish with another customer.',
      },
      {
        id: 'voz',
        category: 'Voice agents',
        badge: 'Natural voice',
        question: 'What does the voice on phone calls sound like?',
        answer: "It sounds like a person, with its pauses and its intonation, and it speaks the caller's language. On the demos page you can hear recorded samples and judge for yourself.",
      },
      {
        id: 'llamadas_salientes',
        category: 'Voice agents',
        badge: 'Automatic calls',
        question: 'Can the agent make outbound calls to remind people of appointments?',
        answer: 'Yes. It calls a day or two ahead to confirm, and the customer can confirm or move the appointment on that same call. You get far fewer no-shows that way.',
      },
      {
        id: 'horario_voz',
        category: 'Voice agents',
        badge: '24/7 cover',
        question: 'Does the phone agent answer outside business hours?',
        answer: 'Yes, twenty-four hours a day, every day of the year. If someone calls at dawn or on a Sunday, the agent takes the message, books the appointment or settles the question.',
      },
      {
        id: 'conectar',
        category: 'Integrations',
        badge: 'What you already use',
        question: 'Can it connect to the tools I already use?',
        answer: 'It depends on the tool. Tell us what you use (your calendar, your invoicing or management software) and we will tell you whether it can be connected and how. If it cannot, we tell you before we start.',
      },
      {
        id: 'fallo',
        category: 'Security and GDPR',
        badge: 'Handover to a person',
        question: 'What if the agent does not know the answer?',
        answer: 'It hands it to you. When the question goes beyond what it knows, or a person\'s judgement is needed, it alerts your team with a summary of the conversation and you carry on from there. It does not invent an answer to get itself out of trouble.',
      },
      {
        id: 'rgpd',
        category: 'Security and GDPR',
        badge: 'GDPR',
        question: 'Is it GDPR compliant?',
        answer: 'Yes. The data is stored on our server, alongside your business information, and we have no access to your customers\' private data: we do not see it and we do not share it with anyone.',
      },
      {
        id: 'precio',
        category: 'Terms and timings',
        badge: 'Price',
        question: 'How much does it cost?',
        answer: 'It depends what we build: a WhatsApp agent does not cost the same as custom software for your business. We look at your case, tell you what is worth doing and what is not, and give you a fixed price before we start. Before you pay anything, we set up a demo with your data and you try it free for a trial period. The first meeting is free and commits you to nothing.',
      },
      {
        id: 'tiempo',
        category: 'Terms and timings',
        badge: '2-3 days',
        question: 'How long until it is installed and running?',
        answer: 'An agent takes 2 or 3 working days from when we have your information. We build it: we teach it your prices, your opening hours and your services, we test it, and we hand it over working. Custom software or a site takes longer, and we tell you the timeline before we start.',
      },
      {
        id: 'permanencia',
        category: 'Terms and timings',
        badge: 'No lock-in',
        question: 'Is there a minimum term?',
        answer: 'No. We go month by month, with no minimum term and no penalty if you stop. If it is not paying for itself, you tell us and it ends.',
      },
    ],
  },

  formulario: {
    nombre: 'Name',
    nombrePista: 'Your name or your business',
    email: 'Email',
    emailPista: 'you@email.com',
    negocio: 'Type of business',
    negocioPista: 'Gym, clinic, driving school…',
    mensaje: 'Message',
    mensajePista: 'Tell us about your business or what you would like to automate',
    opcional: '(optional)',
    enviar: 'Send message',
    enviando: 'Sending…',
    enviandoAviso: 'Sending the form',
    errores: {
      nombre: 'Tell us your name, or your business name.',
      emailFalta: 'We need an email address to reply to you.',
      emailMal: 'That email does not look right. Have another look.',
      mensajeCorto: 'Tell us a bit more: two words is not enough to know where to start.',
      nombreLargo: 'That name is too long.',
      emailLargo: 'That email address is too long.',
      mensajeLargo: 'The message cannot be longer than {max} characters.',
    },
    falloTitulo: 'We could not send it',
    falloTextoAntes: 'It may be the connection. Press the button again, or write to us at',
    falloTextoO: 'or',
    falloWhatsApp: 'on WhatsApp',
  },

  pasos: {
    etiqueta: 'How we work',
    titulo: 'Three steps, nothing complicated',
    entradilla: 'From the first meeting to having it running. No surprises on the way.',
    lista: [
      {
        titulo: 'We look at how you work',
        texto:
          'You talk us through your day and we draw your business step by step. That is where the weekly repetition shows up.',
        etiqueta: 'A free 30-minute meeting',
      },
      {
        titulo: 'We build it',
        texto:
          'We build whatever is needed: your custom software, your agent, the automation or the site. Connected to what you already use.',
        etiqueta: 'Days, not months',
      },
      {
        titulo: 'We put it live',
        texto:
          'It goes into service and we keep tuning it against what actually happens each week. We do not leave you alone with it.',
        etiqueta: 'We stay on it',
      },
    ],
  },

  plataforma: {
    etiqueta: 'Your CRM',
    titulo: 'We do not leave you with a black box',
    texto:
      'Everything we build is run from your CRM, with your own username and password. You log in from your phone or your desk and see what is happening in your business without calling anyone.',
    pieCaptura: 'The first thing you see on logging in. The data is from a test account.',
    altCaptura:
      "Home screen of the DALSAT CRM: the week's bookings, estimated revenue, unique customers, messages handled by the agent and average response time.",
    incluido: 'The CRM is included with whatever you take on. No separate charge and nothing to install.',
    entrar: 'Already a customer? Log in to the CRM',
    capacidades: {
      chat: {
        titulo: 'Your chat agent',
        texto:
          'Change what it answers, its prices and its opening hours whenever you like. And read the conversations it has had.',
      },
      voz: {
        titulo: 'Your voice agent',
        texto:
          'The one that picks up the phone. You choose its voice, what it may say, and when it has to hand the call to you.',
      },
      reservas: {
        titulo: 'Bookings',
        texto:
          'Every appointment the agent has taken, on a calendar. You can move them, cancel them or add one by hand.',
      },
      metricas: {
        titulo: 'Your numbers',
        texto:
          'How much was answered without you, when people message you most, and how many hours you saved this week.',
      },
    },
  },

  paginaServicio: {
    migas: 'Services',
    paraQuien: 'Who it is for',
    incluye: 'What it includes',
    video: 'How it works',
    preguntas: 'Questions about this service',
    otros: 'The other services',
    verServicio: 'See the service',
    lista: {
      saas: {
        h1: 'Custom software for small businesses',
        seoTitulo: 'Custom software for small businesses | DALSAT',
        seoDescripcion:
          'Software built for the way your business works: customers, appointments, quotes or stock, from your phone. Only what you use, at a fixed price and timeline.',
        intro: [
          'No more fighting spreadsheets and off-the-shelf software where nothing quite fits. We build the tool your business needs: customers, appointments, quotes, stock, or whatever you handle by hand today.',
          'It carries only what you use, with no fields to skip and no screens nobody opens. Your team works from their phones or their desks, and the software grows with you when the way you work changes.',
        ],
        paraQuien: [
          'Businesses that keep customers, appointments or quotes in spreadsheets or on paper.',
          'Teams using generic software full of fields they skip and missing the ones they need.',
          'Small businesses that want their people working from their phones, wherever they are.',
        ],
        incluye: [
          'A meeting to see how you work before designing anything',
          'Only the screens and the data you actually use',
          'Access for your team from phone or desktop',
          'A fixed price and timeline before we start',
        ],
        faq: ['saas-medida', 'precio', 'tiempo'],
      },
      agentes: {
        h1: 'AI agents for WhatsApp, Instagram, web and phone',
        seoTitulo: 'AI agent for WhatsApp and phone calls | DALSAT',
        seoDescripcion:
          'An AI agent that answers your customers on WhatsApp, Instagram, your site or the phone, in their language: it settles questions, takes bookings and alerts you.',
        intro: [
          "An agent that knows your business and answers the way you would. On WhatsApp, on Instagram, inside your own site or on the phone, and in your customer's language. It settles questions, takes bookings and calls in your team when a person is needed.",
          'It connects to the WhatsApp Business number you already use, so your customers notice no change. If they send a voice note, it listens and answers. And when something goes beyond what it knows, it does not make up an answer: it hands it to you with a summary of the conversation.',
        ],
        paraQuien: [
          'Businesses losing time answering the same questions over and over.',
          'Anyone taking bookings or appointments on WhatsApp or the phone and falling behind.',
          'Businesses that get messages and calls outside opening hours.',
        ],
        incluye: [
          'A chat agent for WhatsApp, Instagram and your site',
          'A voice agent that picks up the phone and can call to remind appointments',
          "It answers in your customer's language, at any hour",
          'Handover to your team when a person is needed',
          'You run it from your CRM: what it answers, its prices and its hours',
        ],
        faq: ['numero', 'notas_voz', 'fallo', 'idiomas', 'tiempo'],
      },
      panel: {
        h1: 'AI-powered CRM for small businesses',
        seoTitulo: 'AI-powered CRM for small businesses | DALSAT',
        seoDescripcion:
          'The CRM you run your business from: conversations, bookings, what your chat and voice agents say, and the week in numbers. Included, nothing to install.',
        intro: [
          'The platform you run your customer side from: read every conversation, see and move bookings, change what your chat and voice agents say, and look at your numbers. A CRM for small businesses with the AI already built in.',
          'You log in at app.dalsats.com with your own username and password, from your phone or your desk, and see what is happening in your business without calling anyone. It is included with whatever you take on: no separate charge and nothing to install.',
        ],
        paraQuien: [
          'Businesses that already have, or are about to have, an agent answering customers.',
          'Anyone who wants bookings and conversations in one place.',
          'Owners who want to know how much work came off their plate each week.',
        ],
        incluye: [
          'Your chat agent: what it answers, its prices and its hours',
          'Your voice agent: its voice, what it may say and when it hands the call to you',
          'Bookings on a calendar: move them, cancel them or add one by hand',
          'The numbers: how much was answered without you, when people message you most and how many hours you saved',
        ],
        faq: ['panel', 'rgpd', 'combinar'],
      },
      procesos: {
        h1: 'Process mapping and automation for small businesses',
        seoTitulo: 'Process automation for small businesses | DALSAT',
        seoDescripcion:
          'We draw how your business runs, step by step, spot what repeats every week and automate it. Sometimes the conclusion is that you need no AI at all.',
        intro: [
          'We sit down with you and draw how your business really runs, step by step: what comes in, who touches it, what gets recorded and where. Once it is drawn, the weekly repetition shows. That is what we take out of the way.',
          'It is the starting point for nearly everything else. Out of it comes the list of what is worth automating first, what is not worth the trouble and, sometimes, the conclusion that you need no AI at all.',
        ],
        paraQuien: [
          'Businesses that feel the day slipping away on repetitive tasks.',
          'Anyone unsure where to start with automation.',
          'Small businesses that already have a site and social accounts but still do almost everything by hand.',
        ],
        incluye: [
          'A meeting, face to face if you are nearby or on a video call',
          'The map of your business, step by step',
          'The list of what repeats and of what is not worth touching',
          'Automation of whatever we decide to take out of the way',
        ],
        faq: ['mapeo', 'empezar', 'ya-tengo-web'],
      },
      seo: {
        h1: 'SEO for small businesses: get found on Google',
        seoTitulo: 'SEO for small and local businesses | DALSAT',
        seoDescripcion:
          'We work so your business shows up when someone nearby searches Google for what you offer: your Google listing kept current, useful content, a fast site.',
        intro: [
          'We work so your business shows up when someone nearby searches Google for what you offer. Your Google listing kept current, content worth reading, and a site that loads fast on a phone.',
          'No tricks: what works over time is Google understanding what you do and where, and people finding what they came for. And if you also have an agent, whoever arrives from Google can book right there and then.',
        ],
        paraQuien: [
          'Businesses that depend on customers from their area.',
          'Anyone with a site that does not show up when people search.',
          'Small businesses with a half-finished Google listing, or one untouched for ages.',
        ],
        incluye: [
          'Work on the searches in your area',
          'Your Google listing kept current',
          'Useful content for the people looking for you',
          'A site that loads fast on a phone',
        ],
        faq: ['seo-web', 'zona', 'combinar'],
      },
      web: {
        h1: 'Web development for small businesses',
        seoTitulo: 'Web development for small businesses | DALSAT',
        seoDescripcion:
          'Fast, clear sites built so that whoever lands on them books, writes to you or buys. Connected to your AI agent and to the tools you already use.',
        intro: [
          'A fast, clear site built so that whoever lands on it does something: book, write to you, or buy. And connected to the tools you already use.',
          'We do not make brochures. Every page has a job, and the whole site is built for phones, which is where people will see you most of the time. If you have an agent, it lives inside the site and looks after whoever comes in.',
        ],
        paraQuien: [
          'Businesses without a site, or with one that brings them no customers.',
          'Anyone who wants the site to get bookings and messages, not just to exist.',
          'Small businesses that want site, agent and SEO in one project.',
        ],
        incluye: [
          'Design built for phones first',
          'Pages made to get messages and bookings',
          'Connection to your AI agent',
          'Groundwork ready for SEO',
        ],
        faq: ['seo-web', 'combinar', 'tiempo'],
      },
    },
  },

  combinables: {
    etiqueta: 'They combine',
    titulo: 'Take one, or put them together: they are built to fit',
    texto:
      'Each service works on its own, but they do more together. Everything connects and is run from the same CRM. These are the combinations we set up most often.',
    lista: {
      captar: {
        titulo: 'From visit to booking, hands-free',
        texto: 'Your site brings people in, the agent answers and takes the appointment, and it all lands in your CRM without copying anything by hand.',
      },
      medida: {
        titulo: 'Software that fits first time',
        texto: 'First we draw how you work; then we build the software for exactly that, without screens you will never use.',
      },
      encontrar: {
        titulo: 'Get found, get messages',
        texto: 'SEO brings in people looking for what you do in your area, and the site is built so that, once they land, they book or write to you.',
      },
    },
    mas: 'Have another combination in mind? It can almost certainly be done.',
  },

  legal: {
    actualizado: 'Last updated',
    otros: 'The other documents',
    documentos: 'Legal documents',
    aviso:
      'This is a courtesy translation. The binding document is the Spanish version, written under Spanish law; where the two differ, the Spanish text prevails.',
    verOriginal: 'Read the Spanish original',
  },

  footer: {
    descripcion:
      'A digitalisation studio for small businesses across Spain. Custom software, AI agents, process automation, SEO and web development.',
    navegacion: 'Navigation',
    calculadoraAhorro: 'Savings calculator',
    servicios: 'Services',
    saas: 'Custom software',
    agentes: 'AI agents',
    panel: 'AI-powered CRM',
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

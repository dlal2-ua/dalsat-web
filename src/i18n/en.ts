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
    avisoChat: 'Need a hand? Ask me anything.',
    cerrarAviso: 'Dismiss',
    mensajeWhatsApp: 'Hi, I am interested in what you do and would like to know more.',
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

  sobreNosotros: {
    etiqueta: 'Who we are',
    titulo: 'Engineers focused on your bottom line',
    entradilla: 'We put solid AI in place so you stop losing time on repetitive work.',
    pilares: {
      real: {
        titulo: 'Real technology, not demos',
        texto:
          'Everything we build is running in a real business, every day. It adapts to your information, not to a generic example.',
        badge: 'Running every day',
      },
      trato: {
        titulo: 'You talk to the people who built it',
        texto:
          'No tickets and no switchboards. You message the people who built your system, on WhatsApp.',
        enlace: 'Message us on WhatsApp',
      },
      datos: {
        titulo: 'Your data, on your own server',
        texto:
          'Everything is installed on your server. Your data and your conversations do not leave it and are not shared with anyone.',
      },
      mejora: {
        titulo: 'We review it and improve it',
        texto:
          'Every week we look at how it is doing against real cases and adjust. It does not stay as it was on day one.',
        badge: 'Weekly review',
      },
    },
    cifras: {
      sistemas: 'Systems running in real businesses',
      mensajes: 'Messages handled',
      tiempo: 'Uptime',
    },
  },

  calculadora: {
    mensajesDia: 'Messages and calls per day',
    valorHora: 'What an hour of your team is worth',
    horasMes: 'hours/month',
    porAno: '/year',
    cta: 'See what can be automated',
    porDia: '/day',
    horasLibres: 'Hours freed up',
    ahorroMes: 'Estimated monthly saving',
    ahorroAno: 'Projected annual saving',
    nota:
      'The maths comes from 2.8 minutes per message or call handled by hand, and from the agent settling most of them on its own. It is an estimate to give you an idea, not a promise: what your business saves comes out of looking at your case.',
  },

  hero: {
    lema: 'Re-digitalising small businesses across Spain',
    ctaPrincipal: 'Tell us how you work',
    ctaSecundario: 'See what we do',
    pista: 'Scroll to see what we do',
    escribir: 'Message us on WhatsApp',
    escribirPista: 'Message us on WhatsApp…',
    chat: [
      { from: 'client', text: 'What does DALSAT do?', time: '14:46' },
      { from: 'bot', text: 'Custom software, AI agents, process automation, SEO and websites. All of it for small businesses.', time: '14:46' },
      { from: 'client', text: 'What is in it for me?', time: '14:47' },
      { from: 'bot', text: 'You stop doing by hand whatever repeats every week.', time: '14:47' },
      { from: 'client', text: 'Where do we start?', time: '14:48' },
      { from: 'bot', text: 'We look at how you work today and draw it step by step. That is where the waste shows.', time: '14:48' },
      { from: 'client', text: 'Do you work in my area?', time: '14:49' },
      { from: 'bot', text: 'Yes, with small businesses all over Spain. We will talk you through it, no strings attached.', time: '14:49' },
    ],
  },

  audio: {
    etiqueta: 'Real AI voice demo',
    titulo: 'Hear how your agent speaks',
    entradilla: 'Spoken aloud with natural intonation in Spanish.',
    cargando: 'Loading the audio…',
    escuchar: 'Listen to a voice sample',
    avisoIdioma: 'The samples are in Spanish, the language the agents work in.',
    etiquetaTraduccion: 'In English:',
    lista: [
      {
        id: 'cita',
        title: 'Voice note: booking an appointment',
        subtitle: 'An immediate spoken reply to book a table or a consultation.',
        category: 'WhatsApp voice',
        sender: 'Dalsat agent (restaurant)',
        traduccion: 'Hello! How are you. So yes, we have exactly one table left on the outside terrace for tonight at ten. If you like, I will hold it in your name. Can you confirm?',
      },
      {
        id: 'soporte',
        title: 'Phone cover, 24/7',
        subtitle: 'Common customer questions settled in a natural voice.',
        category: 'Voice agent',
        sender: 'Dalsat agent (engineering)',
        traduccion: 'Good afternoon. I am calling from the Dalsat team. I saw your enquiry about WhatsApp automation. If you like, tell me what sort of business you have and I will show you a live demo.',
      },
      {
        id: 'recordatorio',
        title: 'Hair salon reminder',
        subtitle: 'A spoken reminder to confirm a salon appointment.',
        category: 'Retention',
        sender: 'Dalsat agent (hair salon)',
        traduccion: 'Hello Carlos, hope you are well. I am getting in touch to remind you that you have an appointment tomorrow at a quarter past ten at the salon, for a cut and style. Reply to this audio if that still works and I will confirm it, all right?',
      },
    ],
  },

  sectores: {
    etiqueta: 'Try it for your sector',
    titulo: 'Demo by sector',
    entradilla: 'Pick your type of business and watch the simulation run.',
    probarEnVivo: 'Try this demo live on my WhatsApp',
    repetir: 'Replay demo',
    escribiendo: 'AI agent typing',
    lista: [
      {
        id: 'tattoo',
        name: 'Tattoo & beauty',
        badge: 'Víbora Studio case',
        description: 'Booking appointments, asking about styles, ballpark prices and calendar availability without interrupting the work.',
        whatsappMessage: 'Hi, I would like to try the AI demo for a tattoo and beauty studio.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi there! I wanted to know if you have a slot for a small tattoo on the arm this week.', time: '17:40' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! Yes, we have a free slot this Thursday at 11:30 or Friday at 16:00. Which suits you better for the appointment?', time: '17:40' },
          { sender: 'user' as 'user' | 'bot', text: 'Friday at 16:00 is perfect for me', time: '17:41' },
          { sender: 'bot' as 'user' | 'bot', text: 'Great! Appointment booked for Friday at 16:00. We will send you the location and a reminder 24h beforehand.', time: '17:41' },
        ],
      },
      {
        id: 'restaurante',
        name: 'Restaurants & hospitality',
        badge: 'Restaurants',
        description: 'Table bookings on the terrace or indoors, menu and allergen questions, and opening hours answered 24/7.',
        whatsappMessage: 'Hi, I would like to try the AI demo for my restaurant or hospitality business.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi, I would like to book a table for 4 this Saturday evening.', time: '21:15' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! We have a free table indoors at 21:30 or on the terrace at 22:15. Which would you prefer?', time: '21:15' },
          { sender: 'user' as 'user' | 'bot', text: 'On the terrace at 22:15 please.', time: '21:16' },
          { sender: 'bot' as 'user' | 'bot', text: 'Terrace table for 4 at 22:15 booked in your name! See you on Saturday.', time: '21:16' },
        ],
      },
      {
        id: 'salud',
        name: 'Clinics & health',
        badge: 'Clinics & doctors',
        description: 'Medical, dental or physiotherapy appointments with automatic reminders, taking no-shows down to zero.',
        whatsappMessage: 'Hi, I would like to try the AI demo for my clinic or health centre.',
        chatMessages: [
          { sender: 'user' as 'user' | 'bot', text: 'Hi, I need an appointment with the physiotherapist for back pain.', time: '10:05' },
          { sender: 'bot' as 'user' | 'bot', text: 'Hello! We have a free consultation tomorrow at 10:15 or Thursday at 17:00. Shall we book you in for tomorrow?', time: '10:05' },
          { sender: 'user' as 'user' | 'bot', text: 'Yes, tomorrow at 10:15 is perfect.', time: '10:06' },
          { sender: 'bot' as 'user' | 'bot', text: 'Appointment confirmed for tomorrow at 10:15. You will get a reminder 2h beforehand. Hope your back feels better!', time: '10:06' },
        ],
      },
      {
        id: 'asesoria',
        name: 'Accountants & services',
        badge: 'Atrio Asesores case',
        description: 'Answering questions on invoicing, tax returns and client paperwork, and booking straight in with the specialist.',
        whatsappMessage: 'Hi, I would like to try the AI demo for my accountancy or admin practice.',
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
    cierreTexto: 'We look at your case with no strings attached and show you how to fit AI to your company.',
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
        badge: 'Re-digitalisation',
        question: 'I already have a site, social accounts and a Google listing. What is this for?',
        answer: 'All of that is for being found, and you still need it. What it does not do is take work off you: the calls, the WhatsApp messages, the appointments and the notes by hand are all still yours. Re-digitalisation is the part that comes after: looking at how your business really runs and making the weekly repetition happen on its own.',
      },
      {
        id: 'panel',
        category: 'Services',
        badge: 'Included',
        question: 'Where do I manage my agent and my bookings from?',
        answer: 'From your panel, with your own username and password, at app.dalsats.com. That is where you change what the chat and voice agents answer, see and move the bookings they have taken, read the conversations and get your numbers: how much was answered without you, when people message you most, and how many hours you saved. It acts as a CRM for whatever passes through the agent. It is included with whatever you take on, there is no separate charge and nothing to install.',
      },
      {
        id: 'que-haceis',
        category: 'Services',
        badge: 'Six services',
        question: 'Do you only build AI agents?',
        answer: 'No. We do six things: custom software for your business, AI agents that handle WhatsApp, Instagram or your own site, the panel you run all of it from, process mapping and automation, SEO so people find you on Google, and web development. The agents are the most visible part, but they are rarely where the most is gained.',
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
        id: 'pagos',
        category: 'WhatsApp',
        badge: 'Automatic payments',
        question: 'Can the WhatsApp agent send payment links or take a deposit?',
        answer: 'Yes. We connect it to Stripe, Bizum or Redsys so the agent sends a secure payment link and does not confirm the appointment until the deposit is paid.',
      },
      {
        id: 'notas_voz',
        category: 'WhatsApp',
        badge: 'Voice notes',
        question: 'What happens if a customer sends a WhatsApp voice note instead of typing?',
        answer: 'It listens, understands what they are asking, and answers straight away, either in writing or with a voice note of its own.',
      },
      {
        id: 'limite',
        category: 'WhatsApp',
        badge: 'No queues',
        question: 'Is there a limit on how many customers it handles at once?',
        answer: 'None. It carries hundreds of conversations at the same time without slowing down and without leaving anyone waiting.',
      },
      {
        id: 'voz',
        category: 'Voice agents',
        badge: 'Natural voice',
        question: 'What does the voice on phone calls sound like?',
        answer: 'It sounds like a person: Spanish as spoken in Spain, with its pauses and its intonation. On the demos page you can hear real samples and judge for yourself.',
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
        id: 'agenda',
        category: 'Integrations',
        badge: 'Automatic booking',
        question: 'Does it connect to the calendar I already use (Google Calendar, Booksy, and so on)?',
        answer: 'Yes. It checks the free slots in Google Calendar, Outlook, Booksy or Calendly before offering an appointment, and saves it straight there. It will not double-book the same hour.',
      },
      {
        id: 'crm',
        category: 'Integrations',
        badge: 'CRM and ERP',
        question: 'Can it integrate with my invoicing software or in-house system?',
        answer: 'Yes. We connect to your invoicing software, your management system or whatever your sector uses, so a customer\'s details never have to be entered twice.',
      },
      {
        id: 'fallo',
        category: 'Security and GDPR',
        badge: 'Handover to a person',
        question: 'What happens if the AI cannot answer, or the customer needs a person?',
        answer: 'It hands it to you. When the question goes beyond what it knows, or a person\'s judgement is needed, it alerts your team with a summary of the conversation and you carry on from there. It does not invent an answer to get itself out of trouble.',
      },
      {
        id: 'rgpd',
        category: 'Security and GDPR',
        badge: 'European GDPR',
        question: 'Does it comply with data protection law (GDPR)?',
        answer: 'Yes. The data is encrypted and held on European servers. Your customers\' data is not shared with anyone and is not used to train public models.',
      },
      {
        id: 'precio',
        category: 'Terms and timings',
        badge: 'Price',
        question: 'How much does it cost?',
        answer: 'It depends what we build: a WhatsApp agent does not cost the same as custom software for your business. We look at your case, tell you what is worth doing and what is not, and give you a fixed price before we start. The first meeting is free and commits you to nothing.',
      },
      {
        id: 'tiempo',
        category: 'Terms and timings',
        badge: '48-72 hours',
        question: 'How long until it is installed and running?',
        answer: 'An agent takes 48 to 72 working hours. We build it: we teach it your prices, your opening hours and your services, we test it, and we hand it over working. Custom software or a site takes longer, and we tell you the timeline before we start.',
      },
      {
        id: 'permanencia',
        category: 'Terms and timings',
        badge: 'No lock-in',
        question: 'Is there a contract or a minimum term?',
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
    enviar: 'Get started',
    enviando: 'Sending…',
    enviandoAviso: 'Sending the form',
    errores: {
      nombre: 'Tell us your name, or your business name.',
      emailFalta: 'We need an email address to reply to you.',
      emailMal: 'That email does not look right. Have another look.',
      mensajeCorto: 'Tell us a bit more -- two words is not enough to know where to start.',
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
    titulo: 'Three steps, no tangle',
    entradilla: 'From the first meeting to having it running. No surprises on the way.',
    lista: [
      {
        titulo: 'We look at how you work',
        texto:
          'You talk us through your day and we draw your business step by step. That is where the weekly repetition shows up.',
        etiqueta: 'A 30-minute meeting',
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
    etiqueta: 'Your panel',
    titulo: 'We do not leave you with a black box',
    texto:
      'Everything we build is run from one place, with your own username and password. You log in from your phone or your desk and see what is happening in your business without calling anyone.',
    pieCaptura: 'The first thing you see on logging in. The data is from a test account.',
    altCaptura:
      "Home screen of the DALSAT panel: the week's bookings, estimated revenue, unique customers, messages handled by the agent and average response time.",
    incluido: 'The panel is included with whatever you take on. No separate charge and nothing to install.',
    entrar: 'Already a customer? Log in to the panel',
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

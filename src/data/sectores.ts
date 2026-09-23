// Landings por sector: /sectores/{slug} y /en/sectores/{slug}.
//
// Reglas de contenido (las mismas que el resto de la web):
// - Nada de cifras, clientes ni resultados que no sean reales. Los chats son
//   EJEMPLOS y se marcan como tales en pantalla.
// - Solo se nombra a clientes reales (Víbora Studio, Atrio Asesores,
//   Beniabogados) y con la frase que ya aprobaron para la home.
// - Lo que se describe tiene que existir en la plataforma: el agente contesta
//   dudas con la información del negocio, manda el enlace de reservas (no
//   reserva él), recuerda la cita, pide la reseña después, pasa a una persona
//   cuando hace falta y el dueño puede pausarlo.
import type { Idioma } from '../i18n/config';

export interface MensajeChat {
  de: 'cliente' | 'agente';
  texto: string;
}

export interface PreguntaSector {
  question: string;
  answer: string;
}

export interface TextoSector {
  nombre: string;
  seoTitulo: string;
  seoDescripcion: string;
  h1: string;
  intro: string[];
  problemas: string[];
  comoAyuda: { titulo: string; texto: string }[];
  chat: MensajeChat[];
  preguntas: PreguntaSector[];
}

export interface Sector {
  slug: string;
  /** id de SatisfiedClients.tsx cuando hay un cliente real del sector */
  cliente?: 'vibora-studio' | 'atrio-asesores' | 'beniabogados';
  texto: Record<Idioma, TextoSector>;
}

export const SECTORES: Sector[] = [
  {
    slug: 'peluquerias-y-estetica',
    cliente: 'vibora-studio',
    texto: {
      es: {
        nombre: 'Peluquerías, estética y tatuaje',
        seoTitulo: 'Asistente de WhatsApp para peluquerías y centros de estética | DALSAT',
        seoDescripcion:
          'Un asistente que contesta el WhatsApp de tu peluquería, centro de estética o estudio mientras trabajas: precios, horarios y enlace para que el cliente reserve solo.',
        h1: 'Deja de soltar las tijeras para contestar el WhatsApp',
        intro: [
          'Mientras atiendes a un cliente, entran mensajes preguntando por precios, huecos y horarios. Si no contestas rápido, reservan en otro sitio.',
          'Tu asistente contesta al momento con tus servicios y tus precios, y manda el enlace para que el cliente elija día y hora sin llamarte.',
        ],
        problemas: [
          'Paras el trabajo para mirar el móvil, o contestas horas después.',
          'Por la noche y los domingos entran mensajes que nadie responde.',
          'Clientes que reservan y no aparecen sin avisar.',
          'Las mismas preguntas todo el día: cuánto cuesta, si hay hueco, dónde estáis.',
        ],
        comoAyuda: [
          { titulo: 'Contesta con tus datos', texto: 'Servicios, precios, horario y dirección: lo que tú pongas en tu panel, nada inventado.' },
          { titulo: 'El cliente reserva solo', texto: 'Le manda tu enlace de reservas y el cliente elige servicio, profesional, día y hora.' },
          { titulo: 'Recordatorio antes de la cita', texto: 'Un mensaje el día antes para que menos gente se olvide de venir.' },
          { titulo: 'Te pasa lo que es para ti', texto: 'Si el cliente necesita a una persona, te avisa y deja de contestar en esa conversación.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hola, ¿cuánto cuesta un corte y color? ¿Tenéis hueco esta semana?' },
          { de: 'agente', texto: '¡Hola! Corte y color son 55 €. Aquí puedes ver los huecos libres y reservar el que mejor te venga: [enlace de reservas]' },
          { de: 'cliente', texto: 'Perfecto, ¿y se puede pagar con tarjeta?' },
          { de: 'agente', texto: 'Sí, aceptamos tarjeta y Bizum. El día antes te llegará un recordatorio por aquí.' },
        ],
        preguntas: [
          {
            question: '¿Tengo que cambiar de número de WhatsApp?',
            answer: 'No. El asistente contesta en el mismo número de tu negocio, el que ya tienen tus clientes.',
          },
          {
            question: '¿Puede elegir el cliente con quién quiere la cita?',
            answer: 'Sí. En el enlace de reservas el cliente puede elegir profesional, y cada uno tiene su horario y los servicios que hace.',
          },
          {
            question: '¿Y si quiero contestar yo a un cliente concreto?',
            answer: 'Escribes tú desde el WhatsApp del negocio y el asistente se aparta de esa conversación durante un tiempo para no pisarte.',
          },
        ],
      },
      en: {
        nombre: 'Hair salons, beauty and tattoo studios',
        seoTitulo: 'WhatsApp assistant for hair salons and beauty centres | DALSAT',
        seoDescripcion:
          'An assistant that answers your salon, beauty centre or studio WhatsApp while you work: prices, opening hours and a link so customers book by themselves.',
        h1: 'Stop putting the scissors down to answer WhatsApp',
        intro: [
          'While you are with a customer, messages come in asking about prices, free slots and opening hours. If you do not reply quickly, they book somewhere else.',
          'Your assistant replies straight away with your services and prices, and sends the link so customers pick a day and time without calling you.',
        ],
        problemas: [
          'You stop working to check your phone, or reply hours later.',
          'Messages at night and on Sundays go unanswered.',
          'Customers who book and do not show up.',
          'The same questions all day: how much, any free slots, where are you.',
        ],
        comoAyuda: [
          { titulo: 'Answers with your details', texto: 'Services, prices, hours and address: whatever you put in your dashboard, nothing made up.' },
          { titulo: 'Customers book by themselves', texto: 'It sends your booking link and the customer picks the service, staff member, day and time.' },
          { titulo: 'Reminder before the appointment', texto: 'A message the day before so fewer people forget to come.' },
          { titulo: 'Passes you what needs you', texto: 'If the customer needs a person, it lets you know and stops replying in that conversation.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hi, how much is a cut and colour? Any free slots this week?' },
          { de: 'agente', texto: 'Hi! Cut and colour is €55. You can see the free slots and book the one that suits you here: [booking link]' },
          { de: 'cliente', texto: 'Great, can I pay by card?' },
          { de: 'agente', texto: 'Yes, we take card and Bizum. You will get a reminder here the day before.' },
        ],
        preguntas: [
          {
            question: 'Do I need a new WhatsApp number?',
            answer: 'No. The assistant replies on your business number, the one your customers already have.',
          },
          {
            question: 'Can customers choose who they book with?',
            answer: 'Yes. On the booking link customers can choose a staff member, and each one has their own hours and services.',
          },
          {
            question: 'What if I want to reply to a customer myself?',
            answer: 'Just write from the business WhatsApp and the assistant steps back from that conversation for a while so it does not talk over you.',
          },
        ],
      },
    },
  },
  {
    slug: 'autoescuelas',
    texto: {
      es: {
        nombre: 'Autoescuelas',
        seoTitulo: 'Asistente de WhatsApp para autoescuelas | DALSAT',
        seoDescripcion:
          'Un asistente que contesta el WhatsApp de tu autoescuela: precios del carnet, matrícula, clases teóricas y prácticas, y enlace para reservar clase con el profesor.',
        h1: 'Tu autoescuela contesta aunque estés dando una práctica',
        intro: [
          'Quien quiere sacarse el carnet pregunta lo mismo: cuánto cuesta, cómo se matricula, cuándo son las clases. Y casi siempre lo pregunta cuando estás en el coche.',
          'Tu asistente responde con tus tarifas y tus horarios, y los alumnos reservan sus prácticas con el profesor desde un enlace.',
        ],
        problemas: [
          'Llamadas y mensajes perdidos mientras das clase.',
          'Explicar una y otra vez precios, packs de prácticas y documentación.',
          'Cuadrar a mano la agenda de cada profesor.',
          'Alumnos que olvidan la práctica y el hueco se pierde.',
        ],
        comoAyuda: [
          { titulo: 'Resuelve las dudas de siempre', texto: 'Matrícula, precios, packs, documentación y horarios del teórico, con la información de tu autoescuela.' },
          { titulo: 'Prácticas con su profesor', texto: 'El alumno reserva desde el enlace y cada profesor tiene su propio horario.' },
          { titulo: 'Recordatorio de la práctica', texto: 'Aviso el día antes para que no se quede el coche parado.' },
          { titulo: 'Tú decides qué contesta', texto: 'Cambias precios o preguntas frecuentes desde tu panel y lo aplica al momento.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hola, ¿cuánto cuesta sacarse el carnet B con vosotros?' },
          { de: 'agente', texto: '¡Hola! La matrícula son 150 € e incluye el teórico online; las prácticas van aparte, sueltas o en pack. ¿Te paso los packs?' },
          { de: 'cliente', texto: 'Sí, y ¿cómo reservo las prácticas?' },
          { de: 'agente', texto: 'Desde este enlace eliges profesor, día y hora: [enlace de reservas]. Te recordamos la práctica el día antes.' },
        ],
        preguntas: [
          {
            question: '¿Puede cada profesor tener su horario?',
            answer: 'Sí. Cada profesor tiene sus días y horas, y el alumno solo ve los huecos libres del que elija.',
          },
          {
            question: '¿Contesta también por la noche?',
            answer: 'Sí, a cualquier hora. Lo que no sepa resolver con tu información te lo pasa para que lo veas tú.',
          },
          {
            question: '¿Y si cambio los precios?',
            answer: 'Los cambias en tu panel y el asistente empieza a usarlos en ese momento.',
          },
        ],
      },
      en: {
        nombre: 'Driving schools',
        seoTitulo: 'WhatsApp assistant for driving schools | DALSAT',
        seoDescripcion:
          'An assistant that answers your driving school WhatsApp: licence prices, enrolment, theory and driving lessons, and a link to book a lesson with an instructor.',
        h1: 'Your driving school answers even while you are giving a lesson',
        intro: [
          'People who want a licence ask the same things: how much, how to enrol, when are the classes. And they almost always ask while you are in the car.',
          'Your assistant replies with your prices and timetable, and students book driving lessons with their instructor from a link.',
        ],
        problemas: [
          'Missed calls and messages while you teach.',
          'Explaining prices, lesson packs and paperwork over and over.',
          'Juggling each instructor\'s schedule by hand.',
          'Students who forget the lesson and the slot is wasted.',
        ],
        comoAyuda: [
          { titulo: 'Answers the usual questions', texto: 'Enrolment, prices, packs, paperwork and theory hours, using your driving school\'s details.' },
          { titulo: 'Lessons with their instructor', texto: 'Students book from the link and each instructor has their own schedule.' },
          { titulo: 'Lesson reminder', texto: 'A message the day before so the car does not sit idle.' },
          { titulo: 'You decide what it says', texto: 'Change prices or FAQs in your dashboard and it uses them straight away.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hi, how much does it cost to get a car licence with you?' },
          { de: 'agente', texto: 'Hi! Enrolment is €150 and includes the online theory course; driving lessons are separate, single or in packs. Shall I send you the packs?' },
          { de: 'cliente', texto: 'Yes, and how do I book lessons?' },
          { de: 'agente', texto: 'From this link you choose instructor, day and time: [booking link]. We will remind you the day before.' },
        ],
        preguntas: [
          {
            question: 'Can each instructor have their own schedule?',
            answer: 'Yes. Each instructor has their own days and hours, and students only see the free slots of the one they choose.',
          },
          {
            question: 'Does it reply at night too?',
            answer: 'Yes, at any time. Anything it cannot answer with your information is passed to you.',
          },
          {
            question: 'What if I change my prices?',
            answer: 'Change them in your dashboard and the assistant starts using them immediately.',
          },
        ],
      },
    },
  },
  {
    slug: 'asesorias-y-gestorias',
    cliente: 'atrio-asesores',
    texto: {
      es: {
        nombre: 'Asesorías y gestorías',
        seoTitulo: 'Asistente de WhatsApp para asesorías y gestorías | DALSAT',
        seoDescripcion:
          'Un asistente que atiende el WhatsApp de tu asesoría: documentación para la Renta, plazos, servicios y cita con el asesor. A ti solo te llega el caso que hay que mirar.',
        h1: 'En campaña de Renta, que las mismas preguntas no te coman el día',
        intro: [
          'Qué documentos traigo, hasta cuándo hay plazo, cuánto cobráis por la declaración. En temporada alta el teléfono y el WhatsApp no paran.',
          'Tu asistente responde con la información de tu asesoría y pide cita con el asesor. A ti te llega lo que de verdad necesita a una persona.',
        ],
        problemas: [
          'Picos de mensajes en Renta, trimestres y cierres.',
          'Las mismas cuatro preguntas repetidas a todos los clientes.',
          'Citas que se cuadran por teléfono, una a una.',
          'Consultas que llegan fuera de horario y se acumulan para el lunes.',
        ],
        comoAyuda: [
          { titulo: 'Documentación y plazos', texto: 'Explica qué hay que traer y hasta cuándo, con lo que tú hayas preparado.' },
          { titulo: 'Cita con el asesor', texto: 'Manda el enlace para que el cliente reserve su cita en tu agenda.' },
          { titulo: 'Solo te llega lo importante', texto: 'Cuando la consulta necesita a un asesor, te la pasa con el resumen de la conversación.' },
          { titulo: 'Sabe lo que tú le enseñas', texto: 'Subes tus documentos y guías y los usa para contestar.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Buenas, ¿qué tengo que traer para hacer la Renta con vosotros?' },
          { de: 'agente', texto: '¡Hola! Tu DNI, el borrador o la referencia, certificados de retenciones y, si tienes vivienda, los datos catastrales. ¿Quieres pedir cita con un asesor?' },
          { de: 'cliente', texto: 'Sí, pero tengo una duda sobre una herencia.' },
          { de: 'agente', texto: 'Eso es mejor verlo con un asesor. Le paso tu caso para que te conteste él, y aquí tienes el enlace para reservar la cita: [enlace de reservas]' },
        ],
        preguntas: [
          {
            question: '¿Da asesoramiento fiscal?',
            answer: 'No. Informa de tus servicios, documentación y plazos con lo que tú le das, y cuando la consulta es de fondo te la pasa a ti.',
          },
          {
            question: '¿Puedo subirle nuestras guías?',
            answer: 'Sí. Subes documentos (PDF, Word, Excel) desde tu panel y los usa como información de referencia para contestar.',
          },
          {
            question: '¿Cómo me entero de los casos que me pasa?',
            answer: 'Te llega un aviso con el resumen y la conversación, y en tu panel ves todas las conversaciones pendientes.',
          },
        ],
      },
      en: {
        nombre: 'Accountancy and administrative firms',
        seoTitulo: 'WhatsApp assistant for accountancy and administrative firms | DALSAT',
        seoDescripcion:
          'An assistant that handles your firm\'s WhatsApp: tax return paperwork, deadlines, services and appointments with an adviser. Only the cases that need you reach you.',
        h1: 'In tax season, stop losing the day to the same questions',
        intro: [
          'What do I need to bring, what is the deadline, how much is the tax return. In peak season the phone and WhatsApp never stop.',
          'Your assistant replies with your firm\'s information and books appointments with an adviser. What really needs a person comes to you.',
        ],
        problemas: [
          'Message peaks at tax season, quarter ends and year ends.',
          'The same four questions repeated to every client.',
          'Appointments arranged by phone, one by one.',
          'Out-of-hours questions piling up for Monday.',
        ],
        comoAyuda: [
          { titulo: 'Paperwork and deadlines', texto: 'Explains what to bring and by when, using what you have prepared.' },
          { titulo: 'Appointment with an adviser', texto: 'Sends the link so the client books into your diary.' },
          { titulo: 'Only what matters reaches you', texto: 'When a question needs an adviser, it passes it on with a summary of the conversation.' },
          { titulo: 'Knows what you teach it', texto: 'Upload your documents and guides and it uses them to reply.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hi, what do I need to bring to do my tax return with you?' },
          { de: 'agente', texto: 'Hi! Your ID, the draft return or reference, withholding certificates and, if you own a home, the land registry details. Would you like to book an adviser?' },
          { de: 'cliente', texto: 'Yes, but I have a question about an inheritance.' },
          { de: 'agente', texto: 'That is best looked at with an adviser. I will pass your case on so they can reply, and here is the link to book: [booking link]' },
        ],
        preguntas: [
          {
            question: 'Does it give tax advice?',
            answer: 'No. It explains your services, paperwork and deadlines using what you give it, and passes in-depth questions on to you.',
          },
          {
            question: 'Can I upload our guides?',
            answer: 'Yes. Upload documents (PDF, Word, Excel) from your dashboard and it uses them as reference to reply.',
          },
          {
            question: 'How do I find out about the cases it passes on?',
            answer: 'You get a notification with the summary and the conversation, and your dashboard shows every pending conversation.',
          },
        ],
      },
    },
  },
  {
    slug: 'despachos-de-abogados',
    cliente: 'beniabogados',
    texto: {
      es: {
        nombre: 'Despachos de abogados',
        seoTitulo: 'Web y asistente de WhatsApp para despachos de abogados | DALSAT',
        seoDescripcion:
          'Web clara y un asistente que atiende el WhatsApp de tu despacho: áreas de práctica, honorarios de la primera consulta y cita con el abogado. Lo delicado siempre pasa a una persona.',
        h1: 'Que tu despacho se explique solo antes de que llamen',
        intro: [
          'Quien busca abogado quiere saber rápido si llevas su tipo de asunto, cuánto cuesta la primera consulta y cuándo puede verte.',
          'Tu web y tu asistente lo responden por ti, y cualquier consulta sobre el caso concreto pasa directamente a un abogado.',
        ],
        problemas: [
          'Explicar el despacho por teléfono, cliente a cliente.',
          'Consultas que llegan a cualquier hora y se quedan sin respuesta.',
          'Tiempo perdido en llamadas que no son de tu especialidad.',
          'Una web que no cuenta bien qué hacéis.',
        ],
        comoAyuda: [
          { titulo: 'Áreas y primera consulta', texto: 'Explica en qué trabajáis y cómo es la primera consulta, con vuestros datos.' },
          { titulo: 'Cita con el abogado', texto: 'Manda el enlace para reservar la primera consulta en vuestra agenda.' },
          { titulo: 'Lo del caso, a una persona', texto: 'No opina sobre asuntos concretos: los pasa al despacho con el resumen.' },
          { titulo: 'Web que trabaja', texto: 'Una web clara, rápida y conectada con el asistente.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hola, ¿lleváis temas de despidos? ¿Cuánto cuesta la primera consulta?' },
          { de: 'agente', texto: 'Hola. Sí, llevamos derecho laboral, incluidos despidos. La primera consulta cuesta 50 € y dura unos 45 minutos. ¿Quieres reservarla?' },
          { de: 'cliente', texto: 'Sí. Me despidieron ayer, ¿tengo derecho a indemnización?' },
          { de: 'agente', texto: 'Eso tiene que valorarlo un abogado con tu caso. Le paso tu consulta y puedes reservar aquí la primera cita: [enlace de reservas]' },
        ],
        preguntas: [
          {
            question: '¿El asistente da consejos legales?',
            answer: 'No. Informa sobre el despacho, sus áreas y cómo pedir cita. Cualquier pregunta sobre un caso concreto la pasa a un abogado.',
          },
          {
            question: '¿Hacéis también la web del despacho?',
            answer: 'Sí. Hacemos webs claras y rápidas, conectadas con el asistente, y si hace falta también la imagen del despacho.',
          },
          {
            question: '¿Quién ve las conversaciones?',
            answer: 'Las ves tú desde tu panel. Los datos de cada despacho están separados de los de los demás negocios.',
          },
        ],
      },
      en: {
        nombre: 'Law firms',
        seoTitulo: 'Website and WhatsApp assistant for law firms | DALSAT',
        seoDescripcion:
          'A clear website and an assistant that handles your firm\'s WhatsApp: practice areas, first consultation fees and booking with a lawyer. Anything sensitive always goes to a person.',
        h1: 'Let your firm explain itself before people call',
        intro: [
          'People looking for a lawyer want to know quickly whether you handle their kind of case, how much the first consultation costs and when they can see you.',
          'Your website and your assistant answer that for you, and any question about a specific case goes straight to a lawyer.',
        ],
        problemas: [
          'Explaining the firm over the phone, client by client.',
          'Enquiries arriving at any hour and going unanswered.',
          'Time lost on calls outside your specialism.',
          'A website that does not explain what you do.',
        ],
        comoAyuda: [
          { titulo: 'Areas and first consultation', texto: 'Explains what you work on and how the first consultation works, with your details.' },
          { titulo: 'Appointment with a lawyer', texto: 'Sends the link to book the first consultation in your diary.' },
          { titulo: 'Case questions go to a person', texto: 'It never comments on specific cases: it passes them to the firm with a summary.' },
          { titulo: 'A website that works', texto: 'A clear, fast website connected to the assistant.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hi, do you handle dismissals? How much is the first consultation?' },
          { de: 'agente', texto: 'Hello. Yes, we handle employment law, including dismissals. The first consultation is €50 and lasts about 45 minutes. Would you like to book it?' },
          { de: 'cliente', texto: 'Yes. I was dismissed yesterday, am I entitled to compensation?' },
          { de: 'agente', texto: 'A lawyer needs to assess that with your case. I will pass your question on, and you can book the first appointment here: [booking link]' },
        ],
        preguntas: [
          {
            question: 'Does the assistant give legal advice?',
            answer: 'No. It gives information about the firm, its areas and how to book. Any question about a specific case goes to a lawyer.',
          },
          {
            question: 'Do you build the firm\'s website too?',
            answer: 'Yes. We build clear, fast websites connected to the assistant and, if needed, the firm\'s visual identity.',
          },
          {
            question: 'Who sees the conversations?',
            answer: 'You do, from your dashboard. Each firm\'s data is kept separate from every other business.',
          },
        ],
      },
    },
  },
  {
    slug: 'clinicas',
    texto: {
      es: {
        nombre: 'Clínicas y centros de salud',
        seoTitulo: 'Asistente de WhatsApp para clínicas, fisioterapia y dentistas | DALSAT',
        seoDescripcion:
          'Un asistente que atiende el WhatsApp de tu clínica: tratamientos, precios, horarios y enlace para pedir cita, con recordatorio el día antes. Nunca da consejo médico.',
        h1: 'Tu recepción, contestando también fuera de horario',
        intro: [
          'Los pacientes escriben para pedir cita, cambiarla o preguntar precios, muchas veces cuando la clínica ya ha cerrado.',
          'Tu asistente responde con la información de tu clínica y manda el enlace para pedir cita. Cualquier duda médica la pasa a vuestro equipo.',
        ],
        problemas: [
          'Recepción saturada entre llamadas, pacientes y WhatsApp.',
          'Mensajes fuera de horario que se contestan al día siguiente.',
          'Huecos perdidos por pacientes que no avisan.',
          'Preguntas repetidas sobre precios, seguros y tratamientos.',
        ],
        comoAyuda: [
          { titulo: 'Información de tu clínica', texto: 'Tratamientos, precios, horarios y cómo llegar, con lo que tú configures.' },
          { titulo: 'Cita en un enlace', texto: 'El paciente elige profesional, día y hora; puede cancelar desde el mismo sitio.' },
          { titulo: 'Recordatorio el día antes', texto: 'Para que se olviden menos citas y el hueco se pueda aprovechar.' },
          { titulo: 'Sin consejo médico', texto: 'Las dudas de salud pasan siempre a vuestro equipo.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hola, ¿cuánto cuesta una sesión de fisioterapia? ¿Tenéis cita mañana?' },
          { de: 'agente', texto: '¡Hola! La sesión de fisioterapia son 40 €. Aquí ves los huecos libres y reservas directamente: [enlace de reservas]' },
          { de: 'cliente', texto: 'Genial. Por cierto, ¿es normal que me duela más después de la primera sesión?' },
          { de: 'agente', texto: 'Eso es mejor que te lo diga tu fisioterapeuta. Le paso tu pregunta para que te conteste él.' },
        ],
        preguntas: [
          {
            question: '¿El asistente contesta dudas médicas?',
            answer: 'No. Informa de la clínica, precios y citas. Cualquier pregunta de salud la pasa a vuestro equipo.',
          },
          {
            question: '¿Puede el paciente cancelar o cambiar la cita?',
            answer: 'Sí. Desde el enlace de sus reservas, y a vosotros os llega el aviso de la cancelación.',
          },
          {
            question: '¿Y los datos de los pacientes?',
            answer: 'Los datos de cada clínica están separados de los del resto de negocios, y solo accede nuestro equipo cuando hace falta para darte soporte.',
          },
        ],
      },
      en: {
        nombre: 'Clinics and health centres',
        seoTitulo: 'WhatsApp assistant for clinics, physiotherapy and dentists | DALSAT',
        seoDescripcion:
          'An assistant that handles your clinic\'s WhatsApp: treatments, prices, opening hours and a link to book, with a reminder the day before. It never gives medical advice.',
        h1: 'Your front desk, answering out of hours too',
        intro: [
          'Patients message to book, change appointments or ask about prices, often when the clinic is already closed.',
          'Your assistant replies with your clinic\'s information and sends the booking link. Any medical question goes to your team.',
        ],
        problemas: [
          'A front desk juggling calls, patients and WhatsApp.',
          'Out-of-hours messages answered the next day.',
          'Slots lost to patients who do not cancel.',
          'Repeated questions about prices, insurance and treatments.',
        ],
        comoAyuda: [
          { titulo: 'Your clinic\'s information', texto: 'Treatments, prices, opening hours and directions, as you set them up.' },
          { titulo: 'Booking in one link', texto: 'Patients choose practitioner, day and time, and can cancel from the same place.' },
          { titulo: 'Reminder the day before', texto: 'So fewer appointments are forgotten and slots can be reused.' },
          { titulo: 'No medical advice', texto: 'Health questions always go to your team.' },
        ],
        chat: [
          { de: 'cliente', texto: 'Hi, how much is a physiotherapy session? Any appointments tomorrow?' },
          { de: 'agente', texto: 'Hi! A physiotherapy session is €40. You can see free slots and book directly here: [booking link]' },
          { de: 'cliente', texto: 'Great. By the way, is it normal to hurt more after the first session?' },
          { de: 'agente', texto: 'Your physiotherapist is the right person to answer that. I will pass your question on so they can reply.' },
        ],
        preguntas: [
          {
            question: 'Does the assistant answer medical questions?',
            answer: 'No. It gives information about the clinic, prices and appointments. Any health question goes to your team.',
          },
          {
            question: 'Can patients cancel or change their appointment?',
            answer: 'Yes, from their bookings link, and you are notified of the cancellation.',
          },
          {
            question: 'What about patient data?',
            answer: 'Each clinic\'s data is kept separate from other businesses, and our team only accesses it when needed to give you support.',
          },
        ],
      },
    },
  },
];

export const rutaSector = (slug: string) => `/sectores/${slug}`;

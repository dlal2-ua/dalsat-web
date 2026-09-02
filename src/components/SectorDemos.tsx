import { useState, useEffect, useRef } from 'react';

interface SectorDemo {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  whatsappMessage: string;
  chatMessages: { sender: 'user' | 'bot'; text: string; time: string }[];
}

const SECTORS: SectorDemo[] = [
  {
    id: 'tattoo',
    name: 'Tatuajes & Estética',
    icon: '',
    badge: 'Caso Víbora Studio',
    description: 'Reserva de citas, consulta de estilos, precios orientativos y disponibilidad de agenda sin interrumpir el trabajo.',
    whatsappMessage: 'Hola, me gustaría probar la demo de IA para un estudio de Tatuajes y Estética.',
    chatMessages: [
      { sender: 'user', text: '¡Buenas! Quería saber si tenéis hueco para un tatuaje pequeño en el brazo esta semana.', time: '17:40' },
      { sender: 'bot', text: '¡Hola! Sí, tenemos hueco libre este jueves a las 11:30h o el viernes a las 16:00h. ¿Cuál te viene mejor para agendar la cita?', time: '17:40' },
      { sender: 'user', text: 'El viernes a las 16:00 me va perfecto ', time: '17:41' },
      { sender: 'bot', text: '¡Genial! Cita reservada para el viernes 16:00h. Te enviamos la ubicación y recordatorio 24h antes. ', time: '17:41' },
    ],
  },
  {
    id: 'restaurante',
    name: 'Restauración & Hostelería',
    icon: '',
    badge: 'Restaurantes',
    description: 'Reservas de mesas en terraza/comedor, consulta de carta, alérgenos y horarios automáticos 24/7.',
    whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Restaurante u Hostelería.',
    chatMessages: [
      { sender: 'user', text: 'Hola, me gustaría reservar una mesa para 4 personas este sábado por la noche.', time: '21:15' },
      { sender: 'bot', text: '¡Hola! Disponemos de mesa libre en comedor interior a las 21:30h o en terraza a las 22:15h. ¿En qué zona prefieres?', time: '21:15' },
      { sender: 'user', text: 'En terraza a las 22:15h por favor.', time: '21:16' },
      { sender: 'bot', text: '¡Mesa en terraza para 4 a las 22:15h reservada a tu nombre! Nos vemos el sábado. ', time: '21:16' },
    ],
  },
  {
    id: 'salud',
    name: 'Clínicas & Salud',
    icon: '',
    badge: 'Clínicas & Médicos',
    description: 'Citas médicas, odontológicas o fisioterapia con recordatorios automáticos para reducir plantones a cero.',
    whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Clínica o Centro de Salud.',
    chatMessages: [
      { sender: 'user', text: 'Hola, necesito cita con el fisioterapeuta para un dolor de espalda.', time: '10:05' },
      { sender: 'bot', text: '¡Hola! Disponemos de consulta libre mañana a las 10:15h o el jueves a las 17:00h. ¿Te agendamos la de mañana?', time: '10:05' },
      { sender: 'user', text: 'Sí, mañana a las 10:15h perfecto.', time: '10:06' },
      { sender: 'bot', text: 'Cita confirmada para mañana a las 10:15h. Recibirás un aviso 2h antes. ¡Que te mejore la espalda! ', time: '10:06' },
    ],
  },
  {
    id: 'asesoria',
    name: 'Asesorías & Servicios',
    icon: '',
    badge: 'Caso Atrio Asesores',
    description: 'Atención de dudas sobre facturación, Renta, documentación de clientes y cita directa con el especialista.',
    whatsappMessage: 'Hola, me gustaría probar la demo de IA para mi Asesoría o Gestoría.',
    chatMessages: [
      { sender: 'user', text: 'Buenas, ¿qué documentación necesito aportar para la campaña de la Renta?', time: '12:30' },
      { sender: 'bot', text: '¡Hola! Necesitaremos tu borrador, certificado de retenciones y datos catastrales. ¿Te agendo cita con tu asesor fiscal?', time: '12:30' },
      { sender: 'user', text: 'Sí por favor, para la semana que viene.', time: '12:31' },
      { sender: 'bot', text: 'Te he reservado cita con tu asesor para el martes a las 11:00h. Te enviamos el listado detallado de documentos a tu email. ', time: '12:31' },
    ],
  },
];

export default function SectorDemos() {
  const [activeId, setActiveId] = useState<string>(SECTORS[0].id);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const activeSector = SECTORS.find((s) => s.id === activeId) || SECTORS[0];
  const whatsappUrl = `https://api.whatsapp.com/send?phone=34646005171&text=${encodeURIComponent(activeSector.whatsappMessage)}`;

  const handleSelectSector = (id: string) => {
    setActiveId(id);
    // En pantallas móviles, desplazar suavemente la vista hasta el chat simulado
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  // Animación secuencial de mensajes saliendo uno a uno
  useEffect(() => {
    // Limpiar temporizadores anteriores
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];

    setVisibleCount(1);
    setIsTyping(false);

    // Secuencia de tiempos para que los mensajes salgan de forma orgánica
    const totalMsgs = activeSector.chatMessages.length;

    const scheduleStep = (stepIdx: number, delayMs: number, typing: boolean) => {
      const t = setTimeout(() => {
        setIsTyping(typing);
        if (!typing) {
          setVisibleCount(stepIdx + 1);
        }
      }, delayMs);
      timerRef.current.push(t);
    };

    // Mensaje 1 (Usuario) ya sale visible
    // Mensaje 2 (Bot): escribir en 600ms, salir a los 1400ms
    scheduleStep(1, 600, true);
    scheduleStep(1, 1500, false);

    // Mensaje 3 (Usuario): salir a los 2600ms
    if (totalMsgs > 2) {
      scheduleStep(2, 2700, false);
    }

    // Mensaje 4 (Bot): escribir a los 3500ms, salir a los 4400ms
    if (totalMsgs > 3) {
      scheduleStep(3, 3500, true);
      scheduleStep(3, 4400, false);
    }

    return () => {
      timerRef.current.forEach((t) => clearTimeout(t));
    };
  }, [activeId, activeSector]);

  return (
    <section id="demos-sector" className="relative py-20 sm:py-28 bg-navy-900 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-cian/15 via-cian-dark/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Prueba en Tu Sector
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Demostración por Sector
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Selecciona tu tipo de negocio y observa la simulación en tiempo real.
          </p>
        </div>

        {/* Pestañas de Selección de Sector */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10">
          {SECTORS.map((sector) => {
            const isSelected = sector.id === activeId;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => handleSelectSector(sector.id)}
                className={`px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-white/[0.15] to-white/[0.05] border-cian text-white shadow-[0_0_25px_rgba(20,205,236,0.3)] scale-105'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{sector.icon}</span>
                <span>{sector.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta del Chat Simulado e Información del Sector */}
        <div className="bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-white/[0.01] border border-cian/40 rounded-3xl p-6 sm:p-10 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Información del Sector */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono">
                <span>{activeSector.icon}</span>
                <span>{activeSector.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Agente de IA para {activeSector.name}
              </h3>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                {activeSector.description}
              </p>

              {/* Botón Prominente para Probar en su propio móvil */}
              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-terracota hover:bg-terracota-dark text-white font-extrabold px-7 py-4 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(217,100,44,0.35)] hover:scale-105 text-sm w-full sm:w-auto cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Probar esta demo en mi WhatsApp en vivo →
                </a>
              </div>

            </div>

            {/* Columna Derecha: Chat Simulado con Animación Secuencial */}
            <div ref={chatRef} className="lg:col-span-6 bg-navy-950 border border-whatsapp-green/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-3 font-sans min-h-[320px] flex flex-col justify-between">
              
              {/* Cabecera del chat */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-whatsapp-green to-whatsapp-dark flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {activeSector.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">Agente Dalsat ({activeSector.name})</div>
                    <div className="text-[10px] text-cian font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cian animate-ping" />
                      {isTyping ? 'Escribiendo respuesta...' : 'En línea, Respuesta inmediata'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(1);
                    setIsTyping(false);
                    setTimeout(() => {
                      setIsTyping(true);
                      setTimeout(() => { setIsTyping(false); setVisibleCount(2); }, 900);
                    }, 300);
                  }}
                  className="text-[10px] bg-black/40 hover:bg-black/70 text-cian border border-cian/30 px-2 py-1 rounded font-mono transition-colors cursor-pointer"
                >
                  ↻ Repetir Demo
                </button>
              </div>

              {/* Mensajes del chat saliendo progresivamente */}
              <div className="space-y-3 py-2 flex-grow overflow-y-auto">
                {activeSector.chatMessages.slice(0, visibleCount).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} transition-all duration-500 animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow ${
                        msg.sender === 'user'
                          ? 'bg-white/10 text-white border border-white/15 rounded-tr-none'
                          : 'bg-whatsapp-incoming text-white border border-emerald-500/40 rounded-tl-none shadow-[0_4px_15px_rgba(0,92,75,0.4)]'
                      }`}
                    >
                      {msg.text}
                      <div className={`text-[9px] font-mono mt-1 text-right ${msg.sender === 'user' ? 'text-white/40' : 'text-emerald-200'}`}>
                        {msg.time} {msg.sender === 'bot' && <span className="text-cian-light font-bold ml-1"></span>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Indicador de "Escribiendo..." */}
                {isTyping && (
                  <div className="flex flex-col items-start animate-fadeIn">
                    <div className="bg-whatsapp-incoming/80 text-emerald-200 border border-emerald-500/30 rounded-2xl rounded-tl-none px-3.5 py-2 text-xs flex items-center gap-1.5">
                      <span className="text-[10px] font-mono">Agente IA redactando</span>
                      <span className="flex gap-1 ml-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';

interface ServiceNode {
  id: string;
  code: string;
  shortName: string;
  title: string;
  subtitle: string;
  category: string;
  colorTheme: string;
  glowColor: string;
  borderColor: string;
  description: string;
  highlights: string[];
  metrics: { label: string; val: string }[];
  simulatorType: 'whatsapp' | 'escalation' | 'reminders' | 'analytics';
}

const SERVICES: ServiceNode[] = [
  {
    id: 'whatsapp',
    code: 'SYS-01',
    shortName: 'WhatsApp IA',
    title: 'Agente WhatsApp 24/7',
    subtitle: 'Atención y ventas autónomas por chat.',
    category: 'IA Conversacional',
    colorTheme: 'from-[#25D366] via-[#10B981] to-[#059669]',
    glowColor: 'rgba(37, 211, 102, 0.35)',
    borderColor: 'border-[#25D366]/60',
    description: 'Responde dudas, consulta catálogo y cierra ventas en segundos sin intervención humana.',
    highlights: ['Latencia < 1.8s', 'Cero colas', 'Paso a humano'],
    metrics: [{ label: 'Conversión', val: '+38%' }, { label: 'Ahorro', val: '85%' }],
    simulatorType: 'whatsapp',
  },
  {
    id: 'escalation',
    code: 'SYS-02',
    shortName: 'Escalado Humano',
    title: 'Escalado Inteligente a Humano',
    subtitle: 'La IA resuelve el 90%; tú intervienes solo cuando es clave.',
    category: 'Atención Híbrida',
    colorTheme: 'from-[#38BDF8] via-[#0EA5E9] to-[#0284C7]',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'border-[#38BDF8]/60',
    description: 'Transfiere consultas complejas con un resumen instantáneo para que tu equipo tome el mando al segundo.',
    highlights: ['Resumen IA previo', 'Traspaso fluido', 'Control total'],
    metrics: [{ label: 'Autonomía', val: '92%' }, { label: 'Traspaso', val: '0.2s' }],
    simulatorType: 'escalation',
  },
  {
    id: 'reminders',
    code: 'SYS-03',
    shortName: 'Recordatorios',
    title: 'Recordatorios de Reservas',
    subtitle: 'Avisos automáticos para que no olviden su cita.',
    category: 'Fidelización',
    colorTheme: 'from-[#FBBF24] via-[#F59E0B] to-[#D97706]',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    borderColor: 'border-[#FBBF24]/60',
    description: 'Envía alertas por WhatsApp antes de su cita para confirmar asistencia y reducir olvidos.',
    highlights: ['Aviso 24h/1h', 'Cero olvidos', 'Confirmación 1 clic'],
    metrics: [{ label: 'Asistencia', val: '99.8%' }, { label: 'Olvidos', val: '-95%' }],
    simulatorType: 'reminders',
  },
  {
    id: 'analytics',
    code: 'SYS-04',
    shortName: 'Reportes BI',
    title: 'Reportes Ejecutivos',
    subtitle: 'Métricas clave en tu WhatsApp.',
    category: 'Analítica',
    colorTheme: 'from-[#38BDF8] via-[#0EA5E9] to-[#0284C7]',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'border-[#38BDF8]/60',
    description: 'Recibe cada semana un resumen con ventas cerradas por IA, horarios pico y nuevas tendencias.',
    highlights: ['KPIs directos', 'Tendencias', 'Cálculo ROI'],
    metrics: [{ label: 'Precisión', val: '99.9%' }, { label: 'Envío', val: 'Semanal' }],
    simulatorType: 'analytics',
  },
];

export default function ServiceTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const lastScrollY = useRef(0);

  // Escuchador de scroll para cambiar automáticamente las soluciones al bajar
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Si el usuario hace scroll manual en la página, cancelamos el clic manual para retomar el scroll automático
      if (Math.abs(window.scrollY - lastScrollY.current) > 15 && manualIndex !== null) {
        setManualIndex(null);
      }
      lastScrollY.current = window.scrollY;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      
      if (totalScroll <= 0) return;
      
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [manualIndex]);

  const scrollIdx = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(progress * SERVICES.length)));
  const activeTab = manualIndex !== null ? manualIndex : scrollIdx;
  const active = SERVICES[activeTab] || SERVICES[0];

  // Efecto visual de escritura en el simulador al cambiar de pestaña
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 2000);
    
    // Auto-scroll horizontal de la barra móvil para que la pestaña activa siempre sea visible sin saltar en vertical
    if (swiperRef.current) {
      const container = swiperRef.current;
      const activeBtn = container.children[activeTab] as HTMLElement;
      if (activeBtn) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const scrollLeft = container.scrollLeft + (btnRect.left - containerRect.left) - (containerRect.width / 2) + (btnRect.width / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section id="servicios" ref={containerRef} className="relative h-[450vh] bg-[#000814] border-b border-white/10">
      
      {/* Contenedor Sticky que se queda fijo mientras haces scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 py-4">
        
        {/* Malla y luz de fondo reactiva al servicio actual */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 ease-out opacity-35"
          style={{ background: `radial-gradient(circle, ${active.glowColor} 0%, transparent 70%)` }}
        />

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center justify-center">
          
          {/* Cabecera */}
          <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-8 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-md mb-2 sm:mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E0FF]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-[#00E0FF]">
                Simulador IA En Vivo
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-1 sm:mb-3">
              Centro de Mando <span className="bg-gradient-to-r from-[#00E0FF] via-[#7C6BD6] to-[#FF00E5] bg-clip-text text-transparent">En Vivo</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-base hidden sm:block font-light">
              Explora en tiempo real cómo nuestros agentes gestionan y ejecutan procesos automáticamente.
            </p>
          </div>

          {/* Contenedor Principal de Simulación (Pantalla completa y limpia) */}
          <div className="w-full">
            <div 
              key={active.id}
              className={`w-full bg-[#001026] border-2 ${active.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-between overflow-hidden transition-all duration-700 ${activeTab % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'}`}
              style={{ boxShadow: `0 0 60px -10px ${active.glowColor}` }}
            >
              {/* Barra de Progreso Láser Superior */}
              <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-white/10 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${active.colorTheme} transition-all duration-700 shadow-[0_0_15px_white]`}
                  style={{ width: `${((activeTab + 1) / SERVICES.length) * 100}%` }}
                />
              </div>
              
              {/* Cabecera del terminal */}
              <div className="pt-1 sm:pt-2">
                <div className="flex items-center justify-between gap-3 pb-3 sm:pb-5 border-b border-white/15 mb-4 sm:mb-6 flex-wrap">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 bg-black/40 px-2.5 py-1.5 rounded-full border border-white/15 shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-black tracking-widest text-[#00E0FF] bg-[#00E0FF]/10 px-3 py-1 rounded-lg border border-[#00E0FF]/30 shadow-[0_0_15px_rgba(0,224,255,0.25)]">
                      SISTEMA ACTIVO // {activeTab + 1} DE 4
                    </span>
                  </div>

                  {/* Indicadores cibernéticos de paso (1, 2, 3, 4) */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
                    {SERVICES.map((s, idx) => (
                      <div 
                        key={s.id}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                          idx === activeTab 
                            ? `w-8 sm:w-12 bg-gradient-to-r ${s.colorTheme} shadow-[0_0_12px_white]` 
                            : idx < activeTab 
                              ? 'w-2 sm:w-3 bg-white/40' 
                              : 'w-2 sm:w-3 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 ml-auto order-2 sm:order-3">
                    {active.metrics.map((m, i) => (
                      <div key={i} className="bg-black/50 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-white/15 text-right shadow">
                        <span className="text-[8px] sm:text-[10px] text-white/60 uppercase font-extrabold block tracking-wider">{m.label}</span>
                        <span className={`text-xs sm:text-base font-black bg-gradient-to-r ${active.colorTheme} bg-clip-text text-transparent font-mono`}>{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="mb-2 sm:mb-3 opacity-0 animate-[fadeIn_0.8s_ease-out_0.25s_forwards]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/30">
                      {active.code}
                    </span>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60">
                      {active.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-1">
                    {active.title}
                  </h3>
                  <div className="text-sm sm:text-lg font-bold text-[#00E0FF] leading-snug">
                    {active.subtitle}
                  </div>
                </div>
                <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-5 opacity-0 animate-[fadeIn_0.8s_ease-out_0.35s_forwards]">
                  {active.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 opacity-0 animate-[fadeIn_0.8s_ease-out_0.45s_forwards]">
                  {active.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${active.colorTheme}`} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* BANCO DE SIMULACIÓN VISUAL */}
              <div className="mt-auto pt-3 sm:pt-5 border-t border-white/10 bg-[#00040A]/90 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/15 shadow-inner relative overflow-hidden opacity-0 animate-[fadeIn_0.9s_ease-out_0.5s_forwards]">
                <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono uppercase tracking-wider text-white/40 mb-2.5 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-[#00E0FF] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] animate-ping" />
                    SIMULACIÓN EN VIVO
                  </span>
                  <span>LATENCIA: 11ms</span>
                </div>

                {/* 1. WHATSAPP SIMULADOR */}
                {active.simulatorType === 'whatsapp' && (
                  <div className="space-y-2 font-sans text-xs sm:text-sm">
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-2 sm:p-2.5 max-w-[85%] text-white border border-white/10 shadow flex gap-2 items-start animate-fadeIn">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shrink-0 flex items-center justify-center font-bold text-white text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[9px] mb-0.5">Cliente (WhatsApp)</div>
                        ¿Hola! ¿Mesa libre en terraza hoy a las 22:00? Somos 4.
                      </div>
                    </div>

                    {isTyping ? (
                      <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 max-w-[60%] ml-auto text-white shadow border border-emerald-500/30 flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-mono text-emerald-200">Agente IA escribiendo</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40 animate-fadeIn">
                        <div className="font-bold text-emerald-300 text-[9px] mb-0.5 flex items-center justify-between">
                          <span>🤖 Agente Dalsat IA</span>
                          <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">0.4s</span>
                        </div>
                        ¡Hola Carlos! Sí, queda la última mesa en terraza exterior a las 22:00. Reservada a tu nombre. ¡Te esperamos! 🍽️✨
                        <div className="text-[9px] text-emerald-200 mt-1 text-right flex items-center justify-end gap-1 font-mono">
                          WhatsApp API <span className="text-cyan-300 font-extrabold text-xs">✓✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ESCALADO A HUMANO SIMULADOR */}
                {active.simulatorType === 'escalation' && (
                  <div className="space-y-2 font-sans text-xs sm:text-sm animate-fadeIn">
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-2 sm:p-2.5 max-w-[85%] text-white border border-white/10 shadow flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 shrink-0 flex items-center justify-center font-bold text-white text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[9px] mb-0.5">Cliente (Taller Mecánico)</div>
                        Hola, hace ruido al frenar y mañana tengo ITV. ¿Podéis verlo hoy urgente?
                      </div>
                    </div>

                    <div className="bg-amber-500/20 rounded-xl p-1.5 sm:p-2 border border-amber-500/40 text-amber-200 text-[10px] sm:text-xs font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="font-bold text-amber-300">⚡ ALERTA IA:</span> Urgencia pre-ITV.
                      </span>
                      <span className="bg-amber-500/30 px-1.5 py-0.5 rounded text-white font-bold text-[9px]">Aviso a Jefe Taller</span>
                    </div>

                    <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40">
                      <div className="font-bold text-emerald-300 text-[9px] mb-0.5 flex items-center justify-between">
                        <span>🤖 Agente Dalsat IA</span>
                        <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">0.2s</span>
                      </div>
                      ¡Anotado! Al ser urgencia de ITV, he avisado a Marcos (Jefe de Taller) para hacerte hueco. Te confirma ahora 👇
                    </div>

                    {isTyping ? (
                      <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl rounded-tr-none p-2 max-w-[70%] ml-auto text-white shadow border border-blue-400/50 flex items-center gap-2 justify-end animate-fadeIn">
                        <span className="text-[10px] font-mono text-sky-200">🔧 Marcos revisando elevadores...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-blue-400/50 animate-fadeIn">
                        <div className="font-bold text-sky-200 text-[9px] mb-0.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">🔧 Marcos (Jefe Taller) <span className="bg-sky-400/20 text-sky-200 px-1 py-0.5 rounded text-[8px] font-mono">En Taller</span></span>
                          <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">Ahora</span>
                        </div>
                        ¡Visto! Tráelo a las 10:30 al elevador 2. Cambiamos pastillas y listo para la ITV hoy mismo. 🚗💨
                      </div>
                    )}
                  </div>
                )}

                {/* 3. RECORDATORIOS SIMULADOR */}
                {active.simulatorType === 'reminders' && (
                  <div className="space-y-2 font-sans text-xs sm:text-sm animate-fadeIn">
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-amber-500/30 flex items-center justify-between text-white/90 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1.5 font-mono">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="font-bold text-amber-300">SISTEMA:</span> Cita médica mañana 10:15 (Dr. López)
                      </span>
                      <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200 font-bold text-[9px]">Disparador 24h</span>
                    </div>

                    {isTyping ? (
                      <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 max-w-[60%] ml-auto text-white shadow border border-emerald-500/30 flex items-center gap-2 justify-end animate-fadeIn">
                        <span className="text-[10px] font-mono text-emerald-200">Agente IA redactando aviso...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40">
                          <div className="font-bold text-emerald-300 text-[9px] mb-0.5 flex items-center justify-between">
                            <span>🤖 Agente Dalsat IA (Clínica)</span>
                            <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">09:00</span>
                          </div>
                          ¡Hola Carlos! Recordatorio: consulta mañana 10:15 con el Dr. López. ¿Confirmas tu asistencia? 🦷✨
                          <div className="mt-2 flex gap-1.5 flex-wrap">
                            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-400/50 shadow flex items-center gap-1">
                              👍 Sí, confirmo
                            </span>
                            <span className="bg-white/10 text-white/80 font-medium text-[10px] px-2 py-1 rounded-lg border border-white/15">
                              🔄 Reagendar
                            </span>
                          </div>
                          <div className="text-[9px] text-emerald-200 mt-1 text-right flex items-center justify-end gap-1 font-mono">
                            WhatsApp API <span className="text-cyan-300 font-extrabold text-xs">✓✓</span>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-2xl rounded-tl-none p-2 sm:p-2.5 max-w-[75%] text-white border border-white/10 shadow flex gap-2 items-center animate-fadeIn">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 shrink-0 flex items-center justify-center font-bold text-black text-[10px]">C</div>
                          <div className="text-xs">
                            👍 <span className="font-bold text-amber-300">Carlos:</span> Sí, confirmo
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. ANALÍTICA SIMULADOR */}
                {active.simulatorType === 'analytics' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fadeIn text-center font-sans">
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                      <div className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase">Consultas Resueltas</div>
                      <div className="text-base sm:text-2xl font-extrabold text-[#00E0FF] mt-0.5 font-mono">1.482</div>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                      <div className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase">Tiempo Ahorrado</div>
                      <div className="text-base sm:text-2xl font-extrabold text-emerald-400 mt-0.5 font-mono">48.5 h</div>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 col-span-2 sm:col-span-1">
                      <div className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase">Conversión Nocturna</div>
                      <div className="text-base sm:text-2xl font-extrabold text-purple-400 mt-0.5 font-mono">+38 %</div>
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

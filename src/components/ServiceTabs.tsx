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
    colorTheme: 'from-cian via-cian to-cian-dark',
    glowColor: 'rgba(37, 211, 102, 0.35)',
    borderColor: 'border-cian/60',
    description: 'Atención 24/7 sin colas. Responde dudas, muestra catálogo y cierra ventas en segundos.',
    highlights: ['Latencia < 1.8s', 'Cero colas', 'Paso a humano'],
    metrics: [{ label: 'Ventas automáticas', val: '+38%' }, { label: 'Horas ahorradas/día', val: '4h+' }],
    simulatorType: 'whatsapp',
  },
  {
    id: 'escalation',
    code: 'SYS-02',
    shortName: 'Escalado Humano',
    title: 'Escalado Inteligente',
    subtitle: 'La IA resuelve el 90%; tú intervienes si es clave.',
    category: 'Atención Híbrida',
    colorTheme: 'from-cian-light via-cian to-cian-dark',
    glowColor: 'rgba(20, 205, 236, 0.35)',
    borderColor: 'border-cian/60',
    description: 'La IA filtra consultas comunes y te avisa en 0.2s si el cliente necesita consejo personal.',
    highlights: ['Aviso instantáneo', 'Traspaso fluido', 'Control total'],
    metrics: [{ label: 'Filtro por IA', val: '90%' }, { label: 'Aviso al móvil', val: '0.2s' }],
    simulatorType: 'escalation',
  },
  {
    id: 'reminders',
    code: 'SYS-03',
    shortName: 'Recordatorios',
    title: 'Recordatorios de Reservas',
    subtitle: 'Avisos automáticos que aseguran asistencia.',
    category: 'Fidelización',
    colorTheme: 'from-cian-light via-cian to-cian-dark',
    glowColor: 'rgba(20, 205, 236, 0.35)',
    borderColor: 'border-cian-light/60',
    description: 'Envía confirmaciones automáticas por WhatsApp antes de cada cita para eliminar plantones.',
    highlights: ['Aviso 24h/1h', 'Confirmación 1 clic', 'Cero olvidos'],
    metrics: [{ label: 'Asistencia real', val: '99%' }, { label: 'Olvidos eliminados', val: '-95%' }],
    simulatorType: 'reminders',
  },
  {
    id: 'analytics',
    code: 'SYS-04',
    shortName: 'Reportes BI',
    title: 'Reportes Ejecutivos',
    subtitle: 'Tus métricas semanales directamente en WhatsApp.',
    category: 'Analítica',
    colorTheme: 'from-cian via-cian-dark to-cian-dark',
    glowColor: 'rgba(20, 205, 236, 0.35)',
    borderColor: 'border-cian/60',
    description: 'Resumen en tu móvil con ventas por IA, horas ahorradas y hábitos de tus clientes.',
    highlights: ['KPIs directos', 'Sin Excels', 'Control ROI'],
    metrics: [{ label: 'Rentabilidad extra', val: '+24%' }, { label: 'Horas ahorradas', val: '5h/sem' }],
    simulatorType: 'analytics',
  },
];

export default function ServiceTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const lastScrollY = useRef(0);

  // Escuchador de scroll para cambiar automáticamente las soluciones al bajar (Solo PC)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 768) return;
      
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setManualIndex((prev) => Math.min(SERVICES.length - 1, (prev !== null ? prev : activeTab) + 1));
      } else {
        setManualIndex((prev) => Math.max(0, (prev !== null ? prev : activeTab) - 1));
      }
    }
    touchStartX.current = null;
  };

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
    <section id="servicios" ref={containerRef} className="relative min-h-screen md:h-[550vh] bg-navy-900 border-b border-white/10 py-12 md:py-0">
      
      {/* Contenedor Sticky en PC, normal en Móvil */}
      <div className="relative md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 py-4">
        
        {/* Malla y luz de fondo reactiva al servicio actual */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 ease-out opacity-35"
          style={{ background: `radial-gradient(circle, ${active.glowColor} 0%, transparent 70%)` }}
        />

        <div className="max-w-7xl lg:max-w-[1380px] w-full mx-auto relative z-10 flex flex-col items-center justify-center">
          
          {/* Cabecera */}
          <div className="text-center max-w-4xl mx-auto mb-2 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-md mb-2 sm:mb-3 pointer-events-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-cian">
                Simulador IA En Vivo
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-1 sm:mb-2 pointer-events-none">
              Centro de Mando <span className="bg-gradient-to-r from-cian via-cian-dark to-cian-light bg-clip-text text-transparent">En Vivo</span>
            </h2>
            
            {/* Pestañas de selección rápida arriba para no obligar a hacer scroll */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mt-2 sm:mt-4">
              {SERVICES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setManualIndex(idx)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border cursor-pointer ${
                    idx === activeTab
                      ? `bg-gradient-to-r ${s.colorTheme} text-white border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105`
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[9px] sm:text-[10px] font-mono opacity-80 bg-black/30 px-1.5 py-0.5 rounded">{s.code}</span>
                  <span>{s.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenedor Principal de Simulación (Más amplio, alto y aireado) */}
          <div className="w-full">
            <div 
              key={active.id}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`w-full bg-navy-800 border-2 ${active.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 relative min-h-[440px] sm:min-h-[540px] md:min-h-[580px] flex flex-col justify-between overflow-hidden transition-all duration-700 ${activeTab % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'}`}
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
                      <div className="w-2.5 h-2.5 rounded-full bg-cian animate-pulse" />
                      <div className="w-2.5 h-2.5 rounded-full bg-cian" />
                      <div className="w-2.5 h-2.5 rounded-full bg-cian" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-black tracking-widest text-cian bg-cian/10 px-3 py-1 rounded-lg border border-cian/30 shadow-[0_0_15px_rgba(20,205,236,0.25)]">
                      SISTEMA ACTIVO // {activeTab + 1} DE 4
                    </span>
                  </div>

                  {/* Indicadores cibernéticos de paso (1, 2, 3, 4) */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0 justify-center">
                    {SERVICES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setManualIndex(idx)}
                        aria-label={`Ir a ${s.shortName}`}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                          idx === activeTab 
                            ? `w-8 sm:w-12 bg-gradient-to-r ${s.colorTheme} shadow-[0_0_12px_white]` 
                            : idx < activeTab 
                              ? 'w-2 sm:w-3 bg-white/40 hover:bg-white/70' 
                              : 'w-2 sm:w-3 bg-white/10 hover:bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Título y subtítulo */}
                <div className="mb-2 sm:mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] sm:text-xs font-mono font-extrabold px-1.5 py-0.5 rounded bg-cian/10 text-cian border border-cian/30">
                      {active.code}
                    </span>
                    <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/60">
                      {active.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-1">
                    {active.title}
                  </h3>
                  <div className="text-sm sm:text-lg font-bold text-cian">
                    {active.subtitle}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-6">
                  {active.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.06] border border-white/15 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${active.colorTheme}`} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* BANCO DE SIMULACIÓN VISUAL */}
              <div className="mt-auto pt-2 sm:pt-5 border-t border-white/10 bg-navy-950/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-white/15 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono uppercase tracking-wider text-white/40 mb-2.5 pb-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-cian font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cian animate-ping" />
                    SIMULACIÓN EN VIVO
                  </span>
                  <span>LATENCIA: 11ms</span>
                </div>

                {/* 1. WHATSAPP SIMULADOR */}
                {active.simulatorType === 'whatsapp' && (
                  <div className="space-y-2 font-sans text-xs sm:text-sm">
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-2 sm:p-2.5 max-w-[85%] text-white border border-white/10 shadow flex gap-2 items-start animate-fadeIn">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cian to-cian shrink-0 flex items-center justify-center font-bold text-white text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[9px] mb-0.5">Cliente (WhatsApp)</div>
                        ¿Hola! ¿Mesa libre en terraza hoy a las 22:00? Somos 4.
                      </div>
                    </div>

                    {isTyping ? (
                      <div className="bg-whatsapp-incoming rounded-2xl rounded-tr-none p-2 max-w-[60%] ml-auto text-white shadow border border-emerald-500/30 flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-mono text-emerald-200">Agente IA escribiendo</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-whatsapp-incoming rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40 animate-fadeIn">
                        <div className="font-bold text-emerald-300 text-[9px] mb-0.5 flex items-center justify-between">
                          <span>🤖 Agente Dalsat IA</span>
                          <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">0.4s</span>
                        </div>
                        ¡Hola Carlos! Sí, queda la última mesa en terraza exterior a las 22:00. Reservada a tu nombre. ¡Te esperamos! 🍽️✨
                        <div className="text-[9px] text-emerald-200 mt-1 text-right flex items-center justify-end gap-1 font-mono">
                          WhatsApp API <span className="text-cian-light font-extrabold text-xs">✓✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ESCALADO A HUMANO SIMULADOR */}
                {active.simulatorType === 'escalation' && (
                  <div className="space-y-1.5 sm:space-y-2 font-sans text-[11px] sm:text-sm animate-fadeIn">
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-1.5 sm:p-2.5 max-w-[85%] text-white border border-white/10 shadow flex gap-1.5 sm:gap-2 items-start">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-cian to-cian shrink-0 flex items-center justify-center font-bold text-white text-[9px] sm:text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[8px] sm:text-[9px] mb-0.5">Cliente (Estética)</div>
                        Hola, tengo la piel bastante sensible y dudo entre el facial iluminador o el hidratante. ¿Cuál me vendría mejor?
                      </div>
                    </div>

                    <div className="bg-cian/20 rounded-xl p-1 sm:p-2 border border-cian/40 text-cian-light text-[9px] sm:text-xs font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cian animate-ping" />
                        <span className="font-bold text-cian-light">⚡ TRASPASO IA:</span> Asesoramiento personalizado.
                      </span>
                      <span className="bg-cian/30 px-1 py-0.5 rounded text-white font-bold text-[8px] sm:text-[9px]">Aviso Esteticista</span>
                    </div>

                    <div className="bg-whatsapp-incoming rounded-2xl rounded-tr-none p-1.5 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40">
                      <div className="font-bold text-emerald-300 text-[8px] sm:text-[9px] mb-0.5 flex items-center justify-between">
                        <span>🤖 Agente Dalsat IA</span>
                        <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">0.2s</span>
                      </div>
                      ¡Hola! Para recomendarte lo ideal para tu tipo de piel, le paso tu mensaje a Laura (Esteticista). Te aconseja ahora 👇
                    </div>

                    {isTyping ? (
                      <div className="bg-gradient-to-r from-cian-dark to-cian-dark rounded-2xl rounded-tr-none p-1.5 sm:p-2 max-w-[70%] ml-auto text-white shadow border border-cian/50 flex items-center gap-1.5 justify-end animate-fadeIn">
                        <span className="text-[9px] sm:text-[10px] font-mono text-cian-light">🌸 Laura aconsejando...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-cian-dark to-cian-dark rounded-2xl rounded-tr-none p-1.5 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-cian/50 animate-fadeIn">
                        <div className="font-bold text-cian-light text-[8px] sm:text-[9px] mb-0.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">🌸 Laura <span className="bg-cian/20 text-cian-light px-1 py-0.5 rounded text-[8px] font-mono">Esteticista</span></span>
                          <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">Ahora</span>
                        </div>
                        ¡Hola! Para piel sensible te recomiendo sin duda el hidratante con aloe. Te dejará la cara súper luminosa y suave sin irritar nada. ¡Te va a encantar! ✨
                      </div>
                    )}
                  </div>
                )}

                {/* 3. RECORDATORIOS SIMULADOR */}
                {active.simulatorType === 'reminders' && (
                  <div className="space-y-2 font-sans text-xs sm:text-sm animate-fadeIn">
                    <div className="bg-white/10 rounded-xl p-1.5 sm:p-2 border border-cian/30 flex items-center justify-between text-white/90 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1.5 font-mono">
                        <span className="w-2 h-2 rounded-full bg-cian animate-ping" />
                        <span className="font-bold text-cian-light">SISTEMA:</span> Cita de peluquería mañana 10:15
                      </span>
                      <span className="bg-cian/20 px-1.5 py-0.5 rounded text-cian-light font-bold text-[9px]">Disparador 24h</span>
                    </div>

                    {isTyping ? (
                      <div className="bg-whatsapp-incoming rounded-2xl rounded-tr-none p-2 max-w-[60%] ml-auto text-white shadow border border-emerald-500/30 flex items-center gap-2 justify-end animate-fadeIn">
                        <span className="text-[10px] font-mono text-emerald-200">Agente IA redactando aviso...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fadeIn">
                        <div className="bg-whatsapp-incoming rounded-2xl rounded-tr-none p-2 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40">
                          <div className="font-bold text-emerald-300 text-[9px] mb-0.5 flex items-center justify-between">
                            <span>Agente Dalsat IA (Peluquería)</span>
                            <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">09:00</span>
                          </div>
                          ¡Hola Carlos! Recordatorio: cita mañana 10:15 en peluquería para corte y peinado. ¿Confirmas tu asistencia? ✂️✨
                          <div className="mt-2 flex gap-1.5 flex-wrap">
                            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg border border-emerald-400/50 shadow flex items-center gap-1">
                              👍 Sí, confirmo
                            </span>
                            <span className="bg-white/10 text-white/80 font-medium text-[10px] px-2 py-1 rounded-lg border border-white/15">
                              🔄 Reagendar
                            </span>
                          </div>
                          <div className="text-[9px] text-emerald-200 mt-1 text-right flex items-center justify-end gap-1 font-mono">
                            WhatsApp API <span className="text-cian-light font-extrabold text-xs">✓✓</span>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-2xl rounded-tl-none p-2 sm:p-2.5 max-w-[75%] text-white border border-white/10 shadow flex gap-2 items-center animate-fadeIn">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cian to-cian shrink-0 flex items-center justify-center font-bold text-black text-[10px]">C</div>
                          <div className="text-xs">
                            👍 <span className="font-bold text-cian-light">Carlos:</span> Sí, confirmo
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. ANALÍTICA SIMULADOR */}
                {active.simulatorType === 'analytics' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 animate-fadeIn text-center font-sans">
                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-cian/60 transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-cian animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Ventas Cerradas Solas</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-cian font-mono tracking-tight">+38 %</div>
                      <div className="text-[8px] sm:text-[9px] text-white/50 mt-0.5">Sin intervención humana</div>
                    </div>

                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-cian/60 transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-cian animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Horas Libres a tu Equipo</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-cian font-mono tracking-tight">48,5 h</div>
                      <div className="text-[8px] sm:text-[9px] text-white/50 mt-0.5">Ahorradas este mes</div>
                    </div>

                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-cian/60 transition-all duration-300 shadow-md col-span-2 sm:col-span-1">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-cian animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Clientes de Noche y Festivos</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-cian font-mono tracking-tight">1.482</div>
                      <div className="text-[8px] sm:text-[9px] text-white/50 mt-0.5">Atendidos al instante</div>
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

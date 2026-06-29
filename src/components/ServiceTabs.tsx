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
    metrics: [{ label: 'Ventas cerradas solas', val: '+38%' }, { label: 'Horas ahorradas al día', val: '4h+' }],
    simulatorType: 'whatsapp',
  },
  {
    id: 'escalation',
    code: 'SYS-02',
    shortName: 'Escalado Humano',
    title: 'Escalado Inteligente a Humano',
    subtitle: 'La IA resuelve el 90%; tú intervienes solo cuando es clave.',
    category: 'Atención Híbrida',
    colorTheme: 'from-[#EC4899] via-[#F43F5E] to-[#E11D48]',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    borderColor: 'border-[#F43F5E]/60',
    description: 'Transfiere consultas de asesoramiento o dudas específicas para que tu especialista aconseje al cliente al segundo.',
    highlights: ['Consejo experto', 'Traspaso fluido', 'Control total'],
    metrics: [{ label: 'Dudas resueltas por IA', val: '90%' }, { label: 'Aviso a tu móvil en', val: '0.2s' }],
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
    metrics: [{ label: 'Citas que sí asisten', val: '99%' }, { label: 'Menos olvidos', val: '-95%' }],
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
    metrics: [{ label: 'Beneficio extra medido', val: '+24%' }, { label: 'Horas de Excel ahorradas', val: '5h/sem' }],
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
    <section id="servicios" ref={containerRef} className="relative min-h-screen md:h-[280vh] bg-[#000814] border-b border-white/10 py-12 md:py-0">
      
      {/* Contenedor Sticky en PC, normal en Móvil */}
      <div className="relative md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 py-4">
        
        {/* Malla y luz de fondo reactiva al servicio actual */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 ease-out opacity-35"
          style={{ background: `radial-gradient(circle, ${active.glowColor} 0%, transparent 70%)` }}
        />

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center justify-center">
          
          {/* Cabecera */}
          <div className="text-center max-w-4xl mx-auto mb-2 sm:mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-md mb-2 sm:mb-3 pointer-events-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E0FF]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-[#00E0FF]">
                Simulador IA En Vivo
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-1 sm:mb-2 pointer-events-none">
              Centro de Mando <span className="bg-gradient-to-r from-[#00E0FF] via-[#7C6BD6] to-[#FF00E5] bg-clip-text text-transparent">En Vivo</span>
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
              className={`w-full bg-[#001026] border-2 ${active.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 relative min-h-[440px] sm:min-h-[540px] md:min-h-[580px] flex flex-col justify-between overflow-hidden transition-all duration-700 ${activeTab % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'}`}
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

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 ml-auto order-2 sm:order-3">
                    {active.metrics.map((m, i) => (
                      <div 
                        key={`${active.id}-${i}`} 
                        className="bg-black/70 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-white/20 text-right shadow-lg backdrop-blur-md flex items-center gap-2 hover:scale-105 hover:border-white/40 transition-all duration-300 animate-fadeIn cursor-default group"
                      >
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${active.colorTheme} opacity-75`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${active.colorTheme}`} />
                        </span>
                        <div>
                          <span className="text-[7px] sm:text-[9px] text-white/70 uppercase font-extrabold block tracking-wider leading-tight mb-0.5 group-hover:text-white transition-colors">{m.label}</span>
                          <span className={`text-xs sm:text-base font-black bg-gradient-to-r ${active.colorTheme} bg-clip-text text-transparent font-mono tracking-tight block leading-none`}>{m.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="mb-1.5 sm:mb-3">
                  <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                    <span className="text-[9px] sm:text-xs font-mono font-extrabold px-1.5 py-0.5 rounded bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/30">
                      {active.code}
                    </span>
                    <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/60">
                      {active.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-0.5 sm:mb-1">
                    {active.title}
                  </h3>
                  <div className="text-xs sm:text-lg font-bold text-[#00E0FF] leading-snug">
                    {active.subtitle}
                  </div>
                </div>
                <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-5 hidden sm:block">
                  {active.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-6">
                  {active.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.06] border border-white/15 text-[9px] sm:text-xs font-bold text-white shadow-sm">
                      <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${active.colorTheme}`} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* BANCO DE SIMULACIÓN VISUAL */}
              <div className="mt-auto pt-2 sm:pt-5 border-t border-white/10 bg-[#00040A]/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 border border-white/15 shadow-inner relative overflow-hidden">
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
                  <div className="space-y-1.5 sm:space-y-2 font-sans text-[11px] sm:text-sm animate-fadeIn">
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-1.5 sm:p-2.5 max-w-[85%] text-white border border-white/10 shadow flex gap-1.5 sm:gap-2 items-start">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 shrink-0 flex items-center justify-center font-bold text-white text-[9px] sm:text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[8px] sm:text-[9px] mb-0.5">Cliente (Estética)</div>
                        Hola, tengo la piel bastante sensible y dudo entre el facial iluminador o el hidratante. ¿Cuál me vendría mejor?
                      </div>
                    </div>

                    <div className="bg-rose-500/20 rounded-xl p-1 sm:p-2 border border-rose-500/40 text-rose-200 text-[9px] sm:text-xs font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                        <span className="font-bold text-rose-300">⚡ TRASPASO IA:</span> Asesoramiento personalizado.
                      </span>
                      <span className="bg-rose-500/30 px-1 py-0.5 rounded text-white font-bold text-[8px] sm:text-[9px]">Aviso Esteticista</span>
                    </div>

                    <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-1.5 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-emerald-500/40">
                      <div className="font-bold text-emerald-300 text-[8px] sm:text-[9px] mb-0.5 flex items-center justify-between">
                        <span>🤖 Agente Dalsat IA</span>
                        <span className="text-[8px] bg-black/30 px-1 py-0.5 rounded text-white/80 font-mono">0.2s</span>
                      </div>
                      ¡Hola! Para recomendarte lo ideal para tu tipo de piel, le paso tu mensaje a Laura (Esteticista). Te aconseja ahora 👇
                    </div>

                    {isTyping ? (
                      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl rounded-tr-none p-1.5 sm:p-2 max-w-[70%] ml-auto text-white shadow border border-rose-400/50 flex items-center gap-1.5 justify-end animate-fadeIn">
                        <span className="text-[9px] sm:text-[10px] font-mono text-pink-200">🌸 Laura aconsejando...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl rounded-tr-none p-1.5 sm:p-2.5 max-w-[88%] ml-auto text-white shadow border border-rose-400/50 animate-fadeIn">
                        <div className="font-bold text-pink-200 text-[8px] sm:text-[9px] mb-0.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">🌸 Laura <span className="bg-pink-400/20 text-pink-200 px-1 py-0.5 rounded text-[8px] font-mono">Esteticista</span></span>
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 animate-fadeIn text-center font-sans">
                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-[#00E0FF]/60 transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#00E0FF] animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Ventas Cerradas Solas</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-[#00E0FF] font-mono tracking-tight">+38 %</div>
                      <div className="text-[8px] sm:text-[9px] text-white/50 mt-0.5">Sin intervención humana</div>
                    </div>

                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-emerald-400/60 transition-all duration-300 shadow-md">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Horas Libres a tu Equipo</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">48,5 h</div>
                      <div className="text-[8px] sm:text-[9px] text-white/50 mt-0.5">Ahorradas este mes</div>
                    </div>

                    <div className="bg-white/10 p-3 sm:p-4 rounded-xl border border-white/20 relative overflow-hidden group hover:scale-105 hover:border-purple-400/60 transition-all duration-300 shadow-md col-span-2 sm:col-span-1">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-white/70 uppercase tracking-wider group-hover:text-white transition-colors">Clientes de Noche y Festivos</span>
                      </div>
                      <div className="text-lg sm:text-3xl font-black text-purple-400 font-mono tracking-tight">1.482</div>
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

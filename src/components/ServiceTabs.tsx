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
  simulatorType: 'whatsapp' | 'calendar' | 'email' | 'invoice' | 'integration' | 'analytics';
}

const SERVICES: ServiceNode[] = [
  {
    id: 'whatsapp',
    code: 'SYS-01',
    shortName: 'WhatsApp 24/7',
    title: 'Agente WhatsApp 24/7',
    subtitle: 'Atención autónoma y ventas inmediatas por chat.',
    category: 'IA Conversacional',
    colorTheme: 'from-[#25D366] via-[#10B981] to-[#059669]',
    glowColor: 'rgba(37, 211, 102, 0.35)',
    borderColor: 'border-[#25D366]/60',
    description: 'Conversación 100% natural. El agente consulta tu catálogo y precios en milisegundos, cerrando citas o ventas a las 3 AM sin intervención humana.',
    highlights: ['Latencia < 1.8s', 'Cero colas', 'Escalado a humano'],
    metrics: [{ label: 'Conversión', val: '+38%' }, { label: 'Ahorro', val: '85%' }],
    simulatorType: 'whatsapp',
  },
  {
    id: 'calendar',
    code: 'SYS-02',
    shortName: 'Citas y Agenda',
    title: 'Citas y Calendario IA',
    subtitle: 'Sincronización de reservas y recordatorios anti-olvido.',
    category: 'Operativa Autónoma',
    colorTheme: 'from-[#00E0FF] via-[#00B8FF] to-[#0080FF]',
    glowColor: 'rgba(0, 224, 255, 0.35)',
    borderColor: 'border-[#00E0FF]/60',
    description: 'El agente negocia huecos libres con el cliente, agenda en Google Calendar / Outlook y envía avisos automáticos por WhatsApp 24h antes.',
    highlights: ['Sincronía real', '0% ausencias', 'Reagendado solo'],
    metrics: [{ label: 'Ausencias', val: '0.2%' }, { label: 'Citas/Mes', val: '+450' }],
    simulatorType: 'calendar',
  },
  {
    id: 'email',
    code: 'SYS-03',
    shortName: 'Emailing IA',
    title: 'Automatización Emailing',
    subtitle: 'Bandeja clasificada, borradores y anti-spam.',
    category: 'Productividad 360°',
    colorTheme: 'from-[#A78BFA] via-[#8B5CF6] to-[#6D28D9]',
    glowColor: 'rgba(167, 139, 250, 0.35)',
    borderColor: 'border-[#A78BFA]/60',
    description: 'Tu correo bajo control. La IA clasifica por urgencia, redacta presupuestos formales adjuntando catálogos y responde dudas habituales al instante.',
    highlights: ['Clasificación IA', 'Tu tono exacto', 'Seguimiento leads'],
    metrics: [{ label: 'Respuesta', val: '4 seg' }, { label: 'Limpio', val: '100%' }],
    simulatorType: 'email',
  },
  {
    id: 'invoice',
    code: 'SYS-04',
    shortName: 'Facturación PDF',
    title: 'Facturación Instantánea',
    subtitle: 'Generación y envío automático de facturas al cobrar.',
    category: 'Finanzas & Cobros',
    colorTheme: 'from-[#FBBF24] via-[#F59E0B] to-[#D97706]',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    borderColor: 'border-[#FBBF24]/60',
    description: 'Disparado por eventos: al cobrar por Bizum o tarjeta o terminar consulta, el sistema calcula impuestos, genera el PDF y lo envía adjunto.',
    highlights: ['Conexión contable', 'Cero errores', 'Ahorro gestiones'],
    metrics: [{ label: 'Errores', val: '0.0%' }, { label: 'Ahorro', val: '18h/mes' }],
    simulatorType: 'invoice',
  },
  {
    id: 'integration',
    code: 'SYS-05',
    shortName: 'Conexión CRM',
    title: 'Conexión CRM y ERP',
    subtitle: 'Conectamos la IA con tus herramientas (Shopify, TPV).',
    category: 'Arquitectura & API',
    colorTheme: 'from-[#F43F5E] via-[#E11D48] to-[#BE123C]',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    borderColor: 'border-[#F43F5E]/60',
    description: 'No cambias de software. Conectamos nuestros agentes por API REST o Webhooks a tu sistema médico, TPV de hostelería o tienda online.',
    highlights: ['Bidireccional', 'Datos blindados', 'Modular'],
    metrics: [{ label: 'Sincronía', val: '100%' }, { label: 'Latencia', val: '12ms' }],
    simulatorType: 'integration',
  },
  {
    id: 'analytics',
    code: 'SYS-06',
    shortName: 'Reportes BI',
    title: 'Reportes Ejecutivos',
    subtitle: 'Inteligencia de negocio directa en tu WhatsApp.',
    category: 'BI & Analítica',
    colorTheme: 'from-[#38BDF8] via-[#0EA5E9] to-[#0284C7]',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    borderColor: 'border-[#38BDF8]/60',
    description: 'Recibe en tu móvil un resumen semanal con conversiones cerradas por la IA, horarios pico y nuevas dudas frecuentes de clientes.',
    highlights: ['KPIs directos', 'Nuevas tendencias', 'Cálculo ROI'],
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
    
    // Auto-scroll horizontal de la barra móvil para que la pestaña activa siempre sea visible
    if (swiperRef.current) {
      const activeBtn = swiperRef.current.children[activeTab] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
                Simulador IA Activado por Scroll
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-1 sm:mb-3">
              Centro de Mando <span className="bg-gradient-to-r from-[#00E0FF] via-[#7C6BD6] to-[#FF00E5] bg-clip-text text-transparent">En Vivo</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-base hidden sm:block font-light">
              Haz scroll hacia abajo para ver cómo nuestros agentes cambian y ejecutan procesos en tiempo real.
            </p>
          </div>

          {/* BARRA MÓVIL RESPONSIVE: Swiper de pastillas que avanza con el scroll */}
          <div className="lg:hidden w-full mb-4 z-30">
            <div ref={swiperRef} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x px-1">
              {SERVICES.map((item, idx) => {
                const isSelected = idx === activeTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      lastScrollY.current = window.scrollY;
                      setManualIndex(idx);
                    }}
                    className={`snap-center shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                      isSelected
                        ? `bg-gradient-to-r ${item.colorTheme} text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105 border border-white/40`
                        : 'bg-white/[0.06] text-white/60 border border-white/10'
                    }`}
                  >
                    <span className={`font-mono text-[10px] px-1 rounded ${isSelected ? 'bg-black/30 text-white font-black' : 'bg-white/10 text-white/50'}`}>
                      0{idx + 1}
                    </span>
                    <span>{item.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rejilla Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center w-full">
            
            {/* Panel Izquierdo: Nodos Cibernéticos (SOLO DESKTOP) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-3 w-full">
              {SERVICES.map((item, idx) => {
                const isSelected = idx === activeTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      lastScrollY.current = window.scrollY;
                      setManualIndex(idx);
                    }}
                    className={`group relative w-full text-left p-4 rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-hidden flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? `bg-gradient-to-r from-white/[0.15] to-white/[0.04] border ${item.borderColor} shadow-[0_10px_35px_rgba(0,0,0,0.9)] scale-[1.03] z-20`
                        : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 opacity-75 hover:opacity-100'
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 30px -5px ${item.glowColor}` : 'none'
                    }}
                  >
                    {isSelected && (
                      <div className={`absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-gradient-to-br ${item.colorTheme} blur-2xl opacity-40 pointer-events-none`} />
                    )}

                    <div className="flex items-center gap-3.5 relative z-10 pl-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs shadow-lg shrink-0 transition-transform duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-br ${item.colorTheme} text-white border border-white/30 scale-110` 
                          : 'bg-white/10 text-white/60 border border-white/10'
                      }`}>
                        {item.code.replace('SYS-', '')}
                      </div>

                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00E0FF] bg-[#00E0FF]/10 px-2 py-0.5 rounded border border-[#00E0FF]/20">
                          {item.category}
                        </span>
                        <div className={`text-base sm:text-lg font-extrabold transition-colors leading-tight mt-0.5 ${isSelected ? 'text-white font-black' : 'text-white/80 group-hover:text-white'}`}>
                          {item.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 relative z-10">
                      {isSelected && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] font-extrabold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVO
                        </span>
                      )}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? `bg-white text-black shadow-[0_0_12px_white] scale-110` : 'bg-white/5 text-white/40 group-hover:bg-white/15'
                      }`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Panel Derecho: Consola de Simulación En Vivo que avanza con el scroll */}
            <div 
              className={`lg:col-span-7 w-full bg-gradient-to-b from-white/[0.1] to-white/[0.02] border ${active.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-3xl shadow-2xl relative min-h-[420px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden transition-all duration-500`}
              style={{ boxShadow: `0 20px 60px -15px ${active.glowColor}` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${active.colorTheme}`} />
              
              {/* Cabecera del terminal */}
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 sm:pb-5 border-b border-white/10 mb-3 sm:mb-5 flex-wrap">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 bg-black/40 px-2 py-1 rounded-full border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-white/70">
                      TERMINAL // {active.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {active.metrics.map((m, i) => (
                      <div key={i} className="bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10 text-right">
                        <span className="text-[8px] sm:text-[9px] text-white/50 uppercase font-bold block">{m.label}</span>
                        <span className={`text-xs sm:text-sm font-extrabold bg-gradient-to-r ${active.colorTheme} bg-clip-text text-transparent font-mono`}>{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Título y descripción */}
                <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-1.5 sm:mb-2 tracking-tight leading-tight">
                  {active.subtitle}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-3 sm:mb-5">
                  {active.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {active.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-[10px] sm:text-xs font-bold text-white shadow-sm">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${active.colorTheme}`} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* BANCO DE SIMULACIÓN VISUAL */}
              <div className="mt-auto pt-3 sm:pt-5 border-t border-white/10 bg-[#00040A]/90 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/15 shadow-inner relative overflow-hidden">
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
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-2.5 sm:p-3 max-w-[92%] sm:max-w-[85%] text-white border border-white/10 shadow flex gap-2 items-start animate-fadeIn">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shrink-0 flex items-center justify-center font-bold text-white text-[10px]">C</div>
                      <div>
                        <div className="font-bold text-white/60 text-[9px] sm:text-[10px] mb-0.5">Cliente (WhatsApp)</div>
                        ¿Hola! ¿Tenéis mesa libre en terraza para cenar hoy a las 22:00? Somos 4 personas.
                      </div>
                    </div>

                    {isTyping ? (
                      <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2.5 max-w-[65%] sm:max-w-[50%] ml-auto text-white shadow border border-emerald-500/30 flex items-center gap-2 justify-end">
                        <span className="text-[10px] sm:text-xs font-mono text-emerald-200">Agente IA escribiendo</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </div>
                    ) : (
                      <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-3 sm:p-3.5 max-w-[94%] sm:max-w-[88%] ml-auto text-white shadow border border-emerald-500/40 animate-fadeIn">
                        <div className="font-bold text-emerald-300 text-[10px] mb-1 flex items-center justify-between">
                          <span>🤖 Agente Dalsat IA</span>
                          <span className="text-[8px] bg-black/30 px-1.5 py-0.5 rounded text-white/80 font-mono">0.4s</span>
                        </div>
                        ¡Hola Carlos! Sí, nos queda la última mesa en terraza exterior a las 22:00. Acabo de reservarla a tu nombre. Te mandamos el enlace. ¡Te esperamos! 🍽️✨
                        <div className="text-[9px] text-emerald-200 mt-1 text-right flex items-center justify-end gap-1 font-mono">
                          WhatsApp API <span className="text-cyan-300 font-extrabold text-xs">✓✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CALENDARIO SIMULADOR */}
                {active.simulatorType === 'calendar' && (
                  <div className="space-y-2 font-sans animate-fadeIn">
                    <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 text-white gap-2 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-cyan-500 flex flex-col items-center justify-center font-extrabold text-black shrink-0 shadow">
                          <span className="text-[8px] sm:text-[9px] uppercase font-mono leading-none">MAÑ</span>
                          <span className="text-sm sm:text-base leading-none mt-0.5">18</span>
                        </div>
                        <div>
                          <div className="font-extrabold text-xs sm:text-sm text-white leading-tight">Consulta Dr. San Marcos</div>
                          <div className="text-[10px] sm:text-xs text-cyan-300 font-medium">18:00 - 18:30 • Elena Gómez</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-[9px] sm:text-[10px] tracking-wider">
                        CONFIRMADO
                      </span>
                    </div>
                    <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-mono flex items-center justify-between flex-wrap gap-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Sincronizado en Google Calendar & Outlook
                      </span>
                      <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-white font-bold text-[9px]">Aviso 24h OK</span>
                    </div>
                  </div>
                )}

                {/* 3. EMAIL SIMULADOR */}
                {active.simulatorType === 'email' && (
                  <div className="space-y-2 font-mono text-[10px] sm:text-xs animate-fadeIn">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-white/90 flex-wrap gap-1">
                      <span className="flex items-center gap-1 truncate">
                        <span className="text-purple-400 font-bold">📧 INBOX:</span> Solicitud presupuesto corporativo...
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-500/40 font-bold text-[8px]">
                        ALTA PRIORIDAD // VIP
                      </span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border border-purple-500/40 text-purple-100 shadow leading-relaxed font-sans text-xs">
                      <div className="font-mono text-[9px] sm:text-[10px] text-purple-300 mb-0.5 font-bold">⚡ ACCIÓN IA EJECUTADA (Latencia: 3.2s):</div>
                      Borrador redactado adjuntando catálogo PDF de tarifas 2026 y enlace de reunión en Calendly. Enviado y archivado en CRM automáticamente.
                    </div>
                  </div>
                )}

                {/* 4. FACTURA SIMULADOR */}
                {active.simulatorType === 'invoice' && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/40 flex items-center justify-between animate-fadeIn text-white flex-wrap gap-2.5">
                    <div className="space-y-0.5">
                      <div className="text-[9px] sm:text-[10px] text-amber-300 font-mono font-extrabold flex items-center gap-1">
                        <span>📄 FACTURA #2026-8942.PDF</span>
                        <span className="px-1 py-0.5 rounded bg-amber-500/20 text-amber-200 text-[8px]">IVA 21% OK</span>
                      </div>
                      <div className="text-sm sm:text-lg font-extrabold text-white">Tratamiento Odontológico</div>
                      <div className="text-[10px] sm:text-xs text-white/60 font-mono">Total: 180,00 € • Cobrado vía Bizum</div>
                    </div>
                    <div className="w-full sm:w-auto text-center px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-extrabold text-[11px] sm:text-xs shadow flex items-center justify-center gap-1">
                      ✓ EMITIDA Y ENVIADA
                    </div>
                  </div>
                )}

                {/* 5. INTEGRACIONES SIMULADOR */}
                {active.simulatorType === 'integration' && (
                  <div className="p-3.5 sm:p-5 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/10 border border-rose-500/40 text-center animate-fadeIn">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-white mb-2.5 flex-wrap">
                      <span className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-[10px] sm:text-xs">📱 WhatsApp API</span>
                      <span className="text-rose-400 font-bold text-sm animate-pulse">⇄</span>
                      <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow border border-white/30 text-[11px] sm:text-xs font-black">
                        ⚡ CEREBRO DALSAT
                      </span>
                      <span className="text-rose-400 font-bold text-sm animate-pulse">⇄</span>
                      <span className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-[10px] sm:text-xs">🏢 Tu CRM / TPV</span>
                    </div>
                    <div className="text-[9px] sm:text-[11px] text-rose-200 font-mono bg-black/40 py-1 px-2.5 rounded-lg border border-rose-500/20 inline-block">
                      ✓ Sincronía bidireccional en tiempo real (0 pérdida)
                    </div>
                  </div>
                )}

                {/* 6. ANALÍTICA SIMULADOR */}
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

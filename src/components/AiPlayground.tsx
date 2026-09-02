import { useState } from 'react';

interface PromptPreset {
  label: string;
  query: string;
  intent: string;
  confidence: string;
  response: string;
}

const PRESETS: PromptPreset[] = [
  {
    label: '📅 Reserva de Cita',
    query: '¡Buenas! ¿Tenéis hueco libre mañana a las 16:30 para una cita?',
    intent: 'AGENDAR_CITA',
    confidence: '99.8%',
    response: '¡Hola! Sí, tenemos disponibilidad mañana a las 16:30h. ¿Te la agendamos a tu nombre?',
  },
  {
    label: '💰 Consulta de Precios',
    query: '¿Cuánto cuesta un tratamiento completo y qué incluye el presupuesto?',
    intent: 'CONSULTA_PRECIOS',
    confidence: '98.5%',
    response: 'El presupuesto incluye valoración inicial y tratamiento completo. Te enviamos el desglose exacto en PDF.',
  },
  {
    label: '📍 Ubicación y Horarios',
    query: '¿Hasta qué hora abre el local hoy y dónde puedo aparcar cerca?',
    intent: 'UBICACION_HORARIOS',
    confidence: '99.1%',
    response: 'Abrimos de 09:00 a 20:30h ininterrumpido. Tienes parking público justo en la calle de al lado (a 50 metros).',
  },
];

export default function AiPlayground() {
  const [inputQuery, setInputQuery] = useState<string>(PRESETS[0].query);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeOutput, setActiveOutput] = useState<PromptPreset | null>(PRESETS[0]);
  const [customLatency, setCustomLatency] = useState<number>(210);

  const handleRun = (preset?: PromptPreset) => {
    const targetQuery = preset ? preset.query : inputQuery;
    if (!targetQuery.trim()) return;

    setIsAnalyzing(true);
    const randomLatency = Math.floor(Math.random() * 80) + 180;
    setCustomLatency(randomLatency);

    setTimeout(() => {
      if (preset) {
        setActiveOutput(preset);
      } else {
        // Generar respuesta dinámica si el usuario escribe su propia pregunta
        setActiveOutput({
          label: '⚡ Consulta Personalizada',
          query: targetQuery,
          intent: 'ATENCION_CLIENTE_IA',
          confidence: '99.4%',
          response: `¡Hola! He procesado tu consulta "${targetQuery}". El agente de IA de Dalsat respondería de forma personalizada a tus clientes en menos de 2 segundos.`,
        });
      }
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section id="playground" className="relative py-20 sm:py-28 bg-navy-950 border-t border-white/10 overflow-hidden font-sans">
      {/* Resplandor ambiental cian/verde matriz */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cian/15 via-emerald-500/10 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Sandbox Interactivo de IA
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Prueba la Inteligencia en Vivo
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Escribe una consulta de tu negocio o elige un ejemplo para ver cómo el motor de Dalsat analiza la intención en milisegundos.
          </p>
        </div>

        {/* Consola Terminal Hacker / Cyberpunk */}
        <div className="bg-navy-950/90 border border-cian/40 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          
          {/* Barra superior de la consola */}
          <div className="bg-black/60 border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cian/80" />
              <div className="w-3 h-3 rounded-full bg-cian/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-white/50 ml-3 hidden sm:inline">
                dalsat-ai-terminal ~/sandbox (v4.2-neural-engine)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-cian">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: 200 OK
            </div>
          </div>

          {/* Cuerpo principal del Terminal */}
          <div className="p-6 sm:p-10 space-y-6">
            
            {/* Chips de Sugerencias Rpidas */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider block">
                Pruebas rápidas de 1 clic:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputQuery(preset.query);
                      handleRun(preset);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 hover:border-cian text-white/80 hover:text-white text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-2"
                  >
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input de texto interactivo */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRun();
              }}
              className="relative flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-grow">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cian font-mono font-bold text-sm">
                  &gt;
                </span>
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Escribe aquí cualquier pregunta de tu negocio..."
                  className="w-full bg-black/50 border border-white/20 focus:border-cian rounded-2xl pl-9 pr-4 py-3.5 text-xs sm:text-sm text-white font-mono placeholder-white/40 focus:outline-none transition-colors shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cian via-cian to-cian-dark hover:brightness-110 text-navy-800 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(20,205,236,0.4)] flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-navy-800 border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    ⚡ Ejecutar IA
                  </>
                )}
              </button>
            </form>

            {/* Pantalla de Resultados de Salida de la IA */}
            <div className="bg-black/70 border border-emerald-500/30 rounded-2xl p-5 font-mono text-xs space-y-3 min-h-[160px] flex flex-col justify-between">
              
              {isAnalyzing ? (
                <div className="py-8 flex flex-col items-center justify-center text-emerald-400 space-y-2">
                  <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs">Procesando NLP &amp; Extracción de Entidades...</p>
                </div>
              ) : activeOutput ? (
                <>
                  <div className="space-y-2">
                    {/* Ficha de métricas de la IA */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 text-[11px]">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-bold">
                          [INTENT: {activeOutput.intent}]
                        </span>
                        <span className="text-cian">
                          CONFIANZA: {activeOutput.confidence}
                        </span>
                      </div>
                      <span className="text-cian">
                        ⚡ LATENCIA: {customLatency}ms
                      </span>
                    </div>

                    {/* Consulta enviada */}
                    <div className="text-white/60">
                      <span className="text-cian font-bold">QUERY:</span> "{activeOutput.query}"
                    </div>

                    {/* Respuesta del Agente Dalsat */}
                    <div className="bg-navy-950 border border-emerald-500/40 rounded-xl p-3.5 text-emerald-300 text-xs leading-relaxed mt-2 shadow-lg">
                      <div className="text-cian font-bold mb-1 flex items-center gap-1.5 text-[11px]">
                        <span>🤖 DALSAT AI RESPONDER:</span>
                      </div>
                      "{activeOutput.response}"
                    </div>
                  </div>

                  <div className="text-[10px] text-white/40 pt-2 flex items-center justify-between border-t border-white/5">
                    <span>Engine: Dalsat Neural Core v4.2</span>
                    <span>Status: SUCCESS (200 OK)</span>
                  </div>
                </>
              ) : null}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

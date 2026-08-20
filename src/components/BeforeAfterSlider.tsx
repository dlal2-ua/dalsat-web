import { useState } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(p);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  return (
    <section id="comparativa" className="relative py-12 sm:py-16 bg-[#00050E] border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-red-500/10 via-[#00E0FF]/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E0FF]/10 border border-[#00E0FF]/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,224,255,0.25)] mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E0FF]"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-[#00E0FF]">
              Transformación Digital
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            El Impacto en Tu Negocio
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Arrastra la barra para ver la diferencia entre la gestión manual y la automatización con Dalsat.
          </p>
        </div>

        {/* Contenedor del Deslizador Interactivo */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.8)] select-none transition-all duration-300">
            
            <div
              className="relative min-h-[300px] sm:min-h-[280px] cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              
              {/* 1. LADO DERECHO (DESPUÉS: CON DALSAT) — Base de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#001D1A] via-[#000E14] to-[#000814] p-4 sm:p-6 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 text-[11px] font-extrabold uppercase tracking-wider">
                      ⚡ Con Dalsat IA (Automatizado 24/7)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold hidden sm:inline">
                      100% Clientes Atendidos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Tarjeta 1 */}
                    <div className="bg-[#002620]/80 border border-[#25D366]/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-[#25D366] font-mono font-bold mb-0.5">
                        <span>⚡ WhatsApp Inmediato</span>
                        <span>2 seg</span>
                      </div>
                      <p className="text-xs text-white/90 font-medium leading-tight">
                        "¡Hola! Sí, tenemos mesa libre para hoy a las 22:00. ¿Te la confirmo?"
                      </p>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-[#002620]/80 border border-[#00E0FF]/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-[#00E0FF] font-mono font-bold mb-0.5">
                        <span>📞 Llamadas 24/7</span>
                        <span>En vivo</span>
                      </div>
                      <p className="text-xs text-white/90 font-medium leading-tight">
                        El agente de voz responde a las 23:30h y agenda la consulta de mañana.
                      </p>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-[#002620]/80 border border-purple-500/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono font-bold mb-0.5">
                        <span>📅 Recordatorios</span>
                        <span>Auto</span>
                      </div>
                      <p className="text-xs text-white/90 font-medium leading-tight">
                        Aviso automático por voz/WhatsApp 24h antes para confirmar asistencia.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Pie con indicador de paz mental */}
                <div className="p-2.5 rounded-xl bg-black/40 border border-[#25D366]/30 flex items-center justify-between text-[11px] text-white/80 font-medium mt-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    Tu equipo trabaja tranquilo sin interrupciones ni estrés constante.
                  </span>
                  <span className="font-mono text-[#25D366] font-bold">Agenda Llena 🚀</span>
                </div>

              </div>

              {/* 2. LADO IZQUIERDO (ANTES: SIN DALSAT) — Capa superpuesta recortada por clipPath sin deformar el texto */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1C0505] via-[#120303] to-[#0A0202] p-4 sm:p-6 flex flex-col justify-between overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <div className="w-full">
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-extrabold uppercase tracking-wider">
                      🔴 Sin IA (Caos Manual)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Tarjeta Caos 1 */}
                    <div className="bg-[#2B0B0B]/80 border border-red-500/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-red-400 font-mono font-bold mb-0.5">
                        <span>⏳ Sin responder</span>
                        <span>Hace 4h</span>
                      </div>
                      <p className="text-xs text-white/80 font-medium leading-tight">
                        "Hola, ¿tenéis hueco para hoy? Necesito reservar..."
                      </p>
                    </div>

                    {/* Tarjeta Caos 2 */}
                    <div className="bg-[#2B0B0B]/80 border border-amber-500/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono font-bold mb-0.5">
                        <span>📵 Llamada Perdida</span>
                        <span>22:15h</span>
                      </div>
                      <p className="text-xs text-white/80 font-medium leading-tight">
                        Llamada de cliente fuera de horario comercial sin respuesta.
                      </p>
                    </div>

                    {/* Tarjeta Caos 3 */}
                    <div className="bg-[#2B0B0B]/80 border border-orange-500/40 rounded-xl p-3 shadow backdrop-blur-md">
                      <div className="flex items-center justify-between text-[11px] text-orange-400 font-mono font-bold mb-0.5">
                        <span>🚨 Plantón en Cita</span>
                        <span>11:00h</span>
                      </div>
                      <p className="text-xs text-white/80 font-medium leading-tight">
                        El cliente olvida su cita porque nadie le envió un recordatorio.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Pie con indicador de estrés */}
                <div className="p-2.5 rounded-xl bg-black/40 border border-red-500/30 flex items-center justify-between text-[11px] text-white/80 font-medium w-full mt-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    Interrupciones constantes al trabajar y horas perdidas respondiendo.
                  </span>
                  <span className="font-mono text-red-400 font-bold pr-4">Estrés Diario ⚠️</span>
                </div>

              </div>

              {/* BARRA DESLIZABLE INTERACTIVA (divisor vertical) */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#00E0FF] shadow-[0_0_20px_#00E0FF] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#001026] border-2 border-[#00E0FF] text-[#00E0FF] flex items-center justify-center shadow-[0_0_25px_rgba(0,224,255,0.8)] font-bold text-[10px]">
                  ↔
                </div>
              </div>

            </div>

          </div>

      </div>
    </section>
  );
}

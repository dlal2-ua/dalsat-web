import { useState } from 'react';

export default function RoiCalculator() {
  const [messagesPerDay, setMessagesPerDay] = useState<number>(60);
  const [hourlyCost, setHourlyCost] = useState<number>(25);

  // Asumiendo 3 minutos promedio por atención manual de llamada/mensaje
  const minutesSavedPerDay = messagesPerDay * 2.8;
  const hoursSavedPerMonth = Math.round((minutesSavedPerDay * 30) / 60);
  const moneySavedPerMonth = Math.round(hoursSavedPerMonth * hourlyCost);
  const moneySavedPerYear = moneySavedPerMonth * 12;

  return (
    <section id="calculadora" className="relative py-20 sm:py-28 bg-navy-900 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cian/15 via-cian-dark/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Calculadora de Rentabilidad
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            ¿Cuánto Ahorrarás con IA?
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Mueve los controles para calcular las horas y el dinero que recuperarás cada mes.
          </p>
        </div>

        {/* Tarjeta de la Calculadora */}
        <div className="bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] border border-cian/40 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Deslizadores Interactivos */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Sliders 1: Mensajes/Dudas al día */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="range-messages" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                     Consultas / Mensajes al día
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-cian font-mono bg-cian/10 px-3 py-1 rounded-xl border border-cian/30">
                    {messagesPerDay} <span className="text-xs font-sans font-normal text-white/70">/día</span>
                  </span>
                </div>
                <input
                  id="range-messages"
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={messagesPerDay}
                  onChange={(e) => setMessagesPerDay(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cian"
                />
                <div className="flex justify-between text-[11px] font-mono text-white/40">
                  <span>10 msgs</span>
                  <span>150 msgs</span>
                  <span>300+ msgs</span>
                </div>
              </div>

              {/* Sliders 2: Coste estimado por hora */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="range-cost" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                     Valor estimado de tu hora (o empleado)
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-cian font-mono bg-cian/10 px-3 py-1 rounded-xl border border-cian/30">
                    {hourlyCost} €<span className="text-xs font-sans font-normal text-white/70">/h</span>
                  </span>
                </div>
                <input
                  id="range-cost"
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cian"
                />
                <div className="flex justify-between text-[11px] font-mono text-white/40">
                  <span>10 €/h</span>
                  <span>45 €/h</span>
                  <span>80 €/h</span>
                </div>
              </div>

              {/* Nota explicativa */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/60 leading-relaxed flex items-start gap-2.5">
                <span className="text-cian font-bold text-base">ℹ</span>
                <span>Cálculo basado en 2.8 minutos medios por atención de llamada o respuesta manual en WhatsApp. La IA de Dalsat absorbe el 90% de este volumen de forma autónoma.</span>
              </div>

            </div>

            {/* Columna Derecha: Resultados de Impacto */}
            <div className="lg:col-span-5 bg-black/50 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cian/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-cian mb-4">
                  RESULTADO ESTIMADO DE AHORRO
                </div>

                {/* Métricas destacadas */}
                <div className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <div className="text-xs text-white/60 uppercase font-extrabold tracking-wider mb-1">
                      Horas Libres Recuperadas
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                      {hoursSavedPerMonth} <span className="text-base font-sans font-normal text-cian">horas/mes</span>
                    </div>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <div className="text-xs text-white/60 uppercase font-extrabold tracking-wider mb-1">
                      Ahorro Estimado al Mes
                    </div>
                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cian to-cian-light bg-clip-text text-transparent font-mono tracking-tight">
                      {moneySavedPerMonth.toLocaleString('es-ES')} €
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-white/60 uppercase font-extrabold tracking-wider mb-1">
                      Ahorro Proyectado al Año
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-cian font-mono">
                      ~ {moneySavedPerYear.toLocaleString('es-ES')} € /año
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón CTA directo */}
              <a
                href="#contacto"
                className="w-full py-4 rounded-2xl bg-terracota hover:bg-terracota-dark text-navy font-extrabold text-sm transition-all duration-300 text-center shadow-[0_0_25px_rgba(20,205,236,0.35)] hover:scale-[1.02] block cursor-pointer"
              >
                Empezar a Ahorrar Ahora →
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

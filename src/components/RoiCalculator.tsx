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
    <section id="calculadora" className="relative pb-20 sm:pb-28 pt-4 bg-navy-900 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cian/15 via-cian-dark/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* El titular lo pone la pagina: aqui repetido salian dos cabeceras
            seguidas diciendo lo mismo. */}

        {/* Tarjeta de la Calculadora */}
        <div className="bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.02] border border-cian/40 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Deslizadores Interactivos */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Sliders 1: Mensajes/Dudas al día */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="range-messages" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                     Mensajes y llamadas al día
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
                     Lo que vale una hora de tu equipo
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
                <span>La cuenta sale de 2,8 minutos por mensaje o llamada atendidos a mano, y de que el agente resuelve solo la mayor parte. Es una estimación para hacerte una idea, no una promesa: lo que ahorre tu negocio se ve mirando tu caso.</span>
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
                href="/contacto"
                className="w-full py-4 rounded-2xl bg-terracota hover:bg-terracota-dark text-navy font-extrabold text-sm transition-all duration-300 text-center shadow-[0_0_25px_rgba(217,100,44,0.35)] hover:scale-[1.02] block cursor-pointer"
              >
                Ver qué se puede automatizar →
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

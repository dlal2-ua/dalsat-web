export default function SatisfiedClients() {
  return (
    <section id="clientes" className="relative py-24 sm:py-36 bg-[#000814] border-t border-white/10 overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Iluminación de fondo ambiental esmerilada y cibernética */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-[#00E0FF]/20 via-[#0080FF]/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E0FF]/10 border border-[#00E0FF]/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,224,255,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E0FF]"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-[#00E0FF]">
              Empresas Satisfechas
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Resultados Reales
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Sistemas de IA operando en negocios reales.
          </p>
        </div>

        {/* Tarjeta Monumental de Caso de Éxito: Atrio Asesores */}
        <div className="group relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 md:p-16 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.02] border border-[#00E0FF]/50 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#00E0FF] hover:shadow-[0_0_80px_rgba(0,224,255,0.25)] overflow-hidden">
          
          {/* Resplandor superior neón */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00E0FF] via-[#0080FF] to-[#00E0FF]" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00E0FF]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00E0FF]/40 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            
            {/* Columna Izquierda: Logo de Atrio Asesores e Identificación */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6">
                🌟 Caso de Éxito Destacado
              </div>

              {/* Contenedor del Logo con fondo blanco para que resalte impecable */}
              <div className="p-4 sm:p-6 rounded-3xl bg-white shadow-[0_15px_35px_rgba(255,255,255,0.15)] mb-6 transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center w-64 sm:w-72 h-28 sm:h-32">
                <img 
                  src="/atrio-asesores.jpg" 
                  alt="Logo Atrio Asesores" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Atrio Asesores
              </h3>
              <p className="text-[#00E0FF] font-semibold text-sm sm:text-base">
                Asesoría Fiscal, Laboral y Contable
              </p>

            </div>

            {/* Columna Derecha: Métricas Impactantes y Testimonio */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8 pl-0 lg:pl-4">
              
              {/* Fila de Métricas */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/10 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-[#00E0FF] to-white bg-clip-text text-transparent font-mono mb-2">
                    -80%
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium leading-snug">
                    Consultas repetitivas automatizadas.
                  </div>
                </div>

                <div className="bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/10 relative overflow-hidden group/stat">
                  <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#00E0FF] to-[#0080FF] bg-clip-text text-transparent font-mono mb-2">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium leading-snug">
                    Atención por WhatsApp en campaña de Renta.
                  </div>
                </div>
              </div>

              {/* Testimonio Directo */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#00E0FF]">
                <p className="text-base sm:text-xl text-white/90 italic font-light leading-relaxed mb-4">
                  "El agente responde dudas fiscales básicas 24/7. Nos ha salvado la productividad y descongestionado las llamadas."
                </p>
                <div className="text-xs sm:text-sm font-bold text-white/60 tracking-wider uppercase">
                  Dirección General — <span className="text-white">Atrio Asesores</span>
                </div>
              </div>

            </div>

          </div>

          {/* Sello inferior de garantía */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              SISTEMA EN PRODUCCIÓN ACTIVA
            </span>
            <span>VERIFICADO POR DALSAT IA</span>
          </div>

        </div>

      </div>
    </section>
  );
}

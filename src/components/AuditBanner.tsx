const WHATSAPP_AUDIT_URL = 'https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20gustar%C3%ADa%20solicitar%20la%20auditor%C3%ADa%20gratuita%20de%20IA%20para%20mi%20negocio.';

export default function AuditBanner() {
  const HIGHLIGHTS = [
    {
      title: 'Diagnóstico',
      desc: 'Analizamos tus consultas repetitivas.',
    },
    {
      title: 'Demo en Vivo',
      desc: 'Simulación real de tu agente de IA.',
    },
    {
      title: 'Estimación ROI',
      desc: 'Cálculo exacto de horas ahorradas.',
    },
  ];

  return (
    <section id="auditoria" className="relative py-16 sm:py-24 bg-navy-900 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental cian/púrpura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-cian/20 via-cian-dark/20 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="bg-gradient-to-r from-white/[0.1] via-white/[0.04] to-white/[0.01] border border-cian/40 rounded-3xl p-6 sm:p-10 md:p-14 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-cian/70 transition-all duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Texto y Puntos Clave */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
                </span>
                <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
                  Sesión 100% Gratuita (15 min)
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                ¿Quieres saber cuánto puedes <span className="bg-gradient-to-r from-cian via-cian-dark to-cian bg-clip-text text-transparent">automatizar</span> en tu empresa?
              </h2>

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Analizamos tu negocio sin ningún compromiso. Descubre exactamente cuántas horas libres ganará tu equipo y cómo responderá tu agente de IA.
              </p>

              {/* 3 Destacados */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <div className="text-cian font-mono font-bold text-xs mb-1">
                      0{i + 1}. {h.title}
                    </div>
                    <p className="text-white/60 text-[11px] font-light leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Columna Derecha: Botón Destacado */}
            <div className="lg:col-span-5 bg-black/40 border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 shadow-2xl relative overflow-hidden">
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cian to-cian-dark flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(20,205,236,0.4)]">
                ⚡
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Reserva tu Diagnóstico Gratuito
                </h3>
                <p className="text-white/60 text-xs font-light">
                  Plazas limitadas por semana. Sin permanencia ni compromiso.
                </p>
              </div>

              <div className="w-full space-y-3 pt-2">
                <a
                  href={WHATSAPP_AUDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-terracota hover:bg-terracota-dark text-white font-extrabold text-sm transition-all duration-300 text-center shadow-[0_0_25px_rgba(217,100,44,0.35)] hover:scale-[1.02] block cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Solicitar Auditoría por WhatsApp
                </a>

                <a
                  href="#contacto"
                  className="block text-xs font-semibold text-cian hover:text-white transition-colors"
                >
                  o rellenar formulario web →
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

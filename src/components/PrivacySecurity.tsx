export default function PrivacySecurity() {
  const PILLARS = [
    {
      icon: (
        <svg className="w-6 h-6 text-cian" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Servidores Privados en España',
      subtitle: 'Alojamiento 100% europeo en infraestructuras privadas y seguras.',
      tag: '🇪🇸 Servidores España',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cian" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      title: 'Cifrado de Extremo a Extremo',
      subtitle: 'Tus conversaciones y los datos de tus clientes están protegidos con cifrado SSL/TLS 256-bit.',
      tag: 'AES-256 Bit',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cian-dark" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      title: 'Cumplimiento 100% RGPD / LOPD',
      subtitle: 'Sin uso comercial de tus datos ni entrenamiento de modelos públicos con tu información.',
      tag: 'Garantía RGPD',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cian-light" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7" />
        </svg>
      ),
      title: 'Entornos Aislados e Independientes',
      subtitle: 'Cada cliente dispone de su propia instancia segura y base de datos desacoplada.',
      tag: 'Aislamiento Total',
    },
  ];

  return (
    <section id="seguridad" className="relative py-20 sm:py-28 bg-navy-950 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental verde/cian de seguridad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cian/15 via-cian/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Privacidad y Seguridad Garantizada
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Tus Datos 100% Protegidos
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Infraestructura alojada en servidores privados bajo el cumplimiento estricto del RGPD europeo.
          </p>
        </div>

        {/* Cuadrícula de Pilares de Seguridad */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-cian/50 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  {pillar.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-cian">
                <span>PROTECCIÓN DALSAT</span>
                <span className="font-bold">VERIFICADO ✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Sello Oficial RGPD */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy via-navy-800 to-navy border border-cian/40 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cian/20 border border-cian/50 shrink-0 flex items-center justify-center text-2xl">
              🛡️
            </div>
            <div>
              <h4 className="text-lg font-bold text-white leading-tight">
                ¿Necesitas un Acuerdo de Confidencialidad o NDA?
              </h4>
              <p className="text-white/70 text-xs sm:text-sm font-light mt-0.5">
                Firmamos contratos de encargo de tratamiento de datos (DPA) para cumplir todas las exigencias legales de tu empresa.
              </p>
            </div>
          </div>

          <a
            href="#contacto"
            className="shrink-0 px-6 py-3 rounded-xl bg-terracota hover:bg-terracota-dark text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105"
          >
            Consultar Normativa →
          </a>
        </div>

      </div>
    </section>
  );
}

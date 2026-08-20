const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20interesa%20lo%20que%20hac%C3%A9is%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.';

export default function Footer() {
  return (
    <footer className="relative bg-[#000814] text-white/70 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-[#00E0FF]/10 via-[#25D366]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Parrilla de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca y Lema (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <img
                src="/logo_sin_fondo.png"
                alt="Dalsat Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display font-extrabold text-white text-xl tracking-wider group-hover:text-[#00E0FF] transition-colors">
                DALSAT
              </span>
            </a>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              Automatización inteligente con IA para empresas. Agentes de voz y WhatsApp que responden 24/7, agendan citas y ahorran cientos de horas al mes.
            </p>

            {/* Badge de estado del servicio */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sistemas operando 24/7</span>
            </div>
          </div>

          {/* Columna 2: Navegación (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#servicios" className="hover:text-[#00E0FF] transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#demos-voz" className="hover:text-[#00E0FF] transition-colors">Demos de Voz</a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-[#00E0FF] transition-colors">Calculadora Ahorro</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#00E0FF] transition-colors">Cómo Funciona</a>
              </li>
              <li>
                <a href="#quienes-somos" className="hover:text-[#00E0FF] transition-colors">Quiénes Somos</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soluciones (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Soluciones IA
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#servicios" className="hover:text-[#00E0FF] transition-colors">Agentes de WhatsApp 24/7</a>
              </li>
              <li>
                <a href="#demos-voz" className="hover:text-[#00E0FF] transition-colors">Agentes de Voz Inteligentes</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#00E0FF] transition-colors">Recordatorios de Citas</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#00E0FF] transition-colors">Escalado Humano en Tiempo Real</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Directo (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Contacto Rápido
            </h4>
            
            <p className="text-xs text-white/60">
              ¿Quieres ver una demo personalizada para tu negocio? Escríbenos directamente.
            </p>

            <div className="space-y-2.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6e] text-white font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Escríbenos por WhatsApp</span>
              </a>

              <a
                href="mailto:dalsat.soluciones@gmail.com"
                className="block text-center text-xs text-white/70 hover:text-[#00E0FF] transition-colors py-1 font-mono"
              >
                dalsat.soluciones@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© 2026 DALSAT. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Soluciones de IA en España 🇪🇸</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

import { useState } from 'react';

const PILLARS = [
  {
    id: 'tech',
    title: 'Tecnología real en producción, no demos',
    desc: 'IA de última generación (RAG) con memoria contextual persistente y adaptada a cada cliente.',
    icon: (
      <svg className="w-7 h-7 text-[#00E0FF]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    badge: 'Motor IA Avanzado',
    colSpan: 'lg:col-span-7',
    gradient: 'from-[#00E0FF]/20 via-transparent to-transparent',
    borderHover: 'hover:border-[#00E0FF]',
  },
  {
    id: 'support',
    title: 'Soporte de ingeniero a cliente',
    desc: 'Sin tickets interminables. Hablas por WhatsApp directamente con los ingenieros que crearon tu sistema.',
    icon: (
      <svg className="w-7 h-7 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    badge: 'Línea Directa',
    colSpan: 'lg:col-span-5',
    gradient: 'from-[#10B981]/20 via-transparent to-transparent',
    borderHover: 'hover:border-[#10B981]',
    action: {
      label: 'Escribir al 646 00 51 71',
      href: 'https://wa.me/34646005171',
    }
  },
  {
    id: 'privacy',
    title: 'Tus datos, en tu propio servidor',
    desc: 'Despliegue 100% en tu servidor privado. Tus bases de datos y conversaciones jamás se comparten.',
    icon: (
      <svg className="w-7 h-7 text-[#A78BFA]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    badge: 'Seguridad Blindada',
    colSpan: 'lg:col-span-5',
    gradient: 'from-[#A78BFA]/20 via-transparent to-transparent',
    borderHover: 'hover:border-[#A78BFA]',
  },
  {
    id: 'continuous',
    title: 'Afinamiento y mejora continua',
    desc: 'Revisamos conversaciones reales semanalmente para afinar el agente y elevar su precisión al máximo.',
    icon: (
      <svg className="w-7 h-7 text-[#F59E0B]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    badge: 'Evolución Semanal',
    colSpan: 'lg:col-span-7',
    gradient: 'from-[#F59E0B]/20 via-transparent to-transparent',
    borderHover: 'hover:border-[#F59E0B]',
  },
];

const STATS = [
  { label: 'Agentes desplegados en activo', value: '10+', color: 'from-[#00E0FF] to-[#0080FF]' },
  { label: 'Mensajes e interacciones gestionadas', value: '50.000+', color: 'from-[#34D399] to-[#10B981]' },
  { label: 'Disponibilidad operativa continua', value: '99,9%', color: 'from-[#F59E0B] to-[#D97706]' },
];

export default function AboutUs() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="quienes-somos" className="relative min-h-screen flex items-center bg-[#000814] py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Iluminación de fondo atmosférica */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#00E0FF]/15 via-[#7C6BD6]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl">
              <img src="/logo_sin_fondo.png" alt="Dalsat logo" className="h-16 sm:h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_0_20px_rgba(0,224,255,0.4)]" />
            </div>
          </div>

          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00E0FF] bg-[#00E0FF]/10 border border-[#00E0FF]/30 px-4 py-1.5 rounded-full inline-block shadow-[0_0_15px_rgba(0,224,255,0.2)] mb-4">
            Quiénes Somos
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Construido por ingenieros que entienden tu negocio
          </h2>
          <p className="text-white/70 text-base sm:text-xl leading-relaxed">
            Dalsat nació de una frustración real: ver cómo empresas brillantes pierden horas y ventas en tareas repetitivas. No vendemos humo — implantamos inteligencia artificial sólida y rentable.
          </p>
        </div>

        {/* Bento Grid de Pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onMouseEnter={() => setHoveredId(pillar.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`${pillar.colSpan} group relative rounded-3xl p-6 sm:p-10 border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1 ${pillar.borderHover}`}
            >
              {/* Resplandor interno dinámico */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${pillar.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.07] border border-white/15 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {pillar.action && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href={pillar.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      {pillar.action.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fila de Métricas Reales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-3xl p-8 border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl text-center overflow-hidden hover:border-white/40 hover:shadow-[0_10px_35px_rgba(0,224,255,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${stat.color} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r ${stat.color}`} />
                </span>
                <div className={`text-4xl sm:text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block font-mono`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-widest group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

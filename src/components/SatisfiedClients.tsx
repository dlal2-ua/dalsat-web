import { useState } from 'react';

interface ClientCase {
  id: string;
  name: string;
  category: string;
  tag: string;
  logo: string;
  logoBg: string;
  quote: string;
  role: string;
  metrics: { val: string; label: string }[];
  accentColor: string;
}

const CLIENTS: ClientCase[] = [
  {
    id: 'vibora-studio',
    name: 'Víbora Studio',
    category: 'Tatuaje & Micro Realismo',
    tag: '🌟 Caso de Éxito',
    logo: '/vibora-studio.png',
    logoBg: 'bg-navy-950',
    quote: 'La IA atiende dudas y agenda citas 24/7 sin interrumpirnos mientras tatuamos.',
    role: 'Víbora Studio',
    metrics: [
      { val: '-90%', label: 'Consultas de citas automatizadas.' },
      { val: '24/7', label: 'Reservas activas por WhatsApp.' },
    ],
    accentColor: '#14CDEC',
  },
  {
    id: 'atrio-asesores',
    name: 'Atrio Asesores',
    category: 'Asesoría Fiscal y Laboral',
    tag: '🌟 Caso de Éxito',
    logo: '/atrio-asesores.jpg',
    logoBg: 'bg-white',
    quote: 'El agente responde dudas 24/7 y ha descongestionado las llamadas.',
    role: 'Atrio Asesores',
    metrics: [
      { val: '-80%', label: 'Consultas automatizadas.' },
      { val: '24/7', label: 'Atención por WhatsApp.' },
    ],
    accentColor: '#14CDEC',
  },
];

export default function SatisfiedClients() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CLIENTS[activeIdx];

  return (
    <section id="clientes" className="relative py-20 sm:py-32 bg-navy-900 border-t border-white/10 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Iluminación de fondo ambiental esmerilada */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-cian/15 via-cian-dark/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Clientes Satisfechos
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Resultados Reales
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Sistemas de IA operando en negocios reales con éxito garantizado.
          </p>

          {/* Selector de Clientes */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {CLIENTS.map((client, idx) => (
              <button
                key={client.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-3 border cursor-pointer ${
                  idx === activeIdx
                    ? 'bg-white/15 text-white border-cian shadow-[0_0_25px_rgba(20,205,236,0.3)] scale-105'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: client.accentColor }} />
                <span>{client.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tarjeta Monumental de Caso de Éxito */}
        <div 
          key={active.id}
          className="group relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 md:p-14 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.02] border border-cian/40 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cian hover:shadow-[0_0_80px_rgba(20,205,236,0.25)] overflow-hidden"
        >
          
          {/* Resplandor superior neón */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cian via-cian-dark to-cian" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cian/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cian/35 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            
            {/* Columna Izquierda: Logo del Cliente e Identificación */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6">
                {active.tag}
              </div>

              {/* Contenedor del Logo */}
              <div className={`p-3 sm:p-4 rounded-3xl ${active.logoBg} border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] mb-6 transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center w-60 sm:w-72 h-32 sm:h-36 overflow-hidden`}>
                <img 
                  src={active.logo} 
                  alt={`Logo ${active.name}`} 
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {active.name}
              </h3>
              <p className="text-cian font-semibold text-sm sm:text-base">
                {active.category}
              </p>

            </div>

            {/* Columna Derecha: Métricas e Impacto */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8 pl-0 lg:pl-4">
              
              {/* Fila de Métricas */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {active.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/10 relative overflow-hidden group/stat">
                    <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-cian to-white bg-clip-text text-transparent font-mono mb-2">
                      {m.val}
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 font-medium leading-snug">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonio Directo */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-cian">
                <p className="text-base sm:text-xl text-white/90 italic font-light leading-relaxed mb-4">
                  "{active.quote}"
                </p>
                <div className="text-xs sm:text-sm font-bold text-white/60 tracking-wider uppercase">
                  {active.role}
                </div>
              </div>

            </div>

          </div>

          {/* Sello inferior de garantía */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cian" />
              SISTEMA EN PRODUCCIÓN ACTIVA
            </span>
            <span>VERIFICADO POR DALSAT IA</span>
          </div>

        </div>

      </div>
    </section>
  );
}


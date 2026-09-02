import { useState } from 'react';

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  /** El despacho no tiene identidad propia. El logo es un marcador nuestro,
   *  no su marca. Hay que sustituirlo en cuanto tengan uno de verdad. */
  logoProvisional?: boolean;
}

interface ClientCase {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoBg: string;
  quote: string;
  role: string;
  metrics: { val: string; label: string }[];
}

// Los tres clientes, para el carrusel de logos.
const LOGOS: ClientLogo[] = [
  { id: 'vibora-studio', name: 'Víbora Studio', logo: '/vibora-studio.png', logoBg: 'bg-navy-950' },
  { id: 'atrio-asesores', name: 'Atrio Asesores', logo: '/atrio-asesores.jpg', logoBg: 'bg-crema' },
  {
    id: 'beniabogados',
    name: 'Beniabogados',
    logo: '/beniabogados-provisional.svg',
    logoBg: 'bg-crema',
    logoProvisional: true,
  },
];

// Solo los casos con cifras y testimonio reales. Beniabogados esta en el
// carrusel pero todavia no aqui: no tenemos ni sus numeros ni su cita, y no
// se inventan.
const CASES: ClientCase[] = [
  {
    id: 'vibora-studio',
    name: 'Víbora Studio',
    category: 'Tatuaje y microrrealismo',
    logo: '/vibora-studio.png',
    logoBg: 'bg-navy-950',
    quote: 'La IA atiende dudas y agenda citas 24/7 sin interrumpirnos mientras tatuamos.',
    role: 'Víbora Studio',
    metrics: [
      { val: '-90%', label: 'Consultas de citas automatizadas.' },
      { val: '24/7', label: 'Reservas activas por WhatsApp.' },
    ],
  },
  {
    id: 'atrio-asesores',
    name: 'Atrio Asesores',
    category: 'Asesoría fiscal y laboral',
    logo: '/atrio-asesores.jpg',
    logoBg: 'bg-crema',
    quote: 'El agente responde dudas 24/7 y ha descongestionado las llamadas.',
    role: 'Atrio Asesores',
    metrics: [
      { val: '-80%', label: 'Consultas automatizadas.' },
      { val: '24/7', label: 'Atención por WhatsApp.' },
    ],
  },
];

// Con tres logos la tira se ve corta, asi que el juego se repite hasta llenar
// el ancho y luego se duplica entero: la animacion va de 0 a -50% y al saltar
// de vuelta cae en un punto identico, sin costura.
const REPETICIONES = 4;
const TIRA = Array.from({ length: REPETICIONES }, () => LOGOS).flat();

export default function SatisfiedClients() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CASES[activeIdx];

  return (
    <section
      id="clientes"
      className="relative py-20 sm:py-28 bg-navy-900 border-t border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-cian/15 via-cian-dark/15 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <style>{`
        @keyframes clientesMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: clientesMarquee 38s linear infinite;
          width: max-content;
        }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .marquee { overflow-x: auto; }
        }
      `}</style>

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.25)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Clientes
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Resultados reales
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Negocios de toda España que ya tienen parte de su trabajo automatizado.
          </p>
        </div>
      </div>

      {/* Carrusel de logos: sale por la izquierda y vuelve a entrar por la derecha */}
      <div className="marquee relative w-full overflow-hidden mb-14 sm:mb-20" aria-label="Clientes de DALSAT">
        {/* Difuminado en los bordes para que no se corten de golpe */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-navy-900 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-navy-900 to-transparent" aria-hidden="true" />

        <ul className="marquee-track flex list-none items-center gap-5 sm:gap-8 p-0 m-0">
          {[...TIRA, ...TIRA].map((client, i) => (
            <li
              key={`${client.id}-${i}`}
              aria-hidden={i >= TIRA.length ? 'true' : undefined}
              className={`${client.logoBg} shrink-0 flex items-center justify-center rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)] w-40 sm:w-52 h-24 sm:h-28 p-4 sm:p-5`}
            >
              <img
                src={client.logo}
                alt={client.logoProvisional ? `Logo provisional de ${client.name}` : `Logo de ${client.name}`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Selector de casos */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10">
          {CASES.map((client, idx) => (
            <button
              key={client.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-pressed={idx === activeIdx}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-3 border cursor-pointer ${
                idx === activeIdx
                  ? 'bg-white/15 text-white border-cian shadow-[0_0_25px_rgba(20,205,236,0.3)] scale-105'
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cian" aria-hidden="true" />
              <span>{client.name}</span>
            </button>
          ))}
        </div>

        {/* Tarjeta del caso */}
        <div
          key={active.id}
          className="group relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 md:p-14 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.02] border border-cian/40 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cian hover:shadow-[0_0_80px_rgba(20,205,236,0.25)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cian via-cian-dark to-cian" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cian/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cian/35 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            {/* Identificación del cliente */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6">
                Caso real
              </div>

              <div
                className={`p-3 sm:p-4 rounded-3xl ${active.logoBg} border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] mb-6 transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center w-60 sm:w-72 h-32 sm:h-36 overflow-hidden`}
              >
                <img
                  src={active.logo}
                  alt={`Logo de ${active.name}`}
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {active.name}
              </h3>
              <p className="text-cian font-semibold text-sm sm:text-base">{active.category}</p>
            </div>

            {/* Métricas y testimonio */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8 pl-0 lg:pl-4">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {active.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                    <div className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-cian to-white bg-clip-text text-transparent font-mono mb-2">
                      {m.val}
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 font-medium leading-snug">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-cian">
                <p className="text-base sm:text-xl text-white/90 italic font-light leading-relaxed mb-4">
                  &laquo;{active.quote}&raquo;
                </p>
                <div className="text-xs sm:text-sm font-bold text-white/60 tracking-wider uppercase">
                  {active.role}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cian" />
              FUNCIONANDO AHORA MISMO
            </span>
            <span>DALSAT</span>
          </div>
        </div>
      </div>
    </section>
  );
}

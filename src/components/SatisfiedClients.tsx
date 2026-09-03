interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  /**
   * Frase que va debajo del logo, en palabras del cliente.
   *
   * IMPORTANTE: esto se publica atribuido a una empresa real y con nombre.
   * Tiene que ser algo que el cliente haya dicho de verdad y con su permiso.
   * No se rellena a ojo ni se redacta "en su nombre": seria poner palabras en
   * boca de un tercero en una web comercial. Mientras este vacio no se pinta
   * nada, que es preferible a inventarselo.
   */
  frase?: string;
}

// Los clientes, para el carrusel de logos.
const LOGOS: ClientLogo[] = [
  { id: 'vibora-studio', name: 'Víbora Studio', logo: '/vibora-studio.webp', logoBg: 'bg-navy-950' },
  { id: 'atrio-asesores', name: 'Atrio Asesores', logo: '/atrio-asesores.jpg', logoBg: 'bg-crema' },
  // El logo lo dibujamos nosotros: el despacho no tenia uno.
  { id: 'beniabogados', name: 'Beniabogados', logo: '/beniabogados.svg', logoBg: 'bg-crema' },
];

// Con tres logos la tira se ve corta, asi que el juego se repite hasta llenar
// el ancho y luego se duplica entero: la animacion va de 0 a -50% y al saltar
// de vuelta cae en un punto identico, sin costura.
const REPETICIONES = 4;
const TIRA = Array.from({ length: REPETICIONES }, () => LOGOS).flat();

export default function SatisfiedClients() {
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
        /* Las piezas son mas grandes que antes, asi que la tira recorre mas
           distancia. Se sube la duracion de 38s a 55s para que la velocidad
           en pantalla siga siendo la misma. */
        .marquee-track {
          animation: clientesMarquee 55s linear infinite;
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
            Nuestros clientes
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            Negocios de toda España que ya tienen parte de su trabajo automatizado.
          </p>
        </div>
      </div>

      {/* Carrusel de logos: sale por la izquierda y vuelve a entrar por la derecha */}
      <div className="marquee relative w-full overflow-hidden" aria-label="Clientes de DALSAT">
        {/* Difuminado en los bordes para que no se corten de golpe */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-navy-900 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-navy-900 to-transparent" aria-hidden="true" />

        <ul className="marquee-track flex list-none items-center gap-6 sm:gap-10 p-0 m-0">
          {[...TIRA, ...TIRA].map((client, i) => (
            <li
              key={`${client.id}-${i}`}
              aria-hidden={i >= TIRA.length ? 'true' : undefined}
              className="shrink-0 w-56 sm:w-80"
            >
              <div
                className={`${client.logoBg} flex items-center justify-center rounded-3xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)] h-36 sm:h-44 p-6 sm:p-8`}
              >
                <img
                  src={client.logo}
                  alt={`Logo de ${client.name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {client.frase && (
                <figcaption className="mt-4 px-1 text-center text-sm leading-snug text-white/70">
                  <q className="italic">{client.frase}</q>
                  <span className="mt-1.5 block text-xs font-bold not-italic text-cian/70">
                    {client.name}
                  </span>
                </figcaption>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

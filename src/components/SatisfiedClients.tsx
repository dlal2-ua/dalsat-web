import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  /**
   * Frase publicada debajo del logo, atribuida al cliente.
   *
   * Solo se rellena con lo que el cliente haya aprobado. Es una cita con
   * nombre y apellidos de una empresa real en una web comercial: publicar
   * aqui algo que no ha dicho es publicidad enganosa (Ley 3/1991 de
   * Competencia Desleal, y la Directiva Omnibus prohibe expresamente las
   * resenas fabricadas). Mientras este vacio no se pinta nada.
   */
  frase?: string;

  /**
   * Borrador redactado por nosotros, pendiente de que el cliente lo confirme.
   * NO se pinta: existe para mandarselo y que diga si le vale o lo cambia.
   *
   * Flujo: se le manda tal cual -> contesta "ok" o lo corrige -> su version
   * se mueve a `frase` y se borra este campo. Con eso pasa a ser una cita
   * suya de verdad, que es lo unico publicable.
   */
  frasePropuesta?: string;
}

// Los clientes, para el carrusel de logos.
const LOGOS: ClientLogo[] = [
  {
    id: 'vibora-studio',
    name: 'Víbora Studio',
    logo: '/vibora-studio.webp',
    logoBg: 'bg-navy-950',
    // Borrador. Se apoya en lo que ya contamos de ellos en /demos, donde el
    // sector de tatuaje lleva su nombre: citas, estilos y disponibilidad.
    frasePropuesta:
      'Antes parábamos de tatuar para coger el móvil. Ahora las citas entran solas y solo miramos la agenda.',
  },
  {
    id: 'atrio-asesores',
    name: 'Atrio Asesores',
    logo: '/atrio-asesores.jpg',
    logoBg: 'bg-crema',
    // Borrador. En /demos el sector de asesoría lleva su nombre: dudas de
    // facturación y Renta, y cita con el especialista.
    frasePropuesta:
      'En campaña de Renta nos llovían las mismas preguntas. El agente las resuelve y a nosotros nos llega solo lo que hay que mirar.',
  },
  {
    id: 'beniabogados',
    name: 'Beniabogados',
    logo: '/beniabogados.svg',
    logoBg: 'bg-crema',
    // El logo lo dibujamos nosotros: el despacho no tenia uno.
    // Borrador apoyado en eso, que es lo unico que sabemos con certeza de
    // este cliente. Si les hicimos algo mas, cambiar la frase antes de
    // mandarsela.
    frasePropuesta:
      'No teníamos ni logo. Salimos con una imagen propia y una web que explica lo que hacemos.',
  },
];

// Con tres logos la tira se ve corta, asi que el juego se repite hasta llenar
// el ancho y luego se duplica entero: la animacion va de 0 a -50% y al saltar
// de vuelta cae en un punto identico, sin costura.
const REPETICIONES = 4;
const TIRA = Array.from({ length: REPETICIONES }, () => LOGOS).flat();

interface Props {
  idioma?: Idioma;
}

export default function SatisfiedClients({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);

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
              {t.clientes.etiqueta}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {t.clientes.titulo}
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            {t.clientes.entradilla}
          </p>
          <p className="mt-3 text-sm font-semibold text-cian/80">
            {t.clientes.porQue}
          </p>
        </div>
      </div>

      {/* Carrusel de logos: sale por la izquierda y vuelve a entrar por la derecha */}
      <div className="marquee relative w-full overflow-hidden" aria-label={t.clientes.titulo}>
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

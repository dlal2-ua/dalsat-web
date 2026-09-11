import type { CSSProperties } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  /** Medidas reales del fichero, para reservar el hueco antes de que cargue. */
  width: number;
  height: number;
  /**
   * Fondo de la pieza del logo. Los que van sobre crema se funden con
   * mix-blend-multiply: el JPG de Atrio trae fondo blanco y, sin eso, se
   * veria un rectangulo blanco dentro de la pieza.
   */
  logoBg: 'bg-navy-950' | 'bg-crema';
  /** Relleno de la pieza: el de Víbora es un cartel cuadrado y va casi a sangre. */
  logoPad: string;
  /**
   * Frase publicada debajo del logo, atribuida al cliente.
   *
   * Solo se rellena con lo que el cliente haya aprobado. Es una cita con
   * nombre y apellidos de una empresa real en una web comercial: publicar
   * aqui algo que no ha dicho es publicidad enganosa (Ley 3/1991 de
   * Competencia Desleal, y la Directiva Omnibus prohibe expresamente las
   * resenas fabricadas).
   *
   * Las tres actuales las redactamos nosotros y las aprobaron los tres
   * clientes antes de publicarse. Si alguna se cambia, vuelve a hacer falta
   * su visto bueno: mientras tanto se deja vacia y no se pinta nada.
   */
  frase?: string;

}

// Los clientes y lo que dicen. El orden de este array es el orden en pantalla.
const LOGOS: ClientLogo[] = [
  {
    id: 'vibora-studio',
    name: 'Víbora Studio',
    logo: '/vibora-studio.webp',
    width: 320,
    height: 360,
    logoBg: 'bg-navy-950',
    logoPad: 'p-1',
    frase:
      'Antes parábamos de tatuar para coger el móvil, y aun así se nos escapaban mensajes por la noche. Ahora la cita entra sola mientras trabajamos y por la mañana solo miramos la agenda.',
  },
  {
    id: 'atrio-asesores',
    name: 'Atrio Asesores',
    logo: '/atrio-asesores.jpg',
    width: 300,
    height: 95,
    logoBg: 'bg-crema',
    logoPad: 'p-4',
    frase:
      'En campaña de Renta nos llovían las mismas cuatro preguntas todo el día. Ahora las contesta el agente y a nosotros nos llega solo el caso que hay que mirar de verdad.',
  },
  {
    id: 'beniabogados',
    name: 'Beniabogados',
    logo: '/beniabogados.svg',
    width: 340,
    height: 150,
    logoBg: 'bg-crema',
    logoPad: 'p-3',
    // El logo lo dibujamos nosotros: el despacho no tenia uno.
    frase:
      'No teníamos ni logo, y explicábamos el despacho por teléfono uno a uno. Ahora tenemos imagen propia y una web que lo cuenta por nosotros antes de que llamen.',
  },
];

// Antes esto era una tira que se movia sola sin parar (los tres clientes
// repetidos 24 veces, en bucle de 55 s): las citas no se podian leer enteras
// y no habia forma de pararla (WCAG 2.2.2). Ahora son tres citas quietas, y es
// la unica banda clara de la home: rompe la sucesion de azules.

interface Props {
  idioma?: Idioma;
}

export default function SatisfiedClients({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);

  return (
    <section
      id="clientes"
      className="relative py-20 sm:py-28 bg-crema text-grafito overflow-hidden"
      data-mascot-perch="clientes"
    >
      {/* Profundidad barata: una retícula de puntos navy casi invisible y una
          luz cian en la esquina, las dos como fondo de la propia capa. Nada de
          blur: sobre crema no hace falta y cuesta pintarlo. */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(20,205,236,0.14),transparent_55%),radial-gradient(circle_at_1px_1px,rgba(7,40,71,0.07)_1px,transparent_0)] bg-[size:auto,22px_22px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Cabecera a la izquierda, entradilla descolgada: la misma forma que
            "Se combinan" en /servicios, no el badge centrado del resto. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-5 items-end mb-14 sm:mb-20" data-reveal>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[3px] w-10 bg-cian" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-navy/70">
                {t.clientes.etiqueta}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              {t.clientes.titulo}
            </h2>
          </div>
          <p className="lg:col-span-5 lg:pb-2 text-grafito/80 text-base sm:text-lg leading-relaxed">
            {t.clientes.entradilla}
          </p>
        </div>

        {/* Tres citas quietas. Cada una es su propio <figure>: logo arriba,
            la cita, y el nombre del negocio como pie. Sin nombres de persona:
            las citas las redactamos nosotros y las aprobo cada negocio. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 xl:gap-x-14 gap-y-16">
          {LOGOS.filter((client) => client.frase).map((client, i) => (
            <figure
              key={client.id}
              className="relative m-0 flex flex-col border-t border-navy/20 pt-8"
              data-reveal
              style={{ '--reveal-delay': `${i * 120}ms` } as CSSProperties}
            >
              {/* Tramo cian grueso sobre el filete: a 1px el cian no se ve
                  sobre crema, con masa si. */}
              <span className="absolute -top-[2px] left-0 h-[3px] w-14 bg-cian" aria-hidden="true" />

              {/* alt vacio a proposito: el nombre del negocio va en el pie de
                  esta misma figura, y con alt se leeria dos veces seguidas. */}
              <div
                className={`${client.logoBg} ${client.logoPad} flex h-24 w-44 items-center justify-center overflow-hidden rounded-2xl border border-navy/10`}
              >
                <img
                  src={client.logo}
                  alt=""
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`h-full w-full object-contain${client.logoBg === 'bg-crema' ? ' mix-blend-multiply' : ''}`}
                />
              </div>

              <span
                className="mt-8 block h-10 font-display text-7xl font-bold leading-none text-cian select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* La cita no se traduce: es literal y va en castellano, marcada
                  con lang para que un lector de pantalla en ingles no la lea
                  con acento ingles. */}
              <blockquote className="m-0 flex-1" lang={idioma === 'es' ? undefined : 'es'}>
                <p className="font-display text-xl sm:text-2xl font-medium leading-snug tracking-tight text-navy">
                  {client.frase}
                </p>
              </blockquote>

              {/* En ingles, la traduccion debajo y marcada como tal, para que
                  un visitante que no lea castellano sepa que dice. */}
              {t.clientes.etiquetaTraduccion && t.clientes.traducciones[client.id] && (
                <p className="mt-5 text-sm leading-relaxed text-grafito/80">
                  <span className="mr-1.5 font-bold text-navy">
                    {t.clientes.etiquetaTraduccion}
                  </span>
                  {t.clientes.traducciones[client.id]}
                </p>
              )}

              <figcaption className="mt-7 flex items-center gap-3 border-t border-navy/10 pt-5 text-sm font-bold text-navy">
                <span className="h-px w-6 bg-navy/40" aria-hidden="true" />
                {client.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { CSSProperties } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import type { Contenido } from '../i18n/es';
import { urlWhatsApp } from '../data/contacto';

type Textos = Contenido['sobreNosotros'];

interface Pilar {
  id: string;
  title: string;
  desc: string;
  /** Etiqueta corta a la derecha. Solo donde el texto la da; no se inventa. */
  badge?: string;
  action?: { label: string; href: string };
}

// Los cuatro pilares, como filas de indice (numero, titulo, texto), igual
// que el indice de servicios de la home. Antes eran cuatro tarjetas de
// cristal con icono, la misma plantilla que el resto del sitio.
//
// Aqui habia tambien una fila de cifras ("10+", "50.000+", "99,9%"). Eran
// aproximadas, no medidas: se quitaron. No volver a poner cifras sin dato
// que las respalde.
const pilares = (t: Textos, whatsapp: string): Pilar[] => [
  {
    id: 'real',
    title: t.pilares.real.titulo,
    desc: t.pilares.real.texto,
    badge: t.pilares.real.badge,
  },
  {
    id: 'trato',
    title: t.pilares.trato.titulo,
    desc: t.pilares.trato.texto,
    badge: t.pilares.trato.badge,
    action: {
      label: t.pilares.trato.enlace,
      href: whatsapp,
    },
  },
  {
    // Sin etiqueta a proposito: en privacidad, un resumen de dos palabras
    // ("tus datos son tuyos") dice mas que el texto y seria una afirmacion
    // nueva. El texto ya lo explica con precision.
    id: 'datos',
    title: t.pilares.datos.titulo,
    desc: t.pilares.datos.texto,
  },
  {
    id: 'mejora',
    title: t.pilares.mejora.titulo,
    desc: t.pilares.mejora.texto,
    badge: t.pilares.mejora.badge,
  },
];

interface Props {
  idioma?: Idioma;
}

export default function AboutUs({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const textos = contenido(idioma);
  const t = textos.sobreNosotros;
  const PILLARS = pilares(t, urlWhatsApp(textos.comun.mensajeWhatsApp));

  // Sin estado ni efectos: el componente se pinta igual hidratado que sin
  // hidratar, y el revelado de las filas lo hace Layout.astro ([data-reveal]).
  return (
    <section id="quienes-somos" className="relative bg-navy-900 overflow-hidden">
      {/* Cabecera de la pagina, sobre navy. La luz va como fondo de la capa,
          no como mancha con blur. */}
      <div className="relative py-16 sm:py-24 bg-[radial-gradient(ellipse_at_15%_0%,rgba(20,205,236,0.16),transparent_55%)]">
        <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-end">
            <div className="lg:col-span-7">
              {/* Decorativo: la marca ya se nombra en la cabecera fija de
                  arriba, y aqui con alt se leeria "DALSAT" dos veces. */}
              <img
                src="/logo-dalsat.png"
                alt=""
                width={512}
                height={279}
                className="h-12 sm:h-[4.5rem] w-auto object-contain brightness-0 invert mb-8"
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[3px] w-10 bg-cian" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
                  {t.etiqueta}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
                {t.titulo}
              </h1>
            </div>
            <p className="lg:col-span-5 lg:pb-2 text-white/75 text-base sm:text-lg leading-relaxed border-l-2 border-cian/40 pl-5">
              {t.entradilla}
            </p>
          </div>
        </div>
      </div>

      {/* Los pilares, en banda crema: filas de indice, sin tarjetas. Sobre
          crema el cian a 1px no se ve, asi que los filetes son navy tenue y
          el cian va solo en un tramo grueso al principio de cada fila. */}
      <div className="bg-crema text-grafito py-16 sm:py-24">
        <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ol className="border-t border-navy/20 list-none p-0 m-0">
            {PILLARS.map((pillar, i) => (
              <li
                key={pillar.id}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 border-b border-navy/15 py-8 sm:py-11"
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <span className="absolute -top-[2px] left-0 h-[3px] w-10 bg-cian" aria-hidden="true" />

                <span className="md:col-span-1 font-mono text-sm font-bold text-navy/60 tabular-nums pt-1.5" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h2 className="md:col-span-4 text-2xl sm:text-3xl font-extrabold text-navy tracking-tight leading-tight">
                  {pillar.title}
                </h2>

                <div className="md:col-span-5">
                  <p className="text-grafito/85 text-base sm:text-lg leading-relaxed">
                    {pillar.desc}
                  </p>

                  {pillar.action && (
                    <a
                      href={pillar.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-terracota hover:bg-terracota-light text-navy-950 font-bold text-sm transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      {pillar.action.label}
                    </a>
                  )}
                </div>

                {pillar.badge && (
                  <p className="md:col-span-2 md:text-right md:pt-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy/70">
                    {pillar.badge}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

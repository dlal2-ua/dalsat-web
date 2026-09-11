import type { CSSProperties } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

// Solo los iconos: el texto de cada paso vive en src/i18n. El orden manda.
const ICONOS = [
  'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25h7.5m-7.5 3h7.5m3-9v9a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V4.5a2.25 2.25 0 0 1 2.25-2.25h5.379c.597 0 1.17.237 1.591.659l4.621 4.621c.422.422.659.994.659 1.591Z',
  'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z',
  'M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
];

interface Props {
  idioma?: Idioma;
}

// Linea de tiempo, no tarjetas: tres numerales grandes unidos por un filete.
// En escritorio el filete corre en horizontal de un numero al siguiente; en
// movil los pasos se apilan y el filete baja en vertical por la izquierda.
//
// Es la banda clara de /servicios: entre el CRM (navy) y el cierre (navy).
// Sobre crema el cian a 1px no se ve, asi que el filete es navy tenue y el
// cian va solo en un tramo corto y grueso junto a cada numero.
//
// Sin estado ni efectos a proposito. El revelado lo hace el sistema global
// de Layout.astro ([data-reveal] + --reveal-delay), que ya contempla sin-JS
// y prefers-reduced-motion. Asi el componente funciona igual hidratado que
// sin hidratar, y nunca se puede quedar en opacity 0.
export default function StepScroll({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const STEPS = t.pasos.lista.map((paso, i) => ({
    number: String(i + 1),
    title: paso.titulo,
    desc: paso.texto,
    tag: paso.etiqueta,
    icon: ICONOS[i],
  }));
  const ULTIMO = STEPS.length - 1;

  return (
    <section
      id="como-funciona"
      className="relative bg-crema text-grafito py-20 sm:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,205,236,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-5 items-end mb-14 sm:mb-20" data-reveal>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[3px] w-10 bg-cian" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-navy/70">
                {t.pasos.etiqueta}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              {t.pasos.titulo}
            </h2>
          </div>
          <p className="lg:col-span-5 lg:pb-2 text-grafito/80 text-base sm:text-lg leading-relaxed">
            {t.pasos.entradilla}
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-10 lg:gap-x-14 list-none p-0 m-0">
          {STEPS.map((step, idx) => (
            <li
              key={step.number}
              // content-start: los tres <li> se estiran a la altura del mas
              // alto, y sin esto el hueco sobrante se reparte entre las filas
              // y los numerales de los pasos cortos bajan unos pixeles.
              className="grid content-start grid-cols-[3.5rem_1fr] gap-x-5 md:grid-cols-1 md:gap-x-0"
              data-reveal
              style={{ '--reveal-delay': `${idx * 140}ms` } as CSSProperties}
            >
              {/* Numeral y filete. En movil es una columna (numero arriba,
                  filete bajando hasta el siguiente); en escritorio, una fila
                  (numero a la izquierda, filete corriendo hasta el siguiente).
                  aria-hidden: el numero ya lo anuncia el <ol>. */}
              <div className="flex flex-col items-center md:flex-row md:gap-4 md:mb-8" aria-hidden="true">
                <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tighter text-navy tabular-nums select-none">
                  {step.number}
                </span>
                <span className="mt-3 h-6 w-[3px] shrink-0 bg-cian md:mt-0 md:h-[3px] md:w-10" />
                {idx < ULTIMO ? (
                  // Cruza el hueco entre pasos (-mb / -mr del mismo tamaño que
                  // el gap) para que el filete llegue al numero siguiente.
                  <span className="mt-2 -mb-12 w-px flex-1 bg-navy/20 md:mt-0 md:mb-0 md:h-px md:w-auto md:-mr-10 lg:-mr-14" />
                ) : (
                  <span className="hidden md:block md:h-px md:flex-1 bg-gradient-to-r from-navy/20 to-transparent" />
                )}
              </div>

              <div className="pb-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-grafito/80 text-base leading-relaxed mb-6 max-w-md">
                  {step.desc}
                </p>

                <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-navy">
                  <svg className="w-4 h-4 shrink-0 text-navy/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                  {step.tag}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

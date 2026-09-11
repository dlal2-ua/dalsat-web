import { contenido } from '../i18n';
import type { CSSProperties } from 'react';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

// Las cuatro capacidades, anotadas sobre la captura. El texto vive en
// src/i18n; aqui solo el orden y donde cae cada marca en la imagen.
//
// `x` e `y` son porcentajes medidos sobre /panel-dalsat.jpg (1600x771):
// Mensajes, Asistente de Voz y Agenda en el menu lateral, y el bloque
// "Metricas del negocio". SI SE CAMBIA LA CAPTURA, HAY QUE VOLVER A MEDIRLOS:
// si no, las marcas señalan a otra cosa.
const MARCAS: { id: 'chat' | 'voz' | 'reservas' | 'metricas'; x: number; y: number }[] = [
  { id: 'chat', x: 10, y: 36.3 },
  { id: 'voz', x: 10, y: 48.8 },
  { id: 'reservas', x: 10, y: 19.6 },
  { id: 'metricas', x: 38.4, y: 29.1 },
];

// La marca numerada, igual en la captura y en la lista, para que se lea que
// una remite a la otra. Cian como acento (no es un boton ni se pulsa).
// Sin `display`: cada uso pone el suyo (la de la captura va hidden sm:flex).
const MARCA =
  'h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cian font-mono text-xs font-bold text-navy tabular-nums';

interface Props {
  idioma?: Idioma;
}

export default function Platform({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const CAPACIDADES = MARCAS.map((m) => ({ ...m, ...t.plataforma.capacidades[m.id] }));

  return (
    <section
      id="plataforma"
      className="relative bg-navy border-t border-white/10 py-20 sm:py-28 overflow-hidden"
    >
      {/* Reticula y luz en una sola capa de fondo: sin mancha con blur. */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_85%_35%,rgba(20,205,236,0.12),transparent_50%),linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16" data-reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[3px] w-10 bg-cian" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
              {t.plataforma.etiqueta}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            {t.plataforma.titulo}
          </h2>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">
            {t.plataforma.texto}
          </p>
        </div>

        {/* Captura real del panel, sobre una ventana falsa para que se lea
            como pantallazo y no como parte de la web. Es una cuenta de
            pruebas: ahi no hay datos de ningun cliente. */}
        <figure className="mb-14 sm:mb-16 m-0">
          <div className="rounded-2xl border border-white/15 bg-navy-950 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="ml-3 truncate font-mono text-[11px] text-white/60">app.dalsats.com</span>
            </div>
            <div className="relative">
              <img
                src="/panel-dalsat.jpg"
                width={1600}
                height={771}
                loading="lazy"
                decoding="async"
                alt={t.plataforma.altCaptura}
                className="block w-full h-auto"
              />
              {/* Las marcas sobre la captura. Desde sm: en movil la imagen
                  es tan estrecha que taparian lo que señalan, y la lista de
                  abajo se entiende igual sin ellas. */}
              {CAPACIDADES.map((c, i) => (
                <span
                  key={c.id}
                  className={`${MARCA} absolute hidden sm:flex -translate-x-1/2 -translate-y-1/2 ring-4 ring-navy/70 shadow-[0_4px_14px_rgba(3,19,31,0.45)]`}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <figcaption className="mt-3 text-xs text-white/60">
            {t.plataforma.pieCaptura}
          </figcaption>
        </figure>

        {/* Leyenda de la captura: cada numero remite a su marca de arriba.
            Filete y numero, sin tarjeta. */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-10 list-none p-0 m-0 mb-14 sm:mb-16">
          {CAPACIDADES.map((c, i) => (
            <li
              key={c.id}
              className="relative border-t border-white/15 pt-6"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
            >
              <span className="absolute -top-[2px] left-0 h-[3px] w-10 bg-cian" aria-hidden="true" />
              <div className="flex items-center gap-3 mb-3">
                <span className={`${MARCA} flex`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">{c.titulo}</h3>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">{c.texto}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-t border-white/10 pt-8">
          <p className="text-white/80 text-sm sm:text-base flex-1">
            {t.plataforma.incluido}
          </p>
          <a
            href="https://app.dalsats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3 rounded-xl border border-cian/40 bg-cian/10 text-cian font-bold text-sm transition-colors hover:bg-cian/20 hover:text-white"
          >
            {t.plataforma.entrar}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

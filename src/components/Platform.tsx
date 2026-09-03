import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

// Solo el icono de cada capacidad: el texto vive en src/i18n porque cambia
// con el idioma. El orden de este array es el orden en pantalla.
const ICONOS: { id: 'chat' | 'voz' | 'reservas' | 'metricas'; icono: string }[] = [
  {
    id: 'chat',
    icono:
      'M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z',
  },
  {
    id: 'voz',
    icono:
      'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z',
  },
  {
    id: 'reservas',
    icono:
      'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
  },
  {
    id: 'metricas',
    icono:
      'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
  },
];

interface Props {
  idioma?: Idioma;
}

export default function Platform({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const CAPACIDADES = ICONOS.map((i) => ({ ...i, ...t.plataforma.capacidades[i.id] }));

  return (
    <section
      id="plataforma"
      className="relative bg-navy border-t border-white/10 py-20 sm:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-cian/10 rounded-full blur-[170px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cian bg-cian/10 border border-cian/30 px-4 py-1.5 rounded-full inline-block mb-5">
            {t.plataforma.etiqueta}
          </span>
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
        <figure className="mb-12 sm:mb-16 m-0">
          <div className="rounded-2xl border border-white/15 bg-navy-950/60 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="ml-3 truncate font-mono text-[11px] text-white/40">app.dalsats.com</span>
            </div>
            <img
              src="/panel-dalsat.jpg"
              width={1600}
              height={771}
              loading="lazy"
              decoding="async"
              alt={t.plataforma.altCaptura}
              className="block w-full h-auto"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-white/45">
            {t.plataforma.pieCaptura}
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {CAPACIDADES.map((c) => (
            <article
              key={c.id}
              className="group relative rounded-3xl p-6 sm:p-7 border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-cian/50 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-cian/15 via-transparent to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/15 inline-flex mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-cian" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icono} />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 leading-snug">{c.titulo}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{c.texto}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl">
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

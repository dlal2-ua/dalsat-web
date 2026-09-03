import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import { useEffect, useRef, useState } from 'react';

// Solo los iconos: el texto de cada paso vive en src/i18n. El orden manda.
const ICONOS = [
  'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25h7.5m-7.5 3h7.5m3-9v9a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V4.5a2.25 2.25 0 0 1 2.25-2.25h5.379c.597 0 1.17.237 1.591.659l4.621 4.621c.422.422.659.994.659 1.591Z',
  'M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z',
  'M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
];

interface Props {
  idioma?: Idioma;
}

export default function StepScroll({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const STEPS = t.pasos.lista.map((paso, i) => ({
    number: String(i + 1),
    title: paso.titulo,
    desc: paso.texto,
    tag: paso.etiqueta,
    icon: ICONOS[i],
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Los tres pasos se ven a la vez. Lo unico que hace el scroll es dispararlos
  // al entrar en pantalla, escalonados, y una sola vez.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative bg-navy-900 border-t border-white/10 py-20 sm:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cian/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .step-card { opacity: 0; }
        .step-card.is-in { animation: stepIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .step-card, .step-card.is-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cian border border-cian/30 bg-cian/10 px-4 py-1.5 rounded-full inline-block backdrop-blur-md shadow-[0_0_15px_rgba(20,205,236,0.2)] mb-4">
            {t.pasos.etiqueta}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.pasos.titulo}
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            {t.pasos.entradilla}
          </p>
        </div>

        {/* Los tres pasos, a la vez */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 list-none p-0 m-0">
          {STEPS.map((step, idx) => (
            <li
              key={step.number}
              className={`step-card${visible ? ' is-in' : ''} relative rounded-3xl p-7 sm:p-9 border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl overflow-hidden flex flex-col`}
              style={{ animationDelay: `${idx * 130}ms` }}
            >
              <div
                className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-cian/15 via-transparent to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-extrabold text-5xl sm:text-6xl leading-none tracking-tighter bg-gradient-to-b from-cian to-cian-dark bg-clip-text text-transparent select-none">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-cian/40 to-transparent" aria-hidden="true" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-7">
                  {step.desc}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 self-start text-xs sm:text-sm font-extrabold text-cian bg-cian/10 py-2.5 px-4 rounded-2xl border border-cian/30">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                  <span>{step.tag}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

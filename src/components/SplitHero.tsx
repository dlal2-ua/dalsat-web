import { useEffect, useRef, useState } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

const SPLIT_END = 0.3; // el split ocupa el 0–30 % del scroll
const INTRO_FADE_END = 0.12; // el subtítulo se va en cuanto empiezas a scrollear
const HINT_FADE_END = 0.3; // la indicación de scroll aguanta bastante más

/** Genera el valor box-shadow con N estrellas aleatorias en unidades vw/vh.
 *  El rango se extiende bastante más allá del viewport para que la deriva
 *  amplia de la capa nunca deje bordes vacíos. */
function generateStars(count: number): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = (-25 + Math.random() * 150).toFixed(2);
    const y = (-25 + Math.random() * 150).toFixed(2);
    const opacity = (0.15 + Math.random() * 0.25).toFixed(2);
    const isCyan = Math.random() < 0.3;
    const spread = Math.random() < 0.18 ? '1.5px' : '0.5px';
    const color = isCyan ? `rgba(20,205,236,${opacity})` : `rgba(255,255,255,${opacity})`;
    shadows.push(`${x}vw ${y}vh 0 ${spread} ${color}`);
  }
  return shadows.join(', ');
}

interface TwinkleStar {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  cyan: boolean;
  floatX: string;
  floatY: string;
  floatDuration: string;
}

/** Estrellas individuales que destellan de vez en cuando y flotan lentamente,
 *  cada una con dirección y ritmo aleatorios. */
function generateTwinkles(count: number): TwinkleStar[] {
  return Array.from({ length: count }, () => ({
    left: `${(Math.random() * 100).toFixed(2)}%`,
    top: `${(Math.random() * 100).toFixed(2)}%`,
    size: Math.random() < 0.3 ? 3 : 2,
    delay: `${(Math.random() * 10).toFixed(2)}s`,
    duration: `${(4 + Math.random() * 5).toFixed(2)}s`,
    cyan: Math.random() < 0.35,
    floatX: `${((Math.random() - 0.5) * 10).toFixed(2)}vw`,
    floatY: `${((Math.random() - 0.5) * 10).toFixed(2)}vh`,
    floatDuration: `${(25 + Math.random() * 25).toFixed(2)}s`,
  }));
}

interface Props {
  idioma?: Idioma;
}

export default function SplitHero({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma).hero;

  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const starsFarRef = useRef<HTMLDivElement>(null);
  const dalRef = useRef<HTMLSpanElement>(null);
  const satRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [twinkles, setTwinkles] = useState<TwinkleStar[]>([]);

  // Generadas en mount (no en render) para no romper la hidratación con valores aleatorios
  useEffect(() => {
    if (starsRef.current) starsRef.current.style.boxShadow = generateStars(130);
    if (starsFarRef.current) starsFarRef.current.style.boxShadow = generateStars(95);
    setTwinkles(generateTwinkles(16));
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    let target = 0;
    let current = 0;
    let rafId = 0;
    let inView = true;

    const computeTarget = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      target = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
    };

    const apply = (p: number) => {
      const split = Math.min(1, p / SPLIT_END);
      const introOpacity = Math.max(0, 1 - p / INTRO_FADE_END);
      const hintOpacity = Math.max(0, 1 - p / HINT_FADE_END);

      const dal = dalRef.current;
      const sat = satRef.current;
      if (dal && sat) {
        dal.style.transform = `translateX(${-split * 120}%) scale(${1 + split * 1.5})`;
        dal.style.opacity = String(1 - split);
        dal.style.filter = `blur(${split * 20}px)`;
        sat.style.transform = `translateX(${split * 120}%) scale(${1 + split * 1.5})`;
        sat.style.opacity = String(1 - split);
        sat.style.filter = `blur(${split * 20}px)`;
      }

      if (introRef.current) introRef.current.style.opacity = String(introOpacity);
      if (hintRef.current) {
        hintRef.current.style.opacity = String(hintOpacity);
        hintRef.current.style.pointerEvents = hintOpacity > 0.3 ? 'auto' : 'none';
      }
    };

    const loop = () => {
      if (inView) {
        computeTarget();
        current += (target - current) * 0.14;
        if (Math.abs(target - current) < 0.0005) current = target;
        apply(current);
      }
      rafId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: '100px' },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    computeTarget();
    current = target;
    apply(current);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // La flecha lleva más allá del split, hacia el resto de la página
  const scrollToChat = () => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + total, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-navy"
      style={{ height: reducedMotion ? 'auto' : '200vh' }}
    >
      <style>{`
        @keyframes heroLetterIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroArrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .hero-letter {
          opacity: 0;
          animation: heroLetterIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-subtitle {
          opacity: 0;
          animation: heroFadeIn 0.9s ease-out 0.8s forwards;
        }
        .hero-cta {
          opacity: 0;
          animation: heroFadeIn 0.9s ease-out 1.1s forwards;
        }
        .hero-hint {
          opacity: 0;
          animation: heroFadeIn 0.9s ease-out 1.3s forwards;
        }
        .hero-arrow {
          animation: heroArrowBounce 1.8s ease-in-out infinite;
        }
        @keyframes heroWheel {
          0%   { opacity: 0; transform: translateY(0); }
          25%  { opacity: 1; }
          75%  { opacity: 1; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(12px); }
        }
        .hero-wheel {
          animation: heroWheel 1.8s ease-in-out infinite;
        }
        @keyframes starDriftA {
          from { transform: translate(0, 0); }
          to { transform: translate(-16vw, 10vh); }
        }
        @keyframes starDriftB {
          from { transform: translate(0, 0); }
          to { transform: translate(13vw, -9vh); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.7); }
        }
        @keyframes starFloat {
          from { transform: translate(0, 0); }
          to { transform: translate(var(--float-x, 3vw), var(--float-y, -3vh)); }
        }
        .stars-near {
          animation: starDriftA 15s ease-in-out infinite alternate;
        }
        .stars-far {
          animation: starDriftB 30s ease-in-out infinite alternate;
        }
        .star-twinkle {
          opacity: 0.15;
          animation: starTwinkle var(--twinkle-duration, 5s) ease-in-out var(--twinkle-delay, 0s) infinite;
        }
        .star-float {
          animation: starFloat var(--float-duration, 35s) ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-letter, .hero-subtitle, .hero-cta, .hero-hint {
            animation: none;
            opacity: 1;
          }
          .hero-arrow, .hero-wheel, .stars-near, .stars-far, .star-float { animation: none; }
          .star-twinkle { animation: none; opacity: 0.4; }
        }
      `}</style>

      <div
        className={
          reducedMotion
            ? 'relative flex min-h-[100svh] flex-col items-center justify-center gap-12 overflow-hidden py-28'
            : 'sticky top-0 flex h-screen items-center justify-center overflow-hidden'
        }
      >
        {/* Nebulosa sutil */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 22% 28%, rgba(20,205,236,0.07), transparent 70%), radial-gradient(ellipse 55% 40% at 78% 70%, rgba(20,205,236,0.05), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(7,40,71,0.8), transparent 100%)',
          }}
        />

        {/* Estrellas (box-shadow generado en mount), con deriva lenta en direcciones opuestas */}
        <div ref={starsRef} className="stars-near pointer-events-none absolute left-0 top-0 h-px w-px" aria-hidden="true" />
        <div ref={starsFarRef} className="stars-far pointer-events-none absolute left-0 top-0 h-px w-px" aria-hidden="true" />

        {/* Estrellas que destellan sutilmente a ritmos aleatorios */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {twinkles.map((star, i) => (
            <div
              key={i}
              className="star-float absolute"
              style={{
                left: star.left,
                top: star.top,
                ['--float-x' as string]: star.floatX,
                ['--float-y' as string]: star.floatY,
                ['--float-duration' as string]: star.floatDuration,
              }}
            >
              <div
                className="star-twinkle rounded-full"
                style={{
                  width: star.size,
                  height: star.size,
                  background: star.cyan ? 'rgba(20,205,236,0.9)' : 'rgba(255,255,255,0.9)',
                  boxShadow: star.cyan
                    ? '0 0 6px 1px rgba(20,205,236,0.5)'
                    : '0 0 6px 1px rgba(255,255,255,0.4)',
                  ['--twinkle-duration' as string]: star.duration,
                  ['--twinkle-delay' as string]: star.delay,
                }}
              />
            </div>
          ))}
        </div>

        {/* Capa 1: DALSAT, se abre en dos mitades al scrollear */}
        <div className={reducedMotion ? 'relative z-10 flex flex-col items-center px-4 text-center' : 'absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center'}>
          <h1
            aria-label="DALSAT"
            className="flex font-display font-bold leading-none tracking-[0.12em] text-white text-[clamp(3.5rem,12vw,5rem)] md:text-[clamp(5rem,15vw,11rem)]"
            style={{ textShadow: '0 0 40px rgba(20,205,236,0.3)' }}
          >
            <span ref={dalRef} className="inline-block will-change-transform" aria-hidden="true">
              {['D', 'A', 'L'].map((letter, i) => (
                <span key={i} className="hero-letter inline-block" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                  {letter}
                </span>
              ))}
            </span>
            <span ref={satRef} className="inline-block will-change-transform" aria-hidden="true">
              {['S', 'A', 'T'].map((letter, i) => (
                <span key={i} className="hero-letter inline-block" style={{ animationDelay: `${0.34 + i * 0.08}s` }}>
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          <div ref={introRef} className="flex flex-col items-center">
            <p className="hero-subtitle mt-6 max-w-md text-[clamp(1rem,2.5vw,1.25rem)] font-normal text-white/55">
              {t.lema}
            </p>

            {/* La primera pantalla no tenia ninguna accion: habia que scrollear
                o subir a la cabecera. Ahora se puede escribir desde aqui. */}
            <div className="hero-cta mt-7 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={ruta('/contacto', idioma)}
                className="inline-flex items-center justify-center rounded-2xl bg-terracota px-7 py-3.5 text-sm font-extrabold text-navy shadow-[0_0_25px_rgba(217,100,44,0.35)] transition-all hover:scale-105 hover:bg-terracota-dark"
              >
                {t.ctaPrincipal}
              </a>
              <a
                href={ruta('/servicios', idioma)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white/80 transition-colors hover:border-cian/60 hover:text-cian"
              >
                {t.ctaSecundario}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {!reducedMotion && (
          <div ref={hintRef} className="absolute bottom-8 z-10">
            <button
              type="button"
              onClick={scrollToChat}
              className="hero-hint flex min-h-[44px] cursor-pointer flex-col items-center gap-2.5 text-white/75 transition-colors hover:text-cian"
            >
              <span className="text-sm font-semibold tracking-wide">{t.pista}</span>
              <span className="hero-mouse relative flex h-9 w-[22px] items-center justify-center rounded-full border-2 border-current">
                <span className="hero-wheel absolute top-1.5 h-1.5 w-1 rounded-full bg-current" />
              </span>
              <svg className="hero-arrow h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

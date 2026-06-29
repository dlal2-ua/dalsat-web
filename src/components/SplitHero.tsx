import { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  from: 'client' | 'bot';
  text: string;
  time: string;
}

// 4 pares pregunta-respuesta: cada tramo de scroll revela un par completo
const MESSAGES: ChatMessage[] = [
  { from: 'client', text: '¿Qué hace Dalsat?', time: '14:46' },
  {
    from: 'bot',
    text: 'Automatiza tu negocio con IA. WhatsApp, escalado a humano y recordatorios de citas 24/7. ⚡',
    time: '14:46',
  },
  { from: 'client', text: '¿Cuánto tarda?', time: '14:47' },
  {
    from: 'bot',
    text: 'Listo en pocos días, adaptado a tu empresa. 🚀',
    time: '14:47',
  },
  { from: 'client', text: '¿Sirve para mi negocio?', time: '14:48' },
  {
    from: 'bot',
    text: 'Sí. Ahorra horas de gestión en consultas y cobros repetitivos. ✅',
    time: '14:48',
  },
  { from: 'client', text: '¿Y si necesitan hablar conmigo?', time: '14:49' },
  {
    from: 'bot',
    text: 'La IA te avisa y te transfiere el chat al instante con un resumen. 🎯',
    time: '14:49',
  },
];

const PAIRS = MESSAGES.length / 2;
const SPLIT_END = 0.3; // el split ocupa el 0–30 % del scroll
const INTRO_FADE_END = 0.12; // subtítulo y flecha desaparecen al empezar a scrollear
const CHAT_START = 0.22;
const CHAT_FADE_SPAN = 0.18;
const PAIRS_START = 0.38; // los pares de mensajes se revelan del 38 al 95 %
const PAIRS_END = 0.95;

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
    const color = isCyan ? `rgba(0,224,255,${opacity})` : `rgba(255,255,255,${opacity})`;
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

export default function SplitHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const starsFarRef = useRef<HTMLDivElement>(null);
  const dalRef = useRef<HTMLSpanElement>(null);
  const satRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [visiblePairs, setVisiblePairs] = useState(0);
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
      setVisiblePairs(PAIRS);
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
      const chat = Math.max(0, Math.min(1, (p - CHAT_START) / CHAT_FADE_SPAN));

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
        hintRef.current.style.opacity = String(introOpacity);
        hintRef.current.style.pointerEvents = introOpacity > 0.3 ? 'auto' : 'none';
      }

      const chatEl = chatRef.current;
      if (chatEl) {
        chatEl.style.opacity = String(chat);
        chatEl.style.transform = `translateY(${(1 - chat) * 50}px) scale(${0.96 + chat * 0.04})`;
      }

      const pairProgress = Math.max(0, Math.min(1, (p - PAIRS_START) / (PAIRS_END - PAIRS_START)));
      const pairs = p <= PAIRS_START ? 0 : Math.min(PAIRS, Math.floor(pairProgress * PAIRS) + 1);
      setVisiblePairs(pairs);
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

  // Sin scroll interno: desliza la lista hacia arriba con un translateY suave
  // para que el último mensaje revelado quede siempre visible
  useEffect(() => {
    if (reducedMotion) return;
    const area = chatAreaRef.current;
    const list = listRef.current;
    if (!area || !list) return;

    const count = visiblePairs * 2;
    const update = () => {
      if (count === 0) {
        list.style.transform = 'translateY(0)';
        return;
      }
      const last = list.children[count - 1] as HTMLElement | undefined;
      if (!last) return;
      const bottom = last.offsetTop + last.offsetHeight + 24;
      const overflow = Math.max(0, bottom - area.clientHeight);
      list.style.transform = `translateY(${-overflow}px)`;
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [visiblePairs, reducedMotion]);

  // La flecha lleva hasta el punto del scroll donde el chat ya es visible
  const scrollToChat = () => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + total * 0.5, behavior: 'smooth' });
  };

  const visibleCount = visiblePairs * 2;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-[#001A3F]"
      style={{ height: reducedMotion ? 'auto' : '450vh' }}
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
        .hero-hint {
          opacity: 0;
          animation: heroFadeIn 0.9s ease-out 1.3s forwards;
        }
        .hero-arrow {
          animation: heroArrowBounce 1.8s ease-in-out infinite;
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
          .hero-letter, .hero-subtitle, .hero-hint {
            animation: none;
            opacity: 1;
          }
          .hero-arrow, .stars-near, .stars-far, .star-float { animation: none; }
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
              'radial-gradient(ellipse 60% 45% at 22% 28%, rgba(0,224,255,0.07), transparent 70%), radial-gradient(ellipse 55% 40% at 78% 70%, rgba(0,224,255,0.05), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,26,63,0.8), transparent 100%)',
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
                  background: star.cyan ? 'rgba(0,224,255,0.9)' : 'rgba(255,255,255,0.9)',
                  boxShadow: star.cyan
                    ? '0 0 6px 1px rgba(0,224,255,0.5)'
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
            style={{ textShadow: '0 0 40px rgba(0,224,255,0.3)' }}
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
              Automatización inteligente para tu negocio
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        {!reducedMotion && (
          <div ref={hintRef} className="absolute bottom-8 z-10">
            <button
              type="button"
              onClick={scrollToChat}
              className="hero-hint flex min-h-[44px] cursor-pointer flex-col items-center gap-2 text-white/50 transition-colors hover:text-[#00E0FF]"
            >
              <span className="text-xs font-medium tracking-wide">Descubre lo que podemos hacer</span>
              <svg className="hero-arrow h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>
        )}

        {/* Capa 2: chat integrado con el fondo galáctico.
            pointer-events-none: el chat es decorativo y nunca captura la rueda,
            el único scroll es el de la página */}
        <div
          ref={chatRef}
          className={`pointer-events-none relative z-20 flex w-[94vw] max-w-2xl flex-col ${
            reducedMotion ? '' : 'h-[78vh]'
          }`}
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {/* Cabecera del chat */}
          <div className="flex items-center justify-between rounded-t-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md">
            <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span
              className="font-display text-xl font-bold tracking-[0.2em] text-white"
              style={{ textShadow: '0 0 20px rgba(0,224,255,0.4)' }}
            >
              DALSAT
            </span>
            <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Mensajes sobre el fondo estrellado (sin barra de scroll propia) */}
          <div
            ref={chatAreaRef}
            className="flex-1 overflow-hidden border-x border-white/10 bg-[#001A3F]/20 backdrop-blur-[2px]"
          >
            <div
              ref={listRef}
              className="relative flex flex-col gap-4 px-4 py-6 transition-transform duration-500 ease-out will-change-transform sm:px-6"
            >
            {MESSAGES.map((msg, i) => {
              const shown = i < visibleCount;
              const isBot = msg.from === 'bot';
              return (
                <div
                  key={i}
                  className={`flex items-end gap-2.5 transition-all duration-500 ease-out ${
                    isBot ? 'justify-end' : 'justify-start'
                  } ${shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                  style={{ transitionDelay: shown && isBot ? '180ms' : '0ms' }}
                >
                  {!isBot && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-300/80">
                      <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <div className={`flex max-w-[78%] flex-col ${isBot ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-lg sm:text-[15px] ${
                        isBot
                          ? 'rounded-br-md bg-gradient-to-r from-[#E8704F] via-[#7C6BD6] to-[#2EC4B6] text-white shadow-[#7C6BD6]/30'
                          : 'rounded-bl-md bg-gray-200/95 text-gray-900 shadow-black/30'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 px-1 text-[11px] text-white/40">{msg.time}</span>
                  </div>
                  {isBot && (
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00E0FF] to-[#7C6BD6] text-[11px] font-bold text-white"
                      style={{ boxShadow: '0 0 14px rgba(0,224,255,0.35)' }}
                    >
                      DA
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </div>

          {/* Barra de entrada enlazada a WhatsApp real */}
          <a
            href="https://wa.me/34646005171"
            target="_blank"
            rel="noopener noreferrer"
            title="Escríbeme por WhatsApp: 646 00 51 71"
            className="group flex items-center gap-3 rounded-b-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-[#00E0FF]/60 hover:bg-white/10 cursor-pointer"
          >
            <svg className="h-5 w-5 shrink-0 text-white/50 transition-colors group-hover:text-[#00E0FF]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
            <span className="flex-1 select-none text-sm text-white/50 font-medium transition-colors group-hover:text-white">Escríbeme por WhatsApp (646 00 51 71)…</span>
            <svg className="h-5 w-5 shrink-0 text-white/50 transition-colors group-hover:text-[#00E0FF]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00E0FF] transition-transform duration-300 group-hover:scale-110"
              style={{ boxShadow: '0 0 16px rgba(0,224,255,0.5)' }}
            >
              <svg className="h-4 w-4 text-[#001A3F]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

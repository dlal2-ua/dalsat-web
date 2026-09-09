import { useEffect, useRef, useState } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

// Mascota de soporte: un robotito con propulsor que vuela pegado al borde
// derecho y sube o baja siguiendo el scroll de la página. No reimplementa el
// chat: al pulsarlo, hace clic en la burbuja real del widget de la
// plataforma (dev.dalsats.com) y desaparece para dejarle sitio al panel.
//
// En escritorio sustituye por completo a la burbuja nativa (se le baja la
// opacidad a 0, sin quitarla del DOM, para no romper el posicionamiento del
// panel cuando se abre). En móvil, donde no hay espacio para volar, se deja
// la burbuja nativa tal cual y solo se le repinta la cara.

interface Props {
  idioma?: Idioma;
}

function raizChat(): HTMLElement | null {
  return document.querySelector('[data-dalsat-chat]');
}

function burbujaNativa(): HTMLButtonElement | null {
  const raiz = raizChat();
  return raiz ? raiz.querySelector('button') : null;
}

// Cara del robot para la burbuja nativa (móvil, o mientras el widget carga).
const ICONO_ROBOT = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
     stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
  <path d="M12 2.6v2.6"/>
  <circle cx="12" cy="2" r="1.1" fill="currentColor" stroke="none"/>
  <rect x="4.2" y="5.2" width="15.6" height="12.4" rx="3.4"/>
  <circle cx="9" cy="11" r="1.35" fill="currentColor" stroke="none"/>
  <circle cx="15" cy="11" r="1.35" fill="currentColor" stroke="none"/>
  <path d="M9.4 14.6h5.2"/>
  <path d="M2.2 9.6v3.6M21.8 9.6v3.6"/>
</svg>`;

// Reintenta hasta que exista la burbuja del widget (carga con defer) y hace
// clic en ella. Si ya existe, clic inmediato.
function abrirChatReal() {
  const inmediata = burbujaNativa();
  if (inmediata) {
    inmediata.click();
    return;
  }
  let intentos = 0;
  const reintento = setInterval(() => {
    intentos += 1;
    const boton = burbujaNativa();
    if (boton) {
      boton.click();
      clearInterval(reintento);
    } else if (intentos > 40) {
      clearInterval(reintento);
    }
  }, 300);
}

const CLAVE_VISTO = 'dalsat-mascota-vista';
const MIN_TOP = 0.14; // % de viewport, no pasa por encima de la cabecera
const MAX_TOP = 0.78; // no baja hasta el rincón donde viven WhatsApp/burbuja

export default function DalsatMascot({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma).comun;

  const [isDesktop, setIsDesktop] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'roaming'>('roaming');
  const [chatOpen, setChatOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);

  // Repinta la cara de la burbuja nativa en cuanto el widget la monta.
  useEffect(() => {
    let cancelado = false;
    const intentar = () => {
      const boton = burbujaNativa();
      if (!boton || boton.dataset.iconoDalsat === 'robot') return false;
      boton.innerHTML = ICONO_ROBOT;
      boton.dataset.iconoDalsat = 'robot';
      return true;
    };
    const reintento = setInterval(() => {
      if (cancelado || intentar()) clearInterval(reintento);
    }, 400);
    const rendicion = setTimeout(() => clearInterval(reintento), 20000);
    return () => {
      cancelado = true;
      clearInterval(reintento);
      clearTimeout(rendicion);
    };
  }, []);

  // Escritorio = vuela. Móvil = se queda la burbuja nativa tal cual.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const aplicar = () => setIsDesktop(mq.matches);
    aplicar();
    mq.addEventListener('change', aplicar);
    return () => mq.removeEventListener('change', aplicar);
  }, []);

  // Oculta (opacidad, no display) la burbuja nativa mientras el robot vuela,
  // para que el robot sea el único disparador visible sin romper el panel.
  useEffect(() => {
    let attempts = 0;
    const aplicarVisibilidad = () => {
      const boton = burbujaNativa();
      if (!boton) {
        attempts += 1;
        return attempts < 40;
      }
      boton.style.opacity = isDesktop ? '0' : '';
      boton.style.pointerEvents = isDesktop ? 'none' : '';
      return true;
    };
    if (aplicarVisibilidad()) return;
    const reintento = setInterval(() => {
      if (aplicarVisibilidad()) clearInterval(reintento);
    }, 300);
    return () => clearInterval(reintento);
  }, [isDesktop]);

  // Detecta si esta página tiene el hero de letras (home) para el aterrizaje
  // grande, y si el visitante pide menos movimiento.
  useEffect(() => {
    setHasHero(!!document.getElementById('hero'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Fase intro -> roaming, y aparición del bocadillo de bienvenida.
  useEffect(() => {
    if (!isDesktop) return;

    let vistoYa = false;
    try {
      vistoYa = window.sessionStorage.getItem(CLAVE_VISTO) === 'visto';
    } catch {
      // Sin almacenamiento: se enseña igual, sin memoria entre páginas.
    }

    if (hasHero && !reducedMotion) {
      setPhase('intro');
    } else {
      setPhase('roaming');
    }

    if (!vistoYa) {
      const aparecer = setTimeout(() => setShowBubble(true), hasHero ? 900 : 1400);
      return () => clearTimeout(aparecer);
    }
  }, [isDesktop, hasHero, reducedMotion]);

  // Primer scroll (o unos segundos) -> pasa de intro a roaming.
  useEffect(() => {
    if (!isDesktop || phase !== 'intro') return;
    let hecho = false;
    const pasar = () => {
      if (hecho) return;
      hecho = true;
      setPhase('roaming');
    };
    const onScroll = () => {
      if (window.scrollY > 30) pasar();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = setTimeout(pasar, 4200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(fallback);
    };
  }, [isDesktop, phase]);

  // El widget avisa de que se abrió/cerró cambiando la clase del contenedor.
  useEffect(() => {
    const raiz = raizChat();
    if (!raiz) return;
    const sync = () => setChatOpen(raiz.classList.contains('open'));
    sync();
    const observador = new MutationObserver(sync);
    observador.observe(raiz, { attributes: true, attributeFilter: ['class'] });
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (chatOpen) setShowBubble(false);
  }, [chatOpen]);

  function ocultarBurbuja() {
    setShowBubble(false);
    try {
      window.sessionStorage.setItem(CLAVE_VISTO, 'visto');
    } catch {
      // Aceptable: volverá a salir en la siguiente página.
    }
  }

  function alPulsar() {
    ocultarBurbuja();
    abrirChatReal();
  }

  // Bucle físico: sigue el scroll, banca en la dirección del movimiento y
  // alarga la llama del propulsor según la velocidad. Todo imperativo sobre
  // refs -- sin setState -- para no repintar React a 60fps.
  useEffect(() => {
    if (!isDesktop || phase !== 'roaming' || chatOpen) return;
    if (reducedMotion) {
      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.top = `${MIN_TOP * 100 + (MAX_TOP - MIN_TOP) * 50}%`;
        wrap.style.transform = 'translateY(-50%)';
      }
      return;
    }

    let rafId = 0;
    let currentTop = MIN_TOP + (MAX_TOP - MIN_TOP) * 0.3;
    let currentBank = 0;
    let currentFlame = 0.35;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      const scrollY = window.scrollY;
      const velocity = (scrollY - lastScrollY) / dt; // px/ms
      lastScrollY = scrollY;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      const targetTop = MIN_TOP + progress * (MAX_TOP - MIN_TOP);

      currentTop += (targetTop - currentTop) * 0.09;

      const targetBank = Math.max(-16, Math.min(16, velocity * 60));
      currentBank += (targetBank - currentBank) * 0.15;

      const targetFlame = Math.min(1, 0.35 + Math.abs(velocity) * 4.5);
      currentFlame += (targetFlame - currentFlame) * 0.18;

      const wrap = wrapRef.current;
      if (wrap) {
        wrap.style.top = `${currentTop * 100}%`;
        wrap.style.transform = `translateY(-50%) rotate(${currentBank}deg)`;
      }
      const flame = flameRef.current;
      if (flame) {
        flame.style.opacity = String(0.55 + currentFlame * 0.45);
        flame.style.transform = `scaleY(${0.6 + currentFlame * 1.1})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isDesktop, phase, chatOpen, reducedMotion]);

  if (!isDesktop) return null;

  const docked = chatOpen;
  const introActive = phase === 'intro' && !docked;

  return (
    <div
      ref={wrapRef}
      className="fixed z-[2147482999] flex flex-col items-end transition-[top,right,left,transform,opacity] duration-[900ms] ease-out"
      style={
        docked
          ? { top: 'auto', bottom: '20px', right: '22px', left: 'auto', transform: 'none' }
          : introActive
            ? { top: '40%', left: '50%', right: 'auto', transform: 'translate(-50%, -50%)' }
            : { top: '45%', right: '20px', left: 'auto', transform: 'translateY(-50%)' }
      }
      aria-hidden={docked ? 'true' : undefined}
    >
      {/* Bocadillo de bienvenida */}
      {showBubble && !docked && (
        <div className="relative mb-2 max-w-[15.5rem] animate-fadeIn rounded-2xl border border-cian/40 bg-navy-900/95 px-4 py-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <span
            className="absolute -bottom-[7px] right-9 h-3 w-3 rotate-45 border-b border-r border-cian/40 bg-navy-900"
            aria-hidden="true"
          />
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-cian">
            Soporte DALSAT
          </p>
          <button
            type="button"
            onClick={alPulsar}
            className="block text-left text-sm font-semibold leading-snug text-white transition-colors hover:text-cian-light"
          >
            {t.avisoChat}
          </button>
          <button
            type="button"
            onClick={ocultarBurbuja}
            aria-label={t.cerrarAviso}
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* El robot */}
      <button
        type="button"
        onClick={alPulsar}
        aria-label={t.avisoChat}
        className={`group relative flex items-center justify-center bg-transparent transition-transform duration-500 ease-out hover:scale-110 active:scale-95 ${
          introActive ? 'h-[104px] w-[104px]' : docked ? 'h-14 w-14' : 'h-[70px] w-[70px]'
        }`}
      >
        {/* Halo ambiental, hace de sombra/aura sin necesitar un suelo */}
        <span
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cian/25 blur-xl"
          style={{ animation: reducedMotion ? undefined : 'mascotaPulso 3.2s ease-in-out infinite' }}
          aria-hidden="true"
        />

        {/* Llama del propulsor, debajo del robot */}
        <div
          ref={flameRef}
          className="pointer-events-none absolute left-1/2 top-[86%] h-6 w-3 -translate-x-1/2 rounded-b-full"
          style={{
            background: 'linear-gradient(to bottom, #7FE4F5, #14CDEC 55%, transparent)',
            filter: 'blur(1.5px)',
            transformOrigin: 'top center',
            // El bucle físico (roaming) escribe transform/opacity por rAF;
            // el parpadeo en CSS solo corre cuando ese bucle no está activo.
            animation:
              reducedMotion || (phase === 'roaming' && !docked)
                ? undefined
                : 'mascotaLlama 0.5s ease-in-out infinite alternate',
          }}
          aria-hidden="true"
        />

        <svg viewBox="0 0 100 110" className="relative h-full w-full drop-shadow-[0_8px_18px_rgba(20,205,236,0.35)]" aria-hidden="true">
          <defs>
            <radialGradient id="dalsatBotBody" cx="38%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#1F6E9C" />
              <stop offset="55%" stopColor="#0A3459" />
              <stop offset="100%" stopColor="#03131F" />
            </radialGradient>
            <radialGradient id="dalsatBotEye" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#E9FBFF" />
              <stop offset="45%" stopColor="#7FE4F5" />
              <stop offset="100%" stopColor="#14CDEC" />
            </radialGradient>
          </defs>

          {/* Antena */}
          <line x1="50" y1="6" x2="50" y2="16" stroke="#14CDEC" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="5" r="3.4" fill="#7FE4F5" />

          {/* Orejas/propulsores laterales */}
          <rect x="6" y="38" width="10" height="20" rx="5" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.5" />
          <rect x="84" y="38" width="10" height="20" rx="5" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.5" />

          {/* Cuerpo/cabeza: cápsula única */}
          <rect x="14" y="14" width="72" height="78" rx="30" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.5" />

          {/* Brillo especular, arriba a la izquierda */}
          <ellipse cx="34" cy="30" rx="16" ry="9" fill="white" opacity="0.16" />

          {/* Visor */}
          <rect x="24" y="38" width="52" height="24" rx="12" fill="#03131F" opacity="0.85" />
          <circle cx="39" cy="50" r="6.4" fill="url(#dalsatBotEye)" />
          <circle cx="61" cy="50" r="6.4" fill="url(#dalsatBotEye)" />

          {/* Sonrisa */}
          <path d="M42 72 Q50 78 58 72" stroke="#7FE4F5" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />

          {/* Boquilla del propulsor */}
          <path d="M40 92 L60 92 L54 100 L46 100 Z" fill="#03131F" stroke="#14CDEC" strokeOpacity="0.5" />
        </svg>
      </button>

      <style>{`
        @keyframes mascotaPulso {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.12); }
        }
        @keyframes mascotaLlama {
          from { opacity: 0.55; transform: translateX(-50%) scaleY(0.6); }
          to { opacity: 1; transform: translateX(-50%) scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}

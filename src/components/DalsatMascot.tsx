import { useEffect, useRef, useState } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';

// Mascota de soporte: un robotito de cuerpo entero que se sienta en la D de
// DALSAT, se cae cuando la letra desaparece por el scroll del hero, y luego
// va agarrándose a distintos puntos de la web (data-mascot-perch) según lo
// que estés mirando, comentando la sección o proponiendo un CTA. No
// reimplementa el chat: al pulsarlo, hace clic en la burbuja real del
// widget de la plataforma (dev.dalsats.com) y se aparta para dejarle sitio.
//
// En escritorio sustituye a la burbuja nativa (opacidad a 0, sin quitarla
// del DOM, para no romper el panel al abrirse). En móvil, sin sitio para
// volar, se deja la burbuja nativa tal cual y solo se le repinta la cara.

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

// Mismo umbral que SPLIT_END en SplitHero: cuando el scroll del hero supera
// esta fracción, las letras ya se han abierto y desvanecido del todo.
const HERO_SPLIT_END = 0.3;
const HERO_FALL_AT = 0.24; // se cae un poco antes de que la D termine de irse

type Fase = 'perchada-d' | 'cayendo' | 'esperando' | 'roaming' | 'anclada';

interface Perch {
  el: HTMLElement;
  msg: string;
  cta?: string;
  ctaHref?: string;
}

// Progreso 0–1 del scroll pineado del hero (misma cuenta que usa SplitHero).
// Si el hero no tiene recorrido de scroll (p.ej. `height:auto` con
// prefers-reduced-motion), no hay pin que recorrer: eso es el principio de
// la página, no el final, así que aquí el progreso es 0, nunca 1.
function progresoHero(hero: HTMLElement): number {
  const rect = hero.getBoundingClientRect();
  const total = hero.offsetHeight - window.innerHeight;
  return total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DalsatMascot({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma).comun;

  const [isDesktop, setIsDesktop] = useState(false);
  const [hasHero, setHasHero] = useState(false);
  const [fase, setFase] = useState<Fase>('roaming');
  const [chatOpen, setChatOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMsg, setBubbleMsg] = useState('');
  const [bubbleCta, setBubbleCta] = useState<{ label: string; href: string } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const faseRef = useRef<Fase>('roaming');
  const perchesRef = useRef<Perch[]>([]);
  const activePerchRef = useRef<Perch | null>(null);
  const faseAntesDeDockRef = useRef<Fase>('roaming');

  useEffect(() => {
    faseRef.current = fase;
  }, [fase]);

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

  // Oculta (opacidad, no display) la burbuja nativa mientras el robot vuela.
  useEffect(() => {
    const aplicarVisibilidad = () => {
      const boton = burbujaNativa();
      if (!boton) return;
      // Se reafirma sin parar (no solo una vez): el propio widget de
      // terceros puede re-imponer su estilo por su cuenta -- se vio volver
      // visible la burbuja nativa después de fijarle opacity:0 una sola vez.
      boton.style.opacity = isDesktop ? '0' : '';
      boton.style.pointerEvents = isDesktop ? 'none' : '';
    };
    aplicarVisibilidad();
    const reintento = setInterval(aplicarVisibilidad, 400);
    return () => clearInterval(reintento);
  }, [isDesktop]);

  // Detecta el hero (home) y las preferencias de movimiento, y recoge los
  // puntos de agarre marcados en la página.
  useEffect(() => {
    setHasHero(!!document.getElementById('hero'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
    const nodos = Array.from(document.querySelectorAll<HTMLElement>('[data-mascot-perch]'));
    perchesRef.current = nodos.map((el) => ({
      el,
      msg: el.dataset.mascotMsg || '',
      cta: el.dataset.mascotCta,
      ctaHref: el.dataset.mascotCtaHref,
    }));
  }, []);

  // Fase inicial: sentada en la D si hay hero y hay movimiento; si no, directa
  // a roaming (sin la coreografía de caída, que no pega sin el split).
  //
  // Se decide UNA sola vez (guardado en un ref): este efecto puede volver a
  // ejecutarse -- p.ej. el doble-invoke de efectos en desarrollo, o cualquier
  // recálculo tardío de isDesktop/hasHero -- y sin este guardado repetiría
  // `setFase`, devolviendo el robot a 'roaming' después de que ya hubiera
  // arrancado la caída o el scroll llevara un rato.
  const faseInicialDecididaRef = useRef(false);
  useEffect(() => {
    if (!isDesktop || faseInicialDecididaRef.current) return;
    faseInicialDecididaRef.current = true;
    setFase(hasHero ? 'perchada-d' : 'roaming');
  }, [isDesktop, hasHero]);

  // Bocadillo de bienvenida: sale a los pocos segundos de cargar, una sola
  // vez, sin importar en qué fase esté el robot (sentado, roaming, lo que
  // sea). Si ya se vio en esta sesión (sessionStorage), no vuelve a salir.
  const bienvenidaMostradaRef = useRef(false);
  useEffect(() => {
    if (!isDesktop || bienvenidaMostradaRef.current) return;

    let vistoYa = false;
    try {
      vistoYa = window.sessionStorage.getItem(CLAVE_VISTO) === 'visto';
    } catch {
      // Sin almacenamiento: se enseña igual, sin memoria entre páginas.
    }
    if (vistoYa) return;

    bienvenidaMostradaRef.current = true;
    const aparecer = setTimeout(() => {
      // Si en estos 500ms ya se agarró a un punto de la web (scroll rápido,
      // o la página no tiene hero y arranca directa en roaming con perch),
      // ese mensaje manda: la bienvenida no lo pisa por detrás.
      if (activePerchRef.current) return;
      setBubbleMsg(t.avisoChat);
      setBubbleCta(null);
      setShowBubble(true);
    }, 500);
    return () => clearTimeout(aparecer);
  }, [isDesktop, t.avisoChat]);

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

  // Aparca/recupera la fase al abrir/cerrar el chat.
  useEffect(() => {
    if (chatOpen) {
      if (faseRef.current !== 'anclada') faseAntesDeDockRef.current = faseRef.current;
      setFase('anclada');
      setShowBubble(false);
    } else if (faseRef.current === 'anclada') {
      setFase(faseAntesDeDockRef.current);
    }
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

  // Bucle físico único: sitúa el robot según la fase, banca con la
  // velocidad y alarga la llama del propulsor. Todo imperativo sobre refs
  // -- sin setState -- para no repintar React a 60fps.
  //
  // OJO: este efecto no depende de `fase` a propósito. Si se reiniciara en
  // cada cambio de fase perdería currentLeft/currentTop y la caída desde la
  // D se vería como un salto, no como una caída continua. En su lugar lee
  // faseRef.current en cada frame y, si está anclado (chat abierto), sigue
  // vivo pero sin tocar la posición, para retomarla igual al cerrar.
  useEffect(() => {
    if (!isDesktop) return;

    const wrap = wrapRef.current;
    const flame = flameRef.current;
    const head = headRef.current;
    if (!wrap) return;

    // Con menos movimiento la fase inicial ya es 'roaming' (más abajo), así
    // que este bucle no dibuja ninguna caída: solo sigue puntos de agarre y
    // enseña los mensajes, sin inercia ni banca -- salta directo al sitio.
    const heroEl = hasHero ? document.getElementById('hero') : null;
    const dLetra = hasHero ? document.querySelector<HTMLElement>('[data-mascot-anchor="hero-d"]') : null;

    // Posición de arranque: sobre la D si existe (coincide con la fase
    // 'perchada-d'/'roaming' inicial), y solo si no hay D cae al borde
    // derecho -- antes siempre arrancaba ahí, que es justo el "aparece
    // pegado a la derecha" que se veía con reduced-motion (sin caída, sin
    // scroll todavía, ningún perch elegido aún).
    let rafId = 0;
    let currentLeft: number;
    let currentTop: number;
    if (dLetra) {
      const rect = dLetra.getBoundingClientRect();
      currentLeft = rect.left + rect.width * 0.55;
      currentTop = rect.bottom - rect.height * 0.35;
    } else {
      currentLeft = window.innerWidth - 90;
      currentTop = window.innerHeight * 0.4;
    }
    let currentBank = 0;
    let currentHeadBank = 0;
    let currentFlame = 0.35;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let cayendoDesde = 0;

    // null si el scroll no ha llegado a ningún punto de agarre todavía --
    // a propósito: antes caía en perches[0] como reserva, y eso disparaba el
    // mensaje del primer perch nada más entrar en 'roaming', pisando la
    // bienvenida sin que hubiera scroll real de por medio.
    const elegirPerch = (): Perch | null => {
      const perches = perchesRef.current;
      const linea = window.innerHeight * 0.6;
      let elegido: Perch | null = null;
      for (const p of perches) {
        const top = p.el.getBoundingClientRect().top;
        if (top <= linea) elegido = p;
      }
      return elegido;
    };

    const loop = (now: number) => {
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      if (faseRef.current === 'anclada') {
        lastScrollY = window.scrollY;
        rafId = requestAnimationFrame(loop);
        return;
      }

      const scrollY = window.scrollY;
      const velocity = (scrollY - lastScrollY) / dt; // px/ms
      lastScrollY = scrollY;

      let targetLeft = currentLeft;
      let targetTop = currentTop;
      let mostrarLlama = true;

      if (faseRef.current === 'perchada-d' && heroEl && dLetra) {
        const p = progresoHero(heroEl);
        if (p >= HERO_FALL_AT) {
          cayendoDesde = now;
          setFase('cayendo');
        } else {
          const rect = dLetra.getBoundingClientRect();
          targetLeft = rect.left + rect.width * 0.55;
          targetTop = rect.bottom - rect.height * 0.35;
          mostrarLlama = false;
        }
      } else if (faseRef.current === 'cayendo') {
        // Breve caída: tira hacia abajo con giro, luego pasa a esperar.
        targetTop = currentTop + 480;
        targetLeft = currentLeft + 40;
        currentBank += (60 - currentBank) * 0.1;
        if (now - cayendoDesde > 550) setFase('esperando');
      } else if (faseRef.current === 'esperando' && heroEl) {
        targetLeft = window.innerWidth * 0.5 - 35;
        targetTop = window.innerHeight * 0.48 + Math.sin(now / 600) * 10;
        if (progresoHero(heroEl) >= 1) setFase('roaming');
      } else {
        // roaming: se agarra al último punto de la web que ha pasado por
        // el 60% superior del viewport.
        const perch = elegirPerch();
        if (perch !== activePerchRef.current) {
          activePerchRef.current = perch;
          if (perch) {
            setBubbleMsg(perch.msg);
            setBubbleCta(perch.cta && perch.ctaHref ? { label: perch.cta, href: perch.ctaHref } : null);
            setShowBubble(true);
          }
        }
        if (perch) {
          const rect = perch.el.getBoundingClientRect();
          targetLeft = rect.right - 58;
          targetTop = rect.top + 18;
        }
      }

      targetLeft = clamp(targetLeft, 10, window.innerWidth - 84);
      targetTop = clamp(targetTop, 64, window.innerHeight - 96);

      const ease = reducedMotion ? 1 : faseRef.current === 'cayendo' ? 0.22 : 0.1;
      currentLeft += (targetLeft - currentLeft) * ease;
      currentTop += (targetTop - currentTop) * ease;

      const targetBank = reducedMotion
        ? 0
        : faseRef.current === 'cayendo'
          ? currentBank
          : clamp(velocity * 55, -16, 16);
      currentBank += (targetBank - currentBank) * (reducedMotion ? 1 : 0.15);

      const targetFlame = reducedMotion ? 0 : mostrarLlama ? Math.min(1, 0.35 + Math.abs(velocity) * 4.5) : 0;
      currentFlame += (targetFlame - currentFlame) * (reducedMotion ? 1 : 0.18);

      // Vaivén constante, sutil: un personaje vivo nunca está del todo
      // quieto. Se suma solo al pintar, no a currentTop -- si entrara en la
      // física se acumularía con el propio objetivo de cada fase.
      const bob = reducedMotion ? 0 : Math.sin(now / 950) * 4;

      // La cabeza (y la antena) van un pelín por detrás del cuerpo al
      // bancar: sin este retraso todo el SVG gira como una sola pieza
      // rígida, que es justo el aspecto "piezas pegadas" que se quería
      // evitar. Con retraso, el cuerpo lidera y la cabeza le sigue.
      currentHeadBank += (currentBank - currentHeadBank) * (reducedMotion ? 1 : 0.06);

      wrap.style.left = `${currentLeft}px`;
      wrap.style.top = `${currentTop + bob}px`;
      wrap.style.right = 'auto';
      wrap.style.transform = `rotate(${currentBank}deg)`;

      if (flame) {
        flame.style.opacity = String(0.15 + currentFlame * 0.85);
        flame.style.transform = `scaleY(${0.4 + currentFlame * 1.2})`;
      }

      if (head) {
        head.style.transform = `rotate(${(currentHeadBank - currentBank) * 0.6}deg)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isDesktop, hasHero, reducedMotion]);

  if (!isDesktop) return null;

  const anclada = fase === 'anclada';
  const grande = fase === 'perchada-d';

  return (
    <div
      ref={wrapRef}
      className="fixed z-[2147482999] transition-[right,bottom,opacity] duration-[700ms] ease-out"
      style={
        anclada
          ? { top: 'auto', bottom: '20px', right: '22px', left: 'auto', transform: 'none' }
          : undefined
      }
      aria-hidden={anclada ? 'true' : undefined}
    >
      {/* Bocadillo: bienvenida, o comentario de la sección activa.
          Posición absoluta a propósito: si contara para el tamaño de este
          contenedor (p.ej. en un flex), su ancho empujaría al robot -- es
          justo el bug que se veía como "se tira a la derecha" al aparecer
          un mensaje largo. Aquí cuelga por su cuenta, anclado a la esquina
          del robot, sin mover un píxel su posición. */}
      {showBubble && !anclada && (
        <div className="absolute bottom-full right-0 mb-2 max-w-[16rem] animate-fadeIn rounded-2xl border border-cian/40 bg-navy-900/95 px-4 py-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
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
            {bubbleMsg}
          </button>
          {bubbleCta && (
            <a
              href={bubbleCta.href}
              className="mt-2.5 block rounded-xl bg-terracota px-3.5 py-2 text-center text-xs font-extrabold text-navy transition-colors hover:bg-terracota-dark"
            >
              {bubbleCta.label} →
            </a>
          )}
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

      {/* El robot, de cuerpo entero */}
      <button
        type="button"
        onClick={alPulsar}
        aria-label={t.avisoChat}
        className={`group relative flex items-center justify-center bg-transparent transition-[width,height] duration-500 ease-out hover:scale-110 active:scale-95 ${
          grande ? 'h-[120px] w-[92px]' : anclada ? 'h-16 w-12' : 'h-[86px] w-[66px]'
        }`}
      >
        <span
          className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cian/25 blur-xl"
          style={{ animation: reducedMotion ? undefined : 'mascotaPulso 3.2s ease-in-out infinite' }}
          aria-hidden="true"
        />

        {/* Llama del propulsor, entre las piernas */}
        <div
          ref={flameRef}
          className="pointer-events-none absolute left-1/2 top-[80%] h-7 w-3 -translate-x-1/2 rounded-b-full"
          style={{
            background: 'linear-gradient(to bottom, #7FE4F5, #14CDEC 55%, transparent)',
            filter: 'blur(1.5px)',
            transformOrigin: 'top center',
          }}
          aria-hidden="true"
        />

        <svg viewBox="0 0 92 130" className="relative h-full w-full drop-shadow-[0_10px_20px_rgba(20,205,236,0.35)]" aria-hidden="true">
          <defs>
            {/* userSpaceOnUse a propósito: con el valor por defecto
                (objectBoundingBox) cada rect/circle/path calcula SU PROPIO
                degradado ajustado a su propia caja, así que cada pieza queda
                iluminada por su cuenta -- eso es lo que se veía como
                "partes pegadas". Con coordenadas fijas del viewBox, todo el
                cuerpo comparte un único foco de luz y se ve como una sola
                figura. */}
            <radialGradient id="dalsatBotBody" gradientUnits="userSpaceOnUse" cx="30" cy="25" r="110">
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

          {/* Piernas y brazos: un único <path> curvo por miembro que nace
              dentro del torso y sale hacia fuera (en vez de un rect recto +
              un circle pegado en la punta), con el mismo degradado que el
              resto del cuerpo -- así no hay costura visible en la unión. */}
          {grande ? (
            <>
              {/* Sentado: piernas dobladas de verdad -- muslo horizontal que
                  sale de la cadera, curva de rodilla, espinilla colgando. */}
              <path d="M30,98 C14,98 4,101 3,108 C2.3,113 5,117 10,117.6 C15,118.2 18,115 18,110 C24,111 29,109 30,104 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <path d="M8,110 C4,112 2,117 3,124 C3.6,129.5 9,131.5 14,129.6 C18,128 19,123 17.4,118.6 C16,114.6 12,111.6 8,110 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.4" strokeWidth="1.2" />
              <path d="M62,98 C78,98 88,101 89,108 C89.7,113 87,117 82,117.6 C77,118.2 74,115 74,110 C68,111 63,109 62,104 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <path d="M84,110 C88,112 90,117 89,124 C88.4,129.5 83,131.5 78,129.6 C74,128 73,123 74.6,118.6 C76,114.6 80,111.6 84,110 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.4" strokeWidth="1.2" />

              {/* Brazos apoyados en las rodillas */}
              <path d="M22,74 C10,78 6,86 8,96 C9.4,103 15,106 20,103.5 C23,102 23.5,97.5 21,93 C18.5,88.5 19,80 25,75 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <path d="M70,74 C82,78 86,86 84,96 C82.6,103 77,106 72,103.5 C69,102 68.5,97.5 71,93 C73.5,88.5 73,80 67,75 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
            </>
          ) : (
            <>
              {/* En vuelo: piernas juntas colgando bajo el propulsor */}
              <path d="M35,98 C29,98 26,104 26,114 C26,122 28,128 32,129 C36,130 38,126 38,118 C38,111 38,104 35,98 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <path d="M57,98 C63,98 66,104 66,114 C66,122 64,128 60,129 C56,130 54,126 54,118 C54,111 54,104 57,98 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <ellipse cx="32" cy="124" rx="4" ry="2.2" fill="#03131F" opacity="0.8" />
              <ellipse cx="60" cy="124" rx="4" ry="2.2" fill="#03131F" opacity="0.8" />

              {/* Brazos levantados hacia fuera -- por encima de las piernas
                  a propósito, para que se lean como brazos y no como un
                  tercer par de patas */}
              <path d="M23,70 C6,66 -3,72 -2,84 C-1.4,92 5,95 12,92 C17,90 18,85 15,80 C13,76.5 15,72 24,72 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
              <path d="M69,70 C86,66 95,72 94,84 C93.4,92 87,95 80,92 C75,90 74,85 77,80 C79,76.5 77,72 68,72 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.3" />
            </>
          )}

          {/* Cuerpo */}
          <rect x="20" y="64" width="52" height="44" rx="19" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="46" cy="86" r="7" fill="#03131F" opacity="0.8" />
          <circle cx="46" cy="86" r="3.2" fill="#14CDEC" />

          {/* Cabeza, en su propio grupo: el bucle físico le aplica un ligero
              retraso de rotación respecto al cuerpo (ver headRef en el
              efecto) para que no gire como un bloque rígido de una pieza. */}
          <g ref={headRef} style={{ transformOrigin: '46px 66px' }}>
            <line x1="46" y1="4" x2="46" y2="13" stroke="#14CDEC" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="46" cy="3" r="3.2" fill="#7FE4F5" />
            <rect x="10" y="10" width="72" height="60" rx="27" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.45" strokeWidth="1.5" />
            <ellipse cx="28" cy="25" rx="13" ry="7.5" fill="white" opacity="0.14" />
            <rect x="20" y="30" width="52" height="22" rx="11" fill="#03131F" opacity="0.85" />
            <circle cx="34" cy="41" r="6" fill="url(#dalsatBotEye)" />
            <circle cx="58" cy="41" r="6" fill="url(#dalsatBotEye)" />
            <path d="M37 60 Q46 65 55 60" stroke="#7FE4F5" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M1,30 C-3,36 -3,44 1,48 C4,50 9,49 10,44 L10,34 C9,29 4,28 1,30 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.5" strokeWidth="1.2" />
            <path d="M91,30 C95,36 95,44 91,48 C88,50 83,49 82,44 L82,34 C83,29 88,28 91,30 Z" fill="url(#dalsatBotBody)" stroke="#14CDEC" strokeOpacity="0.5" strokeWidth="1.2" />
          </g>
        </svg>
      </button>

      <style>{`
        @keyframes mascotaPulso {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

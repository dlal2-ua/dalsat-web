import { useEffect, useState } from 'react';

// Boton de volver arriba. Aparece cuando ya has bajado bastante como para que
// subir a mano moleste, y se quita al llegar arriba.
//
// Se coloca a la izquierda: la esquina derecha ya la ocupan el boton flotante
// de WhatsApp y, en movil, la barra fija de CTA.

const UMBRAL = 900;

interface Props {
  /** Texto del aria-label. Lo pasa el Layout ya traducido. */
  etiqueta?: string;
}

export default function VolverArriba({ etiqueta = 'Volver arriba' }: Props) {
  const [visible, setVisible] = useState(false);

  // El "bottom" no puede ser una clase de Tailwind fija: en móvil tiene que
  // quedar por encima de StickyMobileCta (que ocupa ~74px + su propio hueco
  // de zona segura) y, tanto en móvil como en escritorio, subir además lo
  // que ocupe el banner de cookies (--alto-cookies, publicado por
  // CookieBanner). De ahí el <style> con calc() en vez de bottom-6/sm:bottom-8.

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > UMBRAL);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  const subir = () => {
    const brusco = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: brusco ? 'auto' : 'smooth' });
  };

  return (
    <>
      <style>{`
        .volver-arriba {
          bottom: calc(5.5rem + env(safe-area-inset-bottom) + var(--alto-cookies, 0px));
        }
        @media (min-width: 768px) {
          .volver-arriba { bottom: calc(2rem + var(--alto-cookies, 0px)); }
        }
      `}</style>
      <button
        type="button"
        onClick={subir}
        aria-label={etiqueta}
        // Sale de pantalla en vez de desmontarse, para que la salida tambien se
        // vea. Mientras esta invisible no se puede tabular hasta el ni lo
        // anuncia un lector de pantalla.
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={`volver-arriba fixed left-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-navy-900/80 text-cian shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cian/50 hover:text-white md:left-8 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  );
}

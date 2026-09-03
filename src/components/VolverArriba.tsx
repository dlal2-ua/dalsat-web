import { useEffect, useState } from 'react';

// Boton de volver arriba. Aparece cuando ya has bajado bastante como para que
// subir a mano moleste, y se quita al llegar arriba.
//
// Se coloca a la izquierda: la esquina derecha ya la ocupan el boton flotante
// de WhatsApp y, en movil, la barra fija de CTA.

const UMBRAL = 900;

export default function VolverArriba() {
  const [visible, setVisible] = useState(false);

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
    <button
      type="button"
      onClick={subir}
      aria-label="Volver arriba"
      // Sale de pantalla en vez de desmontarse, para que la salida tambien se
      // vea. `hidden` de accesibilidad va con inert para que no se pueda
      // tabular hasta un boton que no esta.
      inert={!visible ? true : undefined}
      className={`fixed bottom-6 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-navy-900/80 text-cian shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cian/50 hover:text-white sm:bottom-8 sm:left-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}

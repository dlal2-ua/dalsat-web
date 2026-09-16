<<<<<<< HEAD
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dalsat-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, value);
=======
import { useEffect, useRef, useState } from 'react';
import { inject } from '@vercel/analytics';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

const CLAVE = 'dalsat-consentimiento-cookies';

type Decision = 'aceptado' | 'rechazado';

// La analitica se carga desde aqui, no desde el layout. Asi el script no
// existe hasta que alguien pulsa "Aceptar": si el banner solo tapara la
// pantalla mientras Vercel ya esta midiendo, el aviso no serviria de nada.
let yaInyectada = false;
function activarAnalitica() {
  if (yaInyectada) return;
  yaInyectada = true;
  inject({ mode: 'production' });
}

function leerDecision(): Decision | null {
  try {
    const v = window.localStorage.getItem(CLAVE);
    return v === 'aceptado' || v === 'rechazado' ? v : null;
  } catch {
    // Navegador con el almacenamiento bloqueado: se pregunta cada vez.
    return null;
  }
}

interface Props {
  idioma?: Idioma;
}

export default function CookieBanner({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);

  const [visible, setVisible] = useState(false);
  const cajaRef = useRef<HTMLDivElement>(null);

  // Publica cuánto ocupa el banner (--alto-cookies) para que lo fijo abajo
  // (el botón de WhatsApp) suba por encima: si no, se le montaba encima y no
  // se podía pulsar "Aceptar".
  useEffect(() => {
    const raiz = document.documentElement;
    const caja = cajaRef.current;
    if (!visible || !caja) {
      raiz.style.removeProperty('--alto-cookies');
      return;
    }
    const medir = () => raiz.style.setProperty('--alto-cookies', `${caja.offsetHeight}px`);
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(caja);
    return () => {
      observador.disconnect();
      raiz.style.removeProperty('--alto-cookies');
    };
  }, [visible]);

  useEffect(() => {
    const decision = leerDecision();
    if (decision === 'aceptado') {
      activarAnalitica();
      return;
    }
    if (decision === 'rechazado') return;
    setVisible(true);
  }, []);

  const decidir = (decision: Decision) => {
    try {
      window.localStorage.setItem(CLAVE, decision);
    } catch {
      // Si no se puede guardar, al menos se respeta la decision en esta visita.
    }
    if (decision === 'aceptado') activarAnalitica();
>>>>>>> develop
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
<<<<<<< HEAD
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-[#001A3F] text-white px-4 py-5 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <p className="text-sm text-white/80 flex-1">
          Usamos cookies propias y de terceros para el funcionamiento de la web y para analizar el tráfico. Puedes aceptarlas, rechazarlas o consultar más información en nuestra{' '}
          <a href="/cookies" className="underline hover:text-white">
            Política de Cookies
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleChoice('rejected')}
            className="text-sm font-medium px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={() => handleChoice('accepted')}
            className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-[#00E0FF] text-[#001A3F] hover:bg-white transition-colors"
          >
            Aceptar
=======
      ref={cajaRef}
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.aviso}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/15 bg-navy-950/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="flex-1 text-[13px] sm:text-sm leading-relaxed text-white/80">
          {t.cookies.texto}{' '}
          <a
            href={ruta('/cookies', idioma)}
            className="font-semibold text-cian underline underline-offset-2 hover:text-cian-light"
          >
            {t.cookies.verPolitica}
          </a>
        </p>

        {/* Mismo peso visual en los dos botones: los dos van delineados, con
            el mismo grosor de borde y el mismo padding. Antes "Aceptar" era
            un boton relleno de cian y "Rechazar" solo un contorno, lo que
            ademas de romper la regla de marca (cian nunca relleno en botones
            de accion) empujaba visualmente hacia aceptar. */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decidir('rechazado')}
            className="flex-1 cursor-pointer rounded-xl border border-white/20 px-5 py-2.5 text-sm font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:flex-none"
          >
            {t.cookies.rechazar}
          </button>
          <button
            type="button"
            onClick={() => decidir('aceptado')}
            className="flex-1 cursor-pointer rounded-xl border border-cian/50 px-5 py-2.5 text-sm font-bold text-cian transition-colors hover:bg-cian/10 hover:text-cian-light sm:flex-none"
          >
            {t.cookies.aceptar}
>>>>>>> develop
          </button>
        </div>
      </div>
    </div>
  );
}

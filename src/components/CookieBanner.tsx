import { useEffect, useState } from 'react';
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
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
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
            className="flex-1 cursor-pointer rounded-xl bg-cian px-5 py-2.5 text-sm font-extrabold text-navy transition-colors hover:bg-cian-dark sm:flex-none"
          >
            {t.cookies.aceptar}
          </button>
        </div>
      </div>
    </div>
  );
}

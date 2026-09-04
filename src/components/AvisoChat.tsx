import { useEffect, useState } from 'react';

interface Props {
  texto: string;
  cerrar: string;
}

// Le cambia la cara a la burbuja del chat y le pone un bocadillo al lado.
//
// La burbuja y el panel los pinta el widget de la plataforma: su DOM no es
// nuestro. Esto no lo reimplementa, solo lo empuja desde fuera --le sustituye
// el SVG y hace clic en su boton--, asi que si algun dia cambian su marcado lo
// peor que pasa es que esto no haga nada y la burbuja siga funcionando.
//
// El chat NO se abre solo: aparece el bocadillo y se despliega al pulsar.

const CLAVE = 'dalsat-aviso-chat';
const ESPERA = 3500;

function raizChat(): HTMLElement | null {
  return document.querySelector('[data-dalsat-chat]');
}

function burbuja(): HTMLButtonElement | null {
  const raiz = raizChat();
  return raiz ? raiz.querySelector('button') : null;
}

// Robot, no un bocadillo: detras no hay una persona y la cara deberia decirlo.
// Cabeza con antena, dos ojos y las orejas a los lados.
const ICONO_ROBOT = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
     stroke-linecap="round" stroke-linejoin="round" width="28" height="28" aria-hidden="true">
  <path d="M12 2.6v2.6"/>
  <circle cx="12" cy="2" r="1.1" fill="currentColor" stroke="none"/>
  <rect x="4.2" y="5.2" width="15.6" height="12.4" rx="3.4"/>
  <circle cx="9" cy="11" r="1.35" fill="currentColor" stroke="none"/>
  <circle cx="15" cy="11" r="1.35" fill="currentColor" stroke="none"/>
  <path d="M9.4 14.6h5.2"/>
  <path d="M2.2 9.6v3.6M21.8 9.6v3.6"/>
</svg>`;

export default function AvisoChat({ texto, cerrar }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelado = false;

    function ponerCara() {
      const boton = burbuja();
      if (!boton || boton.dataset.iconoDalsat === 'robot') return false;
      boton.innerHTML = ICONO_ROBOT;
      boton.dataset.iconoDalsat = 'robot';
      return true;
    }

    // El widget se carga con defer, asi que al montar esto puede no existir.
    const reintento = setInterval(() => {
      if (cancelado || ponerCara()) clearInterval(reintento);
    }, 400);
    const rendicion = setTimeout(() => clearInterval(reintento), 15000);

    let vistoYa = false;
    try {
      vistoYa = window.sessionStorage.getItem(CLAVE) === 'visto';
    } catch {
      // Almacenamiento capado: se enseña igual, sin memoria.
    }

    const aparecer = vistoYa
      ? undefined
      : setTimeout(() => {
          // Sin burbuja no hay chat que ofrecer.
          if (burbuja() && !raizChat()?.classList.contains('open')) setVisible(true);
        }, ESPERA);

    return () => {
      cancelado = true;
      clearInterval(reintento);
      clearTimeout(rendicion);
      if (aparecer) clearTimeout(aparecer);
    };
  }, []);

  // Si el chat se abre por cualquier via, el bocadillo sobra.
  useEffect(() => {
    if (!visible) return;
    const raiz = raizChat();
    if (!raiz) return;
    const observador = new MutationObserver(() => {
      if (raiz.classList.contains('open')) ocultar();
    });
    observador.observe(raiz, { attributes: true, attributeFilter: ['class'] });
    return () => observador.disconnect();
  }, [visible]);

  function ocultar() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(CLAVE, 'visto');
    } catch {
      // Sin memoria, volvera a salir en la siguiente pagina. Aceptable.
    }
  }

  if (!visible) return null;

  return (
    // Encima de los dos botones (ocupan bottom:16 y 64px de alto) y por debajo
    // del z-index del widget, para no taparlos nunca. Solo escritorio: en
    // movil esa esquina ya la ocupan la barra fija de CTA y la burbuja.
    <div className="fixed bottom-[92px] right-4 z-[2147482998] hidden w-[15rem] animate-fadeIn md:block">
      <div className="relative rounded-2xl border border-cian/40 bg-navy-900/95 shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {/* Pico del bocadillo, apuntando al robot que hay debajo. */}
        <span
          className="absolute -bottom-[7px] right-8 h-3 w-3 rotate-45 border-b border-r border-cian/40 bg-navy-900"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => {
            burbuja()?.click();
            ocultar();
          }}
          className="block w-full rounded-2xl px-4 py-3 pr-9 text-left text-sm font-semibold leading-snug text-white transition-colors hover:bg-white/5"
        >
          {texto}
        </button>

        <button
          type="button"
          onClick={ocultar}
          aria-label={cerrar}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

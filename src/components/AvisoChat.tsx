import { useEffect, useState } from 'react';

interface Props {
  texto: string;
  cerrar: string;
}

// Etiqueta que llama la atencion sobre la burbuja del chat.
//
// La burbuja la pinta el widget de la plataforma y su DOM no es nuestro, asi
// que esto NO la modifica: es un elemento aparte, colocado justo encima de
// ella, que al pulsarlo hace clic en la suya. Si algun dia cambian su marcado,
// lo peor que pasa es que esto deje de abrir el chat; la burbuja sigue.
//
// Aparece sola a los pocos segundos, una vez por sesion. Quien ya la ha
// cerrado o ya ha abierto el chat no la vuelve a ver mientras siga navegando.
//
// Solo en escritorio: en movil esa esquina ya la ocupan la barra fija de CTA y
// la burbuja del chat, y una etiqueta de 15rem no cabe sin salirse.

const CLAVE = 'dalsat-aviso-chat';
const ESPERA = 5000;

/** La burbuja del widget: un boton dentro de su raiz. */
function burbuja(): HTMLElement | null {
  const raiz = document.querySelector('[data-dalsat-chat]');
  return raiz ? raiz.querySelector('button') : null;
}

export default function AvisoChat({ texto, cerrar }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let vistoYa = false;
    try {
      vistoYa = window.sessionStorage.getItem(CLAVE) === 'visto';
    } catch {
      // Navegador con el almacenamiento capado: se enseña igual, sin memoria.
    }
    if (vistoYa) return;

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const espera = setTimeout(() => {
      // Si el widget no ha llegado a pintarse (su servidor caido, por ejemplo)
      // no tiene sentido ofrecer un chat que no existe.
      if (burbuja()) setVisible(true);
    }, reducido ? 0 : ESPERA);

    return () => clearTimeout(espera);
  }, []);

  // Cuando el chat se abre, el panel ocupa esta esquina: la etiqueta sobra.
  useEffect(() => {
    if (!visible) return;
    const raiz = document.querySelector('[data-dalsat-chat]');
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
      // Sin memoria, se volvera a ver en la siguiente pagina. Aceptable.
    }
  }

  if (!visible) return null;

  return (
    // Encima de las dos burbujas (ocupan bottom:20px y 56px de alto) y por
    // debajo del z-index del widget, para no taparlas nunca.
    <div className="fixed bottom-[88px] right-5 z-[2147482998] hidden w-[15rem] animate-fadeIn md:block">
      <div className="relative rounded-2xl rounded-br-md border border-cian/40 bg-navy-900/95 shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <span className="absolute -left-1.5 -top-1.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cian opacity-70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cian" />
        </span>

        <button
          type="button"
          onClick={() => {
            burbuja()?.click();
            ocultar();
          }}
          className="block w-full rounded-2xl rounded-br-md px-4 py-3 pr-9 text-left text-sm font-semibold leading-snug text-white transition-colors hover:bg-white/5"
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

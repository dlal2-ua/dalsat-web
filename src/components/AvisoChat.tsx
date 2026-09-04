import { useEffect } from 'react';

// Abre el chat solo y le cambia el icono a la burbuja.
//
// La burbuja y el panel los pinta el widget de la plataforma: su DOM no es
// nuestro. Esto no lo reimplementa, solo lo empuja desde fuera --hace clic en
// su boton y le sustituye el SVG--, asi que si algun dia cambian su marcado lo
// peor que pasa es que esto no haga nada. La burbuja sigue funcionando.

const CLAVE = 'dalsat-chat-abierto';
const ESPERA = 4000;

/** El boton del widget, si ya se ha pintado. */
function burbuja(): HTMLButtonElement | null {
  const raiz = document.querySelector('[data-dalsat-chat]');
  return raiz ? raiz.querySelector('button') : null;
}

// Icono de IA en vez del bocadillo que trae por defecto: no hay una persona
// detras y el icono deberia decirlo. Chispas, que es como se representa esto
// en casi todas partes.
const ICONO_IA = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
     stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
  <path d="M12 3.5 13.4 8 18 9.4 13.4 10.8 12 15.3 10.6 10.8 6 9.4 10.6 8 12 3.5Z"/>
  <path d="M18.5 14.5 19.2 16.8 21.5 17.5 19.2 18.2 18.5 20.5 17.8 18.2 15.5 17.5 17.8 16.8 18.5 14.5Z"/>
  <path d="M5.5 15 6 16.5 7.5 17 6 17.5 5.5 19 5 17.5 3.5 17 5 16.5 5.5 15Z"/>
</svg>`;

export default function AvisoChat() {
  useEffect(() => {
    let cancelado = false;

    function ponerIcono() {
      const boton = burbuja();
      if (!boton || boton.dataset.iconoDalsat === 'ia') return false;
      boton.innerHTML = ICONO_IA;
      boton.dataset.iconoDalsat = 'ia';
      return true;
    }

    // El widget se carga con defer, asi que al montar esto puede no existir.
    const reintento = setInterval(() => {
      if (cancelado || ponerIcono()) clearInterval(reintento);
    }, 400);
    const rendicion = setTimeout(() => clearInterval(reintento), 15000);

    // Abrir solo: una vez por sesion, y nunca en movil, donde el panel taparia
    // la pantalla entera a alguien que venia a leer.
    const estrecho = window.matchMedia('(max-width: 767px)').matches;
    let abiertoYa = false;
    try {
      abiertoYa = window.sessionStorage.getItem(CLAVE) === 'si';
    } catch {
      // Almacenamiento capado: se abriria una vez por pagina. Aceptable.
    }

    let abrir: ReturnType<typeof setTimeout> | undefined;
    if (!estrecho && !abiertoYa) {
      abrir = setTimeout(() => {
        const raiz = document.querySelector('[data-dalsat-chat]');
        const boton = burbuja();
        // Si ya esta abierto no se toca: pulsarlo lo cerraria.
        if (!boton || !raiz || raiz.classList.contains('open')) return;
        boton.click();
        try {
          window.sessionStorage.setItem(CLAVE, 'si');
        } catch {
          // Sin memoria, volveria a abrirse en la siguiente pagina.
        }
      }, ESPERA);
    }

    return () => {
      cancelado = true;
      clearInterval(reintento);
      clearTimeout(rendicion);
      if (abrir) clearTimeout(abrir);
    };
  }, []);

  return null;
}

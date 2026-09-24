import { useEffect, useRef, useState } from 'react';
import { SERVICIOS, rutaServicio } from '../data/servicios';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

interface Props {
  currentPath?: string;
  idioma?: Idioma;
}

// "Servicios" del menu de escritorio como desplegable. La palabra sigue siendo
// un enlace a /servicios (quien pulsa, va al catalogo); la flecha abre la lista
// con los seis servicios explicados en una linea, sin jerga. Se abre con el
// raton, con el foco del teclado y con la flecha; se cierra con Escape, al
// pulsar fuera o al sacar el foco.
export default function ServiciosMenu({ currentPath = '/', idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const temporizador = useRef<number | undefined>(undefined);

  const activo = currentPath === '/servicios' || currentPath.startsWith('/servicios/');

  const abrir = () => {
    window.clearTimeout(temporizador.current);
    setAbierto(true);
  };
  // Un margen corto al salir con el raton: cruzar el hueco entre la palabra y
  // la lista no debe cerrarla.
  const cerrarConRetraso = () => {
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setAbierto(false), 160);
  };

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    const alPulsarFuera = (e: MouseEvent) => {
      if (raiz.current && !raiz.current.contains(e.target as Node)) setAbierto(false);
    };
    window.addEventListener('keydown', alTeclear);
    window.addEventListener('mousedown', alPulsarFuera);
    return () => {
      window.removeEventListener('keydown', alTeclear);
      window.removeEventListener('mousedown', alPulsarFuera);
    };
  }, [abierto]);

  return (
    <div
      ref={raiz}
      className="relative"
      onMouseEnter={abrir}
      onMouseLeave={cerrarConRetraso}
      onFocus={abrir}
      onBlur={(e) => {
        if (!raiz.current?.contains(e.relatedTarget as Node | null)) setAbierto(false);
      }}
    >
      <div className="flex items-center gap-1">
        <a
          href={ruta('/servicios', idioma)}
          aria-current={currentPath === '/servicios' ? 'page' : undefined}
          className={`transition-colors py-1 relative ${
            activo ? 'text-cian font-semibold' : 'text-white/70 hover:text-white'
          }`}
        >
          {t.nav.servicios}
          {activo && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cian rounded-full shadow-[0_0_8px_#14CDEC]" />
          )}
        </a>
        <button
          type="button"
          aria-label={t.nav.abrirServicios}
          aria-expanded={abierto}
          aria-controls="menu-servicios"
          onClick={() => setAbierto((v) => !v)}
          className="flex h-8 w-6 items-center justify-center rounded-md text-white/70 transition-colors hover:text-white"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${abierto ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* El pt-3 (y no un margen) mantiene el area continua con la palabra:
          el raton puede bajar sin que la lista se cierre. */}
      <div
        id="menu-servicios"
        className={`absolute left-1/2 top-full z-50 w-[27rem] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
          abierto ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-white/15 bg-navy-900 p-2 shadow-2xl">
          <ul>
            {SERVICIOS.map((s) => (
              <li key={s.id}>
                <a
                  href={ruta(rutaServicio(s.id), idioma)}
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.07] focus-visible:bg-white/[0.07]"
                >
                  <span className="block text-sm font-semibold text-white">{t.servicios[s.id as keyof typeof t.servicios].nombre}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-white/65">
                    {t.nav.ayudaServicios[s.id as keyof typeof t.nav.ayudaServicios]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 border-t border-white/10 px-4 pb-2 pt-3 text-sm font-semibold">
            <a href={ruta('/servicios', idioma)} className="text-cian transition-colors hover:text-cian-light">
              {t.nav.verTodosServicios} <span aria-hidden="true">&rarr;</span>
            </a>
            <a href={ruta('/sectores', idioma)} className="text-white/70 transition-colors hover:text-cian">
              {t.nav.porTipoNegocio} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SelectorIdioma from './SelectorIdioma';
import { SERVICIOS, rutaServicio } from '../data/servicios';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

interface MobileMenuProps {
  currentPath?: string;
  idioma?: Idioma;
}

export default function MobileMenu({ currentPath = '/', idioma = IDIOMA_POR_DEFECTO }: MobileMenuProps) {
  const t = contenido(idioma);

  // "Servicios" va aparte, como lista desplegable.
  const LINKS = [
    { href: '/demos', label: t.nav.demos },
    { href: '/calculadora', label: t.nav.calculadora },
    { href: '/faq', label: t.nav.faq },
    { href: '/sobre-nosotros', label: t.nav.sobreNosotros },
    { href: '/seguridad', label: t.nav.seguridad },
    { href: '/contacto', label: t.nav.contacto },
  ];

  const [open, setOpen] = useState(false);
  const [serviciosAbiertos, setServiciosAbiertos] = useState(currentPath.startsWith('/servicios'));
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquea el scroll del body mientras el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Cerrado, el drawer no debe poder recibir foco ni tabulación (aunque
  // esté fuera de pantalla con translate-x-full, sigue siendo tabulable sin
  // esto). `inert` se pone a mano porque React todavía no lo modela como
  // prop booleana fiable en JSX.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (open) {
      nav.removeAttribute('inert');
    } else {
      nav.setAttribute('inert', '');
    }
  }, [open, mounted]);

  // Al abrir, el foco entra en el drawer (el botón de cerrar); al cerrar,
  // vuelve al botón que lo abrió. Sin esto el foco se queda "perdido" en un
  // botón que ya no se ve.
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const id = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, [open]);

  const drawerContent = (
    <div className="min-[1320px]:hidden">
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Drawer lateral */}
      <nav
        ref={navRef}
        id="mobile-drawer"
        aria-label={t.nav.principal}
        className={`fixed right-0 top-0 z-[9999] flex h-full w-72 max-w-[85vw] flex-col bg-navy-900 border-l border-white/15 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <a href={ruta('/', idioma)} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <img src="/logo-dalsat.png" alt="" aria-hidden="true" width="59" height="32" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="font-display text-lg font-bold tracking-widest text-white">DALSAT</span>
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={t.nav.cerrarMenu}
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
          {/* Servicios: la palabra abre la lista de los seis, cada uno con
              una linea que dice para que sirve. */}
          <div>
            <button
              type="button"
              aria-expanded={serviciosAbiertos}
              aria-controls="mobile-servicios"
              onClick={() => setServiciosAbiertos((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t.nav.servicios}
              <svg
                className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${serviciosAbiertos ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {serviciosAbiertos && (
              <ul id="mobile-servicios" className="mb-2 ml-4 border-l border-white/10 pl-2">
                {SERVICIOS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={ruta(rutaServicio(s.id), idioma)}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/10"
                    >
                      <span className="block text-[15px] font-medium text-white">{t.servicios[s.id as keyof typeof t.servicios].nombre}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white/60">
                        {t.nav.ayudaServicios[s.id as keyof typeof t.nav.ayudaServicios]}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={ruta('/servicios', idioma)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-cian transition-colors hover:bg-white/10"
                  >
                    {t.nav.verTodosServicios} <span aria-hidden="true">&rarr;</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={ruta(link.href, idioma)}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="border-t border-white/10 p-5 space-y-3">
          <a
            href="https://app.dalsats.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-cian/40 bg-cian/10 px-5 py-3 text-sm font-semibold text-cian transition-colors hover:bg-cian/20 hover:text-white"
          >
            {t.nav.panel}
          </a>
          <a
            href={ruta('/contacto', idioma)}
            onClick={() => setOpen(false)}
            className="flex min-h-[48px] items-center justify-center rounded-xl bg-terracota px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-terracota-light shadow-[0_0_15px_rgba(217,100,44,0.35)]"
          >
            {t.nav.cta} →
          </a>
          <SelectorIdioma idioma={idioma} rutaActual={currentPath} variante="movil" />
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-[1320px]:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? t.nav.cerrarMenu : t.nav.abrirMenu}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}

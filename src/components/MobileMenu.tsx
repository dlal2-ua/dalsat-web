import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
  currentPath?: string;
}

const LINKS = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/demos', label: 'Demos' },
  { href: '/calculadora', label: 'Calculadora' },
  { href: '/faq', label: 'Preguntas Frecuentes' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function MobileMenu({ currentPath = '/' }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const drawerContent = (
    <div className="md:hidden">
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
        id="mobile-drawer"
        aria-label="Menú principal"
        className={`fixed right-0 top-0 z-[9999] flex h-full w-72 max-w-[85vw] flex-col bg-navy-900 border-l border-white/15 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <img src="/logo-dalsat.png" alt="" aria-hidden="true" width="36" height="36" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="font-display text-lg font-bold tracking-widest text-white">DALSAT</span>
          </a>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 px-3 py-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
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
            Entrar al panel
          </a>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="flex min-h-[48px] items-center justify-center rounded-xl bg-terracota px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracota-dark shadow-[0_0_15px_rgba(217,100,44,0.35)]"
          >
            Hablar con nosotros →
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
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

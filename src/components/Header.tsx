import MobileMenu from './MobileMenu';
import SelectorIdioma from './SelectorIdioma';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

interface HeaderProps {
  /** Ruta actual sin prefijo de idioma: '/servicios', no '/en/servicios'. */
  currentPath?: string;
  idioma?: Idioma;
}

export default function Header({ currentPath = '/', idioma = IDIOMA_POR_DEFECTO }: HeaderProps) {
  const t = contenido(idioma);

  const NAV_ITEMS = [
    { href: '/servicios', label: t.nav.servicios },
    { href: '/demos', label: t.nav.demos },
    { href: '/calculadora', label: t.nav.calculadora },
    { href: '/faq', label: t.nav.faq },
    { href: '/sobre-nosotros', label: t.nav.sobreNosotros },
    { href: '/contacto', label: t.nav.contacto },
  ];

  const PANEL_URL = 'https://app.dalsats.com';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo de Dalsat */}
        <a href={ruta('/', idioma)} className="flex items-center gap-2.5 group">
          <img
            src="/logo-dalsat.png"
            alt="" aria-hidden="true"
            width="44"
            height="44"
            className="h-10 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-white text-lg tracking-wider">DALSAT</span>
        </a>

        {/* Menú de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium" aria-label={t.nav.principal}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={ruta(item.href, idioma)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-cian font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cian rounded-full shadow-[0_0_8px_#14CDEC]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Botón CTA + Menú Móvil */}
        <div className="flex items-center gap-3">
          <a
            href={PANEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-cian"
          >
            {t.nav.panel}
          </a>
          <a
            href={ruta('/contacto', idioma)}
            className="hidden md:inline-flex bg-terracota hover:bg-terracota-dark text-navy text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(217,100,44,0.3)] hover:scale-105"
          >
            {t.nav.cta} →
          </a>
          <div className="hidden md:block">
            <SelectorIdioma idioma={idioma} rutaActual={currentPath} />
          </div>
          <MobileMenu currentPath={currentPath} idioma={idioma} />
        </div>

      </div>
    </header>
  );
}

import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20interesa%20lo%20que%20hac%C3%A9is%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.';

interface FooterProps {
  idioma?: Idioma;
}

export default function Footer({ idioma = IDIOMA_POR_DEFECTO }: FooterProps) {
  const t = contenido(idioma);

  return (
    <footer className="relative bg-navy-900 text-white/70 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-cian/10 via-cian-dark/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Parrilla de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Columna 1: Marca y Lema (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href={ruta('/', idioma)} className="inline-flex items-center gap-3 group">
              <img
                src="/logo-dalsat.png"
                alt="" aria-hidden="true"
                width={40}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display font-extrabold text-white text-xl tracking-wider group-hover:text-cian transition-colors">
                DALSAT
              </span>
            </a>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              {t.footer.descripcion}
            </p>

            {/* Badge de estado del servicio */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cian/10 border border-cian/30 text-cian text-[11px] font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-cian animate-ping" />
              <span>{t.footer.estado}</span>
            </div>
          </div>

          {/* Columna 2: Navegación (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {t.footer.navegacion}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href={ruta('/servicios', idioma)} className="hover:text-cian transition-colors">{t.nav.servicios}</a>
              </li>
              <li>
                <a href={ruta('/demos', idioma)} className="hover:text-cian transition-colors">{t.nav.demos}</a>
              </li>
              <li>
                <a href={ruta('/calculadora', idioma)} className="hover:text-cian transition-colors">{t.footer.calculadoraAhorro}</a>
              </li>
              <li>
                <a href={ruta('/faq', idioma)} className="hover:text-cian transition-colors">{t.nav.faq}</a>
              </li>
              <li>
                <a href={ruta('/sobre-nosotros', idioma)} className="hover:text-cian transition-colors">{t.nav.sobreNosotros}</a>
              </li>
              <li>
                <a href={ruta('/contacto', idioma)} className="hover:text-cian transition-colors">{t.nav.contacto}</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soluciones (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {t.footer.servicios}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href={ruta('/servicios#catalogo', idioma)} className="hover:text-cian transition-colors">{t.footer.saas}</a>
              </li>
              <li>
                <a href={ruta('/servicios#catalogo', idioma)} className="hover:text-cian transition-colors">{t.footer.agentes}</a>
              </li>
              <li>
                <a href={ruta('/servicios#plataforma', idioma)} className="hover:text-cian transition-colors">{t.footer.panel}</a>
              </li>
              <li>
                <a href={ruta('/servicios#catalogo', idioma)} className="hover:text-cian transition-colors">{t.footer.procesos}</a>
              </li>
              <li>
                <a href={ruta('/servicios#catalogo', idioma)} className="hover:text-cian transition-colors">{t.footer.seoWeb}</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Directo (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {t.footer.contactoRapido}
            </h4>
            
            <p className="text-xs text-white/60">
              {t.footer.invitacion}
            </p>

            <div className="space-y-2.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 bg-terracota hover:bg-terracota-dark text-navy font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(217,100,44,0.3)] hover:scale-105"
              >
                <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>{t.comun.escribirWhatsApp}</span>
              </a>

              <a
                href="mailto:dalsat.soluciones@gmail.com"
                className="block text-center text-xs text-white/70 hover:text-cian transition-colors py-1 font-mono"
              >
                dalsat.soluciones@gmail.com
              </a>

              {/* Redes. De momento solo Instagram: es la unica cuenta que hay.
                  Va en cian, no en terracota: seguir a alguien no es conversion
                  y el boton de WhatsApp de arriba no debe competir con esto. */}
              <a
                href="https://www.instagram.com/dalsat.co/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.instagram}
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-xs font-bold text-white/70 transition-colors hover:border-cian/50 hover:text-cian"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </svg>
                <span>@dalsat.co</span>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 space-y-5">
          <nav aria-label={t.footer.legal}>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 list-none p-0 m-0 text-xs font-medium text-white/55">
              <li>
                <a href={ruta('/aviso-legal', idioma)} className="hover:text-cian transition-colors">{t.footer.avisoLegal}</a>
              </li>
              <li>
                <a href={ruta('/politica-privacidad', idioma)} className="hover:text-cian transition-colors">{t.footer.privacidad}</a>
              </li>
              <li>
                <a href={ruta('/cookies', idioma)} className="hover:text-cian transition-colors">{t.footer.cookies}</a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40">
            <p>{t.footer.derechos}</p>
            <span className="text-white/60">{t.footer.ambito}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

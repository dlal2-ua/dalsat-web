import { useEffect, useState } from 'react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20interesa%20lo%20que%20hac%C3%A9is%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.';

// En el movil no hay botón fijo de contacto: el de la cabecera se esconde a
// partir de md y el flotante de WhatsApp es un icono suelto. Esta barra
// aparece en cuanto se pasa la primera pantalla, para que la acción esté
// siempre a un dedo sin tapar el hero nada más entrar.
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScrollear = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2.5 border-t border-white/12 bg-navy-950/95 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
        <a
          href="/contacto"
          tabIndex={visible ? undefined : -1}
          className="flex-1 rounded-xl bg-terracota px-4 py-3.5 text-center text-sm font-extrabold text-navy transition-colors hover:bg-terracota-dark"
        >
          Hablar con nosotros
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          aria-label="Escribirnos por WhatsApp"
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-cian/40 bg-cian/10 text-cian transition-colors hover:bg-cian/20"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

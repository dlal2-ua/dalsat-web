import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import { urlWhatsApp } from '../data/contacto';

interface Props {
  idioma?: Idioma;
}

export default function FloatingWhatsApp({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);

  return (
    // Convive con la burbuja del chat, que el widget fija en right:20px
    // bottom:20px con 56px de lado. Este mide 64 y va a su izquierda: 88px de
    // margen derecho lo deja con doce de hueco, y bottom:16 los centra a la
    // misma altura pese a medir distinto. z-index por debajo del suyo, para
    // quedar al lado y no taparlo nunca. El panel se abre sobre los dos.
    //
    // En movil no sale: ahi el contacto lo lleva la barra fija de abajo.
    <div className="fixed bottom-4 right-[88px] z-[2147482999] hidden md:block">
      <a
        href={urlWhatsApp(t.comun.mensajeWhatsApp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.comun.escribirWhatsApp}
        title={t.comun.hablarWhatsApp}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-terracota text-navy shadow-[0_10px_28px_rgba(217,100,44,0.5)] transition-transform duration-300 hover:scale-110 hover:bg-terracota-dark active:scale-95 cursor-pointer"
      >
        {/* Halo que late hacia fuera. Va detras del boton y sin capturar el
            raton, para que no se coma el clic ni tape la burbuja del chat. */}
        <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-terracota/40" />

        <svg className="relative h-8 w-8 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

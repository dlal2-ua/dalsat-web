import { IDIOMAS, NOMBRE_IDIOMA, ruta, type Idioma } from '../i18n/config';

interface Props {
  /** Idioma en el que se esta viendo la pagina. */
  idioma: Idioma;
  /** Ruta actual, ya sin prefijo de idioma. */
  rutaActual: string;
  /** En el menu movil ocupa el ancho completo y no va en pastilla. */
  variante?: 'barra' | 'movil';
}

// Selector de idioma. Son dos, asi que no hace falta desplegable: se pintan
// los dos codigos y el que no esta activo es un enlace a la misma pagina en el
// otro idioma. Un <select> con dos opciones seria mas clics para lo mismo.
//
// Enlaza a la misma pagina, no al inicio: cambiar de idioma en /calculadora
// deberia dejarte en la calculadora.
export default function SelectorIdioma({ idioma, rutaActual, variante = 'barra' }: Props) {
  const enBarra = variante === 'barra';

  return (
    <div
      className={
        enBarra
          ? 'flex items-center gap-0.5 rounded-xl border border-white/15 p-0.5'
          : 'flex items-center gap-1 rounded-xl border border-white/15 p-1'
      }
    >
      {IDIOMAS.map((codigo) => {
        const activo = codigo === idioma;
        const base = enBarra
          ? 'px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors'
          : 'flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg text-center transition-colors';

        // El idioma activo no es un enlace: no lleva a ninguna parte.
        return activo ? (
          <span key={codigo} aria-current="true" className={`${base} bg-cian/15 text-cian`}>
            {codigo}
          </span>
        ) : (
          <a
            key={codigo}
            href={ruta(rutaActual, codigo)}
            hrefLang={codigo}
            aria-label={`Ver esta página en ${NOMBRE_IDIOMA[codigo]}`}
            className={`${base} text-white/55 hover:bg-white/5 hover:text-white`}
          >
            {codigo}
          </a>
        );
      })}
    </div>
  );
}

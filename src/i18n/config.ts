// Configuracion de idiomas.
//
// El castellano es el idioma por defecto y vive en la raiz (`/servicios`).
// El ingles vive bajo prefijo (`/en/servicios`). Se hace con el enrutado i18n
// que trae Astro 5 de serie: no hay plugin de terceros. Los que hay
// (astro-i18next, astro-i18n) llevan anos sin tocarse, y ninguno traduce el
// contenido: eso hay que escribirlo igual.

export const IDIOMAS = ['es', 'en'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = 'es';

/** Como se llama cada idioma en su propio idioma, para el selector. */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

/** El codigo que va en <html lang> y en hreflang. */
export const ETIQUETA_HTML: Record<Idioma, string> = {
  es: 'es-ES',
  en: 'en',
};

/**
 * Saca el idioma de una URL. `/en/servicios` -> 'en'; `/servicios` -> 'es'.
 */
export function idiomaDeUrl(url: URL): Idioma {
  const [, primero] = url.pathname.split('/');
  return (IDIOMAS as readonly string[]).includes(primero) && primero !== IDIOMA_POR_DEFECTO
    ? (primero as Idioma)
    : IDIOMA_POR_DEFECTO;
}

/**
 * Quita el prefijo de idioma de una ruta y devuelve la ruta "neutra".
 * `/en/servicios` -> `/servicios`. `/en` -> `/`.
 */
export function rutaSinIdioma(pathname: string): string {
  for (const idioma of IDIOMAS) {
    if (idioma === IDIOMA_POR_DEFECTO) continue;
    if (pathname === `/${idioma}` || pathname === `/${idioma}/`) return '/';
    if (pathname.startsWith(`/${idioma}/`)) return pathname.slice(idioma.length + 1);
  }
  return pathname || '/';
}

/**
 * Traduce una ruta neutra al idioma pedido. El idioma por defecto no lleva
 * prefijo, asi que `/servicios` se queda igual en castellano y pasa a
 * `/en/servicios` en ingles.
 *
 * Los anclajes (`/servicios#catalogo`) se conservan.
 */
export function ruta(destino: string, idioma: Idioma): string {
  if (destino.startsWith('http') || destino.startsWith('mailto:') || destino.startsWith('tel:')) {
    return destino;
  }
  const [camino, ancla] = destino.split('#');
  const limpio = rutaSinIdioma(camino.startsWith('/') ? camino : `/${camino}`);
  const conPrefijo =
    idioma === IDIOMA_POR_DEFECTO
      ? limpio
      : limpio === '/'
        ? `/${idioma}`
        : `/${idioma}${limpio}`;
  return ancla ? `${conPrefijo}#${ancla}` : conPrefijo;
}

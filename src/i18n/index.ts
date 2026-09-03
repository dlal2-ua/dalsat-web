import { es } from './es';
import { en } from './en';
import type { Contenido } from './es';
import type { Idioma } from './config';

const CONTENIDO: Record<Idioma, Contenido> = { es, en };

/** El arbol de textos del idioma pedido. */
export function contenido(idioma: Idioma): Contenido {
  return CONTENIDO[idioma];
}

export type { Contenido };
export * from './config';

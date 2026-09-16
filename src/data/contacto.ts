// Datos de contacto de DALSAT. Fuente unica.
//
// El telefono estaba escrito a fuego en dieciseis sitios: cada componente y
// cada pagina montaba su propia URL de WhatsApp. Cambiarlo significaba acertar
// dieciseis veces, y olvidarse de una deja un enlace mandando gente a un
// numero que ya no es vuestro, sin que nada falle ni se note.

/** Numero en formato internacional, sin signos. Es lo que quiere la API de WhatsApp. */
export const WHATSAPP_TELEFONO = '34614289702';

/** El mismo numero como se escribe para leerlo. */
export const TELEFONO_LEGIBLE = '614 28 97 02';

export const EMAIL = 'dalsat.soluciones@gmail.com';

/**
 * URL de WhatsApp con un mensaje ya escrito.
 *
 * El texto se pasa en claro y se codifica aqui, para que en el sitio de la
 * llamada se lea la frase y no un %20 detras de otro.
 */
export function urlWhatsApp(mensaje: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_TELEFONO}&text=${encodeURIComponent(mensaje)}`;
}

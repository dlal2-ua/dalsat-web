// Los seis servicios, en orden de prioridad.
//
// Fuente unica de nombre, numero y slug. Los lee el catalogo de /servicios
// (components/Services.tsx), el indice de la home (pages/index.astro) y las
// paginas de cada servicio (pages/servicios/[slug].astro y su version /en).
// Antes cada uno tenia su propia copia de los seis y podian irse separando:
// un cambio de nombre se quedaba a medias en una de las dos paginas.
//
// Aqui solo va lo que comparten. La descripcion larga, los puntos, el icono
// y el ancho de cada tarjeta son del catalogo y viven en Services.tsx.

export interface Servicio {
  id: string;
  order: string;
  nombre: string;
  /**
   * Tramo de URL de la pagina del servicio: /servicios/{slug} y
   * /en/servicios/{slug}. El mismo en los dos idiomas, porque `ruta()` solo
   * antepone /en. Con las palabras que se buscan en Google: no cambiarlo sin
   * redirigir la URL vieja, o se pierde lo que ya haya posicionado.
   */
  slug: string;
  /**
   * Vídeo de motion graphics del servicio (proyecto Remotion en
   * dalsat-videos/remotion, serie de 6, uno por servicio). `undefined`
   * mientras ese vídeo no esté grabado: /demos muestra un aviso de "en
   * camino" en vez de un <video> roto. Rutas dentro de public/videos/{id}/.
   */
  video?: { src: string; poster: string };
}

export const SERVICIOS: Servicio[] = [
  { id: 'saas', order: '01', nombre: 'Software a medida', slug: 'software-a-medida' },
  { id: 'agentes', order: '02', nombre: 'Agentes de IA', slug: 'agentes-ia' },
  { id: 'panel', order: '03', nombre: 'CRM con IA', slug: 'crm-con-ia' },
  {
    id: 'procesos',
    order: '04',
    nombre: 'Mapeo y automatización',
    slug: 'automatizacion-de-procesos',
    video: { src: '/videos/procesos/horizontal.mp4', poster: '/videos/procesos/poster.webp' },
  },
  { id: 'seo', order: '05', nombre: 'SEO', slug: 'seo-para-pymes' },
  { id: 'web', order: '06', nombre: 'Desarrollo web', slug: 'desarrollo-web' },
];

/** Enlace a la pagina de un servicio, sin prefijo de idioma (pasarlo por `ruta`). */
export const rutaServicio = (id: string) => {
  const servicio = SERVICIOS.find((s) => s.id === id);
  return servicio ? `/servicios/${servicio.slug}` : '/servicios';
};

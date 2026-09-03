// Los seis servicios, en orden de prioridad.
//
// Fuente unica de nombre y numero. Los lee el catalogo de /servicios
// (components/Services.tsx) y el indice de la home (pages/index.astro).
// Antes cada uno tenia su propia copia de los seis y podian irse separando:
// un cambio de nombre se quedaba a medias en una de las dos paginas.
//
// Aqui solo va lo que comparten. La descripcion larga, los puntos, el icono
// y el ancho de cada tarjeta son del catalogo y viven en Services.tsx.

export interface Servicio {
  id: string;
  order: string;
  nombre: string;
}

export const SERVICIOS: Servicio[] = [
  { id: 'saas', order: '01', nombre: 'SaaS a medida' },
  { id: 'agentes', order: '02', nombre: 'Agentes de IA' },
  { id: 'panel', order: '03', nombre: 'Tu panel de gestión' },
  { id: 'procesos', order: '04', nombre: 'Mapeo y automatización' },
  { id: 'seo', order: '05', nombre: 'SEO' },
  { id: 'web', order: '06', nombre: 'Desarrollo web' },
];

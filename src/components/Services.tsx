import { SERVICIOS, rutaServicio } from '../data/servicios';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

// Lo que solo necesita el catalogo. El numero de cada servicio viene de
// data/servicios.ts, que se comparte con el indice de la home; el texto, de
// src/i18n, porque cambia con el idioma. Aqui, el icono y el ancho de la
// tarjeta. `span` se queda aqui a proposito: es la maquetacion asimetrica de
// esta pagina, no informacion del servicio.
interface Presentacion {
  span: string;
  icon: string;
}

// Exportado: ServiceVideos.tsx (pestañas de /demos) reutiliza estos mismos
// iconos para no mantener una segunda copia que se pueda desincronizar.
export const PRESENTACION: Record<string, Presentacion> = {
  saas: {
    span: 'lg:col-span-7',
    icon: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z',
  },
  agentes: {
    span: 'lg:col-span-5',
    icon: 'M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z',
  },
  panel: {
    span: 'lg:col-span-5',
    icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z',
  },
  procesos: {
    span: 'lg:col-span-7',
    icon: 'M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  seo: {
    span: 'lg:col-span-6',
    icon: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  },
  web: {
    span: 'lg:col-span-6',
    icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z',
  },
};

interface Props {
  idioma?: Idioma;
}

export default function Services({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma);
  const SERVICES = SERVICIOS.map((servicio) => ({
    ...servicio,
    ...PRESENTACION[servicio.id],
    ...t.servicios[servicio.id as keyof typeof t.servicios],
  }));

  return (
    <section id="catalogo" className="relative bg-navy-900 border-t border-white/10 pb-20 sm:pb-28 pt-4 overflow-hidden">
      {/* Reticula y una sola luz, en la misma capa de fondo: antes eran una
          mancha con blur de 160px en la seccion y otra por cada ficha. */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,205,236,0.10),transparent_55%),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]"
        aria-hidden="true"
      />

      {/* La cabecera de la seccion la pone la pagina que monta el catalogo,
          para no repetir el mismo titular dos veces seguidas. Por eso el
          nombre de cada servicio es un h2: cuelga directamente del h1. */}
      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {SERVICES.map((service) => (
            // id = ancla (/servicios#seo). Sin data-reveal a proposito: quien
            // llega por enlace directo tiene que ver la ficha aunque el
            // observador de revelado no haya corrido.
            // Plana, sin cristal: va sobre fondo opaco y el backdrop-blur no
            // aportaba nada. El borde reacciona solo porque dentro hay un
            // enlace; la ficha en si no se pulsa, asi que no se levanta.
            <article
              key={service.id}
              id={service.id}
              className={`${service.span} scroll-mt-24 relative flex flex-col rounded-3xl p-6 sm:p-9 border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-cian/40 focus-within:border-cian/40`}
            >
              <div className="flex items-start justify-between gap-6 mb-5">
                <div>
                  <span className="font-mono text-xs font-bold text-cian/80 tabular-nums" aria-hidden="true">
                    {service.order}
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {service.nombre}
                  </h2>
                </div>
                <svg className="mt-1 w-7 h-7 shrink-0 text-cian" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>

              <p className="text-lg sm:text-xl font-semibold text-white/85 leading-snug mb-4 max-w-xl">
                {service.titulo}
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                {service.texto}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2">
                {service.puntos.map((point) => (
                  <li
                    key={point}
                    className="text-xs font-semibold text-white/75 border border-white/15 px-3 py-1.5 rounded-full"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              {/* Dos salidas por tarjeta: la pagina del servicio (la que
                  posiciona en Google) y su pestaña en /demos (ancla
                  #video-{id}, la lee ServiceVideos.tsx al montar). */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={ruta(rutaServicio(service.id), idioma)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-cian hover:text-cian-light transition-colors"
                >
                  {t.paginaServicio.verServicio}
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href={`${ruta('/demos', idioma)}#video-${service.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-cian transition-colors"
                >
                  {t.comun.verVideo}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

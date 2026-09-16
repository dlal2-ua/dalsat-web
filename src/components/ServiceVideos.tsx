import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import { useEffect, useRef, useState } from 'react';
import { SERVICIOS } from '../data/servicios';
import { PRESENTACION } from './Services';
import SectorDemos from './SectorDemos';
import AudioDemos from './AudioDemos';

// Pestañas por servicio (los 6 de servicios.ts) con el vídeo de cada uno
// (serie de motion graphics del proyecto Remotion en dalsat-videos/remotion).
// Sustituye a lo que antes era esta página entera: una demo que solo hablaba
// de Agentes de IA (1 de los 6 servicios) y encima con chat y voz grabados,
// no algo que se pudiera probar. Ahora cada servicio se ve en vídeo; el de
// Agentes de IA, además, sigue teniendo debajo el simulador y el botón que
// abre WhatsApp de verdad — eso sí es interactivo, no hace falta tocarlo.
export default function ServiceVideos({ idioma = IDIOMA_POR_DEFECTO }: { idioma?: Idioma }) {
  const t = contenido(idioma);
  const SERVICIOS_CON_TEXTO = SERVICIOS.map((servicio) => ({
    ...servicio,
    ...PRESENTACION[servicio.id],
    ...t.servicios[servicio.id as keyof typeof t.servicios],
  }));

  // Se abre en el primer servicio que ya tiene vídeo: si abriera en el
  // primero a secas, lo primero que vería el visitante sería un "en camino".
  const [activeId, setActiveId] = useState<string>(
    (SERVICIOS_CON_TEXTO.find((s) => s.video) ?? SERVICIOS_CON_TEXTO[0]).id,
  );
  const seccionRef = useRef<HTMLDivElement>(null);

  // Respeta "reducir movimiento" del sistema: el salto de sitio sigue
  // pasando, pero sin animar el scroll.
  const scrollBehavior = (): ScrollBehavior =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';

  // Las tarjetas del catálogo (/servicios) enlazan aquí con #video-{id}: al
  // llegar así, se abre esa pestaña directamente en vez de la primera.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#video-', '');
    if (hash && SERVICIOS_CON_TEXTO.some((s) => s.id === hash)) {
      setActiveId(hash);
      seccionRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    }
    // Solo al montar: es la entrada por enlace externo, no algo que deba
    // repetirse si el usuario cambia de pestaña después.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#video-${id}`);
      if (window.innerWidth < 1024) {
        setTimeout(() => seccionRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }), 100);
      }
    }
  };

  return (
    <section id="demos-video" ref={seccionRef} className="relative py-20 sm:py-28 bg-navy-900 border-t border-white/10 overflow-hidden scroll-mt-16">
      {/* Resplandor ambiental de fondo: gradiente radial en vez de un blob
          desenfocado con blur-[170px], que es caro y no aporta nada visible
          de más aquí. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(20,205,236,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Pestañas de selección de servicio */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10">
          {SERVICIOS_CON_TEXTO.map((servicio) => {
            const isSelected = servicio.id === activeId;
            return (
              <button
                key={servicio.id}
                type="button"
                aria-pressed={isSelected}
                aria-controls={`panel-${servicio.id}`}
                onClick={() => handleSelect(servicio.id)}
                className={`px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cian focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 ${
                  isSelected
                    ? 'bg-gradient-to-r from-white/[0.15] to-white/[0.05] border-cian text-white shadow-[0_0_25px_rgba(20,205,236,0.3)] scale-105'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={servicio.icon} />
                </svg>
                <span>{servicio.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Los seis paneles van siempre en el HTML (SEO); solo se ve el del
            servicio activo, el resto queda oculto con `hidden`. */}
        {SERVICIOS_CON_TEXTO.map((servicio) => (
          <div
            key={servicio.id}
            id={`panel-${servicio.id}`}
            hidden={servicio.id !== activeId}
            className="bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-white/[0.01] border border-cian/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Columna izquierda: texto del servicio (mismo contenido que /servicios) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono">
                  <span>{servicio.order} · {servicio.nombre}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{servicio.titulo}</h2>
                <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">{servicio.texto}</p>
                <ul className="flex flex-wrap gap-2">
                  {servicio.puntos.map((punto) => (
                    <li key={punto} className="text-[11px] sm:text-xs font-semibold text-white/75 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-full">
                      {punto}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna derecha: el vídeo del servicio, o un aviso si aún no está grabado */}
              <div className="lg:col-span-7">
                {servicio.video ? (
                  <video
                    key={servicio.video.src}
                    controls
                    preload="none"
                    poster={servicio.video.poster}
                    className="w-full aspect-video rounded-2xl border border-white/15 shadow-2xl bg-black"
                  >
                    <source src={servicio.video.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full aspect-video rounded-2xl border border-dashed border-white/20 bg-white/[0.03] flex flex-col items-center justify-center gap-3 text-center p-8">
                    <svg className="w-9 h-9 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.531V17.69a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <p className="text-white/60 text-sm sm:text-base font-semibold">{t.comun.videoPendiente}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* El simulador de chat y las notas de voz de Agentes de IA: siempre
          en el HTML (SEO), ocultos salvo que esa pestaña esté activa. Van
          fuera del contenedor con padding de arriba a proposito: son
          secciones propias con su propio ancho completo, y así no hace
          falta cancelar el padding del padre con margenes negativos. */}
      <div hidden={activeId !== 'agentes'}>
        <SectorDemos idioma={idioma} />
        <AudioDemos idioma={idioma} />
      </div>
    </section>
  );
}

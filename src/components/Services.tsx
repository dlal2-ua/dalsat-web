interface Service {
  id: string;
  order: string;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  span: string;
  icon: string;
  link?: { label: string; href: string };
}

// Orden de prioridad del catalogo. El primero manda visualmente.
const SERVICES: Service[] = [
  {
    id: 'saas',
    order: '01',
    eyebrow: 'SaaS a medida',
    title: 'El programa que tu negocio necesita, hecho para ti',
    desc: 'Dejas de pelearte con hojas de cálculo y con programas genéricos donde nada encaja. Construimos tu herramienta: clientes, citas, presupuestos, stock o lo que hoy llevas a mano.',
    points: ['Solo lo que usas', 'Tu equipo entra desde el móvil', 'Crece contigo'],
    span: 'lg:col-span-7',
    icon: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z',
  },
  {
    id: 'agentes',
    order: '02',
    eyebrow: 'Agentes de IA',
    title: 'Agentes que atienden por ti, cada uno para lo suyo',
    desc: 'Un agente que conoce tu negocio y responde como responderías tú. Por WhatsApp, por Instagram o dentro de tu propia web. Resuelve dudas, coge reservas y avisa a tu equipo cuando hace falta una persona.',
    points: ['WhatsApp e Instagram', 'Agente dentro de tu web', 'Atención y reservas'],
    span: 'lg:col-span-5',
    icon: 'M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z',
    link: { label: 'Probar una demo', href: '/demos' },
  },
  {
    id: 'panel',
    order: '03',
    eyebrow: 'Tu panel de gestión',
    title: 'Un sitio desde el que lo llevas todo',
    desc: 'El panel donde cambias lo que responde tu agente de chat y el de voz, ves y mueves las reservas, lees las conversaciones y miras los números de tu negocio. Hace de CRM para todo lo que pasa por el agente.',
    points: ['Agente, reservas y métricas', 'Desde el móvil o el ordenador', 'Entra con lo que contrates'],
    span: 'lg:col-span-5',
    icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z',
  },
  {
    id: 'procesos',
    order: '04',
    eyebrow: 'Mapeo y automatización',
    title: 'Primero entendemos cómo trabajas, después lo automatizamos',
    desc: 'Nos sentamos contigo y dibujamos cómo funciona tu negocio de verdad, paso a paso. Ahí se ve solo lo que se repite cada semana. Eso es lo que quitamos de en medio.',
    points: ['Mapa de tu negocio', 'Se ve dónde se pierde el tiempo', 'Tareas que se hacen solas'],
    span: 'lg:col-span-7',
    icon: 'M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    id: 'seo',
    order: '05',
    eyebrow: 'SEO',
    title: 'Que te encuentren cuando te buscan',
    desc: 'Trabajamos para que tu negocio aparezca cuando alguien de tu zona busca en Google lo que tú ofreces. Ficha de Google, contenido útil y una web que carga rápido.',
    points: ['Búsquedas de tu zona', 'Ficha de Google al día', 'Sin trucos raros'],
    span: 'lg:col-span-6',
    icon: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  },
  {
    id: 'web',
    order: '06',
    eyebrow: 'Desarrollo web',
    title: 'Webs que trabajan, no folletos',
    desc: 'Una web rápida y clara, pensada para que quien entre haga algo: pedir cita, escribirte o comprar. Y conectada con las herramientas que ya usas.',
    points: ['Carga rápido en el móvil', 'Pensada para que te escriban', 'Conectada a tu agente'],
    span: 'lg:col-span-6',
    icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z',
  },
];

export default function Services() {
  return (
    <section id="catalogo" className="relative bg-navy-900 border-t border-white/10 pb-20 sm:pb-28 pt-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cian/10 rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />

      {/* La cabecera de la seccion la pone la pagina que monta el catalogo,
          para no repetir el mismo titular dos veces seguidas. */}
      <div className="max-w-7xl lg:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className={`${service.span} group relative rounded-3xl p-6 sm:p-9 border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-cian/60 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-cian/15 via-transparent to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/[0.07] border border-white/15 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-cian" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                      {service.eyebrow}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-cian/50" aria-hidden="true">
                    {service.order}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  {service.desc}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="text-[11px] sm:text-xs font-semibold text-white/75 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {service.link && (
                  <a
                    href={service.link.href}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-terracota hover:text-terracota-light transition-colors"
                  >
                    {service.link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

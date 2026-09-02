import { useState } from 'react';

interface FaqItem {
  id: string;
  category: string;
  badge: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  // Categoria: Servicios
  {
    id: 'empezar',
    category: 'Servicios',
    badge: 'Primer paso',
    question: '¿Por dónde se empieza?',
    answer: 'Por una reunión de media hora en la que nos cuentas cómo trabajas hoy: qué haces cada día, quién lo hace y dónde se apunta. De ahí sale el mapa de tu negocio y la lista de lo que se puede quitar de en medio. Si vemos que no hay nada que te compense, te lo decimos y no pasa nada.',
  },
  {
    id: 'ya-tengo-web',
    category: 'Servicios',
    badge: 'Re-digitalización',
    question: 'Ya tengo web, redes y ficha en Google. ¿Esto para qué me sirve?',
    answer: 'Todo eso sirve para que te encuentren, y sigue haciendo falta. Lo que no hace es quitarte trabajo: las llamadas, los mensajes de WhatsApp, las citas y los apuntes a mano siguen siendo tuyos. La re-digitalización es la parte de después: mirar cómo funciona tu negocio de verdad y hacer que lo que se repite cada semana se haga solo.',
  },
  {
    id: 'panel',
    category: 'Servicios',
    badge: 'Incluido',
    question: '¿Desde dónde gestiono mi agente y mis reservas?',
    answer: 'Desde tu panel, con tu usuario y tu contraseña, en app.dalsats.com. Ahí cambias lo que responde el agente de chat y el de voz, ves y mueves las reservas que han cogido, lees las conversaciones y tienes los números de tu negocio: cuánto se ha respondido solo, a qué horas te escriben más y cuántas horas te has ahorrado. Hace las veces de CRM para lo que pasa por el agente. Entra con lo que contrates, no se paga aparte y no hay que instalar nada.',
  },
  {
    id: 'que-haceis',
    category: 'Servicios',
    badge: 'Seis servicios',
    question: '¿Solo hacéis agentes de IA?',
    answer: 'No. Hacemos seis cosas: programas a medida para tu negocio, agentes de IA que atienden por WhatsApp, Instagram o dentro de tu web, el panel desde el que gestionas todo eso, mapeo y automatización de procesos, SEO para que te encuentren en Google y desarrollo web. Los agentes son la parte más visible, pero rara vez es por donde más se gana.',
  },
  {
    id: 'saas-medida',
    category: 'Servicios',
    badge: 'SaaS a medida',
    question: '¿Qué es eso de un programa a medida y en qué se diferencia de uno normal?',
    answer: 'Un programa hecho para cómo trabajas tú, en vez de uno genérico donde acabas peleándote con campos que no usas y echando de menos los que necesitas. Suele sustituir a la hoja de cálculo y a los papeles: clientes, citas, presupuestos, stock. Solo lleva lo que usáis y entra tu equipo desde el móvil.',
  },
  {
    id: 'mapeo',
    category: 'Servicios',
    badge: 'Mapeo de procesos',
    question: '¿Qué es mapear los procesos de mi negocio?',
    answer: 'Sentarnos contigo y dibujar cómo funciona tu negocio de verdad, paso a paso: qué entra, quién lo toca, qué se apunta y dónde. Cuando está dibujado se ve solo lo que se repite cada semana y lo que se puede quitar de en medio. Es el punto de partida de casi todo lo demás, y a veces la conclusión es que no hace falta ninguna IA.',
  },
  {
    id: 'seo-web',
    category: 'Servicios',
    badge: 'SEO y web',
    question: '¿También hacéis la web y el posicionamiento en Google?',
    answer: 'Sí. Hacemos webs rápidas y pensadas para que quien entre haga algo: pedir cita, escribirte o comprar. Y trabajamos el SEO para que tu negocio salga cuando alguien de tu zona busca lo que ofreces: ficha de Google al día, contenido útil y una web que carga rápido en el móvil.',
  },
  {
    id: 'zona',
    category: 'Servicios',
    badge: 'Toda España',
    question: '¿Trabajáis en mi zona?',
    answer: 'Trabajamos con pymes de toda España. El mapeo inicial sale mejor cara a cara, así que si estás cerca vamos en persona, y si no lo hacemos por videollamada. El resto lo llevamos en remoto sin que se note la distancia.',
  },
  // Categoria: WhatsApp
  {
    id: 'numero',
    category: 'WhatsApp',
    badge: 'Sin cambio de número',
    question: '¿Tengo que cambiar el número de WhatsApp de mi empresa?',
    answer: 'No. El agente se conecta al número de WhatsApp Business que ya usas. Mantienes tus contactos, tu historial y tu perfil de empresa, y tus clientes no notan ningún cambio.',
  },
  {
    id: 'multimedia',
    category: 'WhatsApp',
    badge: 'Archivos & Multimedia',
    question: '¿El agente de WhatsApp puede enviar catálogos, imágenes o documentos PDF?',
    answer: 'Sí. Manda catálogos en PDF, fotos de tus servicios, listas de precios o la ubicación en Google Maps, según lo que le pida el cliente.',
  },
  {
    id: 'pagos',
    category: 'WhatsApp',
    badge: 'Cobros automáticos',
    question: '¿Puede el agente de WhatsApp enviar enlaces de pago o señal de reserva?',
    answer: 'Sí. Lo conectamos con Stripe, Bizum o Redsys para que el agente mande un enlace de cobro seguro y no confirme la cita hasta que esté pagada la señal.',
  },
  {
    id: 'notas_voz',
    category: 'WhatsApp',
    badge: 'Notas de voz',
    question: '¿Qué ocurre si un cliente envía un audio de WhatsApp en lugar de escribir?',
    answer: 'Lo escucha, entiende lo que le piden y contesta al momento, por escrito o con otra nota de voz.',
  },
  {
    id: 'limite',
    category: 'WhatsApp',
    badge: 'Sin esperas',
    question: '¿Hay algún límite en el número de clientes atendidos simultáneamente?',
    answer: 'Ninguno. Lleva cientos de conversaciones a la vez sin ir más lento y sin dejar a nadie esperando.',
  },

  // Categoria: Agentes de Voz
  {
    id: 'voz',
    category: 'Agentes de Voz',
    badge: 'Voz Natural',
    question: '¿Cómo suena la voz de las llamadas telefónicas?',
    answer: 'Suena a persona: español de España, con sus pausas y su entonación. En la página de demos puedes escuchar muestras reales y juzgarlo tú.',
  },
  {
    id: 'llamadas_salientes',
    category: 'Agentes de Voz',
    badge: 'Llamadas automáticas',
    question: '¿Puede el agente realizar llamadas salientes para recordar citas?',
    answer: 'Sí. Llama uno o dos días antes para confirmar, y el cliente puede confirmar o cambiar la cita en esa misma llamada. Así se te quedan muchos menos huecos sin avisar.',
  },
  {
    id: 'horario_voz',
    category: 'Agentes de Voz',
    badge: 'Atención 24/7',
    question: '¿El agente telefónico atiende fuera del horario comercial?',
    answer: 'Sí, las 24 horas y todos los días del año. Si te llaman de madrugada o un domingo, el agente coge el recado, da la cita o resuelve la duda.',
  },

  // Categoria: Integraciones
  {
    id: 'agenda',
    category: 'Integraciones',
    badge: 'Citas automáticas',
    question: '¿Se conecta a mi agenda actual (Google Calendar, Booksy, etc.)?',
    answer: 'Sí. Mira los huecos libres en Google Calendar, Outlook, Booksy o Calendly antes de dar una cita, y la guarda ahí mismo. No coge dos citas para la misma hora.',
  },
  {
    id: 'crm',
    category: 'Integraciones',
    badge: 'CRM & ERP',
    question: '¿Se puede integrar con mi programa de facturación o sistema propio?',
    answer: 'Sí. Nos conectamos con tu programa de facturación, tu software de gestión o el que uses en tu sector, para que los datos de un cliente no haya que meterlos dos veces.',
  },

  // Categoria: Seguridad & RGPD
  {
    id: 'fallo',
    category: 'Seguridad & RGPD',
    badge: 'Traspaso a humano',
    question: '¿Qué ocurre si la IA no sabe responder una consulta o el cliente requiere atención personalizada?',
    answer: 'Te lo pasa a ti. Cuando la consulta se sale de lo que sabe o hace falta el criterio de una persona, avisa a tu equipo con el resumen de lo hablado y seguís vosotros desde ahí. No se inventa una respuesta para salir del paso.',
  },
  {
    id: 'rgpd',
    category: 'Seguridad & RGPD',
    badge: 'RGPD Europeo',
    question: '¿Cumple con la Ley de Protección de Datos (RGPD)?',
    answer: 'Sí. Los datos van cifrados y se guardan en servidores europeos. Los de tus clientes no se comparten con nadie ni se usan para entrenar modelos públicos.',
  },

  // Categoria: Contrato & Tiempos
  {
    id: 'precio',
    category: 'Contrato & Tiempos',
    badge: 'Precio',
    question: '¿Cuánto cuesta?',
    answer: 'Depende de lo que montemos: no cuesta lo mismo un agente de WhatsApp que un programa a medida para tu negocio. Miramos tu caso, te decimos qué merece la pena y qué no, y te pasamos un precio cerrado antes de empezar. La primera reunión no se cobra y no te compromete a nada.',
  },
  {
    id: 'tiempo',
    category: 'Contrato & Tiempos',
    badge: '48-72 Horas',
    question: '¿En cuánto tiempo queda instalado y funcionando?',
    answer: 'Un agente, entre 48 y 72 horas laborables. Lo montamos nosotros: le enseñamos tus precios, tus horarios y tus servicios, lo probamos y te lo entregamos funcionando. Un programa a medida o una web llevan más, y te decimos el plazo antes de empezar.',
  },
  {
    id: 'permanencia',
    category: 'Contrato & Tiempos',
    badge: 'Sin permanencia',
    question: '¿Existe algún tipo de contrato o permanencia obligatoria?',
    answer: 'No. Vamos mes a mes, sin permanencia y sin penalización si lo dejas. Si no te compensa, avisas y se acaba.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>('empezar');
  // Se abre en 'Servicios', que es lo que hacemos entero. Los agentes son uno
  // de los seis, asi que abrir en 'WhatsApp' daba una idea equivocada.
  const [activeCategory, setActiveCategory] = useState<string>('Servicios');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reactions, setReactions] = useState<Record<string, boolean>>({});

  const categories = Array.from(new Set(FAQS.map((f) => f.category)));
  const allCategories = ['Servicios', ...categories.filter((c) => c !== 'Servicios'), 'Todas'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'Todas' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const handleReaction = (id: string) => {
    setReactions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="preguntas-frecuentes" className="relative py-20 sm:py-28 bg-navy-900 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cian/10 via-cian-dark/10 to-cian/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.2)] mb-4">
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              Respuestas Claras
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Selecciona la categoría que te interesa para ver las respuestas detalladas.
          </p>

          {/* Buscador Interactivo */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar una duda (ej. WhatsApp, voz, contrato, RGPD...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/20 rounded-2xl py-3.5 pl-5 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cian focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(20,205,236,0.25)] transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-xs font-mono bg-white/10 text-white/70 hover:text-white px-2 py-1 rounded-full cursor-pointer"
                >
                   Borrar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filtro por Categorías */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {allCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === 'Todas' ? FAQS.length : FAQS.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  const firstOfCat = FAQS.find((f) => cat === 'Todas' || f.category === cat);
                  if (firstOfCat) setOpenId(firstOfCat.id);
                }}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cian to-cian-dark text-navy-800 border-transparent shadow-[0_0_20px_rgba(20,205,236,0.35)] scale-105 font-black'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-white/60'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Si no hay resultados de búsqueda */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-2">No encontramos respuestas para "{searchTerm}"</h3>
            <p className="text-white/60 text-xs sm:text-sm mb-6">Prueba con otras palabras o escríbenos directamente por WhatsApp.</p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setActiveCategory('Servicios'); }}
              className="text-xs font-bold text-cian hover:underline cursor-pointer"
            >
              ← Ver las preguntas sobre servicios
            </button>
          </div>
        )}

        {/* Lista de Acordeones de la Categoría Seleccionada */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            const hasReacted = reactions[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                  isOpen
                    ? 'bg-gradient-to-b from-white/[0.1] to-white/[0.03] border-cian/50 shadow-[0_0_25px_rgba(20,205,236,0.15)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                {/* Cabecera del Item */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold text-cian bg-cian/10 border border-cian/20 px-2.5 py-1 rounded-lg shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-cian/15 text-cian border border-cian/30 font-mono">
                          {faq.badge}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-cian transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Botón de Expansión Flotante */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'rotate-180 bg-cian text-navy-800 border-transparent shadow-[0_0_15px_#14CDEC]'
                      : 'bg-white/5 text-white/70 border-white/20 group-hover:border-white/40'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Contenido Desplegable Animado */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-white/70 text-sm sm:text-base font-light leading-relaxed border-t border-white/10 pt-4 animate-fadeIn space-y-4">
                    <p>{faq.answer}</p>

                    {/* Botones de Reacción e Interacción */}
                    <div className="flex items-center justify-between pt-2 text-xs flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 text-[11px]">¿Te resulta útil esta respuesta?</span>
                        <button
                          type="button"
                          onClick={() => handleReaction(faq.id)}
                          className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 border text-xs ${
                            hasReacted
                              ? 'bg-cian/20 text-cian-light border-cian/50'
                              : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span>{hasReacted ? 'Respuesta útil' : 'Sí, me sirve'}</span>
                        </button>
                      </div>

                      <a
                        href={`https://api.whatsapp.com/send?phone=34646005171&text=Hola%2C%20tengo%20una%20duda%20sobre%3A%20${encodeURIComponent(faq.question)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-cian hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Preguntar por WhatsApp →
                      </a>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cambiar de categoría rápido */}
        {activeCategory !== 'Todas' && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setActiveCategory('Todas')}
              className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-cian transition-colors py-2 px-4 rounded-xl border border-white/10 hover:border-cian/30 cursor-pointer"
            >
              <span>Ver todas las demás categorías ({FAQS.length} preguntas en total) ↓</span>
            </button>
          </div>
        )}

        {/* Tarjeta Visual de Soporte Personalizado */}
        <div className="mt-14 bg-gradient-to-r from-navy via-navy-900 to-navy-800 border border-cian/40 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono font-extrabold uppercase text-cian bg-cian/10 px-3 py-1 rounded-full border border-cian/30 inline-block">
              Soporte Directo Dalsat
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ¿Tienes una duda específica sobre tu negocio?
            </h3>
            <p className="text-white/70 text-sm font-light max-w-xl">
              Analizamos tu caso sin compromiso y te mostramos cómo adaptar la IA a tu empresa.
            </p>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=34646005171&text=Hola%2C%20quisiera%20consultar%20mi%20caso%20particular%20con%20un%20especialista%20de%20Dalsat."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-terracota hover:bg-terracota-dark text-white font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(217,100,44,0.3)] hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}

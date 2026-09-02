import { useState } from 'react';

interface FaqItem {
  id: string;
  category: string;
  badge: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  // Categoria: WhatsApp
  {
    id: 'numero',
    category: 'WhatsApp',
    badge: 'Sin cambio de número',
    question: '¿Tengo que cambiar el número de WhatsApp de mi empresa?',
    answer: 'No. El Agente de IA de Dalsat se conecta directamente a tu número actual de WhatsApp Business o línea telefónica existente. Mantienes tu lista de contactos, historial y perfil de empresa sin interrumpir el servicio.',
  },
  {
    id: 'multimedia',
    category: 'WhatsApp',
    badge: 'Archivos & Multimedia',
    question: '¿El agente de WhatsApp puede enviar catálogos, imágenes o documentos PDF?',
    answer: 'Sí. El agente puede adjuntar catálogos de productos en PDF, fotos de servicios, listas de precios y ubicaciones de Google Maps al instante según lo que solicite el cliente.',
  },
  {
    id: 'pagos',
    category: 'WhatsApp',
    badge: 'Cobros automáticos',
    question: '¿Puede el agente de WhatsApp enviar enlaces de pago o señal de reserva?',
    answer: 'Sí. Nos integramos con pasarelas de pago como Stripe, Bizum o Redsys para que el agente envíe un enlace seguro de cobro o señal antes de confirmar la cita en la agenda.',
  },
  {
    id: 'notas_voz',
    category: 'WhatsApp',
    badge: 'Notas de voz',
    question: '¿Qué ocurre si un cliente envía un audio de WhatsApp en lugar de escribir?',
    answer: 'El agente transcribe automáticamente la nota de voz del cliente en milisegundos, comprende la petición y le responde de manera fluida ya sea por texto o con otra nota de voz generada por IA.',
  },
  {
    id: 'limite',
    category: 'WhatsApp',
    badge: 'Sin esperas',
    question: '¿Hay algún límite en el número de clientes atendidos simultáneamente?',
    answer: 'Ninguno. A diferencia de un equipo humano, el agente de IA puede mantener cientos de conversaciones simultáneas en WhatsApp a la misma hora sin ralentizarse ni hacer esperar a ningún cliente.',
  },

  // Categoria: Agentes de Voz
  {
    id: 'voz',
    category: 'Agentes de Voz',
    badge: 'Voz Natural',
    question: '¿Cómo suena la voz de las llamadas telefónicas?',
    answer: 'Utilizamos tecnología de locución con entonación natural en español de España, pausas orgánicas y fluidez conversacional. En la sección de Demos de nuestra web puedes escuchar muestras de voz reales en directo.',
  },
  {
    id: 'llamadas_salientes',
    category: 'Agentes de Voz',
    badge: 'Llamadas automáticas',
    question: '¿Puede el agente realizar llamadas salientes para recordar citas?',
    answer: 'Sí. El agente puede realizar llamadas automáticas de confirmación 24 o 48 horas antes de la cita, permitiendo al cliente confirmar o reagendar en la propia llamada para reducir plantones a cero.',
  },
  {
    id: 'horario_voz',
    category: 'Agentes de Voz',
    badge: 'Atención 24/7',
    question: '¿El agente telefónico atiende fuera del horario comercial?',
    answer: 'Sí, opera las 24 horas del día, los 365 días del año. Si entra una llamada de madrugada o en fin de semana, el agente toma nota, agenda la cita o resuelve la duda de inmediato.',
  },

  // Categoria: Integraciones
  {
    id: 'agenda',
    category: 'Integraciones',
    badge: 'Citas automáticas',
    question: '¿Se conecta a mi agenda actual (Google Calendar, Booksy, etc.)?',
    answer: 'Sí. El agente consulta en tiempo real la disponibilidad en Google Calendar, Outlook, Booksy, Calendly, Shopify o tu CRM (HubSpot, Salesforce) y guarda las citas automáticamente sin generar reservas dobles.',
  },
  {
    id: 'crm',
    category: 'Integraciones',
    badge: 'CRM & ERP',
    question: '¿Se puede integrar con mi programa de facturación o sistema propio?',
    answer: 'Sí, disponemos de integración mediante API y webhooks con sistemas propios, softwares de gestión clínica, restauración y gestorías para sincronizar datos de clientes automáticamente.',
  },

  // Categoria: Seguridad & RGPD
  {
    id: 'fallo',
    category: 'Seguridad & RGPD',
    badge: 'Traspaso a humano',
    question: '¿Qué ocurre si la IA no sabe responder una consulta o el cliente requiere atención personalizada?',
    answer: 'Nuestros agentes cuentan con Traspaso Inteligente a Humano. Cuando la IA detecta que la consulta requiere criterio personal o atención especializada, notifica al instante a tu equipo enviando el resumen completo para que podáis tomar el control.',
  },
  {
    id: 'rgpd',
    category: 'Seguridad & RGPD',
    badge: 'RGPD Europeo',
    question: '¿Cumple con la Ley de Protección de Datos (RGPD)?',
    answer: 'Sí, al 100%. Todos los datos viajan cifrados de extremo a extremo y se alojan en servidores seguros europeos. Garantizamos la confidencialidad absoluta y los datos de tus clientes nunca se comparten ni se usan para entrenar modelos públicos.',
  },

  // Categoria: Contrato & Tiempos
  {
    id: 'tiempo',
    category: 'Contrato & Tiempos',
    badge: '48-72 Horas',
    question: '¿En cuánto tiempo queda instalado y funcionando?',
    answer: 'En solo 48 a 72 horas laborables. Nos encargamos de todo el proceso de configuración: entrenamos la IA con tus tarifas, horarios y catálogo de servicios, realizamos las pruebas de seguridad y te lo entregamos listo para operar.',
  },
  {
    id: 'permanencia',
    category: 'Contrato & Tiempos',
    badge: 'Sin permanencia',
    question: '¿Existe algún tipo de contrato o permanencia obligatoria?',
    answer: 'No. Operamos mes a mes sin compromisos de permanencia ni penalizaciones por cancelación. Confiamos en el rendimiento de la automatización para que continúes voluntariamente.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>('numero');
  // Por defecto se muestra la categoría 'WhatsApp' para no abrumar con todas las preguntas de golpe
  const [activeCategory, setActiveCategory] = useState<string>('WhatsApp');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [reactions, setReactions] = useState<Record<string, boolean>>({});

  const categories = Array.from(new Set(FAQS.map((f) => f.category)));
  const allCategories = ['WhatsApp', ...categories.filter((c) => c !== 'WhatsApp'), 'Todas'];

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
                  ✕ Borrar
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
              onClick={() => { setSearchTerm(''); setActiveCategory('WhatsApp'); }}
              className="text-xs font-bold text-cian hover:underline cursor-pointer"
            >
              ← Ver preguntas de WhatsApp
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
                      0{idx + 1}
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

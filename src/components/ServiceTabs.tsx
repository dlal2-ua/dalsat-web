import { useState } from 'react';
import type { ReactElement } from 'react';

type SectorId = 'todos' | 'salud' | 'hosteleria' | 'academias' | 'ecommerce';

interface Sector {
  id: SectorId;
  label: string;
}

interface Service {
  title: string;
  badge: string;
  badgeColor: string;
  icon: ReactElement;
  copy: Record<SectorId, string>;
}

const SECTORS: Sector[] = [
  { id: 'todos', label: 'Todos los negocios' },
  { id: 'salud', label: 'Clínicas y salud' },
  { id: 'hosteleria', label: 'Hostelería y restauración' },
  { id: 'academias', label: 'Academias y formación' },
  { id: 'ecommerce', label: 'eCommerce y tiendas' },
];

const iconClass = 'h-6 w-6';

const SERVICES: Service[] = [
  {
    title: 'Agente WhatsApp 24/7',
    badge: 'Disponible',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    copy: {
      todos: 'Responde preguntas frecuentes, atiende fuera de horario y escala a humano cuando hace falta. Activo siempre, sin intervención tuya.',
      salud: 'Resuelve dudas de pacientes sobre tratamientos, horarios y preparación de pruebas. Sin colas telefónicas ni recepción saturada.',
      hosteleria: 'Atiende reservas, consultas de carta, alérgenos y horarios mientras tu equipo está en sala. Sin perder ni una mesa.',
      academias: 'Responde sobre cursos, plazas, precios y matrículas al instante, también cuando la secretaría está cerrada.',
      ecommerce: 'Resuelve dudas de producto, tallas, envíos y devoluciones al momento. Menos carritos abandonados por falta de respuesta.',
    },
  },
  {
    title: 'Gestión de citas y calendario',
    badge: 'Disponible',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    copy: {
      todos: 'Reservas automáticas integradas con tu calendario: el agente propone huecos, confirma y envía recordatorios solo.',
      salud: 'El paciente pide cita por WhatsApp y el agente la agenda según tu disponibilidad real. Recordatorios que reducen ausencias.',
      hosteleria: 'Reservas de mesa confirmadas al momento, con gestión de turnos y recordatorio el mismo día para reducir no-shows.',
      academias: 'Agenda clases de prueba, tutorías y matrículas sin cruces de horario. Recordatorios automáticos a los alumnos.',
      ecommerce: 'Agenda llamadas comerciales, recogidas y citas de showroom sin intercambio de emails.',
    },
  },
  {
    title: 'Automatización de email',
    badge: 'Disponible',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    copy: {
      todos: 'Clasificación, respuestas a consultas habituales y flujos de seguimiento. Tu bandeja de entrada bajo control.',
      salud: 'Confirmaciones de cita, envío de instrucciones previas y seguimiento post-consulta sin que nadie lo redacte a mano.',
      hosteleria: 'Confirmaciones de reserva, menús de grupo y presupuestos de eventos respondidos sin esperar al fin del servicio.',
      academias: 'Información de cursos, seguimiento de interesados y comunicación con alumnos automatizada de principio a fin.',
      ecommerce: 'Estados de pedido, incidencias de envío y solicitudes de devolución gestionados sin tocar la bandeja de entrada.',
    },
  },
  {
    title: 'Facturación automática',
    badge: 'Próximamente',
    badgeColor: 'bg-amber-100 text-amber-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25h6m-6 2.25h3m-5.25 4.5h10.5a2.25 2.25 0 0 0 2.25-2.25V5.106c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m-4.5 0H6a.75.75 0 0 1 .75.75v.75H3.75v-.75A.75.75 0 0 1 4.5 8.25Zm0 3.75H6a.75.75 0 0 1 .75.75v.75H3.75v-.75a.75.75 0 0 1 .75-.75Zm0 3.75H6a.75.75 0 0 1 .75.75v.75H3.75v-.75a.75.75 0 0 1 .75-.75Z" />
      </svg>
    ),
    copy: {
      todos: 'Generación y envío de facturas disparados por eventos: confirmación de cita, pago recibido, cierre de servicio.',
      salud: 'Factura emitida y enviada al paciente en cuanto termina la consulta o se confirma el pago del tratamiento.',
      hosteleria: 'Facturas de eventos y comidas de empresa generadas y enviadas en cuanto se cierra la cuenta.',
      academias: 'Recibos de mensualidades y facturas de matrícula emitidos automáticamente cada ciclo de cobro.',
      ecommerce: 'Factura generada y adjuntada en el email de confirmación de cada pedido, sin pasos manuales.',
    },
  },
  {
    title: 'Integraciones a medida',
    badge: 'A consultar',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    copy: {
      todos: 'CRM, ERP, TPV, plataformas de reservas… Si ya usas una herramienta, estudiamos cómo conectarla a tu flujo automatizado.',
      salud: 'Conectamos con tu software de gestión clínica e historiales para que el agente trabaje con tus datos reales.',
      hosteleria: 'Integración con tu TPV, plataforma de reservas o sistema de pedidos a domicilio para un flujo único.',
      academias: 'Conexión con tu plataforma de e-learning o software de gestión académica: matrículas y notas sin duplicar datos.',
      ecommerce: 'Integración con Shopify, WooCommerce o tu CRM: el agente conoce stock, pedidos y clientes en tiempo real.',
    },
  },
  {
    title: 'Reportes semanales',
    badge: 'Próximamente',
    badgeColor: 'bg-amber-100 text-amber-700',
    icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    copy: {
      todos: 'Resúmenes automáticos de actividad, conversaciones y métricas clave directamente en tu email o WhatsApp cada semana.',
      salud: 'Citas gestionadas, consultas más frecuentes y escalados de la semana, resumidos en un informe claro.',
      hosteleria: 'Reservas, ocupación y preguntas más repetidas de tus clientes, cada lunes en tu WhatsApp.',
      academias: 'Nuevos interesados, matrículas cerradas y dudas frecuentes de alumnos en un resumen semanal.',
      ecommerce: 'Consultas atendidas, incidencias resueltas y productos más preguntados, resumido cada semana.',
    },
  },
];

export default function ServiceTabs() {
  const [sector, setSector] = useState<SectorId>('todos');

  return (
    <div>
      <style>{`
        @keyframes svcFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .svc-card {
          animation: svcFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-card { animation: none; }
        }
      `}</style>

      {/* Tabs: scroll horizontal con snap en mobile */}
      <div
        role="tablist"
        aria-label="Sectores"
        className="-mx-4 mb-10 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {SECTORS.map((s) => {
          const active = s.id === sector;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSector(s.id)}
              className={`min-h-[44px] shrink-0 cursor-pointer snap-start whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                active
                  ? 'bg-[#001A3F] text-white shadow-md'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-[#00E0FF] hover:text-[#001A3F]'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Cards: key={sector} fuerza la reanimación al cambiar de tab */}
      <div key={sector} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="svc-card rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-[#00E0FF]/60 hover:shadow-lg"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#001A3F] text-[#00E0FF]">
                {service.icon}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${service.badgeColor}`}>
                {service.badge}
              </span>
            </div>
            <h3 className="mb-2 text-base font-bold text-[#001A3F]">{service.title}</h3>
            <p className="text-sm leading-relaxed text-gray-500">{service.copy[sector]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

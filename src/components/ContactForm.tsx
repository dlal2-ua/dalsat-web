import { useState } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import type { Contenido } from '../i18n/es';
import { urlWhatsApp } from '../data/contacto';

type Status = 'idle' | 'sending' | 'error';

interface Errores {
  name?: string;
  email?: string;
  message?: string;
}

const CAMPO_BASE =
  'w-full px-4 py-3.5 rounded-xl border bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 text-white placeholder-white/30 text-sm transition-all shadow-inner';
const CAMPO_OK = 'border-white/15 focus:ring-cian focus:border-transparent';
// El error no lleva color propio: en esta paleta el unico calido es terracota
// y esta reservado a los botones de conversion. Se marca con borde blanco
// fuerte, icono y texto, que se ve igual de bien y no compite con los CTA.
const CAMPO_MAL = 'border-white/60 bg-white/[0.09] focus:ring-white/70 focus:border-white';

const LIMITES = { name: 80, email: 120, business: 80, message: 2000 };

function validar(data: FormData, msg: Contenido['formulario']['errores']): Errores {
  const errores: Errores = {};
  const nombre = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const mensaje = String(data.get('message') || '').trim();

  if (nombre.length < 2) {
    errores.name = msg.nombre;
  }
  if (!email) {
    errores.email = msg.emailFalta;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errores.email = msg.emailMal;
  }
  if (mensaje && mensaje.length < 10) {
    errores.message = msg.mensajeCorto;
  }

  // Topes por arriba. Los campos ya llevan maxLength, pero eso solo frena a
  // quien escribe en el formulario: quien envie a mano puede mandar lo que
  // quiera, y no tiene sentido reenviarlo a Formspree.
  if (nombre.length > LIMITES.name) {
    errores.name = msg.nombreLargo;
  }
  if (email.length > LIMITES.email) {
    errores.email = msg.emailLargo;
  }
  if (mensaje.length > LIMITES.message) {
    errores.message = msg.mensajeLargo.replace('{max}', String(LIMITES.message));
  }

  return errores;
}

function MensajeError({ id, texto }: { id: string; texto: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-white">
      <svg className="mt-px h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <span>{texto}</span>
    </p>
  );
}

interface Props {
  idioma?: Idioma;
}

export default function ContactForm({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma).formulario;

  const [status, setStatus] = useState<Status>('idle');
  const [errores, setErrores] = useState<Errores>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const fallos = validar(data, t.errores);
    if (Object.keys(fallos).length > 0) {
      setErrores(fallos);
      setStatus('idle');
      // Al primer campo con error, para no dejar a nadie buscando.
      const primero = Object.keys(fallos)[0];
      form.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    setErrores({});
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xlgzqkva', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        // Página propia de gracias: sirve de confirmación clara y deja
        // medir cuántos formularios se envían de verdad.
        window.location.href = idioma === IDIOMA_POR_DEFECTO ? '/gracias' : `/${idioma}/gracias`;
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const limpiar = (campo: keyof Errores) => {
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Trampa anti-bot de Formspree: un campo que ninguna persona ve ni
          puede enfocar. Los bots rellenan todo lo que encuentran, y Formspree
          descarta el envio si este viene con algo. Sin captcha, sin cargar
          nada de terceros y sin molestar a quien escribe de verdad. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="name">
          {t.nombre}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t.nombrePista}
          maxLength={LIMITES.name}
          autoComplete="name"
          aria-invalid={errores.name ? true : undefined}
          aria-describedby={errores.name ? 'error-name' : undefined}
          onChange={() => limpiar('name')}
          className={`${CAMPO_BASE} ${errores.name ? CAMPO_MAL : CAMPO_OK}`}
        />
        {errores.name && <MensajeError id="error-name" texto={errores.name} />}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="email">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t.emailPista}
          maxLength={LIMITES.email}
          autoComplete="email"
          inputMode="email"
          aria-invalid={errores.email ? true : undefined}
          aria-describedby={errores.email ? 'error-email' : undefined}
          onChange={() => limpiar('email')}
          className={`${CAMPO_BASE} ${errores.email ? CAMPO_MAL : CAMPO_OK}`}
        />
        {errores.email && <MensajeError id="error-email" texto={errores.email} />}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="business">
          {t.negocio} <span className="font-normal text-white/45">{t.opcional}</span>
        </label>
        <input
          id="business"
          name="business"
          type="text"
          placeholder={t.negocioPista}
          maxLength={LIMITES.business}
          autoComplete="organization"
          className={`${CAMPO_BASE} ${CAMPO_OK}`}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="message">
          {t.mensaje} <span className="font-normal text-white/45">{t.opcional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={t.mensajePista}
          maxLength={LIMITES.message}
          aria-invalid={errores.message ? true : undefined}
          aria-describedby={errores.message ? 'error-message' : undefined}
          onChange={() => limpiar('message')}
          className={`${CAMPO_BASE} resize-none ${errores.message ? CAMPO_MAL : CAMPO_OK}`}
        />
        {errores.message && <MensajeError id="error-message" texto={errores.message} />}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2.5 bg-terracota hover:bg-terracota-dark text-navy disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-terracota font-bold py-4 rounded-xl transition-all duration-300 text-sm shadow-[0_0_25px_rgba(217,100,44,0.3)] hover:shadow-[0_0_35px_rgba(217,100,44,0.5)] hover:scale-[1.02] disabled:hover:scale-100 cursor-pointer"
      >
        {status === 'sending' && (
          <span
            className="h-4 w-4 shrink-0 rounded-full border-2 border-navy/25 border-t-navy animate-spin"
            aria-hidden="true"
          />
        )}
        <span>{status === 'sending' ? t.enviando : `${t.enviar} →`}</span>
      </button>

      <p aria-live="polite" className="sr-only">
        {status === 'sending' ? t.enviandoAviso : ''}
      </p>

      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-white/50 bg-white/[0.09] p-4 text-sm leading-relaxed text-white">
          <p className="flex items-start gap-2 font-bold mb-1.5">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{t.falloTitulo}</span>
          </p>
          <p className="text-white/85">
            {t.falloTextoAntes}{' '}
            <a href="mailto:dalsat.soluciones@gmail.com" className="font-semibold underline underline-offset-2 hover:text-cian">
              dalsat.soluciones@gmail.com
            </a>{' '}
            {t.falloTextoO}{' '}
            <a
              href={urlWhatsApp('Hola, me interesa lo que hacéis y me gustaría recibir más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-cian"
            >
              {t.falloWhatsApp}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}

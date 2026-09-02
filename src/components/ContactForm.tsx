import { useState } from 'react';

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

function validar(data: FormData): Errores {
  const errores: Errores = {};
  const nombre = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const mensaje = String(data.get('message') || '').trim();

  if (nombre.length < 2) {
    errores.name = 'Dinos cómo te llamas o cómo se llama tu negocio.';
  }
  if (!email) {
    errores.email = 'Necesitamos un correo para contestarte.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errores.email = 'Ese correo no parece bien escrito. Revísalo.';
  }
  if (mensaje && mensaje.length < 10) {
    errores.message = 'Cuéntanos un poco más, con dos palabras no sabemos por dónde empezar.';
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

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errores, setErrores] = useState<Errores>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const fallos = validar(data);
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
        window.location.href = '/gracias';
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
      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Tu nombre o empresa"
          aria-invalid={errores.name ? true : undefined}
          aria-describedby={errores.name ? 'error-name' : undefined}
          onChange={() => limpiar('name')}
          className={`${CAMPO_BASE} ${errores.name ? CAMPO_MAL : CAMPO_OK}`}
        />
        {errores.name && <MensajeError id="error-name" texto={errores.name} />}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          aria-invalid={errores.email ? true : undefined}
          aria-describedby={errores.email ? 'error-email' : undefined}
          onChange={() => limpiar('email')}
          className={`${CAMPO_BASE} ${errores.email ? CAMPO_MAL : CAMPO_OK}`}
        />
        {errores.email && <MensajeError id="error-email" texto={errores.email} />}
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="business">
          Tipo de negocio <span className="font-normal text-white/45">(opcional)</span>
        </label>
        <input
          id="business"
          name="business"
          type="text"
          placeholder="Gimnasio, clínica, autoescuela…"
          className={`${CAMPO_BASE} ${CAMPO_OK}`}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="message">
          Mensaje <span className="font-normal text-white/45">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Cuéntanos sobre tu negocio o qué te gustaría automatizar"
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
        <span>{status === 'sending' ? 'Enviando…' : 'Empezar ahora →'}</span>
      </button>

      <p aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Enviando el formulario' : ''}
      </p>

      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-white/50 bg-white/[0.09] p-4 text-sm leading-relaxed text-white">
          <p className="flex items-start gap-2 font-bold mb-1.5">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>No hemos podido enviarlo</span>
          </p>
          <p className="text-white/85">
            Puede ser cosa de la conexión. Vuelve a darle al botón, o escríbenos a{' '}
            <a href="mailto:dalsat.soluciones@gmail.com" className="font-semibold underline underline-offset-2 hover:text-cian">
              dalsat.soluciones@gmail.com
            </a>{' '}
            o{' '}
            <a
              href="https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20interesa%20lo%20que%20hac%C3%A9is%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-cian"
            >
              por WhatsApp
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}

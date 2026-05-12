import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Tu nombre o empresa"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="business">
          Tipo de negocio
        </label>
        <input
          id="business"
          name="business"
          type="text"
          placeholder="Gimnasio, clínica, autoescuela…"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Cuéntanos sobre tu negocio o deja tu WhatsApp"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-gray-900 placeholder-gray-400 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-green-200"
      >
        {status === 'sending' ? 'Enviando…' : 'Empezar ahora →'}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-green-600 font-medium">
          ¡Mensaje recibido! Te contactamos en menos de 24h.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-red-500">
          Algo fue mal. Escríbenos directamente a{' '}
          <a href="mailto:dalsat.soluciones@gmail.com" className="underline">
            dalsat.soluciones@gmail.com
          </a>
        </p>
      )}
    </form>
  );
}

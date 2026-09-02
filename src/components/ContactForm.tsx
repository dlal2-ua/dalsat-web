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
      const res = await fetch('https://formspree.io/f/xlgzqkva', {
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Tu nombre o empresa"
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cian focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cian focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="business">
          Tipo de negocio
        </label>
        <input
          id="business"
          name="business"
          type="text"
          placeholder="Gimnasio, clínica, autoescuela…"
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cian focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-1.5" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Cuéntanos sobre tu negocio o qué te gustaría automatizar"
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cian focus:border-transparent text-white placeholder-white/30 text-sm resize-none transition-all shadow-inner"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-terracota hover:bg-terracota-dark text-white disabled:opacity-60 font-bold py-4 rounded-xl transition-all duration-300 text-sm shadow-[0_0_25px_rgba(217,100,44,0.3)] hover:shadow-[0_0_35px_rgba(217,100,44,0.5)] hover:scale-[1.02] cursor-pointer"
      >
        {status === 'sending' ? 'Enviando…' : 'Empezar ahora →'}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-cian font-semibold bg-cian/10 p-3.5 rounded-xl border border-cian/30">
          ¡Mensaje recibido! Te contactamos en menos de 24h.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-cian bg-cian/10 p-3.5 rounded-xl border border-cian/30 leading-relaxed">
          Algo fue mal. Escríbenos directamente a{' '}
          <a href="mailto:dalsat.soluciones@gmail.com" className="underline font-medium hover:text-white transition-colors">
            dalsat.soluciones@gmail.com
          </a>
          {' '}o por WhatsApp{' '}
          <a href="https://api.whatsapp.com/send?phone=34646005171&text=Hola,%20me%20interesa%20lo%20que%20hac%C3%A9is%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n." target="_blank" rel="noopener noreferrer" className="underline font-bold text-white hover:text-cian transition-colors">
            haciendo clic aquí
          </a>
        </p>
      )}
    </form>
  );
}

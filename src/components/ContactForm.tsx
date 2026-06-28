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
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
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
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
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
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent text-white placeholder-white/30 text-sm transition-all shadow-inner"
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
          className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent text-white placeholder-white/30 text-sm resize-none transition-all shadow-inner"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-[#00E0FF] to-[#00B8FF] hover:from-white hover:to-white text-[#001A3F] disabled:opacity-60 font-bold py-4 rounded-xl transition-all duration-300 text-sm shadow-[0_0_25px_rgba(0,224,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:scale-[1.02] cursor-pointer"
      >
        {status === 'sending' ? 'Enviando…' : 'Empezar ahora →'}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm text-[#00E0FF] font-semibold bg-[#00E0FF]/10 p-3.5 rounded-xl border border-[#00E0FF]/30">
          ¡Mensaje recibido! Te contactamos en menos de 24h.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-red-400 bg-red-500/10 p-3.5 rounded-xl border border-red-500/30 leading-relaxed">
          Algo fue mal. Escríbenos directamente a{' '}
          <a href="mailto:dalsat.soluciones@gmail.com" className="underline font-medium hover:text-white transition-colors">
            dalsat.soluciones@gmail.com
          </a>
          {' '}o por WhatsApp al{' '}
          <a href="https://wa.me/34646005171" target="_blank" rel="noopener noreferrer" className="underline font-bold text-white hover:text-[#00E0FF] transition-colors">
            646 00 51 71
          </a>
        </p>
      )}
    </form>
  );
}

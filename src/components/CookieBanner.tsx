import { useEffect, useState } from 'react';

const STORAGE_KEY = 'dalsat-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-[#001A3F] text-white px-4 py-5 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <p className="text-sm text-white/80 flex-1">
          Usamos cookies propias y de terceros para el funcionamiento de la web y para analizar el tráfico. Puedes aceptarlas, rechazarlas o consultar más información en nuestra{' '}
          <a href="/cookies" className="underline hover:text-white">
            Política de Cookies
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleChoice('rejected')}
            className="text-sm font-medium px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={() => handleChoice('accepted')}
            className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-[#00E0FF] text-[#001A3F] hover:bg-white transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

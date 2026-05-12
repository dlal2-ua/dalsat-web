import { useState, useEffect, useRef } from 'react';

interface Message {
  from: 'client' | 'bot';
  text: string;
  delay: number;
}

const MESSAGES: Message[] = [
  { from: 'client', text: '¿Cuánto cuesta el carnet de coche?', delay: 0 },
  {
    from: 'bot',
    text: '¡Hola! 👋 El carnet B (coche) tiene un precio de 950€ todo incluido: clases prácticas, tasas de examen y gestión. ¿Te gustaría más info sobre el proceso?',
    delay: 1200,
  },
  { from: 'client', text: 'Sí, ¿cuántas clases son?', delay: 2800 },
  {
    from: 'bot',
    text: 'El paquete estándar incluye 30 clases prácticas de 45 min. Si necesitas más, cada clase adicional son 28€. La mayoría de alumnos aprueban en el primer intento con ese paquete 🚗',
    delay: 4200,
  },
  { from: 'client', text: '¿Y podéis empezar esta semana?', delay: 6000 },
  {
    from: 'bot',
    text: 'Tenemos huecos disponibles! Para reservar tu primera clase y elegir horario, déjame tu nombre y te paso con el equipo para concretar 😊',
    delay: 7400,
  },
];

export default function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= MESSAGES.length) return;

    const current = MESSAGES[visibleCount];
    const next = MESSAGES[visibleCount + 1];

    const showTimer = setTimeout(() => {
      if (current.from === 'bot') setTyping(false);
      setVisibleCount((c) => c + 1);

      if (next && next.from === 'bot') {
        setTimeout(() => setTyping(true), 300);
      }
    }, current.delay + (visibleCount === 0 ? 0 : MESSAGES[visibleCount - 1]?.delay ?? 0));

    return () => clearTimeout(showTimer);
  }, [visibleCount, started]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount, typing]);

  const reset = () => {
    setVisibleCount(0);
    setTyping(false);
    setStarted(false);
  };

  const shownMessages = MESSAGES.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        {/* WhatsApp header */}
        <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
            AP
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Autoescuela Pollica</p>
            <p className="text-white/70 text-xs">Agente Dalsat · en línea</p>
          </div>
          <div className="ml-auto flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          </div>
        </div>

        {/* Chat area */}
        <div
          className="bg-[#ECE5DD] px-3 py-4 space-y-2 overflow-y-auto"
          style={{ minHeight: '340px', maxHeight: '340px' }}
        >
          {!started ? (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setStarted(true)}
                className="bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#128C7E] transition-colors text-sm"
              >
                ▶ Ver demo en vivo
              </button>
            </div>
          ) : (
            <>
              {shownMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      msg.from === 'client'
                        ? 'bg-[#DCF8C6] text-gray-800 rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-gray-400 text-right mt-1">
                      {msg.from === 'bot' ? '✓✓' : ''}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Footer */}
        {started && visibleCount >= MESSAGES.length && (
          <div className="bg-[#ECE5DD] px-3 pb-3 text-center">
            <button
              onClick={reset}
              className="text-xs text-[#128C7E] underline hover:text-[#0B5E55]"
            >
              Reiniciar demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

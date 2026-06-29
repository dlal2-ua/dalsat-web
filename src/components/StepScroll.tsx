import React, { useEffect, useRef, useState } from 'react';

interface StepItem {
  step: string;
  number: string;
  title: string;
  desc: string;
  tag: string;
  icon: string;
}

const STEPS: StepItem[] = [
  {
    step: 'PASO 01',
    number: '1',
    title: 'Cuéntanos tu negocio',
    desc: 'Nos explicas tus flujos y documentos. Nosotros nos encargamos del diseño y la arquitectura.',
    tag: 'Reunión de 30 min',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25h7.5m-7.5 3h7.5m3-9v9a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V4.5a2.25 2.25 0 0 1 2.25-2.25h5.379c.597 0 1.17.237 1.591.659l4.621 4.621c.422.422.659.994.659 1.591Z',
  },
  {
    step: 'PASO 02',
    number: '2',
    title: 'Diseñamos tu agente',
    desc: 'Integramos la IA con tus herramientas y la adaptamos con precisión al tono exacto de tu marca.',
    tag: '3-5 días',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    step: 'PASO 03',
    number: '3',
    title: 'Activamos y mejoramos',
    desc: 'Tu agente entra en producción 24/7 y optimizamos su rendimiento continuamente.',
    tag: 'Activo 24/7',
    icon: 'M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
  },
];

export default function StepScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
      setProgress(p);
    };

    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    loop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Determinar qué paso está activo (0, 1 o 2) y el progreso interno (0 a 1) dentro de ese paso
  const activeIndex = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  const localP =
    activeIndex === 0
      ? progress / 0.33
      : activeIndex === 1
      ? (progress - 0.33) / 0.33
      : Math.min(1, (progress - 0.66) / 0.34);

  // Cálculo del tamaño del número grande y opacidad de textos
  // Al entrar (localP de 0 a 0.35): el número pasa de escala 2.4 a 1.0
  const numberScale = localP < 0.35 ? 1 + 1.4 * (1 - localP / 0.35) : 1;
  
  // Opacidad del paso
  let stepOpacity = 1;
  if (localP < 0.25) {
    stepOpacity = localP / 0.25;
  } else if (activeIndex < 2 && localP > 0.8) {
    stepOpacity = (1 - localP) / 0.2;
  }

  // Traslación vertical del texto
  const translateY = localP < 0.3 ? 30 * (1 - localP / 0.3) : activeIndex < 2 && localP > 0.85 ? -25 * ((localP - 0.85) / 0.15) : 0;

  const currentStep = STEPS[activeIndex];

  return (
    <section id="como-funciona" ref={sectionRef} className="relative h-[300vh] bg-[#000814] border-t border-white/10">
      {/* Contenedor pegajoso (Sticky) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden="true"></div>
        
        {/* Cabecera general fija */}
        <div className="absolute top-20 sm:top-24 text-center z-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00E0FF] border border-[#00E0FF]/30 bg-[#00E0FF]/10 px-4 py-1.5 rounded-full inline-block backdrop-blur-md shadow-[0_0_15px_rgba(0,224,255,0.2)] mb-3">
            Proceso Dalsat
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Listo en 3 pasos
          </h2>
        </div>

        {/* Indicadores de progreso (Barra de pestañas superior) */}
        <div className="absolute top-44 sm:top-48 flex items-center gap-2 sm:gap-4 z-20">
          {STEPS.map((s, idx) => {
            const isActive = idx === activeIndex;
            const isDone = idx < activeIndex;
            return (
              <div
                key={s.number}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#00E0FF]/20 border-[#00E0FF] text-[#00E0FF] shadow-[0_0_15px_rgba(0,224,255,0.3)] scale-105'
                    : isDone
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                <span>{isDone ? '✓' : s.number}</span>
                <span className="hidden sm:inline">{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Contenido central animado con el número gigante y el texto */}
        <div
          className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center mt-12 sm:mt-16 transition-all duration-75"
          style={{
            opacity: Math.max(0, Math.min(1, stepOpacity)),
            transform: `translateY(${translateY}px)`,
          }}
        >
          {/* El número gigante que se encoge al hacer scroll */}
          <div
            className="font-extrabold text-[7rem] sm:text-[11rem] leading-none select-none tracking-tighter bg-gradient-to-b from-[#00E0FF] via-[#7C6BD6] to-transparent bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,224,255,0.3)] transition-transform duration-75 ease-out mb-2 sm:mb-4"
            style={{
              transform: `scale(${numberScale})`,
            }}
          >
            {currentStep.number}
          </div>

          {/* Etiqueta del paso */}
          <div className="text-xs sm:text-sm font-extrabold text-[#00E0FF] tracking-widest uppercase mb-2">
            {currentStep.step}
          </div>

          {/* Título del paso */}
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 max-w-xl">
            {currentStep.title}
          </h3>

          {/* Descripción */}
          <p className="text-white/70 text-base sm:text-xl max-w-xl leading-relaxed mb-8">
            {currentStep.desc}
          </p>

          {/* Etiqueta de tiempo / hito */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#00E0FF] bg-gradient-to-r from-[#00E0FF]/15 to-purple-500/15 py-2.5 px-5 rounded-2xl border border-[#00E0FF]/30 shadow-[0_0_20px_rgba(0,224,255,0.15)] backdrop-blur-md">
            <svg className="w-4 h-4 shrink-0 text-[#00E0FF]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={currentStep.icon} />
            </svg>
            <span>{currentStep.tag}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

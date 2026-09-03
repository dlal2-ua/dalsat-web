import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, type Idioma } from '../i18n/config';
import { useState, useRef, useEffect } from 'react';

interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  sender: string;
  duration: string;
  audioUrl: string;
  transcript: string;
}

const TRACKS: AudioTrack[] = [
  {
    id: 'cita',
    title: 'Nota de Voz: Reserva de Cita',
    subtitle: 'Respuesta de voz inmediata para reservar mesa o consulta.',
    category: 'Voz WhatsApp',
    sender: 'Agente Dalsat (Restaurante)',
    duration: '0:12',
    audioUrl: '/audio/cita_es.mp3',
    transcript: '¡Hola! Qué tal. Oye, sí, justo nos queda la última mesa libre en la terraza exterior para hoy a las diez de la noche. Si quieres te la dejo reservada a tu nombre. ¿Me confirmas?',
  },
  {
    id: 'soporte',
    title: 'Atención Telefónica 24/7',
    subtitle: 'Resolución de dudas frecuentes de cliente con voz natural.',
    category: 'Agente de Voz',
    sender: 'Agente Dalsat (Ingeniería)',
    duration: '0:11',
    audioUrl: '/audio/soporte_es.mp3',
    transcript: 'Buenas tardes. Te hablo del equipo de Dalsat. He visto tu consulta sobre la automatización de WhatsApp. Si quieres, cuéntame qué negocio tienes y te enseño una demo en directo.',
  },
  {
    id: 'recordatorio',
    title: 'Recordatorio de Peluquería',
    subtitle: 'Aviso por audio para confirmar asistencia a la cita de peluquería.',
    category: 'Fidelización',
    sender: 'Agente Dalsat (Peluquería)',
    duration: '0:11',
    audioUrl: '/audio/recordatorio_peluqueria.mp3',
    transcript: 'Hola Carlos, buenas. Te contacto para recordarte que tienes cita mañana a las diez y cuarto en la peluquería para corte y peinado. Respóndeme a este audio si te va bien para confirmártelo, ¿vale?',
  },
];

interface Props {
  idioma?: Idioma;
}

export default function AudioDemos({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const t = contenido(idioma).audio;
  const PISTAS = TRACKS.map((pista) => {
    const textos = t.lista.find((x) => x.id === pista.id);
    return { ...pista, ...textos };
  });

  const [activeTrack, setActiveTrack] = useState<string>(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  // Un mp3 tarda en descargarse. Sin esto, entre el clic y el sonido no
  // pasaba nada visible y parecia que el boton no funcionaba.
  const [cargando, setCargando] = useState<boolean>(false);
  const [fallo, setFallo] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const current = PISTAS.find((p) => p.id === activeTrack) || PISTAS[0];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCargando(false);
  };

  const playAudio = (track: AudioTrack, speed: number = playbackSpeed) => {
    stopAudio();
    setFallo(false);
    setCargando(true);

    const audio = new Audio(track.audioUrl);
    audio.playbackRate = speed;
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setProgress(0);
      setCargando(false);
      setFallo(true);
    };

    audio.play().then(() => {
      setCargando(false);
      setIsPlaying(true);
    }).catch(() => {
      setCargando(false);
      setIsPlaying(false);
      setFallo(true);
    });
  };

  const togglePlay = (id: string) => {
    const target = TRACKS.find((t) => t.id === id) || TRACKS[0];
    if (activeTrack === id && isPlaying) {
      stopAudio();
    } else {
      setActiveTrack(id);
      playAudio(target, playbackSpeed);
    }

    // En pantallas móviles, desplazar suavemente la vista hasta el reproductor
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeout(() => {
        playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const changeSpeed = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section id="demos-voz" className="relative py-20 sm:py-28 bg-navy-950 border-t border-white/10 overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cian/10 via-cian-dark/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cian/10 border border-cian/30 backdrop-blur-xl shadow-[0_0_20px_rgba(20,205,236,0.2)] mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cian opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cian"></span>
            </span>
            <span className="text-xs font-extrabold tracking-widest uppercase text-cian">
              {t.etiqueta}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {t.titulo}
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light">
            {t.entradilla}
            {t.avisoIdioma && (
              <span className="mt-2 block text-sm text-white/50">{t.avisoIdioma}</span>
            )}
          </p>
        </div>

        {/* Reproductor de Audio Cibernético */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Lista de Pistas de Audio */}
          <div className="md:col-span-6 space-y-3">
            {PISTAS.map((track) => {
              const isSelected = track.id === activeTrack;
              const isThisPlaying = isSelected && isPlaying;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => togglePlay(track.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer backdrop-blur-xl ${
                    isSelected
                      ? 'bg-gradient-to-r from-white/[0.12] to-white/[0.04] border-cian shadow-[0_0_30px_rgba(20,205,236,0.25)] scale-[1.02]'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isThisPlaying
                        ? 'bg-cian text-navy-800 shadow-[0_0_20px_rgba(20,205,236,0.6)]'
                        : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}>
                      {isThisPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/10 text-cian border border-white/10">
                          {track.category}
                        </span>
                        <span className="text-[11px] font-mono text-white/50">{track.duration}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Icono de Ecualizador Animado si se está reproduciendo */}
                  {isThisPlaying && (
                    <div className="flex items-end gap-1 h-5 pr-2">
                      <span className="w-1 bg-cian rounded-full animate-[bounce_0.6s_infinite_0.1s] h-3" />
                      <span className="w-1 bg-cian rounded-full animate-[bounce_0.6s_infinite_0.3s] h-5" />
                      <span className="w-1 bg-cian rounded-full animate-[bounce_0.6s_infinite_0.2s] h-4" />
                      <span className="w-1 bg-cian rounded-full animate-[bounce_0.6s_infinite_0.4s] h-2" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tarjeta de Reproducción Visual Destacada */}
          <div ref={playerRef} className="md:col-span-6 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-cian/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cian mb-4 pb-3 border-b border-white/10">
                <span className="flex items-center gap-2 font-bold">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-cian animate-ping' : 'bg-white/40'}`} />
                  REPRODUCTOR DE VOZ IA
                </span>
                
                {/* Selector de Velocidad */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/15">
                  {[1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => changeSpeed(s)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        playbackSpeed === s
                          ? 'bg-cian text-navy-800 shadow-sm'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                {current.title}
              </h3>
              <p className="text-white/70 text-sm font-light leading-relaxed mb-4">
                {current.subtitle}
              </p>

              {/* Globo Transcripción de Voz */}
              <div className="bg-black/40 border border-white/15 rounded-2xl p-4 mb-6 shadow-inner">
                <div className="text-[10px] font-mono text-cian uppercase mb-1 flex items-center justify-between">
                  <span>TRANSCRIPCIÓN EN TIEMPO REAL</span>
                  {cargando && <span className="animate-pulse text-white/70">{t.cargando}</span>}
                  {isPlaying && <span className="animate-pulse text-cian"> Reproduciendo ({playbackSpeed}x)...</span>}
                </div>
                <p className="text-xs sm:text-sm text-white/90 italic font-medium leading-relaxed">
                  "{current.transcript}"
                  {t.etiquetaTraduccion && current.traduccion && (
                    <span className="mt-3 block not-italic text-white/55">
                      <span className="mr-1.5 font-bold text-cian/70">{t.etiquetaTraduccion}</span>
                      {current.traduccion}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Controles de Reproducción */}
            <div className="space-y-4">
              {/* Barra de Progreso */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cian to-cian-dark transition-all duration-100 shadow-[0_0_10px_#14CDEC]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => togglePlay(current.id)}
                disabled={cargando}
                className="w-full py-4 rounded-2xl bg-terracota hover:bg-terracota-dark disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-terracota disabled:hover:scale-100 text-navy font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(217,100,44,0.35)] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <>
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border-2 border-navy/25 border-t-navy animate-spin"
                      aria-hidden="true"
                    />
                    {t.cargando}
                  </>
                ) : isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                    Pausar Demo de Voz ({playbackSpeed}x)
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {t.escuchar}
                  </>
                )}
              </button>

              {fallo && (
                <p role="alert" className="flex items-start gap-2 rounded-xl border border-white/50 bg-white/[0.09] p-3.5 text-xs font-semibold leading-relaxed text-white">
                  <svg className="mt-px h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <span>
                    No se ha podido reproducir el audio. Vuelve a intentarlo, y si sigue igual
                    escríbenos y te lo mandamos por WhatsApp.
                  </span>
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

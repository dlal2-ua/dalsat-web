import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { contenido } from '../i18n';
import { IDIOMA_POR_DEFECTO, ruta, type Idioma } from '../i18n/config';

// Mascota de soporte. Se sienta en la D del hero, se cae cuando la letra se
// va, y a partir de ahí se posa en huecos libres de la página junto a la
// sección que comenta. No reimplementa el chat: al pulsarla hace clic en la
// burbuja real del widget de dev.dalsats.com.

interface Props {
  idioma?: Idioma;
}

function raizChat(): HTMLElement | null {
  return document.querySelector('[data-dalsat-chat]');
}

function burbujaNativa(): HTMLButtonElement | null {
  return raizChat()?.querySelector('button') ?? null;
}

let reintentoAbrirChat: ReturnType<typeof setInterval> | null = null;

function abrirChatReal() {
  const inmediata = burbujaNativa();
  if (inmediata) {
    inmediata.click();
    return;
  }
  if (reintentoAbrirChat) return;
  let intentos = 0;
  reintentoAbrirChat = setInterval(() => {
    intentos += 1;
    const boton = burbujaNativa();
    if (boton) boton.click();
    if (boton || intentos > 60) {
      if (reintentoAbrirChat) clearInterval(reintentoAbrirChat);
      reintentoAbrirChat = null;
    }
  }, 300);
}

const CLAVE_VISTO = 'dalsat-mascota-vista';

function yaVisto(): boolean {
  try {
    return window.sessionStorage.getItem(CLAVE_VISTO) === 'visto';
  } catch {
    return false;
  }
}

function marcarVisto() {
  try {
    window.sessionStorage.setItem(CLAVE_VISTO, 'visto');
  } catch {
    // Sin almacenamiento: volverá a saludar en la siguiente página.
  }
}

// ---------------------------------------------------------------- geometría

interface Caja {
  x: number;
  y: number;
  w: number;
  h: number;
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Viewport sin barras de scroll: innerWidth las incluye, y el robot acabaría
// posado debajo de la barra.
const anchoVp = () => document.documentElement.clientWidth;
const altoVp = () => document.documentElement.clientHeight;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function unir(a: Caja, b: Caja | null): Caja {
  if (!b) return a;
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y };
}

function cruzan(a: Caja, b: Caja) {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

function distCajas(a: Caja, b: Caja) {
  const dx = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w), 0);
  const dy = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h), 0);
  return Math.hypot(dx, dy);
}

// Sistema de coordenadas del dibujo. ASIENTO es el punto del robot que apoya
// en la letra: el trasero, justo bajo la pelvis.
const VB_W = 100;
const VB_H = 130;
const ASIENTO_X = 50;
const ASIENTO_Y = 93;
const ASPECTO = VB_W / VB_H;

type Lado = 'arriba-izq' | 'arriba-der' | 'izq' | 'der' | 'abajo-izq' | 'abajo-der';
const LADOS: Lado[] = ['arriba-izq', 'arriba-der', 'izq', 'der', 'abajo-izq', 'abajo-der'];
const SEP = 10;

function cajaBurbuja(r: Caja, bw: number, bh: number, lado: Lado): Caja {
  switch (lado) {
    case 'arriba-izq':
      return { x: r.x + r.w - bw, y: r.y - SEP - bh, w: bw, h: bh };
    case 'arriba-der':
      return { x: r.x, y: r.y - SEP - bh, w: bw, h: bh };
    case 'abajo-izq':
      return { x: r.x + r.w - bw, y: r.y + r.h + SEP, w: bw, h: bh };
    case 'abajo-der':
      return { x: r.x, y: r.y + r.h + SEP, w: bw, h: bh };
    case 'izq':
      return { x: r.x - SEP - bw, y: r.y, w: bw, h: bh };
    case 'der':
      return { x: r.x + r.w + SEP, y: r.y, w: bw, h: bh };
  }
}

// -------------------------------------------------------------- obstáculos

type ElementoVis = Element & { checkVisibility?: (o?: Record<string, boolean>) => boolean };

function alfa(color: string): number {
  if (!color || color === 'transparent') return 0;
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const partes = m[1].split(/[\s,/]+/).filter(Boolean);
  return partes.length >= 4 ? parseFloat(partes[3]) : 1;
}

function esVisible(el: Element): boolean {
  // Lo que aún no ha hecho su animación de entrada va a aparecer enseguida.
  if (el.closest('[data-reveal]:not(.se-ve)')) return true;
  const e = el as ElementoVis;
  if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
  // checkVisibility solo descarta opacity 0 exacta; las letras del hero se
  // desvanecen por grados y a medio fundido ya no se leen.
  let a: Element | null = el;
  for (let i = 0; i < 3 && a; i++, a = a.parentElement) {
    if (parseFloat(getComputedStyle(a).opacity) < 0.2) return false;
  }
  return true;
}

function enVista(r: { left: number; top: number; right: number; bottom: number; width: number; height: number }) {
  return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < altoVp() && r.left < anchoVp();
}

const aCaja = (r: DOMRect): Caja => ({ x: r.left, y: r.top, w: r.width, h: r.height });

function recogerFijos(excluir: Element[]): Caja[] {
  const areaVp = anchoVp() * altoVp();
  const out: Caja[] = [];
  for (const el of Array.from(document.querySelectorAll('header, [class*="fixed"]'))) {
    if (excluir.some((x) => x.contains(el))) continue;
    const r = el.getBoundingClientRect();
    if (!enVista(r) || r.width * r.height > areaVp * 0.5) continue;
    if (!esVisible(el)) continue;
    out.push(aCaja(r));
  }
  return out;
}

function recogerObstaculos(excluir: Element[]): { todos: Caja[]; fijos: Caja[] } {
  const areaVp = anchoVp() * altoVp();
  const todos: Caja[] = [];
  const fuera = (el: Element) => excluir.some((x) => x.contains(el));

  // Texto línea a línea (Range) y no el bloque entero: un <p> en una columna
  // ancha taparía todo su ancho aunque la línea sea corta, y no quedaría
  // hueco en ningún sitio.
  const cache = new Map<Element, boolean>();
  const rango = document.createRange();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.nodeValue || !n.nodeValue.trim()) continue;
    const p = n.parentElement;
    if (!p) continue;
    let ok = cache.get(p);
    if (ok === undefined) {
      ok = !p.closest('script,style,noscript,template') && enVista(p.getBoundingClientRect()) && !fuera(p) && esVisible(p);
      cache.set(p, ok);
    }
    if (!ok) continue;
    rango.selectNodeContents(n);
    const rects = rango.getClientRects();
    for (let i = 0; i < rects.length; i++) if (enVista(rects[i])) todos.push(aCaja(rects[i]));
  }

  const SEL = 'img,svg,video,canvas,iframe,input,textarea,select,button,a,[role="button"],[data-mascot-obstacle]';
  for (const el of Array.from(document.querySelectorAll(SEL))) {
    if (fuera(el)) continue;
    const r = el.getBoundingClientRect();
    if (!enVista(r) || r.width * r.height > areaVp * 0.5) continue;
    if (!esVisible(el)) continue;
    todos.push(aCaja(r));
  }

  // Tarjetas, chips y paneles: lo que tiene fondo, borde o sombra propios.
  // Los adornos (retículas, manchas de luz, estrellas) llevan
  // pointer-events:none y no cuentan.
  for (const el of Array.from(document.querySelectorAll('[class*="rounded"],[class*="border"],[class*="bg-"],[class*="shadow"]'))) {
    if (fuera(el)) continue;
    const r = el.getBoundingClientRect();
    // De borde a borde es una banda de sección, no una tarjeta: su fondo es
    // el de la página.
    if (!enVista(r) || r.width * r.height > areaVp * 0.45 || r.width >= anchoVp() - 4) continue;
    if (el.getAttribute('aria-hidden') === 'true') continue;
    const cs = getComputedStyle(el);
    if (cs.pointerEvents === 'none') continue;
    const fondo = cs.backgroundImage !== 'none' || alfa(cs.backgroundColor) > 0.02;
    const borde =
      (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderLeftWidth) || 0) > 0 && alfa(cs.borderTopColor) > 0.02;
    if (!fondo && !borde && cs.boxShadow === 'none') continue;
    if (!esVisible(el)) continue;
    todos.push(aCaja(r));
  }

  const fijos = recogerFijos(excluir);
  todos.push(...fijos);
  return { todos, fijos };
}

// Rejilla de ocupación con tabla de áreas acumuladas: cualquier caja se
// comprueba en O(1), así se pueden probar miles de posiciones por plan.
const CELDA = 8;
const HOLGURA = 6;

class Rejilla {
  cols: number;
  filas: number;
  sat: Int32Array;

  constructor(vw: number, vh: number, obst: Caja[]) {
    this.cols = Math.ceil(vw / CELDA);
    this.filas = Math.ceil(vh / CELDA);
    const occ = new Uint8Array(this.cols * this.filas);
    for (const o of obst) {
      const x0 = clamp(Math.floor((o.x - HOLGURA) / CELDA), 0, this.cols - 1);
      const x1 = clamp(Math.ceil((o.x + o.w + HOLGURA) / CELDA) - 1, 0, this.cols - 1);
      const y0 = clamp(Math.floor((o.y - HOLGURA) / CELDA), 0, this.filas - 1);
      const y1 = clamp(Math.ceil((o.y + o.h + HOLGURA) / CELDA) - 1, 0, this.filas - 1);
      for (let fy = y0; fy <= y1; fy++) occ.fill(1, fy * this.cols + x0, fy * this.cols + x1 + 1);
    }
    const w = this.cols + 1;
    this.sat = new Int32Array(w * (this.filas + 1));
    for (let fy = 0; fy < this.filas; fy++) {
      let fila = 0;
      for (let fx = 0; fx < this.cols; fx++) {
        fila += occ[fy * this.cols + fx];
        this.sat[(fy + 1) * w + fx + 1] = this.sat[fy * w + fx + 1] + fila;
      }
    }
  }

  ocupado(c: Caja): number {
    const w = this.cols + 1;
    const x0 = clamp(Math.floor(c.x / CELDA), 0, this.cols);
    const y0 = clamp(Math.floor(c.y / CELDA), 0, this.filas);
    const x1 = clamp(Math.ceil((c.x + c.w) / CELDA), 0, this.cols);
    const y1 = clamp(Math.ceil((c.y + c.h) / CELDA), 0, this.filas);
    return this.sat[y1 * w + x1] - this.sat[y0 * w + x1] - this.sat[y1 * w + x0] + this.sat[y0 * w + x0];
  }
}

type Motivo = 'seccion' | 'bienvenida' | 'deriva' | 'obstaculo' | 'hero';

const PESOS: Record<Motivo, { ancla: number; cont: number; dir: number; lado: number }> = {
  seccion: { ancla: 4, cont: 0.6, dir: 0.3, lado: 0.2 },
  bienvenida: { ancla: 3, cont: 0.1, dir: 0, lado: 0 },
  deriva: { ancla: 0.8, cont: 1.4, dir: 1.2, lado: 0.4 },
  obstaculo: { ancla: 0.4, cont: 3, dir: 0.3, lado: 0.3 },
  hero: { ancla: 0, cont: 2, dir: 0, lado: 0 },
};

interface Plan {
  robot: Caja;
  lado: Lado | null;
}

function planificar(o: {
  rejilla: Rejilla;
  techo: number;
  rw: number;
  rh: number;
  bw: number;
  bh: number;
  actual: { x: number; y: number };
  ancla: Caja | null;
  dir: number;
  motivo: Motivo;
}): Plan | null {
  const vw = anchoVp();
  const vh = altoVp();
  const p = PESOS[o.motivo];
  const minX = 6;
  const maxX = vw - 6;
  const minY = o.techo + 6;
  const maxY = vh - 6;
  const ladoActualIzq = o.actual.x < vw / 2;
  let mejor: Plan | null = null;
  let mejorCoste = Infinity;

  for (let y = minY; y + o.rh <= maxY; y += 10) {
    for (let x = minX; x + o.rw <= maxX; x += 10) {
      const r = { x, y, w: o.rw, h: o.rh };
      if (o.rejilla.ocupado(r)) continue;
      const cx = x + o.rw / 2;
      const cy = y + o.rh / 2;
      let coste = (p.cont * Math.hypot(cx - o.actual.x, cy - o.actual.y)) / vh;
      if (o.ancla) coste += (p.ancla * distCajas(r, o.ancla)) / vh;
      // Con doc-anclaje el robot se va con la página: si se baja, conviene
      // posarlo en la parte de abajo para que dure más antes de salirse.
      if (o.dir > 0) coste += p.dir * (1 - cy / vh);
      else if (o.dir < 0) coste += p.dir * (cy / vh);
      if (cx < vw / 2 !== ladoActualIzq) coste += p.lado;
      if (coste >= mejorCoste) continue;
      if (!o.bw) {
        mejor = { robot: r, lado: null };
        mejorCoste = coste;
        continue;
      }
      for (const lado of LADOS) {
        const b = cajaBurbuja(r, o.bw, o.bh, lado);
        if (b.x < minX || b.y < minY || b.x + b.w > maxX || b.y + b.h > maxY) continue;
        if (o.rejilla.ocupado(b)) continue;
        const c = coste + (lado.startsWith('abajo') ? 0.05 : 0);
        if (c < mejorCoste) {
          mejorCoste = c;
          mejor = { robot: r, lado };
        }
      }
    }
  }
  return mejor;
}

// ----------------------------------------------------------------- la letra

// Medidas de la tinta de la D dentro de su caja, sin transformar. La caja del
// span no es la letra: con leading-none su borde de arriba queda muy por
// encima del trazo, y el tracking deja espacio a la derecha.
interface Glifo {
  tintaIzq: number;
  tintaDer: number;
  techoCap: number;
  altoCap: number;
}

function medirGlifo(d: HTMLElement): Glifo | null {
  const cs = getComputedStyle(d);
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return null;
  const tamFuente = parseFloat(cs.fontSize);
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = ctx.measureText(d.textContent || 'D');
  const alturaLinea = cs.lineHeight === 'normal' ? tamFuente * 1.2 : parseFloat(cs.lineHeight);
  const asc = m.fontBoundingBoxAscent || tamFuente * 0.9;
  const desc = m.fontBoundingBoxDescent || tamFuente * 0.25;
  const base = (alturaLinea - (asc + desc)) / 2 + asc;
  const cap = m.actualBoundingBoxAscent || tamFuente * 0.7;
  return { tintaIzq: -m.actualBoundingBoxLeft, tintaDer: m.actualBoundingBoxRight, techoCap: base - cap, altoCap: cap };
}

// Punto de asiento sobre el trazo superior de la D, en pantalla. Se calcula a
// mano en vez de con getBoundingClientRect de la D porque esta va inclinada
// (su caja envolvente ya no es la letra) y su padre escala durante el split.
function asientoEnPantalla(d: HTMLElement, dal: HTMLElement, g: Glifo, inclinacion: number) {
  const rDal = dal.getBoundingClientRect();
  const escala = dal.offsetWidth ? rDal.width / dal.offsetWidth : 1;
  // El padre lleva will-change:transform, que en Chrome lo convierte en el
  // offsetParent de la D; en otros motores lo es un ancestro común.
  const propio = d.offsetParent === dal;
  const lx = propio ? d.offsetLeft : d.offsetLeft - dal.offsetLeft;
  const ly = propio ? d.offsetTop : d.offsetTop - dal.offsetTop;
  const sx = g.tintaIzq + (g.tintaDer - g.tintaIzq) * 0.46;
  const sy = g.techoCap;
  const px = d.offsetWidth / 2;
  const py = d.offsetHeight;
  const a = (inclinacion * Math.PI) / 180;
  const rx = px + (sx - px) * Math.cos(a) - (sy - py) * Math.sin(a);
  const ry = py + (sx - px) * Math.sin(a) + (sy - py) * Math.cos(a);
  return { x: rDal.left + (lx + rx) * escala, y: rDal.top + (ly + ry) * escala };
}

function progresoHero(hero: HTMLElement): number {
  const rect = hero.getBoundingClientRect();
  const total = hero.offsetHeight - altoVp();
  return total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
}

function anclaDe(el: Element | null): Caja | null {
  const h = el?.querySelector('h1, h2, h3');
  if (!h) return null;
  const r = document.createRange();
  r.selectNodeContents(h);
  let caja: Caja | null = null;
  const rects = r.getClientRects();
  for (let i = 0; i < rects.length; i++) caja = unir(aCaja(rects[i]), caja);
  if (!caja || caja.y + caja.h < 0 || caja.y > altoVp()) return null;
  return caja;
}

// ---------------------------------------------------------------- dibujo

// Piezas del cuerpo, cada una dibujada desde su articulación hacia abajo:
// el bucle las gira con transform en la articulación.
const BRAZO =
  'M-4.6,-1 C-4.6,-4 4.6,-4 4.6,-1 L4.2,17 C7.2,18 8.2,22.5 6.2,25.6 C4.2,28.6 -4.2,28.6 -6.2,25.6 C-8.2,22.5 -7.2,18 -4.2,17 Z';
const MUSLO = 'M-5.5,0 C-5.5,-3.2 5.5,-3.2 5.5,0 L5,14 C5,17.2 -5,17.2 -5,14 Z';
const ESPINILLA =
  'M-4.6,0 L-4.4,13 C-6.8,14 -7.4,18.6 -5.6,20.2 C-3,21.8 3,21.8 5.6,20.2 C7.4,18.6 6.8,14 4.4,13 L4.6,0 C4.6,-2.6 -4.6,-2.6 -4.6,0 Z';
const LARGO_MUSLO = 14;
const CADERA_I = { x: 41, y: 88 };
const CADERA_D = { x: 59, y: 88 };
const HOMBRO_I = { x: 31, y: 66 };
const HOMBRO_D = { x: 69, y: 66 };

const TRAZO = { stroke: '#03131F', strokeOpacity: 0.85, strokeWidth: 1.6, strokeLinejoin: 'round' as const };
const LLAMA = 'M-4.5,0 C-4.5,8 -1.6,14 0,23 C1.6,14 4.5,8 4.5,0 Z';
const LLAMA_NUCLEO = 'M-1.8,0 C-1.8,4 -0.6,8 0,12 C0.6,8 1.8,4 1.8,0 Z';

// De perfil el dibujo mira a la derecha; hacia la izquierda se refleja.
// Cadera y hombro del lado que queda más cerca de quien mira y del lejano.
const P_CADERA_CERCA = { x: 47, y: 88 };
const P_CADERA_LEJOS = { x: 52, y: 88 };
const P_HOMBRO_CERCA = { x: 47, y: 67 };
const P_HOMBRO_LEJOS = { x: 52, y: 66 };

// Vistas del robot: de frente parado o subiendo, de perfil cuando cruza la
// pantalla y de espaldas, boca abajo, cuando baja en picado. El cambio es un
// giro 2D: la vista se estrecha hasta casi desaparecer, se cambia el dibujo
// y se vuelve a ensanchar.
type Vista = 'frente' | 'perfil' | 'espalda';
const GIRO_MS = 200;

type Modo = 'espera' | 'aterrizando' | 'sentado' | 'cayendo' | 'volando' | 'flotando' | 'posado' | 'guardado' | 'anclado';

// Muelle del vuelo, por milisegundo. Amortiguado casi crítico: arranca y
// frena suave, y si el destino cambia a medio camino conserva la velocidad
// en vez de volver a empezar desde parado.
const MUELLE = 0.0068;
const MUELLE_LENTO = 0.0045;
const VEL_MAX = 1.5;
type Sistema = 'pantalla' | 'documento';

interface Cta {
  label: string;
  href: string;
}

interface Mensaje {
  id: number;
  texto: string;
  cta: Cta | null;
}

interface MensajeMedido extends Mensaje {
  alto: number;
}

interface BurbujaVisible extends MensajeMedido {
  lado: Lado;
}

export default function DalsatMascot({ idioma = IDIOMA_POR_DEFECTO }: Props) {
  const tc = contenido(idioma);

  const [tam, setTam] = useState({ w: 64, h: 83 });
  const [anchoBurbuja, setAnchoBurbuja] = useState(264);
  const [pendiente, setPendiente] = useState<Mensaje | null>(null);
  const [burbuja, setBurbuja] = useState<BurbujaVisible | null>(null);
  const [visible, setVisible] = useState(false);

  const raizRef = useRef<HTMLDivElement>(null);
  const cuerpoRef = useRef<HTMLDivElement>(null);
  const medidorRef = useRef<HTMLDivElement>(null);
  const musloIRef = useRef<SVGGElement>(null);
  const musloDRef = useRef<SVGGElement>(null);
  const espinillaIRef = useRef<SVGGElement>(null);
  const espinillaDRef = useRef<SVGGElement>(null);
  const rodillaIRef = useRef<SVGCircleElement>(null);
  const rodillaDRef = useRef<SVGCircleElement>(null);
  const brazoIRef = useRef<SVGGElement>(null);
  const brazoDRef = useRef<SVGGElement>(null);
  const cabezaRef = useRef<SVGGElement>(null);
  const antenaRef = useRef<SVGGElement>(null);
  const ojosRef = useRef<SVGGElement>(null);
  const llamaRef = useRef<SVGGElement>(null);
  const giroRef = useRef<SVGGElement>(null);
  const vistaFrenteRef = useRef<SVGGElement>(null);
  // Piezas de las vistas de perfil y de espaldas, por nombre.
  const partes = useRef<Record<string, SVGElement | undefined>>({});
  const parte = (nombre: string) => (el: SVGElement | null) => {
    if (el) partes.current[nombre] = el;
  };

  const medidoRef = useRef<MensajeMedido | null>(null);
  const cerradaRef = useRef(false);
  const chatRef = useRef(false);
  const bienvenidaIdRef = useRef(-1);

  useEffect(() => {
    if (!pendiente || !medidorRef.current) return;
    medidoRef.current = { ...pendiente, alto: medidorRef.current.offsetHeight };
  }, [pendiente, anchoBurbuja]);

  useEffect(() => {
    let observador: MutationObserver | null = null;
    const enganchar = () => {
      const raiz = raizChat();
      if (!raiz) return false;
      const sync = () => {
        chatRef.current = raiz.classList.contains('open');
      };
      sync();
      observador = new MutationObserver(sync);
      observador.observe(raiz, { attributes: true, attributeFilter: ['class'] });
      return true;
    };
    if (enganchar()) return () => observador?.disconnect();
    const id = setInterval(() => {
      if (enganchar()) clearInterval(id);
    }, 500);
    return () => {
      clearInterval(id);
      observador?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!raizRef.current || !cuerpoRef.current) return;
    const raiz: HTMLDivElement = raizRef.current;
    const cuerpo: HTMLDivElement = cuerpoRef.current;

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.getElementById('hero');
    const letraD = document.querySelector<HTMLElement>('[data-mascot-anchor="hero-d"]');
    const dal = letraD?.parentElement ?? null;
    // Ruta: las secciones marcadas y, en cualquier página, las secciones de
    // primer nivel del <main> con titular. Así tiene recorrido en todas sin
    // tener que marcar cada una.
    const perchas = Array.from(
      document.querySelectorAll<HTMLElement>('[data-mascot-perch], main section'),
    ).filter(
      (s, _i, todas) =>
        s.id !== 'hero' &&
        (!!s.dataset.mascotPerch || !!tc.mascota.secciones[s.id] || !!s.querySelector('h1, h2, h3')) &&
        !todas.some((o) => o !== s && o.contains(s)),
    );
    const excluir = () => [raiz, medidorRef.current, raizChat()].filter(Boolean) as Element[];

    let glifo: Glifo | null = null;
    let dLiberada = false;
    let modo: Modo = 'espera';
    let sistema: Sistema = 'pantalla';
    let x = -9999;
    let y = -9999;
    let rw = 64;
    let rh = 83;
    let bw = 264;
    let posicionPintada = '';

    let vuelo: {
      tx: number;
      ty: number;
      // Destino que se mueve (el asiento de la D mientras el hero se abre).
      objetivo?: () => { x: number; y: number } | null;
      lento?: boolean;
      fin: (ahora: number) => void;
    } | null = null;

    // Velocidad del robot en px/ms, en el sistema de coordenadas actual.
    let vxv = 0;
    let vyv = 0;
    let vScroll = 0;
    // Velocidad de scroll suavizada: la rueda va a golpes y la vista no debe
    // darse la vuelta entre golpe y golpe.
    let vScrollSuave = 0;
    let porScroll = false;
    let velX = 0;
    let vy = 0;
    let vx = 0;
    let caidaDesde = -1e9;
    let tumbo = 0;
    let banco = 0;
    let descendiendo = false;
    let aplastadoDesde = -1e9;
    let fuerzaAplastado = 0.16;
    let dTilt = 0;
    let dTiltVel = 0;
    let mezclaSentado = 0;
    let brazoI = 12;
    let brazoD = -12;
    let cabeza = 0;
    let antena = 0;
    let antenaVel = 0;
    let empuje = 0;
    let proximoParpadeo = performance.now() + 2500;
    let parpadeoDesde = -1e9;
    let anclando = false;
    let escondido = false;
    let revisarYa = false;

    // Vista asentada, giro en curso y la vista que se pinta este frame.
    // `orient` es el sentido del perfil: 1 mira a la derecha, -1 a la izquierda.
    let vista: Vista = 'frente';
    let orient = -1;
    let giro: { de: Vista; deOri: number; a: Vista; aOri: number; desde: number } | null = null;
    let candidata: Vista = 'frente';
    let candOri = -1;
    let candDesde = 0;
    let vis: Vista = 'frente';
    let visOri = -1;
    let escGiroX = 1;
    let escGiroY = 1;
    let vistaPintada: Vista | null = null;
    const P = partes.current;

    function mostrarRobot() {
      if (!escondido) return;
      escondido = false;
      setVisible(true);
    }

    let mensajeActual: MensajeMedido | null = null;
    let burbujaActual: BurbujaVisible | null = null;
    let burbujaDesde = 0;
    let ocultarEn = Infinity;
    let esperando: { id: number; tipo: 'bienvenida-sentado' | 'bienvenida' | 'seccion'; percha?: HTMLElement } | null = null;
    let idMsg = 0;

    let perchaActiva: HTMLElement | null = null;
    let obstFijos: Caja[] = [];
    let ultimoPlan = -1e9;
    let ultimaRevision = 0;
    let ultimosFijos = 0;
    let ultimoScroll = window.scrollY;
    let ultimoMovScroll = -1e9;
    let dirScroll = 1;
    let redimensionado = false;
    let ultimoFrame = performance.now();
    let rafId = 0;

    const techo = () => Math.max(0, document.querySelector('header')?.getBoundingClientRect().bottom ?? 0);
    const calcBw = () => Math.min(264, anchoVp() - 24);
    const tamSentado = () => clamp((glifo?.altoCap ?? 90) * 0.95, 48, 100);
    const tamVuelo = () => clamp(anchoVp() * 0.052, 50, 82);
    const TAM_GUARDADO = 54;

    function fijarTam(h: number) {
      const nh = Math.round(h);
      if (nh === rh) return;
      rh = nh;
      rw = Math.round(nh * ASPECTO);
      setTam({ w: rw, h: rh });
    }

    function cajaRobotPantalla(): Caja {
      const ox = sistema === 'documento' ? window.scrollX : 0;
      const oy = sistema === 'documento' ? window.scrollY : 0;
      return { x: x - ox, y: y - oy, w: rw, h: rh };
    }

    function cajaTotalPantalla(): Caja {
      const r = cajaRobotPantalla();
      return burbujaActual ? unir(r, cajaBurbuja(r, bw, burbujaActual.alto, burbujaActual.lado)) : r;
    }

    function pedir(texto: string, cta: Cta | null, tipo: 'bienvenida-sentado' | 'bienvenida' | 'seccion', percha?: HTMLElement) {
      idMsg += 1;
      esperando = { id: idMsg, tipo, percha };
      if (tipo !== 'seccion') bienvenidaIdRef.current = idMsg;
      setPendiente({ id: idMsg, texto, cta });
    }

    function mostrarBurbuja(m: MensajeMedido, lado: Lado, ahora: number, dura: number) {
      burbujaActual = { ...m, lado };
      burbujaDesde = ahora;
      if (mensajeActual?.id !== m.id) ocultarEn = ahora + dura;
      mensajeActual = m;
      setBurbuja(burbujaActual);
    }

    function esconderBurbuja(olvidar: boolean) {
      if (burbujaActual) {
        burbujaActual = null;
        setBurbuja(null);
      }
      if (olvidar) mensajeActual = null;
    }

    // Cambia de sistema conservando posición y velocidad en pantalla: sin
    // esto, al pasar de ir con la página a ir fijo (o al revés) mientras se
    // scrollea, el robot pegaría un tirón.
    function pasarA(nuevo: Sistema) {
      if (nuevo === sistema) return;
      const signo = nuevo === 'documento' ? 1 : -1;
      x += signo * window.scrollX;
      y += signo * window.scrollY;
      vyv += signo * vScroll;
      sistema = nuevo;
    }

    function volarA(
      nx: number,
      ny: number,
      destino: Sistema,
      fin: (ahora: number) => void,
      ahora: number,
      extra: Partial<NonNullable<typeof vuelo>> = {},
    ) {
      pasarA(destino);
      esconderBurbuja(false);
      if (reducido) {
        const o = extra.objetivo?.() ?? { x: nx, y: ny };
        x = o.x;
        y = o.y;
        vxv = 0;
        vyv = 0;
        vuelo = null;
        fin(ahora);
        return;
      }
      if (!extra.objetivo) modo = 'volando';
      vuelo = { tx: nx, ty: ny, fin, ...extra };
    }

    function aplastar(ahora: number, fuerza = 0.16) {
      aplastadoDesde = ahora;
      fuerzaAplastado = fuerza;
    }

    function buscarHueco(motivo: Motivo, alto: number, ancla: Caja | null): Plan | null {
      const { todos, fijos } = recogerObstaculos(excluir());
      obstFijos = fijos;
      const rejilla = new Rejilla(anchoVp(), altoVp(), todos);
      const r = cajaRobotPantalla();
      const actual = x < -9000 ? { x: anchoVp() / 2, y: altoVp() / 3 } : { x: r.x + r.w / 2, y: r.y + r.h / 2 };
      return planificar({ rejilla, techo: techo(), rw, rh, bw: alto ? bw : 0, bh: alto, actual, ancla, dir: dirScroll, motivo });
    }

    // Mueve el robot al mejor hueco libre. Si con bocadillo no cabe en
    // ningún sitio, prueba sin él; si ni así, se guarda en una esquina.
    function irAHueco(motivo: Motivo, ancla: Caja | null, msg: MensajeMedido | null, ahora: number, dura = 9000) {
      ultimoPlan = ahora;
      fijarTam(tamVuelo());
      let plan = msg ? buscarHueco(motivo, msg.alto, ancla) : null;
      const conMsg = !!plan;
      if (!plan) plan = buscarHueco(motivo, 0, ancla);
      if (!plan) {
        guardar(ahora);
        return;
      }
      mostrarRobot();
      const lado = plan.lado;
      const m = conMsg ? msg : null;
      const scrollAlPlanear = window.scrollY;
      // Vuela respecto a la pantalla: con scroll continuo, un destino fijado
      // en la página se escapa antes de llegar y el robot se queda atrás. Se
      // ancla a la página cuando el scroll se para (ver el bucle), momento en
      // que las dos velocidades coinciden y no hay tirón.
      volarA(
        plan.robot.x,
        plan.robot.y,
        'pantalla',
        (t) => {
          modo = 'posado';
          aplastar(t, 0.06);
          if (Math.abs(window.scrollY - scrollAlPlanear) > 4) revisarYa = true;
          if (m && lado) mostrarBurbuja(m, lado, t, dura);
        },
        ahora,
      );
    }

    // Sin hueco para el robot normal: prueba más pequeño, primero en las
    // esquinas y luego en cualquier sitio. Si ni así cabe sin tapar nada, se
    // esconde hasta que lo haya (lo reintenta el bucle cada poco).
    function guardar(ahora: number) {
      ultimoPlan = ahora;
      fijarTam(Math.min(TAM_GUARDADO, tamVuelo() * 0.85));
      esconderBurbuja(true);
      const vw = anchoVp();
      const vh = altoVp();
      const { todos } = recogerObstaculos(excluir());
      const rejilla = new Rejilla(vw, vh, todos);
      const m = 14;
      const t = techo();
      const esquinas = [
        { x: vw - rw - m, y: vh - rh - m },
        { x: m, y: vh - rh - m },
        { x: vw - rw - m, y: t + m },
        { x: m, y: t + m },
      ];
      let libre: { x: number; y: number } | null = esquinas.find((e) => !rejilla.ocupado({ ...e, w: rw, h: rh })) ?? null;
      if (!libre) {
        const r = cajaRobotPantalla();
        const plan = planificar({
          rejilla,
          techo: t,
          rw,
          rh,
          bw: 0,
          bh: 0,
          actual: { x: r.x + r.w / 2, y: r.y + r.h / 2 },
          ancla: null,
          dir: dirScroll,
          motivo: 'obstaculo',
        });
        libre = plan ? { x: plan.robot.x, y: plan.robot.y } : null;
      }
      if (!libre) {
        escondido = true;
        setVisible(false);
        pasarA('pantalla');
        vuelo = null;
        modo = 'guardado';
        return;
      }
      const destino = libre;
      mostrarRobot();
      volarA(destino.x, destino.y, 'pantalla', () => {
        modo = 'guardado';
      }, ahora);
    }

    // Donde pinta el widget su burbuja (right:20 bottom:20, 56px): pulsar
    // ahí con el chat abierto lo cierra, como haría la burbuja original.
    function posicionNativa() {
      return { x: anchoVp() - 48 - rw / 2, y: altoVp() - 48 - rh / 2 };
    }

    function anclar(ahora: number) {
      anclando = true;
      mostrarRobot();
      fijarTam(TAM_GUARDADO);
      esconderBurbuja(true);
      const p = posicionNativa();
      volarA(p.x, p.y, 'pantalla', () => {
        modo = 'anclado';
      }, ahora);
    }

    // Lado del bocadillo con el robot quieto (sentado en la D): el que no
    // tape nada; si ninguno está libre, el que menos, pero siempre dentro.
    function ladoFijo(r: Caja, alto: number): Lado | null {
      const { todos } = recogerObstaculos(excluir());
      const rejilla = new Rejilla(anchoVp(), altoVp(), todos);
      const t = techo();
      let mejor: Lado | null = null;
      let menos = Infinity;
      for (const lado of LADOS) {
        const b = cajaBurbuja(r, bw, alto, lado);
        if (b.x < 6 || b.y < t + 6 || b.x + b.w > anchoVp() - 6 || b.y + b.h > altoVp() - 6) continue;
        const o = rejilla.ocupado(b);
        if (o < menos) {
          menos = o;
          mejor = lado;
        }
      }
      return mejor;
    }

    function liberarD() {
      if (!letraD || dLiberada) return;
      // La animación de entrada (fill forwards) es dueña del transform
      // mientras exista; al quitarla, la regla base de .hero-letter es
      // opacity:0, así que el estado final se fija a mano antes.
      letraD.style.opacity = '1';
      letraD.style.filter = 'none';
      letraD.style.animation = 'none';
      letraD.style.transformOrigin = 'bottom center';
      dLiberada = true;
    }

    function asiento() {
      return letraD && dal && glifo ? asientoEnPantalla(letraD, dal, glifo, dTilt) : null;
    }

    function perchaEnVista(): HTMLElement | null {
      const vh = altoVp();
      let elegida: HTMLElement | null = null;
      for (const p of perchas) {
        const r = p.getBoundingClientRect();
        if (r.top <= vh * 0.5 && r.bottom >= vh * 0.35) elegida = p;
      }
      return elegida;
    }

    const ctaDe = (clave: string): Cta | null =>
      tc.mascota.conCta.includes(clave) ? { label: tc.mascota.cta, href: ruta('/contacto', idioma) } : null;

    function mensajeDe(p: HTMLElement): { texto: string; cta: Cta | null } | null {
      const id = p.dataset.mascotPerch || p.id;
      const texto = tc.mascota.secciones[id];
      return texto ? { texto, cta: ctaDe(id) } : null;
    }

    function mensajePagina(): { texto: string; cta: Cta | null } | null {
      const rutaActual = window.location.pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/+$/, '') || '/';
      const texto = tc.mascota.paginas[rutaActual];
      return texto ? { texto, cta: ctaDe(rutaActual) } : null;
    }

    const heroFijado = () => !!hero && hero.offsetHeight > altoVp() * 1.2;

    function caer(ahora: number) {
      modo = 'cayendo';
      caidaDesde = ahora;
      vuelo = null;
      descendiendo = false;
      esconderBurbuja(true);
      pasarA('pantalla');
      vx = -0.08;
      vy = -0.22;
      if (reducido) caidaDesde = ahora - 10000;
    }

    // Tras la caída enciende el propulsor: la velocidad de caída pasa tal cual
    // al muelle, así que traza una curva en vez de pararse en seco y salir.
    function trasCaida(ahora: number) {
      fijarTam(tamVuelo());
      vxv = vx;
      vyv = vy;
      if (heroFijado() && hero && hero.getBoundingClientRect().bottom > altoVp() + 2) {
        const plan = buscarHueco('hero', 0, null);
        if (plan) {
          volarA(plan.robot.x, plan.robot.y, 'pantalla', (t) => {
            modo = 'flotando';
            aplastar(t, 0.06);
          }, ahora);
          return;
        }
      }
      irAHueco('deriva', null, null, ahora);
    }

    function destinoAsiento(sobre: number) {
      const s = asiento();
      if (!s) return null;
      return { x: s.x - (ASIENTO_X / VB_W) * rw, y: s.y - (ASIENTO_Y / VB_H) * rh - sobre };
    }

    // Llega volando, se queda un instante suspendido sobre la D, baja
    // doblando las piernas y al tocarla se sienta, la D cede y saluda.
    function aterrizarEnD(ahora: number) {
      esconderBurbuja(true);
      mostrarRobot();
      fijarTam(tamSentado());
      modo = 'aterrizando';
      descendiendo = false;
      perchaActiva = null;
      volarA(0, 0, 'pantalla', () => {
        descendiendo = true;
        vuelo = {
          tx: 0,
          ty: 0,
          objetivo: () => destinoAsiento(0),
          lento: true,
          fin: sentarse,
        };
      }, ahora, { objetivo: () => destinoAsiento(Math.max(28, rh * 0.45)) });
    }

    function sentarse(ahora: number) {
      descendiendo = false;
      modo = 'sentado';
      if (letraD) {
        for (const a of letraD.getAnimations()) a.finish();
        liberarD();
      }
      aplastar(ahora, 0.18);
      dTiltVel = -0.45;
      // Se presenta siempre: es lo primero que ve quien entra y tiene que
      // saber que es un asistente al que se puede pulsar.
      pedir(tc.comun.avisoChat, null, 'bienvenida-sentado');
    }

    // Vuelve a la D si se sube hasta que la letra está otra vez entera (con
    // margen respecto al punto de caída para que no oscile en el límite).
    function puedeVolverAD(): boolean {
      if (!hero || !glifo) return false;
      if (heroFijado() && progresoHero(hero) > 0.2) return false;
      const s = asiento();
      return !!s && s.y > techo() + tamSentado() * 0.75 + 40 && s.y < altoVp() - 20;
    }

    function arrancar() {
      bw = calcBw();
      setAnchoBurbuja(bw);
      if (letraD) glifo = medirGlifo(letraD);
      const s = asiento();
      const sentable =
        !!s && !!hero && progresoHero(hero) < 0.1 && s.y > techo() + 40 && s.y < altoVp() - 20;
      const ahora = performance.now();
      if (sentable && s) {
        fijarTam(tamSentado());
        sistema = 'pantalla';
        // Entra volando desde fuera de la pantalla, por arriba a la derecha.
        x = anchoVp() + 30;
        y = Math.max(techo() + 10, s.y - rh * 2.2);
        vxv = -1.2;
        vyv = 0.1;
        mezclaSentado = 0;
        // Llega de lado, mirando hacia donde va; se pone de frente al frenar.
        if (!reducido) {
          vista = candidata = 'perfil';
          orient = candOri = -1;
        }
        aterrizarEnD(ahora);
      } else {
        liberarD();
        fijarTam(tamVuelo());
        sistema = 'documento';
        x = window.scrollX + anchoVp() + 20;
        y = window.scrollY + altoVp() * 0.3;
        modo = 'posado';
        // Cada página tiene su mensaje al llegar; si alguna no lo tuviera,
        // la presentación genérica (una vez por sesión).
        const dePagina = mensajePagina();
        if (dePagina) pedir(dePagina.texto, dePagina.cta, 'bienvenida');
        else if (!yaVisto()) pedir(tc.comun.avisoChat, null, 'bienvenida');
        else irAHueco('deriva', anclaDe(document.querySelector('main')), null, ahora);
      }
      setVisible(true);
      // Margen para que el saludo pendiente se mida antes de replanificar.
      ultimoPlan = ahora;
      ultimoFrame = ahora;
      rafId = requestAnimationFrame(bucle);
    }

    // Vista que pide el movimiento. Mientras se baja por la página va boca
    // abajo, de espaldas, y mientras se sube, de frente: acompaña al scroll.
    // Sin scroll, volando, manda su propia velocidad en pantalla (de perfil
    // si cruza, de espaldas si baja). Sentado, bajando a la D, cayendo o
    // quieto, de frente.
    function vistaDeseada(ahora: number): [Vista, number] {
      if (reducido || ahora - caidaDesde < 900) return ['frente', orient];
      const actual = giro ? giro.a : vista;
      const conScroll = modo === 'volando' || modo === 'posado' || modo === 'flotando';
      if (conScroll && Math.abs(vScrollSuave) > (porScroll ? 0.1 : 0.3)) {
        porScroll = true;
        return [vScrollSuave > 0 ? 'espalda' : 'frente', orient];
      }
      porScroll = false;
      const libre = modo === 'volando' || (modo === 'aterrizando' && !descendiendo);
      if (!libre) return ['frente', orient];
      const vsx = vxv;
      const vsy = sistema === 'documento' ? vyv - vScroll : vyv;
      // Umbrales con histéresis: cuesta más salir del frente que volver a él,
      // y un vuelo corto no llega a girarse.
      if (Math.hypot(vsx, vsy) < (actual === 'frente' ? 0.25 : 0.15)) return ['frente', orient];
      // Cerca del destino no empieza a girarse, y ya girado se endereza
      // antes de llegar: el giro no se queda a medias al posarse.
      if (vuelo) {
        const o = vuelo.objetivo ? vuelo.objetivo() : { x: vuelo.tx, y: vuelo.ty };
        if (o && Math.hypot(o.x - x, o.y - y) < (actual === 'frente' ? 70 : 30)) return ['frente', orient];
      }
      const ax = Math.abs(vsx);
      const fBaja = actual === 'espalda' ? 0.7 : actual === 'perfil' ? 1.5 : 1.2;
      const fSube = actual === 'frente' ? 0.7 : 1.5;
      if (vsy > ax * fBaja) return ['espalda', orient];
      if (-vsy > ax * fSube) return ['frente', orient];
      return ['perfil', ax > 0.05 ? Math.sign(vsx) : orient];
    }

    const mismaVista = (a: Vista, ao: number, b: Vista, bo: number) => a === b && (a !== 'perfil' || ao === bo);

    function actualizarVista(ahora: number) {
      if (giro && ahora - giro.desde >= GIRO_MS) {
        vista = giro.a;
        orient = giro.aOri;
        giro = null;
      }
      const [v, o] = vistaDeseada(ahora);
      if (!mismaVista(v, o, candidata, candOri)) {
        candidata = v;
        candOri = o;
        candDesde = ahora;
      }
      // Se arrepiente a medio giro (aún se ve la vista de partida): deshace el
      // giro desde donde va, sin llegar a enseñar la otra.
      if (giro && ahora - giro.desde < GIRO_MS / 2 && mismaVista(v, o, giro.de, giro.deOri)) {
        const hecho = ahora - giro.desde;
        giro = { de: giro.a, deOri: giro.aOri, a: giro.de, aOri: giro.deOri, desde: ahora - (GIRO_MS - hecho) };
      }
      if (!mismaVista(v, o, vista, orient)) {
        // Fuera de pantalla (o casi) cambia sin girar: así entra ya de perfil.
        const sx = sistema === 'documento' ? x - window.scrollX : x;
        const sy = sistema === 'documento' ? y - window.scrollY : y;
        const fuera =
          sx > anchoVp() - rw * 0.3 || sx + rw * 0.3 < 0 || sy > altoVp() - rh * 0.3 || sy + rh * 0.3 < 0;
        if (fuera || reducido) {
          vista = v;
          orient = o;
          giro = null;
        } else if (!giro && ahora - candDesde >= 110) {
          giro = { de: vista, deOri: orient, a: v, aOri: o, desde: ahora };
        }
      }
      if (giro) {
        const t = clamp((ahora - giro.desde) / GIRO_MS, 0, 1);
        const primera = t < 0.5;
        vis = primera ? giro.de : giro.a;
        visOri = primera ? giro.deOri : giro.aOri;
        // Frente y espalda giran sobre el eje horizontal (voltereta hacia
        // delante: acaba boca abajo); con el perfil, sobre el vertical.
        const par = giro.de + giro.a;
        const f = Math.max(0.06, Math.abs(Math.cos(Math.PI * t)));
        const voltereta = par === 'frenteespalda' || par === 'espaldafrente';
        escGiroX = voltereta ? 1 : f;
        escGiroY = voltereta ? f : 1;
      } else {
        vis = vista;
        visOri = orient;
        escGiroX = 1;
        escGiroY = 1;
      }
    }

    function pose(ahora: number, dt: number) {
      const k = dt / 16.7;
      const sentado = modo === 'sentado' || descendiendo;
      mezclaSentado += ((sentado ? 1 : 0) - mezclaSentado) * Math.min(1, 0.18 * k);
      const s = mezclaSentado;
      const vaiven = reducido ? 0 : Math.sin(ahora / 260);
      const cuelgue = reducido ? 0 : Math.sin(ahora / 700);
      // Los ángulos que dependen de la pantalla pasan al dibujo con el signo
      // de su reflejo: de perfil hacia la izquierda o boca abajo, girar a la
      // derecha en pantalla es girar a la izquierda en el dibujo.
      const signo = (vis === 'perfil' ? visOri : 1) * (vis === 'espalda' ? -1 : 1);
      const estela = clamp(-velX * 30, -28, 28) * signo;

      // Piernas: sentado, el muslo viene hacia quien mira (escalado corto) y
      // la espinilla cuelga por delante de la letra, balanceándose. La vista
      // de espaldas comparte las mismas.
      const escMuslo = lerp(1, 0.3, s);
      const piernas: [SVGElement[], SVGElement[], SVGElement[], { x: number; y: number }, number][] = [
        [
          [musloIRef.current, P.eMusloI].filter(Boolean) as SVGElement[],
          [espinillaIRef.current, P.eEspinillaI].filter(Boolean) as SVGElement[],
          [rodillaIRef.current, P.eRodillaI].filter(Boolean) as SVGElement[],
          CADERA_I,
          1,
        ],
        [
          [musloDRef.current, P.eMusloD].filter(Boolean) as SVGElement[],
          [espinillaDRef.current, P.eEspinillaD].filter(Boolean) as SVGElement[],
          [rodillaDRef.current, P.eRodillaD].filter(Boolean) as SVGElement[],
          CADERA_D,
          -1,
        ],
      ];
      for (const [muslos, espinillas, rodillas, cadera, lado] of piernas) {
        const aCadera = lerp(estela + lado * (4 + 3 * cuelgue), lado * 12, s);
        const rad = (aCadera * Math.PI) / 180;
        const kx = cadera.x - LARGO_MUSLO * escMuslo * Math.sin(rad);
        const ky = cadera.y + LARGO_MUSLO * escMuslo * Math.cos(rad);
        const fase = lado > 0 ? vaiven : -vaiven;
        const aRodilla = lerp(aCadera * 1.25, lado * 4 + 3 * fase, s);
        const escEspinilla = lerp(1, 0.9 + 0.1 * fase, s);
        const tMuslo = `translate(${cadera.x} ${cadera.y}) rotate(${aCadera}) scale(1 ${escMuslo})`;
        const tEspinilla = `translate(${kx} ${ky}) rotate(${aRodilla}) scale(1 ${escEspinilla})`;
        for (const m of muslos) m.setAttribute('transform', tMuslo);
        for (const e of espinillas) e.setAttribute('transform', tEspinilla);
        for (const r of rodillas) {
          r.setAttribute('cx', String(kx));
          r.setAttribute('cy', String(ky));
          r.setAttribute('r', String(lerp(3.4, 5.6, s)));
        }
      }

      // De perfil las extremidades se mueven de delante atrás: se quedan
      // atrás en proporción a la velocidad y pedalean un poco, alternando.
      if (vis === 'perfil') {
        const atras = clamp(Math.abs(velX) * 22, 0, 26);
        const paso = reducido ? 0 : Math.sin(ahora / 190);
        const pierna = (cadera: { x: number; y: number }, a: number, muslo?: SVGElement, espinilla?: SVGElement) => {
          const rad = (a * Math.PI) / 180;
          muslo?.setAttribute('transform', `translate(${cadera.x} ${cadera.y}) rotate(${a})`);
          espinilla?.setAttribute(
            'transform',
            `translate(${cadera.x - LARGO_MUSLO * Math.sin(rad)} ${cadera.y + LARGO_MUSLO * Math.cos(rad)}) rotate(${a + 14 + atras * 0.35})`,
          );
        };
        pierna(P_CADERA_CERCA, 8 + atras * 0.5 + 6 * paso, P.pMusloCerca, P.pEspinillaCerca);
        pierna(P_CADERA_LEJOS, 16 + atras * 0.5 - 6 * paso, P.pMusloLejos, P.pEspinillaLejos);
        P.pBrazoCerca?.setAttribute(
          'transform',
          `translate(${P_HOMBRO_CERCA.x} ${P_HOMBRO_CERCA.y}) rotate(${16 + atras * 0.7 - 5 * paso})`,
        );
        P.pBrazoLejos?.setAttribute(
          'transform',
          `translate(${P_HOMBRO_LEJOS.x} ${P_HOMBRO_LEJOS.y}) rotate(${26 + atras * 0.7 + 5 * paso})`,
        );
      }

      // Brazos: saluda con la mano mientras dura la bienvenida.
      const saludando =
        !!burbujaActual && burbujaActual.id === bienvenidaIdRef.current && ahora - burbujaDesde < 2800;
      let objI: number;
      let objD: number;
      if (modo === 'volando' || modo === 'cayendo' || (modo === 'aterrizando' && !descendiendo)) {
        objI = 42 - estela * 0.5;
        objD = -42 - estela * 0.5;
      } else if (s > 0.5) {
        objI = 10;
        objD = -10;
      } else {
        objI = 16 + 3 * cuelgue;
        objD = -16 - 3 * cuelgue;
      }
      if (saludando) objD = reducido ? -140 : -140 + 18 * Math.sin(ahora / 120);
      brazoI += (objI - brazoI) * Math.min(1, 0.2 * k);
      brazoD += (objD - brazoD) * Math.min(1, 0.2 * k);
      const tBrazoI = `translate(${HOMBRO_I.x} ${HOMBRO_I.y}) rotate(${brazoI})`;
      const tBrazoD = `translate(${HOMBRO_D.x} ${HOMBRO_D.y}) rotate(${brazoD})`;
      brazoIRef.current?.setAttribute('transform', tBrazoI);
      brazoDRef.current?.setAttribute('transform', tBrazoD);
      P.eBrazoI?.setAttribute('transform', tBrazoI);
      P.eBrazoD?.setAttribute('transform', tBrazoD);

      // Cabeza: mira hacia su bocadillo; la antena va con retraso y rebota.
      // Ambas se calculan en pantalla y se pasan al dibujo con su signo.
      let objCabeza = 0;
      if (burbujaActual) objCabeza = burbujaActual.lado.endsWith('izq') ? -7 : 7;
      objCabeza -= banco * 0.25;
      cabeza += (objCabeza - cabeza) * Math.min(1, 0.1 * k);
      const tCabeza = `rotate(${cabeza * signo} 50 58)`;
      cabezaRef.current?.setAttribute('transform', tCabeza);
      P.eCabeza?.setAttribute('transform', tCabeza);
      P.pCabeza?.setAttribute('transform', tCabeza);
      const objAntena = reducido ? 0 : clamp(-velX * 40 - cabeza * 0.6, -35, 35);
      antenaVel += (objAntena - antena) * 0.04 * k - antenaVel * 0.12 * k;
      antena += antenaVel * k;
      antenaRef.current?.setAttribute('transform', `rotate(${antena * signo} 50 11)`);
      P.eAntena?.setAttribute('transform', `rotate(${antena * signo} 50 11)`);
      P.pAntena?.setAttribute('transform', `rotate(${antena * signo} 47 11)`);

      const tParpado = `translate(0 34) scale(1 ${parpado(ahora)}) translate(0 -34)`;
      ojosRef.current?.setAttribute('transform', tParpado);
      P.pOjo?.setAttribute('transform', tParpado);

      const objEmpuje =
        modo === 'volando' || (modo === 'aterrizando' && !descendiendo)
          ? 1
          : descendiendo
            ? 0.3
            : modo === 'posado' || modo === 'flotando'
              ? 0.4
              : modo === 'guardado' || modo === 'anclado'
                ? 0.3
                : 0;
      empuje += (objEmpuje - empuje) * Math.min(1, 0.15 * k);
      const parpadeoLlama = reducido ? 1 : 0.8 + 0.2 * Math.sin(ahora / 45);
      llamaRef.current?.setAttribute(
        'transform',
        `translate(50 92) scale(${0.6 + empuje * 0.4} ${Math.max(0.001, empuje * parpadeoLlama * 1.2)})`,
      );
      llamaRef.current?.setAttribute('opacity', String(clamp(empuje * 1.4, 0, 1)));
      // De perfil y de espaldas el fuego sale de la mochila.
      const escLlama = `scale(${0.6 + empuje * 0.4} ${Math.max(0.001, empuje * parpadeoLlama * 1.2)})`;
      const opLlama = String(clamp(empuje * 1.4, 0, 1));
      P.pLlama?.setAttribute('transform', `translate(30 96) rotate(${18 + clamp(Math.abs(velX) * 10, 0, 14)}) ${escLlama}`);
      P.pLlama?.setAttribute('opacity', opLlama);
      P.eLlamaI?.setAttribute('transform', `translate(43 95) ${escLlama}`);
      P.eLlamaD?.setAttribute('transform', `translate(57 95) ${escLlama}`);
      P.eLlamaI?.setAttribute('opacity', opLlama);
      P.eLlamaD?.setAttribute('opacity', opLlama);
    }

    function parpado(ahora: number) {
      if (reducido) return 1;
      if (ahora > proximoParpadeo) {
        parpadeoDesde = ahora;
        proximoParpadeo = ahora + 2400 + Math.random() * 3200;
      }
      const k = (ahora - parpadeoDesde) / 150;
      return k >= 0 && k <= 1 ? 1 - 0.9 * Math.sin(Math.PI * k) : 1;
    }

    function pintar(ahora: number) {
      const pos = sistema === 'pantalla' ? 'fixed' : 'absolute';
      if (pos !== posicionPintada) {
        raiz.style.position = pos;
        posicionPintada = pos;
      }
      raiz.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const tAplastado = ahora - aplastadoDesde;
      const a =
        reducido || tAplastado > 600 ? 0 : fuerzaAplastado * Math.exp(-tAplastado / 130) * Math.cos(tAplastado / 55);
      const flota = !reducido && (modo === 'posado' || modo === 'flotando' || modo === 'guardado') ? Math.sin(ahora / 900) * 3 : 0;
      const angulo = banco + tumbo;
      cuerpo.style.transform = `translate3d(0, ${flota}px, 0) rotate(${angulo}deg) scale(${1 + a * 0.6}, ${1 - a})`;

      if (vis !== vistaPintada) {
        vistaPintada = vis;
        vistaFrenteRef.current?.setAttribute('display', vis === 'frente' ? 'inline' : 'none');
        P.perfil?.setAttribute('display', vis === 'perfil' ? 'inline' : 'none');
        P.espalda?.setAttribute('display', vis === 'espalda' ? 'inline' : 'none');
      }
      // De espaldas va boca abajo: reflejo vertical sobre el centro del dibujo
      // (la espalda es simétrica, así que equivale a darle media vuelta).
      const espejoX = (vis === 'perfil' ? visOri : 1) * escGiroX;
      const espejoY = (vis === 'espalda' ? -1 : 1) * escGiroY;
      giroRef.current?.setAttribute(
        'transform',
        espejoX === 1 && espejoY === 1 ? '' : `translate(50 65) scale(${espejoX} ${espejoY}) translate(-50 -65)`,
      );
    }

    function bucle(ahora: number) {
      const dt = clamp(ahora - ultimoFrame, 1, 64);
      ultimoFrame = ahora;
      const k = dt / 16.7;
      const px = x;

      const sy = window.scrollY;
      if (sy !== ultimoScroll) dirScroll = sy > ultimoScroll ? 1 : -1;
      vScroll = (sy - ultimoScroll) / dt;
      vScrollSuave += (vScroll - vScrollSuave) * (1 - Math.exp(-dt / 220));
      if (sy !== ultimoScroll) ultimoMovScroll = ahora;
      ultimoScroll = sy;

      if (redimensionado) {
        redimensionado = false;
        bw = calcBw();
        setAnchoBurbuja(bw);
        if (letraD) glifo = medirGlifo(letraD);
        if (modo === 'sentado') fijarTam(tamSentado());
        else if (modo === 'posado' || modo === 'guardado') irAHueco('deriva', anclaDe(perchaActiva), mensajeActual, ahora);
      }

      if (chatRef.current && !anclando) {
        anclar(ahora);
      } else if (!chatRef.current && anclando) {
        anclando = false;
        vuelo = null;
        irAHueco('deriva', anclaDe(perchaActiva), null, ahora);
      }

      if (cerradaRef.current) {
        cerradaRef.current = false;
        esconderBurbuja(true);
      }

      // Mensaje ya medido: ahora sí se sabe cuánto ocupa el bocadillo.
      const medido = medidoRef.current;
      if (esperando && medido && medido.id === esperando.id) {
        const tipo = esperando.tipo;
        const percha = esperando.percha;
        esperando = null;
        if (tipo === 'bienvenida-sentado') {
          if (modo === 'sentado') {
            const lado = ladoFijo(cajaRobotPantalla(), medido.alto);
            if (lado) mostrarBurbuja(medido, lado, ahora, Infinity);
          }
        } else if (tipo === 'bienvenida') {
          irAHueco('bienvenida', anclaDe(document.querySelector('main')), medido, ahora, 12000);
        } else if (modo === 'posado' || modo === 'guardado' || modo === 'volando') {
          irAHueco('seccion', anclaDe(percha ?? null), medido, ahora);
        }
      }

      // Aterrizando y la D se va (se ha vuelto a bajar): se suelta y cae.
      if (modo === 'aterrizando' && hero && heroFijado() && progresoHero(hero) >= 0.35) caer(ahora);
      // Volando hacia una sección y se ha subido hasta arriba: a la D.
      else if (modo === 'volando' && !anclando && puedeVolverAD()) aterrizarEnD(ahora);

      if (vuelo) {
        const obj = vuelo.objetivo ? vuelo.objetivo() : { x: vuelo.tx, y: vuelo.ty };
        if (!obj) {
          caer(ahora);
        } else if (reducido) {
          x = obj.x;
          y = obj.y;
          const fin = vuelo.fin;
          vuelo = null;
          fin(ahora);
        } else {
          const w = vuelo.lento ? MUELLE_LENTO : MUELLE;
          const z = vuelo.lento ? 1 : 0.9;
          for (let resto = dt; resto > 0; resto -= 16) {
            const h = Math.min(resto, 16);
            vxv += (w * w * (obj.x - x) - 2 * z * w * vxv) * h;
            vyv += (w * w * (obj.y - y) - 2 * z * w * vyv) * h;
            const v = Math.hypot(vxv, vyv);
            if (v > VEL_MAX) {
              vxv *= VEL_MAX / v;
              vyv *= VEL_MAX / v;
            }
            x += vxv * h;
            y += vyv * h;
          }
          tumbo *= Math.pow(0.94, k);
          if (Math.hypot(obj.x - x, obj.y - y) < 1.2 && Math.hypot(vxv, vyv) < 0.05) {
            x = obj.x;
            y = obj.y;
            vxv = 0;
            vyv = 0;
            const fin = vuelo.fin;
            vuelo = null;
            fin(ahora);
          }
        }
      } else if (modo === 'sentado') {
        const s = asiento();
        if (!s || !hero) {
          caer(ahora);
        } else {
          x = s.x - (ASIENTO_X / VB_W) * rw;
          y = s.y - (ASIENTO_Y / VB_H) * rh;
          const p = progresoHero(hero);
          if (p > 0.02 && burbujaActual) esconderBurbuja(true);
          // 0.35 ≈ media apertura del split (SPLIT_END = 0.7 en SplitHero).
          if (p >= 0.35 || s.y < techo() + rh * 0.75) caer(ahora);
        }
      } else if (modo === 'cayendo') {
        vy += 0.0022 * dt;
        x += vx * dt;
        y += vy * dt;
        tumbo += (reducido ? 0 : 0.12) * dt;
        if (ahora - caidaDesde > 420) trasCaida(ahora);
      } else if (modo === 'flotando') {
        if (puedeVolverAD()) {
          aterrizarEnD(ahora);
        } else if (!hero || hero.getBoundingClientRect().bottom <= altoVp() + 2) {
          pasarA('documento');
          vxv = 0;
          vyv = 0;
          modo = 'posado';
          ultimoPlan = -1e9;
        }
      } else if ((modo === 'posado' || modo === 'guardado') && puedeVolverAD()) {
        aterrizarEnD(ahora);
      } else if (modo === 'posado' || modo === 'guardado') {
        const p = perchaEnVista();
        // El mensaje de llegada a la página se deja leer unos segundos antes
        // de que el de la sección lo sustituya.
        const leyendoLlegada =
          esperando?.tipo === 'bienvenida' ||
          (!!burbujaActual && burbujaActual.id === bienvenidaIdRef.current && ahora - burbujaDesde < 5000);
        if (p && p !== perchaActiva && !leyendoLlegada) {
          perchaActiva = p;
          const m = mensajeDe(p);
          if (m) {
            pedir(m.texto, m.cta, 'seccion', p);
          } else if (!esperando) {
            // Sección sin nada que decir: igualmente se acerca a su titular,
            // llevándose el bocadillo que tuviera abierto (el de la página).
            irAHueco('seccion', anclaDe(p), burbujaActual ? mensajeActual : null, ahora);
          }
        }

        if (ahora - ultimosFijos > 600) {
          ultimosFijos = ahora;
          obstFijos = recogerFijos(excluir());
        }

        if (modo === 'posado') {
          // Se posó con el scroll aún en marcha: se queda fijo en pantalla y
          // se ancla a la página en cuanto el scroll se para.
          const fijoEnPantalla = sistema === 'pantalla';
          if (fijoEnPantalla && ahora - ultimoMovScroll > 150) pasarA('documento');
          if (burbujaActual && ahora > ocultarEn) esconderBurbuja(true);
          const caja = cajaTotalPantalla();
          const fuera =
            caja.y < techo() + 2 ||
            caja.y + caja.h > altoVp() - 2 ||
            caja.x < 0 ||
            caja.x + caja.w > anchoVp() ||
            obstFijos.some((f) => cruzan(f, caja));
          // Con el saludo de llegada aún midiéndose no se replanifica: se
          // iría a un hueco cualquiera y a medio camino cambiaría de rumbo.
          const midiendoSaludo = esperando?.tipo === 'bienvenida' && ahora - ultimoPlan < 1500;
          if (fuera && ahora - ultimoPlan > 250 && !midiendoSaludo) {
            irAHueco('deriva', anclaDe(perchaActiva), burbujaActual ? mensajeActual : null, ahora);
          } else if (
            revisarYa ||
            // Fijo en pantalla la página le pasa por debajo: se revisa a menudo.
            (fijoEnPantalla
              ? ahora - ultimaRevision > 300 && ahora - ultimoPlan > 250
              : ahora - ultimaRevision > 1200 && ahora - ultimoPlan > 800)
          ) {
            revisarYa = false;
            // Lo que hay debajo puede cambiar sin scroll (tarjetas que entran
            // con animación, el banner de cookies): se revisa de vez en cuando.
            ultimaRevision = ahora;
            const { todos } = recogerObstaculos(excluir());
            const rejilla = new Rejilla(anchoVp(), altoVp(), todos);
            const r = cajaRobotPantalla();
            const tapa =
              rejilla.ocupado(r) > 0 ||
              (!!burbujaActual && rejilla.ocupado(cajaBurbuja(r, bw, burbujaActual.alto, burbujaActual.lado)) > 0);
            if (tapa) irAHueco('obstaculo', anclaDe(perchaActiva), burbujaActual ? mensajeActual : null, ahora);
          }
        } else if (!escondido && ahora - ultimoPlan > 250 && obstFijos.some((f) => cruzan(f, cajaRobotPantalla()))) {
          guardar(ahora);
        } else if (ahora - ultimoPlan > 1500) {
          irAHueco('deriva', anclaDe(perchaActiva), null, ahora);
        }
      }

      // Inclinación de la D: muelle hacia -4° mientras lleva el robot encima.
      if (dLiberada && letraD) {
        const objD = modo === 'sentado' ? -4 : 0;
        dTiltVel += (objD - dTilt) * 0.02 * k - dTiltVel * 0.14 * k;
        dTilt += reducido ? objD - dTilt : dTiltVel * k;
        letraD.style.transform = Math.abs(dTilt) > 0.02 ? `rotate(${dTilt}deg)` : '';
      }

      velX = modo === 'cayendo' ? (x - px) / dt : vuelo ? vxv : 0;
      actualizarVista(ahora);
      // Se inclina hacia donde va; boca abajo la cabeza es la que abre camino,
      // así que la inclinación va al revés.
      const objBanco =
        modo === 'sentado' || descendiendo
          ? dTilt
          : reducido || modo === 'cayendo'
            ? 0
            : clamp(velX * 18, -18, 18) * (vis === 'espalda' ? -1 : 1);
      banco += (objBanco - banco) * Math.min(1, 0.12 * k);
      if (modo !== 'cayendo' && !vuelo) tumbo *= Math.pow(0.9, k);

      pose(ahora, dt);
      pintar(ahora);
      rafId = requestAnimationFrame(bucle);
    }

    const alRedimensionar = () => {
      redimensionado = true;
    };
    window.addEventListener('resize', alRedimensionar);
    document.fonts?.addEventListener?.('loadingdone', alRedimensionar);

    let cancelado = false;
    (async () => {
      // Solo se espera a la fuente (sin ella la D mide otra cosa), con tope:
      // el robot entra volando mientras las letras terminan de aparecer.
      await Promise.race([document.fonts?.ready.catch(() => undefined), new Promise((r) => setTimeout(r, 1500))]);
      if (!cancelado) arrancar();
    })();

    return () => {
      cancelado = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', alRedimensionar);
      document.fonts?.removeEventListener?.('loadingdone', alRedimensionar);
      if (letraD) letraD.style.transform = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma]);

  function alPulsar() {
    if (burbuja && burbuja.id === bienvenidaIdRef.current) marcarVisto();
    cerradaRef.current = true;
    abrirChatReal();
  }

  function alCerrar() {
    if (burbuja && burbuja.id === bienvenidaIdRef.current) marcarVisto();
    cerradaRef.current = true;
  }

  const cajaB = burbuja ? cajaBurbuja({ x: 0, y: 0, w: tam.w, h: tam.h }, anchoBurbuja, burbuja.alto, burbuja.lado) : null;

  let colaEstilo: CSSProperties = {};
  let colaClase = '';
  if (burbuja && cajaB) {
    if (burbuja.lado.startsWith('arriba')) {
      colaEstilo = { left: clamp(tam.w / 2 - cajaB.x - 6, 14, anchoBurbuja - 26), bottom: -7 };
      colaClase = 'border-b border-r';
    } else if (burbuja.lado.startsWith('abajo')) {
      colaEstilo = { left: clamp(tam.w / 2 - cajaB.x - 6, 14, anchoBurbuja - 26), top: -7 };
      colaClase = 'border-t border-l';
    } else if (burbuja.lado === 'izq') {
      colaEstilo = { right: -7, top: clamp(tam.h * 0.25, 12, burbuja.alto - 24) };
      colaClase = 'border-t border-r';
    } else {
      colaEstilo = { left: -7, top: clamp(tam.h * 0.25, 12, burbuja.alto - 24) };
      colaClase = 'border-b border-l';
    }
  }

  const contenidoBurbuja = (m: Mensaje, interactivo: boolean) => (
    <>
      <p className="mb-1 pr-6 text-[10px] font-extrabold uppercase tracking-widest text-cian">{tc.mascota.etiqueta}</p>
      {interactivo ? (
        <button
          type="button"
          onClick={alPulsar}
          className="block text-left text-sm font-semibold leading-snug text-white transition-colors hover:text-cian-light"
        >
          {m.texto}
        </button>
      ) : (
        <p className="text-sm font-semibold leading-snug">{m.texto}</p>
      )}
      {m.cta &&
        (interactivo ? (
          <a
            href={m.cta.href}
            className="mt-2.5 block rounded-xl bg-terracota px-3.5 py-2 text-center text-xs font-extrabold text-navy transition-colors hover:bg-terracota-dark"
          >
            {m.cta.label} →
          </a>
        ) : (
          <span className="mt-2.5 block px-3.5 py-2 text-xs font-extrabold">{m.cta.label} →</span>
        ))}
    </>
  );

  return (
    <>
      {/* Medidor: mismo contenido y ancho que el bocadillo, fuera de pantalla,
          para saber su alto real antes de decidir dónde cabe. */}
      <div
        ref={medidorRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-[-10000px] top-0 rounded-2xl border px-4 py-3"
        style={{ width: anchoBurbuja }}
      >
        {pendiente && contenidoBurbuja(pendiente, false)}
      </div>

      <div
        ref={raizRef}
        className="pointer-events-none absolute left-0 top-0 z-[9000]"
        style={{
          width: tam.w,
          height: tam.h,
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity .3s, visibility .3s',
        }}
      >
        {burbuja && cajaB && (
          <div
            className="pointer-events-auto absolute animate-fadeIn rounded-2xl border border-cian/40 bg-navy-900/95 px-4 py-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            style={{ left: cajaB.x, top: cajaB.y, width: anchoBurbuja }}
          >
            <span className={`absolute h-3 w-3 rotate-45 border-cian/40 bg-navy-900 ${colaClase}`} style={colaEstilo} aria-hidden="true" />
            {contenidoBurbuja(burbuja, true)}
            <button
              type="button"
              onClick={alCerrar}
              aria-label={tc.comun.cerrarAviso}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={alPulsar}
          aria-label={tc.comun.avisoChat}
          className="pointer-events-auto absolute inset-0 bg-transparent transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div
            ref={cuerpoRef}
            className="h-full w-full will-change-transform"
            style={{ transformOrigin: `${(ASIENTO_X / VB_W) * 100}% ${(ASIENTO_Y / VB_H) * 100}%` }}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="h-full w-full drop-shadow-[0_6px_10px_rgba(3,19,31,0.5)]"
              style={{ overflow: 'visible' }}
              aria-hidden="true"
            >
              <defs>
                {/* userSpaceOnUse: un único foco de luz para todo el cuerpo,
                    no uno por pieza. */}
                <radialGradient id="mascotaCasco" gradientUnits="userSpaceOnUse" cx="36" cy="24" r="104">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#F6F1E7" />
                  <stop offset="75%" stopColor="#E2D9C7" />
                  <stop offset="100%" stopColor="#C8BDA7" />
                </radialGradient>
                {/* El mismo casco en sombra, para las piezas del lado lejano. */}
                <radialGradient id="mascotaCascoSombra" gradientUnits="userSpaceOnUse" cx="36" cy="24" r="104">
                  <stop offset="0%" stopColor="#D8CFBC" />
                  <stop offset="60%" stopColor="#BFB39B" />
                  <stop offset="100%" stopColor="#A39680" />
                </radialGradient>
                <linearGradient id="mascotaVisor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A3459" />
                  <stop offset="100%" stopColor="#03131F" />
                </linearGradient>
                <radialGradient id="mascotaOjo" cx="45%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#E9FBFF" />
                  <stop offset="50%" stopColor="#7FE4F5" />
                  <stop offset="100%" stopColor="#14CDEC" />
                </radialGradient>
                <linearGradient id="mascotaLlama" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E9FBFF" />
                  <stop offset="35%" stopColor="#7FE4F5" />
                  <stop offset="100%" stopColor="#14CDEC" stopOpacity="0" />
                </linearGradient>
                <filter id="mascotaDifuso" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="10" />
                </filter>
              </defs>

              <circle cx="50" cy="68" r="38" fill="#14CDEC" opacity="0.34" filter="url(#mascotaDifuso)" />

              <g ref={giroRef}>
                <g ref={vistaFrenteRef}>
                  <g ref={llamaRef} opacity="0">
                    <path d={LLAMA} fill="url(#mascotaLlama)" />
                    <path d={LLAMA_NUCLEO} fill="#FFFFFF" opacity="0.85" />
                  </g>

                  <g ref={espinillaIRef}>
                    <path d={ESPINILLA} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={espinillaDRef}>
                    <path d={ESPINILLA} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>

                  <rect x="30" y="58" width="40" height="36" rx="16" fill="url(#mascotaCasco)" {...TRAZO} />
                  <path d="M33 84 Q50 88 67 84" stroke="#03131F" strokeOpacity="0.25" strokeWidth="1.4" fill="none" />
                  <circle cx="50" cy="73" r="5.2" fill="#051E36" />
                  <circle cx="50" cy="73" r="2.6" fill="#14CDEC" />

                  <g ref={musloIRef}>
                    <path d={MUSLO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={musloDRef}>
                    <path d={MUSLO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <circle ref={rodillaIRef} cx="41" cy="102" r="3.4" fill="url(#mascotaCasco)" {...TRAZO} />
                  <circle ref={rodillaDRef} cx="59" cy="102" r="3.4" fill="url(#mascotaCasco)" {...TRAZO} />

                  <g ref={brazoIRef}>
                    <path d={BRAZO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={brazoDRef}>
                    <path d={BRAZO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <circle cx={HOMBRO_I.x} cy={HOMBRO_I.y} r="3" fill="#0A3459" />
                  <circle cx={HOMBRO_D.x} cy={HOMBRO_D.y} r="3" fill="#0A3459" />

                  <g ref={cabezaRef}>
                    <g ref={antenaRef}>
                      <line x1="50" y1="11" x2="50" y2="1.5" stroke="#03131F" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="50" cy="0" r="3.4" fill="#7FE4F5" stroke="#03131F" strokeWidth="1.2" />
                    </g>
                    <circle cx="15" cy="34" r="5.6" fill="#0A3459" {...TRAZO} />
                    <circle cx="85" cy="34" r="5.6" fill="#0A3459" {...TRAZO} />
                    <circle cx="15" cy="34" r="2" fill="#14CDEC" />
                    <circle cx="85" cy="34" r="2" fill="#14CDEC" />
                    <rect x="16" y="8" width="68" height="52" rx="24" fill="url(#mascotaCasco)" {...TRAZO} />
                    <ellipse cx="33" cy="15.5" rx="10" ry="3.8" fill="#FFFFFF" opacity="0.75" transform="rotate(-16 33 15.5)" />
                    <rect x="24" y="20" width="52" height="28" rx="14" fill="url(#mascotaVisor)" />
                    <g ref={ojosRef}>
                      <ellipse cx="39" cy="34" rx="5" ry="6" fill="url(#mascotaOjo)" />
                      <ellipse cx="61" cy="34" rx="5" ry="6" fill="url(#mascotaOjo)" />
                      <circle cx="40.8" cy="31.4" r="1.6" fill="#FFFFFF" />
                      <circle cx="62.8" cy="31.4" r="1.6" fill="#FFFFFF" />
                    </g>
                    <path d="M44 53 Q50 57 56 53" stroke="#0A3459" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                </g>

                {/* Perfil, mirando a la derecha: mochila propulsora detrás, un
                    solo ojo en el visor y el lado lejano en sombra. */}
                <g ref={parte('perfil')} display="none">
                  <g ref={parte('pBrazoLejos')} transform={`translate(${P_HOMBRO_LEJOS.x} ${P_HOMBRO_LEJOS.y}) rotate(26)`}>
                    <path d={BRAZO} fill="url(#mascotaCascoSombra)" {...TRAZO} />
                  </g>
                  <g ref={parte('pMusloLejos')}>
                    <path d={MUSLO} fill="url(#mascotaCascoSombra)" {...TRAZO} />
                  </g>
                  <g ref={parte('pEspinillaLejos')}>
                    <path d={ESPINILLA} fill="url(#mascotaCascoSombra)" {...TRAZO} />
                  </g>
                  <g ref={parte('pLlama')} opacity="0">
                    <path d={LLAMA} fill="url(#mascotaLlama)" />
                    <path d={LLAMA_NUCLEO} fill="#FFFFFF" opacity="0.85" />
                  </g>
                  <path d="M25 90 L35 90 L33.5 96 L26.5 96 Z" fill="#051E36" {...TRAZO} />
                  <rect x="21" y="60" width="17" height="31" rx="6" fill="#0A3459" {...TRAZO} />
                  <rect x="25.5" y="66" width="3.2" height="13" rx="1.6" fill="#14CDEC" />
                  <rect x="35" y="58" width="29" height="36" rx="13" fill="url(#mascotaCasco)" {...TRAZO} />
                  <path d="M38 61 Q46 57.5 53 61.5" stroke="#0A3459" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                  <rect x="59.5" y="67" width="3" height="11" rx="1.5" fill="#14CDEC" />
                  <g ref={parte('pMusloCerca')}>
                    <path d={MUSLO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('pEspinillaCerca')}>
                    <path d={ESPINILLA} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('pBrazoCerca')} transform={`translate(${P_HOMBRO_CERCA.x} ${P_HOMBRO_CERCA.y}) rotate(16)`}>
                    <path d={BRAZO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <circle cx={P_HOMBRO_CERCA.x} cy={P_HOMBRO_CERCA.y} r="3" fill="#0A3459" />
                  <g ref={parte('pCabeza')}>
                    <g ref={parte('pAntena')}>
                      <line x1="47" y1="11" x2="44" y2="1.5" stroke="#03131F" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="43.6" cy="0" r="3.4" fill="#7FE4F5" stroke="#03131F" strokeWidth="1.2" />
                    </g>
                    <rect x="25" y="8" width="54" height="52" rx="23" fill="url(#mascotaCasco)" {...TRAZO} />
                    <ellipse cx="37" cy="15.5" rx="8.5" ry="3.4" fill="#FFFFFF" opacity="0.75" transform="rotate(-16 37 15.5)" />
                    <path
                      d="M56 20 L68 20 C75 20 79.5 26 79.5 34 C79.5 42 75 48 68 48 L56 48 C53 48 51.5 45 51.5 42 L51.5 26 C51.5 23 53 20 56 20 Z"
                      fill="url(#mascotaVisor)"
                    />
                    <g ref={parte('pOjo')}>
                      <ellipse cx="69" cy="34" rx="3.6" ry="6" fill="url(#mascotaOjo)" />
                      <circle cx="70.3" cy="31.4" r="1.4" fill="#FFFFFF" />
                    </g>
                    <circle cx="41" cy="34" r="8" fill="#0A3459" {...TRAZO} />
                    <circle cx="41" cy="34" r="4.2" fill="none" stroke="#14CDEC" strokeWidth="1.4" />
                    <circle cx="41" cy="34" r="1.6" fill="#14CDEC" />
                    <path d="M66 53 Q70.5 56 74 52.5" stroke="#0A3459" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                </g>

                {/* Espalda: dos toberas en la mochila y la rejilla de la nuca.
                    Se pinta boca abajo cuando baja en picado. */}
                <g ref={parte('espalda')} display="none">
                  <g ref={parte('eLlamaI')} opacity="0">
                    <path d={LLAMA} fill="url(#mascotaLlama)" />
                    <path d={LLAMA_NUCLEO} fill="#FFFFFF" opacity="0.85" />
                  </g>
                  <g ref={parte('eLlamaD')} opacity="0">
                    <path d={LLAMA} fill="url(#mascotaLlama)" />
                    <path d={LLAMA_NUCLEO} fill="#FFFFFF" opacity="0.85" />
                  </g>
                  <g ref={parte('eEspinillaI')}>
                    <path d={ESPINILLA} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('eEspinillaD')}>
                    <path d={ESPINILLA} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('eMusloI')}>
                    <path d={MUSLO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('eMusloD')}>
                    <path d={MUSLO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <circle ref={parte('eRodillaI')} cx="41" cy="102" r="3.4" fill="url(#mascotaCasco)" {...TRAZO} />
                  <circle ref={parte('eRodillaD')} cx="59" cy="102" r="3.4" fill="url(#mascotaCasco)" {...TRAZO} />
                  <rect x="30" y="58" width="40" height="36" rx="16" fill="url(#mascotaCasco)" {...TRAZO} />
                  <g ref={parte('eBrazoI')}>
                    <path d={BRAZO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <g ref={parte('eBrazoD')}>
                    <path d={BRAZO} fill="url(#mascotaCasco)" {...TRAZO} />
                  </g>
                  <circle cx={HOMBRO_I.x} cy={HOMBRO_I.y} r="3" fill="#0A3459" />
                  <circle cx={HOMBRO_D.x} cy={HOMBRO_D.y} r="3" fill="#0A3459" />
                  <path d="M37 59.5 L41 63.5 M63 59.5 L59 63.5" stroke="#0A3459" strokeWidth="3" strokeLinecap="round" />
                  <path d="M38 89 L48 89 L46.5 95 L39.5 95 Z M52 89 L62 89 L60.5 95 L53.5 95 Z" fill="#051E36" {...TRAZO} />
                  <rect x="35" y="61" width="30" height="29" rx="7" fill="#0A3459" {...TRAZO} />
                  <line x1="50" y1="64" x2="50" y2="87" stroke="#051E36" strokeWidth="1.4" />
                  <circle cx="43" cy="70" r="2.3" fill="#14CDEC" />
                  <circle cx="57" cy="70" r="2.3" fill="#14CDEC" />
                  <g ref={parte('eCabeza')}>
                    <g ref={parte('eAntena')}>
                      <line x1="50" y1="11" x2="50" y2="1.5" stroke="#03131F" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="50" cy="0" r="3.4" fill="#7FE4F5" stroke="#03131F" strokeWidth="1.2" />
                    </g>
                    <circle cx="15" cy="34" r="5.6" fill="#0A3459" {...TRAZO} />
                    <circle cx="85" cy="34" r="5.6" fill="#0A3459" {...TRAZO} />
                    <rect x="16" y="8" width="68" height="52" rx="24" fill="url(#mascotaCasco)" {...TRAZO} />
                    <ellipse cx="33" cy="15.5" rx="10" ry="3.8" fill="#FFFFFF" opacity="0.75" transform="rotate(-16 33 15.5)" />
                    <rect x="37" y="22" width="26" height="17" rx="6" fill="#0A3459" opacity="0.16" />
                    <path d="M41 27 H59 M41 30.5 H59 M41 34 H59" stroke="#0A3459" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}

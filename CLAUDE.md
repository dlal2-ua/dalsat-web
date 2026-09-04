# CLAUDE.md — dalsat-web

## Stack

Astro 4 + Tailwind 3 + islas React 18. Deploy en Vercel (`@astrojs/vercel`).

- `npm run dev` — servidor local
- `npm run build` — build de produccion
- `node_modules\.bin\tsc --noEmit` — typecheck (permiso ya concedido en `.claude/settings.json`)

Contexto de producto y copy: `landing-brief.md`.
Este archivo no es un CLAUDE.md completo del proyecto; si hace falta uno, ejecutar `/init`.

## vercel.json

**No admite comentarios ni claves extra.** Es JSON estricto contra un esquema
con `additionalProperties: false`, y una clave de mas tumba el deploy entero
antes de compilar nada: `should NOT have additional property`. El build local
NO lo detecta. Cada regla de `headers` solo acepta `source`, `headers`, `has`
y `missing`.

Lo que no cabe explicar ahi va aqui:

- **La CSP se aplica a todo menos a `citas.dalsats.com`** (por eso el
  `missing` de la segunda regla). Ese host no sirve esta web: el `rewrite` de
  arriba lo manda a una aplicacion externa que no esta en este repositorio y
  cuyos recursos no podemos enumerar. Aplicarle nuestra politica la romperia.
- `script-src` lleva `'unsafe-inline'` porque Astro emite scripts de modulo en
  linea y la pagina lleva JSON-LD y el flag `.js` del `<head>`. Aun asi
  bloquea scripts de cualquier host que no este nombrado, que es el objetivo.

## Bilingue

Castellano en la raiz (`/servicios`), ingles bajo `/en` (`/en/servicios`).
Enrutado i18n nativo de Astro 5, sin plugin: los que hay
(astro-i18next, astro-i18n) llevan anos sin mantenerse y ninguno traduce el
contenido.

- **`src/i18n/es.ts` es el original.** `en.ts` esta tipado a partir de el
  (`Contenido`), asi que si falta una clave **falla el build** en vez de
  servir castellano a un visitante ingles. Al anadir texto, se anade a los dos.
- Lo que comparten varios componentes vive en `src/i18n`. Lo que dice una
  sola pagina se queda en el fichero de esa pagina.
- Los enlaces internos van por `ruta(destino, idioma)` de `src/i18n/config.ts`.
  Un `href="/contacto"` a pelo saca al visitante ingles del ingles.
- Nunca comparar contra un nombre traducible. El FAQ y los sectores usan
  centinelas (`__todas__`) e indices, no literales.
- Los mp3 de `/audio` estan en castellano: la transcripcion **no** se traduce,
  se anade la traduccion aparte y marcada.
- Las paginas legales inglesas son traduccion de cortesia. El documento que
  obliga es el castellano y la pagina lo dice a la vista.

## Identidad de marca (manda sobre todo lo demas)

`tailwind.config.mjs` es la fuente de verdad de la identidad visual y **gana** frente a
cualquier guia estetica generica, incluida la de abajo:

- **Tipografia fija**: `font-sans` = Inter, `font-display` = Space Grotesk. No se cambian,
  no se "varian entre generaciones", no se sustituyen por fuentes mas expresivas.
- **Paleta fija de cinco colores** (navy, cian, terracota, crema, grafito) con roles
  semanticos estrictos — terracota es EXCLUSIVO de conversion. Los comentarios de
  `tailwind.config.mjs` son normativos; no duplicar la paleta aqui.
- Nada de gradientes morados, meshes decorativos ni colores fuera del sistema.

## Estetica frontend

La guia de abajo aplica a lo que la marca **no** fija: composicion y layout, jerarquia,
espaciado, movimiento, profundidad y textura de fondos. No aplica a fuentes ni colores.

Va en CLAUDE.md porque es always-on. Para trabajo de diseño mas profundo existe el skill
opt-in `frontend-design` (`.agents/skills/frontend-design/SKILL.md`). Tambien esta
`ui-ux-pro-max` en `.claude/skills/`, pero **desactivado** via `skillOverrides` en
`.claude/settings.local.json`: no contar con el. Precedencia ante conflicto:
`tailwind.config.mjs` > esta seccion > skills.

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

**Excepciones a ese bloque en este repo** (la marca manda): Inter y Space Grotesk son las
fuentes del proyecto y se mantienen; la paleta no se amplia ni se varia; "vary between
light and dark themes / different fonts" no aplica — el sistema es unico y estable.
Lo que si se aplica: layouts no obvios, movimiento con intencion, fondos con profundidad
usando navy/crema/cian, y evitar patrones de componente predecibles.

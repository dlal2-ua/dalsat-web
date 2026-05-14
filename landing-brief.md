# Dalsat — Brief para la landing page

Contexto para quien construya la landing. Todo lo aquí escrito viene directamente del código y del cliente real en producción.

---

## Qué es Dalsat

**Dalsat** es una plataforma que permite a cualquier negocio desplegar un agente de WhatsApp con IA en minutos — sin escribir código.

El negocio proporciona un archivo de configuración (nombre, horarios, precios, FAQs, tono) y el agente de Dalsat responde automáticamente los mensajes de los clientes en WhatsApp: conoce la oferta del negocio, habla con el tono adecuado y escala a un humano cuando es necesario.

---

## El problema que resuelve

Las pequeñas y medianas empresas (gimnasios, autoescuelas, clínicas, restaurantes, tiendas…) reciben decenas de mensajes repetitivos en WhatsApp cada día:

- "¿A qué hora abrís?"
- "¿Cuánto cuesta?"
- "¿Tenéis hueco el viernes?"

Responderlos manualmente es lento, inconsistente y caro. Contratar a alguien solo para esto es excesivo. Los chatbots genéricos requieren semanas de configuración técnica.

Dalsat responde en segundos, 24/7, siempre con la voz del negocio.

---

## Cómo funciona (vista del usuario)

1. **El negocio aporta su información** — horarios, precios, FAQs, dirección, tono de voz.
2. **Dalsat se entrena solo** con esa información — sin ingeniería de prompts manual.
3. **Los clientes escriben al número de WhatsApp del negocio** — reciben respuestas instantáneas, precisas y coherentes con la marca.
4. **Cuando una pregunta es demasiado compleja**, Dalsat lo detecta y escala a un humano, enviándole al agente un resumen completo de la conversación por WhatsApp.

---

## Funcionalidades clave

### Multi-negocio, plataforma única

Una instalación de Dalsat gestiona múltiples negocios independientes. Cada uno tiene su propia base de conocimiento, historial de conversaciones y configuración aislados. Añadir un nuevo negocio lleva minutos.

### Conoce el negocio a fondo

Dalsat lee las FAQs, la lista de precios, los horarios y cualquier documento del negocio (PDFs, archivos Word, hojas de cálculo) y usa búsqueda semántica para encontrar la información correcta ante cada pregunta del cliente.

### Memoria de conversación

Dalsat recuerda los últimos 20 mensajes de cada conversación, para que los clientes no tengan que repetirse.

### Escalado inteligente a humano

Cuando un cliente pregunta algo que Dalsat no puede responder — o pide hablar con una persona — Dalsat envía un mensaje de escalado personalizado al cliente y notifica al propietario del negocio por WhatsApp con un resumen de la conversación.

### Protección anti-flood

Protección integrada contra mensajes en ráfaga — mantiene los costes de la API bajo control.

### Ingestión de documentos

Los negocios pueden subir PDFs, documentos Word y hojas Excel. Dalsat los convierte automáticamente y los añade a su base de conocimiento.

---

## Ejemplo real: Autoescuela Pollica (Valencia)

- Responde preguntas sobre tipos de carnet (B, A2, AM), precios, documentación necesaria, proceso de examen.
- Habla en tono cercano e informal en español.
- Escala a un humano para preguntas sobre expedientes concretos de alumnos, fechas de examen o notas.
- Disponible 24/7 — sin necesidad de personal para consultas fuera de horario.

---

## A quién va dirigido

- **Principal**: Pequeñas y medianas empresas locales con alto volumen de mensajes en WhatsApp — autoescuelas, clínicas, gimnasios, centros de estética, restaurantes, tiendas.
- **Secundario**: Agencias que gestionan WhatsApp para múltiples clientes.

---

## Diferenciadores

|                             | Chatbots genéricos   | Desarrollo IA a medida | Dalsat            |
| --------------------------- | -------------------- | ---------------------- | ----------------- |
| Tiempo de configuración     | Días–semanas         | Semanas–meses          | Minutos           |
| Conoce tu negocio           | Entrenamiento manual | Desarrollo a medida    | Auto desde config |
| WhatsApp nativo             | Raramente            | A veces                | Siempre           |
| Escalado a humano           | Limitado             | A medida               | Integrado         |
| Multi-tenant                | No                   | No                     | Sí                |
| Personalización por negocio | Limitada             | Completa               | Completa          |

---

## Stack tecnológico del producto (para visitantes técnicos)

- **IA**: Google Gemini (modelo configurable por cliente — por defecto Gemini 2.5 Flash)
- **WhatsApp**: Evolution API
- **Recuperación de conocimiento**: LlamaIndex + ChromaDB (búsqueda vectorial semántica)
- **Memoria**: Redis
- **Backend**: FastAPI (Python)
- **Infraestructura**: Docker, desplegable en cualquier VPS

---

## Tono para la landing

- Directo, seguro, sin relleno.
- Público objetivo: propietarios de negocios, no desarrolladores.
- Énfasis en: rapidez de configuración, disponibilidad 24/7, respuestas naturales, escalado sin fricciones.
- Español como idioma principal (mercado España / Latinoamérica).

---

## Qué debe comunicar la landing

1. **Hero**: Dalsat responde a tus clientes de WhatsApp al instante, 24/7 — solo cuéntale cómo es tu negocio.
2. **Problema/solución**: Las preguntas repetitivas te roban tiempo → Dalsat las gestiona.
3. **Cómo funciona**: Configuración en 3 pasos (configura → conecta → listo).
4. **Funcionalidades**: La lista de arriba, enfocada en beneficios.
5. **Prueba social**: Autoescuela Pollica (mostrar conversación de ejemplo simulada).
6. **CTA**: "Empieza ahora" / "Pruébalo para tu negocio" / formulario de contacto.

---

## Stack de la landing (decisiones técnicas)

### Framework: Astro + React islands

- Astro compila a HTML estático puro → carga instantánea, SEO perfecto
- React solo donde hay interactividad: demo de chat simulado + formulario de contacto
- TypeScript activado
- Tailwind CSS para estilos

### Hosting: Vercel (gratuito)

- Deploy automático desde GitHub en cada push
- HTTPS automático, CDN global
- **No usar el VPS de Contabo** — añade complejidad operativa innecesaria y acopla la landing al servidor del agente
- Coste: 0€ (Vercel free tier es más que suficiente para una landing)

### Dominio

- Comprar en Namecheap o Porkbun: ~10–12€/año
- Apuntar DNS a Vercel → hosting incluido sin coste adicional

### Formulario de contacto

- Usar [Formspree](https://formspree.io) o Web3Forms — tier gratuito cubre el volumen de una landing
- Sin backend propio: el formulario envía directamente al email configurado

### Secciones con interactividad (componentes React)

- **Demo de chat**: conversación de WhatsApp simulada con mensajes de ejemplo (estática, no conectada al agente real)
- **Formulario de contacto**: nombre + email + mensaje → Formspree

### Estructura de carpetas sugerida

```
Dalsat-landing/
├── src/
│   ├── components/
│   │   ├── ChatDemo.tsx       ← componente React (island)
│   │   └── ContactForm.tsx    ← componente React (island)
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── public/
└── astro.config.mjs
```

### Comandos

```bash
npm create astro@latest Dalsat-landing
# elegir: Empty / TypeScript strict / install deps

cd dalsat-landing
npx astro add react tailwind
```

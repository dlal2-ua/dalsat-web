// JSON-LD FAQPage a partir de las mismas preguntas que se pintan en la pagina.
// Una sola fuente (faq.items del i18n): el marcado nunca puede decir algo
// distinto de lo que ve el visitante, que es lo que Google exige.
export interface PreguntaFaq {
  question: string;
  answer: string;
}

export function schemaFaq(preguntas: PreguntaFaq[], idioma: 'es' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: idioma === 'es' ? 'es-ES' : 'en',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.question,
      acceptedAnswer: { '@type': 'Answer', text: p.answer },
    })),
  };
}

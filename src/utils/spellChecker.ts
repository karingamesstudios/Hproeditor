export type SpellIssue = {
  id: string;
  offset: number;
  length: number;
  original: string;
  suggestions: string[];
  message: string;
  category: 'spelling' | 'grammar' | 'style';
  source: 'local' | 'languagetool';
};

const COMMON_FIXES: Record<string, string> = {
  tambien: 'también', ademas: 'además', despues: 'después', informacion: 'información',
  descripcion: 'descripción', solucion: 'solución', opinion: 'opinión', tecnologia: 'tecnología',
  automatico: 'automático', rapido: 'rápido', facil: 'fácil', ultimo: 'último', numero: 'número',
  pagina: 'página', paginas: 'páginas', aqui: 'aquí', alla: 'allá', ahi: 'ahí', menu: 'menú',
  boton: 'botón', seccion: 'sección', atencion: 'atención', diseno: 'diseño', publicacion: 'publicación',
  caracteristicas: 'características', experiencia: 'experiencia', contenido: 'contenido',
};

function preserveCase(original: string, replacement: string): string {
  if (original === original.toUpperCase()) return replacement.toUpperCase();
  if (original[0] === original[0]?.toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

export function analyzeTextLocally(text: string): SpellIssue[] {
  const issues: SpellIssue[] = [];
  let sequence = 0;
  const add = (offset: number, length: number, original: string, suggestions: string[], message: string, category: SpellIssue['category']) => {
    issues.push({ id: `local-${sequence++}-${offset}`, offset, length, original, suggestions, message, category, source: 'local' });
  };

  const wordRegex = /\b[\p{L}]+\b/gu;
  for (const match of text.matchAll(wordRegex)) {
    const word = match[0];
    const fix = COMMON_FIXES[word.toLocaleLowerCase('es')];
    if (fix && fix !== word.toLocaleLowerCase('es')) {
      add(match.index ?? 0, word.length, word, [preserveCase(word, fix)], 'Posible tilde o escritura incorrecta.', 'spelling');
    }
  }

  for (const match of text.matchAll(/\b([\p{L}]{2,})\s+\1\b/giu)) {
    const repeated = match[1];
    const secondOffset = (match.index ?? 0) + repeated.length + match[0].indexOf(' ', repeated.length) + 1;
    add(secondOffset, repeated.length, repeated, [], 'Palabra repetida.', 'grammar');
  }

  for (const match of text.matchAll(/\s+([,.;:!?])/g)) {
    const punctuationOffset = (match.index ?? 0) + match[0].length - 1;
    add(match.index ?? 0, match[0].length, match[0], [match[1]], 'No debe haber un espacio antes del signo de puntuación.', 'grammar');
    void punctuationOffset;
  }

  for (const match of text.matchAll(/([,;:!?])(?=[\p{L}\d])/gu)) {
    const offset = (match.index ?? 0) + 1;
    add(offset, 0, '', [' '], 'Normalmente se deja un espacio después del signo.', 'grammar');
  }

  return issues.sort((a, b) => a.offset - b.offset);
}

/** Uses LanguageTool for richer grammar and spelling checks. Text is sent to the public online service. */
export async function analyzeTextOnline(text: string): Promise<SpellIssue[]> {
  const body = new URLSearchParams({ text, language: 'es', enabledOnly: 'false' });
  const response = await fetch('https://api.languagetool.org/v2/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
  });
  if (!response.ok) throw new Error(`LanguageTool respondió con HTTP ${response.status}`);
  const data = await response.json() as {
    matches?: Array<{
      offset: number; length: number; message: string;
      replacements?: Array<{ value: string }>;
      rule?: { category?: { id?: string }; issueType?: string };
    }>;
  };
  return (data.matches ?? []).map((match, index) => {
    const original = text.slice(match.offset, match.offset + match.length);
    const issueType = match.rule?.issueType;
    const category: SpellIssue['category'] = issueType === 'misspelling' ? 'spelling' : issueType === 'style' ? 'style' : 'grammar';
    return {
      id: `lt-${index}-${match.offset}`,
      offset: match.offset,
      length: match.length,
      original,
      suggestions: (match.replacements ?? []).slice(0, 5).map((item) => item.value),
      message: match.message,
      category,
      source: 'languagetool' as const,
    };
  });
}

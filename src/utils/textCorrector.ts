/**
 * Utilidades avanzadas para corrección ortográfica, gramatical y auto-mayúsculas
 */

// Diccionario de correcciones y tildes comunes en español
const COMMON_ACCENTS: Record<string, string> = {
  'tambien': 'también',
  'ademas': 'además',
  'despues': 'después',
  'numero': 'número',
  'paginas': 'páginas',
  'pagina': 'página',
  'rapido': 'rápido',
  'facil': 'fácil',
  'ultimo': 'último',
  'mas': 'más',
  'esta': 'está',
  'estan': 'están',
  'aqui': 'aquí',
  'alla': 'allá',
  'ahi': 'ahí',
  'menu': 'menú',
  'boton': 'botón',
  'botones': 'botones',
  'seccion': 'sección',
  'secciones': 'secciones',
  'atencion': 'atención',
  'informacion': 'información',
  'descripcion': 'descripción',
  'solucion': 'solución',
  'opinion': 'opinión',
  'diseno': 'diseño',
  'tecnologia': 'tecnología',
  'automatico': 'automático',
};

/**
 * Capitaliza automáticamente la primera letra de cada oración:
 * - Al inicio del texto
 * - Después de un punto (.), signo de interrogación (?) o exclamación (!)
 */
export function autoCapitalizeSentences(text: string): string {
  if (!text) return '';

  // 1. Mayúscula a la primera letra del texto
  let result = text.charAt(0).toUpperCase() + text.slice(1);

  // 2. Mayúscula tras `. `, `? `, `! ` (punto + espacio(s) + letra)
  result = result.replace(/([.!?]\s+)([a-záéíóúñ])/g, (_, prefix, letter) => {
    return prefix + letter.toUpperCase();
  });

  // 3. Si pusieron un punto sin espacio ("hola.mundo"), agrega espacio y mayúscula ("hola. Mundo")
  result = result.replace(/([.!?])([a-záéíóúñ])/g, (_, punct, letter) => {
    return punct + ' ' + letter.toUpperCase();
  });

  return result;
}

/**
 * Normaliza el espaciado alrededor de los signos de puntuación
 */
export function fixPunctuationSpacing(text: string): string {
  if (!text) return '';

  return text
    // Quita espacios antes de comas, puntos y signos
    .replace(/\s+([,.:;!?])/g, '$1')
    // Agrega espacio tras signo si le sigue una letra inmediatamente
    .replace(/([,;:!?])([a-zA-ZáéíóúÁÉÍÓÚñÑ])/g, '$1 $2')
    // Limpia espacios dobles
    .replace(/\s+/g, ' ');
}

/**
 * Convierte el texto a tipo Título (Capitaliza Cada Palabra)
 */
export function toTitleCase(text: string): string {
  if (!text) return '';
  return text.toLowerCase().replace(/(^|\s)[a-záéíóúñ]/g, (match) => match.toUpperCase());
}

/**
 * Corrector global de ortografía y gramática
 */
export function fixSpellingAndGrammar(text: string): string {
  if (!text) return '';

  let cleaned = text.trim();

  // 1. Normalizar espaciado de puntuación
  cleaned = fixPunctuationSpacing(cleaned);

  // 2. Corregir tildes faltantes en palabras conocidas
  const tokens = cleaned.split(/(\s+|[,.:;!?()])/);
  const fixedTokens = tokens.map((token) => {
    const lower = token.toLowerCase();
    if (COMMON_ACCENTS[lower]) {
      // Preservar Mayúscula inicial si existía
      const replacement = COMMON_ACCENTS[lower];
      if (token.charAt(0) === token.charAt(0).toUpperCase() && token.length > 1) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    }
    return token;
  });
  cleaned = fixedTokens.join('');

  // 3. Aplicar auto-mayúsculas tras punto
  cleaned = autoCapitalizeSentences(cleaned);

  return cleaned;
}
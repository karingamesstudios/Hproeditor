export interface CustomFont {
  name: string;
  dataUrl: string; // Datos en formato Base64
  format: string;  // truetype, opentype, woff, woff2
}

export const registerCustomFont = async (font: CustomFont): Promise<boolean> => {
  try {
    // Instanciar y cargar la fuente en el navegador mediante FontFace API
    const fontFace = new FontFace(font.name, `url(${font.dataUrl})`);
    const loadedFace = await fontFace.load();
    // Algunas versiones de los tipos DOM no exponen add(), aunque sí existe en el navegador.
    (document.fonts as FontFaceSet & { add: (font: FontFace) => FontFaceSet }).add(loadedFace);

    // Inyectar la regla @font-face en un elemento <style> global para persistencia
    const safeFontName = font.name.replace(/[^a-zA-Z0-9_-]/g, '-');
    const styleId = `custom-font-${safeFontName.toLowerCase()}`;
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @font-face {
          font-family: '${font.name.replace(/[\"']/g, '')}';
          src: url('${font.dataUrl}') format('${font.format}');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;
      document.head.appendChild(styleEl);
    }

    return true;
  } catch (error) {
    console.error(`Error al registrar la fuente ${font.name}:`, error);
    return false;
  }
};
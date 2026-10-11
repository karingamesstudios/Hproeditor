import JSZip from 'jszip';
import type { Page, EditorElement } from '../types/editor';
import type { CustomFont } from './fontLoader';
import { createExportIdMap, generateHTML, generateCSS } from './codeGenerator';

const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'pagina';
const escapeHTML = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function collectDataUrls(element: EditorElement, found = new Set<string>()): Set<string> {
  if (element.src?.startsWith('data:')) found.add(element.src);
  const scan = (value: unknown) => {
    if (typeof value === 'string') {
      const matches = value.match(/data:[^\s'"\)]+/g) || [];
      matches.filter(item => item.startsWith('data:image/')).forEach(item => found.add(item.replace(/[;,]$/, '')));
    } else if (value && typeof value === 'object') {
      Object.values(value as Record<string, unknown>).forEach(scan);
    }
  };
  scan(element.styles);
  scan(element.tabletStyles);
  scan(element.mobileStyles);
  element.children?.forEach(child => collectDataUrls(child, found));
  return found;
}
function decodeDataUrl(dataUrl: string): { mime: string; data: string | Uint8Array; base64: boolean } | null {
  const match = dataUrl.match(/^data:([^;,]+)?(;base64)?,([\s\S]*)$/i);
  if (!match) return null;
  const mime = match[1] || 'application/octet-stream';
  const base64 = Boolean(match[2]);
  try {
    if (base64) {
      const binary = atob(match[3]);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return { mime, data: bytes, base64: false };
    }
    return { mime, data: decodeURIComponent(match[3]), base64: false };
  } catch {
    return null;
  }
}

export async function exportProjectAsZip(pages: Page[], projectName = 'mi-sitio-web', customFonts: CustomFont[] = []) {
  if (!pages.length) throw new Error('No hay páginas para exportar.');
  const zip = new JSZip();
  // Todo el sitio queda contenido dentro de una carpeta con el nombre del proyecto.
  const projectFolder = zip.folder(slugify(projectName))!;
  const usedNames = new Set<string>();
  const pageFiles = new Map<string, string>();
  const idMaps = new Map<string, Map<EditorElement, string>>();

  pages.forEach((page, index) => {
    let file = index === 0 ? 'index.html' : `${slugify(page.slug || page.name)}.html`;
    const base = file.replace(/\.html$/i, '');
    let n = 2;
    while (usedNames.has(file.toLowerCase())) file = `${base}-${n++}.html`;
    usedNames.add(file.toLowerCase());
    pageFiles.set(page.id, file);
    // Los prefijos evitan IDs CSS repetidos entre páginas dentro de la hoja global.
    idMaps.set(page.id, createExportIdMap(page.document, `p${index + 1}-`));
  });

  const globalCSS = pages.map(page => generateCSS(page.document, idMaps.get(page.id))).join('\n\n');
  const fontsFolder = projectFolder.folder('assets/fonts');
  const fontFaceRules: string[] = [];
  const safeFontFile = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'custom-font';
  for (const font of customFonts) {
    const match = font.dataUrl.match(/^data:([^;,]+)?(;base64)?,([\s\S]*)$/i);
    if (!match) continue;
    let bytes: Uint8Array | string;
    try {
      if (match[2]) {
        const binary = atob(match[3]);
        bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      } else bytes = decodeURIComponent(match[3]);
    } catch { continue; }
    const extByFormat: Record<string, string> = { truetype: 'ttf', opentype: 'otf', woff: 'woff', woff2: 'woff2' };
    const ext = extByFormat[font.format] || 'ttf';
    const fileName = `${safeFontFile(font.name)}.${ext}`;
    fontsFolder?.file(fileName, bytes);
    const family = font.name.replace(/["']/g, '');
    const format = font.format === 'truetype' ? 'truetype' : font.format;
    fontFaceRules.push(`@font-face{font-family:'${family}';src:url('../assets/fonts/${fileName}') format('${format}');font-style:normal;font-weight:100 900;font-display:swap}`);
  }
  const googleFonts = '@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Anton&family=Archivo:wght@400;500;600;700;900&family=Bebas+Neue&family=Caveat:wght@400;600;700&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Dancing+Script:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Lato:wght@400;700;900&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Merriweather:wght@400;700;900&family=Montserrat:wght@400;500;600;700;800;900&family=Nunito:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@400;600;700;800&family=Open+Sans:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Pacifico&family=Playfair+Display:wght@400;500;600;700;800;900&family=PT+Serif:wght@400;700&family=Poppins:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=Raleway:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700;900&family=Rubik:wght@400;500;600;700;800;900&family=Source+Sans+3:wght@400;500;600;700;900&family=Space+Mono:wght@400;700&family=Ubuntu:wght@400;500;700&family=Work+Sans:wght@400;500;600;700;800&display=swap");';
  projectFolder.folder('css')?.file('style.css', `${googleFonts}\n*{box-sizing:border-box}html{scroll-behavior:smooth}html,body{margin:0;min-height:100%;width:100%;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}body{min-height:100vh}img{max-width:100%;height:auto;display:block}button,a{cursor:pointer}button{font:inherit}a{color:inherit}\n${fontFaceRules.join('\n')}\n\n${globalCSS}`);

  pages.forEach((page) => {
    const html = generateHTML(page.document, { pageFiles, ids: idMaps.get(page.id) });
    const full = `<!doctype html>\n<html lang="es">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${escapeHTML(page.name)} - ${escapeHTML(projectName)}</title>\n<link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n${html}\n</body>\n</html>`;
    projectFolder.file(pageFiles.get(page.id)!, full);
  });

  // Extraer imágenes incrustadas como data URLs a assets para mantener el HTML ligero.
  const assets = projectFolder.folder('assets');
  const dataAssets = new Map<string, string>();
  let assetIndex = 0;
  const allDataUrls = new Set<string>();
  pages.forEach(page => collectDataUrls(page.document, allDataUrls));
  for (const dataUrl of allDataUrls) {
    if (dataAssets.has(dataUrl)) continue;
    const decoded = decodeDataUrl(dataUrl);
    if (!decoded || !decoded.mime.toLowerCase().startsWith('image/')) continue;
    const extByMime: Record<string, string> = {
      'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp',
      'image/svg+xml': 'svg', 'image/avif': 'avif', 'image/bmp': 'bmp', 'image/x-icon': 'ico'
    };
    const ext = extByMime[decoded.mime.toLowerCase()] || 'bin';
    const file = `assets/imagen-${++assetIndex}.${ext}`;
    assets?.file(file.replace(/^assets\//, ''), decoded.data);
    dataAssets.set(dataUrl, file);
  }

  for (const page of pages) {
    const file = pageFiles.get(page.id);
    if (!file) continue;
    const zipFile = projectFolder.file(file);
    if (!zipFile) continue;
    let html = await zipFile.async('string');
    for (const [dataUrl, assetPath] of dataAssets) {
      html = html.split(dataUrl).join(assetPath);
      html = html.split(dataUrl.replace(/&/g, '&amp;')).join(assetPath);
    }
    projectFolder.file(file, html);
  }
  const cssFile = projectFolder.file('css/style.css');
  if (cssFile) {
    let css = await cssFile.async('string');
    for (const [dataUrl, assetPath] of dataAssets) css = css.split(dataUrl).join(`../${assetPath}`);
    projectFolder.file('css/style.css', css);
  }

  projectFolder.file('LEEME.txt', `Proyecto exportado desde Hproeditor\n\n- Abre la carpeta del proyecto y luego index.html para iniciar el sitio.\n- Cada hoja tiene su propio archivo HTML dentro de esta carpeta.\n- Los estilos compartidos están en css/style.css.\n- Las imágenes incrustadas se guardan en assets/.\n- Mantén la estructura de carpetas al mover o publicar el sitio.\n- Los enlaces entre páginas del proyecto apuntan a sus archivos HTML.\n- Las fuentes personalizadas se guardan en assets/fonts/.\n- Las fuentes de Google requieren conexión a Internet; las fuentes importadas viajan dentro del ZIP.\n`);
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slugify(projectName)}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

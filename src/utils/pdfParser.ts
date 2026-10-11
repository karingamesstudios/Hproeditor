import type { EditorElement } from '../types/editor';

export interface ParsedPdfPage {
  pageNumber: number;
  title: string;
  document: EditorElement;
  bgImageDataUrl?: string;
}

/**
 * Normaliza cadenas de texto eliminando tildes, acentos y caracteres especiales
 */
function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Calcula la similitud entre cadenas de texto (0.0 a 1.0)
 */
function textSimilarity(a: string, b: string): number {
  const normA = normalizeText(a);
  const normB = normalizeText(b);
  if (normA === normB) return 1.0;
  if (!normA || !normB) return 0;
  if (normA.includes(normB) || normB.includes(normA)) {
    const minLen = Math.min(normA.length, normB.length);
    const maxLen = Math.max(normA.length, normB.length);
    return minLen / maxLen;
  }
  const getBigrams = (s: string) => {
    const bg = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) bg.add(s.slice(i, i + 2));
    return bg;
  };
  const bgA = getBigrams(normA);
  const bgB = getBigrams(normB);
  if (bgA.size === 0 || bgB.size === 0) return 0;
  let intersection = 0;
  bgA.forEach((gram) => {
    if (bgB.has(gram)) intersection++;
  });
  return (2.0 * intersection) / (bgA.size + bgB.size);
}

async function loadPdfJs(): Promise<any> {
  if ((window as any).pdfjsLib) {
    return (window as any).pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjs = (window as any).pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(pdfjs);
    };
    script.onerror = () => reject(new Error('No se pudo cargar la librería lectora de PDF'));
    document.head.appendChild(script);
  });
}

/**
 * Helper asíncrono para extraer objetos internos de imagen de forma segura
 */
function getPdfObject(objs: any, name: string): Promise<any> {
  return new Promise((resolve) => {
    if (!objs) return resolve(null);
    try {
      if (objs.has && !objs.has(name)) return resolve(null);
      objs.get(name, (obj: any) => resolve(obj));
    } catch {
      try {
        const directObj = objs.get(name);
        resolve(directObj);
      } catch {
        resolve(null);
      }
    }
  });
}

/**
 * Extrae objetos de imagen independientes del PDF como elementos movibles
 */
async function extractImagesFromPdfPage(
  page: any,
  pdfjsLib: any,
  pdfWidth: number,
  pdfHeight: number
): Promise<EditorElement[]> {
  const imageElements: EditorElement[] = [];
  try {
    const opList = await page.getOperatorList();
    const fnArray = opList.fnArray;
    const argsArray = opList.argsArray;

    let matrixStack: number[][] = [[1, 0, 0, 1, 0, 0]];

    const multiplyMatrices = (m1: number[], m2: number[]) => {
      const [a1, b1, c1, d1, e1, f1] = m1;
      const [a2, b2, c2, d2, e2, f2] = m2;
      return [
        a1 * a2 + c1 * b2,
        b1 * a2 + d1 * b2,
        a1 * c2 + c1 * d2,
        b1 * c2 + d1 * d2,
        a1 * e2 + c1 * f2 + e1,
        b1 * e2 + d1 * f2 + f1,
      ];
    };

    const getCurrentMatrix = () => matrixStack[matrixStack.length - 1];

    for (let i = 0; i < fnArray.length; i++) {
      const fn = fnArray[i];
      const args = argsArray[i];

      if (fn === pdfjsLib.OPS.save) {
        matrixStack.push([...getCurrentMatrix()]);
      } else if (fn === pdfjsLib.OPS.restore) {
        if (matrixStack.length > 1) matrixStack.pop();
      } else if (fn === pdfjsLib.OPS.transform) {
        matrixStack[matrixStack.length - 1] = multiplyMatrices(getCurrentMatrix(), args);
      } else if (
        fn === pdfjsLib.OPS.paintImageXObject ||
        fn === pdfjsLib.OPS.paintInlineImageXObject ||
        fn === pdfjsLib.OPS.paintImageMaskXObject
      ) {
        const imgName = args[0];
        const ctm = getCurrentMatrix();

        const scaleX = Math.sqrt(ctm[0] * ctm[0] + ctm[1] * ctm[1]);
        const scaleY = Math.sqrt(ctm[2] * ctm[2] + ctm[3] * ctm[3]);
        const pdfX = ctm[4];
        const pdfY = ctm[5];

        const widthPct = (scaleX / pdfWidth) * 100;
        const heightPct = (scaleY / pdfHeight) * 100;

        if (widthPct > 95 && heightPct > 95) continue;
        if (widthPct < 1.0 || heightPct < 1.0) continue;

        const leftPct = Math.max(0, Math.min(95, (pdfX / pdfWidth) * 100));
        const topPct = Math.max(0, Math.min(95, ((pdfHeight - pdfY - scaleY) / pdfHeight) * 100));

        let imgObj: any = null;
        if (page.objs) {
          imgObj = await getPdfObject(page.objs, imgName);
        }
        if (!imgObj && page.commonObjs) {
          imgObj = await getPdfObject(page.commonObjs, imgName);
        }

        if (!imgObj) continue;

        let dataUrl = '';
        const canvas = document.createElement('canvas');

        if (
          imgObj instanceof HTMLImageElement ||
          imgObj instanceof HTMLCanvasElement ||
          (typeof ImageBitmap !== 'undefined' && imgObj instanceof ImageBitmap)
        ) {
          canvas.width = imgObj.width || 300;
          canvas.height = imgObj.height || 300;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(imgObj, 0, 0);
            dataUrl = canvas.toDataURL('image/png');
          }
        } else if (imgObj.data && imgObj.width && imgObj.height) {
          canvas.width = imgObj.width;
          canvas.height = imgObj.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const imgData = ctx.createImageData(imgObj.width, imgObj.height);
            if (imgObj.kind === pdfjsLib.ImageKind.RGBA_32BPP) {
              imgData.data.set(imgObj.data);
            } else if (imgObj.kind === pdfjsLib.ImageKind.RGB_24BPP) {
              let j = 0;
              for (let k = 0; k < imgObj.data.length; k += 3) {
                imgData.data[j] = imgObj.data[k];
                imgData.data[j + 1] = imgObj.data[k + 1];
                imgData.data[j + 2] = imgObj.data[k + 2];
                imgData.data[j + 3] = 255;
                j += 4;
              }
            } else {
              let j = 0;
              for (let k = 0; k < imgObj.data.length; k++) {
                const val = imgObj.data[k];
                imgData.data[j] = val;
                imgData.data[j + 1] = val;
                imgData.data[j + 2] = val;
                imgData.data[j + 3] = 255;
                j += 4;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            dataUrl = canvas.toDataURL('image/png');
          }
        }

        if (dataUrl) {
          imageElements.push({
            id: `pdf-img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            type: 'image',
            name: `Foto / Ilustración`,
            src: dataUrl,
            styles: {
              position: 'absolute',
              left: `${leftPct.toFixed(2)}%`,
              top: `${topPct.toFixed(2)}%`,
              width: `${widthPct.toFixed(2)}%`,
              height: `${heightPct.toFixed(2)}%`,
              objectFit: 'contain',
              zIndex: '5',
              cursor: 'pointer',
              pointerEvents: 'auto',
            },
          });
        }
      }
    }
  } catch (err) {
    console.warn('Finalizada extracción de imágenes:', err);
  }
  return imageElements;
}

interface LineCandidate {
  y: number;
  minX: number;
  lineText: string;
  maxFontSize: number;
  hasAccents: boolean;
  isCentered: boolean;
}

/**
 * Convierte un PDF a páginas limpias, aislando los elementos interactivos del fondo.
 */
export async function parsePDFToPages(file: File): Promise<ParsedPdfPage[]> {
  if (!file || file.size === 0) throw new Error('El archivo PDF está vacío.');
  if (file.size > 80 * 1024 * 1024) {
    throw new Error('El PDF supera los 80 MB. Comprímelo o divide el documento e inténtalo de nuevo.');
  }
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    throw new Error('Selecciona un archivo PDF exportado desde Canva.');
  }

  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;
  const resultPages: ParsedPdfPage[] = [];

  try {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      // Renderizar la página completa, sin modificar la lista interna de operadores de PDF.js.
      // Esto evita que el texto aparezca duplicado encima del fondo, como ocurría con algunos PDF de Canva.
      const scale = Math.min(2, 2200 / Math.max(baseViewport.width, baseViewport.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) throw new Error(`No se pudo preparar el lienzo de la página ${pageNum}.`);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, background: '#ffffff' }).promise;
      const bgDataUrl = canvas.toDataURL('image/jpeg', 0.94);
      const pageRatio = baseViewport.width / baseViewport.height;

      // Reconstruir texto como objetos independientes. Se coloca una pequeña máscara
      // del color local detrás de cada línea para ocultar el texto que quedó en el fondo.
      // Los PDF no guardan necesariamente el color de fondo original, por lo que esta
      // técnica prioriza diseños con fondos planos (como muchas plantillas de Canva).
      const editableChildren: EditorElement[] = [];
      const textContent = await page.getTextContent();
      const textItems = (textContent.items || []).filter((item: any) => typeof item.str === 'string' && item.str.trim());
      const canvasScaleX = canvas.width / baseViewport.width;
      const canvasScaleY = canvas.height / baseViewport.height;
      const usedText = new Set<string>();

      // Toma una muestra del perímetro de una zona, no del punto de origen del texto
      // (que con frecuencia cae sobre un píxel de la propia letra). Funciona mejor
      // con fondos planos y evita muchas de las manchas oscuras de la versión anterior.
      const sampleBackground = (left: number, top: number, width: number, height: number): string => {
        const pad = Math.max(2, Math.round(Math.min(canvas.width, canvas.height) * 0.002));
        const x0 = Math.max(0, Math.min(canvas.width - 1, Math.round(left * canvasScaleX)));
        const y0 = Math.max(0, Math.min(canvas.height - 1, Math.round(top * canvasScaleY)));
        const x1 = Math.max(x0, Math.min(canvas.width - 1, Math.round((left + width) * canvasScaleX)));
        const y1 = Math.max(y0, Math.min(canvas.height - 1, Math.round((top + height) * canvasScaleY)));
        const points: Array<[number, number]> = [];
        for (let i = 0; i < 5; i++) {
          const t = i / 4;
          points.push(
            [Math.max(0, x0 - pad), Math.max(0, Math.min(canvas.height - 1, Math.round(y0 + (y1 - y0) * t)) )],
            [Math.min(canvas.width - 1, x1 + pad), Math.max(0, Math.min(canvas.height - 1, Math.round(y0 + (y1 - y0) * t)) )],
            [Math.max(0, Math.min(canvas.width - 1, Math.round(x0 + (x1 - x0) * t))), Math.max(0, y0 - pad)],
            [Math.max(0, Math.min(canvas.width - 1, Math.round(x0 + (x1 - x0) * t))), Math.min(canvas.height - 1, y1 + pad)],
          );
        }
        const colors: number[][] = [];
        for (const [px, py] of points) {
          try { const d = ctx.getImageData(px, py, 1, 1).data; colors.push([d[0], d[1], d[2]]); } catch { /* ignora muestras fuera del canvas */ }
        }
        if (!colors.length) return 'rgb(245, 243, 235)';
        const median = (arr: number[]) => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
        return `rgb(${median(colors.map(c => c[0]))}, ${median(colors.map(c => c[1]))}, ${median(colors.map(c => c[2]))})`;
      };

      for (const item of textItems) {
        const tx = pdfjsLib.Util.transform(baseViewport.transform, item.transform);
        const fontHeight = Math.max(8, Math.abs(tx[3]) || Math.hypot(tx[2], tx[3]));
        const x = Math.max(0, tx[4]);
        const y = Math.max(0, tx[5] - fontHeight);
        const width = Math.max(fontHeight * 0.6, item.width || fontHeight * item.str.length * 0.5);
        const height = Math.max(fontHeight * 1.25, fontHeight + 2);
        const leftPct = Math.max(0, Math.min(99, (x / baseViewport.width) * 100));
        const topPct = Math.max(0, Math.min(99, (y / baseViewport.height) * 100));
        const widthPct = Math.max(1, Math.min(100 - leftPct, (width / baseViewport.width) * 100));
        const heightPct = Math.max(1, Math.min(100 - topPct, (height / baseViewport.height) * 100));
        const key = `${item.str.trim()}-${Math.round(leftPct)}-${Math.round(topPct)}`;
        if (usedText.has(key)) continue;
        usedText.add(key);

        // No colocar máscaras de color sobre el PDF: el editor puede pintar las máscaras
        // por encima del texto reconstruido y ocultarlo (el cuadro vacío visto en la importación).
        // Conservamos el texto original como objeto editable; la limpieza del fondo se tratará
        // por separado con una reconstrucción real, no con rectángulos aproximados.
        editableChildren.push({
          id: `pdf-text-${pageNum}-${editableChildren.length}`,
          type: 'text',
          name: item.str.trim().slice(0, 48) || 'Texto PDF',
          content: item.str,
          styles: { position: 'absolute', left: `${leftPct}%`, top: `${topPct}%`, width: `${widthPct}%`, minHeight: `${heightPct}%`, fontSize: `${Math.max(8, fontHeight)}px`, lineHeight: '1.05', color: '#111111', whiteSpace: 'pre-wrap', overflow: 'visible', zIndex: '3', cursor: 'move' },
        });
      }

      // No superponer imágenes extraídas sobre la página completa: eso duplica las
      // ilustraciones, porque siguen presentes en bgDataUrl. Para mover una imagen
      // sin dejar una copia detrás, primero hace falta reconstruir/limpiar el fondo.
      // Se mantiene la función de extracción disponible para una futura estrategia
      // que elimine correctamente la imagen de la capa de fondo.

      const pageDocument: EditorElement = {
        id: `root-body-p${pageNum}-${Date.now()}`,
        type: 'container',
        name: `Página PDF ${pageNum}`,
        styles: {
          position: 'relative',
          width: '100%',
          aspectRatio: String(pageRatio),
          backgroundColor: '#ffffff',
          backgroundImage: `url("${bgDataUrl}")`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'auto',
          overflow: 'hidden',
          borderRadius: '0px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        },
        // El fondo conserva el diseño original; texto e imágenes reconocidos son objetos
        // independientes que pueden seleccionarse, moverse y editarse en el canvas.
        children: editableChildren,
      };

      resultPages.push({
        pageNumber: pageNum,
        title: `Página ${pageNum}`,
        document: pageDocument,
        bgImageDataUrl: bgDataUrl,
      });
      canvas.width = 1;
      canvas.height = 1;
    }
  } finally {
    await pdf.destroy?.();
  }
  return resultPages;
}

/**
 * Une todas las diapositivas de un PDF conservando proporciones en un flujo vertical
 */
export function combinePdfPagesIntoSingleDocument(pages: ParsedPdfPage[], fileName: string): EditorElement {
  const combinedChildren: EditorElement[] = pages.map((page) => ({
    id: `pdf-section-p${page.pageNumber}-${Date.now()}`,
    type: 'section',
    name: `Sección Hoja ${page.pageNumber}`,
    styles: {
      position: 'relative',
      width: '100%',
      aspectRatio: '1.777',
      backgroundColor: '#ffffff',
      backgroundImage: page.bgImageDataUrl ? `url(${page.bgImageDataUrl})` : undefined,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '32px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    },
    children: page.document.children,
  }));

  return {
    id: 'root-body',
    type: 'container',
    name: `PDF Unificado: ${fileName}`,
    styles: {
      backgroundColor: '#09090b',
      color: '#ffffff',
      paddingTop: '32px',
      paddingBottom: '64px',
      paddingLeft: '24px',
      paddingRight: '24px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    children: combinedChildren,
  };
}
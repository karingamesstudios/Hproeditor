import type { Page } from '../types/editor';

export function downloadHproProject(pages: Page[], projectName: string = 'proyecto') {
  const dataStr = JSON.stringify({ version: '1.0', pages }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName.toLowerCase().replace(/\s+/g, '_')}.hpro`;
  link.click();
  URL.revokeObjectURL(url);
}

export function readHproProjectFile(file: File): Promise<Page[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.pages && Array.isArray(parsed.pages)) {
          resolve(parsed.pages);
        } else {
          reject(new Error('El archivo .hpro no contiene un formato de proyecto válido.'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo.'));
    reader.readAsText(file);
  });
}
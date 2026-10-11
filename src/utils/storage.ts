import type { Page } from '../types/editor';

const IS_EDITING_KEY = 'hproeditor_is_editing';
const EMERGENCY_SAVE_KEY = 'hproeditor_emergency_save';
const PAGES_STORAGE_KEY = 'hproeditor_pages';

export interface EmergencyBackup {
  timestamp: string;
  pages: Page[];
}

// Helper asíncrono para guardar grandes volúmenes de datos en IndexedDB sin límites de 5MB
const saveToIndexedDB = (key: string, data: any): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('HproeditorStorageDB', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('keyval');
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('keyval', 'readwrite');
        const store = tx.objectStore('keyval');
        store.put(JSON.stringify(data), key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      };
      request.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
};

const getFromIndexedDB = (key: string): Promise<any | null> => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('HproeditorStorageDB', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('keyval');
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('keyval', 'readonly');
        const store = tx.objectStore('keyval');
        const getReq = store.get(key);
        getReq.onsuccess = () => {
          try {
            resolve(getReq.result ? JSON.parse(getReq.result) : null);
          } catch {
            resolve(null);
          }
        };
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

// Guardar páginas del proyecto en almacenamiento de alta capacidad
export const saveProjectToStorage = async (pages: Page[]) => {
  try {
    if (!pages || pages.length === 0) return;

    await saveToIndexedDB(PAGES_STORAGE_KEY, pages);

    const backup: EmergencyBackup = {
      timestamp: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      pages,
    };

    await saveToIndexedDB(EMERGENCY_SAVE_KEY, backup);
  } catch (error) {
    console.warn('Advertencia en el guardado secundario:', error);
  }
};

// Cargar páginas guardadas desde IndexedDB
export const loadProjectFromStorage = async (): Promise<Page[] | null> => {
  return await getFromIndexedDB(PAGES_STORAGE_KEY);
};

// Obtener la copia de emergencia desde IndexedDB
export const getEmergencySave = async (): Promise<EmergencyBackup | null> => {
  return await getFromIndexedDB(EMERGENCY_SAVE_KEY);
};

// Guardar estado de edición (bandera booleana ligera en localStorage)
export const setEditingState = (isEditing: boolean) => {
  try {
    localStorage.setItem(IS_EDITING_KEY, isEditing ? 'true' : 'false');
  } catch {
    // Si falla localStorage, no interrumpe el flujo del editor
  }
};

export const getEditingState = (): boolean => {
  try {
    return localStorage.getItem(IS_EDITING_KEY) === 'true';
  } catch {
    return false;
  }
};
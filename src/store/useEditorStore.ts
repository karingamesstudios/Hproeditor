import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';
import type { EditorState, EditorElement, Page } from '../types/editor';
import type { CustomFont } from '../utils/fontLoader';

const DB_NAME = 'HproeditorDB';
const STORE_NAME = 'keyval';
const DB_VERSION = 2;

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const asyncIndexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get(name);
        getReq.onsuccess = () => resolve(getReq.result || null);
        getReq.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(value, name);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {}
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(name);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {}
  },
};

const initialDocument: EditorElement = {
  id: 'root-body',
  type: 'container',
  name: 'Body Principal',
  styles: {
    backgroundColor: '#09090b',
    color: '#f4f4f5',
    paddingTop: '32px',
    paddingBottom: '32px',
    paddingLeft: '32px',
    paddingRight: '32px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  children: [
    {
      id: 'heading-1',
      type: 'heading',
      name: 'Título Principal',
      content: 'Hola',
      styles: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
    {
      id: 'para-1',
      type: 'paragraph',
      name: 'Párrafo de Introducción',
      content: 'Esta es la página de inicio. Puedes agregar más páginas desde el panel lateral izquierdo.',
      styles: {
        fontSize: '16px',
        color: '#a1a1aa',
      },
    },
  ],
};

const initialPages: Page[] = [
  {
    id: 'page-home',
    name: 'Hoja 1',
    slug: 'hoja-1',
    path: '/',
    document: initialDocument,
  },
];

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      pages: initialPages,
      activePageId: 'page-home',
      selectedElementId: null,
      selectedElementIds: [],
      textCorrectorElementId: null,
      deviceViewport: 'desktop',
      customViewportWidth: null,
      zoomLevel: 1,

      history: [initialPages],
      historyIndex: 0,

      isCodeModalOpen: false,
      isImportModalOpen: false,
      isTemplatesModalOpen: false,

      customFonts: [],

      setTextCorrectorElementId: (id: string | null) => set({ textCorrectorElementId: id }),
      setIsCodeModalOpen: (open: boolean) => set({ isCodeModalOpen: open }),
      setIsImportModalOpen: (open: boolean) => set({ isImportModalOpen: open }),
      setIsTemplatesModalOpen: (open: boolean) => set({ isTemplatesModalOpen: open }),

      addCustomFont: (font: CustomFont) =>
        set((state) => ({
          customFonts: [
            ...state.customFonts.filter((f) => f.name !== font.name),
            font,
          ],
        })),

      getActiveDocument: () => {
        const state = get();
        const activePage = state.pages.find((p) => p.id === state.activePageId);
        return activePage ? activePage.document : state.pages[0].document;
      },

      selectElement: (id: string | null, additive = false) => set((state) => {
        if (!id) return { selectedElementId: null, selectedElementIds: [] };
        if (!additive) return { selectedElementId: id, selectedElementIds: [id] };
        const current = state.selectedElementIds?.length ? state.selectedElementIds : (state.selectedElementId ? [state.selectedElementId] : []);
        const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
        return { selectedElementId: next.includes(id) ? id : (next[next.length - 1] || null), selectedElementIds: next };
      }),

      setDeviceViewport: (viewport: 'desktop' | 'tablet' | 'mobile' | 'custom') =>
        set({ deviceViewport: viewport, customViewportWidth: null }),

      setCustomViewportWidth: (width: number | null) =>
        set({ customViewportWidth: width, deviceViewport: 'custom' }),

      setActivePage: (id: string) => set({ activePageId: id, selectedElementId: null, selectedElementIds: [] }),

      addPage: (name: string, customPath?: string) => {
        const id = `page-${Date.now()}`;
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const path = customPath || `/${slug}`;
        const newPage: Page = {
          id,
          name,
          slug,
          path,
          document: JSON.parse(JSON.stringify(initialDocument)),
        };
        const updatedPages = [...get().pages, newPage];

        set({
          pages: updatedPages,
          activePageId: id,
          history: [...get().history.slice(0, get().historyIndex + 1), updatedPages],
          historyIndex: get().historyIndex + 1,
        });
      },

      deletePage: (id: string) => {
        const state = get();
        if (state.pages.length <= 1) return;

        const updatedPages = state.pages.filter((p) => p.id !== id);
        const nextActiveId = state.activePageId === id ? updatedPages[0].id : state.activePageId;

        set({
          pages: updatedPages,
          activePageId: nextActiveId,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      setDocumentForActivePage: (doc: EditorElement) => {
        const state = get();
        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: doc } : p
        );

        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      setElementTargetPage: (id: string, targetPageId: string | null) => {
        const state = get();
        const updateNode = (el: EditorElement): EditorElement => {
          if (el.id === id) {
            return { ...el, targetPageId: targetPageId || undefined };
          }
          if (el.children) {
            return { ...el, children: el.children.map(updateNode) };
          }
          return el;
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );

        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      setElementLinkUrl: (id: string, linkUrl: string) => {
        const state = get();
        const updateNode = (el: EditorElement): EditorElement => {
          if (el.id === id) return { ...el, linkUrl: linkUrl.trim() || undefined };
          if (el.children) return { ...el, children: el.children.map(updateNode) };
          return el;
        };
        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );
        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      setElementType: (id: string, type: string) => {
        const state = get();
        const updateNode = (el: EditorElement): EditorElement => {
          if (el.id === id) return { ...el, type };
          if (el.children) return { ...el, children: el.children.map(updateNode) };
          return el;
        };
        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );
        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      updateElementStyles: (id: string, newStyles: any) => {
        const state = get();
        const targetIds = (state.selectedElementIds?.length || 0) > 1 && state.selectedElementIds.includes(id)
          ? state.selectedElementIds
          : [id];
        const updateNode = (el: EditorElement): EditorElement => {
          if (targetIds.includes(el.id)) {
            const viewport = state.deviceViewport;
            if (viewport === 'tablet') {
              return { ...el, tabletStyles: { ...(el.tabletStyles || {}), ...newStyles } };
            }
            if (viewport === 'mobile') {
              return { ...el, mobileStyles: { ...(el.mobileStyles || {}), ...newStyles } };
            }
            return { ...el, styles: { ...(el.styles || {}), ...newStyles } };
          }
          if (el.children) {
            return { ...el, children: el.children.map(updateNode) };
          }
          return el;
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );

        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      updateMultipleElementStyles: (updatesById: Record<string, Record<string, any>>) => {
        const state = get();
        const updateNode = (el: EditorElement): EditorElement => {
          const updates = updatesById[el.id];
          let next = el;
          if (updates) {
            const viewport = state.deviceViewport;
            if (viewport === 'tablet') next = { ...next, tabletStyles: { ...(next.tabletStyles || {}), ...updates } };
            else if (viewport === 'mobile') next = { ...next, mobileStyles: { ...(next.mobileStyles || {}), ...updates } };
            else next = { ...next, styles: { ...(next.styles || {}), ...updates } };
          }
          if (next.children) next = { ...next, children: next.children.map(updateNode) };
          return next;
        };
        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );
        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      updateElementContent: (id: string, content: string) => {
        const state = get();
        const updateNode = (el: EditorElement): EditorElement => {
          if (el.id === id) return { ...el, content };
          if (el.children) return { ...el, children: el.children.map(updateNode) };
          return el;
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: updateNode(p.document) } : p
        );

        // Registrar el cambio para que Ctrl+Z / Ctrl+Y también funcione con el texto.
        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      duplicateElement: (id: string) => {
        const state = get();
        const makeCloneWithFreshIds = (node: EditorElement): EditorElement => ({
          ...JSON.parse(JSON.stringify(node)),
          id: `el-${crypto.randomUUID()}`,
          children: node.children?.map(makeCloneWithFreshIds),
        });

        const duplicateNode = (el: EditorElement): { node: EditorElement; found: boolean } => {
          const children = el.children ?? [];
          const nextChildren: EditorElement[] = [];
          let found = false;

          for (const child of children) {
            if (child.id === id) {
              nextChildren.push(child, {
                ...makeCloneWithFreshIds(child),
                name: `${child.name} (Copia)`,
              });
              found = true;
            } else {
              const result = duplicateNode(child);
              nextChildren.push(result.node);
              found = found || result.found;
            }
          }

          return {
            node: el.children ? { ...el, children: nextChildren } : el,
            found,
          };
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId
            ? { ...p, document: duplicateNode(p.document).node }
            : p
        );

        set({
          pages: updatedPages,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      deleteElement: (id: string) => {
        const state = get();
        if (id === 'root-body') return;

        const filterNode = (el: EditorElement): EditorElement => {
          if (el.children) {
            return {
              ...el,
              children: el.children.filter((child) => child.id !== id).map(filterNode),
            };
          }
          return el;
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: filterNode(p.document) } : p
        );

        set({
          pages: updatedPages,
          selectedElementId: null,
          selectedElementIds: [],
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      addSectionTemplate: (templateElement: EditorElement) => {
        const state = get();
        const activeDoc = state.getActiveDocument();
        let selectedId = state.selectedElementId;

        const existsInDoc = (node: EditorElement, id: string): boolean => {
          if (node.id === id) return true;
          if (node.children) {
            return node.children.some((child) => existsInDoc(child, id));
          }
          return false;
        };

        if (selectedId && !existsInDoc(activeDoc, selectedId)) {
          selectedId = null;
        }

        const clone: EditorElement = JSON.parse(JSON.stringify(templateElement));
        const assignNewIds = (el: EditorElement): EditorElement => ({
          ...el,
          id: `el-${Math.random().toString(36).substring(2, 9)}`,
          children: el.children ? el.children.map(assignNewIds) : undefined,
        });
        const freshElement = assignNewIds(clone);

        const isLeafType = (type: string) =>
          ['heading', 'paragraph', 'button', 'image', 'text', 'shape'].includes(type);

        const insertIntoTree = (root: EditorElement): EditorElement => {
          if (!selectedId || selectedId === root.id) {
            return {
              ...root,
              children: [...(root.children || []), freshElement],
            };
          }

          const traverse = (node: EditorElement): EditorElement => {
            if (!node.children || node.children.length === 0) return node;

            const targetIndex = node.children.findIndex((child) => child.id === selectedId);

            if (targetIndex !== -1) {
              const targetChild = node.children[targetIndex];
              if (isLeafType(targetChild.type)) {
                const newChildren = [...node.children];
                newChildren.splice(targetIndex + 1, 0, freshElement);
                return { ...node, children: newChildren };
              } else {
                const newChildren = [...node.children];
                const targetContainer = newChildren[targetIndex];
                newChildren[targetIndex] = {
                  ...targetContainer,
                  children: [...(targetContainer.children || []), freshElement],
                };
                return { ...node, children: newChildren };
              }
            }

            return {
              ...node,
              children: node.children.map(traverse),
            };
          };

          return traverse(root);
        };

        const updatedPages = state.pages.map((p) =>
          p.id === state.activePageId ? { ...p, document: insertIntoTree(p.document) } : p
        );

        set({
          pages: updatedPages,
          selectedElementId: freshElement.id,
          history: [...state.history.slice(0, state.historyIndex + 1), updatedPages],
          historyIndex: state.historyIndex + 1,
        });
      },

      undo: () => {
        const { historyIndex, history } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({
            pages: JSON.parse(JSON.stringify(history[newIndex])),
            historyIndex: newIndex,
            selectedElementId: null,
          selectedElementIds: [],
          });
        }
      },

      redo: () => {
        const { historyIndex, history } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({
            pages: JSON.parse(JSON.stringify(history[newIndex])),
            historyIndex: newIndex,
            selectedElementId: null,
          selectedElementIds: [],
          });
        }
      },

      setZoomLevel: (zoomLevel: number) =>
        set({ zoomLevel: Math.min(Math.max(0.25, zoomLevel), 4) }),

      zoomIn: () =>
        set((state) => ({
          zoomLevel: Math.min(4, Math.round((state.zoomLevel + 0.1) * 10) / 10),
        })),

      zoomOut: () =>
        set((state) => ({
          zoomLevel: Math.max(0.25, Math.round((state.zoomLevel - 0.1) * 10) / 10),
        })),

      resetZoom: () => set({ zoomLevel: 1 }),
    }),
    {
      name: 'hproeditor-project-storage',
      storage: createJSONStorage(() => asyncIndexedDBStorage),
      partialize: (state) => ({
        pages: state.pages,
        activePageId: state.activePageId,
        customFonts: state.customFonts,
      }),
    }
  )
);
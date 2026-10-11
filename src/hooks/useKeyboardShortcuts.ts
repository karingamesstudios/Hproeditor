import { useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';

export const useKeyboardShortcuts = () => {
  const {
    undo,
    redo,
    duplicateElement,
    deleteElement,
    selectedElementId,
    selectElement,
    updateElementStyles,
    getActiveDocument,
  } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      
      // Comprobar si el usuario está escribiendo dentro de un campo de texto o editable
      const isEditingText =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // 1. DESHACER: Ctrl + Z (Funciona incluso con elemento seleccionado si no se edita texto dentro)
      if (isCtrlOrCmd && key === 'z' && !e.shiftKey) {
        if (!isEditingText) {
          e.preventDefault();
          undo();
        }
        return;
      }

      // 2. REHACER: Ctrl + Y  o  Ctrl + Shift + Z
      if ((isCtrlOrCmd && key === 'y') || (isCtrlOrCmd && e.shiftKey && key === 'z')) {
        if (!isEditingText) {
          e.preventDefault();
          redo();
        }
        return;
      }

      // 3. DUPLICAR: Ctrl + D
      if (isCtrlOrCmd && key === 'd') {
        if (selectedElementId && selectedElementId !== 'root-body') {
          e.preventDefault();
          duplicateElement(selectedElementId);
        }
        return;
      }

      // 4. GUARDAR: Ctrl + S (Evita la ventana predeterminada del navegador)
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        const state = useEditorStore.getState();
        localStorage.setItem('hproeditor_current_project', JSON.stringify(state.pages));
        alert('¡Proyecto guardado en el almacenamiento local!');
        return;
      }

      // 5. ELIMINAR: Delete / Supr / Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && !isEditingText) {
        if (selectedElementId && selectedElementId !== 'root-body') {
          e.preventDefault();
          deleteElement(selectedElementId);
        }
        return;
      }

      // 6. DESELECCIONAR / CANCELAR: Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        selectElement(null);
        if (isEditingText) {
          target.blur();
        }
        return;
      }

      // 7. SELECCIONAR PADRE O TODO: Ctrl + A
      if (isCtrlOrCmd && key === 'a' && !isEditingText) {
        e.preventDefault();
        const doc = getActiveDocument();
        if (doc && doc.children && doc.children.length > 0) {
          selectElement(doc.children[0].id);
        }
        return;
      }

      // 8. MOVER CON FLECHAS DEL TECLADO (Nudge para Modo Libre / Posicionamiento Absoluto)
      if (
        ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key) &&
        !isEditingText &&
        selectedElementId
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1; // Shift + Flechas para mover de a 10px
        
        const findEl = (el: any, id: string): any => {
          if (!el) return null;
          if (el.id === id) return el;
          if (Array.isArray(el.children)) {
            for (const child of el.children) {
              const found = findEl(child, id);
              if (found) return found;
            }
          }
          return null;
        };

        const doc = getActiveDocument();
        const el = findEl(doc, selectedElementId);

        if (el && el.styles?.position === 'absolute') {
          const currentTop = parseInt(el.styles.top || '0', 10);
          const currentLeft = parseInt(el.styles.left || '0', 10);

          if (key === 'arrowup') updateElementStyles(el.id, { top: `${currentTop - step}px` });
          if (key === 'arrowdown') updateElementStyles(el.id, { top: `${currentTop + step}px` });
          if (key === 'arrowleft') updateElementStyles(el.id, { left: `${currentLeft - step}px` });
          if (key === 'arrowright') updateElementStyles(el.id, { left: `${currentLeft + step}px` });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, duplicateElement, deleteElement, selectedElementId, selectElement, updateElementStyles, getActiveDocument]);
};
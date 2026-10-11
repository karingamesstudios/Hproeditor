import { useState, useCallback } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import type { ResizeDirection } from '../components/Canvas/ResizeHandles';

export function useCanvasDragAndResize(elementId: string, styles: Record<string, any>) {
  const { updateElementStyles, updateMultipleElementStyles, selectedElementIds, selectedElementId, getActiveDocument, deviceViewport } = useEditorStore();
  const [isInteracting, setIsInteracting] = useState(false);

  // Mover uno o varios elementos. Con selección múltiple todos conservan su separación.
  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setIsInteracting(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const ids = (selectedElementIds?.length ? selectedElementIds : [selectedElementId || elementId])
        .filter((id) => id && id !== 'root-body');
      const doc = getActiveDocument();
      const findNode = (node: any, id: string): any => {
        if (node?.id === id) return node;
        for (const child of node?.children || []) {
          const found = findNode(child, id);
          if (found) return found;
        }
        return null;
      };
      const startPositions: Record<string, { top: number; left: number; zIndex: any }> = {};
      ids.forEach((id) => {
        const node = findNode(doc, id);
        const nodeStyles = {
          ...(node?.styles || {}),
          ...(deviceViewport === 'tablet' ? node?.tabletStyles || {} : {}),
          ...(deviceViewport === 'mobile' ? node?.mobileStyles || {} : {}),
        };
        const wrapper = window.document.querySelector<HTMLElement>(`[data-editor-element-id="${CSS.escape(id)}"]`);
        startPositions[id] = {
          top: nodeStyles.position === 'absolute'
            ? (parseFloat(nodeStyles.top || '0') || 0)
            : (wrapper?.offsetTop || 0),
          left: nodeStyles.position === 'absolute'
            ? (parseFloat(nodeStyles.left || '0') || 0)
            : (wrapper?.offsetLeft || 0),
          zIndex: nodeStyles.zIndex || '10',
        };
      });

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        if (ids.length > 1) {
          const updates: Record<string, Record<string, any>> = {};
          ids.forEach((id) => {
            const start = startPositions[id];
            if (!start) return;
            updates[id] = {
              position: 'absolute',
              top: `${Math.max(0, start.top + deltaY)}px`,
              left: `${Math.max(0, start.left + deltaX)}px`,
              zIndex: start.zIndex,
            };
          });
          updateMultipleElementStyles(updates);
        } else {
          const start = startPositions[elementId] || startPositions[ids[0]];
          if (!start) return;
          updateElementStyles(ids[0] || elementId, {
            position: 'absolute',
            top: `${Math.max(0, start.top + deltaY)}px`,
            left: `${Math.max(0, start.left + deltaX)}px`,
            zIndex: start.zIndex,
          });
        }
      };

      const onMouseUp = () => {
        setIsInteracting(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [elementId, updateElementStyles, updateMultipleElementStyles, selectedElementIds, selectedElementId, getActiveDocument, deviceViewport]
  );

  // Redimensionar elemento en las 8 direcciones
  const startResize = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      e.stopPropagation();
      e.preventDefault();
      setIsInteracting(true);

      const startX = e.clientX;
      const startY = e.clientY;

      const targetEl = e.currentTarget.parentElement as HTMLElement;
      const initialRect = targetEl?.getBoundingClientRect();

      const startWidth = initialRect ? initialRect.width : parseInt(styles.width || '200', 10);
      const startHeight = initialRect ? initialRect.height : parseInt(styles.height || '100', 10);

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        const updates: Record<string, string> = {};

        if (direction.includes('e')) {
          updates.width = `${Math.max(40, startWidth + deltaX)}px`;
        } else if (direction.includes('w')) {
          updates.width = `${Math.max(40, startWidth - deltaX)}px`;
        }

        if (direction.includes('s')) {
          updates.height = `${Math.max(24, startHeight + deltaY)}px`;
        } else if (direction.includes('n')) {
          updates.height = `${Math.max(24, startHeight - deltaY)}px`;
        }

        updateElementStyles(elementId, updates);
      };

      const onMouseUp = () => {
        setIsInteracting(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [elementId, styles.width, styles.height, updateElementStyles]
  );

  return { startDrag, startResize, isInteracting };
}
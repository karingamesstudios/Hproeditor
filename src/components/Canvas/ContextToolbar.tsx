import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { useCanvasDragAndResize } from '../../hooks/useCanvasDragAndResize';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Copy,
  Trash2,
  Sparkles,
  Move,
} from 'lucide-react';

export const ContextToolbar: React.FC = () => {
  const {
    selectedElementId,
    getActiveDocument,
    updateElementStyles,
    duplicateElement,
    deleteElement,
    setTextCorrectorElementId,
  } = useEditorStore();

  if (!selectedElementId) return null;

  const document = getActiveDocument();
  const findElement = (node: any, id: string): any => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findElement(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedElement = findElement(document, selectedElementId);
  if (!selectedElement) return null;

  const isRoot = selectedElement.id === 'root-body';
  const styles = selectedElement.styles || {};
  const isTextElement =
    selectedElement.type === 'heading' ||
    selectedElement.type === 'paragraph' ||
    selectedElement.type === 'button';

  const { startDrag } = useCanvasDragAndResize(selectedElementId, styles);

  const handleAlign = (alignment: 'left' | 'center' | 'right') => {
    updateElementStyles(selectedElementId, { textAlign: alignment });
  };

  // Extraer el ángulo de rotación para contrarrestarlo en la barra flotante
  const transformStr = styles.transform || '';
  const match = transformStr.match(/rotate\(([-?\d.]+)deg\)/);
  const rotationAngle = match ? parseFloat(match[1]) : 0;

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        transform: `translateX(-50%) rotate(${-rotationAngle}deg)`,
        transformOrigin: 'center center',
      }}
      className="absolute -top-14 left-1/2 z-50 bg-zinc-900/95 border border-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl px-2.5 py-1.5 flex items-center space-x-1 text-zinc-300 text-xs select-none animate-in fade-in zoom-in-95 duration-150 pointer-events-auto whitespace-nowrap w-max max-w-[90vw]"
    >
      {isTextElement && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTextCorrectorElementId(selectedElementId);
            }}
            className="px-2 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg flex items-center space-x-1 font-semibold text-[11px] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            title="Asistente de Texto e IA Ortográfica"
          >
            <Sparkles size={12} className="shrink-0" />
            <span className="whitespace-nowrap leading-none">IA / Corrector</span>
          </button>

          <div className="h-3.5 w-px bg-zinc-800/80 my-auto shrink-0" />
        </>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAlign('left');
        }}
        className={`p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer shrink-0 ${
          styles.textAlign === 'left' || !styles.textAlign ? 'text-indigo-400 bg-zinc-800' : 'text-zinc-400'
        }`}
        title="Alinear a la izquierda"
      >
        <AlignLeft size={13} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAlign('center');
        }}
        className={`p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer shrink-0 ${
          styles.textAlign === 'center' ? 'text-indigo-400 bg-zinc-800' : 'text-zinc-400'
        }`}
        title="Alinear al centro"
      >
        <AlignCenter size={13} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAlign('right');
        }}
        className={`p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer shrink-0 ${
          styles.textAlign === 'right' ? 'text-indigo-400 bg-zinc-800' : 'text-zinc-400'
        }`}
        title="Alinear a la derecha"
      >
        <AlignRight size={13} />
      </button>

      {!isRoot && (
        <>
          <div className="h-3.5 w-px bg-zinc-800/80 my-auto shrink-0" />

          <div
            onMouseDown={startDrag}
            className="p-1 text-zinc-400 hover:text-indigo-300 hover:bg-indigo-600/20 rounded transition-colors cursor-grab active:cursor-grabbing shrink-0"
            title="Mantén presionado y arrastra para mover el elemento"
          >
            <Move size={13} />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateElement(selectedElementId);
            }}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer shrink-0"
            title="Duplicar elemento"
          >
            <Copy size={13} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(selectedElementId);
            }}
            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors cursor-pointer shrink-0"
            title="Eliminar elemento"
          >
            <Trash2 size={13} />
          </button>
        </>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorElement } from '../../types/editor';
import { moveNodeInTree } from '../../utils/treeUtils';
import { ChevronRight, Trash2, GripVertical } from 'lucide-react';

interface LayerItemProps {
  element: EditorElement;
  depth?: number;
  onDropNode: (draggedId: string, targetId: string, pos: 'before' | 'after' | 'inside') => void;
}

const LayerItem: React.FC<LayerItemProps> = ({ element, depth = 0, onDropNode }) => {
  const { selectedElementId, selectedElementIds, selectElement, deleteElement } = useEditorStore();
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | 'inside' | null>(null);

  const isSelected = selectedElementId === element.id || (selectedElementIds || []).includes(element.id);
  const isRoot = element.id === 'root-body';

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', element.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRoot) {
      setDropPosition('inside');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;

    if (offsetY < rect.height * 0.25) {
      setDropPosition('before');
    } else if (offsetY > rect.height * 0.75) {
      setDropPosition('after');
    } else {
      setDropPosition('inside');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && draggedId !== element.id && dropPosition) {
      onDropNode(draggedId, element.id, dropPosition);
    }
    setDropPosition(null);
  };

  const dropClass =
    dropPosition === 'before'
      ? 'border-t-2 border-indigo-500'
      : dropPosition === 'after'
      ? 'border-b-2 border-indigo-500'
      : dropPosition === 'inside'
      ? 'bg-indigo-600/30 border border-indigo-400'
      : '';

  return (
    <div>
      <div
        draggable={!isRoot}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          selectElement(element.id, e.shiftKey);
        }}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`py-1.5 pr-3 flex items-center justify-between group cursor-pointer text-xs rounded-lg my-0.5 transition-all select-none ${dropClass} ${
          isSelected
            ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/20'
            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
        }`}
      >
        <div className="flex items-center space-x-1.5 truncate">
          {!isRoot && (
            <GripVertical size={12} className="text-zinc-600 group-hover:text-zinc-400 shrink-0 cursor-grab" />
          )}
          <ChevronRight
            size={12}
            className={element.children && element.children.length > 0 ? 'text-zinc-500 shrink-0' : 'opacity-0 shrink-0'}
          />
          <span className="truncate">{element.name}</span>
        </div>

        {!isRoot && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
            className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-0.5 rounded transition-opacity"
            title="Eliminar capa"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {element.children &&
        element.children.map((child) => (
          <LayerItem key={child.id} element={child} depth={depth + 1} onDropNode={onDropNode} />
        ))}
    </div>
  );
};

export const LayersTab: React.FC = () => {
  const { getActiveDocument, setDocumentForActivePage } = useEditorStore();
  const document = getActiveDocument();

  const handleDropNode = (draggedId: string, targetId: string, pos: 'before' | 'after' | 'inside') => {
    const updatedTree = moveNodeInTree(document, draggedId, targetId, pos);
    setDocumentForActivePage(updatedTree);
  };

  return (
    <div className="p-3 space-y-2 select-none">
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Estructura de Capas
        </span>
        <span className="text-[9px] text-zinc-600 font-mono">Arrastra para mover</span>
      </div>

      <LayerItem element={document} onDropNode={handleDropNode} />
    </div>
  );
};
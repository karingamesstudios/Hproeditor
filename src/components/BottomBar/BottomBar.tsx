import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export const BottomBar: React.FC = () => {
  const { deviceViewport, customViewportWidth, selectedElementId, getActiveDocument } =
    useEditorStore();

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

  const selectedElement = selectedElementId
    ? findElement(document, selectedElementId)
    : null;

  const widthLabel = customViewportWidth
    ? `${customViewportWidth}px`
    : deviceViewport === 'tablet'
    ? '768px'
    : deviceViewport === 'mobile'
    ? '390px'
    : '1440px';

  return (
    <footer className="h-7 bg-zinc-950 border-t border-zinc-800/80 px-3 flex items-center justify-between text-[10px] text-zinc-400 font-mono select-none shrink-0 z-10 w-full overflow-hidden">
      <div className="flex items-center space-x-2 truncate">
        <div className="flex items-center space-x-1 shrink-0">
          {deviceViewport === 'mobile' ? (
            <Smartphone size={11} className="text-indigo-400" />
          ) : deviceViewport === 'tablet' ? (
            <Tablet size={11} className="text-indigo-400" />
          ) : (
            <Monitor size={11} className="text-indigo-400" />
          )}
          <span className="text-zinc-300 font-semibold truncate">
            {deviceViewport.toUpperCase()} ({widthLabel})
          </span>
        </div>

        <span className="text-zinc-700 hidden sm:inline">|</span>

        <span className="truncate hidden sm:inline">
          ID: <span className="text-zinc-200">{selectedElementId || 'Ninguno'}</span>
        </span>
      </div>

      <div className="truncate text-right ml-2">
        <span className="text-zinc-500 truncate">
          {selectedElement ? selectedElement.name : 'Documento Activo'}
        </span>
      </div>
    </footer>
  );
};
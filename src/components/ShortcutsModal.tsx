import React from 'react';
import { createPortal } from 'react-dom';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Z', description: 'Deshacer última acción' },
    { key: 'Ctrl + Y', description: 'Rehacer acción' },
    { key: 'Barra Espaciadora + Arrastrar', description: 'Navegación / Paneo libre sobre el lienzo' },
    { key: 'Ctrl + Clic Izquierdo', description: 'Ir a la página/hoja enlazada' },
    { key: 'Ctrl + Rueda del Mouse', description: 'Zoom In / Zoom Out adaptativo' },
    { key: 'Clic Derecho', description: 'Abrir menú contextual (duplicar, eliminar, corrector)' },
    { key: 'Supr / Delete', description: 'Eliminar el elemento seleccionado' },
  ];

  return createPortal(
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
            <Keyboard size={18} />
            <h3 className="text-white">Atajos de Teclado & Trucos</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((sc, index) => (
            <div
              key={index}
              className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-xl flex items-center justify-between gap-3 text-xs"
            >
              <span className="text-zinc-300 font-medium">{sc.description}</span>
              <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700/80 rounded-md text-[10px] font-mono font-bold text-indigo-300 shrink-0 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
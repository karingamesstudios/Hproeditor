import React, { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import {
  Copy,
  Trash2,
  Heading,
  Type,
  MousePointerClick,
  Image as ImageIcon,
  Box,
  Wand2,
  Plus,
  ChevronRight,
  Paintbrush,
  ClipboardCheck,
} from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  elementId: string;
  onClose: () => void;
}

// Almacenamiento temporal de estilos copiados en memoria
let copiedStylesMemory: Record<string, any> | null = null;

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, elementId, onClose }) => {
  const {
    duplicateElement,
    deleteElement,
    addSectionTemplate,
    getActiveDocument,
    setTextCorrectorElementId,
    updateElementStyles,
  } = useEditorStore();

  const [showAddSubmenu, setShowAddSubmenu] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const selectedElement = findElement(document, elementId);
  const isTextElement =
    selectedElement?.type === 'heading' ||
    selectedElement?.type === 'paragraph' ||
    selectedElement?.type === 'button';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleCopyStyles = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedElement?.styles) {
      copiedStylesMemory = { ...selectedElement.styles };
      setCopiedStatus(true);
      setTimeout(() => onClose(), 600);
    }
  };

  const handlePasteStyles = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (copiedStylesMemory && selectedElement) {
      updateElementStyles(elementId, { ...copiedStylesMemory });
      onClose();
    }
  };

  const handleAddQuickElement = (
    type: 'heading' | 'paragraph' | 'button' | 'image' | 'container'
  ) => {
    const templates = {
      heading: {
        id: '',
        name: 'Título Nuevo',
        type: 'heading',
        content: 'Nuevo Encabezado',
        styles: { fontSize: '32px', fontWeight: 'bold', color: '#ffffff', marginBottom: '12px' },
      },
      paragraph: {
        id: '',
        name: 'Párrafo Nuevo',
        type: 'paragraph',
        content: 'Escribe aquí tu texto descriptivo.',
        styles: { fontSize: '16px', color: '#a1a1aa', marginBottom: '12px' },
      },
      button: {
        id: '',
        name: 'Botón Nuevo',
        type: 'button',
        content: 'Haz Clic Aquí',
        styles: { backgroundColor: '#4f46e5', color: '#ffffff', padding: '10px 20px', borderRadius: '10px', fontWeight: '600' },
      },
      image: {
        id: '',
        name: 'Imagen Nueva',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
        styles: { width: '100%', borderRadius: '12px', marginTop: '8px', marginBottom: '8px' },
      },
      container: {
        id: '',
        name: 'Contenedor',
        type: 'container',
        styles: { padding: '20px', backgroundColor: '#18181b', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' },
        children: [],
      },
    };

    addSectionTemplate(templates[type] as any);
    onClose();
  };

  const menuWidth = 220;
  const menuHeight = 280;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);

  return (
    <div
      ref={menuRef}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
      className="fixed z-[100] w-52 bg-zinc-900/95 border border-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl py-1.5 text-xs text-zinc-200 select-none animate-in fade-in zoom-in-95 duration-150"
    >
      <div
        className="relative"
        onMouseEnter={() => setShowAddSubmenu(true)}
        onMouseLeave={() => setShowAddSubmenu(false)}
      >
        <button
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full px-3 py-2 flex items-center justify-between hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer font-medium"
        >
          <div className="flex items-center space-x-2">
            <Plus size={14} className="text-indigo-400" />
            <span>Añadir elemento</span>
          </div>
          <ChevronRight size={14} className="text-zinc-500" />
        </button>

        {showAddSubmenu && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-full top-0 ml-1 w-44 bg-zinc-900/95 border border-zinc-800/90 backdrop-blur-xl rounded-xl shadow-2xl py-1.5 animate-in fade-in slide-in-from-left-2 duration-150"
          >
            <button onClick={(e) => { e.stopPropagation(); handleAddQuickElement('heading'); }} className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer">
              <Heading size={13} className="text-indigo-400" />
              <span>Título</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleAddQuickElement('paragraph'); }} className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer">
              <Type size={13} className="text-indigo-400" />
              <span>Párrafo</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleAddQuickElement('button'); }} className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer">
              <MousePointerClick size={13} className="text-indigo-400" />
              <span>Botón</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleAddQuickElement('image'); }} className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer">
              <ImageIcon size={13} className="text-indigo-400" />
              <span>Imagen</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleAddQuickElement('container'); }} className="w-full px-3 py-1.5 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer">
              <Box size={13} className="text-indigo-400" />
              <span>Contenedor</span>
            </button>
          </div>
        )}
      </div>

      {isTextElement && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTextCorrectorElementId(elementId);
            onClose();
          }}
          className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer"
        >
          <Wand2 size={14} className="text-indigo-400" />
          <span>Corrector / Ortografía</span>
        </button>
      )}

      <div className="h-px bg-zinc-800/80 my-1" />

      {/* Copiar / Pegar Estilos */}
      <button
        onClick={handleCopyStyles}
        className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-zinc-800/60 transition-colors text-left cursor-pointer"
      >
        {copiedStatus ? (
          <>
            <ClipboardCheck size={14} className="text-emerald-400" />
            <span className="text-emerald-300 font-bold">¡Estilos copiados!</span>
          </>
        ) : (
          <>
            <Paintbrush size={14} className="text-indigo-400" />
            <span>Copiar estilos</span>
          </>
        )}
      </button>

      {copiedStylesMemory && (
        <button
          onClick={handlePasteStyles}
          className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors text-left cursor-pointer"
        >
          <Paintbrush size={14} className="text-emerald-400" />
          <span>Pegar estilos</span>
        </button>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          duplicateElement(elementId);
          onClose();
        }}
        className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-zinc-800/60 transition-colors text-left cursor-pointer"
      >
        <Copy size={14} className="text-zinc-400" />
        <span>Duplicar elemento</span>
      </button>

      <div className="h-px bg-zinc-800/80 my-1" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteElement(elementId);
          onClose();
        }}
        className="w-full px-3 py-2 flex items-center space-x-2 hover:bg-red-500/20 text-red-400 transition-colors text-left cursor-pointer font-medium"
      >
        <Trash2 size={14} />
        <span>Eliminar</span>
      </button>
    </div>
  );
};
import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorElement } from '../../types/editor';
import { Code, Tag, Hash } from 'lucide-react';

interface AdvancedSectionProps {
  element: EditorElement;
}

export const AdvancedSection: React.FC<AdvancedSectionProps> = ({ element }) => {
  const { setDocumentForActivePage, getActiveDocument } = useEditorStore();

  const handleUpdateProperty = (key: string, value: string) => {
    const activeDoc = getActiveDocument();
    
    const updateNode = (node: EditorElement): EditorElement => {
      if (node.id === element.id) {
        if (key === 'type') {
          return { ...node, type: value };
        }
        if (key === 'customClass') {
          return {
            ...node,
            styles: { ...node.styles, customClass: value },
          };
        }
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateNode) };
      }
      return node;
    };

    setDocumentForActivePage(updateNode(activeDoc));
  };

  const htmlTags = [
    { label: 'Contenedor (div)', value: 'container' },
    { label: 'Encabezado (header)', value: 'header' },
    { label: 'Navegación (nav)', value: 'nav' },
    { label: 'Sección (section)', value: 'section' },
    { label: 'Artículo (article)', value: 'article' },
    { label: 'Pie de Página (footer)', value: 'footer' },
    { label: 'Título (heading)', value: 'heading' },
    { label: 'Párrafo (paragraph)', value: 'paragraph' },
    { label: 'Botón (button)', value: 'button' },
    { label: 'Imagen (image)', value: 'image' },
  ];

  return (
    <div className="space-y-3 pt-3 border-t border-zinc-800">
      <div className="flex items-center space-x-1.5 text-zinc-400">
        <Code size={13} className="text-indigo-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Avanzado & Semántica HTML</span>
      </div>

      {/* Cambiar Etiqueta Semántica HTML */}
      <div>
        <label className="text-[10px] text-zinc-400 mb-1 flex items-center space-x-1">
          <Tag size={11} />
          <span>Etiqueta Semántica</span>
        </label>
        <select
          value={element.type || 'container'}
          onChange={(e) => handleUpdateProperty('type', e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {htmlTags.map((tag) => (
            <option key={tag.value} value={tag.value}>
              {tag.label}
            </option>
          ))}
        </select>
      </div>

      {/* ID del Elemento (Lectura / Copia) */}
      <div>
        <label className="text-[10px] text-zinc-400 mb-1 flex items-center space-x-1">
          <Hash size={11} />
          <span>Identificador Único (ID)</span>
        </label>
        <input
          type="text"
          value={element.id}
          readOnly
          className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-lg px-2.5 py-1.5 text-zinc-500 font-mono text-[11px] select-all focus:outline-none cursor-not-allowed"
        />
      </div>

      {/* Clases CSS Personalizadas */}
      <div>
        <label className="text-[10px] text-zinc-400 mb-1 block">Clases CSS Adicionales</label>
        <input
          type="text"
          value={element.styles?.customClass || ''}
          onChange={(e) => handleUpdateProperty('customClass', e.target.value)}
          placeholder="ej: glass-card shadow-glow hover-scale"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
        />
      </div>
    </div>
  );
};
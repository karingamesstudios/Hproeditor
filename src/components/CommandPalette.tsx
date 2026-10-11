import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { 
  Search, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Undo, 
  Redo, 
  Plus, 
  Wand2 
} from 'lucide-react';
import { fixSpellingAndGrammar } from '../utils/textCorrector';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { 
    undo, 
    redo, 
    setDeviceViewport, 
    selectedElementId, 
    getActiveDocument, 
    updateElementContent, 
    addSectionTemplate 
  } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'fix-spell',
      label: 'Corregir Ortografía del Elemento',
      icon: Wand2,
      action: () => {
        const doc = getActiveDocument();
        const findEl = (el: any, id: string): any => {
          if (!el) return null;
          if (el.id === id) return el;
          if (el.children) {
            for (const c of el.children) {
              const res = findEl(c, id);
              if (res) return res;
            }
          }
          return null;
        };
        if (selectedElementId) {
          const el = findEl(doc, selectedElementId);
          if (el && el.content) {
            updateElementContent(el.id, fixSpellingAndGrammar(el.content));
          }
        }
      },
    },
    { id: 'view-desktop', label: 'Cambiar Vista a Escritorio', icon: Monitor, action: () => setDeviceViewport('desktop') },
    { id: 'view-tablet', label: 'Cambiar Vista a Tablet', icon: Tablet, action: () => setDeviceViewport('tablet') },
    { id: 'view-mobile', label: 'Cambiar Vista a Móvil', icon: Smartphone, action: () => setDeviceViewport('mobile') },
    { id: 'undo', label: 'Deshacer Último Cambio', icon: Undo, action: () => undo() },
    { id: 'redo', label: 'Rehacer Cambio', icon: Redo, action: () => redo() },
    {
      id: 'add-btn',
      label: 'Insertar Botón Interactivo',
      icon: Plus,
      action: () =>
        addSectionTemplate({
          id: `btn-${Date.now()}`,
          type: 'button',
          name: 'Botón',
          content: 'Nuevo Botón',
          styles: {
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '8px',
          },
        }),
    },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4 select-none">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3 border-b border-zinc-800 flex items-center space-x-3 px-4">
          <Search size={18} className="text-zinc-400" />
          <input
            type="text"
            autoFocus
            placeholder="Escribe una orden o busca una herramienta... (Esc para salir)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-100 focus:outline-none placeholder-zinc-500"
          />
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-500">No se encontraron acciones coincidentes.</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-indigo-600/20 hover:text-indigo-300 text-zinc-300 text-xs flex items-center space-x-3 transition-colors text-left cursor-pointer"
                >
                  <Icon size={16} className="text-indigo-400 shrink-0" />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
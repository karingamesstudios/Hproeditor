import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { FileText, Plus, Trash2 } from 'lucide-react';

export const PagesTab: React.FC = () => {
  const { pages, activePageId, setActivePage, addPage, deletePage } = useEditorStore();
  const [newPageName, setNewPageName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageName.trim()) return;
    const slug = newPageName.toLowerCase().replace(/\s+/g, '-') + '.html';
    addPage(newPageName.trim(), slug);
    setNewPageName('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 space-y-4 text-xs select-none">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Páginas del Sitio ({pages.length})
        </span>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-1 transition-colors"
          title="Agregar nueva página"
        >
          <Plus size={14} />
          <span className="text-[11px] font-medium">Nueva</span>
        </button>
      </div>

      <div className="space-y-1.5">
        {pages.map((page) => {
          const isActive = page.id === activePageId;
          return (
            <div
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isActive
                  ? 'bg-indigo-600/15 border-indigo-500/50 text-indigo-300 shadow-sm'
                  : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <FileText size={16} className={isActive ? 'text-indigo-400' : 'text-zinc-500'} />
                <div className="truncate">
                  <p className="font-semibold text-xs leading-none mb-1">{page.name}</p>
                  <p className="text-[10px] font-mono text-zinc-500">{page.slug}</p>
                </div>
              </div>

              {pages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePage(page.id);
                  }}
                  className="text-zinc-600 hover:text-red-400 p-1 rounded transition-colors"
                  title="Eliminar página"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <form onSubmit={handleCreate} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3 mt-4">
          <p className="font-bold text-zinc-200 text-xs">Crear Nueva Página</p>
          <input
            type="text"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            placeholder="Ej: Contacto, Nosotros, Servicios..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-100 focus:outline-none focus:border-indigo-500 text-xs"
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-md hover:text-zinc-200"
            >
              Cancelar
            </button>
            <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded-md font-medium">
              Crear Página
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
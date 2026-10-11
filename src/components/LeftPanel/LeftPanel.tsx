import React, { useState } from 'react';
import { LayersTab } from './LayersTab';
import { PagesTab } from './PagesTab';
import { ComponentsTab } from './ComponentsTab';
import { Layers, FileText, PlusCircle } from 'lucide-react';

export const LeftPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'layers' | 'pages' | 'add'>('layers');

  return (
    <aside className="w-full h-full flex flex-col bg-transparent text-zinc-300 text-xs select-none overflow-x-hidden">
      {/* Pestañas del Panel Izquierdo */}
      <div className="flex items-center border-b border-zinc-800/80 bg-zinc-950/40 shrink-0 w-full">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-2.5 px-2 font-medium flex items-center justify-center space-x-1.5 border-b-2 transition-all cursor-pointer min-w-0 ${
            activeTab === 'layers'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
          }`}
        >
          <Layers size={14} className="shrink-0" />
          <span className="truncate">Capas</span>
        </button>

        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 py-2.5 px-2 font-medium flex items-center justify-center space-x-1.5 border-b-2 transition-all cursor-pointer min-w-0 ${
            activeTab === 'pages'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
          }`}
        >
          <FileText size={14} className="shrink-0" />
          <span className="truncate">Páginas</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-2.5 px-2 font-medium flex items-center justify-center space-x-1.5 border-b-2 transition-all cursor-pointer min-w-0 ${
            activeTab === 'add'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'
          }`}
        >
          <PlusCircle size={14} className="shrink-0" />
          <span className="truncate">Añadir</span>
        </button>
      </div>

      {/* Contenido de la Pestaña Activa */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 w-full">
        {activeTab === 'layers' && <LayersTab />}
        {activeTab === 'pages' && <PagesTab />}
        {activeTab === 'add' && <ComponentsTab />}
      </div>
    </aside>
  );
};
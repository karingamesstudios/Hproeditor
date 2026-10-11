import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { templates } from '../utils/templates';
import { loadProjectFromStorage } from '../utils/storage';
import { FilePlus, FolderOpen, LayoutTemplate, X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const { setDocumentForActivePage } = useEditorStore();

  if (!isOpen) return null;

  const handleSelectTemplate = (templateData: any) => {
    setDocumentForActivePage(templateData);
    onClose();
  };

  const handleLoadSaved = async () => {
    const saved = await loadProjectFromStorage();
    if (saved) {
      if (Array.isArray(saved)) {
        useEditorStore.setState({
          pages: saved,
          activePageId: saved[0]?.id || 'page-1',
        });
      } else {
        setDocumentForActivePage(saved);
      }
      onClose();
    } else {
      alert('No hay ningún proyecto guardado anteriormente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 text-lg">
              H
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100">Bienvenido a Hproeditor</h2>
              <p className="text-xs text-zinc-400">¿Cómo deseas comenzar tu proyecto hoy?</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-200 p-1 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <button
            onClick={handleLoadSaved}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 transition-all text-left group"
          >
            <div className="flex items-center space-x-3">
              <FolderOpen className="text-indigo-400 group-hover:scale-110 transition-transform" size={20} />
              <div>
                <p className="text-xs font-semibold text-indigo-300">Cargar Proyecto Guardado</p>
                <p className="text-[11px] text-zinc-400">Restaura el último estado guardado en tu navegador</p>
              </div>
            </div>
            <span className="text-xs font-medium text-indigo-400">Restaurar →</span>
          </button>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-3">
              Plantillas de Inicio
            </span>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl.data)}
                  className="p-4 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-indigo-500/50 transition-all text-left flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center space-x-2 text-zinc-300 group-hover:text-indigo-400">
                    {tpl.id === 'blank' ? <FilePlus size={18} /> : <LayoutTemplate size={18} />}
                    <span className="text-xs font-bold">{tpl.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{tpl.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
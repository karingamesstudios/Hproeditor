import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditorStore } from '../store/useEditorStore';
import { Search, Globe, X, Sparkles, Check, Share2 } from 'lucide-react';

interface SEOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SEOModal: React.FC<SEOModalProps> = ({ isOpen, onClose }) => {
  const { pages, activePageId } = useEditorStore();
  const activePage = pages.find((p) => p.id === activePageId) || pages[0];

  const [metaTitle, setMetaTitle] = useState(activePage?.name || 'Mi Sitio Web');
  const [metaDescription, setMetaDescription] = useState(
    'Crea y descubre experiencias digitales increíbles construidas con Hproeditor.'
  );
  const [ogImage, setOgImage] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop'
  );
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return createPortal(
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Encabezado */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
            <Globe size={18} />
            <h3 className="text-white">Configuración SEO & Redes Sociales ({activePage?.name})</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulario + Previsualización */}
        <div className="p-5 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Título SEO (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: Mi Sitio Oficial | Hproeditor"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Meta Descripción
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={2}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
                placeholder="Breve resumen del contenido para los motores de búsqueda..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  URL Imagen Open Graph (OG Image)
                </label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Ruta Favicon (.ico / .png)
                </label>
                <input
                  type="text"
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
              Previsualización en Google & Redes
            </span>

            <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 space-y-1">
              <div className="flex items-center space-x-2 text-[11px] text-zinc-400">
                <Search size={12} className="text-zinc-500" />
                <span className="truncate">https://tusitio.com{activePage?.path || '/'}</span>
              </div>
              <h4 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer truncate">
                {metaTitle || 'Título de la página'}
              </h4>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {metaDescription || 'Sin descripción configurada.'}
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl overflow-hidden max-w-sm">
              <div className="h-32 bg-zinc-900 overflow-hidden relative">
                <img
                  src={ogImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop';
                  }}
                  alt="Vista Previa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] text-white flex items-center space-x-1">
                  <Share2 size={10} />
                  <span>Vista Previa Redes</span>
                </div>
              </div>
              <div className="p-3 bg-zinc-900/90 border-t border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">TUSITIO.COM</span>
                <h5 className="font-bold text-xs text-zinc-200 truncate">{metaTitle}</h5>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{metaDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>¡Guardado!</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Guardar SEO</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
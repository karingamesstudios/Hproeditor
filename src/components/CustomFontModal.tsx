import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { registerCustomFont } from '../utils/fontLoader';
import { Type, Upload, X, Check, AlertCircle } from 'lucide-react';

interface CustomFontModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomFontModal: React.FC<CustomFontModalProps> = ({ isOpen, onClose }) => {
  const { addCustomFont } = useEditorStore();
  const [fontName, setFontName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['ttf', 'otf', 'woff', 'woff2'].includes(ext || '')) {
      setError('Formato no soportado. Usa archivos .TTF, .OTF, .WOFF o .WOFF2');
      return;
    }

    setError(null);
    setSelectedFile(file);
    const suggestedName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    setFontName(suggestedName);
  };

  const handleUpload = async () => {
    if (!selectedFile || !fontName.trim()) {
      setError('Escribe un nombre para la fuente y selecciona un archivo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const ext = selectedFile.name.split('.').pop()?.toLowerCase() || 'ttf';
      const formatMap: Record<string, string> = {
        ttf: 'truetype',
        otf: 'opentype',
        woff: 'woff',
        woff2: 'woff2',
      };

      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        const fontObj = {
          name: fontName.trim(),
          dataUrl,
          format: formatMap[ext] || 'truetype',
        };

        const success = await registerCustomFont(fontObj);
        if (success) {
          addCustomFont(fontObj);
          setIsLoading(false);
          setSelectedFile(null);
          setFontName('');
          onClose();
        } else {
          setError('No se pudo procesar la fuente. El archivo podría estar dañado.');
          setIsLoading(false);
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('Error al importar la fuente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Encabezado */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Type size={18} />
            <h3 className="text-sm font-bold text-white">Importar Fuente Tipográfica</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-red-300 text-xs">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Arrastrar y Soltar Archivos */}
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-zinc-700 hover:border-indigo-500/80 bg-zinc-950/60 hover:bg-indigo-500/5 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group"
          >
            <Upload size={28} className="text-zinc-500 group-hover:text-indigo-400 mb-2 transition-colors" />
            <span className="text-xs font-semibold text-zinc-300 group-hover:text-white text-center">
              {selectedFile ? selectedFile.name : 'Haz clic o arrastra un archivo .TTF, .OTF o .WOFF'}
            </span>
            <span className="text-[10px] text-zinc-500 mt-1">Soporta TTF, OTF, WOFF y WOFF2</span>
            <input
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Nombre de la Fuente */}
          <div>
            <label className="text-[10px] font-mono uppercase font-bold text-zinc-400 block mb-1">
              Nombre de la tipografía
            </label>
            <input
              type="text"
              value={fontName}
              onChange={(e) => setFontName(e.target.value)}
              placeholder="Ej: MiFuentePersonalizada"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Check size={14} />
            <span>{isLoading ? 'Cargando...' : 'Añadir al Editor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
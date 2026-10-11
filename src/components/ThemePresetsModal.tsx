import React from 'react';
import { createPortal } from 'react-dom';
import { useEditorStore } from '../store/useEditorStore';
import { Palette, X } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
  styles: Record<string, any>;
}

const PRESETS: Preset[] = [
  {
    id: 'frutiger-aero',
    name: 'Frutiger Aero / Aqua Glass',
    tagline: 'Estética futurista 2000s con degradados aqua y glassmorphism brillante.',
    accentColor: '#06b6d4',
    styles: {
      backgroundColor: '#031322',
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.25) 0%, transparent 70%), linear-gradient(180deg, #021b2d 0%, #050a14 100%)',
      color: '#e0f2fe',
      fontFamily: 'Inter',
    },
  },
  {
    id: 'dark-cyber',
    name: 'Dark Cyberpunk Neón',
    tagline: 'Fondo oscuro profundo con resplandores púrpura y magenta.',
    accentColor: '#a855f7',
    styles: {
      backgroundColor: '#090514',
      backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
      color: '#f3e8ff',
      fontFamily: 'Inter',
    },
  },
  {
    id: 'clean-minimal',
    name: 'Minimalista Corporativo',
    tagline: 'Lienzo blanco pulcro, contraste alto y tipografía elegante.',
    accentColor: '#2563eb',
    styles: {
      backgroundColor: '#ffffff',
      backgroundImage: 'none',
      color: '#0f172a',
      fontFamily: 'Inter',
    },
  },
];

interface ThemePresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePresetsModal: React.FC<ThemePresetsModalProps> = ({ isOpen, onClose }) => {
  const { updateElementStyles } = useEditorStore();

  if (!isOpen) return null;

  const handleApplyPreset = (preset: Preset) => {
    updateElementStyles('root-body', preset.styles);
    onClose();
  };

  return createPortal(
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Encabezado */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
            <Palette size={18} />
            <h3 className="text-white">Estilos Globales & Presets Visuales</h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de Presets */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-4 bg-zinc-950 border border-zinc-800/80 hover:border-indigo-500/80 rounded-xl cursor-pointer transition-all hover:scale-[1.01] group flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: preset.accentColor }}
                  />
                  <h4 className="font-bold text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors">
                    {preset.name}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{preset.tagline}</p>
              </div>

              <button className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer">
                Aplicar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
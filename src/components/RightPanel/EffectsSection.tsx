import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';

interface EffectsSectionProps {
  elementId: string;
  styles?: Record<string, any>;
}

export const EffectsSection: React.FC<EffectsSectionProps> = ({ elementId, styles = {} }) => {
  const { updateElementStyles } = useEditorStore();

  const handleStyleChange = (key: string, value: string) => {
    updateElementStyles(elementId, { [key]: value });
  };

  const shadowPresets = [
    { label: 'Ninguna', value: 'none' },
    { label: 'Suave', value: '0 4px 6px -1px rgba(0, 0, 0, 0.3)' },
    { label: 'Elevada', value: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' },
    { label: 'Resplandor Índigo', value: '0 0 20px rgba(99, 102, 241, 0.4)' },
    { label: 'Resplandor Violeta', value: '0 0 25px rgba(168, 85, 247, 0.4)' },
  ];

  const backdropPresets = [
    { label: 'Sin filtro', value: 'none' },
    { label: 'Cristal Suave', value: 'blur(8px)' },
    { label: 'Cristal Medio', value: 'blur(16px)' },
    { label: 'Cristal Intenso', value: 'blur(24px)' },
  ];

  const filterPresets = [
    { label: 'Original', value: 'none' },
    { label: 'Blanco y negro', value: 'grayscale(1)' },
    { label: 'Sepia', value: 'sepia(0.75)' },
    { label: 'Más contraste', value: 'contrast(1.2)' },
    { label: 'Saturación', value: 'saturate(1.5)' },
    { label: 'Desenfoque', value: 'blur(2px)' },
  ];

  return (
    <div className="space-y-3 pt-3 border-t border-zinc-800 select-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
        Efectos Visuales & Cristal
      </span>

      {/* Sombras Preconfiguradas */}
      <div>
        <label className="text-[11px] text-zinc-400 block mb-1">Sombra Paralela</label>
        <select
          value={styles.boxShadow || 'none'}
          onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {shadowPresets.map((preset) => (
            <option key={preset.label} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desenfoque Glassmorphism */}
      <div>
        <label className="text-[11px] text-zinc-400 block mb-1">Efecto Cristal (Backdrop Blur)</label>
        <select
          value={styles.backdropFilter || 'none'}
          onChange={(e) => handleStyleChange('backdropFilter', e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {backdropPresets.map((preset) => (
            <option key={preset.label} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* Opacidad y Transparencia */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-[11px] text-zinc-400">Opacidad</label>
          <span className="font-mono text-[10px] text-indigo-400">
            {Math.round(Number(styles.opacity ?? 1) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={styles.opacity ?? 1}
          onChange={(e) => handleStyleChange('opacity', e.target.value)}
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>


      {/* Filtros CSS */}
      <div>
        <label className="text-[11px] text-zinc-400 block mb-1">Filtro visual</label>
        <select
          value={styles.filter || 'none'}
          onChange={(e) => handleStyleChange('filter', e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {filterPresets.map((preset) => (
            <option key={preset.label} value={preset.value}>{preset.label}</option>
          ))}
        </select>
      </div>

      {/* Borde */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-zinc-400 block mb-1">Grosor del borde</label>
          <select
            value={styles.borderWidth || '0px'}
            onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {['0px', '1px', '2px', '3px', '4px'].map((width) => <option key={width} value={width}>{width}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] text-zinc-400 block mb-1">Color del borde</label>
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(styles.borderColor || '') ? styles.borderColor : '#6366f1'}
            onChange={(e) => handleStyleChange('borderColor', e.target.value)}
            className="w-full h-[30px] bg-zinc-950 border border-zinc-800 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Esquinas Redondeadas (Border Radius) */}
      <div>
        <label className="text-[11px] text-zinc-400 block mb-1">Redondeo de Esquinas</label>
        <div className="grid grid-cols-4 gap-1.5 text-[11px]">
          {['0px', '8px', '16px', '9999px'].map((radius) => (
            <button
              key={radius}
              onClick={() => handleStyleChange('borderRadius', radius)}
              className={`py-1 rounded border transition-colors cursor-pointer ${
                styles.borderRadius === radius
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {radius === '9999px' ? 'Full' : radius}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';

interface BoxModelInputProps {
  elementId: string;
  styles?: Record<string, any>;
}

export const BoxModelInput: React.FC<BoxModelInputProps> = ({ elementId, styles = {} }) => {
  const { updateElementStyles } = useEditorStore();

  const handleStyleChange = (key: string, value: string) => {
    updateElementStyles(elementId, { 
      [key]: value ? (value.endsWith('px') ? value : `${value}px`) : undefined 
    });
  };

  const getCleanVal = (val?: any) => {
    if (val === undefined || val === null) return '';
    return String(val).replace('px', '');
  };

  const safeStyles = styles || {};

  return (
    <div className="space-y-2 select-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
        Espaciado Visual (Box Model)
      </span>

      {/* MARGIN */}
      <div className="bg-zinc-950 border border-amber-500/30 rounded-xl p-2.5 relative text-[10px] font-mono">
        <span className="absolute top-1 left-2 text-[9px] text-amber-500 font-bold uppercase">Margin</span>

        <div className="flex justify-center mb-1">
          <input
            type="number"
            placeholder="0"
            value={getCleanVal(safeStyles.marginTop)}
            onChange={(e) => handleStyleChange('marginTop', e.target.value)}
            className="w-11 bg-zinc-900 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center justify-between my-1">
          <input
            type="number"
            placeholder="0"
            value={getCleanVal(safeStyles.marginLeft)}
            onChange={(e) => handleStyleChange('marginLeft', e.target.value)}
            className="w-11 bg-zinc-900 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
          />

          {/* PADDING */}
          <div className="flex-1 mx-2 bg-zinc-900/90 border border-indigo-500/30 rounded-lg p-2 relative">
            <span className="absolute top-1 left-2 text-[9px] text-indigo-400 font-bold uppercase">Padding</span>

            <div className="flex justify-center mb-1">
              <input
                type="number"
                placeholder="0"
                value={getCleanVal(safeStyles.paddingTop)}
                onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
                className="w-10 bg-zinc-950 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between my-1">
              <input
                type="number"
                placeholder="0"
                value={getCleanVal(safeStyles.paddingLeft)}
                onChange={(e) => handleStyleChange('paddingLeft', e.target.value)}
                className="w-10 bg-zinc-950 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />

              <div className="px-2 py-1 bg-zinc-950 border border-zinc-800/80 rounded text-center text-[9px] text-zinc-500 font-sans">
                Bloque
              </div>

              <input
                type="number"
                placeholder="0"
                value={getCleanVal(safeStyles.paddingRight)}
                onChange={(e) => handleStyleChange('paddingRight', e.target.value)}
                className="w-10 bg-zinc-950 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-center mt-1">
              <input
                type="number"
                placeholder="0"
                value={getCleanVal(safeStyles.paddingBottom)}
                onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
                className="w-10 bg-zinc-950 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <input
            type="number"
            placeholder="0"
            value={getCleanVal(safeStyles.marginRight)}
            onChange={(e) => handleStyleChange('marginRight', e.target.value)}
            className="w-11 bg-zinc-900 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex justify-center mt-1">
          <input
            type="number"
            placeholder="0"
            value={getCleanVal(safeStyles.marginBottom)}
            onChange={(e) => handleStyleChange('marginBottom', e.target.value)}
            className="w-11 bg-zinc-900 border border-zinc-800 rounded text-center py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </div>
  );
};
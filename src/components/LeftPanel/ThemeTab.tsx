import React, { useEffect, useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { Palette, Type, Upload, CheckCircle2 } from 'lucide-react';
import { CustomFontModal } from '../CustomFontModal';
import { registerCustomFont } from '../../utils/fontLoader';

export const ThemeTab: React.FC = () => {
  const { updateElementStyles, getActiveDocument, customFonts } = useEditorStore();
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  useEffect(() => { (customFonts || []).forEach((font) => { void registerCustomFont(font); }); }, [customFonts]);
  const document = getActiveDocument();

  const handleGlobalFontChange = (font: string) => {
    if (document) {
      updateElementStyles(document.id, { fontFamily: font });
    }
  };

  const handleGlobalBgChange = (color: string) => {
    if (document) {
      updateElementStyles(document.id, { backgroundColor: color });
    }
  };

  return (
    <div className="p-4 space-y-6 text-xs select-none">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Type size={16} />
          <span className="font-bold text-zinc-200">Tipografía Global</span>
        </div>

        <select
          value={document?.styles?.fontFamily || 'Inter'}
          onChange={(e) => handleGlobalFontChange(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
        >
          <optgroup label="Sans serif">
            {['Inter','Roboto','Open Sans','Lato','Montserrat','Poppins','Raleway','Nunito','Nunito Sans','Archivo','Outfit','Manrope','DM Sans','Work Sans','Rubik','Quicksand','Ubuntu','Source Sans 3'].map(font => <option key={font} value={font}>{font}</option>)}
          </optgroup>
          <optgroup label="Serif">
            {['Playfair Display','Merriweather','Lora','Libre Baskerville','Cormorant Garamond','Cinzel','PT Serif','Georgia','Times New Roman'].map(font => <option key={font} value={font}>{font}</option>)}
          </optgroup>
          <optgroup label="Display y manuscritas">
            {['Oswald','Bebas Neue','Anton','Abril Fatface','Dancing Script','Pacifico','Caveat'].map(font => <option key={font} value={font}>{font}</option>)}
          </optgroup>
          <optgroup label="Monoespaciadas">
            {['Fira Code','JetBrains Mono','Space Mono'].map(font => <option key={font} value={font}>{font}</option>)}
          </optgroup>
          {customFonts.length > 0 && <optgroup label="Fuentes importadas">{customFonts.map(font => <option key={font.name} value={font.name}>{font.name}</option>)}</optgroup>}
        </select>
        <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-950/70 p-2">
          <p className="text-base text-zinc-100" style={{ fontFamily: `"${document?.styles?.fontFamily || 'Inter'}", sans-serif` }}>Vista previa: Aa Bb Cc 123</p>
        </div>
        <button type="button" onClick={() => setIsFontModalOpen(true)} className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-200 px-3 py-2 font-semibold transition-colors">
          <Upload size={13} /> Añadir fuente (.TTF, .OTF, .WOFF, .WOFF2)
        </button>
        {customFonts.length > 0 && <p className="mt-1 text-[10px] text-emerald-300 flex items-center gap-1"><CheckCircle2 size={12}/>{customFonts.length} fuente(s) personalizadas guardadas</p>}
      </div>

      <div className="space-y-3 pt-4 border-t border-zinc-800">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Palette size={16} />
          <span className="font-bold text-zinc-200">Fondo General de Página</span>
        </div>

        <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-800 p-2 rounded-xl">
          <input
            type="color"
            onChange={(e) => handleGlobalBgChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
          />
          <span className="font-mono text-zinc-400 text-xs">Seleccionar Color Primario</span>
        </div>
      </div>
      <CustomFontModal isOpen={isFontModalOpen} onClose={() => setIsFontModalOpen(false)} />
    </div>
  );
};
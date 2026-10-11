import React, { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import {
  Type,
  Palette,
  SlidersHorizontal,
  Italic,
  Bold,
  Underline,
  MoveHorizontal,
  MoveVertical,
  Box,
  Maximize2,
  RotateCw,
  Link2,
  MousePointerClick,
  LayoutGrid,
  ExternalLink,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import { CustomFontModal } from '../CustomFontModal';
import { registerCustomFont } from '../../utils/fontLoader';

const DEFAULT_SYSTEM_FONTS = [
  { name: 'Inter', category: 'Sans serif' },
  { name: 'Roboto', category: 'Sans serif' },
  { name: 'Open Sans', category: 'Sans serif' },
  { name: 'Lato', category: 'Sans serif' },
  { name: 'Montserrat', category: 'Sans serif' },
  { name: 'Poppins', category: 'Sans serif' },
  { name: 'Raleway', category: 'Sans serif' },
  { name: 'Nunito', category: 'Sans serif' },
  { name: 'Nunito Sans', category: 'Sans serif' },
  { name: 'Oswald', category: 'Display' },
  { name: 'Bebas Neue', category: 'Display' },
  { name: 'Anton', category: 'Display' },
  { name: 'Archivo', category: 'Sans serif' },
  { name: 'Outfit', category: 'Sans serif' },
  { name: 'Manrope', category: 'Sans serif' },
  { name: 'DM Sans', category: 'Sans serif' },
  { name: 'Work Sans', category: 'Sans serif' },
  { name: 'Rubik', category: 'Sans serif' },
  { name: 'Quicksand', category: 'Sans serif' },
  { name: 'Ubuntu', category: 'Sans serif' },
  { name: 'Source Sans 3', category: 'Sans serif' },
  { name: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' },
  { name: 'Lora', category: 'Serif' },
  { name: 'Libre Baskerville', category: 'Serif' },
  { name: 'Cormorant Garamond', category: 'Serif' },
  { name: 'Cinzel', category: 'Serif' },
  { name: 'Abril Fatface', category: 'Display' },
  { name: 'PT Serif', category: 'Serif' },
  { name: 'Dancing Script', category: 'Manuscrita' },
  { name: 'Pacifico', category: 'Manuscrita' },
  { name: 'Caveat', category: 'Manuscrita' },
  { name: 'Fira Code', category: 'Monoespaciada' },
  { name: 'JetBrains Mono', category: 'Monoespaciada' },
  { name: 'Space Mono', category: 'Monoespaciada' },
  { name: 'Georgia', category: 'Sistema' },
  { name: 'Arial', category: 'Sistema' },
  { name: 'Verdana', category: 'Sistema' },
  { name: 'Times New Roman', category: 'Sistema' },
  { name: 'Trebuchet MS', category: 'Sistema' },
];

export const RightPanel: React.FC = () => {
  const [activeInspectorSection, setActiveInspectorSection] = useState('actions');
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const inspectorScrollRef = useRef<HTMLDivElement>(null);
  const {
    selectedElementId,
    selectedElementIds,
    deviceViewport,
    updateMultipleElementStyles,
    getActiveDocument,
    updateElementStyles,
    updateElementContent,
    customFonts,
    pages,
    activePageId,
    setElementTargetPage,
    setElementLinkUrl,
    setElementType,
  } = useEditorStore();

  useEffect(() => {
    (customFonts || []).forEach((font) => { void registerCustomFont(font); });
  }, [customFonts]);

  if (!selectedElementId) {
    return (
      <div className="p-6 text-center text-zinc-500 text-xs space-y-2 select-none h-full flex flex-col justify-center items-center">
        <SlidersHorizontal size={28} className="text-zinc-600" />
        <p className="font-semibold text-zinc-400">Inspector de Estilos</p>
        <p className="text-[11px] text-zinc-600">
          Selecciona cualquier elemento en el lienzo para ajustar sus propiedades.
        </p>
      </div>
    );
  }

  const activeDocument = getActiveDocument();

  const findElement = (node: any, id: string): any => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findElement(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const element = findElement(activeDocument, selectedElementId);
  if (!element) return null;

  const styles = {
    ...(element.styles || {}),
    ...(deviceViewport === 'tablet' ? element.tabletStyles || {} : {}),
    ...(deviceViewport === 'mobile' ? element.mobileStyles || {} : {}),
  };
  const selectedIds = selectedElementIds?.length ? selectedElementIds : [selectedElementId];
  const selectedElements = selectedIds.map((id) => findElement(activeDocument, id)).filter(Boolean);
  const isMultiSelection = selectedElements.length > 1;
  const getSharedDimension = (key: 'width' | 'height') => {
    const values = selectedElements.map((item: any) => {
      const activeStyles = {
        ...(item.styles || {}),
        ...(deviceViewport === 'tablet' ? item.tabletStyles || {} : {}),
        ...(deviceViewport === 'mobile' ? item.mobileStyles || {} : {}),
      };
      return activeStyles[key] ?? '';
    });
    return values.every((value: any) => value === values[0]) ? (values[0] || '') : '0';
  };
  const allFonts: Array<{ name: string; category?: string }> = [
    ...DEFAULT_SYSTEM_FONTS,
    ...(customFonts || []),
  ];

  const handleStyleChange = (key: string, value: any) => {
    if (isMultiSelection) {
      const updates: Record<string, Record<string, any>> = {};
      selectedIds.forEach((id) => { updates[id] = { [key]: value }; });
      updateMultipleElementStyles(updates);
    } else {
      updateElementStyles(selectedElementId, { [key]: value });
    }
  };

  const handleContentChange = (content: string) => {
    updateElementContent(selectedElementId, content);
  };

  const isItalic = styles.fontStyle === 'italic';
  const isBold = styles.fontWeight === 'bold' || parseInt(styles.fontWeight) >= 700;
  const isUnderline = styles.textDecoration === 'underline';
  const isTextType = ['heading', 'paragraph', 'button', 'link', 'text'].includes(element.type);
  const isRootElement = element.id === activeDocument.id || element.id === 'root-body' || /^(cuerpo principal|body principal)$/i.test(element.name || '');
  const canEditTypography = isTextType && !['image', 'shape'].includes(element.type);

  // Extraer rotación actual del string `rotate(Xdeg)`
  const currentRotation = parseInt(styles.transform?.replace(/[^0-9-]/g, '') || '0') || 0;

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#09090b] text-xs text-zinc-300 select-none">
      
      {/* Encabezado */}
      <div className="shrink-0 border-b border-zinc-800/80 px-4 pt-4 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">INSPECTOR</span>
          <h2 className="text-sm font-bold text-white truncate max-w-[180px]">{isMultiSelection ? `${selectedElements.length} elementos seleccionados` : (element.name || 'Elemento')}</h2>
          {isMultiSelection && <span className="text-[10px] text-indigo-300">Los cambios de estilo se aplican a todos</span>}
        </div>
        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">{isMultiSelection ? 'grupo' : element.type}</span>
      </div>

      {/* Navegación rápida del inspector */}
      <nav aria-label="Categorías del inspector" className="relative z-40 shrink-0 px-3 py-2 bg-[#09090b] border-b border-zinc-800 shadow-lg">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
          {[
            ...(!isRootElement ? [{ id: 'actions', label: 'Acciones', icon: MousePointerClick, target: 'inspector-section-actions' }] : []),
            ...(!isRootElement ? [{ id: 'layout', label: 'Diseño', icon: LayoutGrid, target: 'inspector-section-layout' }] : []),
            ...(!isRootElement ? [{ id: 'spacing', label: 'Espaciado', icon: Box, target: 'inspector-section-spacing' }] : []),
            ...(canEditTypography ? [{ id: 'text', label: 'Texto', icon: Type, target: 'inspector-section-typography' }] : []),
            { id: 'appearance', label: isRootElement ? 'Fondo' : 'Apariencia', icon: Palette, target: 'inspector-section-appearance' },
            ...(!isRootElement ? [{ id: 'borders', label: 'Bordes', icon: Maximize2, target: 'inspector-section-borders' }] : []),
            ...(!isRootElement ? [{ id: 'transform', label: 'Rotación', icon: RotateCw, target: 'inspector-section-transform' }] : []),
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveInspectorSection(item.id);
                  const panel = inspectorScrollRef.current;
                  const section = panel?.querySelector<HTMLElement>(`#${item.target}`);
                  if (panel && section) {
                    const panelRect = panel.getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();
                    const targetTop = panel.scrollTop + sectionRect.top - panelRect.top - 12;
                    panel.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
                  }
                }}
                className={`shrink-0 flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[10px] font-semibold transition-all border ${((isRootElement && item.id === 'appearance') || (!isRootElement && activeInspectorSection === item.id)) ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50' : 'bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:text-zinc-100 hover:border-zinc-700'}`}
              >
                <Icon size={12} />{item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div ref={inspectorScrollRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-6 space-y-6 overscroll-contain">
      {/* 1. Navegación y acciones: lo más importante */}
      {!isRootElement && <section id="inspector-section-actions" className="scroll-mt-4 space-y-4 rounded-xl border border-indigo-500/30 bg-indigo-950/15 p-4">
        <div className="flex items-center gap-1.5 text-indigo-200 font-bold">
          <MousePointerClick size={14} />
          <span>1. Navegación y acciones</span>
        </div>
        <p className="text-[10px] text-zinc-500">Convierte el elemento en un botón y define a dónde llevará al visitante.</p>
        {!isMultiSelection && <p className="text-[10px] text-zinc-600">Consejo: mantén Shift y haz clic en otros elementos para seleccionarlos juntos.</p>}
        <div className="space-y-1.5">
          <label className="text-[11px] text-zinc-400 block">Tipo de elemento</label>
          <select value={element.type} onChange={(e) => setElementType(selectedElementId, e.target.value)} className="w-full min-w-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500">
            <option value="button">Botón</option>
            <option value="link">Enlace</option>
            <option value="heading">Título</option>
            <option value="paragraph">Párrafo</option>
            <option value="container">Contenedor</option>
            <option value="section">Sección</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] text-zinc-300 flex items-center gap-1"><Link2 size={12}/> Destino del botón o enlace</label>
          <select value={element.targetPageId || ''} onChange={(e) => setElementTargetPage(selectedElementId, e.target.value || null)} className="w-full min-w-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-3 text-zinc-100 focus:outline-none focus:border-indigo-500">
            <option value="">No navegar a una página</option>
            {pages.length > 0 && <optgroup label="Páginas de este proyecto">{pages.map((page) => <option key={page.id} value={page.id}>{page.name}{page.id === activePageId ? ' · página actual' : ''}{page.path ? ` (${page.path})` : ''}</option>)}</optgroup>}
          </select>
          {element.targetPageId && <p className="text-[10px] text-emerald-400">Destino seleccionado: {pages.find((page) => page.id === element.targetPageId)?.name || 'página del proyecto'}. Puedes cambiarlo aquí en cualquier momento.</p>}
          {pages.length <= 1 && <p className="text-[10px] text-amber-400">Todavía tienes una sola página. Usa «Páginas → Nueva» para crear otra y poder enlazarla.</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] text-zinc-400 flex items-center gap-1"><ExternalLink size={12}/> URL externa (opcional)</label>
          <input type="url" value={element.linkUrl || ''} onChange={(e) => setElementLinkUrl(selectedElementId, e.target.value)} placeholder="https://ejemplo.com" className="w-full min-w-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500" />
          <p className="text-[10px] text-zinc-500">Al exportar, el botón/enlace abrirá esta dirección. Si se define, tiene prioridad sobre la página interna.</p>
        </div>
        <button onClick={() => { setElementType(selectedElementId, 'button'); handleStyleChange('display', 'inline-flex'); handleStyleChange('alignItems', 'center'); handleStyleChange('justifyContent', 'center'); handleStyleChange('padding', '12px 20px'); handleStyleChange('borderRadius', '10px'); handleStyleChange('backgroundColor', '#4f46e5'); handleStyleChange('color', '#ffffff'); handleStyleChange('fontWeight', '700'); }} className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 transition-colors">
          <MousePointerClick size={14}/> Convertir en botón estilizado
        </button>
      </section>}

      {/* 2. Diseño y dimensiones */}
      {!isRootElement && <section id="inspector-section-layout" className="scroll-mt-4 space-y-4 pt-2 border-t border-zinc-800/80">
        <div className="flex items-center gap-1.5 text-indigo-300 font-bold"><LayoutGrid size={14}/><span>2. Diseño y dimensiones</span></div>
        {isMultiSelection && <p className="text-[10px] text-zinc-500">Si el ancho o alto muestra 0, los elementos tienen medidas diferentes. Al escribir un valor, se aplicará a todos.</p>}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Ancho</label><input type="text" value={isMultiSelection ? getSharedDimension('width') : (styles.width || '')} onChange={(e) => handleStyleChange('width', e.target.value)} placeholder="auto / 100%" className="w-full min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Alto</label><input type="text" value={isMultiSelection ? getSharedDimension('height') : (styles.height || '')} onChange={(e) => handleStyleChange('height', e.target.value)} placeholder="auto / 240px" className="w-full min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Separación (gap)</label><input type="text" value={styles.gap || ''} onChange={(e) => handleStyleChange('gap', e.target.value)} placeholder="12px" className="w-full min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500" /></div>
          <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Opacidad</label><input type="number" min="0" max="1" step="0.05" value={styles.opacity ?? 1} onChange={(e) => handleStyleChange('opacity', Number(e.target.value))} className="w-full min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500" /></div>
        </div>
        <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Distribución</label><select value={styles.display || 'block'} onChange={(e) => handleStyleChange('display', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"><option value="block">Bloque</option><option value="flex">Flexbox</option><option value="grid">Cuadrícula (Grid)</option><option value="inline-flex">En línea (flex)</option><option value="inline-block">En línea (bloque)</option></select></div>
        {styles.display === 'flex' || styles.display === 'inline-flex' ? <div className="space-y-1.5"><label className="text-[10px] text-zinc-400">Dirección de elementos</label><select value={styles.flexDirection || 'row'} onChange={(e) => handleStyleChange('flexDirection', e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"><option value="row">Horizontal</option><option value="column">Vertical</option><option value="row-reverse">Horizontal invertido</option><option value="column-reverse">Vertical invertido</option></select></div> : null}
      </section>}

      {/* Espaciado Visual (Box Model) */}
      {!isRootElement && <div id="inspector-section-spacing" className="scroll-mt-4 space-y-2 pt-2 border-t border-zinc-800/80">
        <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
          <Box size={14} />
          <span>3. Espaciado visual (Box Model)</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 space-y-2">
          <span className="text-[10px] font-mono text-amber-500 font-bold block text-center uppercase">MARGIN</span>
          <div className="flex justify-center">
            <input
              type="text"
              value={styles.marginTop || '0'}
              onChange={(e) => handleStyleChange('marginTop', e.target.value)}
              placeholder="0"
              className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center text-xs py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="text"
              value={styles.marginLeft || '0'}
              onChange={(e) => handleStyleChange('marginLeft', e.target.value)}
              placeholder="0"
              className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center text-xs py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
            />
            <span className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded font-mono text-[10px] font-bold">
              Bloque
            </span>
            <input
              type="text"
              value={styles.marginRight || '0'}
              onChange={(e) => handleStyleChange('marginRight', e.target.value)}
              placeholder="0"
              className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center text-xs py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              value={styles.marginBottom || '0'}
              onChange={(e) => handleStyleChange('marginBottom', e.target.value)}
              placeholder="0"
              className="w-12 bg-zinc-950 border border-zinc-800 rounded text-center text-xs py-0.5 text-zinc-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>}

      {/* Editor del Texto del Elemento */}
      {canEditTypography && (
        <div className="space-y-1.5 pt-1">
          <label className="text-[11px] text-zinc-400 font-semibold block">4. Contenido del elemento</label>
          <textarea
            value={element.content || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Escribe el contenido aquí..."
            className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      )}

      {/* Control de Tipografía Avanzada */}
      {canEditTypography && <div id="inspector-section-typography" className="scroll-mt-4 space-y-4 pt-2 border-t border-zinc-800/80">
        <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
          <Type size={14} />
          <span>5. Tipografía y texto</span>
        </div>

        {/* Fuente de Texto */}
        <div className="space-y-1.5">
          <label className="text-[11px] text-zinc-400 block">Fuente de Texto</label>
          <select
            value={styles.fontFamily || 'Inter'}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            style={{ fontFamily: `\"${styles.fontFamily || 'Inter'}\", sans-serif` }}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {['Sans serif', 'Serif', 'Display', 'Manuscrita', 'Monoespaciada', 'Sistema'].map((category) => {
              const fonts = allFonts.filter((font) => (font.category || 'Personalizada') === category);
              return fonts.length ? <optgroup key={category} label={category}>{fonts.map((font) => <option key={font.name} value={font.name}>{font.name}</option>)}</optgroup> : null;
            })}
            {allFonts.filter((font) => !font.category || !['Sans serif', 'Serif', 'Display', 'Manuscrita', 'Monoespaciada', 'Sistema'].includes(font.category)).length > 0 && (
              <optgroup label="Fuentes importadas">{allFonts.filter((font) => !font.category || !['Sans serif', 'Serif', 'Display', 'Manuscrita', 'Monoespaciada', 'Sistema'].includes(font.category)).map((font) => <option key={font.name} value={font.name}>{font.name}</option>)}</optgroup>
            )}
          </select>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5">
            <span className="block text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Vista previa</span>
            <p className="text-lg text-zinc-100 break-words" style={{ fontFamily: `\"${styles.fontFamily || 'Inter'}\", sans-serif` }}>Aa Bb Cc 123 — Hproeditor</p>
          </div>
          <button type="button" onClick={() => setIsFontModalOpen(true)} className="w-full flex items-center justify-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-200 px-3 py-2 font-semibold transition-colors">
            <Upload size={13} /> Añadir fuente .TTF / .OTF / .WOFF
          </button>
          {customFonts.length > 0 && <div className="text-[10px] text-emerald-300 flex items-center gap-1"><CheckCircle2 size={12}/>{customFonts.length} fuente(s) personalizada(s) disponibles</div>}
        </div>

        {/* Tamaño de Texto */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>Tamaño de Fuente</span>
            <span className="font-mono text-indigo-300">{styles.fontSize || '16px'}</span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            value={parseInt(styles.fontSize) || 16}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Formatos: Negrita, Cursiva, Subrayado */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            onClick={() => handleStyleChange('fontWeight', isBold ? 'normal' : 'bold')}
            className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-all ${
              isBold ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Negrita"
          >
            <Bold size={13} />
            <span>Negrita</span>
          </button>

          <button
            onClick={() => handleStyleChange('fontStyle', isItalic ? 'normal' : 'italic')}
            className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-all ${
              isItalic ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Cursiva"
          >
            <Italic size={13} />
            <span>Cursiva</span>
          </button>

          <button
            onClick={() => handleStyleChange('textDecoration', isUnderline ? 'none' : 'underline')}
            className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-all ${
              isUnderline ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Subrayado"
          >
            <Underline size={13} />
            <span>Subrayado</span>
          </button>
        </div>

        {/* Espaciado e Interlineado */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 flex items-center space-x-1">
              <MoveHorizontal size={11} />
              <span>Espaciado</span>
            </label>
            <input
              type="text"
              value={styles.letterSpacing || '0px'}
              onChange={(e) => handleStyleChange('letterSpacing', e.target.value)}
              placeholder="0px"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-zinc-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 flex items-center space-x-1">
              <MoveVertical size={11} />
              <span>Interlineado</span>
            </label>
            <input
              type="text"
              value={styles.lineHeight || '1.5'}
              onChange={(e) => handleStyleChange('lineHeight', e.target.value)}
              placeholder="1.5"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-zinc-200 text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>}

      {/* Colores & Apariencia */}
      <div id="inspector-section-appearance" className="scroll-mt-4 space-y-4 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
          <Palette size={14} />
          <span>{isRootElement ? 'Color de fondo de la página' : '6. Apariencia y colores'}</span>
        </div>

        <div className={isRootElement ? 'max-w-full' : 'grid grid-cols-2 gap-3'}>
          {!isRootElement && <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 block">Color Texto</label>
            <input
              type="color"
              value={styles.color || '#ffffff'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-full h-8 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer p-0.5"
            />
          </div>}

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 block">{isRootElement ? 'Color de fondo' : 'Fondo Base'}</label>
            <input
              type="color"
              value={styles.backgroundColor || '#09090b'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full h-8 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer p-0.5"
            />
          </div>
        </div>
      </div>

      {/* Bordes y Geometría */}
      {!isRootElement && <div id="inspector-section-borders" className="scroll-mt-4 space-y-4 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
          <Maximize2 size={14} />
          <span>7. Bordes y esquinas</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 block">Radio de Esquinas</label>
            <input
              type="text"
              value={styles.borderRadius || '0px'}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="12px"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-zinc-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 block">Ancho de Borde</label>
            <input
              type="text"
              value={styles.borderWidth || '0px'}
              onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
              placeholder="1px"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-zinc-200 text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>}
      {/* Control de Rotación & Transformación */}
      {!isRootElement && <div id="inspector-section-transform" className="scroll-mt-4 space-y-4">
        <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
          <RotateCw size={14} />
          <span>8. Rotación & Transformación</span>
        </div>

        <div className="space-y-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
          <div className="flex justify-between items-center text-[11px] text-zinc-400">
            <span>Ángulo de Rotación</span>
            <span className="font-mono text-indigo-300 font-bold">{currentRotation}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={currentRotation}
            onChange={(e) => handleStyleChange('transform', `rotate(${e.target.value}deg)`)}
            className="w-full accent-indigo-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-1">
            <button onClick={() => handleStyleChange('transform', 'rotate(0deg)')} className="hover:text-indigo-400 cursor-pointer">0°</button>
            <button onClick={() => handleStyleChange('transform', 'rotate(90deg)')} className="hover:text-indigo-400 cursor-pointer">90°</button>
            <button onClick={() => handleStyleChange('transform', 'rotate(180deg)')} className="hover:text-indigo-400 cursor-pointer">180°</button>
            <button onClick={() => handleStyleChange('transform', 'rotate(270deg)')} className="hover:text-indigo-400 cursor-pointer">270°</button>
          </div>
        </div>
      </div>}
      </div>
      <CustomFontModal isOpen={isFontModalOpen} onClose={() => setIsFontModalOpen(false)} />
    </div>
  );
};
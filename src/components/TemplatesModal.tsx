import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { PRESET_TEMPLATES, type TemplateItem } from '../data/templates';
import type { EditorElement } from '../types/editor';
import { useEditorStore } from '../store/useEditorStore';
import { LayoutTemplate, X, ArrowRight, Eye, Check, MonitorPlay } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const toPreviewStyle = (styles?: EditorElement['styles'], isRoot = false): CSSProperties => {
  const safe: Record<string, unknown> = { ...(styles ?? {}) };
  delete safe.position;
  delete safe.transform;
  delete safe.zIndex;
  delete safe.cursor;
  delete safe.pointerEvents;
  // Solo normalizamos la altura del lienzo raíz; las imágenes conservan su altura configurada.
  if (isRoot) {
    delete safe.minHeight;
    delete safe.height;
  }
  return safe as CSSProperties;
};

const PreviewNode: React.FC<{ element: EditorElement; depth?: number }> = ({ element, depth = 0 }) => {
  const style = toPreviewStyle(element.styles, depth === 0);
  const children = element.children ?? [];
  const content = element.content ?? '';
  if (element.type === 'image') {
    return (
      <img
        src={element.src || 'https://placehold.co/600x400/18181b/818cf8?text=Imagen'}
        alt={element.name || 'Imagen de plantilla'}
        style={{ ...style, display: 'block', maxWidth: '100%', objectFit: 'cover' }}
        draggable={false}
      />
    );
  }

  const common = { style: { margin: 0, ...style }, 'data-preview-depth': depth };
  if (['heading', 'paragraph', 'text', 'button'].includes(element.type)) {
    const Tag = element.type === 'heading' ? 'h2' : element.type === 'button' ? 'button' : 'p';
    return <Tag {...common as any}>{content || (element.type === 'heading' ? 'Título de ejemplo' : '')}</Tag>;
  }

  return (
    <div {...common}>
      {content && <p>{content}</p>}
      {children.map((child) => <PreviewNode key={child.id} element={child} depth={depth + 1} />)}
    </div>
  );
};

const TemplatePreview: React.FC<{ template: TemplateItem; large?: boolean }> = ({ template, large = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const measure = () => setContainerWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // La miniatura conserva la proporción 16:9 y escala al ancho real de la tarjeta.
  const scale = containerWidth > 0
    ? Math.min(containerWidth / 1440, 1)
    : (large ? 0.68 : 0.25);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-zinc-950 ${large ? 'h-[min(58vh,540px)]' : 'w-full aspect-video'} rounded-xl border border-zinc-700/80 shadow-[0_12px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="origin-top-left pointer-events-none"
          style={{
            width: '1440px',
            height: '810px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            overflow: 'hidden',
          }}
        >
          <PreviewNode element={template.document} />
        </div>
      </div>
      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[9px] text-zinc-300">
        <MonitorPlay size={11} /> Vista previa
      </div>
    </div>
  );
};

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const { setDocumentForActivePage } = useEditorStore();

  const categories = useMemo(
    () => ['Todas', ...Array.from(new Set(PRESET_TEMPLATES.map((t) => t.category))).sort((a, b) => a.localeCompare(b, 'es'))],
    []
  );
  if (!isOpen) return null;

  const filteredTemplates = selectedCategory === 'Todas'
    ? PRESET_TEMPLATES
    : PRESET_TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleApplyTemplate = (template: TemplateItem) => {
    if (confirm(`¿Deseas reemplazar el contenido de tu página por "${template.title}"?`)) {
      setDocumentForActivePage(JSON.parse(JSON.stringify(template.document)));
      setPreviewTemplate(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden min-w-0">
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <LayoutTemplate size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate">Plantillas profesionales</h2>
              <p className="text-xs text-zinc-400">Mira una vista previa antes de aplicar. Los elementos se insertan como objetos editables.</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar catálogo" className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/40 flex items-center gap-2 overflow-x-auto shrink-0">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
          {filteredTemplates.map((template) => (
            <article key={template.id} className={`bg-zinc-950 border rounded-xl p-3 grid grid-cols-[minmax(108px,38%)_minmax(0,1fr)] gap-3 min-w-0 transition-all hover:-translate-y-0.5 hover:shadow-xl ${template.category === 'Exclusivo' ? 'border-indigo-500/70 bg-gradient-to-br from-indigo-950/30 to-zinc-950' : 'border-zinc-800 hover:border-indigo-500/60'}`}>
              <div className="w-full self-start rounded-lg overflow-hidden">
                <TemplatePreview template={template} />
              </div>
              <div className="min-w-0 flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${template.category === 'Exclusivo' ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400'}`}>{template.tag}</span>
                  <span className="text-[10px] text-zinc-500">{template.category}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-zinc-100 mb-1.5 break-words">{template.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed break-words line-clamp-4">{template.description}</p>
                </div>
                <button onClick={() => setPreviewTemplate(template)} className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <Eye size={13} /> Ver vista previa
                </button>
              </div>
              <div className="col-span-2">
                <button onClick={() => handleApplyTemplate(template)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <Check size={13} /> Usar plantilla <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
          {filteredTemplates.length === 0 && <div className="col-span-full py-12 text-center text-sm text-zinc-400">No hay plantillas en esta categoría todavía.</div>}
        </div>

        <div className="p-3 sm:p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500 shrink-0">
          <span>Mostrando {filteredTemplates.length} de {PRESET_TEMPLATES.length} plantillas</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium transition-colors">Cerrar</button>
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`Vista previa ${previewTemplate.title}`}>
          <div className="w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{previewTemplate.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{previewTemplate.description}</p>
              </div>
              <button onClick={() => setPreviewTemplate(null)} aria-label="Cerrar vista previa" className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"><X size={18}/></button>
            </div>
            <TemplatePreview template={previewTemplate} large />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">Vista orientativa. Los textos, imágenes, contenedores y botones de la plantilla se aplican como elementos del editor cuando están definidos en el documento.</p>
              <button onClick={() => handleApplyTemplate(previewTemplate)} className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2"><Check size={15}/> Usar esta plantilla <ArrowRight size={15}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

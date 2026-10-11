import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditorStore } from '../store/useEditorStore';
import { Sparkles, Check, X, Wand2, Volume2, Target, Type, Languages, SpellCheck, LoaderCircle, RefreshCw, CheckCheck, ShieldAlert } from 'lucide-react';
import { analyzeTextLocally, analyzeTextOnline, type SpellIssue } from '../utils/spellChecker';
import { fixSpellingAndGrammar } from '../utils/textCorrector';

interface QuickPhrase {
  id: string;
  label: string;
  category: 'grammar' | 'tone' | 'marketing' | 'length' | 'translate';
  prompt: string;
  applyTransform: (currentText: string) => string;
}

const QUICK_PHRASES: QuickPhrase[] = [
  {
    id: 'fix-grammar',
    label: 'Corregir ortografía y gramática',
    category: 'grammar',
    prompt: 'Corrige errores ortográficos y de puntuación.',
    applyTransform: (text) => fixSpellingAndGrammar(text),
  },
  {
    id: 'simplify',
    label: 'Simplificar redacción',
    category: 'grammar',
    prompt: 'Haz el texto más claro y directo.',
    applyTransform: (text) => text.replace(/de forma que|con el objetivo de/gi, 'para'),
  },
  {
    id: 'tone-pro',
    label: 'Hacer más profesional y formal',
    category: 'tone',
    prompt: 'Usa un lenguaje formal y de nivel corporativo.',
    applyTransform: (text) => `Impulse su presencia con ${text.toLowerCase()}`,
  },
  {
    id: 'tone-friendly',
    label: 'Tono amigable y cercano',
    category: 'tone',
    prompt: 'Reescribe de forma amigable y fresca.',
    applyTransform: (text) => `¡Hola! ${text}`,
  },
  {
    id: 'hook-heading',
    label: 'Título de gran impacto (Hook)',
    category: 'marketing',
    prompt: 'Transforma en un titular llamativo para sitios web.',
    applyTransform: (text) => `Descubre cómo ${text.toLowerCase()} en tiempo récord`,
  },
  {
    id: 'cta-button',
    label: 'Llamada a la acción (CTA) directa',
    category: 'marketing',
    prompt: 'Convierte el texto en una acción para botón.',
    applyTransform: (text) => `Empieza ahora: ${text}`,
  },
  {
    id: 'shorten',
    label: 'Acortar texto (Resumen)',
    category: 'length',
    prompt: 'Reduce el texto manteniendo la idea principal.',
    applyTransform: (text) => text.split('. ')[0] || text,
  },
  {
    id: 'expand',
    label: 'Expandir con más detalle',
    category: 'length',
    prompt: 'Añade más información descriptiva.',
    applyTransform: (text) => `${text}. Diseñado para ofrecer la mejor experiencia visual y optimizar tus proyectos web.`,
  },
  {
    id: 'translate-en',
    label: 'Traducir al Inglés',
    category: 'translate',
    prompt: 'Traduce al inglés de forma natural.',
    applyTransform: (text) => `Welcome to ${text}`,
  },
];

interface TextCorrectorModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  elementId?: string | null;
  currentText?: string;
}

export const TextCorrectorModal: React.FC<TextCorrectorModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  elementId: propElementId,
}) => {
  const {
    textCorrectorElementId,
    setTextCorrectorElementId,
    getActiveDocument,
    updateElementContent,
  } = useEditorStore();

  const activeElementId = propElementId ?? textCorrectorElementId;

  const doc = getActiveDocument();
  const findEl = (el: any, id: string): any => {
    if (!el) return null;
    if (el.id === id) return el;
    if (el.children) {
      for (const c of el.children) {
        const res = findEl(c, id);
        if (res) return res;
      }
    }
    return null;
  };

  const element = activeElementId ? findEl(doc, activeElementId) : null;
  const initialText = element?.content || '';

  const isOpen = propIsOpen !== undefined ? propIsOpen : (!!textCorrectorElementId && !!element);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewText, setPreviewText] = useState<string>(initialText);
  const [appliedPhraseId, setAppliedPhraseId] = useState<string | null>(null);
  const [issues, setIssues] = useState<SpellIssue[]>([]);
  const [ignoredIssueIds, setIgnoredIssueIds] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('Revisa el texto localmente o usa la revisión avanzada.');

  useEffect(() => {
    if (isOpen && activeElementId) {
      const currentContent = element?.content || '';
      setPreviewText(currentContent);
      setIssues([]);
      setIgnoredIssueIds([]);
      setReviewStatus('Revisa el texto localmente o usa la revisión avanzada.');
      setAppliedPhraseId(null);
    }
  }, [isOpen, activeElementId, element?.content]);

  if (!isOpen || !activeElementId) return null;

  const handleClose = () => {
    if (propOnClose) propOnClose();
    setTextCorrectorElementId(null);
  };

  const handleApplyPhrase = (phrase: QuickPhrase) => {
    const transformed = phrase.applyTransform(previewText);
    setPreviewText(transformed);
    setAppliedPhraseId(phrase.id);
  };

  const handleConfirm = () => {
    updateElementContent(activeElementId, previewText);
    handleClose();
  };

  const handleLocalReview = () => {
    const found = analyzeTextLocally(previewText);
    setIssues(found);
    setIgnoredIssueIds([]);
    setReviewStatus(found.length ? `Se encontraron ${found.length} posibles problemas con reglas locales.` : 'No se detectaron problemas con las reglas locales.');
  };

  const handleOnlineReview = async () => {
    if (!previewText.trim()) { setIssues([]); setReviewStatus('Escribe algo de texto para revisarlo.'); return; }
    setIsChecking(true);
    setReviewStatus('Analizando con LanguageTool…');
    try {
      const found = await analyzeTextOnline(previewText);
      setIssues(found);
      setIgnoredIssueIds([]);
      setReviewStatus(found.length ? `LanguageTool encontró ${found.length} posibles problemas.` : 'LanguageTool no encontró problemas.');
    } catch {
      const found = analyzeTextLocally(previewText);
      setIssues(found);
      setIgnoredIssueIds([]);
      setReviewStatus('No se pudo conectar con LanguageTool. Se muestran los resultados locales.');
    } finally { setIsChecking(false); }
  };

  const handleReplaceIssue = (issue: SpellIssue, replacement: string) => {
    const nextText = previewText.slice(0, issue.offset) + replacement + previewText.slice(issue.offset + issue.length);
    setPreviewText(nextText);
    setIssues([]);
    setReviewStatus('Corrección aplicada al borrador. Vuelve a analizar para actualizar los resultados.');
  };

  const filteredPhrases =
    selectedCategory === 'all'
      ? QUICK_PHRASES
      : QUICK_PHRASES.filter((p) => p.category === selectedCategory);

  return createPortal(
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200 pointer-events-auto"
    >
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
        {/* Encabezado */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Sparkles size={18} />
            <h3 className="text-sm font-bold text-white">Corrector e Asistente de Texto IA</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categorías */}
        <div className="flex items-center space-x-1 p-2 bg-zinc-950/50 border-b border-zinc-800/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedCategory('grammar')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'grammar'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Wand2 size={12} />
            <span>Gramática</span>
          </button>
          <button
            onClick={() => setSelectedCategory('tone')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'tone'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Volume2 size={12} />
            <span>Tono</span>
          </button>
          <button
            onClick={() => setSelectedCategory('marketing')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'marketing'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Target size={12} />
            <span>Marketing</span>
          </button>
          <button
            onClick={() => setSelectedCategory('length')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'length'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Type size={12} />
            <span>Longitud</span>
          </button>
          <button
            onClick={() => setSelectedCategory('review')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'review'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <SpellCheck size={12} />
            <span>Revisión</span>
          </button>
          <button
            onClick={() => setSelectedCategory('translate')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1 cursor-pointer ${
              selectedCategory === 'translate'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Languages size={12} />
            <span>Traducción</span>
          </button>
        </div>

        {/* Contenido de revisión */}
        {selectedCategory === 'review' ? (
          <div className="p-4 max-h-64 overflow-y-auto space-y-3">
            <div className="flex flex-wrap gap-2">
              <button onClick={handleLocalReview} className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white flex items-center gap-2 cursor-pointer">
                <SpellCheck size={14} /> Revisar sin conexión
              </button>
              <button onClick={handleOnlineReview} disabled={isChecking} className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs text-white flex items-center gap-2 cursor-pointer">
                {isChecking ? <LoaderCircle size={14} className="animate-spin" /> : <Sparkles size={14} />} Revisión avanzada
              </button>
              <button onClick={() => { setIssues([]); setIgnoredIssueIds([]); setReviewStatus('Resultados limpiados.'); }} className="px-3 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800 text-xs text-zinc-300 flex items-center gap-2 cursor-pointer">
                <RefreshCw size={13} /> Limpiar
              </button>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 flex gap-2 text-[11px] leading-relaxed text-zinc-400">
              <ShieldAlert size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <span><strong className="text-zinc-200">Privacidad:</strong> la revisión sin conexión usa reglas básicas en este equipo. La revisión avanzada envía el texto a LanguageTool para analizar ortografía y gramática.</span>
            </div>
            <p className="text-xs text-zinc-400">{reviewStatus}</p>
            {issues.filter((issue) => !ignoredIssueIds.includes(issue.id)).length > 0 ? (
              <div className="space-y-2">
                {issues.filter((issue) => !ignoredIssueIds.includes(issue.id)).map((issue) => (
                  <div key={issue.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${issue.category === 'spelling' ? 'bg-red-400' : issue.category === 'grammar' ? 'bg-blue-400' : 'bg-amber-400'}`} />
                          <span className="text-[10px] uppercase tracking-wide text-zinc-500">{issue.category === 'spelling' ? 'Ortografía' : issue.category === 'grammar' ? 'Gramática' : 'Estilo'}</span>
                        </div>
                        <p className="text-sm text-red-300 break-words">{issue.original || 'Espacio'}</p>
                        <p className="text-xs text-zinc-400 mt-1">{issue.message}</p>
                      </div>
                      <button onClick={() => setIgnoredIssueIds((old) => [...old, issue.id])} className="text-zinc-500 hover:text-white text-xs shrink-0 cursor-pointer">Omitir</button>
                    </div>
                    {issue.suggestions.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{issue.suggestions.map((suggestion) => <button key={suggestion} onClick={() => handleReplaceIssue(issue, suggestion)} className="px-2.5 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs text-emerald-300 cursor-pointer">{suggestion || 'Eliminar espacio'}</button>)}</div>}
                  </div>
                ))}
              </div>
            ) : issues.length > 0 ? (
              <div className="py-5 text-center text-sm text-emerald-300 flex flex-col items-center gap-2"><CheckCheck size={22} />No quedan sugerencias visibles.</div>
            ) : null}
          </div>
        ) : (
          <div className="p-4 max-h-56 overflow-y-auto space-y-2">
            {filteredPhrases.map((phrase) => {
              const isSelected = appliedPhraseId === phrase.id;
              return (
                <button
                  key={phrase.id}
                  onClick={() => handleApplyPhrase(phrase)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50'
                  }`}
                >
                  <div>
                    <span className="font-semibold block text-zinc-200">{phrase.label}</span>
                    <span className="text-[10px] text-zinc-500">{phrase.prompt}</span>
                  </div>
                  {isSelected && <Check size={16} className="text-indigo-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Vista previa del resultado */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80">
          <label className="text-[10px] uppercase font-mono font-bold text-zinc-500 block mb-1">
            Resultado en vivo
          </label>
          <textarea
            value={previewText}
            onChange={(e) => { setPreviewText(e.target.value); if (selectedCategory === 'review') { setIssues([]); setReviewStatus('Texto modificado. Analiza de nuevo para actualizar las sugerencias.'); } }}
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500 resize-none font-sans"
          />
        </div>

        {/* Acciones */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Check size={14} />
            <span>Aplicar texto</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
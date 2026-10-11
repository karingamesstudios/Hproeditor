import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { generateFullDocument, generateHTML, generateCSS } from '../utils/codeGenerator';
import { parseHTMLToEditorElement } from '../utils/htmlParser';
import { X, Copy, Check, Code2, Play, AlertCircle } from 'lucide-react';

export const CodeModal: React.FC = () => {
  const { isCodeModalOpen, setIsCodeModalOpen, getActiveDocument, setDocumentForActivePage } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'full' | 'html' | 'css'>('full');
  const [codeValue, setCodeValue] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doc = getActiveDocument();

  useEffect(() => {
    if (isCodeModalOpen) {
      if (activeTab === 'html') {
        setCodeValue(generateHTML(doc));
      } else if (activeTab === 'css') {
        setCodeValue(generateCSS(doc));
      } else {
        setCodeValue(generateFullDocument(doc, 'Página'));
      }
      setError(null);
    }
  }, [isCodeModalOpen, activeTab, doc]);

  if (!isCodeModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyToCanvas = async () => {
    try {
      setError(null);
      let htmlToParse = codeValue;

      if (activeTab === 'full') {
        const bodyMatch = codeValue.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        if (bodyMatch && bodyMatch[1]) {
          htmlToParse = bodyMatch[1];
        }
      }

      if (activeTab === 'css') {
        setError('El editor de solo CSS actualiza estilos visuales. Para reorganizar el árbol, edita la pestaña HTML o Documento Completo.');
        return;
      }

      const updatedDoc = await parseHTMLToEditorElement(htmlToParse);
      setDocumentForActivePage(updatedDoc);

      setApplied(true);
      setTimeout(() => setApplied(false), 2000);
    } catch (err: any) {
      setError(`Error de sintaxis HTML: ${err?.message || 'No se pudo interpretar el código.'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Encabezado */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Code2 size={18} />
            <h2 className="text-sm font-bold text-zinc-100">Editor & Código Bi-direccional</h2>
          </div>
          <button
            onClick={() => setIsCodeModalOpen(false)}
            className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Barra de Pestañas y Acciones */}
        <div className="px-4 pt-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('full')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'full' ? 'bg-zinc-900 text-indigo-400 border-t border-x border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Documento Completo
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'html' ? 'bg-zinc-900 text-indigo-400 border-t border-x border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Solo HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'css' ? 'bg-zinc-900 text-indigo-400 border-t border-x border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Solo CSS
            </button>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer border border-zinc-700"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>

            {activeTab !== 'css' && (
              <button
                onClick={handleApplyToCanvas}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                {applied ? <Check size={14} /> : <Play size={14} />}
                <span>{applied ? '¡Sincronizado!' : 'Aplicar al Canvas'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/30 flex items-center space-x-2 text-red-400 text-xs shrink-0">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Área de Edición de Código */}
        <div className="flex-1 bg-zinc-950 p-4 font-mono text-xs text-indigo-300 leading-relaxed overflow-hidden flex flex-col">
          <textarea
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            spellCheck={false}
            className="w-full h-full bg-transparent text-zinc-200 focus:outline-none resize-none font-mono text-xs leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { parseHTMLToEditorElement } from '../utils/htmlParser';
import {
  parsePDFToPages,
  combinePdfPagesIntoSingleDocument,
  type ParsedPdfPage,
} from '../utils/pdfParser';
import { X, Upload, FileText, Code, Check, AlertCircle, Layers, FileCode, Loader2 } from 'lucide-react';
import { registerCustomFont } from '../utils/fontLoader';

export const ImportModal: React.FC = () => {
  const { isImportModalOpen, setIsImportModalOpen, setDocumentForActivePage } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'hpro' | 'file' | 'code'>('hpro');
  const [rawCode, setRawCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Procesando archivo...');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [pendingPdfPages, setPendingPdfPages] = useState<{ pages: ParsedPdfPage[]; fileName: string } | null>(null);

  if (!isImportModalOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isLoading) return;

    setError(null);
    setSuccessMsg(null);
    setPendingPdfPages(null);
    setIsLoading(true);

    try {
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.pdf')) {
        setLoadingMsg(`Procesando y renderizando "${file.name}"...`);
        const pages = await parsePDFToPages(file);
        
        if (pages.length > 1) {
          setPendingPdfPages({ pages, fileName: file.name });
        } else if (pages.length === 1) {
          setDocumentForActivePage(pages[0].document);
          setSuccessMsg(`PDF "${file.name}" importado exitosamente con diseño de fondo.`);
          setTimeout(() => setIsImportModalOpen(false), 1500);
        }
      } else if (fileName.endsWith('.hpro') || fileName.endsWith('.json')) {
        setLoadingMsg(`Cargando proyecto "${file.name}"...`);
        const text = await file.text();
        const json = JSON.parse(text);
        // Restaurar un proyecto completo .HPRO o un documento individual antiguo.
        if (Array.isArray(json.pages) && json.pages.length > 0 && json.pages[0]?.document) {
          useEditorStore.setState({
            pages: json.pages,
            activePageId: json.pages[0].id,
            selectedElementId: null,
            selectedElementIds: [],
            history: [json.pages],
            historyIndex: 0,
          });
        } else {
          const candidate = json.page?.document ?? json.document ?? json;
          if (!candidate || typeof candidate !== 'object' || !candidate.id || !candidate.type) {
            throw new Error('El archivo no contiene un documento Hproeditor válido.');
          }
          setDocumentForActivePage(candidate);
        }
        if (Array.isArray(json.customFonts)) {
          useEditorStore.setState({ customFonts: json.customFonts });
          await Promise.all(json.customFonts.map((font: any) => registerCustomFont(font)));
        }
        setSuccessMsg(`Proyecto "${file.name}" cargado exitosamente.`);
        setTimeout(() => setIsImportModalOpen(false), 1500);
      } else if (fileName.endsWith('.html') || fileName.endsWith('.htm')) {
        setLoadingMsg(`Analizando código HTML de "${file.name}"...`);
        const text = await file.text();
        const parsedDoc = await parseHTMLToEditorElement(text);
        setDocumentForActivePage(parsedDoc);
        setSuccessMsg(`Archivo HTML "${file.name}" importado exitosamente.`);
        setTimeout(() => setIsImportModalOpen(false), 1500);
      } else {
        setError('Formato no soportado. Usa archivos .PDF, .HPRO, .JSON o .HTML.');
      }
    } catch (err: any) {
      setError(`Error al importar el archivo: ${err?.message || 'Formato no válido'}`);
    } finally {
      setIsLoading(false);
      e.target.value = '';
    }
  };

  const handleImportAsSeparatePages = () => {
    if (!pendingPdfPages || isLoading) return;

    const importStamp = Date.now();
    const newPages = pendingPdfPages.pages.map((p) => ({
      id: `page-pdf-${p.pageNumber}-${importStamp}`,
      name: `Hoja ${p.pageNumber}`,
      slug: `hoja-${p.pageNumber}`,
      document: p.document,
    }));

    useEditorStore.setState({
      pages: newPages,
      activePageId: newPages[0].id,
    });

    setSuccessMsg(`Se crearon ${newPages.length} páginas independientes en el menú lateral.`);
    setPendingPdfPages(null);
    setTimeout(() => setIsImportModalOpen(false), 1500);
  };

  const handleImportAsSingleCombinedPage = () => {
    if (!pendingPdfPages || isLoading) return;

    const combinedDoc = combinePdfPagesIntoSingleDocument(pendingPdfPages.pages, pendingPdfPages.fileName);
    setDocumentForActivePage(combinedDoc);

    setSuccessMsg(`Las ${pendingPdfPages.pages.length} hojas fueron unificadas en una sola página vertical.`);
    setPendingPdfPages(null);
    setTimeout(() => setIsImportModalOpen(false), 1500);
  };

  const handleImportCode = async () => {
    if (!rawCode.trim() || isLoading) {
      setError('Por favor ingresa un código HTML o JSON válido.');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      if (rawCode.trim().startsWith('{')) {
        const json = JSON.parse(rawCode);
        setDocumentForActivePage(json.document || json);
      } else {
        const parsedDoc = await parseHTMLToEditorElement(rawCode);
        setDocumentForActivePage(parsedDoc);
      }
      setSuccessMsg('Código importado y sincronizado en el Canvas.');
      setTimeout(() => setIsImportModalOpen(false), 1200);
    } catch (err: any) {
      setError(`Error de sintaxis: ${err?.message || 'No se pudo procesar el código'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Encabezado */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Upload size={18} />
            <h2 className="text-sm font-bold text-white">Importar Archivos & PDFs Multipágina</h2>
          </div>
          <button
            onClick={() => {
              if (isLoading) return;
              setPendingPdfPages(null);
              setIsImportModalOpen(false);
            }}
            disabled={isLoading}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pestañas: el formato nativo HPRO aparece primero y destacado en azul */}
        {!pendingPdfPages && (
          <div className="px-4 pt-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap gap-2">
            <button
              onClick={() => !isLoading && setActiveTab('hpro')}
              disabled={isLoading}
              aria-pressed={activeTab === 'hpro'}
              className={`px-3 py-2 rounded-t-lg text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer ${
                activeTab === 'hpro'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/70 shadow-[inset_0_-2px_0_#3b82f6]'
                  : 'text-blue-400/80 border border-transparent hover:bg-blue-950/40 hover:text-blue-300'
              }`}
            >
              <FileCode size={14} />
              <span>Importar .HPRO</span>
            </button>
            <button
              onClick={() => !isLoading && setActiveTab('file')}
              disabled={isLoading}
              aria-pressed={activeTab === 'file'}
              className={`px-3 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer ${
                activeTab === 'file' ? 'bg-zinc-900 text-indigo-400 border-t border-x border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText size={14} />
              <span>PDF / HTML / JSON</span>
            </button>
            <button
              onClick={() => !isLoading && setActiveTab('code')}
              disabled={isLoading}
              aria-pressed={activeTab === 'code'}
              className={`px-3 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer ${
                activeTab === 'code' ? 'bg-zinc-900 text-indigo-400 border-t border-x border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code size={14} />
              <span>Pegar código</span>
            </button>
          </div>
        )}

        {/* Mensajes de Estado */}
        {error && (
          <div className="p-3 bg-red-500/10 border-b border-red-500/30 flex items-center space-x-2 text-red-400 text-xs">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/30 flex items-center space-x-2 text-emerald-400 text-xs">
            <Check size={15} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 bg-zinc-950 flex-1 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
              <Loader2 size={36} className="text-indigo-500 animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-white">{loadingMsg}</p>
                <p className="text-xs text-zinc-500">Por favor espera un momento, no cierres la ventana.</p>
              </div>
            </div>
          ) : pendingPdfPages ? (
            <div className="w-full space-y-4 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-white">
                  PDF detectado con {pendingPdfPages.pages.length} hojas
                </h3>
                <p className="text-xs text-zinc-400">
                  ¿Cómo deseas organizar las diapositivas de "{pendingPdfPages.fileName}" en tu sitio web?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleImportAsSeparatePages}
                  className="p-4 bg-zinc-900 hover:bg-indigo-950/60 border border-zinc-800 hover:border-indigo-500 rounded-xl flex flex-col items-center text-center space-y-2 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers size={20} />
                  </div>
                  <span className="font-bold text-xs text-white">Páginas Independientes</span>
                  <span className="text-[11px] text-zinc-400">
                    Crea una página distinta en el menú lateral por cada hoja del PDF.
                  </span>
                </button>

                <button
                  onClick={handleImportAsSingleCombinedPage}
                  className="p-4 bg-zinc-900 hover:bg-indigo-950/60 border border-zinc-800 hover:border-indigo-500 rounded-xl flex flex-col items-center text-center space-y-2 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileCode size={20} />
                  </div>
                  <span className="font-bold text-xs text-white">Juntar en Una Sola Página</span>
                  <span className="text-[11px] text-zinc-400">
                    Une todas las diapositivas en una única vista vertical continua.
                  </span>
                </button>
              </div>
            </div>
          ) : activeTab === 'hpro' || activeTab === 'file' ? (
            <label className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group ${activeTab === 'hpro' ? 'border-blue-500/60 hover:border-blue-400 bg-blue-950/20 hover:bg-blue-950/35' : 'border-zinc-800 hover:border-indigo-500/80 bg-zinc-900/50 hover:bg-zinc-900'}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${activeTab === 'hpro' ? 'bg-blue-500/20 text-blue-300' : 'bg-indigo-600/20 text-indigo-400'}`}>
                {activeTab === 'hpro' ? <FileCode size={22} /> : <Upload size={22} />}
              </div>
              <span className={`text-sm font-bold mb-1 ${activeTab === 'hpro' ? 'text-blue-100' : 'text-zinc-200'}`}>{activeTab === 'hpro' ? 'Seleccionar proyecto Hproeditor' : 'Haz clic para seleccionar un archivo'}</span>
              <span className={`text-xs text-center ${activeTab === 'hpro' ? 'text-blue-300/80' : 'text-zinc-500'}`}>{activeTab === 'hpro' ? 'Formato nativo del proyecto · .HPRO' : 'Soporta archivos .PDF, .JSON y .HTML'}</span>
              <input
                type="file"
                accept={activeTab === 'hpro' ? '.hpro' : '.pdf,.json,.html,.htm'}
                onChange={handleFileUpload}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          ) : (
            <div className="w-full space-y-3">
              <textarea
                value={rawCode}
                onChange={(e) => setRawCode(e.target.value)}
                disabled={isLoading}
                placeholder="Pega aquí tu código HTML o JSON del proyecto..."
                className="w-full h-44 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 resize-none disabled:opacity-50"
              />
              <button
                onClick={handleImportCode}
                disabled={isLoading}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Importar Código al Canvas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { generateFullDocument } from '../../utils/codeGenerator';
import { exportProjectAsZip } from '../../utils/exportZip';
import {
  Undo,
  Redo,
  Code,
  FolderInput,
  Monitor,
  Tablet,
  Smartphone,
  PanelLeft,
  PanelRight,
  Download,
  FileCode,
  Archive,
} from 'lucide-react';

interface TopBarProps {
  isLeftPanelOpen: boolean;
  setIsLeftPanelOpen: () => void;
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: () => void;
  onLogoClick?: () => void;
  hidePanelToggles?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  isLeftPanelOpen,
  setIsLeftPanelOpen,
  isRightPanelOpen,
  setIsRightPanelOpen,
  onLogoClick,
  hidePanelToggles = false,
}) => {
  const {
    undo,
    redo,
    historyIndex,
    history,
    deviceViewport,
    setDeviceViewport,
    setIsCodeModalOpen,
    setIsImportModalOpen,
    getActiveDocument,
    pages,
    activePageId,
    customFonts,
  } = useEditorStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Exportar el proyecto nativo en archivo .HPRO
  const handleExportHPRO = () => {
    const activePage = pages.find((p) => p.id === activePageId) || pages[0];
    const projectData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      pages,
      customFonts,
    };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePage.slug || 'proyecto'}.hpro`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Exportar una sola hoja como HTML independiente. Si hay varias hojas,
  // exportar el sitio completo como ZIP para conservar la navegación entre páginas.
  const handleExportHTML = async () => {
    if (pages.length > 1) {
      await exportProjectAsZip(pages, 'hproeditor-sitio', customFonts);
      return;
    }

    const activePage = pages.find((page) => page.id === activePageId) || pages[0];
    if (!activePage) return;

    const baseHtml = generateFullDocument(activePage.document, activePage.name || 'Página Hproeditor');
    const customFontCSS = customFonts.map((font) =>
      `@font-face{font-family:'${font.name.replace(/[\"']/g, '')}';src:url('${font.dataUrl}') format('${font.format}');font-weight:100 900;font-style:normal;font-display:swap}`
    ).join('\n');
    const googleFontsCSS = '@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700;900&family=Work+Sans:wght@400;500;600;700;800&display=swap");';
    const htmlContent = baseHtml.replace('<style>', `<style>\n${googleFontsCSS}\n${customFontCSS}`);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(activePage.slug || activePage.name || 'index').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'index'}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Exportar proyecto completo en formato .ZIP
  const handleExportZIP = async () => {
    await exportProjectAsZip(pages, 'hproeditor-sitio', customFonts);
  };

  return (
    <header className="h-12 bg-zinc-950/90 border-b border-zinc-800/80 px-3 flex items-center justify-between text-zinc-300 text-xs shrink-0 select-none z-40 relative backdrop-blur-xl">
      
      {/* Sección Izquierda: Logo y Paneles */}
      <div className="flex items-center space-x-2">
        <div
          onClick={onLogoClick}
          className="flex items-center space-x-2 group cursor-pointer p-1 rounded-lg hover:bg-zinc-900 transition-all"
          title="Regresar al Menú de Plantillas (Guardado Automático)"
        >
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            H
          </div>
          <span className="font-bold text-white tracking-wide group-hover:text-indigo-300 transition-colors hidden sm:inline">
            Hproeditor
          </span>
        </div>

        <div className="h-4 w-px bg-zinc-800 my-auto" />

        {!hidePanelToggles && (
          <button
            onClick={setIsLeftPanelOpen}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isLeftPanelOpen
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Alternar Panel Izquierdo"
          >
            <PanelLeft size={15} />
          </button>
        )}

        <div className="flex items-center space-x-0.5 bg-zinc-900/80 border border-zinc-800/80 p-0.5 rounded-lg">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Deshacer (Ctrl+Z)"
          >
            <Undo size={14} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1 rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Rehacer (Ctrl+Y)"
          >
            <Redo size={14} />
          </button>
        </div>
      </div>

      {/* Sección Central: Selector Responsive Centrado */}
      <div className="hidden md:flex items-center space-x-1 bg-zinc-900/90 border border-zinc-800/80 p-1 rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-inner">
        <button
          onClick={() => setDeviceViewport('desktop')}
          className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
            deviceViewport === 'desktop'
              ? 'bg-indigo-600 text-white font-semibold shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Vista Escritorio (1440px)"
        >
          <Monitor size={14} />
          <span className="text-[11px]">Escritorio</span>
        </button>

        <button
          onClick={() => setDeviceViewport('tablet')}
          className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
            deviceViewport === 'tablet'
              ? 'bg-indigo-600 text-white font-semibold shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Vista Tablet (768px)"
        >
          <Tablet size={14} />
          <span className="text-[11px]">Tablet</span>
        </button>

        <button
          onClick={() => setDeviceViewport('mobile')}
          className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer ${
            deviceViewport === 'mobile'
              ? 'bg-indigo-600 text-white font-semibold shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Vista Móvil (390px)"
        >
          <Smartphone size={14} />
          <span className="text-[11px]">Móvil</span>
        </button>
      </div>

      {/* Sección Derecha: Importar, Exportar .HPRO / HTML / ZIP y Código */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsImportModalOpen(true)}
          className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
          title="Importar PDF, HTML o .HPRO"
        >
          <FolderInput size={14} />
          <span className="hidden lg:inline text-[11px]">Importar</span>
        </button>

        {/* Botón Exportar .HPRO */}
        <button
          onClick={handleExportHPRO}
          className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-indigo-500/40 text-indigo-300 font-semibold rounded-lg flex items-center space-x-1 transition-all cursor-pointer shadow-sm"
          title="Exportar archivo de proyecto .HPRO"
        >
          <FileCode size={14} />
          <span className="hidden sm:inline text-[11px]">.HPRO</span>
        </button>

        {/* Botón Descargar HTML */}
        <button
          onClick={handleExportHTML}
          className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg transition-colors cursor-pointer"
          title={pages.length > 1 ? "Exportar todas las páginas y sus enlaces en un ZIP" : "Descargar una única página como archivo HTML"}
        >
          <Download size={14} />
        </button>

        {/* Botón Exportar ZIP Completo */}
        <button
          onClick={handleExportZIP}
          className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center space-x-1 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          title="Exportar todo el sitio web en archivo .ZIP"
        >
          <Archive size={14} />
          <span className="hidden sm:inline text-[11px]">ZIP</span>
        </button>

        <button
          onClick={() => setIsCodeModalOpen(true)}
          className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg flex items-center space-x-1 transition-all cursor-pointer"
          title="Ver y Sincronizar Código HTML"
        >
          <Code size={14} />
          <span className="hidden sm:inline text-[11px]">Código</span>
        </button>

        {!hidePanelToggles && (
          <button
            onClick={setIsRightPanelOpen}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isRightPanelOpen
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Alternar Inspector de Estilos"
          >
            <PanelRight size={15} />
          </button>
        )}
      </div>
    </header>
  );
};
import { useState, useEffect, useCallback } from 'react';
import { useEditorStore } from './store/useEditorStore';
import {
  saveProjectToStorage,
  loadProjectFromStorage,
  setEditingState,
  getEditingState,
} from './utils/storage';
import { TopBar } from './components/TopBar/TopBar';
import { LeftPanel } from './components/LeftPanel/LeftPanel';
import { RightPanel } from './components/RightPanel/RightPanel';
import { Canvas } from './components/Canvas/Canvas';
import { BottomBar } from './components/BottomBar/BottomBar';
import { Dashboard } from './components/Dashboard';
import { CodeModal } from './components/CodeModal';
import { ImportModal } from './components/ImportModal';
import { TemplatesModal } from './components/TemplatesModal';
import { CommandPalette } from './components/CommandPalette';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Layers, SlidersHorizontal, Plus } from 'lucide-react';

export function App() {
  // Cargar estado de edición previo al recargar la página (F5)
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(() => {
    return getEditingState();
  });

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  // La eliminación de los accesos superiores se limita a Android; iOS y escritorio conservan su barra.
  const [isAndroid, setIsAndroid] = useState(
    () => typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)
  );

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(!isMobile);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [rightPanelWidth, setRightPanelWidth] = useState(360);

  const pages = useEditorStore((state) => state.pages);
  const isTemplatesModalOpen = useEditorStore((state) => state.isTemplatesModalOpen);
  const setIsTemplatesModalOpen = useEditorStore((state) => state.setIsTemplatesModalOpen);

  useKeyboardShortcuts();

  // Restaurar proyecto guardado al montar la app si existe
  useEffect(() => {
    let cancelled = false;
    const initApp = async () => {
      try {
        const savedPages = await loadProjectFromStorage();
        if (!cancelled && savedPages && savedPages.length > 0) {
          const currentPageId = useEditorStore.getState().activePageId;
          const activePageId = savedPages.some((page) => page.id === currentPageId)
            ? currentPageId
            : savedPages[0].id;
          useEditorStore.setState({
            pages: savedPages,
            activePageId,
            selectedElementId: null,
            selectedElementIds: [],
            history: [savedPages],
            historyIndex: 0,
          });
        }
      } catch (error) {
        console.warn('No se pudo restaurar el proyecto guardado:', error);
      } finally {
        if (!cancelled) setIsStorageReady(true);
      }
    };
    void initApp();
    return () => { cancelled = true; };
  }, []);

  // Esperar a terminar la restauración antes de guardar, para no sobrescribir la copia guardada.
  useEffect(() => {
    if (!isStorageReady) return;
    setEditingState(isEditing);
    if (isEditing && pages.length > 0) {
      void saveProjectToStorage(pages);
    }
  }, [pages, isEditing, isStorageReady]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsAndroid(typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent));
      if (mobile && isLeftPanelOpen && isRightPanelOpen) {
        setIsRightPanelOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLeftPanelOpen, isRightPanelOpen]);

  const handleToggleLeftPanel = () => {
    setIsLeftPanelOpen((prev) => {
      const next = !prev;
      if (next && isMobile) setIsRightPanelOpen(false);
      return next;
    });
  };

  const handleToggleRightPanel = () => {
    setIsRightPanelOpen((prev) => {
      const next = !prev;
      if (next && isMobile) setIsLeftPanelOpen(false);
      return next;
    });
  };

  // Salir del modo edición con guardado automático y regresar al Dashboard
  const handleReturnToDashboard = () => {
    saveProjectToStorage(pages);
    setIsEditing(false);
  };

  const startResizeLeft = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = leftPanelWidth;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.min(Math.max(220, startWidth + deltaX), 500);
        setLeftPanelWidth(newWidth);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [isMobile, leftPanelWidth]
  );

  const startResizeRight = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = rightPanelWidth;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = startX - moveEvent.clientX;
        const newWidth = Math.min(Math.max(240, startWidth + deltaX), 500);
        setRightPanelWidth(newWidth);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [isMobile, rightPanelWidth]
  );

  if (!isEditing) {
    return <Dashboard onStartEditing={() => setIsEditing(true)} />;
  }

  const activeLeftWidth = isMobile ? '85vw' : `${leftPanelWidth}px`;
  const activeRightWidth = isMobile ? '92vw' : `${rightPanelWidth}px`;

  return (
    <ErrorBoundary>
      <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden select-none animate-in fade-in duration-200">
        <TopBar
          isLeftPanelOpen={isLeftPanelOpen}
          setIsLeftPanelOpen={handleToggleLeftPanel}
          isRightPanelOpen={isRightPanelOpen}
          setIsRightPanelOpen={handleToggleRightPanel}
          onLogoClick={handleReturnToDashboard}
          hidePanelToggles={isAndroid}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <Canvas restrictScrollToBackground={isAndroid} />

          {/* Oscurecedor táctil en móvil */}
          {isMobile && (isLeftPanelOpen || isRightPanelOpen) && (
            <div
              onClick={() => {
                setIsLeftPanelOpen(false);
                setIsRightPanelOpen(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-15 animate-in fade-in duration-200"
            />
          )}

          {/* Panel Izquierdo */}
          {isLeftPanelOpen && (
            <div
              style={{ width: activeLeftWidth, maxWidth: isMobile ? '320px' : '500px' }}
              className="absolute left-0 top-0 bottom-0 z-20 bg-zinc-950/90 md:bg-zinc-950/75 backdrop-blur-xl border-r border-zinc-800/80 shadow-2xl flex flex-col overflow-x-hidden overflow-y-auto animate-in slide-in-from-left duration-200"
            >
              <div className="w-full h-full flex flex-col overflow-x-hidden">
                <LeftPanel />
              </div>

              {!isMobile && (
                <div
                  onMouseDown={startResizeLeft}
                  className="absolute top-0 right-0 bottom-0 w-2 cursor-col-resize z-30 group hover:bg-indigo-500/40 transition-colors flex items-center justify-center"
                >
                  <div className="w-0.5 h-10 bg-zinc-700/60 group-hover:bg-indigo-400 rounded-full" />
                </div>
              )}
            </div>
          )}

          {/* Panel Derecho */}
          {isRightPanelOpen && (
            <div
              style={{ width: activeRightWidth, maxWidth: isMobile ? '400px' : '520px' }}
              className="absolute right-0 top-0 bottom-0 z-20 bg-zinc-950/95 md:bg-zinc-950/90 backdrop-blur-xl border-l border-zinc-800/80 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
            >
              <div className="w-full h-full min-h-0 flex flex-col overflow-hidden">
                <RightPanel />
              </div>

              {!isMobile && (
                <div
                  onMouseDown={startResizeRight}
                  className="absolute top-0 left-0 bottom-0 w-2 cursor-col-resize z-30 group hover:bg-indigo-500/40 transition-colors flex items-center justify-center"
                >
                  <div className="w-0.5 h-10 bg-zinc-700/60 group-hover:bg-indigo-400 rounded-full" />
                </div>
              )}
            </div>
          )}

          {/* Dock Flotante estilo Canva (Móvil) */}
          {isMobile && !isLeftPanelOpen && !isRightPanelOpen && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-xl px-3 py-2 rounded-full shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom duration-200">
              <button
                onClick={handleToggleLeftPanel}
                className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-semibold shadow-md cursor-pointer"
              >
                <Plus size={14} />
                <span>Añadir</span>
              </button>

              <button
                onClick={handleToggleLeftPanel}
                className="p-2 text-zinc-300 hover:text-white bg-zinc-800/80 rounded-full cursor-pointer"
                title="Capas"
              >
                <Layers size={15} />
              </button>

              <button
                onClick={handleToggleRightPanel}
                className="p-2 text-zinc-300 hover:text-white bg-zinc-800/80 rounded-full cursor-pointer"
                title="Inspector"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>
          )}
        </div>

        <BottomBar />

        {/* Modales */}
        <CodeModal />
        <ImportModal />
        <CommandPalette />
        <TemplatesModal
          isOpen={isTemplatesModalOpen}
          onClose={() => setIsTemplatesModalOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
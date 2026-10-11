import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import type { EditorElement } from '../../types/editor';
import { ContextMenu } from './ContextMenu';
import { ContextToolbar } from './ContextToolbar';
import { ResizeHandles } from './ResizeHandles';
import { TextCorrectorModal } from '../TextCorrectorModal';
import { useCanvasDragAndResize } from '../../hooks/useCanvasDragAndResize';
import { autoCapitalizeSentences } from '../../utils/textCorrector';
import { RotateCcw } from 'lucide-react';

const EditableText: React.FC<{
  tag: 'h1' | 'p' | 'button';
  element: EditorElement;
  isSelected: boolean;
  className: string;
  style: React.CSSProperties;
  onContextMenu: (e: React.MouseEvent) => void;
}> = ({ tag: Tag, element, isSelected, className, style, onContextMenu }) => {
  const { updateElementContent, selectedElementId, selectElement, setActivePage } = useEditorStore();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      if (ref.current.textContent !== (element.content || '')) {
        ref.current.textContent = element.content || '';
      }
    }
  }, [element.content, element.id]);

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const rawText = e.currentTarget.textContent || '';
    const formattedText = autoCapitalizeSentences(rawText);
    updateElementContent(element.id, formattedText);
  };

  const handleBlur = (e: React.FormEvent<HTMLElement>) => {
    const rawText = e.currentTarget.textContent || '';
    const formattedText = autoCapitalizeSentences(rawText);
    if (ref.current && ref.current.textContent !== formattedText) {
      ref.current.textContent = formattedText;
    }
    updateElementContent(element.id, formattedText);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey && element.targetPageId) {
      setActivePage(element.targetPageId);
      return;
    }
    if (e.ctrlKey && element.linkUrl) {
      window.open(element.linkUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (e.shiftKey) {
      selectElement(element.id, true);
    } else if (selectedElementId !== element.id) {
      selectElement(element.id);
    }
  };

  return (
    <Tag
      ref={ref as any}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      style={{
        ...style,
        margin: 0,
        padding: 0,
        width: Tag === 'button' ? 'auto' : '100%',
        height: 'auto',
        minHeight: '1.4em',
        boxSizing: 'border-box',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        ...(Tag === 'button' ? {
          display: 'block',
          appearance: 'none',
          WebkitAppearance: 'none',
          border: 0,
          background: 'transparent',
          textAlign: 'inherit',
          font: 'inherit',
          color: 'inherit',
        } : {}),
      }}
      className={`${className} select-text cursor-text focus:outline-none`}
      contentEditable={isSelected}
      spellCheck={true}
      lang="es"
      suppressContentEditableWarning
      onInput={handleInput}
      onBlur={handleBlur}
    />
  );
};

const RenderElement: React.FC<{
  element: EditorElement;
  onContextMenu: (x: number, y: number, id: string) => void;
}> = ({ element, onContextMenu }) => {
  const { selectedElementId, selectedElementIds, selectElement, deviceViewport, customViewportWidth, setActivePage } = useEditorStore();
  const isSelected = (selectedElementIds || []).includes(element.id) || selectedElementId === element.id;
  const isPrimarySelected = selectedElementId === element.id;
  const isRoot = element.id === 'root-body';

  const safeStyles = element.styles || {};
  const { startResize } = useCanvasDragAndResize(element.id, safeStyles);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey && element.targetPageId) {
      setActivePage(element.targetPageId);
      return;
    }
    if (e.ctrlKey && element.linkUrl) {
      window.open(element.linkUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    selectElement(element.id, e.shiftKey);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectElement(element.id);
    onContextMenu(e.clientX, e.clientY, element.id);
  };

  const computedStyles = {
    ...safeStyles,
    ...(deviceViewport === 'tablet' ? element.tabletStyles : {}),
    ...(deviceViewport === 'mobile' ? element.mobileStyles : {}),
  };

  const isCentered = computedStyles.textAlign === 'center';
  const isRight = computedStyles.textAlign === 'right';

  // Escala tipográfica suave según el ancho del dispositivo. Evita que títulos
  // definidos en px ocupen una proporción excesiva en la vista móvil.
  const rawFontSize = computedStyles.fontSize;
  // No reducir la fuente dos veces: el ancho del viewport ya provoca el ajuste natural del texto.
  const responsiveFontSize = rawFontSize;

  const inlineStyles: React.CSSProperties = {
    color: computedStyles.color,
    backgroundImage: computedStyles.backgroundImage,
    backgroundSize: computedStyles.backgroundSize,
    backgroundPosition: computedStyles.backgroundPosition,
    backgroundRepeat: computedStyles.backgroundRepeat,
    aspectRatio: computedStyles.aspectRatio,
    fontFamily: computedStyles.fontFamily ? `'${computedStyles.fontFamily}', sans-serif` : undefined,
    fontSize: responsiveFontSize,
    fontWeight: computedStyles.fontWeight,
    fontStyle: computedStyles.fontStyle,
    textDecoration: computedStyles.textDecoration,
    letterSpacing: computedStyles.letterSpacing,
    lineHeight: computedStyles.lineHeight,
    textAlign: computedStyles.textAlign || 'left',
    padding: computedStyles.padding,
    paddingTop: computedStyles.paddingTop !== undefined ? computedStyles.paddingTop : (computedStyles.padding ? undefined : '8px'),
    paddingBottom: computedStyles.paddingBottom !== undefined ? computedStyles.paddingBottom : (computedStyles.padding ? undefined : '8px'),
    paddingLeft: computedStyles.paddingLeft !== undefined ? computedStyles.paddingLeft : (computedStyles.padding ? undefined : '12px'),
    paddingRight: computedStyles.paddingRight !== undefined ? computedStyles.paddingRight : (computedStyles.padding ? undefined : '12px'),
    marginTop: computedStyles.marginTop,
    marginBottom: computedStyles.marginBottom,
    // Si el HTML importado usa un contenedor limitado por max-width,
    // centrarlo cuando el importador normalizó su ancho al 100%. Esto evita
    // que el contenido quede pegado a la izquierda dentro de un fondo ancho.
    marginLeft: (computedStyles.width === '100%' && computedStyles.maxWidth && computedStyles.maxWidth !== '100%' && computedStyles.marginLeft === '0px')
      ? 'auto'
      : (computedStyles.marginLeft || (isCentered || isRight ? 'auto' : undefined)),
    marginRight: (computedStyles.width === '100%' && computedStyles.maxWidth && computedStyles.maxWidth !== '100%' && computedStyles.marginRight === '0px')
      ? 'auto'
      : (computedStyles.marginRight || (isCentered ? 'auto' : undefined)),
    alignSelf: isCentered ? 'center' : isRight ? 'flex-end' : undefined,
    width: computedStyles.width || (computedStyles.position === 'absolute' || element.type === 'button' || element.type === 'link' ? 'fit-content' : '100%'),
    maxWidth: computedStyles.maxWidth || '100%',
    minWidth: computedStyles.minWidth || 0,
    minHeight: isRoot ? '100%' : (computedStyles.minHeight === '100vh' ? '100%' : computedStyles.minHeight),
    height: isRoot ? undefined : computedStyles.height,
    margin: computedStyles.margin,
    // Apply the background shorthand first, then restore backgroundColor only
    // when no shorthand (such as a gradient) was explicitly configured.
    background: computedStyles.background,
    backgroundColor: computedStyles.background ? undefined : computedStyles.backgroundColor,
    border: computedStyles.border,
    flexWrap: computedStyles.flexWrap,
    justifyContent: computedStyles.justifyContent,
    alignItems: computedStyles.alignItems,
    alignContent: computedStyles.alignContent,
    objectFit: computedStyles.objectFit,
    overflow: computedStyles.overflow,
    borderRadius: computedStyles.borderRadius,
    borderWidth: computedStyles.borderWidth,
    borderStyle: computedStyles.borderWidth ? 'solid' : undefined,
    borderColor: computedStyles.borderColor,
    borderTopWidth: computedStyles.borderTopWidth,
    borderRightWidth: computedStyles.borderRightWidth,
    borderBottomWidth: computedStyles.borderBottomWidth,
    borderLeftWidth: computedStyles.borderLeftWidth,
    display: computedStyles.display || 'block',
    flexDirection: computedStyles.flexDirection,
    flex: computedStyles.flex,
    flexGrow: computedStyles.flexGrow,
    flexShrink: computedStyles.flexShrink,
    flexBasis: computedStyles.flexBasis,
    gap: computedStyles.gap,
    opacity: computedStyles.opacity,
    backdropFilter: computedStyles.backdropFilter,
    WebkitBackdropFilter: computedStyles.backdropFilter,
    boxShadow: computedStyles.boxShadow,
    position: computedStyles.position,
    top: computedStyles.top,
    left: computedStyles.left,
    transform: computedStyles.transform,
    zIndex: computedStyles.zIndex,
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    transition: `all ${computedStyles.transitionDuration || '0.2s'} ${computedStyles.transitionTimingFunction || 'ease'}`,
  };

  const selectionClass = isSelected
    ? 'ring-2 ring-indigo-500 ring-inset relative z-30 shadow-2xl shadow-indigo-500/30'
    : 'hover:ring-1 hover:ring-indigo-400/60 hover:ring-dashed hover:ring-inset';

  const fallbackImg =
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop';

  switch (element.type) {
    case 'heading':
    case 'paragraph':
    case 'button':
    case 'link': {
      const tagMap = { heading: 'h1', paragraph: 'p', button: 'button', link: 'button' } as const;
      const TagName = tagMap[element.type];

      return (
        <div
          onClick={handleClick}
          onContextMenu={handleRightClick}
          style={{ ...inlineStyles, overflow: 'visible' }}
          className={`cursor-pointer transition-all ${selectionClass} ${computedStyles.position === 'absolute' ? '' : 'relative'}`}
        >
          {isSelected && (
            <>
              {isPrimarySelected && <ContextToolbar />}
              {!isRoot && isPrimarySelected && (selectedElementIds || []).length <= 1 && <ResizeHandles onStartResize={startResize} />}
            </>
          )}
          <EditableText
            tag={TagName}
            element={element}
            isSelected={isSelected}
            className="w-full h-full block focus:outline-none"
            style={{
              color: 'inherit',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              fontStyle: 'inherit',
              textDecoration: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit',
              textAlign: computedStyles.textAlign || 'inherit',
              backgroundColor: 'transparent',
            }}
            onContextMenu={handleRightClick}
          />
        </div>
      );
    }

    case 'image': {
      const imgRadius = computedStyles.borderRadius || '16px';
      return (
        <div
          onClick={handleClick}
          onContextMenu={handleRightClick}
          className={`max-w-full block my-2 transition-all cursor-pointer ${selectionClass} ${computedStyles.position === 'absolute' ? '' : 'relative'}`}
          style={{ ...inlineStyles, borderRadius: imgRadius, overflow: 'visible' }}
        >
          {isSelected && (
            <>
              {isPrimarySelected && <ContextToolbar />}
              {!isRoot && isPrimarySelected && (selectedElementIds || []).length <= 1 && <ResizeHandles onStartResize={startResize} />}
            </>
          )}
          <img
            src={element.src || fallbackImg}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImg;
            }}
            alt={element.name || 'Imagen'}
            style={{
              width: '100%',
              height: computedStyles.height || 'auto',
              maxHeight: computedStyles.height ? undefined : '500px',
              objectFit: computedStyles.objectFit || 'cover',
              borderRadius: imgRadius,
              display: 'block',
            }}
            className="select-none pointer-events-auto transition-all"
          />
        </div>
      );
    }

    case 'section':
    case 'container':
    default: {
      const containerRadius = isRoot
        ? '16px'
        : computedStyles.borderRadius || '0px';

      return (
        <div
          onClick={handleClick}
          onContextMenu={handleRightClick}
          style={{ ...inlineStyles, borderRadius: containerRadius, overflow: 'visible' }}
          className={`cursor-pointer transition-all min-h-[40px] max-w-full ${selectionClass} ${computedStyles.position === 'absolute' ? '' : 'relative'}`}
        >
          {isSelected && (
            <>
              {isPrimarySelected && <ContextToolbar />}
              {!isRoot && isPrimarySelected && (selectedElementIds || []).length <= 1 && <ResizeHandles onStartResize={startResize} />}
            </>
          )}
          {element.children &&
            element.children.map((child) => (
              <RenderElement
                key={child.id}
                element={child}
                onContextMenu={onContextMenu}
              />
            ))}
        </div>
      );
    }
  }
};

export const Canvas: React.FC<{ restrictScrollToBackground?: boolean }> = ({ restrictScrollToBackground = false }) => {
  const {
    getActiveDocument,
    deviceViewport,
    customViewportWidth,
    selectElement,
    zoomLevel,
    setZoomLevel,
    resetZoom,
    zoomIn,
    zoomOut,
  } = useEditorStore();

  const [menuPos, setMenuPos] = useState<{ x: number; y: number; id: string } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [viewportContainerWidth, setViewportContainerWidth] = useState<number>(0);
  const [canvasContentHeight, setCanvasContentHeight] = useState<number>(0);
  const pageFrameRef = useRef<HTMLDivElement>(null);
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null);
  const isTouchLayout = restrictScrollToBackground || (typeof window !== 'undefined' && window.innerWidth < 768);

  const mainRef = useRef<HTMLElement>(null);
  const startPos = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number }>({
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const document = getActiveDocument();

  const activeWidth = customViewportWidth
    ? customViewportWidth
    : deviceViewport === 'tablet'
    ? 768
    : deviceViewport === 'mobile'
    ? 390
    : 1440;

  useEffect(() => {
    if (!mainRef.current) return;

    const updateWidth = () => {
      if (mainRef.current) {
        setViewportContainerWidth(Math.max(0, mainRef.current.clientWidth - 32));
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(mainRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Proporción inicial por dispositivo. La página puede crecer más allá de esta altura.
  const canvasAspectRatio =
    deviceViewport === 'mobile' ? 9 / 18 :
    deviceViewport === 'tablet' ? 4 / 3 :
    16 / 9;
  const activeHeight = Math.round(activeWidth / canvasAspectRatio);
  const widthFit = viewportContainerWidth > 0 ? viewportContainerWidth / activeWidth : 1;
  // Escala base coherente entre dispositivos: 75% cuando cabe, menor solo si el ancho lo exige.
  const autoFitScale = Math.min(0.75, widthFit * 0.75);
  const effectiveScale = Math.max(0.1, Math.round(zoomLevel * autoFitScale * 1000) / 1000);
  const contentHeight = Math.max(activeHeight, canvasContentHeight || activeHeight);
  const displayWidth = Math.round(activeWidth * effectiveScale);
  const displayHeight = Math.round(contentHeight * effectiveScale);

  const labelViewport = customViewportWidth
    ? `${customViewportWidth}px • Personalizado`
    : deviceViewport === 'tablet'
    ? '768px • Tablet'
    : deviceViewport === 'mobile'
    ? '390px • Móvil'
    : '1440px • Escritorio';

  useEffect(() => {
    const frame = pageFrameRef.current;
    if (!frame) return;
    const updateContentHeight = () => {
      const nextHeight = Math.max(activeHeight, frame.scrollHeight, frame.offsetHeight);
      setCanvasContentHeight((current) => current === nextHeight ? current : nextHeight);
    };
    updateContentHeight();
    const observer = new ResizeObserver(updateContentHeight);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [activeHeight, activeWidth, deviceViewport, customViewportWidth, document]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    }
  };

  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!isTouchLayout || e.touches.length !== 2) return;
    const distance = getTouchDistance(e.touches);
    if (distance > 0) {
      pinchStartRef.current = { distance, zoom: useEditorStore.getState().zoomLevel };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!isTouchLayout || e.touches.length !== 2 || !pinchStartRef.current) return;
    // Dos dedos controlan el zoom del lienzo; no el zoom general del navegador.
    e.preventDefault();
    const distance = getTouchDistance(e.touches);
    if (distance <= 0) return;
    const factor = distance / pinchStartRef.current.distance;
    const nextZoom = Math.min(4, Math.max(0.25, pinchStartRef.current.zoom * factor));
    setZoomLevel(nextZoom);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length < 2) pinchStartRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSpacePressed || e.button === 1) {
      e.preventDefault();
      setIsPanning(true);
      if (mainRef.current) {
        startPos.current = {
          x: e.clientX,
          y: e.clientY,
          scrollLeft: mainRef.current.scrollLeft,
          scrollTop: mainRef.current.scrollTop,
        };
      }
    } else {
      selectElement(null);
      setMenuPos(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !mainRef.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    mainRef.current.scrollLeft = startPos.current.scrollLeft - dx;
    mainRef.current.scrollTop = startPos.current.scrollTop - dy;
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleContextMenu = (x: number, y: number, id: string) => {
    setMenuPos({ x, y, id });
  };

  return (
    <main
      ref={mainRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`flex-1 bg-[#050508] bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] [background-size:16px_16px] overflow-x-auto overflow-y-auto p-4 sm:p-6 pt-14 pb-6 flex flex-col justify-start items-center relative canvas-workspace max-w-full ${
        isSpacePressed ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
      }`}
      style={restrictScrollToBackground ? { touchAction: 'pan-y' } : undefined}
    >
      <div className="mb-4 px-3 py-1 bg-zinc-900/95 border border-indigo-500/40 rounded-full shadow-lg text-[11px] font-mono font-semibold text-indigo-300 flex items-center gap-2 shrink-0 animate-in fade-in duration-200 z-10 select-none">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span>{labelViewport}</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-300 tabular-nums">{Math.round(effectiveScale * 100)}%</span>
        {isTouchLayout && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); resetZoom(); }}
            onTouchStart={(e) => e.stopPropagation()}
            title="Restablecer zoom"
            aria-label="Restablecer zoom del lienzo"
            className="ml-1 inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 active:bg-indigo-600 text-zinc-200 w-7 h-7 touch-manipulation"
          >
            <RotateCcw size={13} />
          </button>
        )}
      </div>

      <div
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          position: 'relative',
          flex: '0 0 auto',
          alignSelf: displayWidth > viewportContainerWidth ? 'flex-start' : 'center',
          marginLeft: displayWidth > viewportContainerWidth ? 0 : undefined,
        }}
        className={`mb-6 shrink-0 transition-[width,height] duration-300 ease-in-out ${restrictScrollToBackground ? 'touch-none' : ''}`}
      >
        <div
          ref={pageFrameRef}
          style={{
            width: `${activeWidth}px`,
            minHeight: `${activeHeight}px`,
            aspectRatio: `${canvasAspectRatio}`,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top left',
            overflow: 'visible',
          }}
          className="bg-zinc-900 border-2 border-indigo-500/40 ring-1 ring-zinc-700/60 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] transition-[transform,width,min-height] duration-300 ease-in-out relative"
        >
          <RenderElement
            element={document}
            onContextMenu={handleContextMenu}
          />
        </div>
      </div>

      {menuPos && (
        <ContextMenu
          x={menuPos.x}
          y={menuPos.y}
          elementId={menuPos.id}
          onClose={() => setMenuPos(null)}
        />
      )}

      <TextCorrectorModal />
    </main>
  );
};
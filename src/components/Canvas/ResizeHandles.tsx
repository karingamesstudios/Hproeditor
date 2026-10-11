import React from 'react';

export type ResizeDirection = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

interface ResizeHandlesProps {
  onStartResize: (e: React.MouseEvent, direction: ResizeDirection) => void;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onStartResize }) => {
  return (
    <>
      {/* Esquina Superior Izquierda (NW) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'nw')}
        className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full cursor-nwse-resize z-50 hover:scale-125 transition-transform shadow-lg"
        title="Redimensionar"
      />

      {/* Borde Superior (N) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'n')}
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white border border-indigo-600 rounded-full cursor-ns-resize z-50 hover:scale-110 transition-transform shadow-md"
        title="Ajustar Alto"
      />

      {/* Esquina Superior Derecha (NE) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'ne')}
        className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full cursor-nesw-resize z-50 hover:scale-125 transition-transform shadow-lg"
        title="Redimensionar"
      />

      {/* Borde Izquierdo (W) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'w')}
        className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-6 bg-white border border-indigo-600 rounded-full cursor-ew-resize z-50 hover:scale-110 transition-transform shadow-md"
        title="Ajustar Ancho"
      />

      {/* Borde Derecho (E) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'e')}
        className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-6 bg-white border border-indigo-600 rounded-full cursor-ew-resize z-50 hover:scale-110 transition-transform shadow-md"
        title="Ajustar Ancho"
      />

      {/* Esquina Inferior Izquierda (SW) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'sw')}
        className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full cursor-nesw-resize z-50 hover:scale-125 transition-transform shadow-lg"
        title="Redimensionar"
      />

      {/* Borde Inferior (S) */}
      <div
        onMouseDown={(e) => onStartResize(e, 's')}
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-white border border-indigo-600 rounded-full cursor-ns-resize z-50 hover:scale-110 transition-transform shadow-md"
        title="Ajustar Alto"
      />

      {/* Esquina Inferior Derecha (SE) */}
      <div
        onMouseDown={(e) => onStartResize(e, 'se')}
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full cursor-nwse-resize z-50 hover:scale-125 transition-transform shadow-lg"
        title="Redimensionar"
      />
    </>
  );
};
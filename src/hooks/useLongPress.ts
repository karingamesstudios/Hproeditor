import { useRef, useCallback } from 'react';

export function useLongPress(
  onLongPress: (coords: { x: number; y: number }) => void,
  onClick?: (e: React.PointerEvent) => void,
  delay = 500
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isLongPressRef.current = false;
      // Guardar coordenadas x, y antes de entrar al setTimeout
      const coords = { x: e.clientX, y: e.clientY };

      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        onLongPress(coords);
      }, delay);
    },
    [onLongPress, delay]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (!isLongPressRef.current && onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  const handlePointerCancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
    onPointerLeave: handlePointerCancel,
  };
}
import { useCallback, useRef } from "react";

export function useConstellationViewModel(data) {
  const sizeRef = useRef({ w: 0, h: 0 });

  const toCanvas = useCallback((nx, ny) => {
    const { w, h } = sizeRef.current;
    const pad = Math.max(Math.min(w, h) * 0.1, 24);
    return { x: pad + nx * (w - pad * 2), y: pad + ny * (h - pad * 2) };
  }, []);

  const findNear = useCallback((cx, cy) => {
    const { w, h } = sizeRef.current;
    const pad = Math.max(Math.min(w, h) * 0.1, 24);
    let near = null, minD = Infinity;
    data.stars.forEach(star => {
      const sx = pad + star.x * (w - pad * 2);
      const sy = pad + star.y * (h - pad * 2);
      const d = Math.hypot(cx - sx, cy - sy);
      if (d < star.size * 2.5 + 20 && d < minD) {
        minD = d;
        near = star;
      }
    });
    return near;
  }, [data]);

  const handleResize = useCallback((canvas) => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sizeRef.current = { w: canvas.width, h: canvas.height };
  }, []);

  return { sizeRef, toCanvas, findNear, handleResize };
}

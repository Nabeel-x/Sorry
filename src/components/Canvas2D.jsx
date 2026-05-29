import React, { useEffect, useRef, useState } from "react";
import { BG_STARS } from "../models/constants";

export function Canvas2D({ data, hovered, revealed, canvasRef, onPointerMove, onPointerLeave, onTouchMove, onTouchEnd, sizeRef, toCanvas }) {
  const animRef = useRef(null);
  const [r, g, b] = data.accentColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      sizeRef.current = { w: canvas.width, h: canvas.height };
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const draw = (ts) => {
      const t = ts * 0.001;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      // BG gradient
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
      bg.addColorStop(0, "#07091a");
      bg.addColorStop(0.5, "#03040e");
      bg.addColorStop(1, "#010208");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebula
      data.nebulaColors.forEach(([nr, ng, nb, na], i) => {
        const cx = [0.22, 0.75, 0.5][i];
        const cy = [0.35, 0.6, 0.8][i];
        const gr = ctx.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, w * 0.28);
        gr.addColorStop(0, `rgba(${nr},${ng},${nb},${na})`);
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(cx * w, cy * h, w * 0.28, 0, Math.PI * 2);
        ctx.fill();
      });

      // BG stars
      BG_STARS.forEach(s => {
        const op = s.opacity * (0.6 + 0.4 * Math.sin(t * s.ts + s.tp));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,200,180,${op})`;
        ctx.fill();
      });

      // Lines
      data.lines.forEach(([a, b]) => {
        const pa = toCanvas(data.stars[a].x, data.stars[a].y);
        const pb = toCanvas(data.stars[b].x, data.stars[b].y);
        const gr = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        const lo = 0.15 + 0.05 * Math.sin(t * 0.4);
        const hi = 0.28 + 0.08 * Math.sin(t * 0.4 + 1);
        gr.addColorStop(0, `rgba(${r},${g},${b},${lo})`);
        gr.addColorStop(0.5, `rgba(${r},${g},${b},${hi})`);
        gr.addColorStop(1, `rgba(${r},${g},${b},${lo})`);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = gr;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      // Stars
      data.stars.forEach(star => {
        const { x: cx, y: cy } = toCanvas(star.x, star.y);
        const isHov = hovered?.id === star.id;
        const isRev = revealed.has(star.id);
        const twinkle = 0.7 + 0.3 * Math.sin(t * (1.2 + star.id * 0.17) + star.id);
        const sr = star.size * (isHov ? 1.6 : 1.0);

        // Glow
        const glowR = sr * (isHov ? 7 : 4.5);
        const ga = star.brightness * twinkle * (isHov ? 0.55 : 0.22);
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        glow.addColorStop(0, `rgba(${r + 30},${g + 30},${b + 30},${ga})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Revealed ring
        if (isRev && !isHov) {
          ctx.beginPath();
          ctx.arc(cx, cy, sr * 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.18 + 0.12 * Math.sin(t * 2 + star.id)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Core
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, sr);
        core.addColorStop(0, `rgba(255,250,235,${star.brightness * twinkle})`);
        core.addColorStop(0.4, `rgba(${r + 55},${g + 55},${b + 55},${star.brightness * twinkle * 0.85})`);
        core.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, sr, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        // Diffraction spikes on hover
        if (isHov) {
          ctx.save();
          ctx.globalAlpha = 0.4;
          [0, 90].forEach(angle => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle * Math.PI / 180);
            const sp = ctx.createLinearGradient(-sr * 6, 0, sr * 6, 0);
            sp.addColorStop(0, "rgba(0,0,0,0)");
            sp.addColorStop(0.5, `rgba(${r + 80},${g + 80},${b + 80},0.85)`);
            sp.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = sp;
            ctx.fillRect(-sr * 6, -0.5, sr * 12, 1);
            ctx.restore();
          });
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [hovered, revealed, toCanvas, data, r, g, b, canvasRef, sizeRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        touchAction: "none",
        display: "block",
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    />
  );
}

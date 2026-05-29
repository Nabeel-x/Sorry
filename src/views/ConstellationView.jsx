import React, { useState, useRef, useCallback } from "react";
import { CONSTELLATIONS } from "../models/constants";
import { Canvas2D } from "../components/Canvas2D";
import { Tooltip } from "../components/Tooltip";
import { useConstellationViewModel } from "../viewmodels/ConstellationViewModel";

export function ConstellationView({ type, onBack }) {
  const data = CONSTELLATIONS[type];
  const canvasRef = useRef(null);
  const { sizeRef, toCanvas, findNear, handleResize } = useConstellationViewModel(data);
  
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(new Set());
  const [introVisible, setIntroVisible] = useState(true);
  
  const [r, g, b] = data.accentColor;

  const onMove = useCallback((e) => {
    const s = findNear(e.clientX, e.clientY);
    setHovered(s);
    setTooltipPos({ x: e.clientX, y: e.clientY });
    if (s) {
      setRevealed(p => new Set([...p, s.id]));
      setIntroVisible(false);
    }
  }, [findNear]);

  const onTouch = useCallback((e) => {
    const t = e.touches[0];
    const s = findNear(t.clientX, t.clientY);
    setHovered(s);
    setTooltipPos({ x: t.clientX, y: t.clientY });
    if (s) {
      setRevealed(p => new Set([...p, s.id]));
      setIntroVisible(false);
    }
  }, [findNear]);

  const allRevealed = revealed.size === data.stars.length;

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      animation: "pageIn 0.7s ease forwards",
    }}>
      <Canvas2D
        ref={canvasRef}
        data={data}
        hovered={hovered}
        revealed={revealed}
        canvasRef={canvasRef}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
        onTouchMove={onTouch}
        onTouchEnd={() => setHovered(null)}
        sizeRef={sizeRef}
        toCanvas={toCanvas}
      />

      {/* Back button (moved to bottom) */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",

          // changed
          top: 20,
          left: 20,

          zIndex: 30,
          background: "rgba(4,5,18,0.8)",
          border: `1px solid rgba(${r},${g},${b},.25)`,
          color: `rgba(${r},${g},${b},.9)`,
          fontFamily: "'Cinzel',serif",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          padding: "10px 16px",

          // better for touch
          minHeight: 44,

          borderRadius: 2,
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",

          // prevents iPhone safe-area issues
          paddingTop: "max(10px, env(safe-area-inset-top))",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `rgba(${r},${g},${b},.6)`;
          e.currentTarget.style.color = `rgba(${r},${g},${b},1)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `rgba(${r},${g},${b},.25)`;
          e.currentTarget.style.color = `rgba(${r},${g},${b},.9)`;
        }}
      >
        ← return
      </button>

      {/* Title */}
      <div style={{
        position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center", pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "clamp(0.75rem,1.8vw,0.95rem)",
          letterSpacing: "0.22em", color: `rgba(${r},${g},${b},.75)`,
          textTransform: "uppercase", animation: "fadein 1.2s ease forwards",
        }}>
          {data.title}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic",
          fontSize: "0.72rem", color: `rgba(${r},${g},${b},.35)`,
          letterSpacing: "0.1em", marginTop: 4,
          animation: "fadein 1.2s .3s ease forwards", opacity: 0,
        }}>
          {data.subtitle}
        </div>
      </div>

      {/* Intro hint */}
      <div style={{
        position: "fixed", bottom: 44, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, pointerEvents: "none", textAlign: "center",
        opacity: introVisible ? 1 : 0, transition: "opacity 0.8s ease",
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(0.82rem,2vw,0.98rem)",
          color: `rgba(${r},${g},${b},.45)`, letterSpacing: "0.12em", marginBottom: 8,
        }}>
          {data.hint}
        </div>
        <div style={{
          width: 1, height: 26,
          background: `linear-gradient(to bottom, rgba(${r},${g},${b},.4), transparent)`,
          margin: "0 auto", animation: "pulseLine 2s ease-in-out infinite",
        }} />
      </div>

      {/* Final line */}
      {allRevealed && (
        <div style={{
          position: "fixed", bottom: 36, left: "50%", zIndex: 10,
          pointerEvents: "none", textAlign: "center", animation: "fadeUp 1.2s ease forwards",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(0.92rem,2.2vw,1.08rem)",
            color: `rgba(${r + 20},${g + 20},${b + 20},.65)`, letterSpacing: "0.1em",
          }}>
            {data.finalLine}
          </div>
        </div>
      )}

      <Tooltip star={hovered} pos={tooltipPos} visible={!!hovered} accent={data.accentColor} />
    </div>
  );
}

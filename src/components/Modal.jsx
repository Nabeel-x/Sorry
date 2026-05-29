import React, { useEffect } from "react";

export function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(3,6,12,0.6)" }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "min(640px,92%)", maxHeight: "90%", overflowY: "auto", background: "rgba(6,8,20,0.96)", border: "1px solid rgba(232,201,122,.12)", borderRadius: 8, padding: "clamp(1rem,2.5vw,2rem)", boxShadow: "0 10px 60px rgba(0,0,0,.6)" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", right: 12, top: 12, background: "transparent", border: "none", color: "rgba(232,201,122,.8)", fontSize: 20, cursor: "pointer" }}>✕</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

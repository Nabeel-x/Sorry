import { useRef, useState } from "react";
import { LANDING_BUTTONS } from "../models/constants";
import { WebGLStars } from "../components/WebGLStars";
import { Modal } from "../components/Modal";

export function Landing({ onEnter }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  return (
    <div style={{
      position: "fixed", inset: 0,
      overflow: "hidden",
      animation: "pageIn 0.6s ease forwards",
    }}>
      <WebGLStars canvasRef={canvasRef} animRef={animRef} />

      {/* Nebula overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 40% at 20% 30%, rgba(80,40,140,.16) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 80% 70%, rgba(20,60,120,.13) 0%, transparent 65%),
          radial-gradient(ellipse 40% 60% at 55% 10%, rgba(140,60,80,.09) 0%, transparent 60%)`,
      }} />

      <div style={{
        position: "relative", zIndex: 2, width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "3%", gap: "2.5%",
      }}>

        {/* Star icon */}
        <div style={{
          fontSize: "2rem", color: "#e8c97a", marginBottom: "1.5%",
          animation: "pulse-star 3s ease-in-out infinite, fadein 1s .3s ease both", opacity: 0,
        }}>
          ✦
        </div>

        {/* Name */}
        <div style={{
          position: "relative", marginBottom: "0.5%",
          animation: "rise 1.4s .6s cubic-bezier(.16,1,.3,1) both", opacity: 0,
        }}>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "clamp(3rem,9vw,6.5rem)",
            fontWeight: 500, letterSpacing: "0.18em",
            color: "#f5e3a8",
            textShadow: "0 0 30px rgba(232,201,122,.7), 0 0 80px rgba(232,201,122,.3), 0 2px 4px rgba(0,0,0,.6)",
            position: "relative",
          }}>TARA</div>
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(.8rem,2vw,1rem)", letterSpacing: "0.35em",
          color: "rgba(232,201,122,.5)", textTransform: "uppercase", marginBottom: "3%",
          animation: "fadein 1s 1.2s ease both", opacity: 0,
        }}>
          you are the star I wronged
        </div>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          width: "min(380px,85%)", marginBottom: "3%",
          animation: "fadein 1s 1.5s ease both", opacity: 0,
        }}>
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(to right, transparent, rgba(232,201,122,.35), transparent)",
          }} />
          <div style={{
            width: 5, height: 5, borderRadius: "50%", background: "#e8c97a",
            boxShadow: "0 0 8px rgba(232,201,122,.9)",
          }} />
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(to right, transparent, rgba(232,201,122,.35), transparent)",
          }} />
        </div>

        {/* Apology card */}
        <div style={{
          width: "min(500px,90%)",
          background: "rgba(8,10,28,.55)",
          border: "1px solid rgba(232,201,122,.14)",
          borderRadius: 2,
          padding: "clamp(1.4rem,3vw,2.2rem) clamp(1.5rem,4vw,2.8rem)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 0 1px rgba(232,201,122,.04), 0 8px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(232,201,122,.07)",
          marginBottom: "3%",
          animation: "rise 1.2s 1.8s cubic-bezier(.16,1,.3,1) both", opacity: 0,
          position: "relative", overflow: "hidden",
        }}>
          <span style={{
            position: "absolute", top: 9, left: 9, width: 14, height: 14,
            borderTop: "1px solid rgba(232,201,122,.3)", borderLeft: "1px solid rgba(232,201,122,.3)",
          }} />
          <span style={{
            position: "absolute", bottom: 9, right: 9, width: 14, height: 14,
            borderBottom: "1px solid rgba(232,201,122,.3)", borderRight: "1px solid rgba(232,201,122,.3)",
          }} />
          <p style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
            fontSize: "clamp(1rem,2.1vw,1.15rem)", lineHeight: 1.6,
            color: "rgba(230,222,206,.86)", textAlign: "center", margin: 0
          }}>
            Some stars burn so bright they illuminate everything around them — you are one of those stars. I was careless with something precious, and I am <em style={{ color: "#f5e3a8" }}>truly sorry.</em> I have mapped my guilt, my love, and my promises into the sky above. Three constellations — each one yours.
          </p>
        </div>

        {/* Constellation modal trigger */}
        <Constellations onEnter={onEnter} />

        <div style={{
          marginTop: "1.8rem", fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic", fontWeight: 300, fontSize: "0.8rem",
          letterSpacing: "0.3em", color: "rgba(232,201,122,.28)",
          animation: "fadein 1s 3.2s ease both", opacity: 0,
        }}>
          with all sincerity ✦
        </div>
      </div>
    </div>
  );
}

function Constellations({ onEnter }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ width: "min(500px,90%)", marginBottom: "1.5%", display: "flex", justifyContent: "center" }}>
        <button onClick={() => setOpen(true)} style={{ padding: "12px 18px", borderRadius: 4, background: "rgba(232,201,122,.06)", border: "1px solid rgba(232,201,122,.14)", color: "#f5e3a8", cursor: "pointer" }}>View My Messages</button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5%" }}>
          {LANDING_BUTTONS.map(({ key, label, sub, color }) => (
            <button key={key} onClick={() => { onEnter(key); setOpen(false); }} style={{
              width: "100%", padding: "14px 22px",
              background: `rgba(${color},.06)`,
              border: `1px solid rgba(${color},.22)`,
              borderRadius: 2, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(.8rem,1.6vw,1rem)", letterSpacing: "0.18em", color: `rgba(${color},1)`, textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.9rem", color: `rgba(${color},.5)`, marginTop: 4 }}>{sub}</div>
              </div>
              <div style={{ color: `rgba(${color},.5)`, fontSize: "1.1rem", marginLeft: 12 }}>✦</div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

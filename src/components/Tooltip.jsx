export function Tooltip({ star, pos, visible, accent }) {
  const [r, g, b] = accent;
  return (
    <div style={{
      position: "fixed", left: pos.x, top: pos.y,
      transform: "translate(-50%,-110%)",
      pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
      zIndex: 100, maxWidth: 270, textAlign: "center",
    }}>
      <div style={{
        background: "rgba(4,5,18,0.92)",
        border: `1px solid rgba(${r},${g},${b},0.28)`,
        borderRadius: 2, padding: "14px 20px 12px",
        backdropFilter: "blur(18px)",
        boxShadow: `0 4px 40px rgba(0,0,0,.75), inset 0 1px 0 rgba(${r},${g},${b},.1)`,
        position: "relative",
      }}>
        <span style={{
          position: "absolute", top: 6, left: 6, width: 8, height: 8,
          borderTop: `1px solid rgba(${r},${g},${b},.4)`,
          borderLeft: `1px solid rgba(${r},${g},${b},.4)`,
        }} />
        <span style={{
          position: "absolute", bottom: 6, right: 6, width: 8, height: 8,
          borderBottom: `1px solid rgba(${r},${g},${b},.4)`,
          borderRight: `1px solid rgba(${r},${g},${b},.4)`,
        }} />
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "0.62rem", letterSpacing: "0.25em",
          color: `rgba(${r},${g},${b},.7)`, textTransform: "uppercase", marginBottom: 7,
        }}>
          {star?.name}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontWeight: 300,
          fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(230,220,205,.9)", whiteSpace: "pre-line",
        }}>
          {star?.message}
        </div>
      </div>
      <div style={{
        width: 0, height: 0, margin: "0 auto",
        borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
        borderTop: `6px solid rgba(${r},${g},${b},.2)`,
      }} />
    </div>
  );
}

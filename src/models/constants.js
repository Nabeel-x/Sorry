/* ═══════════════════════════════════════════════════
   FONTS
═══════════════════════════════════════════════════ */
export const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #010208; overflow: hidden; }
  canvas { display: block; touch-action: none; }
  @keyframes fadein   { from{opacity:0} to{opacity:1} }
  @keyframes rise     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer  { 0%{background-position:-100% 0} 40%,100%{background-position:200% 0} }
  @keyframes pulse-star {
    0%,100%{transform:scale(1) rotate(0deg);filter:drop-shadow(0 0 18px rgba(232,201,122,.8))}
    50%{transform:scale(1.15) rotate(15deg);filter:drop-shadow(0 0 30px rgba(232,201,122,1)) drop-shadow(0 0 60px rgba(232,201,122,.5))}
  }
  @keyframes pulseLine { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes fadeUp {
    from{opacity:0;transform:translate(-50%,16px)}
    to{opacity:1;transform:translate(-50%,0)}
  }
  @keyframes orbitSpin {
    from{transform:rotate(var(--start)) translateX(var(--r))}
    to{transform:rotate(calc(var(--start) + 360deg)) translateX(var(--r))}
  }
  @keyframes btnPulse {
    0%,100%{box-shadow:0 0 24px rgba(200,170,90,.25),0 8px 40px rgba(0,0,0,.6)}
    50%{box-shadow:0 0 44px rgba(200,170,90,.45),0 8px 60px rgba(0,0,0,.7)}
  }
  @keyframes pageIn {
    from{opacity:0;transform:scale(0.97)}
    to{opacity:1;transform:scale(1)}
  }
  @keyframes pageOut {
    from{opacity:1;transform:scale(1)}
    to{opacity:0;transform:scale(1.03)}
  }
`;

/* ═══════════════════════════════════════════════════
   BACKGROUND STARS (shared)
═══════════════════════════════════════════════════ */
export const BG_STARS = Array.from({ length: 300 }, (_, i) => ({
  id: i,
  x: Math.random(), y: Math.random(),
  r: Math.random() * 1.1 + 0.2,
  opacity: Math.random() * 0.5 + 0.1,
  ts: Math.random() * 2 + 1,
  tp: Math.random() * Math.PI * 2,
}));

/* ═══════════════════════════════════════════════════
   CONSTELLATION DATA
═══════════════════════════════════════════════════ */
export const CONSTELLATIONS = {
  regret: {
    title: "Constellation of Regret",
    subtitle: "The Wound-Bearer · Ophiuchus · 12 stars",
    hint: "hover or touch each star to hear its regret",
    finalLine: "Every star carries a weight I should have carried myself.",
    accentColor: [200, 150, 80],
    nebulaColors: [
      [60, 30, 110, 0.12], [20, 50, 120, 0.10], [100, 30, 60, 0.07],
    ],
    stars: [
      { id:0,  name:"Rasalhague",    x:.50, y:.13, size:5.2, brightness:1.0,
        message:"I spoke when I should have listened.\nEvery word I said was a door I closed." },
      { id:1,  name:"Cebalrai",      x:.63, y:.27, size:3.8, brightness:.78,
        message:"I made you feel small in a moment\nyou needed to feel infinite." },
      { id:2,  name:"Yed Prior",     x:.31, y:.38, size:3.5, brightness:.72,
        message:"I chose my pride\nover your peace." },
      { id:3,  name:"Yed Posterior", x:.38, y:.43, size:3.2, brightness:.65,
        message:"I knew I was wrong\nand stayed silent anyway." },
      { id:4,  name:"Han",           x:.52, y:.52, size:3.6, brightness:.74,
        message:"I took your patience for granted,\nas if it were endless." },
      { id:5,  name:"Sabik",         x:.61, y:.58, size:3.9, brightness:.80,
        message:"I let distance grow\nwhen I should have reached across it." },
      { id:6,  name:"Barnard's",     x:.44, y:.33, size:2.4, brightness:.50,
        message:"I forgot, more than once,\nthat small things matter most to you." },
      { id:7,  name:"Marfik",        x:.70, y:.44, size:3.0, brightness:.60,
        message:"I laughed at the wrong moment.\nI still carry that look on your face." },
      { id:8,  name:"Zeta Oph",      x:.25, y:.55, size:3.3, brightness:.68,
        message:"I gave my best hours to everything\nexcept what deserved them." },
      { id:9,  name:"Theta Oph",     x:.55, y:.70, size:2.8, brightness:.55,
        message:"I promised things lightly\nthat you held onto for a long time." },
      { id:10, name:"Eta Oph",       x:.43, y:.78, size:2.6, brightness:.52,
        message:"I disappeared when you were hurting.\nThat silence was a kind of cruelty." },
      { id:11, name:"Nu Oph",        x:.68, y:.72, size:2.2, brightness:.44,
        message:"I compared you to others\nand called it honesty." },
    ],
    lines: [[0,1],[0,6],[6,2],[6,3],[3,4],[4,5],[4,7],[2,8],[4,9],[9,10],[9,11],[5,7]],
  },

  love: {
    title: "Constellation of Love",
    subtitle: "The Devoted Heart · Corona Borealis · 10 stars",
    hint: "touch each star to feel what I never said enough",
    finalLine: "You were never just a person to me. You were the whole sky.",
    accentColor: [210, 120, 140],
    nebulaColors: [
      [120, 30, 70, 0.13], [80, 20, 100, 0.10], [180, 60, 80, 0.08],
    ],
    stars: [
      { id:0,  name:"Alphecca",   x:.50, y:.12, size:5.0, brightness:1.0,
        message:"The way you talk with me —\nit rearranges something inside me." },
      { id:1,  name:"Nusakan",    x:.64, y:.22, size:3.6, brightness:.76,
        message:"You make ordinary moments\nfeel like they deserve to be remembered." },
      { id:2,  name:"Theta CrB",  x:.72, y:.36, size:3.0, brightness:.62,
        message:"There is a version of every place I've been\nthat only exists because you were there." },
      { id:3,  name:"Epsilon CrB",x:.66, y:.50, size:2.8, brightness:.58,
        message:"I love the way you hold your convictions\nlike they are living things." },
      { id:4,  name:"Delta CrB",  x:.55, y:.60, size:3.2, brightness:.66,
        message:"You are the reason I believe\nthat some people are irreplaceable." },
      { id:5,  name:"Gamma CrB",  x:.44, y:.60, size:3.4, brightness:.70,
        message:"Being known by you\nfelt like the safest thing in the world." },
      { id:6,  name:"Zeta CrB",   x:.34, y:.50, size:2.8, brightness:.58,
        message:"I loved you in a hundred small ways\nyou probably never noticed." },
      { id:7,  name:"Iota CrB",   x:.28, y:.36, size:2.6, brightness:.54,
        message:"Even in silence with you\nI never felt alone." },
      { id:8,  name:"Beta CrB",   x:.36, y:.22, size:3.4, brightness:.72,
        message:"You changed the shape of\nwhat I thought love could feel like." },
      { id:9,  name:"Rho CrB",    x:.50, y:.38, size:2.4, brightness:.48,
        message:"If I could go back to any moment —\nI would choose an ordinary one, with you." },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[0,9],[9,4]],
  },

  future: {
    title: "Constellation of the Future",
    subtitle: "The Unwritten Dawn · Auriga · 11 stars",
    hint: "touch each star to find what I am reaching toward",
    finalLine: "I don't know all of what comes next. But I want you in it.",
    accentColor: [100, 180, 200],
    nebulaColors: [
      [20, 80, 140, 0.12], [30, 120, 100, 0.09], [20, 50, 160, 0.08],
    ],
    stars: [
      { id:0,  name:"Capella",    x:.50, y:.10, size:5.2, brightness:1.0,
        message:"I will be more present.\nNot just here — actually here." },
      { id:1,  name:"Menkalinan", x:.65, y:.22, size:3.8, brightness:.78,
        message:"I will ask how you are\nand wait for the real answer." },
      { id:2,  name:"Theta Aur",  x:.74, y:.38, size:3.2, brightness:.65,
        message:"I will choose you\nbefore I choose being right." },
      { id:3,  name:"Iota Aur",   x:.68, y:.54, size:3.0, brightness:.60,
        message:"I will remember the dates\nthat matter to you." },
      { id:4,  name:"Eta Aur",    x:.55, y:.65, size:2.8, brightness:.56,
        message:"I will show up\nnot just when it's easy." },
      { id:5,  name:"Zeta Aur",   x:.42, y:.68, size:3.0, brightness:.60,
        message:"I will learn what care\nlooks like in your language." },
      { id:6,  name:"Epsilon Aur",x:.30, y:.56, size:3.4, brightness:.70,
        message:"I will change\nand to become a person you want to me to be." },
      { id:7,  name:"Delta Aur",  x:.26, y:.40, size:3.0, brightness:.62,
        message:"I will stop waiting for the right moment\nand make one." },
      { id:8,  name:"Beta Aur",   x:.35, y:.24, size:3.6, brightness:.74,
        message:"I will say I love you\nbefore I need to, not after." },
      { id:9,  name:"Nu Aur",     x:.50, y:.40, size:2.6, brightness:.52,
        message:"I will build something with you\nthat outlasts the hurt." },
      { id:10, name:"Xi Aur",     x:.62, y:.42, size:2.4, brightness:.48,
        message:"I will be someone\nyou are glad chose to stay." },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],[0,9],[9,10],[10,2],[9,5]],
  },
};

export const LANDING_BUTTONS = [
  { key:"regret", label:"Constellation of Regret",   sub:"12 stars · The Wound-Bearer",    color:"200,150,80"  },
  { key:"love",   label:"Constellation of Love",     sub:"10 stars · The Devoted Heart",   color:"210,120,140" },
  { key:"future", label:"Constellation of the Future", sub:"11 stars · The Unwritten Dawn", color:"100,180,200" },
];

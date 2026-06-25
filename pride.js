const canvas  = document.getElementById("c");
const ctx     = canvas.getContext("2d");
const nameEl  = document.getElementById("flag-name");

const WORDS = [
  "MARSHAPJOHNSON", "PRIDE", "SYLVIARIVERA", "PRIDE",
  "MISSMAJOR",      "PRIDE", "STORMEDELA",   "PRIDE",
  "ZAZUNOVA",       "PRIDE", "JACKIEHORMONA","PRIDE",
  "BIRDIE",         "PRIDE", "CRAIGRODWELL", "PRIDE",
  "HARRYHAY",       "PRIDE", "STONEWALLINN", "PRIDE",
  "JUDYGARLAND",    "PRIDE", "HARVEYMILK",   "PRIDE",
  "JIMFOURATT",     "PRIDE", "RAYCASTRO",    "PRIDE",
  "FREEDOM", "LOVE", "RESIST", "RISE", "TRANS", "GAY", "QUEER",
];

let SRC = "";
while (SRC.length < 10000) {
  for (const w of WORDS) SRC += w;
}

// ── Flag definitions ──────────────────────────────────────────────────────
const FLAGS = [
  { name: "RAINBOW PRIDE",  colors: ["#E40303","#FF8C00","#FFED00","#008026","#004DFF","#750787"] },
  { name: "TRANS PRIDE",    colors: ["#55CDFC","#F7A8B8","#FFFFFF","#F7A8B8","#55CDFC"] },
  { name: "BISEXUAL PRIDE", colors: ["#D60270","#D60270","#9B4F96","#0038A8","#0038A8"] },
  { name: "PANSEXUAL PRIDE",colors: ["#FF218C","#FFD800","#21B1FF"] },
];

const FONT_SIZE = 10, GX = 7.9, GY = 12.9;

let F = {};

function computeLayout() {
  const vw = innerWidth, vh = innerHeight;
  let fw = Math.min(vw * 0.88, 880);
  let fh = fw * (2 / 3);
  if (fh > vh * 0.68) { fh = vh * 0.68; fw = fh * 1.5; }
  F = {
    x: (vw - fw) * 0.5, y: (vh - fh) * 0.5 - 14,
    w: fw, h: fh,
    cols: Math.floor(fw / GX), rows: Math.floor(fh / GY),
  };
  canvas.width = vw;
  canvas.height = vh;
}

const lerp = (a, b, t) => a + (b - a) * t;

function hexToRGB(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

let P = [];

function initParticles() {
  const N = F.cols * F.rows;
  P = new Array(N);
  for (let i = 0; i < N; i++) {
    P[i] = {
      ch: SRC[i % SRC.length],
      x: F.x + Math.random() * F.w,
      y: F.y + Math.random() * F.h,
      r: 120, g: 120, b: 120, a: 0,
      tx: 0, ty: 0, tr: 120, tg: 120, tb: 120,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14,
      col: i % F.cols, row: (i / F.cols) | 0,
      bx: 0, si: 0,
    };
  }
}

// ── Formation ─────────────────────────────────────────────────────────────
function applyTargets(flag) {
  const n = flag.colors.length;
  const sh = F.rows / n;
  for (const p of P) {
    p.si = Math.min((p.row / sh) | 0, n - 1);
    p.tx = F.x + p.col * GX;
    p.ty = F.y + p.row * GY;
    p.bx = p.tx;
    [p.tr, p.tg, p.tb] = hexToRGB(flag.colors[p.si]);
  }
}

function doScatter() {
  for (const p of P) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 9 + Math.random() * 13;
    p.vx = Math.cos(ang) * spd;
    p.vy = Math.sin(ang) * spd;
  }
}

function draw() {
  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  ctx.strokeRect(F.x, F.y, F.w, F.h);
  ctx.restore();

  ctx.font = `bold ${FONT_SIZE}px 'Courier New',monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  for (const p of P) {
    if (p.a < 0.01) continue;
    ctx.globalAlpha = p.a;
    ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`;
    ctx.fillText(p.ch, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

// ── Loop: ease toward formation (static, no state machine yet) ─────────────
function loop(ts) {
  for (const p of P) {
    p.x = lerp(p.x, p.tx, 0.06);
    p.y = lerp(p.y, p.ty, 0.06);
    p.r = lerp(p.r, p.tr, 0.07);
    p.g = lerp(p.g, p.tg, 0.07);
    p.b = lerp(p.b, p.tb, 0.07);
    p.a = lerp(p.a, 1, 0.06);
  }
  draw();
  requestAnimationFrame(loop);
}

function init() {
  computeLayout();
  initParticles();
  applyTargets(FLAGS[0]);
  nameEl.textContent = FLAGS[0].name;
}

window.addEventListener("resize", init);
init();
requestAnimationFrame(loop);

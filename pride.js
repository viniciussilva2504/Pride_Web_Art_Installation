const canvas  = document.getElementById("c");
const ctx     = canvas.getContext("2d");
const nameEl  = document.getElementById("flag-name");

// ── Source text (Stonewall heroes) ────────────────────────────────────────
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

// ── Constants ─────────────────────────────────────────────────────────────
const FONT_SIZE = 10, GX = 7.9, GY = 12.9;

// ── Layout ────────────────────────────────────────────────────────────────
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

// ── Utilities ─────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

function hexToRGB(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// ── Particles ─────────────────────────────────────────────────────────────
let P = [];

function initParticles() {
  const N = F.cols * F.rows;
  P = new Array(N);
  for (let i = 0; i < N; i++) {
    P[i] = {
      ch: SRC[i % SRC.length],
      x: F.x + Math.random() * F.w,
      y: F.y + Math.random() * F.h,
      r: 180, g: 180, b: 180, a: 1,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14,
      col: i % F.cols,
      row: (i / F.cols) | 0,
    };
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

// ── Draw ──────────────────────────────────────────────────────────────────
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
    ctx.globalAlpha = p.a;
    ctx.fillStyle = `rgb(${p.r | 0},${p.g | 0},${p.b | 0})`;
    ctx.fillText(p.ch, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

// ── Loop ──────────────────────────────────────────────────────────────────
function loop(ts) {
  const cw = canvas.width + 42, ch = canvas.height + 42;
  for (const p of P) {
    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.978; p.vy *= 0.978;
    p.vy += (Math.random() - 0.47) * 0.28;
    if (p.x < -40) p.x = cw; else if (p.x > cw) p.x = -40;
    if (p.y < -40) p.y = ch; else if (p.y > ch) p.y = -40;
  }
  draw();
  requestAnimationFrame(loop);
}

function init() {
  computeLayout();
  initParticles();
  doScatter();
  nameEl.textContent = "STONEWALL";
}

window.addEventListener("resize", init);
init();
requestAnimationFrame(loop);

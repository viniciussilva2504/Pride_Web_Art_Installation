const canvas  = document.getElementById("c");
const ctx     = canvas.getContext("2d");
const nameEl  = document.getElementById("flag-name");

// ── Typography & grid constants ───────────────────────────────────────────
const FONT_SIZE = 10;
const GX        = 7.9;   // horizontal glyph step (px)
const GY        = 12.9;  // vertical glyph step   (px)

// ── Flag rect ─────────────────────────────────────────────────────────────
let F = {}; // { x, y, w, h, cols, rows }

function computeLayout() {
  const vw = innerWidth, vh = innerHeight;
  let fw = Math.min(vw * 0.88, 880);
  let fh = fw * (2 / 3);
  if (fh > vh * 0.68) { fh = vh * 0.68; fw = fh * 1.5; }
  F = {
    x: (vw - fw) * 0.5,
    y: (vh - fh) * 0.5 - 14,
    w: fw, h: fh,
    cols: Math.floor(fw / GX),
    rows: Math.floor(fh / GY),
  };
  canvas.width  = vw;
  canvas.height = vh;
}

// ── Draw ──────────────────────────────────────────────────────────────────
function draw() {
  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Flag border placeholder
  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth   = 1;
  ctx.strokeRect(F.x, F.y, F.w, F.h);
  ctx.restore();
}

// ── Loop ──────────────────────────────────────────────────────────────────
function loop() {
  draw();
  requestAnimationFrame(loop);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────
function init() {
  computeLayout();
  nameEl.textContent = "PRIDE";
}

window.addEventListener("resize", init);
init();
requestAnimationFrame(loop);

/* ══════════════════════════════════════════════════════════════════════════
   PRIDE PARTICLE ANIMATION — Stonewall Memorial
   ──────────────────────────────────────────────────────────────────────────
   Letters formed by names of those who fought and died at Stonewall 1969,
   mixed with the word PRIDE, cycling through LGBT+ flag formations.

   Heroes, icons & voices honoured:
     Marsha P. Johnson · Sylvia Rivera · Miss Major Griffin-Gracy · Zazu Nova
     Stormé DeLarverie · Jackie Hormona · Birdie Rivera · Craig Rodwell
     Bob Kohler · Ray Castro · Bayard Rustin · Alan Turing · Andy Warhol
     Keith Haring · Oscar Wilde · James Baldwin · Truman Capote · Gore Vidal
     Walt Whitman · Virginia Woolf · Tennessee Williams · Allen Ginsberg
     Langston Hughes · Federico García Lorca · Hilda Hilst · Harvey Milk
     Elton John · Freddie Mercury · George Michael · David Bowie · Boy George
     Ricky Martin · RuPaul · Sam Smith · Frank Ocean · Troye Sivan
     Grace Jones · kd lang · Lil Nas X · Kim Petras · Janelle Monáe
     Judy Garland · Madonna · Lady Gaga · Liza Minnelli · Barbra Streisand
     Cher · Donna Summer · Harry Hay · Jim Fouratt
   ══════════════════════════════════════════════════════════════════════════ */

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const nameEl = document.getElementById("flag-name");

// ── Source text: hero names + PRIDE keyword ────────────────────────────────
const WORDS = [
  // ── Stonewall heroes ────────────────────────────────────────────────
  "MARSHAPJOHNSON",
  "PRIDE",
  "SYLVIARIVERA",
  "PRIDE",
  "MISSMAJOR",
  "PRIDE",
  "STORMEDELA",
  "PRIDE",
  "ZAZUNOVA",
  "PRIDE",
  "JACKIEHORMONA",
  "PRIDE",
  "BIRDIE",
  "PRIDE",
  "CRAIGRODWELL",
  "PRIDE",
  "HARRYHAY",
  "PRIDE",
  "JIMFOURATT",
  "PRIDE",
  "BOBKOHLER",
  "PRIDE",
  "RAYCASTRO",
  "PRIDE",
  "STONEWALLINN",
  "PRIDE",
  // ── Writers & poets ─────────────────────────────────────────────────
  "OSCARWILDE",
  "PRIDE",
  "JAMESBALDWIN",
  "PRIDE",
  "TRUMANCAPOTE",
  "PRIDE",
  "ALLENGINSBERG",
  "PRIDE",
  "WALTWHITMAN",
  "PRIDE",
  "VIRGINIAWOOLF",
  "PRIDE",
  "TENNESSEEWILL",
  "PRIDE",
  "LANGSTONHUGH",
  "PRIDE",
  "GARCIALORC",
  "PRIDE",
  "GOREVIDAL",
  "PRIDE",
  "HILDAHILST",
  "PRIDE",
  // ── Musicians & pop icons ────────────────────────────────────────────
  "ELTONJOHN",
  "PRIDE",
  "FREDDIEMERCURY",
  "PRIDE",
  "GEORGEMICHAEL",
  "PRIDE",
  "DAVIDBOWIE",
  "PRIDE",
  "BOYGEORGE",
  "PRIDE",
  "RICKYMARTIN",
  "PRIDE",
  "RUPAUL",
  "PRIDE",
  "SAMSMITH",
  "PRIDE",
  "FRANKOCEAN",
  "PRIDE",
  "TROYESIVAN",
  "PRIDE",
  "GRACEJONES",
  "PRIDE",
  "KDLANG",
  "PRIDE",
  "LILNASX",
  "PRIDE",
  "KIMPETRAS",
  "PRIDE",
  "JANELLEMONAE",
  "PRIDE",
  "HARVEYMILK",
  "PRIDE",
  // ── Divas & gay icons ───────────────────────────────────────────────
  "JUDYGARLAND",
  "PRIDE",
  "MADONNA",
  "PRIDE",
  "LADYGAGA",
  "PRIDE",
  "LIZAMINELLI",
  "PRIDE",
  "BARBRA",
  "PRIDE",
  "CHER",
  "PRIDE",
  "DONNASUMMER",
  "PRIDE",
  // ── Cultural icons ───────────────────────────────────────────────────
  "ALANTURING",
  "PRIDE",
  "BAYARDRUSTIN",
  "PRIDE",
  "ANDYWARHOL",
  "PRIDE",
  "KEITHHARING",
  "PRIDE",
  // ── Keywords ────────────────────────────────────────────────────────
  "FREEDOM",
  "LOVE",
  "RESIST",
  "RISE",
  "TRANS",
  "GAY",
  "QUEER",
  "POWER",
  "EQUAL",
  "STRONG",
  "TOGETHER",
];

let SRC = "";
while (SRC.length < 10000) {
  for (const w of WORDS) SRC += w;
}

// ── Flag definitions (historical accuracy) ────────────────────────────────
const FLAGS = [
  {
    name: "RAINBOW PRIDE",
    definition: "LOVE · LIBERATION · SOLIDARITY · UNITY FOR ALL",
    colors: ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"],
  },
  {
    name: "TRANS PRIDE",
    definition: "GENDER BEYOND THE BINARY · BE WHO YOU ARE",
    colors: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  },
  {
    name: "BISEXUAL PRIDE",
    definition: "ATTRACTION BEYOND GENDER BINARIES · LOVE IS LOVE",
    colors: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
  },
  {
    name: "PANSEXUAL PRIDE",
    definition: "LOVE REGARDLESS OF GENDER OR IDENTITY",
    colors: ["#FF218C", "#FFD800", "#21B1FF"],
  },
  {
    name: "NON-BINARY PRIDE",
    definition: "BEYOND HE AND SHE · YOUR IDENTITY IS VALID",
    defStripe: 2,
    colors: ["#FCF434", "#FFFFFF", "#9C59D1", "#2D2D2D"],
  },
  {
    name: "LESBIAN PRIDE",
    definition: "WOMEN WHO LOVE WOMEN · SAPPHIC AND PROUD",
    colors: [
      "#D52D00",
      "#EF7627",
      "#FF9A56",
      "#FFFFFF",
      "#D162A4",
      "#B55690",
      "#A50062",
    ],
  },
  {
    name: "ASEXUAL PRIDE",
    definition: "LITTLE OR NO SEXUAL ATTRACTION · ACE AND VALID",
    defStripe: 3,
    colors: ["#1A1A1A", "#A3A3A3", "#FFFFFF", "#810081"],
  },
  {
    name: "GENDERQUEER PRIDE",
    definition: "REJECTING GENDER NORMS · FLUID AND FREE",
    colors: ["#B77FDD", "#FFFFFF", "#498023"],
  },
];

// ── Glyph grid parameters ──────────────────────────────────────────────────
const FONT_SIZE = 10;
const GX = 7.9; // horizontal step (px)
const GY = 12.9; // vertical step   (px)

// ── Flag rect + layout ─────────────────────────────────────────────────────
let F = {}; // { x, y, w, h, cols, rows }
let vignette = null;

function computeLayout() {
  const vw = innerWidth,
    vh = innerHeight;
  let fw = Math.min(vw * 0.88, 880);
  let fh = fw * (2 / 3);
  if (fh > vh * 0.68) {
    fh = vh * 0.68;
    fw = fh * 1.5;
  }
  F = {
    x: (vw - fw) * 0.5,
    y: (vh - fh) * 0.5 - 14,
    w: fw,
    h: fh,
    cols: Math.floor(fw / GX),
    rows: Math.floor(fh / GY),
  };
  canvas.width = vw;
  canvas.height = vh;

  // Position UI label at the midpoint of the space below the flag
  const uiEl = document.getElementById("ui");
  if (uiEl) {
    const flagBottom = F.y + F.h;
    const uiH = uiEl.offsetHeight || 36;
    uiEl.style.top =
      Math.round(flagBottom + (vh - flagBottom - uiH) * 0.5) + "px";
    uiEl.style.bottom = "auto";
  }

  // Rebuild cached vignette gradient
  vignette = ctx.createRadialGradient(
    vw * 0.5,
    vh * 0.5,
    Math.min(vw, vh) * 0.22,
    vw * 0.5,
    vh * 0.5,
    Math.max(vw, vh) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.62)");
}

// ── Particles ──────────────────────────────────────────────────────────────
let P = [];

function hexToRGB(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function initParticles() {
  const N = F.cols * F.rows;
  P = new Array(N);
  for (let i = 0; i < N; i++) {
    P[i] = {
      ch: SRC[i % SRC.length],
      x: F.x + Math.random() * F.w,
      y: F.y + Math.random() * F.h,
      r: 120,
      g: 120,
      b: 120,
      a: 0,
      tx: 0,
      ty: 0,
      tr: 120,
      tg: 120,
      tb: 120,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14,
      col: i % F.cols,
      row: (i / F.cols) | 0,
      bx: 0, // base X for horizontal scroll
      si: 0, // stripe index
    };
  }
}

function applyTargets(flag) {
  const n = flag.colors.length;
  const sh = F.rows / n; // rows per stripe (float)
  const driftProb = 0.1 + Math.random() * 0.15; // 10–25 % of letters drift
  for (const p of P) {
    p.si = Math.min((p.row / sh) | 0, n - 1);
    p.tx = F.x + p.col * GX;
    p.ty = F.y + p.row * GY;
    p.bx = p.tx;
    [p.tr, p.tg, p.tb] = hexToRGB(flag.colors[p.si]);
    // Per-particle random colour speed — creates gradual, uneven colour spread
    p.colorSpeed = 0.018 + Math.random() * 0.052;
    // Horizontal drift: random subset changes every transition
    p.isDrifter = Math.random() < driftProb;
    p.driftAmt = p.isDrifter
      ? (Math.random() < 0.5 ? -1 : 1) * (5 + Math.random() * 13)
      : 0;
    // Reset definition overlay (populated by setupDisplay)
    p.defCh = null;
  }
}

// ── Display setup: dance params + definition text overlay ─────────────────
function setupDisplay() {
  const flag = FLAGS[fidx];
  const n = flag.colors.length;

  // Assign individual dance parameters to every particle
  for (const p of P) {
    p.defCh = null;
    const isDancer = Math.random() < 0.25;
    p.danceAmp    = isDancer ? 1.5 + Math.random() * 2.5 : 0.1 + Math.random() * 0.4;
    p.danceFreqX  = 0.00035 + Math.random() * 0.00070;
    p.danceFreqY  = 0.00028 + Math.random() * 0.00055;
    p.dancePhaseX = Math.random() * Math.PI * 2;
    p.dancePhaseY = Math.random() * Math.PI * 2;
  }

  // Write definition into a randomly chosen stripe
  const def = flag.definition;
  if (!def) return;

  const defStripeIdx = flag.defStripe ?? Math.floor(Math.random() * n);
  const rowStart = Math.floor((defStripeIdx * F.rows) / n);
  const rowEnd   = Math.floor(((defStripeIdx + 1) * F.rows) / n);
  const midRow   = Math.floor((rowStart + rowEnd) / 2);

  // Pick the flag colour with maximum luminance contrast to the chosen stripe
  const [sr, sg, sb] = hexToRGB(flag.colors[defStripeIdx]);
  const stripeLum = 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
  let bestDist = -1, contrastIdx = (defStripeIdx + 1) % n;
  for (let ci = 0; ci < n; ci++) {
    if (ci === defStripeIdx) continue;
    const [cr, cg, cb] = hexToRGB(flag.colors[ci]);
    const d = Math.abs(0.2126 * cr + 0.7152 * cg + 0.0722 * cb - stripeLum);
    if (d > bestDist) { bestDist = d; contrastIdx = ci; }
  }
  let [defR, defG, defB] = hexToRGB(flag.colors[contrastIdx]);
  // Fallback to white/dark if contrast is still too low
  if (bestDist < 40) {
    const v = stripeLum > 127 ? 20 : 235;
    defR = defG = defB = v;
  }

  // Centre definition text in the middle row of the chosen stripe
  const startCol = Math.max(0, Math.floor((F.cols - def.length) / 2));
  for (let ci = 0; ci < def.length; ci++) {
    const col = startCol + ci;
    if (col >= F.cols) break;
    const idx = midRow * F.cols + col;
    if (idx < P.length) {
      P[idx].defCh    = def[ci];
      P[idx].defR     = defR;
      P[idx].defG     = defG;
      P[idx].defB     = defB;
      P[idx].danceAmp = 0; // keep definition letters still
    }
  }
}

// ── Transition system ──────────────────────────────────────────────────────────
let sparks = null; // Float32Array (parallel to P); null until init()

// ── State machine ──────────────────────────────────────────────────────────
let fidx = 0;
let phase = "transition";
let phaseT = 0;
let lastTs = 0;

// Duration of each phase in milliseconds
const DUR = { transition: 2600, display: 8200 };

const lerp = (a, b, t) => a + (b - a) * t;

function update(ts) {
  const dt = Math.min(ts - lastTs, 50); // cap delta to avoid jumps
  lastTs = ts;
  const el = ts - phaseT;
  const fl = FLAGS[fidx];

  // ── State transitions ────────────────────────────────────────────────────
  if (phase === "transition" && el >= DUR.transition) {
    phase = "display";
    phaseT = ts;
    nameEl.textContent = fl.name;
    setupDisplay();
  } else if (phase === "display" && el >= DUR.display) {
    fidx = (fidx + 1) % FLAGS.length;
    applyTargets(FLAGS[fidx]);
    sparks = new Float32Array(P.length); // reset sparks on each flag change
    phase = "transition";
    phaseT = ts;
  }

  // ── Particle physics ─────────────────────────────────────────────────────
  if (phase === "transition") {
    const t = Math.min(el / DUR.transition, 1);
    for (const p of P) {
      // Subtle horizontal drift: ease in (0→40%) hold, ease out (40→100%)
      let driftOffset = 0;
      if (p.isDrifter && p.driftAmt !== 0) {
        if (t < 0.4) {
          driftOffset = p.driftAmt * (t / 0.4);
        } else {
          driftOffset = p.driftAmt * (1 - (t - 0.4) / 0.6);
        }
      }
      p.x = p.tx + driftOffset;
      p.y = p.ty;

      // Gradual colour change at each letter's own random speed
      p.r = lerp(p.r, p.tr, p.colorSpeed);
      p.g = lerp(p.g, p.tg, p.colorSpeed);
      p.b = lerp(p.b, p.tb, p.colorSpeed);
      p.a = lerp(p.a, 1, 0.07);
    }
  } else {
    // 'display' — organic letter dance + definition text overlay
    for (const p of P) {
      p.x = p.tx + Math.sin(ts * p.danceFreqX + p.dancePhaseX) * p.danceAmp;
      p.y = p.ty + Math.sin(ts * p.danceFreqY + p.dancePhaseY) * p.danceAmp * 0.6;
    }

    // ── Colour convergence: definition letters → contrast colour, others → stripe ──
    for (const p of P) {
      if (p.defCh !== null) {
        p.r = lerp(p.r, p.defR, 0.04);
        p.g = lerp(p.g, p.defG, 0.04);
        p.b = lerp(p.b, p.defB, 0.04);
      } else {
        p.r = lerp(p.r, p.tr, 0.09);
        p.g = lerp(p.g, p.tg, 0.09);
        p.b = lerp(p.b, p.tb, 0.09);
      }
      p.a = lerp(p.a, 1, 0.07);
    }

    // ── Sparse white flashes ─────────────────────────────────────────────
    if (sparks) {
      if (Math.random() < 0.13) {
        const nStripes = FLAGS[fidx].colors.length;
        const si = Math.floor(Math.random() * nStripes);
        const rowStart = Math.floor((si * F.rows) / nStripes);
        const rowEnd = Math.floor(((si + 1) * F.rows) / nStripes);
        const row =
          rowStart + Math.floor(Math.random() * Math.max(1, rowEnd - rowStart));
        const col = Math.floor(Math.random() * F.cols);
        const idx = row * F.cols + col;
        if (idx < sparks.length) sparks[idx] = 1.0;
      }
      for (let i = 0; i < sparks.length; i++) {
        if (sparks[i] > 0) sparks[i] = Math.max(0, sparks[i] - 0.025);
      }
    }
  }
}

// ── Draw ───────────────────────────────────────────────────────────────────
function draw() {
  // Background
  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Flag outline — transparent dashed border delimiting the flag area
  ctx.save();
  ctx.setLineDash([4, 6]);
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  ctx.strokeRect(F.x, F.y, F.w, F.h);
  ctx.restore();

  // Subtitle above the flag
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 10px 'Courier New',monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(
    "STONEWALL 1969  ·  PRIDE FOREVER  ·  LOVE IS LOVE",
    canvas.width * 0.5,
    F.y - 8,
  );
  ctx.restore();

  // ── Letter particles ────────────────────────────────────────────────────
  ctx.font = `bold ${FONT_SIZE}px 'Courier New',monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  for (let i = 0; i < P.length; i++) {
    const p = P[i];
    if (p.a < 0.015) continue;
    let R = p.r | 0,
      G = p.g | 0,
      B = p.b | 0;
    // Spark: white flash that fades over ~40 frames
    if (sparks && sparks[i] > 0) {
      const t = sparks[i];
      R = lerp(p.r, 255, t) | 0;
      G = lerp(p.g, 255, t) | 0;
      B = lerp(p.b, 255, t) | 0;
    }
    ctx.globalAlpha = p.a;
    ctx.fillStyle = `rgb(${R},${G},${B})`;
    ctx.fillText(phase === "display" && p.defCh ? p.defCh : p.ch, p.x, p.y);
  }
  ctx.globalAlpha = 1;

  // Vignette overlay (cinematic framing)
  if (vignette) {
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// ── Main loop ──────────────────────────────────────────────────────────────
function loop(ts) {
  update(ts);
  draw();
  requestAnimationFrame(loop);
}

// ── Bootstrap ──────────────────────────────────────────────────────────────
function init() {
  computeLayout();
  initParticles();
  sparks = new Float32Array(P.length);
  applyTargets(FLAGS[0]);
  // Snap all particles to their starting positions and colours
  for (const p of P) {
    p.x = p.tx;
    p.y = p.ty;
    p.r = p.tr;
    p.g = p.tg;
    p.b = p.tb;
    p.a = 0; // fade in during display
  }
  nameEl.textContent = FLAGS[0].name;
  phase = "display";
  phaseT = performance.now();
  setupDisplay();
  lastTs = performance.now();
}

window.addEventListener("resize", init);
init();
requestAnimationFrame(loop);

// ── Screenshot control API (used by automated tooling only) ───────────────
window.__pride = {
  setFlag(n) {
    fidx = n % FLAGS.length;
    applyTargets(FLAGS[fidx]);
    sparks = new Float32Array(P.length);
    for (const p of P) {
      p.x = p.tx; p.y = p.ty;
      p.r = p.tr; p.g = p.tg; p.b = p.tb;
      p.a = 1;
    }
    nameEl.textContent = FLAGS[fidx].name;
    setupDisplay();
    phase = "display";
    phaseT = performance.now();
  },
  get flagCount() { return FLAGS.length; },
};

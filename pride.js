/* PRIDE PARTICLE ANIMATION — Stonewall Memorial */

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
  "JIMFOURATT",     "PRIDE", "BOBKOHLER",    "PRIDE",
  "RAYCASTRO",      "PRIDE",
  "FREEDOM", "LOVE", "RESIST", "RISE", "TRANS", "GAY", "QUEER", "POWER",
];

let SRC = "";
while (SRC.length < 10000) {
  for (const w of WORDS) SRC += w;
}

const FLAGS = [
  { name: "RAINBOW PRIDE",    scroll: true,  colors: ["#E40303","#FF8C00","#FFED00","#008026","#004DFF","#750787"] },
  { name: "TRANS PRIDE",      scroll: false, colors: ["#55CDFC","#F7A8B8","#FFFFFF","#F7A8B8","#55CDFC"] },
  { name: "BISEXUAL PRIDE",   scroll: false, colors: ["#D60270","#D60270","#9B4F96","#0038A8","#0038A8"] },
  { name: "PANSEXUAL PRIDE",  scroll: false, colors: ["#FF218C","#FFD800","#21B1FF"] },
  { name: "NON-BINARY PRIDE", scroll: false, colors: ["#FCF434","#FFFFFF","#9C59D1","#2D2D2D"] },
  { name: "LESBIAN PRIDE",    scroll: false, colors: ["#D52D00","#EF7627","#FF9A56","#FFFFFF","#D162A4","#B55690","#A50062"] },
  { name: "ASEXUAL PRIDE",    scroll: false, colors: ["#1A1A1A","#A3A3A3","#FFFFFF","#810081"] },
  { name: "GENDERQUEER PRIDE",scroll: false, colors: ["#B77FDD","#FFFFFF","#498023"] },
];

const FONT_SIZE = 10, GX = 7.9, GY = 12.9;

let F = {}, vignette = null;

function computeLayout() {
  const vw = innerWidth, vh = innerHeight;
  let fw = Math.min(vw * 0.88, 880);
  let fh = fw * (2 / 3);
  if (fh > vh * 0.68) { fh = vh * 0.68; fw = fh * 1.5; }
  F = { x: (vw - fw) * 0.5, y: (vh - fh) * 0.5 - 14, w: fw, h: fh,
        cols: Math.floor(fw / GX), rows: Math.floor(fh / GY) };
  canvas.width = vw; canvas.height = vh;
  vignette = ctx.createRadialGradient(vw*0.5, vh*0.5, Math.min(vw,vh)*0.22,
                                       vw*0.5, vh*0.5, Math.max(vw,vh)*0.78);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.62)");
}

const lerp = (a, b, t) => a + (b - a) * t;
function hexToRGB(hex) { const n = parseInt(hex.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; }

let P = [];

function initParticles() {
  const N = F.cols * F.rows;
  P = new Array(N);
  for (let i = 0; i < N; i++) {
    P[i] = { ch: SRC[i % SRC.length],
             x: F.x + Math.random()*F.w, y: F.y + Math.random()*F.h,
             r:120, g:120, b:120, a:0, tx:0, ty:0, tr:120, tg:120, tb:120,
             vx:(Math.random()-0.5)*14, vy:(Math.random()-0.5)*14,
             col: i%F.cols, row:(i/F.cols)|0, bx:0, si:0 };
  }
}

function applyTargets(flag) {
  const n = flag.colors.length, sh = F.rows / n;
  for (const p of P) {
    p.si = Math.min((p.row/sh)|0, n-1);
    p.tx = F.x + p.col*GX; p.ty = F.y + p.row*GY; p.bx = p.tx;
    [p.tr, p.tg, p.tb] = hexToRGB(flag.colors[p.si]);
  }
}

function doScatter() {
  for (const p of P) { const ang = Math.random()*Math.PI*2, spd = 9+Math.random()*13;
    p.vx = Math.cos(ang)*spd; p.vy = Math.sin(ang)*spd; }
}

// ── State machine ──────────────────────────────────────────────────────────
let fidx=0, phase="scatter", phaseT=0, lastTs=0, scrollX=0;
const DUR = { scatter:1700, form:2400, display:5200 };

function update(ts) {
  const dt = Math.min(ts-lastTs, 50); lastTs = ts;
  const el = ts - phaseT, fl = FLAGS[fidx];

  if (phase==="scatter" && el>=DUR.scatter) {
    phase="form"; phaseT=ts; scrollX=0; nameEl.textContent=fl.name;
  } else if (phase==="form" && el>=DUR.form) {
    phase="display"; phaseT=ts;
  } else if (phase==="display" && el>=DUR.display) {
    fidx=(fidx+1)%FLAGS.length; applyTargets(FLAGS[fidx]); doScatter();
    phase="scatter"; phaseT=ts;
  }

  const cw = canvas.width+42, ch = canvas.height+42;

  if (phase==="scatter") {
    for (const p of P) {
      p.x+=p.vx; p.y+=p.vy; p.vx*=0.978; p.vy*=0.978;
      p.vy += (Math.random()-0.47)*0.28;
      if (p.x<-40) p.x=cw; else if (p.x>cw) p.x=-40;
      if (p.y<-40) p.y=ch; else if (p.y>ch) p.y=-40;
      p.r=lerp(p.r,p.tr,0.043); p.g=lerp(p.g,p.tg,0.043);
      p.b=lerp(p.b,p.tb,0.043); p.a=lerp(p.a,1,0.04);
    }
  } else if (phase==="form") {
    const spd = 0.05 + (el/DUR.form)*0.058;
    for (const p of P) {
      p.x=lerp(p.x,p.tx,spd); p.y=lerp(p.y,p.ty,spd);
      p.r=lerp(p.r,p.tr,0.075); p.g=lerp(p.g,p.tg,0.075);
      p.b=lerp(p.b,p.tb,0.075); p.a=lerp(p.a,1,0.065);
    }
  } else {
    if (fl.scroll) {
      scrollX += dt*0.042;
      for (const p of P) {
        const speed=1+p.si*0.24, off=scrollX*speed;
        const rel=(((p.bx-F.x+off)%F.w)+F.w)%F.w;
        p.x=F.x+rel; p.y=p.ty+Math.sin(ts*0.0009+p.col*0.12)*0.55;
      }
    } else {
      for (const p of P) {
        p.x=p.tx+Math.sin(ts*0.0018+p.row*0.22+p.col*0.08)*0.5;
        p.y=p.ty+Math.cos(ts*0.0013+p.col*0.14)*0.4;
      }
    }
    for (const p of P) {
      p.r=lerp(p.r,p.tr,0.09); p.g=lerp(p.g,p.tg,0.09);
      p.b=lerp(p.b,p.tb,0.09); p.a=lerp(p.a,1,0.07);
    }
  }
}

function draw() {
  ctx.fillStyle="#060606"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.save(); ctx.setLineDash([4,6]);
  ctx.strokeStyle="rgba(255,255,255,0.10)"; ctx.lineWidth=1;
  ctx.strokeRect(F.x,F.y,F.w,F.h); ctx.restore();
  ctx.save(); ctx.globalAlpha=0.12; ctx.fillStyle="#ffffff";
  ctx.font="bold 10px 'Courier New',monospace"; ctx.textAlign="center";
  ctx.textBaseline="bottom";
  ctx.fillText("STONEWALL 1969  ·  PRIDE FOREVER  ·  LOVE IS LOVE", canvas.width*0.5, F.y-8);
  ctx.restore();
  ctx.font=`bold ${FONT_SIZE}px 'Courier New',monospace`;
  ctx.textAlign="left"; ctx.textBaseline="top";
  for (const p of P) {
    if (p.a<0.015) continue;
    ctx.globalAlpha=p.a;
    ctx.fillStyle=`rgb(${p.r|0},${p.g|0},${p.b|0})`;
    ctx.fillText(p.ch,p.x,p.y);
  }
  ctx.globalAlpha=1;
  if (vignette) { ctx.fillStyle=vignette; ctx.fillRect(0,0,canvas.width,canvas.height); }
}

function loop(ts) { update(ts); draw(); requestAnimationFrame(loop); }

function init() {
  computeLayout(); initParticles(); applyTargets(FLAGS[0]);
  nameEl.textContent=FLAGS[0].name;
  phase="scatter"; phaseT=performance.now()-DUR.scatter; lastTs=performance.now();
}

window.addEventListener("resize", init);
init();
requestAnimationFrame(loop);

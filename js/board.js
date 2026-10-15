/* ============================================
   CROWN OF SHADOWS — board.js  (Ludo RPG)
   ============================================ */
'use strict';

/* ══ CHARACTERS ══ */
const CHARS = [
  { id:'harley', name:'Harley', cls:'Maga Arcana',           icon:'✦', color:'#9b59b6', dark:'#6c3483', hp:80,  maxHp:80,  mp:150, maxMp:150 },
  { id:'morgan', name:'Morgan', cls:'Guerreira de Ferro',    icon:'✚', color:'#c0392b', dark:'#922b21', hp:130, maxHp:130, mp:40,  maxMp:40  },
  { id:'lyria',  name:'Lyria',  cls:'Ladra das Sombras',     icon:'◈', color:'#7f8c8d', dark:'#566573', hp:90,  maxHp:90,  mp:60,  maxMp:60  },
  { id:'kael',   name:'Kael',   cls:'Patrulheiro do Norte',  icon:'◆', color:'#27ae60', dark:'#1e8449', hp:105, maxHp:105, mp:55,  maxMp:55  },
  { id:'darius', name:'Darius', cls:'Cavaleiro Amaldiçoado', icon:'♜', color:'#e74c3c', dark:'#922b21', hp:125, maxHp:125, mp:75,  maxMp:75  },
];

const N    = 15;
const CELL = 44;

const PATH = (() => {
  const p = [];
  for (let c = 2; c <= 12; c++) p.push([c, 2]);
  for (let r = 3; r <= 12; r++) p.push([12, r]);
  for (let c = 11; c >= 2; c--) p.push([c, 12]);
  for (let r = 11; r >= 3; r--) p.push([2, r]);
  return p;
})();
const PATH_LEN = PATH.length;

const ENTRY    = [0, 10, 20, 30, 35];
const SAFE_IDX = new Set([0, 8, 10, 18, 20, 28, 30, 38]);

const HOME_LANES = [
  [[7,3],[7,4],[7,5],[7,6],[7,7]],
  [[11,7],[10,7],[9,7],[8,7],[7,7]],
  [[7,11],[7,10],[7,9],[7,8],[7,7]],
  [[3,7],[4,7],[5,7],[6,7],[7,7]],
  [[11,3],[11,4],[11,5],[11,6],[11,7]],
];

const BASES = [
  [[1,1],[2,1],[1,2],[2,2]],
  [[12,1],[13,1],[12,2],[13,2]],
  [[12,12],[13,12],[12,13],[13,13]],
  [[1,12],[2,12],[1,13],[2,13]],
  [[6,1],[7,1],[6,0],[7,0]],
];

const CELL_TYPES = (() => {
  const t = {};
  PATH.forEach(([c,r], i) => {
    if (SAFE_IDX.has(i))   t[`${c},${r}`] = 'safe';
    else if (i % 8 === 3)  t[`${c},${r}`] = 'battle';
    else if (i % 8 === 5)  t[`${c},${r}`] = 'treasure';
    else if (i % 8 === 7)  t[`${c},${r}`] = 'danger';
    else if (i % 10 === 1) t[`${c},${r}`] = 'magic';
    else                   t[`${c},${r}`] = 'normal';
  });
  return t;
})();

/* ══ EVENTS ══ */
const EVENTS = {
  battle: [
    { title:'Emboscada', story:'Sombras emergem das paredes. Uma criatura bloqueia o caminho.', icon:'✦',
      choices:[
        { label:'Atacar',   fn: p => { dmgChar(p, 10); narrate(`${CHARS[p].name} luta e sofre 10 de dano.`); } },
        { label:'Defender', fn: p => { narrate(`${CHARS[p].name} se defende e avança com cautela.`); } },
        { label:'Fugir',    fn: p => { moveBack(p, 2); narrate(`${CHARS[p].name} recua 2 casas.`); } },
      ]},
    { title:'Guarda das Sombras', story:'Um servo de Valdrak bloqueia a passagem com uma lança negra.', icon:'◆',
      choices:[
        { label:'Enfrentar',  fn: p => { const r=roll6(); r>=4?narrate(`${CHARS[p].name} vence e avança.`):dmgChar(p,15); } },
        { label:'Habilidade', fn: p => { narrate(`${CHARS[p].name} usa sua habilidade especial e passa.`); } },
      ]},
  ],
  treasure: [
    { title:'Baú Antigo', story:'Um baú coberto de runas repousa no chão. A fechadura brilha em dourado.', icon:'◈',
      choices:[
        { label:'Abrir',    fn: p => { healChar(p, 20); narrate(`${CHARS[p].name} encontra uma poção. +20 HP.`); } },
        { label:'Examinar', fn: p => { narrate(`${CHARS[p].name} encontra um pergaminho com pistas sobre a Coroa.`); } },
      ]},
    { title:'Relíquia Perdida', story:'Entre as pedras, algo brilha. Uma relíquia da era de Valdrak.', icon:'◆',
      choices:[
        { label:'Pegar',  fn: p => { narrate(`${CHARS[p].name} guarda a relíquia.`); } },
        { label:'Deixar', fn: p => { narrate(`${CHARS[p].name} segue em frente.`); } },
      ]},
  ],
  danger: [
    { title:'Armadilha', story:'O chão cede levemente. Marcas de armadilha são visíveis tarde demais.', icon:'✕',
      choices:[
        { label:'Pular',      fn: p => { const r=roll6(); r>=3?narrate('Você pula com sucesso.'):dmgChar(p,20); } },
        { label:'Investigar', fn: p => { narrate(`${CHARS[p].name} desativa a armadilha com cuidado.`); } },
      ]},
    { title:'Névoa Venenosa', story:'Uma névoa roxa envolve a área. Respirar é difícil.', icon:'✕',
      choices:[
        { label:'Correr',   fn: p => { dmgChar(p, 8); narrate(`${CHARS[p].name} corre mas inala a névoa. -8 HP.`); } },
        { label:'Resistir', fn: p => { narrate(`${CHARS[p].name} resiste com força de vontade.`); } },
      ]},
  ],
  magic: [
    { title:'Runa Antiga', story:'Uma runa brilha no chão sob seus pés. Energia arcana pulsa.', icon:'✦',
      choices:[
        { label:'Absorver', fn: p => { healChar(p, 15); narrate(`${CHARS[p].name} absorve a energia. +15 HP.`); } },
        { label:'Estudar',  fn: p => { narrate(`${CHARS[p].name} decifra a runa e avança 1 casa.`); moveForward(p,1); } },
        { label:'Ignorar',  fn: p => { narrate(`${CHARS[p].name} passa pela runa sem tocá-la.`); } },
      ]},
  ],
  safe: [
    { title:'Refúgio Antigo', story:'Este lugar é protegido por magia antiga. Nenhum mal pode alcançá-lo aqui.', icon:'◈',
      choices:[
        { label:'Descansar', fn: p => { healChar(p, 10); narrate(`${CHARS[p].name} descansa. +10 HP.`); } },
        { label:'Continuar', fn: p => { narrate(`${CHARS[p].name} segue em frente.`); } },
      ]},
  ],
};

/* ══ GAME STATE ══ */
const S = {
  turn: 0,
  turnNum: 1,
  phase: 'roll',
  diceVal: 0,
  rolled: false,
  animating: false,
  winner: null,
  selectedPiece: -1,
  pieces: CHARS.map(() => [0,1,2,3].map(() => ({ pathIdx:-1, homeIdx:-1, done:false }))),
  hp:  CHARS.map(c => c.hp),
  mp:  CHARS.map(c => c.mp),
  inventory: [
    { icon:'◈', name:'Poção de Cura',     qty:3 },
    { icon:'✦', name:'Chave Antiga',      qty:1 },
    { icon:'◆', name:'Pergaminho Arcano', qty:2 },
    { icon:'♛', name:'Fragmento da Coroa',qty:1 },
  ],
  quests: {
    main: { title:'Ecos da Coroa', desc:'Alcance o centro do tabuleiro com todas as suas peças.',
      objs:[
        { text:'Sair da base', done:false },
        { text:'Passar pela metade do caminho', done:false },
        { text:'Entrar no corredor final', done:false },
        { text:'Alcançar a Coroa das Sombras', done:false },
      ]},
  },
  chronicle: [
    { turn:1, text:'A aventura começa. Cinco heróis partem em busca da Coroa das Sombras.' },
  ],
  doneTurns: [],
};

/* ══ HELPERS ══ */
function roll6() { return Math.floor(Math.random()*6)+1; }

function dmgChar(p, amt) {
  S.hp[p] = Math.max(0, S.hp[p] - amt);
  floatText(`-${amt} HP`, CHARS[p].color);
  Board.refreshPortraits();
}
function healChar(p, amt) {
  S.hp[p] = Math.min(CHARS[p].maxHp, S.hp[p] + amt);
  floatText(`+${amt} HP`, '#27ae60');
  Board.refreshPortraits();
}
function moveBack(p, steps) {
  S.pieces[p].forEach(pc => { if (pc.pathIdx >= 0) pc.pathIdx = Math.max(0, pc.pathIdx - steps); });
}
function moveForward(p, steps) {
  const pc = S.pieces[p][S.selectedPiece >= 0 ? S.selectedPiece : 0];
  if (pc && pc.pathIdx >= 0) pc.pathIdx = Math.min(PATH_LEN-1, pc.pathIdx + steps);
}
function floatText(txt, color) {
  const el = document.createElement('div');
  el.className = 'float-txt';
  el.style.cssText = `left:50%;top:50%;color:${color||'#c9a84c'}`;
  el.textContent = txt;
  document.getElementById('float-layer').appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

/* ══════════════════════════════════════════
   CANVAS DRAWING
══════════════════════════════════════════ */
let canvas, ctx, CS;

function initCanvas() {
  canvas = document.getElementById('board-canvas');
  ctx    = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  const wrap = document.querySelector('.g-center');
  const masterH = 110;
  const avail = Math.min(wrap.clientWidth, wrap.clientHeight - masterH);
  const size  = Math.max(300, avail - 8);
  canvas.width  = size;
  canvas.height = size;
  CS = size / N;
  drawAll();
}

function drawAll() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTableSurface();
  drawBases();
  drawPath();
  drawHomeLanes();
  drawCenter();
  drawDecorations();
  drawPieces();
}

function drawTableSurface() {
  const grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width*0.7);
  grd.addColorStop(0, '#1a1228');
  grd.addColorStop(0.6, '#120e1c');
  grd.addColorStop(1, '#0a0810');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(201,168,76,0.03)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= N; i++) {
    ctx.beginPath(); ctx.moveTo(i*CS, 0); ctx.lineTo(i*CS, canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i*CS); ctx.lineTo(canvas.width, i*CS); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(201,168,76,0.25)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, canvas.width-2, canvas.height-2);
  ctx.strokeStyle = 'rgba(201,168,76,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(CS*0.5, CS*0.5, canvas.width-CS, canvas.height-CS);
}

function drawPath() {
  PATH.forEach(([c, r], i) => {
    drawPathCell(c*CS, r*CS, CS, CELL_TYPES[`${c},${r}`] || 'normal', i);
  });
}

function drawPathCell(x, y, s, type, idx) {
  const grd = ctx.createLinearGradient(x, y, x+s, y+s);
  grd.addColorStop(0, '#221a2e');
  grd.addColorStop(1, '#1a1228');
  ctx.fillStyle = grd;
  roundRect(ctx, x+1, y+1, s-2, s-2, 3); ctx.fill();
  ctx.strokeStyle = 'rgba(201,168,76,0.15)';
  ctx.lineWidth = 0.8;
  roundRect(ctx, x+1, y+1, s-2, s-2, 3); ctx.stroke();

  const cx = x+s/2, cy = y+s/2;
  const typeMap = {
    safe:     { bg:'rgba(201,168,76,0.12)',  fg:'rgba(201,168,76,0.7)',  sym:'◈' },
    battle:   { bg:'rgba(192,57,43,0.12)',   fg:'rgba(192,57,43,0.8)',   sym:'✦' },
    treasure: { bg:'rgba(201,168,76,0.1)',   fg:'rgba(201,168,76,0.8)',  sym:'◆' },
    danger:   { bg:'rgba(100,0,0,0.15)',     fg:'rgba(150,0,0,0.8)',     sym:'✕' },
    magic:    { bg:'rgba(100,50,200,0.12)',  fg:'rgba(150,80,255,0.8)',  sym:'✦' },
  };
  const t = typeMap[type];
  if (t) {
    ctx.fillStyle = t.bg;
    roundRect(ctx, x+1, y+1, s-2, s-2, 3); ctx.fill();
    ctx.font = `bold ${s*0.38}px Cinzel,serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = t.fg;
    ctx.fillText(t.sym, cx, cy);
  } else if (idx % 7 === 0) {
    ctx.font = `${s*0.28}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(201,168,76,0.12)';
    ctx.fillText('·', cx, cy);
  }

  ENTRY.forEach((ei, p) => {
    if (ei === idx) {
      ctx.strokeStyle = CHARS[p].color + '88';
      ctx.lineWidth = 2;
      roundRect(ctx, x+2, y+2, s-4, s-4, 3); ctx.stroke();
    }
  });
}

function drawBases() {
  CHARS.forEach((ch, p) => {
    const cells = BASES[p];
    const xs = cells.map(([c]) => c), ys = cells.map(([,r]) => r);
    const minC = Math.min(...xs), maxC = Math.max(...xs);
    const minR = Math.min(...ys), maxR = Math.max(...ys);
    const x = minC*CS, y = minR*CS;
    const w = (maxC-minC+1)*CS, h = (maxR-minR+1)*CS;
    const grd = ctx.createRadialGradient(x+w/2,y+h/2,0,x+w/2,y+h/2,w*0.8);
    grd.addColorStop(0, ch.dark+'99');
    grd.addColorStop(1, ch.dark+'22');
    ctx.fillStyle = grd;
    roundRect(ctx, x+1, y+1, w-2, h-2, 6); ctx.fill();
    ctx.strokeStyle = ch.color+'66';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x+1, y+1, w-2, h-2, 6); ctx.stroke();
    ctx.font = `bold ${CS*0.55}px Cinzel,serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = ch.color+'55';
    ctx.fillText(ch.icon, x+w/2, y+h/2);
    ctx.font = `bold ${CS*0.22}px Cinzel,serif`;
    ctx.fillStyle = ch.color+'cc';
    ctx.fillText(ch.name.toUpperCase(), x+w/2, y+h-CS*0.18);
  });
}

function drawHomeLanes() {
  HOME_LANES.forEach((lane, p) => {
    lane.forEach(([c, r], i) => {
      if (c === 7 && r === 7) return;
      const x = c*CS, y = r*CS;
      const alpha = 0.1 + i*0.06;
      const hex = Math.round(alpha*255).toString(16).padStart(2,'0');
      ctx.fillStyle = CHARS[p].color + hex;
      roundRect(ctx, x+1, y+1, CS-2, CS-2, 3); ctx.fill();
      ctx.strokeStyle = CHARS[p].color + '44';
      ctx.lineWidth = 0.8;
      roundRect(ctx, x+1, y+1, CS-2, CS-2, 3); ctx.stroke();
    });
  });
}

function drawCenter() {
  const cx = 7*CS + CS/2, cy = 7*CS + CS/2;
  const r  = CS * 1.4;
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r*2);
  grd.addColorStop(0, 'rgba(201,168,76,0.2)');
  grd.addColorStop(0.4, 'rgba(122,0,0,0.15)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(cx, cy, r*2, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(20,12,30,0.95)';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(201,168,76,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = 'rgba(201,168,76,0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, r*0.65, 0, Math.PI*2); ctx.stroke();
  ctx.font = `${CS*1.1}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(201,168,76,0.85)';
  ctx.shadowColor = 'rgba(201,168,76,0.6)';
  ctx.shadowBlur  = 16;
  ctx.fillText('♛', cx, cy);
  ctx.shadowBlur = 0;
  ctx.font = `bold ${CS*0.2}px Cinzel,serif`;
  ctx.fillStyle = 'rgba(201,168,76,0.5)';
  ctx.fillText('COROA', cx, cy + r*0.75);
}

function drawDecorations() {
  const corners = [[0,0],[14,0],[0,14],[14,14],[7,0],[0,7],[14,7],[7,14]];
  corners.forEach(([c,r]) => {
    const x = c*CS+CS/2, y = r*CS+CS/2;
    const grd = ctx.createRadialGradient(x, y, 0, x, y, CS*0.6);
    grd.addColorStop(0, 'rgba(255,180,50,0.18)');
    grd.addColorStop(1, 'rgba(255,100,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(x, y, CS*0.6, 0, Math.PI*2); ctx.fill();
    ctx.font = `bold ${CS*0.38}px Cinzel,serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(201,168,76,0.35)';
    ctx.fillText('✦', x, y);
  });
}

function drawPieces() {
  CHARS.forEach((ch, p) => {
    S.pieces[p].forEach((piece, i) => {
      let cx, cy;
      if (piece.done) {
        const off = [[-0.22,-0.22],[0.22,-0.22],[-0.22,0.22],[0.22,0.22]];
        cx = (7 + off[i][0]) * CS + CS/2;
        cy = (7 + off[i][1]) * CS + CS/2;
      } else if (piece.homeIdx >= 0) {
        const [hc, hr] = HOME_LANES[p][piece.homeIdx];
        cx = hc*CS + CS/2; cy = hr*CS + CS/2;
      } else if (piece.pathIdx >= 0) {
        const [pc, pr] = PATH[piece.pathIdx];
        cx = pc*CS + CS/2; cy = pr*CS + CS/2;
        const stack = S.pieces[p].filter((pc2,j) => j!==i && pc2.pathIdx===piece.pathIdx).length;
        if (stack > 0) { cx += (stack%2===0?1:-1)*CS*0.15; cy += (stack>1?1:-1)*CS*0.15; }
      } else {
        const [bc, br] = BASES[p][i];
        cx = bc*CS + CS/2; cy = br*CS + CS/2;
      }
      drawPiece(cx, cy, p, i, piece);
    });
  });
}

function drawPiece(cx, cy, p, i, piece) {
  const ch = CHARS[p];
  const r  = CS * 0.33;
  const isActive = S.turn === p && S.rolled && canMove(p, i);
  const isSel    = S.turn === p && S.selectedPiece === i;
  const isTurn   = S.turn === p;

  if (isTurn && !S.rolled) {
    ctx.strokeStyle = ch.color + '66';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.arc(cx, cy, r+5, 0, Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);
  }
  if (isSel) {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r+6, 0, Math.PI*2); ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.ellipse(cx, cy+r*0.75, r*0.65, r*0.2, 0, 0, Math.PI*2);
  ctx.fill();
  const grd = ctx.createRadialGradient(cx-r*0.3, cy-r*0.3, 0, cx, cy, r);
  grd.addColorStop(0, ch.color);
  grd.addColorStop(1, ch.dark);
  ctx.fillStyle = grd;
  if (isActive) { ctx.shadowColor = ch.color; ctx.shadowBlur = 12; }
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = isTurn ? ch.color : ch.color+'66';
  ctx.lineWidth   = isTurn ? 2 : 1;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
  ctx.font = `bold ${r*0.85}px Cinzel,serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText(ch.icon, cx, cy);
  const hpPct = S.hp[p] / ch.maxHp;
  const bw = r*2, bh = 3, bx = cx-r, by = cy+r+2;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = hpPct > 0.5 ? '#27ae60' : hpPct > 0.25 ? '#f39c12' : '#c0392b';
  ctx.fillRect(bx, by, bw*hpPct, bh);
  if (piece.done) {
    ctx.font = `bold ${r*0.5}px Cinzel,serif`;
    ctx.fillStyle = '#f0d080';
    ctx.fillText('♛', cx+r*0.55, cy-r*0.55);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

/* ══════════════════════════════════════════
   GAME LOGIC
══════════════════════════════════════════ */
function canMove(p, i) {
  if (S.turn !== p || !S.rolled) return false;
  const pc = S.pieces[p][i];
  if (pc.done) return false;
  const v = S.diceVal;
  if (pc.pathIdx < 0 && pc.homeIdx < 0) return v === 6;
  if (pc.homeIdx >= 0) return pc.homeIdx + v <= 4;
  return v <= distToHome(p, pc.pathIdx);
}

function distToHome(p, pathIdx) {
  const homeEntry = (ENTRY[p] + PATH_LEN - 1) % PATH_LEN;
  if (pathIdx <= homeEntry) return homeEntry - pathIdx + 1;
  return PATH_LEN - pathIdx + homeEntry + 1;
}

function doMove(p, i) {
  if (!canMove(p, i)) return;
  const pc = S.pieces[p][i];
  const v  = S.diceVal;
  S.selectedPiece = i;

  if (pc.pathIdx < 0 && pc.homeIdx < 0) {
    pc.pathIdx = ENTRY[p];
    addChronicle(`${CHARS[p].name} saiu da base.`);
    floatText('SAIU', CHARS[p].color);
    S.quests.main.objs[0].done = true;
    setTimeout(() => afterMove(p, i), 300);
  } else if (pc.homeIdx >= 0) {
    const newIdx = pc.homeIdx + v;
    if (newIdx >= 4) {
      pc.homeIdx = -1; pc.done = true;
      addChronicle(`${CHARS[p].name} chegou à Coroa das Sombras. ♛`);
      floatText('♛ CHEGOU', CHARS[p].color);
      S.quests.main.objs[3].done = true;
      checkWin(p);
    } else {
      pc.homeIdx = newIdx;
      S.quests.main.objs[2].done = true;
    }
    afterMove(p, i);
  } else {
    const dist = distToHome(p, pc.pathIdx);
    if (v === dist) {
      pc.pathIdx = -1; pc.homeIdx = 0;
      S.quests.main.objs[2].done = true;
      addChronicle(`${CHARS[p].name} entrou no corredor final.`);
    } else {
      const newPathIdx = (pc.pathIdx + v) % PATH_LEN;
      pc.pathIdx = newPathIdx;
      if (newPathIdx >= PATH_LEN/2) S.quests.main.objs[1].done = true;
      checkCapture(p, newPathIdx);
    }
    afterMove(p, i);
  }
}

function checkCapture(attacker, pathIdx) {
  if (SAFE_IDX.has(pathIdx)) return;
  CHARS.forEach((_, p) => {
    if (p === attacker) return;
    S.pieces[p].forEach(pc => {
      if (pc.pathIdx === pathIdx) showConfront(attacker, p, pathIdx);
    });
  });
}

function showConfront(attacker, defender, pathIdx) {
  const a = CHARS[attacker], d = CHARS[defender];
  document.getElementById('cf-title').textContent = 'CONFRONTO';
  document.getElementById('cf-story').textContent = `${a.name} encontrou ${d.name} na mesma casa.`;
  const choices = document.getElementById('cf-choices');
  choices.innerHTML = '';
  [
    { label:'Enfrentar', fn: () => {
        const r = roll6();
        if (r >= 4) {
          S.pieces[defender].forEach(pc => { if(pc.pathIdx===pathIdx) pc.pathIdx=-1; });
          narrate(`${a.name} vence. ${d.name} volta para a base.`);
          addChronicle(`${a.name} capturou ${d.name}.`);
        } else {
          dmgChar(attacker, 15);
          narrate(`${a.name} perde o confronto e sofre 15 de dano.`);
        }
        closeModal('modal-confront'); drawAll();
      }},
    { label:'Defender', fn: () => {
        narrate(`${d.name} se defende. Nenhum recua.`);
        closeModal('modal-confront');
      }},
    { label:'Recuar', fn: () => {
        moveBack(attacker, 1);
        narrate(`${a.name} recua 1 casa.`);
        closeModal('modal-confront'); drawAll();
      }},
  ].forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = o.label;
    btn.onclick = o.fn;
    choices.appendChild(btn);
  });
  document.getElementById('modal-confront').style.display = 'flex';
}

function afterMove(p, i) {
  S.rolled = false;
  drawAll();
  Board.refreshPortraits();
  Board.refreshActions();
  const pc = S.pieces[p][i];
  if (pc.pathIdx >= 0) {
    const [c, r] = PATH[pc.pathIdx];
    const type = CELL_TYPES[`${c},${r}`] || 'normal';
    if (type !== 'normal') { setTimeout(() => triggerEvent(p, type), 400); return; }
  }
  if (S.diceVal === 6 && !S.winner) {
    setTimeout(() => {
      narrate(`${CHARS[p].name} tirou 6 — joga novamente.`);
      floatText('JOGA DE NOVO', CHARS[p].color);
      S.phase = 'roll';
      Board.refreshActions();
    }, 500);
  } else if (!S.winner) {
    setTimeout(() => nextTurn(), 600);
  }
}

function triggerEvent(p, type) {
  const pool = EVENTS[type];
  if (!pool || !pool.length) { nextTurn(); return; }
  const ev = pool[Math.floor(Math.random()*pool.length)];
  document.getElementById('ev-icon').textContent  = ev.icon;
  document.getElementById('ev-title').textContent = ev.title;
  document.getElementById('ev-story').textContent = ev.story;
  const choices = document.getElementById('ev-choices');
  choices.innerHTML = '';
  ev.choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch.label;
    btn.onclick = () => {
      ch.fn(p);
      closeModal('modal-event');
      drawAll();
      Board.refreshPortraits();
      if (!S.winner) setTimeout(() => nextTurn(), 400);
    };
    choices.appendChild(btn);
  });
  document.getElementById('modal-event').style.display = 'flex';
  narrate(`${CHARS[p].name}: ${ev.story}`);
}

function checkWin(p) {
  if (S.pieces[p].every(pc => pc.done)) {
    S.winner = p;
    S.phase  = 'done';
    setTimeout(() => {
      document.getElementById('win-title').textContent = `${CHARS[p].name.toUpperCase()} VENCEU!`;
      document.getElementById('win-sub').textContent   = 'A Coroa das Sombras foi conquistada.';
      document.getElementById('modal-win').style.display = 'flex';
    }, 800);
  }
}

function nextTurn() {
  S.doneTurns.push(S.turn);
  S.turn = (S.turn + 1) % CHARS.length;
  if (S.doneTurns.length >= CHARS.length) { S.turnNum++; S.doneTurns = []; }
  S.phase  = 'roll';
  S.rolled = false;
  S.selectedPiece = -1;
  showTurnBanner(`TURNO DE ${CHARS[S.turn].name.toUpperCase()}`);
  narrate(randomNarration(S.turn));
  drawAll();
  Board.refreshAll();
}

function randomNarration(p) {
  const lines = [
    `"${CHARS[p].name} avança pelas sombras de Eryndor."`,
    `"${CHARS[p].name} sente a presença da Coroa se aproximar."`,
    `"As tochas tremem enquanto ${CHARS[p].name} lança o dado."`,
    `"${CHARS[p].name} move suas peças com determinação."`,
    `"A Coroa das Sombras pulsa. ${CHARS[p].name} está mais perto."`,
    `"Cada passo em Eryndor pode ser o último. ${CHARS[p].name} avança."`,
  ];
  return lines[Math.floor(Math.random()*lines.length)];
}

/* ══ DICE ══ */
function doDiceRoll() {
  if (S.phase !== 'roll' || S.rolled || S.animating || S.winner) return;
  const svg = document.getElementById('die-svg');
  svg.classList.remove('rolling');
  void svg.offsetWidth;
  svg.classList.add('rolling');
  S.animating = true;
  setTimeout(() => {
    const v = roll6();
    S.diceVal = v;
    S.rolled  = true;
    S.animating = false;
    const pips = document.getElementById('die-pips');
    pips.innerHTML = '';
    const PIP_POS = {
      1:[[40,40]],
      2:[[22,22],[58,58]],
      3:[[22,22],[40,40],[58,58]],
      4:[[22,22],[58,22],[22,58],[58,58]],
      5:[[22,22],[58,22],[40,40],[22,58],[58,58]],
      6:[[22,20],[58,20],[22,40],[58,40],[22,60],[58,60]],
    };
    (PIP_POS[v]||[]).forEach(([cx,cy]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx',cx); c.setAttribute('cy',cy); c.setAttribute('r',6);
      c.setAttribute('fill','#c9a84c');
      pips.appendChild(c);
    });
    document.getElementById('dice-num').textContent = v;
    document.getElementById('dice-num').className   = 'dice-num' + (v===6?' crit':'');
    document.getElementById('dice-verdict').textContent = v===6 ? 'CRÍTICO — JOGA DE NOVO' : '';
    document.getElementById('dice-result').style.display = 'block';
    const p = S.turn;
    const hasMove = S.pieces[p].some((_,i) => canMove(p,i));
    if (!hasMove) {
      narrate(`${CHARS[p].name} tirou ${v} mas não tem jogada possível.`);
      setTimeout(() => nextTurn(), 1200);
    } else {
      narrate(`${CHARS[p].name} tirou ${v}. Clique em uma peça para mover.`);
    }
    drawAll();
    Board.refreshActions();
  }, 580);
}

/* ══ CANVAS CLICK ══ */
function onCanvasClick(e) {
  if (!S.rolled || S.animating || S.winner) return;
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
  const my = (e.clientY - rect.top)  * (canvas.height / rect.height);
  const p  = S.turn;
  S.pieces[p].forEach((piece, i) => {
    if (!canMove(p, i)) return;
    let cx, cy;
    if (piece.pathIdx < 0 && piece.homeIdx < 0) {
      const [bc,br] = BASES[p][i]; cx = bc*CS+CS/2; cy = br*CS+CS/2;
    } else if (piece.homeIdx >= 0) {
      const [hc,hr] = HOME_LANES[p][piece.homeIdx]; cx = hc*CS+CS/2; cy = hr*CS+CS/2;
    } else {
      const [pc,pr] = PATH[piece.pathIdx]; cx = pc*CS+CS/2; cy = pr*CS+CS/2;
    }
    if (Math.hypot(mx-cx, my-cy) < CS*0.45) doMove(p, i);
  });
}

/* ══ NARRATION ══ */
let _narrTimer = null;
function narrate(text) {
  const el = document.getElementById('master-text');
  if (_narrTimer) clearInterval(_narrTimer);
  el.textContent = '';
  let i = 0;
  _narrTimer = setInterval(() => {
    if (i < text.length) el.textContent = text.slice(0, ++i);
    else clearInterval(_narrTimer);
  }, 16);
}

function showTurnBanner(text) {
  const el = document.getElementById('turn-banner');
  el.textContent = text;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function addChronicle(text) { S.chronicle.push({ turn: S.turnNum, text }); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

/* ══════════════════════════════════════════
   BOARD CONTROLLER
══════════════════════════════════════════ */
const Board = (() => {

  function init() {
    buildIntroChars();
    document.getElementById('intro-start').onclick = startGame;
    initParticles();
  }

  function buildIntroChars() {
    const wrap = document.getElementById('intro-chars');
    wrap.innerHTML = '';
    CHARS.forEach(ch => {
      const div = document.createElement('div');
      div.className = 'intro-char';
      div.innerHTML = `<div class="intro-char-icon" style="font-family:'Cinzel',serif;color:${ch.color}">${ch.icon}</div><div class="intro-char-name">${ch.name}</div>`;
      wrap.appendChild(div);
    });
  }

  function startGame() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display  = 'block';
    initCanvas();
    refreshAll();
    narrate('"A Coroa das Sombras aguarda no centro do tabuleiro. Quem chegará primeiro?"');
    if (!localStorage.getItem('cos_board_tut')) Tutorial.start();
  }

  function refreshAll() {
    refreshPortraits();
    refreshTurnOrder();
    refreshActions();
    drawAll();
  }

  function refreshPortraits() {
    const list = document.getElementById('portrait-list');
    list.innerHTML = '';
    CHARS.forEach((ch, p) => {
      const hpPct = (S.hp[p] / ch.maxHp * 100).toFixed(0);
      const mpPct = (S.mp[p] / ch.maxMp * 100).toFixed(0);
      const isActive = S.turn === p;
      const div = document.createElement('div');
      div.className = 'portrait-card' + (isActive ? ' active' : '') + (S.hp[p]<=0?' dead':'');
      div.onclick = () => { if (S.turn===p) { S.selectedPiece = (S.selectedPiece+1)%4; drawAll(); } };
      div.innerHTML = `
        <div class="portrait-face" style="background:${ch.dark};border-color:${isActive?ch.color:'rgba(201,168,76,.25)'};font-family:'Cinzel',serif;color:${ch.color}">
          ${ch.icon}
        </div>
        <div class="portrait-info">
          <div class="portrait-name">${ch.name}</div>
          <div class="portrait-class">${ch.cls}</div>
          <div class="portrait-bars">
            <div class="pbar pbar-hp">
              <span class="pbar-icon">♥</span>
              <div class="pbar-track"><div class="pbar-fill" style="width:${hpPct}%"></div></div>
              <span class="pbar-val">${S.hp[p]}</span>
            </div>
            <div class="pbar pbar-mp">
              <span class="pbar-icon">◆</span>
              <div class="pbar-track"><div class="pbar-fill" style="width:${mpPct}%"></div></div>
              <span class="pbar-val">${S.mp[p]}</span>
            </div>
          </div>
          <div class="portrait-pos">Casa ${getPiecePos(p)}</div>
        </div>`;
      list.appendChild(div);
    });
  }

  function getPiecePos(p) {
    const pieces = S.pieces[p];
    const onPath = pieces.filter(pc => pc.pathIdx >= 0);
    if (onPath.length) return onPath[0].pathIdx;
    const inHome = pieces.filter(pc => pc.homeIdx >= 0);
    if (inHome.length) return `Corredor ${inHome[0].homeIdx+1}`;
    const done = pieces.filter(pc => pc.done).length;
    if (done) return `${done} no centro`;
    return 'Base';
  }

  function refreshTurnOrder() {
    document.getElementById('g-turn-num').textContent = String(S.turnNum).padStart(2,'0');
    const container = document.getElementById('g-turn-order');
    container.innerHTML = '';
    CHARS.forEach((ch, p) => {
      const div = document.createElement('div');
      div.className = 'g-turn-tok' + (S.turn===p?' active':'') + (S.doneTurns.includes(p)?' done':'');
      div.style.background  = ch.dark;
      div.style.borderColor = S.turn===p ? ch.color : 'rgba(201,168,76,.2)';
      div.title = ch.name;
      div.textContent = ch.name[0];
      container.appendChild(div);
    });
  }

  function refreshActions() {
    const list = document.getElementById('action-list');
    list.innerHTML = '';
    const p  = S.turn;
    const ch = CHARS[p];

    if (S.phase === 'roll' && !S.rolled) {
      addAction(list, '◈', 'Rolar Dado', () => doDiceRoll(), true);
    }
    if (S.rolled) {
      const movable = S.pieces[p].filter((_,i) => canMove(p,i));
      if (movable.length > 0) {
        addAction(list, ch.icon, 'Mover Peça', () => {
          const idx = S.pieces[p].findIndex((_,i) => canMove(p,i));
          if (idx >= 0) doMove(p, idx);
        }, true);
      }
    }
    addAction(list, '◆', 'Inventário', () => toggleInventory());
    addAction(list, '◆', 'Missões',    () => toggleQuests());
    addAction(list, '◆', 'Crônica',    () => toggleChronicle());

    const mc = document.getElementById('master-choices');
    mc.innerHTML = '';
    if (S.rolled) {
      addMasterChoice(mc, '▶', 'Continuar', () => {
        if (!S.rolled) return;
        const idx = S.pieces[p].findIndex((_,i) => canMove(p,i));
        if (idx >= 0) doMove(p, idx);
        else nextTurn();
      });
    }
  }

  function addAction(list, icon, label, fn, primary) {
    const btn = document.createElement('button');
    btn.className = 'act-btn' + (primary ? ' primary' : '');
    btn.innerHTML = `<span class="act-icon" style="font-family:'Cinzel',serif">${icon}</span>${label}`;
    btn.onclick = fn;
    list.appendChild(btn);
  }

  function addMasterChoice(container, icon, label, fn) {
    const btn = document.createElement('button');
    btn.className = 'm-choice';
    btn.innerHTML = `${icon} ${label}`;
    btn.onclick = fn;
    container.appendChild(btn);
  }

  function toggleInventory() {
    const m = document.getElementById('modal-inv');
    const open = m.style.display !== 'none';
    m.style.display = open ? 'none' : 'flex';
    if (!open) renderInventory();
  }
  function toggleQuests() {
    const m = document.getElementById('modal-quests');
    const open = m.style.display !== 'none';
    m.style.display = open ? 'none' : 'flex';
    if (!open) renderQuests();
  }
  function toggleChronicle() {
    const m = document.getElementById('modal-chronicle');
    const open = m.style.display !== 'none';
    m.style.display = open ? 'none' : 'flex';
    if (!open) renderChronicle();
  }
  function confirmQuit() {
    document.getElementById('modal-quit').style.display = 'flex';
  }

  function renderInventory() {
    const grid = document.getElementById('inv-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const item = S.inventory[i];
      const slot = document.createElement('div');
      slot.className = 'inv-slot' + (item ? '' : ' empty');
      if (item) slot.innerHTML = `<div class="inv-icon" style="font-family:'Cinzel',serif">${item.icon}</div><div class="inv-name">${item.name}${item.qty>1?` ×${item.qty}`:''}</div>`;
      grid.appendChild(slot);
    }
  }

  function renderQuests() {
    const body = document.getElementById('quests-body');
    const q = S.quests.main;
    body.innerHTML = `
      <div class="quest-section">
        <div class="quest-label">MISSÃO PRINCIPAL</div>
        <div class="quest-title">${q.title}</div>
        <div class="quest-desc">${q.desc}</div>
        ${q.objs.map(o=>`<div class="quest-obj${o.done?' done':''}"><div class="quest-dot"></div>${o.text}</div>`).join('')}
      </div>`;
  }

  function renderChronicle() {
    const list = document.getElementById('chronicle-list');
    list.innerHTML = S.chronicle.map(e =>
      `<div class="chron-entry">
        <div class="chron-turn">Turno ${e.turn}</div>
        <div class="chron-text">${e.text}</div>
      </div>`).join('');
    list.scrollTop = list.scrollHeight;
  }

  function onCanvasClick(e) { window.onCanvasClick ? window.onCanvasClick(e) : onCanvasClick(e); }
  function rollDice() { doDiceRoll(); }

  return {
    init, refreshAll, refreshPortraits, refreshActions,
    toggleInventory, toggleQuests, toggleChronicle,
    confirmQuit, onCanvasClick, rollDice,
    tutSkip: () => Tutorial.skip(),
    tutNext: () => Tutorial.next(),
  };
})();

/* ══════════════════════════════════════════
   TUTORIAL
══════════════════════════════════════════ */
const Tutorial = (() => {
  let step = 0;
  const STEPS = [
    { title:'ROLE O DADO',     text:'O resultado determina quantas casas seu herói poderá avançar.',           target:'.dice-wrap',    pos:'left'   },
    { title:'MOVA SEU HERÓI',  text:'Clique em uma peça iluminada no tabuleiro para movê-la.',                 target:'#board-canvas', pos:'center' },
    { title:'CASAS ESPECIAIS', text:'Símbolos indicam batalhas (✦), tesouros (◆), perigos (✕) e magia (✦).',  target:'#board-canvas', pos:'center' },
    { title:'O MESTRE',        text:'O Mestre narra os acontecimentos e apresenta decisões importantes.',      target:'.master-box',   pos:'top'    },
    { title:'SUAS ESCOLHAS',   text:'Algumas situações permitem diferentes ações. Suas escolhas mudam o resultado.', target:'.g-right', pos:'left'  },
    { title:'A COROA',         text:'O objetivo está no centro. Atravesse Eryndor e alcance a Câmara da Coroa.', target:'#board-canvas', pos:'center'},
  ];

  function start() {
    step = 0;
    document.getElementById('tut-overlay').style.display = 'block';
    show();
  }

  function show() {
    const s = STEPS[step];
    document.getElementById('tut-step').textContent  = `PASSO ${step+1} / ${STEPS.length}`;
    document.getElementById('tut-title').textContent = s.title;
    document.getElementById('tut-text').textContent  = s.text;
    const dots = document.getElementById('tut-dots');
    dots.innerHTML = '';
    STEPS.forEach((_,i) => {
      const d = document.createElement('div');
      d.className = 'tut-dot' + (i===step?' on':'');
      dots.appendChild(d);
    });
    document.getElementById('tut-next').textContent = step === STEPS.length-1 ? 'COMEÇAR PARTIDA' : 'PRÓXIMO →';
    spotlight(s.target, s.pos);
  }

  function spotlight(sel, pos) {
    const el  = document.querySelector(sel);
    const sp  = document.getElementById('tut-spotlight');
    const box = document.getElementById('tut-box');
    if (!el) { sp.style.cssText = 'display:none'; return; }
    const r = el.getBoundingClientRect();
    const pad = 8;
    sp.style.cssText = `display:block;left:${r.left-pad}px;top:${r.top-pad}px;width:${r.width+pad*2}px;height:${r.height+pad*2}px`;
    const bw = 320, bh = 200, gap = 18;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left, top;
    switch(pos) {
      case 'left': left = Math.max(10, r.left-bw-gap); top = Math.max(10, r.top+r.height/2-bh/2); break;
      case 'top':  left = Math.max(10, r.left+r.width/2-bw/2); top = Math.max(10, r.top-bh-gap); break;
      default:     left = vw/2-bw/2; top = vh/2-bh/2;
    }
    box.style.left = Math.min(left, vw-bw-10) + 'px';
    box.style.top  = Math.min(top,  vh-bh-10) + 'px';
  }

  function next() {
    step++;
    if (step >= STEPS.length) { finish(); return; }
    show();
  }

  function skip() { finish(); }

  function finish() {
    document.getElementById('tut-overlay').style.display = 'none';
    localStorage.setItem('cos_board_tut', '1');
    narrate('"Você conhece o tabuleiro. Agora descubra se o tabuleiro conhece você."');
    showTurnBanner('A JORNADA COMEÇA');
  }

  return { start, next, skip };
})();

/* ══ INTRO PARTICLES ══ */
function initParticles() {
  const c = document.getElementById('intro-particles');
  if (!c) return;
  const ctx2 = c.getContext('2d');
  c.width = window.innerWidth; c.height = window.innerHeight;
  const pts = Array.from({length:60}, () => ({
    x: Math.random()*c.width, y: Math.random()*c.height,
    r: Math.random()*2+0.5, vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
    a: Math.random()*.5+.1,
  }));
  function frame() {
    ctx2.clearRect(0,0,c.width,c.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=c.width; if (p.x>c.width) p.x=0;
      if (p.y<0) p.y=c.height; if (p.y>c.height) p.y=0;
      ctx2.beginPath(); ctx2.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx2.fillStyle = `rgba(201,168,76,${p.a})`; ctx2.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
}

/* ══ CANVAS CLICK global ══ */
window.onCanvasClick = onCanvasClick;

/* ══ BOOT ══ */
document.addEventListener('DOMContentLoaded', () => Board.init());

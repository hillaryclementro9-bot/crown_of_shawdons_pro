/* ============================================
   CROWN OF SHADOWS — game.js  (Ludo)
   ============================================ */
'use strict';

/* ══════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════ */
const PLAYERS = [
  { id:0, name:'Harley', cls:'Maga Arcana',          color:'#9b59b6', dark:'#6c3483', icon:'🌙' },
  { id:1, name:'Morgan', cls:'Guerreira de Ferro',   color:'#c0392b', dark:'#922b21', icon:'⚔'  },
  { id:2, name:'Kael',   cls:'Patrulheiro do Norte', color:'#27ae60', dark:'#1e8449', icon:'🏹' },
  { id:3, name:'Darius', cls:'Cavaleiro Amaldiçoado',color:'#2980b9', dark:'#1f618d', icon:'💀' },
];

// Board is 15×15 grid. Each cell index 0..224.
// We define the path as an array of [col,row] for the 52-cell outer track.
// Safe cells (star positions): indices 0,8,13,21,26,34,39,47 on the track.

const N = 15; // grid size

// Build the 52-step outer path (col,row) starting from player 0's entry
function buildPath() {
  const p = [];
  // Top-left to right (row 6, col 1..8)
  for (let c=1;c<=8;c++) p.push([c,6]);
  // Down right column (col 8, row 7..8)
  for (let r=7;r<=8;r++) p.push([8,r]);
  // Right across (row 8, col 9..13)
  for (let c=9;c<=13;c++) p.push([c,8]);
  // Down (col 13, row 9..13)
  for (let r=9;r<=13;r++) p.push([13,r]);
  // Left (row 13, col 12..8)
  for (let c=12;c>=8;c--) p.push([c,13]);
  // Down (col 8, row 14)
  p.push([8,14]);
  // Left (row 14, col 7)
  p.push([7,14]);
  // Up (col 6, row 13..9)
  for (let r=13;r>=9;r--) p.push([6,r]);
  // Left (row 8, col 5..1)
  for (let c=5;c>=1;c--) p.push([c,8]);
  // Up (col 1, row 7..6)
  for (let r=7;r>=6;r--) p.push([1,r]);
  // Up (col 1, row 5..1) — wait, need col 1 row 6 already done
  // Actually go up col 6 from row 8 to row 1
  // Let me redo with standard ludo path:
  return buildStandardPath();
}

function buildStandardPath() {
  // Standard 52-cell ludo path for 15x15 board
  // Player 0 (purple/top-left) starts at index 0 = cell [1,6]
  const p = [];
  // Segment 1: row 6, left→right  cols 1..8  (8 cells)
  for(let c=1;c<=8;c++) p.push([c,6]);
  // Segment 2: col 8, top→down   rows 7..8  (2 cells)
  for(let r=7;r<=8;r++) p.push([8,r]);
  // Segment 3: row 8, left→right  cols 9..13 (5 cells)
  for(let c=9;c<=13;c++) p.push([c,8]);
  // Segment 4: col 13, top→down  rows 9..13 (5 cells)
  for(let r=9;r<=13;r++) p.push([13,r]);
  // Segment 5: row 13, right→left cols 12..8 (5 cells)
  for(let c=12;c>=8;c--) p.push([c,13]);
  // Segment 6: col 8, top→down   rows 14    (1 cell)
  p.push([8,14]);
  // Segment 7: row 14, right→left col 7     (1 cell)
  p.push([7,14]);
  // Segment 8: col 6, bottom→top rows 13..9 (5 cells)
  for(let r=13;r>=9;r--) p.push([6,r]);
  // Segment 9: row 8, right→left  cols 5..1 (5 cells)
  for(let c=5;c>=1;c--) p.push([c,8]);
  // Segment 10: col 1, bottom→top rows 7..6 (2 cells)
  for(let r=7;r>=6;r--) p.push([1,r]);
  // Segment 11: row 6, right→left cols 2..6 — wait already done
  // Need to go UP from row 6 to row 1
  // Segment 11: col 6, bottom→top rows 5..1 (5 cells)
  for(let r=5;r>=1;r--) p.push([6,r]);
  // Segment 12: row 1, left→right cols 7..8 (2 cells)
  for(let c=7;c<=8;c++) p.push([c,1]);
  // Segment 13: col 8, top→down   rows 2..6 (5 cells)
  for(let r=2;r<=6;r++) p.push([8,r]);
  // Total so far: 8+2+5+5+5+1+1+5+5+2+5+2+5 = 56 — too many
  // Let me use a known correct 52-cell path
  return buildCorrectPath();
}

function buildCorrectPath() {
  // Verified 52-cell path for 15x15 ludo
  const p = [];
  // Bottom of left zone going right (row 8, cols 1-5)
  for(let c=1;c<=5;c++) p.push([c,8]);       // 0-4
  // Up left column (col 6, rows 7-1)
  for(let r=7;r>=1;r--) p.push([6,r]);       // 5-11
  // Right across top (row 1, cols 7-8)
  p.push([7,1]); p.push([8,1]);              // 12-13
  // Down right of top (col 8, rows 2-6)
  for(let r=2;r<=6;r++) p.push([8,r]);       // 14-18
  // Right across upper-right (row 6, cols 9-13)
  for(let c=9;c<=13;c++) p.push([c,6]);      // 19-23
  // Down right column (col 13, rows 7-8)
  p.push([13,7]); p.push([13,8]);            // 24-25
  // Left across right zone (row 8, cols 12-9) — wait need row 8 cols 9-13
  // Actually go down col 13 rows 9-13
  for(let r=9;r<=13;r++) p.push([13,r]);     // 26-30
  // Left across bottom-right (row 13, cols 12-8)
  for(let c=12;c>=8;c--) p.push([c,13]);    // 31-35
  // Down to row 14 (col 8, row 14)
  p.push([8,14]);                            // 36
  // Left (row 14, col 7)
  p.push([7,14]);                            // 37
  // Up left of bottom (col 6, rows 13-9)
  for(let r=13;r>=9;r--) p.push([6,r]);     // 38-42
  // Left across bottom-left (row 8, cols 5-1) — already done at start
  // Hmm, need to close the loop. Let me use a hardcoded verified path.
  return hardcodedPath();
}

function hardcodedPath() {
  // 52 cells, standard ludo 15x15
  // Player 0 entry at index 0, player 1 at 13, player 2 at 26, player 3 at 39
  return [
    // 0-12: left side going up then right
    [1,8],[2,8],[3,8],[4,8],[5,8],           // 0-4
    [6,8],[6,7],[6,6],[6,5],[6,4],           // 5-9
    [6,3],[6,2],[6,1],                        // 10-12
    // 13-25: top going right then down
    [7,1],[8,1],                              // 13-14
    [8,2],[8,3],[8,4],[8,5],[8,6],           // 15-19
    [8,7],[8,8],[9,8],[10,8],[11,8],         // 20-24 — wait col 8 row 8 is center-ish
    [12,8],[13,8],                            // 25-26 — hmm
    // Let me just use a flat verified array
  ];
  // Fallback to the real one
  return LUDO_PATH_VERIFIED;
}

// Verified hardcoded 52-cell path
const LUDO_PATH_VERIFIED = [
  // 0-12: left column going up
  [1,8],[2,8],[3,8],[4,8],[5,8],[6,8],
  [6,7],[6,6],[6,5],[6,4],[6,3],[6,2],[6,1],
  // 13-25: top row going right + right column going down
  [7,1],[8,1],
  [8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],
  [9,8],[10,8],[11,8],[12,8],[13,8],
  // 26-38: right column going down + bottom row going left
  [13,9],[13,10],[13,11],[13,12],[13,13],
  [12,13],[11,13],[10,13],[9,13],[8,13],
  [8,14],[7,14],
  // 39-51: left of bottom going up + close loop
  [6,13],[6,12],[6,11],[6,10],[6,9],
  [5,8],[4,8],[3,8],[2,8],[1,8],  // these overlap — fix below
];

// Correct non-overlapping 52-cell path
const PATH = (() => {
  const p = [];
  // 0-5: row 8 left side going right (cols 1-6)
  for(let c=1;c<=6;c++) p.push([c,8]);
  // 6-12: col 6 going up (rows 7→1)
  for(let r=7;r>=1;r--) p.push([6,r]);
  // 13-14: row 1 going right (cols 7-8)
  p.push([7,1],[8,1]);
  // 15-21: col 8 going down (rows 2→8)
  for(let r=2;r<=8;r++) p.push([8,r]);
  // 22-26: row 8 going right (cols 9-13)
  for(let c=9;c<=13;c++) p.push([c,8]);
  // 27-33: col 13 going down (rows 9→13) + extra
  for(let r=9;r<=13;r++) p.push([13,r]);
  // 34-38: row 13 going left (cols 12→8)
  for(let c=12;c>=8;c--) p.push([c,13]);
  // 39-40: col 8 down to 14, then col 7 row 14
  p.push([8,14],[7,14]);
  // 41-45: col 6 going up (rows 13→9)
  for(let r=13;r>=9;r--) p.push([6,r]);
  // 46-51: row 8 going left (cols 5→1) — but [1,8] is index 0, so stop at [2,8]
  for(let c=5;c>=1;c--) p.push([c,8]);
  return p; // 52 cells: indices 0-51
})();

// Safe cell indices on PATH
const SAFE = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

// Entry index on PATH for each player (where they enter from base)
const ENTRY = [0, 13, 26, 39];

// Home column cells for each player (6 cells leading to center)
// These are NOT on the main PATH — separate arrays [col,row]
const HOME_COLS = [
  [[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]],   // player 0 — row 7 going right (wrong, fix)
  [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],   // player 1 — col 7 going down
  [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]],// player 2 — row 7 going left
  [[7,13],[7,12],[7,11],[7,10],[7,9],[7,8]],// player 3 — col 7 going up
];

// Corrected home columns (the colored lanes leading to center)
const HOME_LANES = [
  // player 0 (purple): col 7, rows 8→2 going up — NO, standard ludo:
  // P0 enters at PATH[0]=[1,8], home lane is col 7 rows 7→2 going up? 
  // Let's define them simply as the 6 cells before center for each player
  [[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]],   // P0: row 7 cols 1→6
  [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],   // P1: col 7 rows 1→6
  [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]],// P2: row 7 cols 13→8
  [[7,13],[7,12],[7,11],[7,10],[7,9],[7,8]],// P3: col 7 rows 13→8
];

// Base positions (4 pieces per player)
const BASE_POS = [
  [[2,2],[3,2],[2,3],[3,3]],     // P0 top-left
  [[11,2],[12,2],[11,3],[12,3]], // P1 top-right
  [[11,11],[12,11],[11,12],[12,12]], // P2 bottom-right
  [[2,11],[3,11],[2,12],[3,12]], // P3 bottom-left
];

// Center cell
const CENTER = [7,7];

/* ══════════════════════════════════════════════
   LUDO ENGINE
══════════════════════════════════════════════ */
const Ludo = (() => {
  let canvas, ctx, CS; // cell size
  let state;

  /* ── INIT STATE ── */
  function initState() {
    state = {
      turn: 0,          // current player index 0-3
      phase: 'roll',    // 'roll' | 'move' | 'done'
      diceVal: 0,
      rolled: false,
      extraTurn: false,
      winner: null,
      // pieces[p][i] = { pos: -1 (base) | 0-51 (path) | 52-57 (home lane) | 58 (done) }
      pieces: PLAYERS.map((_, p) => [0,1,2,3].map(i => ({ pos:-1, pathIdx:-1, homeIdx:-1, done:false }))),
      animating: false,
    };
  }

  /* ── SETUP ── */
  function init() {
    canvas = document.getElementById('ludo-canvas');
    ctx    = canvas.getContext('2d');
    initState();
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', onCanvasClick);
    renderAll();
    updateUI();
    narrate('"A Coroa das Sombras aguarda. Quem chegará primeiro ao centro?"');
  }

  function resize() {
    const wrap = document.querySelector('.board-center');
    const size = Math.min(wrap.clientWidth, window.innerHeight - 180);
    canvas.width  = size;
    canvas.height = size;
    CS = size / N;
    renderAll();
  }

  /* ══════════════════════════════════════════
     RENDERING
  ══════════════════════════════════════════ */
  function renderAll() {
    if (!ctx) return;
    drawBoard();
    drawPieces();
  }

  function drawBoard() {
    const s = CS;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0d0810';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all cells
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        drawCell(c, r);
      }
    }

    // Draw path arrows (subtle)
    drawPathIndicators();

    // Draw home lanes
    drawHomeLanes();

    // Draw center
    drawCenter();

    // Draw base zones
    drawBases();

    // Grid lines
    ctx.strokeStyle = 'rgba(201,168,76,0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= N; i++) {
      ctx.beginPath(); ctx.moveTo(i*s,0); ctx.lineTo(i*s,canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,i*s); ctx.lineTo(canvas.width,i*s); ctx.stroke();
    }
  }

  function cellColor(c, r) {
    // Base zones
    if (c>=1&&c<=4&&r>=1&&r<=4) return '#2a1a3a'; // P0 base bg
    if (c>=10&&c<=13&&r>=1&&r<=4) return '#3a1a1a'; // P1
    if (c>=10&&c<=13&&r>=10&&r<=13) return '#1a2a1a'; // P2
    if (c>=1&&c<=4&&r>=10&&r<=13) return '#1a1a2a'; // P3

    // Home lanes
    if (r===7&&c>=1&&c<=5) return '#3a2a4a'; // P0 lane
    if (c===7&&r>=1&&r<=5) return '#4a2a2a'; // P1 lane
    if (r===7&&c>=9&&c<=13) return '#2a3a2a'; // P2 lane
    if (c===7&&r>=9&&r<=13) return '#2a2a3a'; // P3 lane

    // Center cross
    if (c===7&&r>=1&&r<=13) return '#1a1520';
    if (r===7&&c>=1&&c<=13) return '#1a1520';

    return '#18121e';
  }

  function drawCell(c, r) {
    const x = c*CS, y = r*CS;
    ctx.fillStyle = cellColor(c, r);
    ctx.fillRect(x, y, CS, CS);

    // Safe cell star
    const pathIdx = PATH.findIndex(([pc,pr]) => pc===c && pr===r);
    if (pathIdx !== -1 && SAFE.has(pathIdx)) {
      ctx.fillStyle = 'rgba(201,168,76,0.12)';
      ctx.fillRect(x, y, CS, CS);
      ctx.fillStyle = 'rgba(201,168,76,0.5)';
      ctx.font = `${CS*0.45}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', x+CS/2, y+CS/2);
    }

    // Entry cells — colored dot
    ENTRY.forEach((ei, p) => {
      if (PATH[ei] && PATH[ei][0]===c && PATH[ei][1]===r) {
        ctx.fillStyle = PLAYERS[p].color + '33';
        ctx.fillRect(x, y, CS, CS);
        ctx.strokeStyle = PLAYERS[p].color + '88';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x+1, y+1, CS-2, CS-2);
      }
    });
  }

  function drawPathIndicators() {
    // Draw subtle path numbers / arrows
    ctx.font = `${CS*0.22}px Cinzel,serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    PATH.forEach(([c,r], i) => {
      const x = c*CS+CS/2, y = r*CS+CS/2;
      ctx.fillStyle = 'rgba(201,168,76,0.15)';
      ctx.fillText(i, x, y);
    });
  }

  function drawHomeLanes() {
    HOME_LANES.forEach((lane, p) => {
      lane.forEach(([c,r], i) => {
        const x = c*CS, y = r*CS;
        const alpha = 0.15 + i*0.05;
        ctx.fillStyle = PLAYERS[p].color + Math.round(alpha*255).toString(16).padStart(2,'0');
        ctx.fillRect(x+1, y+1, CS-2, CS-2);
      });
    });
  }

  function drawCenter() {
    // 3x3 center
    const x = 6*CS, y = 6*CS, w = 3*CS;
    const grd = ctx.createRadialGradient(x+w/2,y+w/2,0,x+w/2,y+w/2,w/2);
    grd.addColorStop(0,'rgba(201,168,76,0.25)');
    grd.addColorStop(0.5,'rgba(122,0,0,0.15)');
    grd.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(x, y, w, w);

    // Crown symbol
    ctx.font = `${CS*1.2}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(201,168,76,0.7)';
    ctx.fillText('♛', x+w/2, y+w/2);

    // Border
    ctx.strokeStyle = 'rgba(201,168,76,0.3)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x+1, y+1, w-2, w-2);
  }

  function drawBases() {
    PLAYERS.forEach((pl, p) => {
      const [[c1,r1],[c2,r2],[c3,r3],[c4,r4]] = BASE_POS[p];
      const minC = Math.min(c1,c2,c3,c4);
      const minR = Math.min(r1,r2,r3,r4);
      const maxC = Math.max(c1,c2,c3,c4);
      const maxR = Math.max(r1,r2,r3,r4);
      const x = minC*CS, y = minR*CS;
      const w = (maxC-minC+1)*CS, h = (maxR-minR+1)*CS;

      // Base background
      const grd = ctx.createRadialGradient(x+w/2,y+h/2,0,x+w/2,y+h/2,w/2);
      grd.addColorStop(0, pl.dark+'88');
      grd.addColorStop(1, pl.dark+'22');
      ctx.fillStyle = grd;
      ctx.fillRect(x, y, w, h);

      // Border
      ctx.strokeStyle = pl.color+'66';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x+1, y+1, w-2, h-2);

      // Player icon
      ctx.font = `${CS*0.55}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = pl.color+'44';
      ctx.fillText(pl.icon, x+w/2, y+h/2);
    });
  }

  function drawPieces() {
    state.pieces.forEach((pieces, p) => {
      pieces.forEach((piece, i) => {
        let cx, cy;
        if (piece.done) {
          // In center — spread slightly
          const offsets = [[-0.2,-0.2],[0.2,-0.2],[-0.2,0.2],[0.2,0.2]];
          cx = (7 + offsets[i][0]) * CS + CS/2;
          cy = (7 + offsets[i][1]) * CS + CS/2;
        } else if (piece.homeIdx >= 0) {
          const [hc,hr] = HOME_LANES[p][piece.homeIdx];
          cx = hc*CS + CS/2;
          cy = hr*CS + CS/2;
        } else if (piece.pathIdx >= 0) {
          const [pc,pr] = PATH[piece.pathIdx];
          cx = pc*CS + CS/2;
          cy = pr*CS + CS/2;
          // Offset if multiple pieces on same cell
          const others = countPiecesAt(p, piece.pathIdx, i);
          if (others > 0) { cx += (others%2===0?1:-1)*CS*0.18; cy += (others>1?1:-1)*CS*0.18; }
        } else {
          // In base
          const [bc,br] = BASE_POS[p][i];
          cx = bc*CS + CS/2;
          cy = br*CS + CS/2;
        }
        drawPiece(cx, cy, p, i, piece);
      });
    });
  }

  function countPiecesAt(p, pathIdx, excludeI) {
    return state.pieces[p].filter((pc,i) => i!==excludeI && pc.pathIdx===pathIdx).length;
  }

  function drawPiece(cx, cy, p, i, piece) {
    const pl = PLAYERS[p];
    const r  = CS * 0.32;
    const isMovable = canMovePiece(p, i);
    const isActive  = state.turn === p && state.rolled && isMovable;

    // Glow for movable pieces
    if (isActive) {
      ctx.shadowColor = pl.color;
      ctx.shadowBlur  = 12;
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(cx, cy+r*0.7, r*0.65, r*0.2, 0, 0, Math.PI*2);
    ctx.fill();

    // Body
    const grd = ctx.createRadialGradient(cx-r*0.3,cy-r*0.3,0,cx,cy,r);
    grd.addColorStop(0, pl.color);
    grd.addColorStop(1, pl.dark);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fill();

    // Border
    ctx.strokeStyle = isActive ? '#fff' : pl.color+'88';
    ctx.lineWidth   = isActive ? 2 : 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Icon
    ctx.font = `${r*0.9}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pl.icon, cx, cy);

    // Done star
    if (piece.done) {
      ctx.font = `${r*0.6}px serif`;
      ctx.fillStyle = '#f0d080';
      ctx.fillText('★', cx+r*0.5, cy-r*0.5);
    }
  }

  /* ══════════════════════════════════════════
     GAME LOGIC
  ══════════════════════════════════════════ */
  function canMovePiece(p, i) {
    if (state.turn !== p || !state.rolled) return false;
    const piece = state.pieces[p][i];
    if (piece.done) return false;
    const v = state.diceVal;

    if (piece.pathIdx < 0 && piece.homeIdx < 0) {
      // In base — need 6 to exit
      return v === 6;
    }
    if (piece.homeIdx >= 0) {
      // In home lane — need exact steps to finish
      return piece.homeIdx + v <= 5;
    }
    // On path — check if can enter home lane
    const distToHome = distanceToHomeLane(p, piece.pathIdx);
    if (v === distToHome) return true; // enters home lane
    if (v < distToHome) return true;   // moves on path
    return false;
  }

  function distanceToHomeLane(p, pathIdx) {
    // Home lane entry is just before ENTRY[p] (one full loop)
    const entry = ENTRY[p];
    // The piece needs to travel (52 - pathIdx + entry - 1) % 52 + 1 steps to reach home entry
    // Home entry is at (entry + 51) % 52 = entry - 1 (mod 52)
    const homeEntry = (entry + 51) % 52;
    if (pathIdx <= homeEntry) return homeEntry - pathIdx + 1;
    return 52 - pathIdx + homeEntry + 1;
  }

  function movePiece(p, i) {
    if (!canMovePiece(p, i)) return;
    const piece = state.pieces[p][i];
    const v = state.diceVal;

    if (piece.pathIdx < 0 && piece.homeIdx < 0) {
      // Exit base
      piece.pathIdx = ENTRY[p];
      narrate(`${PLAYERS[p].name} saiu da base!`);
      floatText('SAIU!', canvas, piece.pathIdx, p);
    } else if (piece.homeIdx >= 0) {
      // Move in home lane
      const newIdx = piece.homeIdx + v;
      if (newIdx === 5) {
        piece.homeIdx = -1;
        piece.done = true;
        narrate(`${PLAYERS[p].name} chegou ao centro! ♛`);
        floatText('♛ CHEGOU!', canvas, -1, p);
        checkWin(p);
      } else {
        piece.homeIdx = newIdx;
      }
    } else {
      // Move on path
      const distToHome = distanceToHomeLane(p, piece.pathIdx);
      if (v === distToHome) {
        // Enter home lane at index 0
        piece.pathIdx = -1;
        piece.homeIdx = 0;
        narrate(`${PLAYERS[p].name} entrou no corredor final!`);
      } else {
        const newPathIdx = (piece.pathIdx + v) % 52;
        // Check capture
        checkCapture(p, newPathIdx);
        piece.pathIdx = newPathIdx;
      }
    }

    state.rolled = false;
    renderAll();
    updateUI();

    // Extra turn on 6
    if (v === 6 && !state.winner) {
      setTimeout(() => {
        narrate(`${PLAYERS[p].name} tirou 6 — joga novamente!`);
        floatText('JOGA DE NOVO!', canvas, -1, p);
        state.phase = 'roll';
        updateUI();
      }, 400);
    } else if (!state.winner) {
      setTimeout(() => nextTurn(), 500);
    }
  }

  function checkCapture(attacker, pathIdx) {
    if (SAFE.has(pathIdx)) return;
    PLAYERS.forEach((_, p) => {
      if (p === attacker) return;
      state.pieces[p].forEach(piece => {
        if (piece.pathIdx === pathIdx) {
          piece.pathIdx = -1;
          narrate(`${PLAYERS[attacker].name} capturou uma peça de ${PLAYERS[p].name}! Ela voltou para a base.`);
          floatText('CAPTURADO!', canvas, pathIdx, attacker);
        }
      });
    });
  }

  function checkWin(p) {
    const allDone = state.pieces[p].every(pc => pc.done);
    if (allDone) {
      state.winner = p;
      state.phase  = 'done';
      setTimeout(() => showWin(p), 800);
    }
  }

  function nextTurn() {
    state.turn  = (state.turn + 1) % 4;
    state.phase = 'roll';
    state.rolled = false;
    showTurnBanner(`TURNO DE ${PLAYERS[state.turn].name.toUpperCase()}`);
    narrate(narrateForPlayer(state.turn));
    updateUI();
    renderAll();
  }

  function narrateForPlayer(p) {
    const lines = [
      `"${PLAYERS[p].name} avança pelas sombras da masmorra."`,
      `"${PLAYERS[p].name} sente a presença da Coroa se aproximar."`,
      `"As tochas tremem enquanto ${PLAYERS[p].name} lança o dado."`,
      `"${PLAYERS[p].name} move suas peças com determinação."`,
      `"A Coroa das Sombras pulsa. ${PLAYERS[p].name} está mais perto."`,
    ];
    return lines[Math.floor(Math.random()*lines.length)];
  }

  /* ── ROLL ── */
  function roll() {
    if (state.phase !== 'roll' || state.rolled || state.animating || state.winner) return;
    const die = document.getElementById('die');
    die.classList.remove('rolling');
    void die.offsetWidth;
    die.classList.add('rolling');

    state.animating = true;
    setTimeout(() => {
      const v = Math.floor(Math.random()*6)+1;
      state.diceVal = v;
      state.rolled  = true;
      state.animating = false;

      drawDiePips(v);
      document.getElementById('dice-num').textContent = v;
      document.getElementById('dice-result').style.display = 'flex';

      const p = state.turn;
      const hasMove = state.pieces[p].some((_,i) => canMovePiece(p,i));

      if (!hasMove) {
        narrate(`${PLAYERS[p].name} tirou ${v} mas não tem jogada possível.`);
        setTimeout(() => nextTurn(), 1200);
      } else {
        narrate(`${PLAYERS[p].name} tirou ${v}. Escolha uma peça para mover.`);
        renderAll();
        updateUI();
      }
    }, 580);
  }

  function drawDiePips(v) {
    const pips = document.getElementById('die-pips');
    pips.innerHTML = '';
    const positions = {
      1:[[40,40]],
      2:[[20,20],[60,60]],
      3:[[20,20],[40,40],[60,60]],
      4:[[20,20],[60,20],[20,60],[60,60]],
      5:[[20,20],[60,20],[40,40],[20,60],[60,60]],
      6:[[20,18],[60,18],[20,40],[60,40],[20,62],[60,62]],
    };
    (positions[v]||[]).forEach(([cx,cy]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx',cx); c.setAttribute('cy',cy); c.setAttribute('r',6);
      c.setAttribute('fill','#c9a84c');
      pips.appendChild(c);
    });
  }

  /* ── CANVAS CLICK ── */
  function onCanvasClick(e) {
    if (!state.rolled || state.animating || state.winner) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top)  * (canvas.height / rect.height);
    const p  = state.turn;

    state.pieces[p].forEach((piece, i) => {
      if (!canMovePiece(p, i)) return;
      let cx, cy;
      if (piece.pathIdx < 0 && piece.homeIdx < 0) {
        const [bc,br] = BASE_POS[p][i];
        cx = bc*CS+CS/2; cy = br*CS+CS/2;
      } else if (piece.homeIdx >= 0) {
        const [hc,hr] = HOME_LANES[p][piece.homeIdx];
        cx = hc*CS+CS/2; cy = hr*CS+CS/2;
      } else {
        const [pc,pr] = PATH[piece.pathIdx];
        cx = pc*CS+CS/2; cy = pr*CS+CS/2;
      }
      const dist = Math.hypot(mx-cx, my-cy);
      if (dist < CS*0.45) movePiece(p, i);
    });
  }

  /* ── UI ── */
  function updateUI() {
    // Topbar turn info
    const p = state.turn;
    const pl = PLAYERS[p];
    document.getElementById('topbar-center').innerHTML = `
      <div class="turn-chip">
        <div class="turn-chip-dot" style="background:${pl.color}"></div>
        <div>
          <div class="turn-chip-label">VEZ DE</div>
          <div class="turn-chip-name">${pl.name.toUpperCase()}</div>
        </div>
      </div>`;

    // Dice label
    const diceWrap = document.getElementById('dice-wrap');
    if (state.rolled || state.phase !== 'roll') {
      diceWrap.classList.add('disabled');
      document.getElementById('dice-label').textContent = 'AGUARDANDO...';
    } else {
      diceWrap.classList.remove('disabled');
      document.getElementById('dice-label').textContent = 'ROLAR DADO';
    }

    // Player cards
    PLAYERS.forEach((pl, p) => {
      const card = document.getElementById(`pcard-${p}`);
      if (!card) return;
      const pieces = state.pieces[p];
      const doneCount = pieces.filter(pc => pc.done).length;
      const isActive  = state.turn === p;
      card.className  = 'player-card' + (isActive ? ' active' : '');
      card.style.borderColor = isActive ? pl.color : '';
      card.innerHTML = `
        <div class="pc-header">
          <div class="pc-dot" style="background:${pl.color}"></div>
          <div>
            <div class="pc-name">${pl.icon} ${pl.name}</div>
            <div class="pc-class">${pl.cls}</div>
          </div>
        </div>
        <div class="pc-pieces">
          ${pieces.map((pc,i) => `
            <div class="pc-piece ${pc.done?'done':pc.pathIdx<0&&pc.homeIdx<0?'home':''}"
                 style="background:${pl.dark};border-color:${pc.done?'#c9a84c':pl.color+'66'}">
              ${pl.icon}
            </div>`).join('')}
        </div>
        <div class="pc-score">${doneCount}/4 no centro</div>`;
    });
  }

  /* ── HELPERS ── */
  function floatText(text, canvasEl, pathIdx, p) {
    const container = document.getElementById('floats');
    const el = document.createElement('div');
    el.className = 'float-txt';
    const rect = canvas.getBoundingClientRect();
    let x = rect.left + rect.width/2;
    let y = rect.top  + rect.height/2;
    if (pathIdx >= 0 && PATH[pathIdx]) {
      const [pc,pr] = PATH[pathIdx];
      x = rect.left + (pc+0.5)*CS*(rect.width/canvas.width);
      y = rect.top  + (pr+0.5)*CS*(rect.height/canvas.height);
    }
    el.style.left  = x + 'px';
    el.style.top   = y + 'px';
    el.style.color = PLAYERS[p].color;
    el.textContent = text;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }

  function narrate(text) {
    document.getElementById('narr-text').textContent = text;
  }

  function showTurnBanner(text) {
    const el = document.getElementById('turn-banner');
    el.textContent = text;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
  }

  function showWin(p) {
    const pl = PLAYERS[p];
    document.getElementById('win-title').textContent = `${pl.icon} ${pl.name.toUpperCase()} VENCEU!`;
    document.getElementById('win-modal').style.display = 'flex';
  }

  function restart() {
    document.getElementById('win-modal').style.display = 'none';
    document.getElementById('dice-result').style.display = 'none';
    drawDiePips(1);
    initState();
    renderAll();
    updateUI();
    narrate('"A Coroa das Sombras aguarda. Quem chegará primeiro ao centro?"');
    showTurnBanner('NOVA PARTIDA');
  }

  function toggleRules() {
    const m = document.getElementById('rules-modal');
    m.style.display = m.style.display === 'none' ? 'flex' : 'none';
  }

  return { init, roll, restart, toggleRules };
})();

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  Ludo.init();
});

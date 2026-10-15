/* ============================================
   CROWN OF SHADOWS — joga.js
   ============================================ */

const HEROES_BASE = [
  { id:'kael',   name:'Kael',   cls:'Guerreiro',  maxHp:28, maxMp:5,  mov:5, initial:'K', level:8,  weapon:'Espada', dmgDie:8,  spells:[] },
  { id:'lunara', name:'Lunara', cls:'Arqueira',   maxHp:24, maxMp:10, mov:6, initial:'L', level:7,  weapon:'Arco',   dmgDie:6,  spells:[] },
  { id:'tharok', name:'Tharok', cls:'Bárbaro',    maxHp:32, maxMp:0,  mov:4, initial:'T', level:9,  weapon:'Machado',dmgDie:10, spells:[] },
  { id:'sylien', name:'Sylien', cls:'Maga',       maxHp:26, maxMp:35, mov:5, initial:'S', level:6,  weapon:'Cajado', dmgDie:4,  spells:['fireball','ice','shield','arcane'] },
  { id:'harley', name:'Harley', cls:'Feiticeira', maxHp:24, maxMp:32, mov:5, initial:'H', level:10, weapon:'Adaga',  dmgDie:6,  spells:['shadow','heal','drain','curse'] }
];

const ENEMIES_BASE = [
  { id:'gob1', name:'Goblin Guerreiro', maxHp:12, initial:'G', dmgDie:4, mov:3 },
  { id:'arc1', name:'Arqueiro Goblin',  maxHp:10, initial:'A', dmgDie:4, mov:4 },
  { id:'gob2', name:'Goblin Guerreiro', maxHp:12, initial:'G', dmgDie:4, mov:3 },
  { id:'xama', name:'Xamã Goblin',      maxHp:18, initial:'X', dmgDie:6, mov:3 }
];

const SPELLS_DATA = {
  fireball:{ name:'Bola de Fogo',  cost:10, minDmg:6,  maxDmg:20, type:'dmg',   icon:'🔥', desc:'Lança uma esfera de fogo explosiva.', range:4 },
  ice:     { name:'Raio Gélido',   cost:8,  minDmg:4,  maxDmg:14, type:'dmg',   icon:'❄',  desc:'Dispara um raio de gelo paralisante.', range:5 },
  shield:  { name:'Escudo Arcano', cost:6,  minDmg:0,  maxDmg:0,  type:'buff',  icon:'🛡',  desc:'Cria um escudo mágico protetor.', range:0 },
  arcane:  { name:'Míssil Arcano', cost:4,  minDmg:3,  maxDmg:10, type:'dmg',   icon:'✨',  desc:'Projétil de energia arcana pura.', range:6 },
  shadow:  { name:'Chama Sombria', cost:12, minDmg:8,  maxDmg:24, type:'dmg',   icon:'🌑',  desc:'Invoca chamas das trevas.', range:4 },
  heal:    { name:'Cura',          cost:8,  minDmg:6,  maxDmg:14, type:'heal',  icon:'💚',  desc:'Restaura pontos de vida.', range:0 },
  drain:   { name:'Drenar Vida',   cost:10, minDmg:5,  maxDmg:12, type:'drain', icon:'💜',  desc:'Drena vida do inimigo para si.', range:3 },
  curse:   { name:'Maldição',      cost:14, minDmg:0,  maxDmg:0,  type:'debuff',icon:'☠',  desc:'Amaldiçoa o alvo, reduzindo sua defesa.', range:4 }
};

const ITEMS_BASE = [
  { id:'hp',     name:'Poção de Vida', icon:'🧪', qty:3, desc:'Restaura 15 pontos de vida.',  effect:'hp',  val:15 },
  { id:'mp',     name:'Poção de Mana', icon:'💫', qty:2, desc:'Restaura 20 pontos de mana.',  effect:'mp',  val:20 },
  { id:'scroll', name:'Pergaminho',    icon:'📜', qty:1, desc:'Causa 10 de dano arcano.',      effect:'dmg', val:10 },
  { id:'bomb',   name:'Bomba',         icon:'💣', qty:1, desc:'Causa 8 de dano em área.',      effect:'dmg', val:8  }
];

const OBJECTS_DATA = [
  { id:'chest1', icon:'📦', name:'Baú Antigo',     desc:'Um velho baú coberto de poeira e ferrugem.',       action:'ABRIR', x:45, y:42 },
  { id:'door1',  icon:'🚪', name:'Porta de Pedra', desc:'Uma porta pesada entalhada em pedra antiga.',      action:'ABRIR', x:50, y:60 },
  { id:'fire1',  icon:'🔥', name:'Fogueira',        desc:'Chamas crepitantes aquecem o ar frio da masmorra.',action:'USAR',  x:38, y:50 }
];

const HERO_POS_DEFAULT  = { kael:{col:3,row:7}, lunara:{col:4,row:9}, tharok:{col:2,row:10}, sylien:{col:5,row:8}, harley:{col:3,row:11} };
const ENEMY_POS_DEFAULT = { gob1:{col:12,row:6}, arc1:{col:14,row:8}, gob2:{col:11,row:10}, xama:{col:15,row:7} };

const NARR = {
  turnStart:[ n=>`As tochas tremem enquanto ${n} avança. É sua vez de agir.`, n=>`${n} observa o campo e prepara sua próxima jogada.`, n=>`${n} respira fundo e ergue sua arma. O momento chegou.` ],
  move:[ n=>`${n} avança cuidadosamente entre as ruínas.`, n=>`${n} se move com precisão pelo campo.`, n=>`${n} reposiciona-se estrategicamente.` ],
  attackHit:[ (n,t,d)=>`${n} desfere um golpe certeiro contra ${t}, causando ${d} de dano.`, (n,t,d)=>`A arma de ${n} encontra seu alvo. ${t} sofre ${d} de dano.` ],
  attackMiss:[ (n,t)=>`${t} percebe o ataque de ${n} a tempo e escapa.`, (n,t)=>`O golpe de ${n} passa raspando. ${t} desvia no último instante.` ],
  crit:[ (n,t,d)=>`ACERTO CRÍTICO! A lâmina de ${n} encontra uma abertura fatal em ${t}. ${d} de dano!` ],
  critFail:[ n=>`O ataque de ${n} falha completamente, deixando uma abertura perigosa.` ],
  defend:[ n=>`${n} firma os pés e assume postura defensiva.`, n=>`${n} ergue seu escudo e se prepara para absorver o próximo golpe.` ],
  heal:[ (n,v)=>`${n} canaliza energia curativa e recupera ${v} pontos de vida.` ],
  spell:[ (n,s)=>`${n} concentra energia arcana e lança ${s}.`, (n,s)=>`As mãos de ${n} brilham enquanto conjura ${s}.` ],
  item:[ (n,i)=>`${n} usa ${i} em meio à batalha.` ],
  enemyTurn:[ n=>`${n} avança com passos pesados, os olhos fixos em seu alvo.`, n=>`Um grunhido ecoa enquanto ${n} se prepara para atacar.` ],
  endTurn:[ n=>`${n} encerra seu turno e recua para posição segura.` ],
  defeated:[ n=>`${n} cai ao chão, derrotado!`, n=>`${n} é eliminado do campo de batalha!` ]
};

function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

const S = {
  heroes:[], enemies:[], items:[], heroPos:{}, enemyPos:{},
  turnOrder:[], turnIdx:0, round:1,
  mode:null, selHero:null, selEnemy:null,
  zoom:1, panX:0, panY:0,
  dragging:false, dragSX:0, dragSY:0, panSX:0, panSY:0,
  gridSize:48, mapW:1200, mapH:800,
  curObj:null, curItem:null, narratorCollapsed:false,
  enemyTurnRunning:false, gameOver:false
};

const SAVE_KEY = 'cos_game_v2';
function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

function loadState(){
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return false;
    const saved = JSON.parse(raw);
    S.heroes=saved.heroes; S.enemies=saved.enemies; S.items=saved.items;
    S.heroPos=saved.heroPos; S.enemyPos=saved.enemyPos;
    S.turnOrder=saved.turnOrder; S.turnIdx=saved.turnIdx; S.round=saved.round;
    return true;
  } catch(e){ return false; }
}

function saveState(){
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    heroes:S.heroes, enemies:S.enemies, items:S.items,
    heroPos:S.heroPos, enemyPos:S.enemyPos,
    turnOrder:S.turnOrder, turnIdx:S.turnIdx, round:S.round
  }));
}

function initFreshState(){
  S.heroes  = HEROES_BASE.map(h=>({...h, hp:h.maxHp, mp:h.maxMp, movLeft:h.mov, actionUsed:false, defending:false}));
  S.enemies = ENEMIES_BASE.map(e=>({...e, hp:e.maxHp, movLeft:e.mov, actionUsed:false, alive:true}));
  S.items   = deepClone(ITEMS_BASE);
  S.heroPos = deepClone(HERO_POS_DEFAULT);
  S.enemyPos= deepClone(ENEMY_POS_DEFAULT);
  S.turnOrder = [...S.heroes.map((_,i)=>({type:'hero',idx:i})), ...S.enemies.map((_,i)=>({type:'enemy',idx:i}))];
  S.turnIdx=0; S.round=1;
}

/* ── GAME CONTROLLER ── */
const Game = {

  init(){
    if(!loadState()) initFreshState();
    this.renderTurnPanel();
    this.renderTokens();
    this.renderObjects();
    this.initGrid();
    this.initDrag();
    this.initZoomWheel();
    this.syncTopbar();
    this.renderInventoryQuick();
    this.initParticles();
    // Show tutorial on first visit
    if(!localStorage.getItem('cos_tut_seen')) setTimeout(()=>this.openTutorial(),600);
    this.startTurn();
    document.addEventListener('click', e=>{
      if(!e.target.closest('.g-profile-wrap'))
        document.getElementById('g-profile-menu').classList.remove('open');
      if(!e.target.closest('.act-wrap') && !e.target.closest('#btn-move'))
        this.closeAllMenus();
    });
  },

  curTurn(){ return S.turnOrder[S.turnIdx]; },
  curName(){
    const c=this.curTurn();
    return c.type==='hero'?S.heroes[c.idx].name:S.enemies[c.idx].name;
  },

  /* ── GRID + DUNGEON MAP ── */
  initGrid(){
    const GS=S.gridSize, W=S.mapW, H=S.mapH;
    const COLS=Math.ceil(W/GS), ROWS=Math.ceil(H/GS);
    const MAP=[];
    for(let r=0;r<ROWS;r++){MAP[r]=[];for(let c=0;c<COLS;c++)MAP[r][c]=0;}
    // Rooms
    [{c:1,r:1,w:6,h:5},{c:9,r:1,w:7,h:4},{c:17,r:1,w:5,h:6},
     {c:1,r:8,w:5,h:5},{c:8,r:7,w:8,h:6},{c:17,r:9,w:6,h:5},
     {c:2,r:14,w:7,h:4},{c:11,r:13,w:6,h:5},{c:18,r:14,w:4,h:4}]
    .forEach(rm=>{for(let r=rm.r;r<rm.r+rm.h&&r<ROWS;r++)for(let c=rm.c;c<rm.c+rm.w&&c<COLS;c++)MAP[r][c]=1;});
    // Corridors
    [{c:6,r:3,w:3,h:1},{c:15,r:3,w:2,h:1},{c:3,r:7,w:1,h:2},
     {c:12,r:6,w:1,h:2},{c:16,r:11,w:2,h:1},{c:7,r:12,w:1,h:2},
     {c:14,r:12,w:1,h:2},{c:9,r:11,w:3,h:1}]
    .forEach(co=>{for(let r=co.r;r<co.r+co.h&&r<ROWS;r++)for(let c=co.c;c<co.c+co.w&&c<COLS;c++)MAP[r][c]=2;});

    const bg=document.getElementById('map-bg');
    bg.width=W; bg.height=H;
    const bx=bg.getContext('2d');
    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        const x=c*GS,y=r*GS,t=MAP[r][c];
        if(t===0){
          const g=bx.createLinearGradient(x,y,x+GS,y+GS);
          g.addColorStop(0,'#0d0a0e');g.addColorStop(0.5,'#150f18');g.addColorStop(1,'#1e1525');
          bx.fillStyle=g;bx.fillRect(x,y,GS,GS);
          bx.strokeStyle='rgba(0,0,0,0.5)';bx.lineWidth=0.5;bx.strokeRect(x+0.5,y+0.5,GS-1,GS-1);
          bx.strokeStyle='rgba(0,0,0,0.35)';bx.lineWidth=1;
          if(c%2===0){bx.beginPath();bx.moveTo(x,y+GS/2);bx.lineTo(x+GS,y+GS/2);bx.stroke();}
          else{bx.beginPath();bx.moveTo(x+GS/2,y);bx.lineTo(x+GS/2,y+GS);bx.stroke();}
        } else {
          bx.fillStyle=t===1?'#1a1020':'#120e18';bx.fillRect(x,y,GS,GS);
          if(t===1&&(c+r)%3===0){bx.fillStyle='#221530';bx.fillRect(x+1,y+1,GS-2,GS-2);}
          if(t===1&&(c*r)%5===0){bx.fillStyle='#2a1a38';bx.fillRect(x+GS/4,y+GS/4,GS/2,GS/2);}
          bx.strokeStyle='rgba(0,0,0,0.6)';bx.lineWidth=0.8;bx.strokeRect(x+0.5,y+0.5,GS-1,GS-1);
          bx.strokeStyle='rgba(100,60,140,0.08)';bx.lineWidth=0.5;bx.strokeRect(x+2,y+2,GS-4,GS-4);
        }
      }
    }
    // Torch glows
    [{c:3,r:2},{c:12,r:2},{c:19,r:3},{c:2,r:10},{c:11,r:9},{c:20,r:11},{c:4,r:15},{c:14,r:15}]
    .forEach(tp=>{
      const tx=tp.c*GS+GS/2,ty=tp.r*GS+GS/2;
      const glow=bx.createRadialGradient(tx,ty,0,tx,ty,GS*2.5);
      glow.addColorStop(0,'rgba(255,160,40,0.22)');glow.addColorStop(0.4,'rgba(200,100,20,0.1)');glow.addColorStop(1,'rgba(0,0,0,0)');
      bx.fillStyle=glow;bx.fillRect(tx-GS*2.5,ty-GS*2.5,GS*5,GS*5);
      bx.fillStyle='rgba(255,180,60,0.9)';bx.beginPath();bx.arc(tx,ty,3,0,Math.PI*2);bx.fill();
      bx.fillStyle='rgba(255,220,100,0.6)';bx.beginPath();bx.arc(tx,ty,1.5,0,Math.PI*2);bx.fill();
    });
    // Vignette
    const vig=bx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.85);
    vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,0.65)');
    bx.fillStyle=vig;bx.fillRect(0,0,W,H);
    // Grid overlay
    const gc=document.getElementById('map-grid');
    gc.width=W;gc.height=H;
    const gctx=gc.getContext('2d');
    gctx.strokeStyle='rgba(100,60,140,0.18)';gctx.lineWidth=0.5;
    for(let x=0;x<=W;x+=GS){gctx.beginPath();gctx.moveTo(x,0);gctx.lineTo(x,H);gctx.stroke();}
    for(let y=0;y<=H;y+=GS){gctx.beginPath();gctx.moveTo(0,y);gctx.lineTo(W,y);gctx.stroke();}

    // Center map on hero group
    const area=document.getElementById('map-area');
    const aw=area.clientWidth, ah=area.clientHeight;
    // Hero group center ~col 3-5, row 7-11 => pixel ~192,408
    const heroGroupX=4*GS, heroGroupY=9*GS;
    S.panX=aw/2-heroGroupX*S.zoom;
    S.panY=ah/2-heroGroupY*S.zoom;
    this.applyTransform();
  },

  /* ── DRAG ── */
  initDrag(){
    const area=document.getElementById('map-area');
    area.addEventListener('mousedown',e=>{
      if(e.target.classList.contains('mv-cell')) return;
      if(e.target.closest('.token')||e.target.closest('.map-obj')) return;
      S.dragging=true; S.dragSX=e.clientX; S.dragSY=e.clientY;
      S.panSX=S.panX; S.panSY=S.panY;
      area.classList.add('dragging');
    });
    window.addEventListener('mousemove',e=>{
      if(!S.dragging) return;
      S.panX=S.panSX+(e.clientX-S.dragSX);
      S.panY=S.panSY+(e.clientY-S.dragSY);
      this.applyTransform();
    });
    window.addEventListener('mouseup',()=>{
      S.dragging=false;
      document.getElementById('map-area').classList.remove('dragging');
    });
    area.addEventListener('click',e=>{
      if(e.target===area||e.target.id==='map-viewport'||e.target.id==='map-world'||
         e.target.id==='map-bg'||e.target.id==='map-grid'){
        if(S.mode==='move') this.clearMode();
      }
    });
  },

  applyTransform(){
    document.getElementById('map-world').style.transform=`translate(${S.panX}px,${S.panY}px) scale(${S.zoom})`;
  },

  initZoomWheel(){
    document.getElementById('map-area').addEventListener('wheel',e=>{
      e.preventDefault(); this.zoom(e.deltaY<0?0.1:-0.1);
    },{passive:false});
  },

  zoom(d){ S.zoom=Math.min(3,Math.max(0.3,S.zoom+d)); this.applyTransform(); },
  resetView(){ S.zoom=1; S.panX=0; S.panY=0; this.applyTransform(); },

  /* ── TURN PANEL ── */
  renderTurnPanel(){
    const hEl=document.getElementById('tp-heroes');
    const eEl=document.getElementById('tp-enemies');
    hEl.innerHTML=''; eEl.innerHTML='';
    S.heroes.forEach((h,i)=>{
      const pct=Math.round(h.hp/h.maxHp*100);
      const d=document.createElement('div');
      d.className='tp-entry'; d.id='tpe-h'+i;
      d.innerHTML=`<div class="tp-tok hero">${h.initial}</div>
        <div class="tp-info">
          <span class="tp-name">${h.name}</span>
          <div class="tp-hpbar"><div class="tp-hpfill hero" id="tphf-h${i}" style="width:${pct}%"></div></div>
          <span class="tp-hptxt" id="tpht-h${i}">${h.hp}/${h.maxHp}</span>
        </div>`;
      d.onclick=()=>{ if(!S.enemyTurnRunning) this.selectHero(i); };
      hEl.appendChild(d);
    });
    S.enemies.forEach((e,i)=>{
      if(!e.alive) return;
      const pct=Math.round(e.hp/e.maxHp*100);
      const d=document.createElement('div');
      d.className='tp-entry'; d.id='tpe-e'+i;
      d.innerHTML=`<div class="tp-tok enemy">${e.initial}</div>
        <div class="tp-info">
          <span class="tp-name">${e.name}</span>
          <div class="tp-hpbar"><div class="tp-hpfill enemy" id="tphf-e${i}" style="width:${pct}%"></div></div>
          <span class="tp-hptxt" id="tpht-e${i}">${e.hp}/${e.maxHp}</span>
        </div>`;
      d.onclick=()=>{ if(!S.enemyTurnRunning) this.selectEnemy(i); };
      eEl.appendChild(d);
    });
  },

  /* ── TOKENS ── */
  renderTokens(){
    const layer=document.getElementById('tokens-layer');
    layer.innerHTML='';
    S.heroes.forEach((h,i)=>{
      const pos=S.heroPos[h.id];
      const t=document.createElement('div');
      t.className='token hero-tok'; t.id='tok-'+h.id;
      t.style.left=this.colToPercent(pos.col)+'%';
      t.style.top=this.rowToPercent(pos.row)+'%';
      t.dataset.type='hero'; t.dataset.idx=i;
      t.innerHTML=`<span class="tok-lbl">${h.initial}</span>
        <div class="tok-hpbar"><div class="tok-hpfill hero" id="tokhp-${h.id}" style="width:100%"></div></div>`;
      t.addEventListener('click',e=>{e.stopPropagation(); if(!S.enemyTurnRunning) this.selectHero(i);});
      t.addEventListener('mouseenter',e=>this.showTip(e,`${h.name} — ${h.hp}/${h.maxHp} HP`));
      t.addEventListener('mouseleave',()=>this.hideTip());
      layer.appendChild(t);
    });
    S.enemies.forEach((en,i)=>{
      if(!en.alive) return;
      const pos=S.enemyPos[en.id];
      const t=document.createElement('div');
      t.className='token enemy-tok'; t.id='tok-'+en.id;
      t.style.left=this.colToPercent(pos.col)+'%';
      t.style.top=this.rowToPercent(pos.row)+'%';
      t.dataset.type='enemy'; t.dataset.idx=i;
      t.innerHTML=`<span class="tok-lbl">${en.initial}</span>
        <div class="tok-hpbar"><div class="tok-hpfill enemy" id="tokhp-${en.id}" style="width:100%"></div></div>`;
      t.addEventListener('click',e=>{e.stopPropagation(); if(!S.enemyTurnRunning) this.selectEnemy(i);});
      t.addEventListener('mouseenter',e=>this.showTip(e,`${en.name} — ${en.hp}/${en.maxHp} HP`));
      t.addEventListener('mouseleave',()=>this.hideTip());
      layer.appendChild(t);
    });
  },

  colToPercent(col){ return (col*S.gridSize+S.gridSize/2)/S.mapW*100; },
  rowToPercent(row){ return (row*S.gridSize+S.gridSize/2)/S.mapH*100; },

  /* ── OBJECTS ── */
  renderObjects(){
    const layer=document.getElementById('objects-layer');
    layer.innerHTML=''; layer.style.pointerEvents='all';
    OBJECTS_DATA.forEach(obj=>{
      const el=document.createElement('div');
      el.className='map-obj'; el.id='obj-'+obj.id;
      el.style.left=obj.x+'%'; el.style.top=obj.y+'%';
      el.textContent=obj.icon; el.title=obj.name;
      el.addEventListener('click',e=>{e.stopPropagation(); this.openObjPanel(obj);});
      layer.appendChild(el);
    });
  },

  /* ── START TURN ── */
  startTurn(){
    // Skip dead enemies in turn order
    this.cleanTurnOrder();
    if(S.turnOrder.length===0){ this.checkGameOver(); return; }

    document.querySelectorAll('.tp-entry').forEach(e=>e.classList.remove('cur-turn'));
    const cur=this.curTurn();
    const id=cur.type==='hero'?'tpe-h'+cur.idx:'tpe-e'+cur.idx;
    const el=document.getElementById(id);
    if(el) el.classList.add('cur-turn');
    document.getElementById('tp-round').textContent='R.'+S.round;

    if(cur.type==='hero'){
      S.enemyTurnRunning=false;
      const h=S.heroes[cur.idx];
      h.movLeft=h.mov; h.actionUsed=false; h.defending=false;
      this.selectHero(cur.idx);
      this.renderMagicMenu();
      this.narrate(rnd(NARR.turnStart)(h.name),'np-sys');
      this.setActionButtonsEnabled(true);
    } else {
      S.enemyTurnRunning=true;
      this.setActionButtonsEnabled(false);
      this.clearSel();
      this.narrate(rnd(NARR.enemyTurn)(S.enemies[cur.idx].name),'np-enemy');
      setTimeout(()=>this.runEnemyTurn(cur.idx),1000);
    }
  },

  cleanTurnOrder(){
    S.turnOrder=S.turnOrder.filter(t=>{
      if(t.type==='enemy') return S.enemies[t.idx]&&S.enemies[t.idx].alive;
      return S.heroes[t.idx]&&S.heroes[t.idx].hp>0;
    });
    if(S.turnIdx>=S.turnOrder.length) S.turnIdx=0;
  },

  setActionButtonsEnabled(on){
    ['btn-move','btn-action','btn-magic','btn-item'].forEach(id=>{
      const b=document.getElementById(id);
      if(b){ b.disabled=!on; b.style.opacity=on?'1':'0.4'; }
    });
    const et=document.querySelector('.end-turn-btn');
    if(et){ et.disabled=!on; et.style.opacity=on?'1':'0.4'; }
  },

  /* ── SELECTION ── */
  selectHero(idx){
    this.clearSel();
    S.selHero=idx;
    const h=S.heroes[idx];
    const tok=document.getElementById('tok-'+h.id);
    if(tok) tok.classList.add('sel-tok');
    this.updateCharPanel(idx);
    this.renderMagicMenu();
  },

  selectEnemy(idx){
    if(S.mode==='attack'){
      S.selEnemy=idx;
      const en=S.enemies[idx];
      document.getElementById('ap-target').textContent=en.name;
      document.getElementById('ap-hp').textContent=en.hp+'/'+en.maxHp+' HP';
      const h=S.selHero!==null?S.heroes[S.selHero]:S.heroes[0];
      document.getElementById('ap-weapon').textContent=h.weapon;
      document.getElementById('attack-panel').classList.add('open');
      document.querySelectorAll('.token.enemy-tok').forEach(t=>t.classList.remove('target-tok'));
      const tok=document.getElementById('tok-'+en.id);
      if(tok) tok.classList.add('target-tok');
      return;
    }
    // Just highlight enemy info
    document.querySelectorAll('.token.enemy-tok').forEach(t=>t.classList.remove('target-tok'));
    const tok=document.getElementById('tok-'+S.enemies[idx].id);
    if(tok) tok.classList.add('target-tok');
    S.selEnemy=idx;
  },

  clearSel(){
    S.selHero=null; S.selEnemy=null;
    document.querySelectorAll('.token').forEach(t=>{
      t.classList.remove('sel-tok'); t.classList.remove('target-tok');
    });
  },

  /* ── MODES ── */
  setMode(mode){
    this.closeAllMenus();
    if(S.mode===mode){ this.clearMode(); return; }
    S.mode=mode;
    document.querySelectorAll('.act-btn').forEach(b=>b.classList.remove('active'));
    if(mode==='move'){
      document.getElementById('btn-move').classList.add('active');
      this.showMoveCells();
    } else if(mode==='attack'){
      document.getElementById('btn-action').classList.add('active');
      this.narrate('Clique em um inimigo para atacar.','np-sys');
    }
  },

  clearMode(){
    S.mode=null;
    document.querySelectorAll('.act-btn').forEach(b=>b.classList.remove('active'));
    const layer=document.getElementById('move-layer');
    layer.innerHTML='';
    layer.style.pointerEvents='none';
  },

  /* ── MOVEMENT ── */
  showMoveCells(){
    const layer=document.getElementById('move-layer');
    layer.innerHTML='';
    if(S.selHero===null){ this.narrate('Selecione um herói primeiro.','np-sys'); return; }
    const h=S.heroes[S.selHero];
    if(h.movLeft<=0){ this.narrate(`${h.name} já usou todo o movimento neste turno.`,'np-sys'); this.clearMode(); return; }

    const pos=S.heroPos[h.id];
    const range=h.movLeft;
    const gs=S.gridSize;

    // Fix move-layer size to match map canvas
    layer.style.width=S.mapW+'px';
    layer.style.height=S.mapH+'px';
    layer.style.pointerEvents='all';

    const occupied=new Set();
    S.heroes.forEach(hero=>{ const p=S.heroPos[hero.id]; occupied.add(p.col+','+p.row); });
    S.enemies.forEach(en=>{ if(en.alive){const p=S.enemyPos[en.id]; occupied.add(p.col+','+p.row);} });

    for(let dy=-range;dy<=range;dy++){
      for(let dx=-range;dx<=range;dx++){
        if(Math.abs(dx)+Math.abs(dy)>range||(!dx&&!dy)) continue;
        const nc=pos.col+dx, nr=pos.row+dy;
        if(nc<0||nr<0||nc>=Math.ceil(S.mapW/gs)||nr>=Math.ceil(S.mapH/gs)) continue;

        const cell=document.createElement('div');
        cell.className='mv-cell';
        cell.style.cssText=`left:${nc*gs}px;top:${nr*gs}px;width:${gs}px;height:${gs}px;`;

        if(occupied.has(nc+','+nr)){
          cell.classList.add('blocked');
        } else {
          cell.addEventListener('mouseenter',()=>cell.classList.add('dest'));
          cell.addEventListener('mouseleave',()=>cell.classList.remove('dest'));
          cell.addEventListener('click',e=>{
            e.stopPropagation();
            this._moveHeroTo(S.selHero, nc, nr, Math.abs(dx)+Math.abs(dy));
          });
        }
        layer.appendChild(cell);
      }
    }
  },

  _moveHeroTo(heroIdx, nc, nr, dist){
    const h=S.heroes[heroIdx];
    S.heroPos[h.id]={col:nc, row:nr};
    h.movLeft=Math.max(0, h.movLeft-dist);

    const tok=document.getElementById('tok-'+h.id);
    if(tok){
      tok.style.transition='left 0.32s cubic-bezier(0.4,0,0.2,1),top 0.32s cubic-bezier(0.4,0,0.2,1)';
      tok.style.left=this.colToPercent(nc)+'%';
      tok.style.top=this.rowToPercent(nr)+'%';
      setTimeout(()=>{ tok.style.transition=''; },380);
    }

    this.narrate(rnd(NARR.move)(h.name));
    this.updateCharPanel(heroIdx);
    this.clearMode();

    // If still has movement, re-enable move button
    if(h.movLeft>0){
      const btn=document.getElementById('btn-move');
      if(btn) btn.style.opacity='1';
    }
    saveState();
  },

  /* ── ACTIONS ── */
  selectAction(type){
    this.closeAllMenus();
    const h=S.selHero!==null?S.heroes[S.selHero]:null;
    const name=h?h.name:'Herói';
    if(type==='attack'){
      if(h&&h.actionUsed){ this.narrate(`${name} já usou sua ação neste turno.`,'np-sys'); return; }
      this.setMode('attack');
    } else if(type==='defend'){
      if(h){ h.defending=true; h.actionUsed=true; }
      const tok=document.getElementById('tok-'+(h?h.id:''));
      if(tok) tok.classList.add('defending');
      this.narrate(rnd(NARR.defend)(name));
      saveState();
    } else if(type==='observe'){
      this.narrate(`${name} observa o campo de batalha com atenção.`);
    } else if(type==='interact'){
      this.narrate(`${name} examina os arredores em busca de algo útil.`);
    } else if(type==='run'){
      if(h){ h.movLeft=Math.min(h.mov*2, h.movLeft+3); }
      this.narrate(`${name} corre com toda a velocidade disponível.`);
      this.updateCharPanel(S.selHero);
    }
  },

  /* ── ATTACK ── */
  executeAttack(){
    if(S.selEnemy===null){ this.narrate('Nenhum alvo selecionado.','np-sys'); return; }
    const roll=Math.floor(Math.random()*20)+1;
    const en=S.enemies[S.selEnemy];
    const hero=S.selHero!==null?S.heroes[S.selHero]:S.heroes[0];
    this.animateDie(20,roll);
    hero.actionUsed=true;
    if(roll===20){
      const dmg=Math.floor(Math.random()*hero.dmgDie)+hero.dmgDie;
      this.dealDamage(S.selEnemy,dmg);
      this.narrate(rnd(NARR.crit)(hero.name,en.name,dmg),'np-crit');
    } else if(roll===1){
      this.narrate(rnd(NARR.critFail)(hero.name),'np-miss');
    } else if(roll>=8){
      const dmg=Math.floor(Math.random()*hero.dmgDie)+1;
      this.dealDamage(S.selEnemy,dmg);
      this.narrate(rnd(NARR.attackHit)(hero.name,en.name,dmg),'np-atk');
    } else {
      this.narrate(rnd(NARR.attackMiss)(hero.name,en.name),'np-miss');
    }
    document.getElementById('attack-panel').classList.remove('open');
    this.clearMode();
    saveState();
  },

  cancelAttack(){
    document.getElementById('attack-panel').classList.remove('open');
    this.clearMode();
  },

  dealDamage(enemyIdx,dmg){
    const en=S.enemies[enemyIdx];
    en.hp=Math.max(0,en.hp-dmg);
    const pct=Math.round(en.hp/en.maxHp*100);
    const tf=document.getElementById('tphf-e'+enemyIdx);
    const tt=document.getElementById('tpht-e'+enemyIdx);
    const th=document.getElementById('tokhp-'+en.id);
    if(tf) tf.style.width=pct+'%';
    if(tt) tt.textContent=en.hp+'/'+en.maxHp;
    if(th) th.style.width=pct+'%';
    if(en.hp===0){
      en.alive=false;
      this.narrate(rnd(NARR.defeated)(en.name),'np-crit');
      const tok=document.getElementById('tok-'+en.id);
      if(tok){ tok.style.opacity='0.25'; tok.style.pointerEvents='none'; }
      this.checkGameOver();
    }
  },

  dealDamageToHero(heroIdx,dmg){
    const h=S.heroes[heroIdx];
    if(h.defending) dmg=Math.max(1,dmg-3);
    h.hp=Math.max(0,h.hp-dmg);
    const pct=Math.round(h.hp/h.maxHp*100);
    const tf=document.getElementById('tphf-h'+heroIdx);
    const tt=document.getElementById('tpht-h'+heroIdx);
    const th=document.getElementById('tokhp-'+h.id);
    if(tf) tf.style.width=pct+'%';
    if(tt) tt.textContent=h.hp+'/'+h.maxHp;
    if(th) th.style.width=pct+'%';
    if(S.selHero===heroIdx) this.updateCharPanel(heroIdx);
    if(h.hp===0){
      this.narrate(rnd(NARR.defeated)(h.name),'np-crit');
      const tok=document.getElementById('tok-'+h.id);
      if(tok){ tok.style.opacity='0.25'; tok.style.pointerEvents='none'; }
      this.checkGameOver();
    }
  },

  checkGameOver(){
    const allEnemiesDead=S.enemies.every(e=>!e.alive);
    const allHeroesDead=S.heroes.every(h=>h.hp<=0);
    if(allEnemiesDead){
      S.gameOver=true;
      this.showGameOverScreen('VITÓRIA!','Os inimigos foram derrotados. A Coroa das Sombras está segura.','victory');
    } else if(allHeroesDead){
      S.gameOver=true;
      this.showGameOverScreen('DERROTA','Todos os heróis caíram. As trevas vencem desta vez.','defeat');
    }
  },

  showGameOverScreen(title,msg,type){
    const ov=document.getElementById('reset-overlay');
    const box=ov.querySelector('.confirm-box');
    box.querySelector('.cb-title').textContent=title;
    box.querySelector('.cb-desc').textContent=msg;
    box.querySelector('.cb-yes').textContent='JOGAR NOVAMENTE';
    box.querySelector('.cb-no').textContent='VOLTAR AO MENU';
    box.querySelector('.cb-no').onclick=()=>window.location.href='../home.html';
    if(type==='victory') box.querySelector('.cb-title').style.color='#2ecc71';
    ov.style.display='flex';
  },

  /* ── SPELLS ── */
  renderMagicMenu(){
    const menu=document.getElementById('menu-magic');
    menu.innerHTML='';
    const h=S.selHero!==null?S.heroes[S.selHero]:null;
    if(!h||!h.spells||h.spells.length===0){
      menu.innerHTML='<button disabled style="opacity:0.4;cursor:not-allowed">Sem magias disponíveis</button>';
      return;
    }
    h.spells.forEach(key=>{
      const sp=SPELLS_DATA[key]; if(!sp) return;
      const hasMp=h.mp>=sp.cost;
      const btn=document.createElement('button');
      btn.disabled=!hasMp;
      btn.innerHTML=`${sp.icon} ${sp.name} <span class="${hasMp?'spell-mp':'spell-no-mp'}">${sp.cost} MP</span>`;
      btn.onclick=()=>this.castSpell(key);
      menu.appendChild(btn);
    });
  },

  castSpell(key){
    this.closeAllMenus();
    const sp=SPELLS_DATA[key];
    const hero=S.selHero!==null?S.heroes[S.selHero]:S.heroes[0];
    if(hero.mp<sp.cost){ this.narrate('Mana insuficiente!','np-sys'); return; }
    if(hero.actionUsed){ this.narrate(`${hero.name} já usou sua ação neste turno.`,'np-sys'); return; }
    hero.mp-=sp.cost; hero.actionUsed=true;
    this.narrate(rnd(NARR.spell)(hero.name,sp.name));
    const hi=S.selHero!==null?S.selHero:0;
    if(sp.type==='heal'){
      const val=Math.floor(Math.random()*(sp.maxDmg-sp.minDmg+1))+sp.minDmg;
      hero.hp=Math.min(hero.maxHp,hero.hp+val);
      this.updateHeroHP(hi);
      this.narrate(rnd(NARR.heal)(hero.name,val),'np-heal');
    } else if(sp.type==='dmg'||sp.type==='drain'){
      if(S.selEnemy===null){ this.narrate('Selecione um inimigo como alvo primeiro.','np-sys'); hero.mp+=sp.cost; hero.actionUsed=false; return; }
      const dmg=Math.floor(Math.random()*(sp.maxDmg-sp.minDmg+1))+sp.minDmg;
      this.dealDamage(S.selEnemy,dmg);
      this.narrate(`${hero.name} usa ${sp.name} causando ${dmg} de dano!`,'np-atk');
      if(sp.type==='drain'){ hero.hp=Math.min(hero.maxHp,hero.hp+Math.floor(dmg/2)); this.updateHeroHP(hi); }
    } else if(sp.type==='buff'){
      hero.defending=true;
      this.narrate(`${hero.name} ativa ${sp.name}. Defesa aumentada!`,'np-heal');
    } else {
      this.narrate(`${hero.name} lança ${sp.name} sobre o inimigo!`,'np-atk');
    }
    this.updateCharPanel(hi);
    this.renderMagicMenu();
    saveState();
  },

  /* ── ITEMS ── */
  openInventory(){
    this.closeAllMenus();
    const grid=document.getElementById('inv-modal-grid');
    grid.innerHTML='';
    S.items.forEach((item,i)=>{
      const slot=document.createElement('div');
      slot.className='inv-modal-slot'+(item.qty<=0?' empty':'');
      slot.innerHTML=`<span class="ims-icon">${item.icon}</span>
        <span class="ims-name">${item.name}</span>
        <span class="ims-qty">${item.qty>0?'×'+item.qty:''}</span>`;
      if(item.qty>0) slot.onclick=()=>this.selectItem(i);
      grid.appendChild(slot);
    });
    for(let i=S.items.length;i<8;i++){
      const slot=document.createElement('div');
      slot.className='inv-modal-slot empty';
      grid.appendChild(slot);
    }
    document.getElementById('inv-item-detail').style.display='none';
    document.getElementById('inv-overlay').style.display='flex';
  },

  selectItem(idx){
    S.curItem=idx;
    const item=S.items[idx];
    document.getElementById('iid-name').textContent=item.name;
    document.getElementById('iid-desc').textContent=item.desc;
    document.getElementById('inv-item-detail').style.display='block';
    document.querySelectorAll('.inv-modal-slot').forEach(s=>s.classList.remove('selected'));
    const slots=document.querySelectorAll('.inv-modal-slot:not(.empty)');
    if(slots[idx]) slots[idx].classList.add('selected');
  },

  confirmUseItem(){
    if(S.curItem===null) return;
    const idx=S.curItem;
    this.closeInventory(null,true);
    this.useItem(idx);
    S.curItem=null;
  },

  closeItemDetail(){ document.getElementById('inv-item-detail').style.display='none'; S.curItem=null; },

  closeInventory(e,force){
    if(!force&&e&&e.target!==document.getElementById('inv-overlay')) return;
    document.getElementById('inv-overlay').style.display='none';
  },

  useItem(idx){
    const item=S.items[idx];
    if(!item||item.qty<=0){ this.narrate('Item esgotado!','np-sys'); return; }
    item.qty--;
    const hero=S.selHero!==null?S.heroes[S.selHero]:S.heroes[0];
    this.narrate(rnd(NARR.item)(hero.name,item.name));
    if(item.effect==='hp'){
      hero.hp=Math.min(hero.maxHp,hero.hp+item.val);
      this.updateHeroHP(S.selHero!==null?S.selHero:0);
      this.narrate(`${hero.name} recuperou ${item.val} pontos de vida.`,'np-heal');
    } else if(item.effect==='mp'){
      hero.mp=Math.min(hero.maxMp,hero.mp+item.val);
      this.updateCharPanel(S.selHero!==null?S.selHero:0);
      this.narrate(`${hero.name} recuperou ${item.val} pontos de mana.`,'np-heal');
    } else if(item.effect==='dmg'){
      if(S.selEnemy===null){ this.narrate('Selecione um inimigo como alvo primeiro.','np-sys'); item.qty++; return; }
      this.dealDamage(S.selEnemy,item.val);
      this.narrate(`${hero.name} usa ${item.name} causando ${item.val} de dano!`,'np-atk');
    }
    this.renderInventoryQuick();
    saveState();
  },

  renderInventoryQuick(){
    const grid=document.getElementById('inv-quick-grid');
    grid.innerHTML='';
    S.items.forEach((item,i)=>{
      const slot=document.createElement('div');
      slot.className='inv-slot'+(item.qty<=0?' inv-empty':'');
      slot.title=item.name+(item.qty>0?' ×'+item.qty:' (esgotado)');
      slot.innerHTML=`${item.icon}<span class="inv-qty">${item.qty}</span>`;
      if(item.qty>0) slot.onclick=()=>{ S.curItem=i; this.openInventory(); };
      grid.appendChild(slot);
    });
  },

  /* ── DICE ── */
  rollDice(sides){
    const result=Math.floor(Math.random()*sides)+1;
    const btn=document.getElementById('btn-d20');
    if(btn){btn.classList.add('rolling');setTimeout(()=>btn.classList.remove('rolling'),500);}
    this.animateDie(sides,result);
    this.narrate(`D${sides} rolado: ${result}.`);
  },

  animateDie(sides,result){
    const lbl=document.getElementById('dr-label');
    const num=document.getElementById('dr-num');
    const vrd=document.getElementById('dr-verdict');
    const face=document.getElementById('d20-face');
    if(!lbl) return;
    lbl.textContent='D'+sides; num.textContent='...';
    vrd.textContent=''; vrd.className='dr-verdict';
    if(face) face.textContent='?';
    let i=0;
    const spin=setInterval(()=>{
      const r=Math.floor(Math.random()*sides)+1;
      num.textContent=r;
      if(face) face.textContent=r;
      if(++i>8){
        clearInterval(spin);
        num.textContent=result;
        if(face) face.textContent=result;
        if(sides===20){
          if(result===20){
            vrd.textContent='CRÍTICO!';vrd.classList.add('dr-crit');
            if(face){face.style.fill='#2ecc71';setTimeout(()=>face.style.fill='',1500);}
          } else if(result===1){
            vrd.textContent='FALHA!';vrd.classList.add('dr-fail');
            if(face){face.style.fill='#c0392b';setTimeout(()=>face.style.fill='',1500);}
          }
        }
      }
    },50);
  },

  /* ── NEXT TURN ── */
  nextTurn(){
    if(S.gameOver) return;
    const cur=this.curTurn();
    const name=cur.type==='hero'?S.heroes[cur.idx].name:S.enemies[cur.idx].name;
    this.narrate(rnd(NARR.endTurn)(name),'np-sys');
    this.clearMode();
    this.closeAllMenus();
    document.getElementById('attack-panel').classList.remove('open');
    S.turnIdx=(S.turnIdx+1)%S.turnOrder.length;
    if(S.turnIdx===0) S.round++;
    saveState();
    this.startTurn();
  },

  /* ── ENEMY TURN ── */
  runEnemyTurn(idx){
    if(S.gameOver) return;
    const en=S.enemies[idx];
    if(!en||!en.alive){ this.nextTurn(); return; }

    const pos=S.enemyPos[en.id];
    let closest=0, minDist=999;
    S.heroes.forEach((h,i)=>{
      if(h.hp<=0) return;
      const hp=S.heroPos[h.id];
      const d=Math.abs(hp.col-pos.col)+Math.abs(hp.row-pos.row);
      if(d<minDist){ minDist=d; closest=i; }
    });

    const target=S.heroes[closest];
    const tpos=S.heroPos[target.id];
    const dist=Math.abs(tpos.col-pos.col)+Math.abs(tpos.row-pos.row);

    if(dist>1){
      // Move toward target
      const dc=tpos.col>pos.col?1:(tpos.col<pos.col?-1:0);
      const dr=tpos.row>pos.row?1:(tpos.row<pos.row?-1:0);
      const nc=pos.col+dc, nr=pos.row+dr;
      S.enemyPos[en.id]={col:nc,row:nr};
      const tok=document.getElementById('tok-'+en.id);
      if(tok){
        tok.style.transition='left 0.4s ease,top 0.4s ease';
        tok.style.left=this.colToPercent(nc)+'%';
        tok.style.top=this.rowToPercent(nr)+'%';
        setTimeout(()=>tok.style.transition='',500);
      }
    }

    setTimeout(()=>{
      if(S.gameOver) return;
      const newPos=S.enemyPos[en.id];
      const newDist=Math.abs(tpos.col-newPos.col)+Math.abs(tpos.row-newPos.row);
      if(newDist<=1){
        const roll=Math.floor(Math.random()*20)+1;
        this.animateDie(20,roll);
        if(roll>=7){
          const dmg=Math.floor(Math.random()*en.dmgDie)+1;
          this.dealDamageToHero(closest,dmg);
          this.narrate(`${en.name} ataca ${target.name} causando ${dmg} de dano!`,'np-enemy');
        } else {
          this.narrate(`${en.name} tenta atacar ${target.name} mas erra.`,'np-miss');
        }
      }
      if(!S.gameOver) setTimeout(()=>this.nextTurn(),700);
    },600);
  },

  /* ── MENUS ── */
  toggleMenu(id,btnId){
    const menu=document.getElementById(id);
    const isOpen=menu.classList.contains('open');
    this.closeAllMenus();
    if(!isOpen){
      menu.classList.add('open');
      if(btnId) document.getElementById(btnId).classList.add('active');
    }
  },

  closeAllMenus(){
    document.querySelectorAll('.act-menu').forEach(m=>m.classList.remove('open'));
    document.querySelectorAll('.act-btn').forEach(b=>b.classList.remove('active'));
  },

  /* ── CHAR PANEL ── */
  updateCharPanel(idx){
    const h=S.heroes[idx]; if(!h) return;
    document.getElementById('cp-letter').textContent=h.initial;
    document.getElementById('cp-name').textContent=h.name;
    document.getElementById('cp-class').textContent=h.cls+' · Nv.';
    document.getElementById('cp-level').textContent=h.level;
    const hpPct=Math.round(h.hp/h.maxHp*100);
    const mpPct=h.maxMp>0?Math.round(h.mp/h.maxMp*100):0;
    const movPct=Math.round(h.movLeft/h.mov*100);
    document.getElementById('cp-hp-fill').style.width=hpPct+'%';
    document.getElementById('cp-mp-fill').style.width=mpPct+'%';
    document.getElementById('cp-mov-fill').style.width=movPct+'%';
    document.getElementById('cp-hp-val').textContent=h.hp+'/'+h.maxHp;
    document.getElementById('cp-mp-val').textContent=h.mp+'/'+h.maxMp;
    document.getElementById('cp-mov-val').textContent=h.movLeft+'/'+h.mov;
    const portrait=document.getElementById('cp-portrait');
    portrait.innerHTML=`<img src="../assets/images/${h.id}.jpeg" onerror="this.style.display='none'" alt="${h.name}"/>
      <div class="cp-portrait-letter" id="cp-letter" style="display:none">${h.initial}</div>`;
  },

  updateHeroHP(idx){
    const h=S.heroes[idx];
    const pct=Math.round(h.hp/h.maxHp*100);
    const tf=document.getElementById('tphf-h'+idx);
    const tt=document.getElementById('tpht-h'+idx);
    const th=document.getElementById('tokhp-'+h.id);
    if(tf) tf.style.width=pct+'%';
    if(tt) tt.textContent=h.hp+'/'+h.maxHp;
    if(th) th.style.width=pct+'%';
    if(S.selHero===idx) this.updateCharPanel(idx);
  },

  /* ── TOPBAR ── */
  syncTopbar(){
    const ac=localStorage.getItem('cos_active_char');
    const map={kael:{n:'Kael',l:8,i:'K'},lunara:{n:'Lunara',l:7,i:'L'},tharok:{n:'Tharok',l:9,i:'T'},sylien:{n:'Sylien',l:6,i:'S'},harley:{n:'Harley',l:10,i:'H'}};
    const c=(ac&&map[ac])?map[ac]:map.harley;
    const av=document.getElementById('g-avatar');
    const pn=document.getElementById('g-pname');
    const pl=document.getElementById('g-plevel');
    if(av) av.textContent=c.i;
    if(pn) pn.textContent=c.n;
    if(pl) pl.textContent=c.l;
  },

  toggleProfileMenu(){ document.getElementById('g-profile-menu').classList.toggle('open'); },

  /* ── OBJECTS ── */
  openObjPanel(obj){
    S.curObj=obj;
    document.getElementById('op-icon').textContent=obj.icon;
    document.getElementById('op-name').textContent=obj.name;
    document.getElementById('op-desc').textContent=obj.desc;
    document.getElementById('op-primary').textContent=obj.action;
    document.getElementById('obj-panel').classList.add('open');
  },

  interactObject(){
    if(!S.curObj) return;
    const h=S.selHero!==null?S.heroes[S.selHero]:S.heroes[0];
    this.narrate(`${h.name} interage com ${S.curObj.name}: ${S.curObj.action.toLowerCase()}...`);
    if(S.curObj.id==='chest1'){
      const bonus=Math.floor(Math.random()*10)+5;
      h.hp=Math.min(h.maxHp,h.hp+bonus);
      this.updateHeroHP(S.selHero!==null?S.selHero:0);
      this.narrate(`${h.name} encontrou ${bonus} pontos de cura no baú!`,'np-heal');
    }
    this.closeObjPanel();
  },

  closeObjPanel(){ document.getElementById('obj-panel').classList.remove('open'); S.curObj=null; },

  /* ── NARRATOR ── */
  narrate(text,cls){
    // Side panel
    const body=document.getElementById('np-body');
    const d=document.createElement('div');
    d.className='np-entry '+(cls||'');
    d.textContent=text;
    body.appendChild(d);
    body.scrollTop=body.scrollHeight;
    if(body.children.length>60) body.removeChild(body.firstChild);
    // Topbar ticker
    this.tickerShow(text,cls);
  },

  tickerShow(text,cls){
    const track=document.getElementById('narr-ticker-track')||document.querySelector('.narr-ticker-track');
    const old=document.getElementById('narr-ticker-msg');
    if(!track) return;
    if(old){
      old.classList.add('out');
      setTimeout(()=>old.remove(),400);
    }
    const span=document.createElement('span');
    span.className='narr-ticker-msg '+(cls||'');
    span.id='narr-ticker-msg';
    span.textContent=text;
    track.appendChild(span);
  },

  toggleNarrator(){
    const panel=document.getElementById('narrator-panel');
    S.narratorCollapsed=!S.narratorCollapsed;
    panel.classList.toggle('collapsed',S.narratorCollapsed);
  },

  /* ── TOOLTIP ── */
  showTip(e,text){
    const t=document.getElementById('tok-tip');
    t.textContent=text; t.classList.add('show');
    t.style.left=(e.clientX+12)+'px'; t.style.top=(e.clientY-28)+'px';
  },
  hideTip(){ document.getElementById('tok-tip').classList.remove('show'); },

  /* ── RESET ── */
  confirmReset(){
    document.getElementById('g-profile-menu').classList.remove('open');
    const box=document.querySelector('#reset-overlay .confirm-box');
    box.querySelector('.cb-title').textContent='REINICIAR PARTIDA?';
    box.querySelector('.cb-title').style.color='';
    box.querySelector('.cb-desc').textContent='Todo o progresso será perdido.';
    box.querySelector('.cb-yes').textContent='CONFIRMAR';
    box.querySelector('.cb-no').textContent='CANCELAR';
    box.querySelector('.cb-no').onclick=()=>this.closeReset(null,true);
    document.getElementById('reset-overlay').style.display='flex';
  },
  closeReset(e,force){
    if(!force&&e&&e.target!==document.getElementById('reset-overlay')) return;
    document.getElementById('reset-overlay').style.display='none';
  },
  doReset(){ localStorage.removeItem(SAVE_KEY); location.reload(); }
};

/* ── TUTORIAL ── */
Object.assign(Game,{
  _tutStep:0,
  _tutTotal:7,

  openTutorial(){
    document.getElementById('g-profile-menu').classList.remove('open');
    this._tutStep=0;
    this._buildTutDots();
    this._showTutStep(0);
    document.getElementById('tutorial-overlay').style.display='flex';
  },

  closeTutorial(){
    document.getElementById('tutorial-overlay').style.display='none';
    localStorage.setItem('cos_tut_seen','1');
  },

  tutStep(dir){
    this._tutStep=Math.max(0,Math.min(this._tutTotal-1,this._tutStep+dir));
    this._showTutStep(this._tutStep);
  },

  _showTutStep(i){
    document.querySelectorAll('.tut-step').forEach(s=>s.classList.remove('active'));
    const s=document.querySelector(`.tut-step[data-step="${i}"]`);
    if(s) s.classList.add('active');
    document.querySelectorAll('.tut-dot').forEach((d,j)=>d.classList.toggle('active',j===i));
    const prev=document.getElementById('tut-prev');
    const next=document.getElementById('tut-next');
    if(prev) prev.disabled=(i===0);
    if(next) next.textContent=i===this._tutTotal-1?'FECHAR ✕':'PRÓXIMO →';
    if(next) next.onclick=i===this._tutTotal-1?()=>this.closeTutorial():()=>this.tutStep(1);
  },

  _buildTutDots(){
    const c=document.getElementById('tut-dots');
    if(!c) return;
    c.innerHTML='';
    for(let i=0;i<this._tutTotal;i++){
      const d=document.createElement('div');
      d.className='tut-dot'+(i===0?' active':'');
      d.onclick=()=>{ this._tutStep=i; this._showTutStep(i); };
      c.appendChild(d);
    }
  }
});

/* ── ANIMATIONS ── */
Object.assign(Game,{

  floatText(x,y,text,type){
    const el=document.createElement('div');
    el.className='float-dmg '+(type||'dmg');
    el.textContent=text;
    el.style.left=x+'px'; el.style.top=y+'px';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200);
  },

  tokenHit(id){
    const tok=document.getElementById('tok-'+id);
    if(!tok) return;
    tok.classList.remove('hit');
    void tok.offsetWidth;
    tok.classList.add('hit');
    setTimeout(()=>tok.classList.remove('hit'),600);
  },

  mapFlash(type){
    const area=document.getElementById('map-area');
    area.classList.remove('atk-flash','heal-flash');
    void area.offsetWidth;
    area.classList.add(type==='heal'?'heal-flash':'atk-flash');
    setTimeout(()=>area.classList.remove('atk-flash','heal-flash'),450);
  },

  showTurnBanner(name,type){
    const b=document.createElement('div');
    b.className='turn-banner'+(type==='enemy'?' enemy':'');
    b.textContent=type==='enemy'?`⚔ ${name}`:`✦ ${name}`;
    document.body.appendChild(b);
    setTimeout(()=>b.remove(),1700);
  },

  initParticles(){
    const canvas=document.getElementById('particles-canvas');
    if(!canvas) return;
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
    const ctx=canvas.getContext('2d');
    const pts=Array.from({length:55},()=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      r:Math.random()*1.2+0.3,
      vx:(Math.random()-0.5)*0.18, vy:(Math.random()-0.5)*0.18,
      a:Math.random(),
      col:Math.random()>0.6?'201,168,76':'160,100,180'
    }));
    const tick=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        p.a+=0.008;
        if(p.x<0) p.x=canvas.width;
        if(p.x>canvas.width) p.x=0;
        if(p.y<0) p.y=canvas.height;
        if(p.y>canvas.height) p.y=0;
        const alpha=0.3+0.25*Math.sin(p.a);
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.col},${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    };
    tick();
  }
});

/* Patch dealDamage/dealDamageToHero to trigger animations */
const _origDD=Game.dealDamage.bind(Game);
Game.dealDamage=function(enemyIdx,dmg){
  const en=S.enemies[enemyIdx];
  const tok=document.getElementById('tok-'+en.id);
  if(tok){
    const r=tok.getBoundingClientRect();
    const type=dmg>=(en.maxHp*0.4)?'crit':'dmg';
    Game.floatText(r.left+r.width/2-16,r.top-10,'-'+dmg,type);
    Game.tokenHit(en.id);
  }
  Game.mapFlash('atk');
  _origDD(enemyIdx,dmg);
};
const _origDDH=Game.dealDamageToHero.bind(Game);
Game.dealDamageToHero=function(heroIdx,dmg){
  const h=S.heroes[heroIdx];
  const tok=document.getElementById('tok-'+h.id);
  if(tok){
    const r=tok.getBoundingClientRect();
    Game.floatText(r.left+r.width/2-16,r.top-10,'-'+dmg,'dmg');
    Game.tokenHit(h.id);
  }
  Game.mapFlash('atk');
  _origDDH(heroIdx,dmg);
};
const _origUH=Game.updateHeroHP.bind(Game);
Game.updateHeroHP=function(idx){
  const h=S.heroes[idx];
  const tok=document.getElementById('tok-'+h.id);
  if(tok){
    const r=tok.getBoundingClientRect();
    Game.floatText(r.left+r.width/2-16,r.top-10,'+HP','heal');
  }
  Game.mapFlash('heal');
  _origUH(idx);
};

/* Patch startTurn to show banner */
const _origST=Game.startTurn.bind(Game);
Game.startTurn=function(){
  const cur=S.turnOrder[S.turnIdx];
  if(cur){
    const name=cur.type==='hero'?S.heroes[cur.idx]?.name:S.enemies[cur.idx]?.name;
    if(name) Game.showTurnBanner(name,cur.type);
  }
  _origST();
};

document.addEventListener('DOMContentLoaded',()=>Game.init());

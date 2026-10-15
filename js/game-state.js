/* ============================================
   CROWN OF SHADOWS — game-state.js
   ============================================ */
const GameState = (() => {
  const KEY = 'cos_game_state';

  const defaultState = () => ({
    turn: 1,
    activeCharIndex: 0,
    turnOrder: ['harley','morgan','lyria','kael','darius'],
    doneTurns: [],
    fog: {},          // "x,y": true = revealed
    tokens: {},       // charId: {x,y}
    inventory: [
      {id:'potion',    name:'Poção de Cura',   icon:'🧪', desc:'Restaura 30 HP.',          qty:3},
      {id:'key',       name:'Chave Antiga',    icon:'🗝',  desc:'Abre portas trancadas.',    qty:1},
      {id:'map',       name:'Mapa das Sombras',icon:'🗺',  desc:'Revela áreas próximas.',    qty:1},
      {id:'scroll',    name:'Pergaminho Arcano',icon:'📜', desc:'Harley pode usá-lo para identificar magia.', qty:2},
      {id:'fragment',  name:'Fragmento da Coroa',icon:'💎',desc:'Um dos cinco fragmentos. Irradia poder sombrio.', qty:1},
    ],
    selectedItem: null,
    quests: {
      main: {
        title: 'Ecos da Coroa',
        desc:  'Investigue as ruínas e descubra a origem dos símbolos.',
        objectives: [
          {id:'enter',   text:'Entrar nas ruínas',           done:true},
          {id:'passage', text:'Encontrar a passagem secreta', done:true},
          {id:'explore', text:'Explorar a masmorra',          done:false},
          {id:'symbol',  text:'Descobrir o significado do símbolo', done:false},
        ]
      },
      side: [
        {
          title:'A Chave Perdida',
          desc:'Encontre a chave que abre a câmara do altar.',
          objectives:[
            {id:'find_key',text:'Encontrar a chave',done:true},
            {id:'open_chamber',text:'Abrir a câmara',done:false},
          ]
        }
      ]
    },
    chronicle: [
      {turn:1, text:'O grupo entrou nas ruínas. O ar cheira a pedra úmida e algo mais antigo.'},
      {turn:2, text:'Lyria encontrou uma passagem secreta atrás de um altar coberto de musgo.'},
      {turn:3, text:'Harley identificou magia antiga nas paredes — símbolos da era de Valdrak.'},
    ],
    scene: 'dungeon_entrance',
    combatActive: false,
    enemy: null,
    lastRoll: null,
    pendingAction: null,
  });

  let state = defaultState();

  function get()    { return state; }
  function set(key, val) { state[key] = val; }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      Game.floatText('💾 Salvo!', window.innerWidth/2, window.innerHeight/2, '#c9a84c');
    } catch(e) { console.warn('Save failed', e); }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { state = {...defaultState(), ...JSON.parse(raw)}; Game.refresh(); }
    } catch(e) { console.warn('Load failed', e); }
  }

  function endTurn() {
    const s = state;
    s.doneTurns.push(s.turnOrder[s.activeCharIndex]);
    s.activeCharIndex = (s.activeCharIndex + 1) % s.turnOrder.length;
    if (s.activeCharIndex === 0) {
      s.turn++;
      s.doneTurns = [];
    }
    const name = Characters.get(s.turnOrder[s.activeCharIndex]).name;
    Game.showTurnBanner(`TURNO DE ${name.toUpperCase()}`);
    Game.refresh();
    Game.addChronicle(`Turno ${s.turn} — ${name} age.`);
    Board.renderTokens();
  }

  function addChronicle(text) {
    state.chronicle.push({turn: state.turn, text});
  }

  function revealFog(cx, cy, radius) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (dx*dx + dy*dy <= radius*radius) {
          state.fog[`${cx+dx},${cy+dy}`] = true;
        }
      }
    }
  }

  function isFogRevealed(cx, cy) {
    return !!state.fog[`${cx},${cy}`];
  }

  function completeObjective(questType, objId) {
    const q = questType === 'main' ? state.quests.main : state.quests.side.find(s => s.objectives.find(o => o.id === objId));
    if (!q) return;
    const obj = q.objectives.find(o => o.id === objId);
    if (obj && !obj.done) {
      obj.done = true;
      Game.floatText('✓ Objetivo concluído!', window.innerWidth/2, 200, '#c9a84c');
    }
  }

  return { get, set, save, load, endTurn, addChronicle, revealFog, isFogRevealed, completeObjective, defaultState };
})();

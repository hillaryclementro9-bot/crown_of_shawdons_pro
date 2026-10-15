/* ============================================
   CROWN OF SHADOWS — personagens.js
   ============================================ */

const CHARS_DATA = {
  kael: {
    id: 'kael', name: 'MORGAN', class: 'GUERREIRA DE FERRO', level: 8,
    xp: 576, xpMax: 800, hp: 30, hpMax: 30, mp: 12, mpMax: 16,
    portraitClass: 'kael-art', initial: 'M', rune: '⚔',
    lore: '"O ferro não dobra. Eu tampouco."',
    desc: 'Forjada nas guerras do norte, Morgan é a muralha viva da party. Nenhum inimigo passou por ela e sobreviveu para contar.',
    history: 'Morgan cresceu nas forjas de Ironheld, filha de um ferreiro que morreu defendendo a cidade. Ela pegou a espada do pai ainda quente de batalha e nunca mais a largou. Treinada pelos Guardas de Ferro, tornou-se a primeira mulher a liderar um batalhão em três séculos. Quando a ordem foi corrompida por dentro, ela a abandonou — mas não seus princípios.',
    attrs: { FOR: 19, DES: 11, CON: 17, INT: 10, SAB: 13, CAR: 12 },
    skills: [
      { icon: '⚔', name: 'Golpe de Ferro', desc: 'Ataque devastador que ignora 4 de armadura.', cost: '2 Stamina' },
      { icon: '🛡', name: 'Muralha de Aço', desc: 'Reduz dano recebido em 5 por 1 turno.', cost: '1 Stamina' },
      { icon: '💢', name: 'Fúria da Forja', desc: '+5 de dano por 3 turnos. Não pode recuar.', cost: '3 Stamina' },
      { icon: '🗿', name: 'Resistência de Ferro', desc: 'Recupera 6 HP ao final de cada turno.', cost: 'Passiva' },
    ],
    equip: { weapon: 'Espada de Ferro de Ironheld', armor: 'Armadura de Placas da Guarda', helm: 'Elmo da Comandante', amulet: '—', ring: 'Anel de Resistência' },
    inv: [
      { icon: '🧪', name: 'Poção de Vida' }, { icon: '🧪', name: 'Poção de Vida' },
      { icon: '📜', name: 'Ordem de Batalha' }, { icon: '💰', name: '52 Ouro' },
      { icon: '🗝', name: 'Chave da Forja' }, { icon: '🪨', name: 'Pedra de Amolar' },
    ],
  },
  lunara: {
    id: 'lunara', name: 'HARLEY', class: 'MAGA ARCANA', level: 7,
    xp: 385, xpMax: 700, hp: 18, hpMax: 18, mp: 28, mpMax: 32,
    portraitClass: 'lunara-art', initial: 'H', rune: '🔮',
    lore: '"A magia não é dom. É conquista."',
    desc: 'Discípula renegada da Academia Arcana, Harley domina feitiços proibidos que seus mestres temiam ensinar. Seu poder é imenso — e instável.',
    history: 'Harley foi expulsa da Academia Arcana aos dezoito anos por realizar experimentos com magia proibida. Em vez de se arrepender, foi mais fundo. Estudou com magos errantes, espíritos antigos e tomos selados. Cada feitiço que aprendeu custou algo: memórias, sonhos, pedaços de si mesma. Hoje ela é mais poderosa do que qualquer mestre que a rejeitou.',
    attrs: { FOR: 8, DES: 15, CON: 11, INT: 20, SAB: 16, CAR: 14 },
    skills: [
      { icon: '🔥', name: 'Chama Arcana', desc: 'Dano 5d6 em área de 4m. Teste de Destreza.', cost: '4 Mana' },
      { icon: '⚡', name: 'Raio Arcano', desc: 'Dano 3d8 em linha reta, atravessa inimigos.', cost: '3 Mana' },
      { icon: '🔮', name: 'Barreira Arcana', desc: 'Absorve até 14 de dano. Dura 3 turnos.', cost: '2 Mana' },
      { icon: '🌀', name: 'Dobra Espacial', desc: 'Move-se instantaneamente até 18m.', cost: '3 Mana' },
    ],
    equip: { weapon: 'Cajado dos Feitiços Proibidos', armor: 'Manto Arcano Renegado', helm: 'Tiara de Foco Arcano', amulet: 'Amuleto de Mana Pura', ring: 'Anel do Renegado' },
    inv: [
      { icon: '💧', name: 'Poção de Mana' }, { icon: '💧', name: 'Poção de Mana' },
      { icon: '📖', name: 'Tomo Proibido' }, { icon: '💎', name: 'Cristal Arcano' },
      { icon: '💰', name: '31 Ouro' }, { icon: '📜', name: 'Pergaminho Selado' },
    ],
  },
  tharok: {
    id: 'tharok', name: 'LYRIA', class: 'LADRA DAS SOMBRAS', level: 9,
    xp: 792, xpMax: 900, hp: 22, hpMax: 22, mp: 18, mpMax: 20,
    portraitClass: 'tharok-art', initial: 'L', rune: '🗡',
    lore: '"Você só me vê quando eu quero ser vista."',
    desc: 'Fantasma das ruas de Ashenveil, Lyria opera nas sombras com precisão cirúrgica. Nenhum cofre resiste, nenhum segredo escapa.',
    history: 'Lyria cresceu nos becos de Ashenveil, a cidade onde o sol nunca brilha completamente. Órfã desde os seis anos, aprendeu a sobreviver roubando, mentindo e desaparecendo antes que alguém percebesse. A Guilda das Sombras a recrutou aos doze — e ela os traiu aos vinte, levando consigo os segredos de cada membro. Agora é caçada pela Guilda e procurada por três reinos.',
    attrs: { FOR: 12, DES: 20, CON: 13, INT: 16, SAB: 14, CAR: 17 },
    skills: [
      { icon: '🗡', name: 'Golpe Furtivo', desc: '+8 de dano ao atacar de surpresa ou flanqueando.', cost: '2 Stamina' },
      { icon: '🌑', name: 'Passo das Sombras', desc: 'Torna-se invisível por 2 turnos.', cost: '3 Stamina' },
      { icon: '🔓', name: 'Mãos Ágeis', desc: 'Abre qualquer fechadura ou armadilha sem teste.', cost: 'Passiva' },
      { icon: '💨', name: 'Evasão', desc: 'Esquiva de ataques em área sem dano.', cost: 'Passiva' },
    ],
    equip: { weapon: 'Adagas Gêmeas de Ashenveil', armor: 'Couro das Sombras Reforçado', helm: '—', amulet: 'Amuleto da Invisibilidade', ring: 'Anel do Ladrão' },
    inv: [
      { icon: '🧪', name: 'Poção de Vida' }, { icon: '💨', name: 'Bomba de Fumaça' },
      { icon: '🔓', name: 'Kit de Ladrão' }, { icon: '💰', name: '88 Ouro' },
      { icon: '💎', name: 'Gema Roubada' }, { icon: '🧪', name: 'Poção de Agilidade' },
      { icon: '📜', name: 'Mapa da Guilda' },
    ],
  },
  sylien: {
    id: 'sylien', name: 'KAEL', class: 'PATRULHEIRO DO NORTE', level: 8,
    xp: 488, xpMax: 800, hp: 26, hpMax: 26, mp: 16, mpMax: 20,
    portraitClass: 'sylien-art', initial: 'K', rune: '🏹',
    lore: '"O norte não perdoa. Eu aprendi com ele."',
    desc: 'Guardião das fronteiras geladas do norte, Kael rastreia ameaças que nenhum outro ousaria enfrentar. Mestre em sobrevivência e combate à distância.',
    history: 'Kael passou dez anos patrulhando as fronteiras do norte, onde o frio mata mais rápido que qualquer inimigo. Viu criaturas que os livros não descrevem e sobreviveu a tempestades que apagaram aldeias inteiras. Quando as criaturas das sombras começaram a cruzar a fronteira em números nunca vistos, ele desceu ao sul para avisar — e descobriu que ninguém queria ouvir. Agora luta para provar o que viu.',
    attrs: { FOR: 15, DES: 18, CON: 14, INT: 13, SAB: 16, CAR: 11 },
    skills: [
      { icon: '🏹', name: 'Flecha do Norte', desc: 'Ataque à distância com +6 de dano em clima frio.', cost: '2 Stamina' },
      { icon: '🐺', name: 'Companheiro Lobo', desc: 'Invoca um lobo que ataca junto por 3 turnos.', cost: '3 Stamina' },
      { icon: '👁', name: 'Rastreador', desc: 'Detecta inimigos e armadilhas em 20m.', cost: 'Passiva' },
      { icon: '❄', name: 'Resistência ao Frio', desc: 'Imune a dano de gelo e efeitos de congelamento.', cost: 'Passiva' },
    ],
    equip: { weapon: 'Arco Longo do Norte', armor: 'Capa de Pele de Lobo', helm: '—', amulet: 'Amuleto da Fronteira', ring: 'Anel do Patrulheiro' },
    inv: [
      { icon: '🧪', name: 'Poção de Vida' }, { icon: '🏹', name: 'Flechas Glaciais' },
      { icon: '🌿', name: 'Erva do Norte' }, { icon: '💰', name: '40 Ouro' },
      { icon: '🗺', name: 'Mapa do Norte' }, { icon: '🧪', name: 'Antídoto' },
      { icon: '🪤', name: 'Armadilha de Caça' }, { icon: '🍖', name: 'Ração de Viagem' },
    ],
  },
  harley: {
    id: 'harley', name: 'DARIAN', class: 'CAVALEIRO AMALDIÇOADO', level: 7,
    xp: 280, xpMax: 700, hp: 24, hpMax: 24, mp: 22, mpMax: 24,
    portraitClass: 'harley-art', initial: 'D', rune: '💀',
    lore: '"Fui feito para servir a luz. A escuridão me escolheu primeiro."',
    desc: 'Outrora o mais nobre dos cavaleiros de Valdrak, Darian carrega uma maldição que corrói sua alma lentamente. Cada batalha o aproxima do abismo.',
    history: 'Darian era o campeão da Ordem da Luz Dourada, invicto em torneios e batalhas. Durante o Cerco de Valdrak, ele fez um pacto desesperado com uma entidade das sombras para salvar seus companheiros. Salvou todos — e perdeu a si mesmo. A maldição que carrega lhe dá poder sombrio mas consome sua humanidade a cada uso. Ele luta para encontrar uma cura antes que não reste nada do homem que foi.',
    attrs: { FOR: 17, DES: 13, CON: 15, INT: 12, SAB: 10, CAR: 16 },
    skills: [
      { icon: '⚔', name: 'Golpe Amaldiçoado', desc: 'Dano físico + 4 de dano sombrio.', cost: '2 Stamina' },
      { icon: '💀', name: 'Aura da Morte', desc: 'Inimigos próximos recebem -2 em todos os testes.', cost: '3 Mana' },
      { icon: '🛡', name: 'Escudo Sombrio', desc: 'Absorve 10 de dano convertendo em mana.', cost: '1 Mana' },
      { icon: '🌑', name: 'Toque da Maldição', desc: 'Aplica maldição que causa 3 de dano por turno por 4 turnos.', cost: '4 Mana' },
    ],
    equip: { weapon: 'Espada Amaldiçoada de Valdrak', armor: 'Armadura Negra da Ordem Caída', helm: 'Elmo do Cavaleiro Maldito', amulet: 'Amuleto do Pacto Sombrio', ring: 'Anel da Maldição' },
    inv: [
      { icon: '🧪', name: 'Poção de Vida' }, { icon: '💧', name: 'Poção de Mana' },
      { icon: '💀', name: 'Fragmento de Alma' }, { icon: '💰', name: '35 Ouro' },
      { icon: '📜', name: 'Contrato Sombrio' }, { icon: '🌑', name: 'Pedra da Maldição' },
    ],
  },
};

const ATTR_LABELS = { FOR: 'Força', DES: 'Destreza', CON: 'Constituição', INT: 'Inteligência', SAB: 'Sabedoria', CAR: 'Carisma' };

const Chars = (() => {
  let currentId = null;

  /* ── INIT ── */
  function init() {
    loadActiveFromStorage();
    updateTopbar();

    document.addEventListener('click', e => {
      const sw = document.getElementById('search-wrap');
      if (sw && sw.classList.contains('open') && !sw.contains(e.target)) sw.classList.remove('open');
    });
  }

  /* ── ACTIVE CHARACTER ── */
  function loadActiveFromStorage() {
    const saved = localStorage.getItem('cos_active_char') || 'kael';
    markActive(saved);
  }

  function markActive(id) {
    document.querySelectorAll('.char-active-crown').forEach(el => el.classList.remove('visible'));
    const crown = document.getElementById('crown-' + id);
    if (crown) crown.classList.add('visible');
    const badge = document.getElementById('active-badge-name');
    if (badge) badge.textContent = CHARS_DATA[id]?.name || id;
  }

  function setActive() {
    if (!currentId) return;
    localStorage.setItem('cos_active_char', currentId);

    // Sync with cos_game for home.js compatibility
    const game = (() => { try { return JSON.parse(localStorage.getItem('cos_game')) || {}; } catch(_) { return {}; } })();
    game.selectedCharId = currentId;
    if (!game.chars) game.chars = buildGameChars();
    localStorage.setItem('cos_game', JSON.stringify(game));

    markActive(currentId);
    updateTopbar();

    const btn = document.getElementById('sheet-set-active-btn');
    const lbl = document.getElementById('sheet-active-label');
    if (btn) btn.classList.add('hidden');
    if (lbl) lbl.classList.add('visible');
  }

  function buildGameChars() {
    return Object.values(CHARS_DATA).map(c => ({
      id: c.id, name: c.name, level: c.level, xp: c.xp, class: c.class
    }));
  }

  function updateTopbar() {
    const activeId = localStorage.getItem('cos_active_char') || 'kael';
    const c = CHARS_DATA[activeId];
    if (!c) return;
    const nameEl   = document.getElementById('topbar-name');
    const levelEl  = document.getElementById('topbar-level');
    const avatarEl = document.getElementById('topbar-avatar');
    if (nameEl)   nameEl.textContent   = c.name;
    if (levelEl)  levelEl.textContent  = c.level;
    if (avatarEl) avatarEl.textContent = c.initial;
  }

  /* ── OPEN SHEET ── */
  function openSheet(id) {
    const c = CHARS_DATA[id];
    if (!c) return;
    currentId = id;

    // Portrait
    const art = document.getElementById('sheet-portrait-art');
    art.className = 'sheet-portrait-art ' + c.portraitClass;
    document.getElementById('sheet-portrait-initial').textContent = c.initial;
    document.getElementById('sheet-portrait-rune').textContent    = c.rune;

    // Header info
    document.getElementById('sheet-class-tag').textContent = c.class;
    document.getElementById('sheet-name').textContent      = c.name;
    document.getElementById('sheet-level').textContent     = c.level;
    document.getElementById('sheet-lore').textContent      = c.lore;
    document.getElementById('sheet-desc').textContent      = c.desc;

    // Active button state
    const activeId = localStorage.getItem('cos_active_char') || 'kael';
    const btn = document.getElementById('sheet-set-active-btn');
    const lbl = document.getElementById('sheet-active-label');
    if (id === activeId) {
      btn.classList.add('hidden');
      lbl.classList.add('visible');
    } else {
      btn.classList.remove('hidden');
      lbl.classList.remove('visible');
    }

    // Overview bars
    const hpPct = Math.round((c.hp / c.hpMax) * 100);
    const mpPct = Math.round((c.mp / c.mpMax) * 100);
    const xpPct = Math.round((c.xp / c.xpMax) * 100);
    document.getElementById('ov-hp').style.width  = hpPct + '%';
    document.getElementById('ov-mp').style.width  = mpPct + '%';
    document.getElementById('ov-xp').style.width  = xpPct + '%';
    document.getElementById('ov-hp-val').textContent = c.hp + '/' + c.hpMax;
    document.getElementById('ov-mp-val').textContent = c.mp + '/' + c.mpMax;
    document.getElementById('ov-xp-val').textContent = c.xp + '/' + c.xpMax;

    // Sidebar stats
    document.getElementById('stat-hp').textContent = c.hp + '/' + c.hpMax;
    document.getElementById('stat-mp').textContent = c.mp + '/' + c.mpMax;
    document.getElementById('stat-xp').textContent = c.xp + '/' + c.xpMax;

    // Attributes
    const attrsList = document.getElementById('attrs-list');
    attrsList.innerHTML = '';
    Object.entries(c.attrs).forEach(([key, val]) => {
      const mod = Math.floor((val - 10) / 2);
      const modStr = (mod >= 0 ? '+' : '') + mod;
      const pct = Math.round((val / 20) * 100);
      attrsList.innerHTML += `
        <div class="attr-row">
          <span class="attr-label">${ATTR_LABELS[key]}</span>
          <span class="attr-val">${val}</span>
          <span class="attr-mod">${modStr}</span>
        </div>`;
    });

    // Skills tab
    const sg = document.getElementById('skills-grid');
    sg.innerHTML = c.skills.map(s => `
      <div class="skill-card">
        <span class="skill-card-icon">${s.icon}</span>
        <div class="skill-card-info">
          <span class="skill-card-name">${s.name}</span>
          <span class="skill-card-desc">${s.desc}</span>
          <span class="skill-card-cost">${s.cost}</span>
        </div>
      </div>`).join('');

    // Equip tab
    Object.entries(c.equip).forEach(([slot, item]) => {
      const el = document.getElementById('slot-' + slot);
      if (el) el.textContent = item;
    });

    // Inventory tab
    const ig = document.getElementById('inv-grid');
    const cells = [...c.inv];
    while (cells.length < 15) cells.push(null);
    ig.innerHTML = cells.map(item => item
      ? `<div class="inv-cell"><span class="inv-cell-icon">${item.icon}</span><span class="inv-cell-name">${item.name}</span></div>`
      : `<div class="inv-cell empty"><span class="inv-cell-icon" style="opacity:0.2">◻</span></div>`
    ).join('');

    // History tab
    document.getElementById('history-text').textContent = c.history;

    // Reset to first tab
    switchTab('overview', document.querySelector('.sheet-tab[data-tab="overview"]'));

    // Open overlay
    document.getElementById('sheet-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── CLOSE SHEET ── */
  function closeSheet(e, force) {
    if (!force && e && e.target !== document.getElementById('sheet-overlay')) return;
    document.getElementById('sheet-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── SWITCH TAB ── */
  function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.sheet-tab').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.remove('hidden');
    if (btn) btn.classList.add('active');
  }

  return { init, openSheet, closeSheet, switchTab, setActive };
})();

function toggleSearch() {
  const wrap = document.getElementById('search-wrap');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) {
    setTimeout(() => document.getElementById('topbar-search-input').focus(), 310);
  }
}

document.addEventListener('DOMContentLoaded', Chars.init);

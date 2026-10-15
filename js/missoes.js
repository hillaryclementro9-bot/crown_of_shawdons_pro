/* ============================================
   CROWN OF SHADOWS — missoes.js
   ============================================ */

const MISSIONS = [
  {
    id: 'sombras-vale',
    name: 'Sombras no Vale',
    type: 'principal',
    level: 20,
    icon: '🌑',
    img: '../assets/images/vale.jpeg',
    artClass: 'art-principal',
    desc: 'Uma escuridão sobrenatural avança pelo Vale de Valdrak. Aldeias inteiras desaparecem durante a noite e os sobreviventes falam de sombras que devoram almas.',
    history: 'O Vale de Valdrak foi outrora um lugar de paz e prosperidade. Há três semanas, uma névoa negra desceu das montanhas e com ela vieram criaturas que nunca foram vistas antes. O Conselho de Mireth enviou exploradores — nenhum voltou. Agora cabe à sua party descobrir a origem dessa escuridão antes que ela consuma o reino inteiro.',
    objectives: [
      { text: 'Investigue a névoa negra no Vale',    current: 1, total: 1,  done: true  },
      { text: 'Derrote os Espectros Guardiões',      current: 4, total: 8,  done: false },
      { text: 'Encontre o Altar das Sombras',        current: 0, total: 1,  done: false },
      { text: 'Destrua o Cristal da Escuridão',      current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '4.500 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '850 Ouro' },
      { icon: '💎', label: 'ITEM RARO',   val: 'Cristal Sombrio' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Guardião do Vale' },
      { icon: '📜', label: 'LORE',        val: 'Tomo das Sombras' },
      { icon: '🗡', label: 'ARMA',        val: 'Lâmina do Crepúsculo' },
    ],
    status: 'ativa',
  },
  {
    id: 'culto-sombras',
    name: 'O Culto das Sombras',
    type: 'principal',
    level: 22,
    icon: '💀',
    img: '../assets/images/sombras.jpeg',
    artClass: 'art-principal',
    desc: 'Informantes revelam a existência de um culto secreto que adora a entidade das trevas. Eles planejam um ritual que poderia abrir um portal para o plano sombrio.',
    history: 'Fragmentos de pergaminhos encontrados nas ruínas de Ashenveil revelam a existência da Ordem do Eclipse — um culto que existe há séculos nas sombras do reino. Seu líder, o Xamã Korroth, acredita que pode invocar a entidade primordial das trevas e usá-la para dominar o mundo dos vivos. O ritual está marcado para a próxima lua negra. Você tem sete dias.',
    objectives: [
      { text: 'Infiltre-se na sede do Culto',        current: 0, total: 1,  done: false },
      { text: 'Roube os pergaminhos do ritual',      current: 0, total: 3,  done: false },
      { text: 'Elimine os Sacerdotes do Eclipse',    current: 0, total: 5,  done: false },
      { text: 'Confronte o Xamã Korroth',            current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '6.000 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '1.200 Ouro' },
      { icon: '💎', label: 'ITEM ÉPICO',  val: 'Manto do Eclipse' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Destruidor do Culto' },
      { icon: '🔮', label: 'MAGIA',       val: 'Feitiço: Banimento' },
      { icon: '👑', label: 'TÍTULO',      val: 'Protetor do Reino' },
    ],
    status: 'disponivel',
  },
  {
    id: 'tesouro-perdido',
    name: 'Tesouro Perdido',
    type: 'secundaria',
    level: 15,
    icon: '💰',
    img: '../assets/images/tesouro.jpeg',
    artClass: 'art-secundaria',
    desc: 'Um mercador moribundo revelou a localização de um tesouro escondido nas Cavernas de Kharrak. Mas as cavernas estão infestadas de Goblins.',
    history: 'Décadas atrás, o lendário ladrão Silas Vane escondeu sua fortuna nas profundezas das Cavernas de Kharrak antes de ser capturado pela guarda real. Ele morreu na prisão sem revelar o esconderijo. Agora, um velho mercador que conhecia Silas está em seu leito de morte e quer que alguém recupere o tesouro antes que os Goblins o encontrem.',
    objectives: [
      { text: 'Derrote Goblins Guerreiros',          current: 3, total: 10, done: false },
      { text: 'Encontre o acampamento Goblin',       current: 1, total: 1,  done: true  },
      { text: 'Recupere o Mapa do Tesouro',          current: 0, total: 1,  done: false },
      { text: 'Abra o cofre de Silas Vane',          current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '2.200 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '500 Ouro' },
      { icon: '💎', label: 'ITEM INCOMUM',val: 'Anel de Silas' },
      { icon: '🗝', label: 'CHAVE',       val: 'Chave da Cripta' },
    ],
    status: 'ativa',
  },
  {
    id: 'criaturas-floresta',
    name: 'Criaturas da Floresta',
    type: 'secundaria',
    level: 18,
    icon: '🌲',
    img: '../assets/images/floresta.jpeg',
    artClass: 'art-secundaria',
    desc: 'A Floresta de Elarion está sendo corrompida por uma magia sombria. Criaturas que antes eram pacíficas tornaram-se agressivas e atacam viajantes.',
    history: 'A Druida Mira Thornwood enviou um pedido urgente de ajuda. A floresta sagrada de Elarion, que ela protege há quarenta anos, está sendo consumida por uma corrupção mágica que se espalha a partir de uma fonte desconhecida no coração da floresta. Os animais estão enlouquecendo e as árvores milenares estão morrendo. Se a corrupção não for detida em breve, toda a floresta será perdida.',
    objectives: [
      { text: 'Fale com a Druida Mira',              current: 1, total: 1,  done: true  },
      { text: 'Elimine Lobos Corrompidos',           current: 2, total: 6,  done: false },
      { text: 'Encontre a Fonte da Corrupção',       current: 0, total: 1,  done: false },
      { text: 'Purifique o Altar da Floresta',       current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '3.100 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '420 Ouro' },
      { icon: '🌿', label: 'ITEM RARO',   val: 'Essência da Floresta' },
      { icon: '🏹', label: 'ARMA',        val: 'Arco de Elarion' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Protetor da Floresta' },
    ],
    status: 'disponivel',
  },
  {
    id: 'reliquias-mireth',
    name: 'Relíquias de Mireth',
    type: 'secundaria',
    level: 16,
    icon: '📖',
    img: '../assets/images/miret.jpeg',
    artClass: 'art-secundaria',
    desc: 'Três relíquias sagradas da Torre Arcana de Mireth foram roubadas por saqueadores. Recupere-as antes que caiam em mãos erradas.',
    history: 'Quando a Torre Arcana de Mireth foi destruída, saqueadores aproveitaram o caos para roubar artefatos de imenso poder. Três relíquias em particular são extremamente perigosas nas mãos erradas: o Orbe da Visão, o Grimório Proibido e o Amuleto do Arquimago. Sylien identificou os saqueadores e sabe onde estão escondidos.',
    objectives: [
      { text: 'Recupere o Orbe da Visão',            current: 1, total: 1,  done: true  },
      { text: 'Recupere o Grimório Proibido',        current: 1, total: 1,  done: true  },
      { text: 'Recupere o Amuleto do Arquimago',     current: 0, total: 1,  done: false },
      { text: 'Retorne as relíquias a Sylien',       current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '2.800 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '380 Ouro' },
      { icon: '🔮', label: 'MAGIA',       val: 'Feitiço: Visão Arcana' },
      { icon: '📿', label: 'AMULETO',     val: 'Amuleto do Arquimago' },
    ],
    status: 'disponivel',
  },
  {
    id: 'dragao-valdrak',
    name: 'O Dragão de Valdrak',
    type: 'principal',
    level: 25,
    icon: '🐉',
    img: '../assets/images/vadrak.jpeg',
    artClass: 'art-principal',
    desc: 'O lendário Dragão Valdrak despertou de seu sono milenar e ameaça destruir a capital do reino. Apenas os mais corajosos ousam enfrentá-lo.',
    history: 'Nas lendas do reino, o Dragão Valdrak é descrito como uma força da natureza — uma criatura tão antiga quanto as próprias montanhas. Por séculos ele dormiu nas profundezas do Monte Kharrak. Algo o despertou. Agora ele voa sobre o reino, destruindo tudo que encontra. O Rei oferece uma recompensa sem precedentes para quem conseguir detê-lo — vivo ou morto.',
    objectives: [
      { text: 'Localize o covil do Dragão',          current: 0, total: 1,  done: false },
      { text: 'Colete escamas de Dragão Menor',      current: 0, total: 5,  done: false },
      { text: 'Forje a Lança do Dragão',             current: 0, total: 1,  done: false },
      { text: 'Enfrente Valdrak',                    current: 0, total: 1,  done: false },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '10.000 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '3.000 Ouro' },
      { icon: '🐉', label: 'ITEM LENDÁRIO',val: 'Escama de Valdrak' },
      { icon: '👑', label: 'TÍTULO',      val: 'Matador de Dragões' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Lenda do Reino' },
      { icon: '⚔', label: 'ARMA LENDÁRIA',val: 'Lança do Dragão' },
    ],
    status: 'disponivel',
  },
  {
    id: 'primeira-batalha',
    name: 'A Primeira Batalha',
    type: 'principal',
    level: 5,
    icon: '⚔',
    artClass: 'art-concluida',
    desc: 'A missão que uniu a party pela primeira vez. Um ataque Goblin a uma aldeia indefesa foi o início de tudo.',
    history: 'Foi numa noite fria de outono que os caminhos de Kael, Lunara, Tharok, Sylien e Harley se cruzaram pela primeira vez. Uma aldeia estava sendo atacada por uma horda de Goblins liderada pelo cruel Chefe Grax. Sem se conhecerem, os cinco heróis lutaram lado a lado e descobriram que juntos eram invencíveis.',
    objectives: [
      { text: 'Proteja os aldeões',                  current: 1, total: 1,  done: true  },
      { text: 'Derrote a horda de Goblins',          current: 15, total: 15, done: true },
      { text: 'Elimine o Chefe Grax',                current: 1, total: 1,  done: true  },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '800 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '150 Ouro' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Primeiros Passos' },
    ],
    status: 'concluida',
  },
  {
    id: 'minas-kharrak',
    name: 'As Minas de Kharrak',
    type: 'secundaria',
    level: 10,
    icon: '⛏',
    artClass: 'art-concluida',
    desc: 'Mineiros desapareceram nas profundezas das Minas de Kharrak. A party foi contratada para investigar e resgatar os sobreviventes.',
    history: 'As Minas de Kharrak são famosas por seus minérios raros, mas também por seus perigos. Quando doze mineiros desapareceram sem deixar rastro, a Guilda dos Mineiros contratou a party para investigar. O que encontraram nas profundezas foi um ninho de Aranhas Gigantes e um portal dimensional que ninguém sabia que existia.',
    objectives: [
      { text: 'Investigue as minas',                 current: 1, total: 1,  done: true  },
      { text: 'Resgate os mineiros',                 current: 8, total: 8,  done: true  },
      { text: 'Destrua o ninho de Aranhas',          current: 1, total: 1,  done: true  },
      { text: 'Sele o portal dimensional',           current: 1, total: 1,  done: true  },
    ],
    rewards: [
      { icon: '⭐', label: 'EXPERIÊNCIA', val: '1.800 XP' },
      { icon: '💰', label: 'MOEDAS',      val: '300 Ouro' },
      { icon: '⛏', label: 'ITEM',        val: 'Picareta Rúnica' },
      { icon: '🏆', label: 'CONQUISTA',   val: 'Resgatador' },
    ],
    status: 'concluida',
  },
];

/* ── STORAGE KEY ── */
const STORAGE_KEY = 'cos_missions_state';

/* ── CONTROLLER ── */
const Missions = (() => {
  let currentFilter = 'principal';
  let selectedId    = null;
  let state         = {};   // { [id]: { status, objectives: [{current}] } }

  /* ── INIT ── */
  function init() {
    loadState();
    syncTopbar();
    renderList();
    // Select first visible mission automatically
    const first = MISSIONS.find(m => m.type === currentFilter || (currentFilter === 'concluida' && m.status === 'concluida'));
    if (first) select(first.id);

    document.addEventListener('click', e => {
      const sw = document.getElementById('search-wrap');
      if (sw && sw.classList.contains('open') && !sw.contains(e.target)) sw.classList.remove('open');
    });
  }

  function loadState() {
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(_) { state = {}; }
    // Merge defaults
    MISSIONS.forEach(m => {
      if (!state[m.id]) {
        state[m.id] = {
          status: m.status,
          objectives: m.objectives.map(o => ({ current: o.current, done: o.done })),
        };
      }
    });
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getMission(id) {
    const m = MISSIONS.find(x => x.id === id);
    if (!m) return null;
    const s = state[id];
    return {
      ...m,
      status: s.status,
      objectives: m.objectives.map((o, i) => ({
        ...o,
        current: s.objectives[i]?.current ?? o.current,
        done:    s.objectives[i]?.done    ?? o.done,
      })),
    };
  }

  /* ── FILTER ── */
  function filter(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.m-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderList();
    // Auto-select first
    const visible = getVisible();
    if (visible.length > 0) select(visible[0].id);
    else clearDetail();
  }

  function getVisible() {
    if (currentFilter === 'concluida') return MISSIONS.filter(m => state[m.id]?.status === 'concluida');
    return MISSIONS.filter(m => m.type === currentFilter && state[m.id]?.status !== 'concluida');
  }

  /* ── RENDER LIST ── */
  function renderList() {
    const container = document.getElementById('missions-list');
    const visible   = getVisible();

    if (visible.length === 0) {
      container.innerHTML = `<div class="missions-empty">
        <span class="missions-empty-icon">📜</span>
        <span class="missions-empty-text">NENHUMA MISSÃO ENCONTRADA</span>
      </div>`;
      return;
    }

    container.innerHTML = visible.map(m => {
      const s       = state[m.id];
      const status  = s.status;
      const pillCls = status === 'ativa' ? 'pill-ativa' : status === 'concluida' ? 'pill-concluida' : 'pill-disponivel';
      const pillTxt = status === 'ativa' ? 'ATIVA' : status === 'concluida' ? 'CONCLUÍDA' : 'DISPONÍVEL';
      const typeCls = m.type === 'principal' ? 'type-principal' : m.type === 'secundaria' ? 'type-secundaria' : 'type-concluida';
      const typeTxt = m.type === 'principal' ? 'Missão Principal' : m.type === 'secundaria' ? 'Missão Secundária' : 'Concluída';
      const thumbCls= m.type === 'principal' ? 'thumb-principal' : m.type === 'secundaria' ? 'thumb-secundaria' : 'thumb-concluida';
      const isSelected = selectedId === m.id ? 'selected' : '';
      const isAtiva    = status === 'ativa' ? 'ativa' : '';

      return `<div class="mission-item ${isSelected} ${isAtiva} ${status}" data-id="${m.id}" onclick="Missions.select('${m.id}')">
        <div class="mission-thumb ${thumbCls}">
          ${m.img ? `<img src="${m.img}" alt="${m.name}" class="mission-thumb-img" onerror="this.style.display='none'" />` : ''}
          <span class="mission-thumb-fallback" style="${m.img ? 'display:none' : ''}">${m.icon}</span>
        </div>
        <div class="mission-info">
          <div class="mission-item-name">${m.name}</div>
          <div class="mission-item-type ${typeCls}">${typeTxt}</div>
          <div class="mission-item-level">Nv. recomendado: ${m.level}</div>
        </div>
        <span class="mission-status-pill ${pillCls}">${pillTxt}</span>
        <div class="mission-active-dot"></div>
      </div>`;
    }).join('');
  }

  /* ── SELECT ── */
  function select(id) {
    selectedId = id;
    // Update selected class in list
    document.querySelectorAll('.mission-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.id === id);
    });
    renderDetail(id);
  }

  /* ── RENDER DETAIL ── */
  function renderDetail(id) {
    const m = getMission(id);
    if (!m) return;

    document.getElementById('detail-empty').classList.add('hidden');
    const detail = document.getElementById('mission-detail');
    detail.classList.remove('hidden');

    // Art
    const art = document.getElementById('detail-img-art');
    art.className = 'detail-img-art ' + m.artClass;
    art.style.backgroundImage = m.img ? `url('${m.img}')` : '';
    art.style.backgroundSize = 'cover';
    art.style.backgroundPosition = 'center';
    const iconEl = document.getElementById('detail-img-icon');
    iconEl.textContent = m.img ? '' : m.icon;

    // Badges
    const typeTxt = m.type === 'principal' ? 'PRINCIPAL' : m.type === 'secundaria' ? 'SECUNDÁRIA' : 'CONCLUÍDA';
    document.getElementById('detail-type-badge').textContent  = typeTxt;
    document.getElementById('detail-level-badge').textContent = 'Nv. ' + m.level;
    const statusBadge = document.getElementById('detail-status-badge');
    const statusTxt   = m.status === 'ativa' ? 'ATIVA' : m.status === 'concluida' ? 'CONCLUÍDA' : 'DISPONÍVEL';
    statusBadge.textContent = statusTxt;
    statusBadge.className   = 'detail-status-badge ' + m.status;

    // Text
    document.getElementById('detail-name').textContent    = m.name;
    document.getElementById('detail-desc').textContent    = m.desc;
    document.getElementById('detail-history').textContent = m.history;

    // Objectives
    const objEl = document.getElementById('detail-objectives');
    objEl.innerHTML = m.objectives.map(o => {
      const pct     = o.total > 0 ? Math.round((o.current / o.total) * 100) : 0;
      const isDone  = o.done || o.current >= o.total;
      const progTxt = isDone ? '✓' : `${o.current} / ${o.total}`;
      return `<div class="obj-row ${isDone ? 'done' : ''}">
        <span class="obj-icon">${isDone ? '✅' : '🎯'}</span>
        <span class="obj-text">${o.text}</span>
        ${!isDone ? `<div class="obj-bar-wrap"><div class="obj-bar-fill" style="width:${pct}%"></div></div>` : ''}
        <span class="obj-progress">${progTxt}</span>
      </div>`;
    }).join('');

    // Rewards
    const rewEl = document.getElementById('detail-rewards');
    rewEl.innerHTML = m.rewards.map(r => `
      <div class="reward-item">
        <span class="reward-icon">${r.icon}</span>
        <span class="reward-label">${r.label}</span>
        <span class="reward-val">${r.val}</span>
      </div>`).join('');

    // Button
    const btn     = document.getElementById('accept-btn');
    const btnText = document.getElementById('accept-btn-text');
    btn.className = 'accept-btn';
    btn.disabled  = false;
    if (m.status === 'concluida') {
      btnText.textContent = '✓ MISSÃO CONCLUÍDA';
      btn.classList.add('done-state');
      btn.disabled = true;
    } else if (m.status === 'ativa') {
      btnText.textContent = '⚔ MISSÃO ATIVA';
      btn.classList.add('active-state');
      btn.disabled = true;
    } else {
      btnText.textContent = 'ACEITAR MISSÃO';
    }
  }

  /* ── ACCEPT ── */
  function accept() {
    if (!selectedId) return;
    const s = state[selectedId];
    if (!s || s.status !== 'disponivel') return;
    s.status = 'ativa';
    saveState();
    renderList();
    renderDetail(selectedId);
  }

  /* ── CLEAR DETAIL ── */
  function clearDetail() {
    selectedId = null;
    document.getElementById('detail-empty').classList.remove('hidden');
    document.getElementById('mission-detail').classList.add('hidden');
  }

  /* ── TOPBAR SYNC ── */
  function syncTopbar() {
    const CHAR_MAP = {
      kael:   { name: 'Kael',   initial: 'K', level: 8 },
      lunara: { name: 'Lunara', initial: 'L', level: 7 },
      tharok: { name: 'Tharok', initial: 'T', level: 9 },
      sylien: { name: 'Sylien', initial: 'S', level: 8 },
      harley: { name: 'Harley', initial: 'H', level: 7 },
    };
    const activeId   = localStorage.getItem('cos_active_char') || 'kael';
    const c          = CHAR_MAP[activeId] || CHAR_MAP['kael'];
    const nameEl     = document.getElementById('topbar-name');
    const levelEl    = document.getElementById('topbar-level');
    const avatarEl   = document.getElementById('topbar-avatar');
    if (nameEl)   nameEl.textContent   = c.name;
    if (levelEl)  levelEl.textContent  = c.level;
    if (avatarEl) avatarEl.textContent = c.initial;
  }

  return { init, filter, select, accept };
})();

function toggleSearch() {
  const wrap = document.getElementById('search-wrap');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) {
    setTimeout(() => document.getElementById('topbar-search-input').focus(), 310);
  }
}

document.addEventListener('DOMContentLoaded', Missions.init);

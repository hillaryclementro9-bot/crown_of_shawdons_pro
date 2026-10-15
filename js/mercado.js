/* ============================================
   CROWN OF SHADOWS — mercado.js
   ============================================ */

const PRODUCTS = [
  { id:1,  name:'Espada Sombria',          cat:'arma',     rarity:'raro',     price:2500, icon:'⚔',  img:null,
    desc:'Forjada nas profundezas de Ashenveil, esta espada absorve a luz ao redor, tornando seus golpes mais difíceis de prever.',
    attrs:['+12 Dano','Ignora 3 Armadura','Dano Sombrio: +4'] },
  { id:2,  name:'Arco da Lua',             cat:'arma',     rarity:'epico',    price:3800, icon:'🏹', img:null,
    desc:'Esculpido de um galho da Árvore Lunar de Elarion. Suas flechas brilham com luz prateada e causam dano adicional a criaturas das trevas.',
    attrs:['+15 Dano','Alcance: 40m','Anti-Trevas: +8'] },
  { id:3,  name:'Armadura do Viajante',    cat:'armadura', rarity:'incomum',  price:1200, icon:'🛡', img:null,
    desc:'Armadura leve e resistente, ideal para aventureiros que precisam de mobilidade sem abrir mão de proteção básica.',
    attrs:['+8 Armadura','Mobilidade: +2','Resistência ao Frio'] },
  { id:4,  name:'Poção de Cura Maior',     cat:'pocao',    rarity:'comum',    price:300,  icon:'🧪', img:null,
    desc:'Restaura 50 pontos de vida instantaneamente. Feita com ervas raras da Floresta de Elarion e água benta.',
    attrs:['Cura: +50 HP','Instantânea','Sem efeitos colaterais'] },
  { id:5,  name:'Capa das Sombras',        cat:'armadura', rarity:'lendario', price:5000, icon:'🌑', img:null,
    desc:'Tecida com fios de escuridão pura, esta capa torna o usuário quase invisível nas sombras. Pertenceu ao lendário ladrão Silas Vane.',
    attrs:['+6 Armadura','Furtividade: +10','Invisibilidade nas Sombras'] },
  { id:6,  name:'Anel do Vigia',           cat:'item',     rarity:'epico',    price:4200, icon:'💍', img:null,
    desc:'Um anel com um olho gravado que nunca fecha. O portador não pode ser surpreendido e enxerga criaturas invisíveis em 15m.',
    attrs:['Visão Verdadeira: 15m','Imune a Surpresa','Percepção: +5'] },
  { id:7,  name:'Pergaminho de Teleporte', cat:'item',     rarity:'raro',     price:2000, icon:'📜', img:null,
    desc:'Permite ao usuário se teletransportar instantaneamente para qualquer local já visitado. Uso único.',
    attrs:['Teleporte Instantâneo','Uso Único','Alcance: Ilimitado'] },
  { id:8,  name:'Cristal de Mana',         cat:'material', rarity:'incomum',  price:800,  icon:'💎', img:null,
    desc:'Cristal imbuído de energia arcana pura. Usado na criação de itens mágicos ou pode ser consumido para restaurar 30 pontos de mana.',
    attrs:['Restaura: +30 Mana','Material de Crafting','Energia Arcana'] },
  { id:9,  name:'Machado de Guerra Rúnico',cat:'arma',     rarity:'raro',     price:2800, icon:'🪓', img:null,
    desc:'Machado de guerra com runas antigas gravadas na lâmina. As runas brilham em vermelho ao detectar inimigos próximos.',
    attrs:['+14 Dano','Detecção de Inimigos: 10m','Dano de Área: 2m'] },
  { id:10, name:'Elmo do Cavaleiro Caído', cat:'armadura', rarity:'raro',     price:1800, icon:'⛑', img:null,
    desc:'Elmo de um cavaleiro que caiu em batalha contra as trevas. Sua alma ainda protege quem o usa, concedendo resistência a maldições.',
    attrs:['+5 Armadura','Resistência a Maldições','Visão Noturna'] },
  { id:11, name:'Poção de Força',          cat:'pocao',    rarity:'incomum',  price:450,  icon:'💪', img:null,
    desc:'Aumenta a Força do usuário em 4 pontos por 3 turnos. Sabor terrível, efeito garantido.',
    attrs:['Força: +4 por 3 turnos','Dano Físico: +6','Duração: 3 turnos'] },
  { id:12, name:'Grimório de Feitiços',    cat:'item',     rarity:'epico',    price:3500, icon:'📖', img:null,
    desc:'Contém feitiços avançados coletados pelos Guardiões de Mireth. Permite aprender 3 novos feitiços de qualquer escola mágica.',
    attrs:['Aprende 3 Feitiços','Qualquer Escola','Bônus de Inteligência: +2'] },
  { id:13, name:'Escamas de Dragão',       cat:'material', rarity:'lendario', price:8000, icon:'🐉', img:null,
    desc:'Escamas do lendário Dragão Valdrak. Material mais resistente conhecido. Necessário para forjar armaduras lendárias.',
    attrs:['Material Lendário','Resistência ao Fogo','Crafting: Armadura Lendária'] },
  { id:14, name:'Amuleto de Proteção',     cat:'item',     rarity:'comum',    price:250,  icon:'📿', img:null,
    desc:'Amuleto básico de proteção contra magia. Concede pequena resistência a feitiços e maldições.',
    attrs:['Resistência Mágica: +2','Proteção contra Maldições'] },
  { id:15, name:'Poção de Invisibilidade', cat:'pocao',    rarity:'raro',     price:1500, icon:'👻', img:null,
    desc:'Torna o usuário completamente invisível por 2 turnos. Qualquer ataque ou ação ofensiva quebra o efeito.',
    attrs:['Invisibilidade: 2 turnos','Quebra ao Atacar','Furtividade: +15'] },
  { id:16, name:'Cajado Arcano',           cat:'arma',     rarity:'epico',    price:4500, icon:'🪄', img:null,
    desc:'Cajado imbuído com cristais de mana de alta pureza. Amplifica todos os feitiços lançados e reduz o custo de mana.',
    attrs:['+10 Dano Mágico','Mana: -2 por feitiço','Amplificação: +20%'] },
  { id:17, name:'Pó de Fada',             cat:'material', rarity:'incomum',  price:600,  icon:'✨', img:null,
    desc:'Pó coletado das asas de fadas da Floresta de Elarion. Ingrediente essencial em poções de cura avançadas.',
    attrs:['Material de Crafting','Encantamento: +1','Brilho Mágico'] },
  { id:18, name:'Coroa das Sombras (Réplica)', cat:'item', rarity:'lendario', price:9999, icon:'👑', img:null,
    desc:'Uma réplica perfeita da lendária Coroa das Sombras. Não possui o poder do original, mas concede prestígio e pequenos bônus mágicos.',
    attrs:['Prestígio: Máximo','Carisma: +5','Resistência Sombria: +10'] },
];

const RARITY_ORDER = { comum:0, incomum:1, raro:2, epico:3, lendario:4 };
const RARITY_LABELS = { comum:'COMUM', incomum:'INCOMUM', raro:'RARO', epico:'ÉPICO', lendario:'LENDÁRIO' };
const STORAGE_KEY = 'cos_market';

const Market = (() => {
  let balance     = 5000;
  let cart        = [];
  let currentCat  = 'todos';
  let modalItemId = null;

  /* ── INIT ── */
  function init() {
    loadState();
    syncTopbar();
    applyFilters();
    renderCart();
    updateBalance();

    document.addEventListener('click', e => {
      const sw = document.getElementById('search-wrap');
      if (sw && sw.classList.contains('open') && !sw.contains(e.target)) sw.classList.remove('open');
    });
  }

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (s) { balance = s.balance ?? 5000; cart = s.cart ?? []; }
    } catch(_) {}
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ balance, cart }));
  }

  /* ── TOPBAR ── */
  function syncTopbar() {
    const MAP = { kael:{name:'Kael',initial:'K',level:8}, lunara:{name:'Lunara',initial:'L',level:7}, tharok:{name:'Tharok',initial:'T',level:9}, sylien:{name:'Sylien',initial:'S',level:8}, harley:{name:'Harley',initial:'H',level:7} };
    const id = localStorage.getItem('cos_active_char') || 'kael';
    const c  = MAP[id] || MAP['kael'];
    const n = document.getElementById('topbar-name');
    const l = document.getElementById('topbar-level');
    const a = document.getElementById('topbar-avatar');
    if (n) n.textContent = c.name;
    if (l) l.textContent = c.level;
    if (a) a.textContent = c.initial;
  }

  /* ── CATEGORY ── */
  function setCategory(cat, btn) {
    currentCat = cat;
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    applyFilters();
  }

  /* ── FILTERS ── */
  function applyFilters() {
    const search   = (document.getElementById('filter-search')?.value || '').toLowerCase();
    const priceMin = parseFloat(document.getElementById('price-min')?.value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max')?.value) || 99999;
    const sortVal  = document.getElementById('sort-select')?.value || 'name';

    const checkedRarity = [...document.querySelectorAll('#filter-rarity input:checked')].map(i => i.value);
    const checkedCat    = [...document.querySelectorAll('#filter-cat input:checked')].map(i => i.value);

    let filtered = PRODUCTS.filter(p => {
      if (currentCat !== 'todos' && currentCat !== 'lendario' && p.cat !== currentCat) return false;
      if (currentCat === 'lendario' && p.rarity !== 'lendario') return false;
      if (!checkedRarity.includes(p.rarity)) return false;
      if (!checkedCat.includes(p.cat)) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (search && !p.name.toLowerCase().includes(search)) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortVal === 'price-asc')  return a.price - b.price;
      if (sortVal === 'price-desc') return b.price - a.price;
      if (sortVal === 'rarity')     return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
      return a.name.localeCompare(b.name);
    });

    renderGrid(filtered);
  }

  function onSlider(el) {
    const val = parseInt(el.value);
    document.getElementById('price-max').value = val;
    document.getElementById('slider-max-label').textContent = val >= 10000 ? '10.000+' : val.toLocaleString('pt-BR');
    applyFilters();
  }

  function resetFilters() {
    document.getElementById('filter-search').value = '';
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 99999;
    document.getElementById('price-slider').value = 10000;
    document.getElementById('slider-max-label').textContent = '10.000+';
    document.querySelectorAll('#filter-rarity input, #filter-cat input').forEach(i => i.checked = true);
    applyFilters();
  }

  /* ── BRASÕES POR CATEGORIA ── */
  const BRASOES = {
    arma: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#0a0a0a" stroke="#333" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#555" stroke-width="1" opacity="0.6"/><line x1="32" y1="18" x2="32" y2="52" stroke="#aaa" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="28" x2="40" y2="28" stroke="#aaa" stroke-width="2" stroke-linecap="round"/><path d="M30 18 L32 14 L34 18" fill="#aaa"/></svg>`,
    armadura: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#1a0000" stroke="#8b0000" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#c00" stroke-width="1" opacity="0.5"/><path d="M20 22 L44 22 L44 26 C44 26 40 28 32 28 C24 28 20 26 20 26 Z" fill="#c00" opacity="0.8"/><path d="M20 26 L20 46 C20 54 32 60 32 60 C32 60 44 54 44 46 L44 26 C40 28 32 29 24 28 Z" fill="none" stroke="#c00" stroke-width="1.5"/><line x1="32" y1="28" x2="32" y2="58" stroke="#c00" stroke-width="1" opacity="0.5"/><line x1="20" y1="38" x2="44" y2="38" stroke="#c00" stroke-width="1" opacity="0.5"/></svg>`,
    pocao: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#001a00" stroke="#006622" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#00aa44" stroke-width="1" opacity="0.5"/><path d="M28 18 L28 26 L22 36 C20 40 20 46 24 50 C26 52 29 54 32 54 C35 54 38 52 40 50 C44 46 44 40 42 36 L36 26 L36 18 Z" fill="none" stroke="#00cc55" stroke-width="1.5"/><rect x="27" y="16" width="10" height="4" rx="1" fill="#00aa44"/><circle cx="32" cy="42" r="6" fill="#00cc55" opacity="0.4"/><path d="M29 42 Q32 38 35 42" stroke="#00ff66" stroke-width="1" fill="none"/></svg>`,
    item: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#c9a84c" stroke="#a07828" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#fff" stroke-width="1" opacity="0.4"/><circle cx="32" cy="36" r="10" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M32 26 L34 32 L40 32 L35 36 L37 42 L32 38 L27 42 L29 36 L24 32 L30 32 Z" fill="#fff" opacity="0.9"/></svg>`,
    material: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#0d0020" stroke="#4b0082" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#7b00cc" stroke-width="1" opacity="0.5"/><path d="M32 22 L38 30 L36 40 L32 44 L28 40 L26 30 Z" fill="none" stroke="#9b30ff" stroke-width="1.5"/><line x1="32" y1="22" x2="32" y2="44" stroke="#9b30ff" stroke-width="1" opacity="0.6"/><line x1="26" y1="30" x2="38" y2="30" stroke="#9b30ff" stroke-width="1" opacity="0.6"/><line x1="26" y1="40" x2="38" y2="40" stroke="#9b30ff" stroke-width="1" opacity="0.6"/><circle cx="32" cy="33" r="3" fill="#9b30ff" opacity="0.7"/></svg>`,
    lendario: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#f5f5f5" stroke="#bbb" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#999" stroke-width="1" opacity="0.5"/><path d="M32 20 L35 29 L44 29 L37 35 L40 44 L32 38 L24 44 L27 35 L20 29 L29 29 Z" fill="none" stroke="#555" stroke-width="1.5"/><circle cx="32" cy="34" r="4" fill="#888" opacity="0.5"/></svg>`,
    default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" fill="none"><path d="M32 4 L58 14 L58 38 C58 56 32 76 32 76 C32 76 6 56 6 38 L6 14 Z" fill="#1a0a00" stroke="#c8a84b" stroke-width="2"/><path d="M32 12 L50 20 L50 38 C50 52 32 68 32 68 C32 68 14 52 14 38 L14 20 Z" fill="none" stroke="#c8a84b" stroke-width="1" opacity="0.5"/><circle cx="32" cy="34" r="8" fill="none" stroke="#c8a84b" stroke-width="1.5"/><path d="M28 34 L32 28 L36 34 L32 40 Z" fill="#c8a84b" opacity="0.8"/></svg>`
  };

  function getBrasao(cat) { return BRASOES[cat] || BRASOES.default; }

  function renderGrid(items) {
    const grid = document.getElementById('products-grid');
    document.getElementById('products-count').textContent = items.length + ' ' + (items.length === 1 ? 'item' : 'itens');

    if (items.length === 0) {
      grid.innerHTML = `<div class="products-empty"><span class="products-empty-icon">${getBrasao('default')}</span><span class="products-empty-text">NENHUM ITEM ENCONTRADO</span></div>`;
      return;
    }

    grid.innerHTML = items.map(p => {
      const rLabel = RARITY_LABELS[p.rarity] || p.rarity.toUpperCase();
      const brasao = getBrasao(p.cat);
      return `
        <div class="prod-card rarity-${p.rarity}" onclick="Market.openModal(${p.id})">
          <div class="prod-card-art art-${p.cat}">
            <span class="prod-card-art-icon">${brasao}</span>
            <div class="prod-card-art-vignette"></div>
          </div>
          <div class="prod-card-body">
            <span class="prod-rarity-tag tag-${p.rarity}">${rLabel}</span>
            <span class="prod-name">${p.name}</span>
            <div class="prod-price-row">
              <span class="prod-price-icon">💰</span>
              <span class="prod-price">${p.price.toLocaleString('pt-BR')}</span>
              <span class="prod-price-unit">moedas</span>
            </div>
          </div>
          <button class="prod-cart-icon-btn" onclick="event.stopPropagation(); Market.addToCart(${p.id})" title="Adicionar ao carrinho">${brasao}</button>
        </div>`;
    }).join('');
  }

  /* ── MODAL ── */
  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    modalItemId = id;

    const art = document.getElementById('prod-modal-art');
    art.className = 'prod-modal-art art-' + p.cat;
    document.getElementById('prod-modal-icon').innerHTML = getBrasao(p.cat);

    const rLabel = RARITY_LABELS[p.rarity] || p.rarity.toUpperCase();
    const rEl = document.getElementById('prod-modal-rarity');
    rEl.textContent  = rLabel;
    rEl.className    = 'prod-modal-rarity tag-' + p.rarity;

    document.getElementById('prod-modal-name').textContent  = p.name;
    document.getElementById('prod-modal-desc').textContent  = p.desc;
    document.getElementById('prod-modal-price').textContent = p.price.toLocaleString('pt-BR');

    const attrsEl = document.getElementById('prod-modal-attrs');
    attrsEl.innerHTML = (p.attrs || []).map(a => `<span class="prod-attr">${a}</span>`).join('');

    const buyBtn = document.getElementById('prod-buy-btn');
    buyBtn.disabled = balance < p.price;

    document.getElementById('prod-modal-feedback').textContent = '';
    document.getElementById('prod-modal-feedback').className   = 'prod-modal-feedback';

    document.getElementById('prod-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(e, force) {
    if (!force && e && e.target !== document.getElementById('prod-overlay')) return;
    document.getElementById('prod-overlay').classList.remove('open');
    document.body.style.overflow = '';
    modalItemId = null;
  }

  /* ── BUY NOW ── */
  function buyNow() {
    const p = PRODUCTS.find(x => x.id === modalItemId);
    if (!p) return;
    if (balance < p.price) {
      showFeedback('Saldo insuficiente!', false);
      return;
    }
    balance -= p.price;
    saveState();
    updateBalance();
    showFeedback('✓ Comprado! ' + p.name, true);
    showToast('✓ ' + p.name + ' comprado com sucesso!');
    document.getElementById('prod-buy-btn').disabled = balance < p.price;
  }

  /* ── ADD TO CART ── */
  function addToCart(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const existing = cart.find(c => c.id === id);
    if (existing) { existing.qty++; }
    else { cart.push({ id, qty: 1 }); }
    saveState();
    renderCart();
    showToast('🛒 ' + p.name + ' adicionado ao carrinho');
  }

  function addToCartFromModal() {
    if (modalItemId) addToCart(modalItemId);
  }

  /* ── CART ── */
  function toggleCart() {
    document.getElementById('cart-overlay').classList.toggle('open');
  }

  function closeCartOverlay(e) {
    if (e.target === document.getElementById('cart-overlay')) toggleCart();
  }

  function renderCart() {
    const itemsEl   = document.getElementById('cart-items');
    const emptyEl   = document.getElementById('cart-empty');
    const countEl   = document.getElementById('cart-count');
    const totalEl   = document.getElementById('cart-total-val');
    const balanceEl = document.getElementById('cart-balance-val');
    const checkBtn  = document.getElementById('cart-checkout-btn');

    const totalQty   = cart.reduce((s, c) => s + c.qty, 0);
    const totalPrice = cart.reduce((s, c) => {
      const p = PRODUCTS.find(x => x.id === c.id);
      return s + (p ? p.price * c.qty : 0);
    }, 0);

    countEl.textContent   = totalQty;
    totalEl.textContent   = totalPrice.toLocaleString('pt-BR') + ' moedas';
    balanceEl.textContent = balance.toLocaleString('pt-BR') + ' moedas';
    if (checkBtn) checkBtn.disabled = cart.length === 0 || balance < totalPrice;

    if (cart.length === 0) {
      emptyEl.style.display = 'flex';
      // Remove all cart items except empty
      [...itemsEl.querySelectorAll('.cart-item')].forEach(el => el.remove());
      return;
    }
    emptyEl.style.display = 'none';

    // Rebuild
    [...itemsEl.querySelectorAll('.cart-item')].forEach(el => el.remove());
    cart.forEach(c => {
      const p = PRODUCTS.find(x => x.id === c.id);
      if (!p) return;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.dataset.id = c.id;
      div.innerHTML = `
        <span class="cart-item-icon">${getBrasao(p.cat)}</span>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${(p.price * c.qty).toLocaleString('pt-BR')} moedas</div>
        </div>
        <div class="cart-item-qty-wrap">
          <button class="cart-qty-btn" onclick="Market.changeQty(${p.id},-1)">−</button>
          <span class="cart-qty-num">${c.qty}</span>
          <button class="cart-qty-btn" onclick="Market.changeQty(${p.id},1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="Market.removeFromCart(${p.id})" title="Remover">✕</button>`;
      itemsEl.appendChild(div);
    });
  }

  function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveState();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveState();
    renderCart();
  }

  /* ── CHECKOUT ── */
  function checkout() {
    const total = cart.reduce((s, c) => {
      const p = PRODUCTS.find(x => x.id === c.id);
      return s + (p ? p.price * c.qty : 0);
    }, 0);
    if (balance < total) { showToast('Saldo insuficiente!', true); return; }
    balance -= total;
    cart = [];
    saveState();
    renderCart();
    updateBalance();
    toggleCart();
    showToast('✓ Compra finalizada com sucesso!');
  }

  /* ── BALANCE ── */
  function updateBalance() {
    const el = document.getElementById('balance-val');
    if (el) el.textContent = balance.toLocaleString('pt-BR');
  }

  /* ── FEEDBACK ── */
  function showFeedback(msg, ok) {
    const el = document.getElementById('prod-modal-feedback');
    if (!el) return;
    el.textContent = msg;
    el.className   = 'prod-modal-feedback ' + (ok ? 'feedback-ok' : 'feedback-err');
  }

  /* ── TOAST ── */
  function showToast(msg, isError) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className   = 'toast' + (isError ? ' error' : '');
    void t.offsetWidth;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  return { init, setCategory, applyFilters, onSlider, resetFilters, openModal, closeModal, buyNow, addToCart, addToCartFromModal, toggleCart, closeCartOverlay, changeQty, removeFromCart, checkout };
})();

function toggleSearch() {
  const wrap = document.getElementById('search-wrap');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) setTimeout(() => document.getElementById('topbar-search-input').focus(), 310);
}

document.addEventListener('DOMContentLoaded', Market.init);

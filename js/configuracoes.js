/* ============================================
   CROWN OF SHADOWS — configuracoes.js
   ============================================ */

const DEFAULTS = {
  /* JOGO */
  animSpeed:    2,
  showGrid:     true,
  confirmTurn:  true,
  showTips:     true,
  showRange:    true,
  /* ÁUDIO */
  volMaster:    80,
  volMusic:     60,
  volSfx:       90,
  volUi:        50,
  /* INTERFACE */
  uiScale:      2,
  fontSize:     2,
  uiAnims:      true,
  fullscreen:   false,
  /* ACESSIBILIDADE */
  contrast:     1,
  reduceMotion: false,
  subtitles:    true,
  a11yFont:     2,
  /* CONTA */
  playerName:   '',
  activeChar:   'kael'
};

const CHARS = {
  kael:   { name: 'Kael',   level: 8,  initial: 'K' },
  lunara: { name: 'Lunara', level: 7,  initial: 'L' },
  tharok: { name: 'Tharok', level: 9,  initial: 'T' },
  sylien: { name: 'Sylien', level: 6,  initial: 'S' },
  harley: { name: 'Harley', level: 10, initial: 'H' }
};

const Cfg = {
  s: {},
  _toastTimer: null,
  _msgTimer: null,

  /* ── INIT ── */
  init() {
    const raw = localStorage.getItem('cos_settings');
    this.s = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };

    /* sync active char set by personagens page */
    const ac = localStorage.getItem('cos_active_char');
    if (ac && CHARS[ac]) this.s.activeChar = ac;

    /* sync player name from session */
    try {
      const user = JSON.parse(sessionStorage.getItem('cos_user') || '{}');
      if (user.name) this.s.playerName = user.name;
    } catch (_) {}

    this._toDOM();
    this._syncTopbar();
  },

  /* ── WRITE state → DOM ── */
  _toDOM() {
    const s = this.s;
    this._setSlider('anim-speed',  s.animSpeed,  ['Lenta', 'Normal', 'Rápida']);
    this._setCheck('show-grid',    s.showGrid);
    this._setCheck('confirm-turn', s.confirmTurn);
    this._setCheck('show-tips',    s.showTips);
    this._setCheck('show-range',   s.showRange);

    this._setSlider('vol-master', s.volMaster);
    this._setSlider('vol-music',  s.volMusic);
    this._setSlider('vol-sfx',    s.volSfx);
    this._setSlider('vol-ui',     s.volUi);

    this._setSlider('ui-scale',  s.uiScale,  ['Pequeno', 'Médio', 'Grande']);
    this._setSlider('font-size', s.fontSize, ['Pequeno', 'Médio', 'Grande']);
    this._setCheck('ui-anims',   s.uiAnims);
    this._setCheck('fullscreen', s.fullscreen);

    this._setSlider('contrast',      s.contrast,  ['Normal', 'Alto', 'Máximo']);
    this._setCheck('reduce-motion',  s.reduceMotion);
    this._setCheck('subtitles',      s.subtitles);
    this._setSlider('a11y-font',     s.a11yFont,  ['Pequeno', 'Médio', 'Grande']);

    const nameEl = document.getElementById('player-name');
    if (nameEl) nameEl.value = s.playerName;
    const charEl = document.getElementById('active-char');
    if (charEl) charEl.value = s.activeChar;
  },

  _setSlider(id, val, labels) {
    const el  = document.getElementById(id);
    const lbl = document.getElementById('lbl-' + id);
    if (!el || !lbl) return;
    el.value = val;
    lbl.textContent = labels ? labels[val - 1] : val + '%';
  },

  _setCheck(id, val) {
    const el = document.getElementById(id);
    if (el) el.checked = !!val;
  },

  /* ── READ DOM → state ── */
  _fromDOM() {
    const g = id => document.getElementById(id);
    const s = this.s;
    s.animSpeed    = +g('anim-speed').value;
    s.showGrid     = g('show-grid').checked;
    s.confirmTurn  = g('confirm-turn').checked;
    s.showTips     = g('show-tips').checked;
    s.showRange    = g('show-range').checked;

    s.volMaster    = +g('vol-master').value;
    s.volMusic     = +g('vol-music').value;
    s.volSfx       = +g('vol-sfx').value;
    s.volUi        = +g('vol-ui').value;

    s.uiScale      = +g('ui-scale').value;
    s.fontSize     = +g('font-size').value;
    s.uiAnims      = g('ui-anims').checked;
    s.fullscreen   = g('fullscreen').checked;

    s.contrast     = +g('contrast').value;
    s.reduceMotion = g('reduce-motion').checked;
    s.subtitles    = g('subtitles').checked;
    s.a11yFont     = +g('a11y-font').value;

    s.playerName   = g('player-name').value.trim();
    s.activeChar   = g('active-char').value;
  },

  /* ── SAVE ── */
  save() {
    this._fromDOM();
    localStorage.setItem('cos_settings', JSON.stringify(this.s));
    localStorage.setItem('cos_active_char', this.s.activeChar);

    if (this.s.playerName) {
      try {
        const user = JSON.parse(sessionStorage.getItem('cos_user') || '{}');
        user.name = this.s.playerName;
        sessionStorage.setItem('cos_user', JSON.stringify(user));
      } catch (_) {}
    }

    this._syncTopbar();
    this._msg('✦ Configurações salvas com sucesso!', 'ok');
    this._toast('Configurações salvas!');
  },

  /* ── RESTORE DEFAULTS ── */
  restore() {
    if (!confirm('Restaurar todas as configurações para os valores padrão?')) return;
    this.s = { ...DEFAULTS };
    this._toDOM();
    this._msg('Padrões restaurados — clique em Salvar para confirmar.', '');
    this._toast('Padrões restaurados');
  },

  /* ── TAB SWITCH ── */
  tab(btn, sec) {
    document.querySelectorAll('.cfg-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cfg-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + sec).classList.add('active');
  },

  /* ── SLIDER LABEL HELPERS (called from oninput in HTML) ── */
  stepLbl(el, labels) {
    const lbl = document.getElementById('lbl-' + el.id);
    if (lbl) lbl.textContent = labels[+el.value - 1];
  },

  volLbl(el) {
    const lbl = document.getElementById('lbl-' + el.id);
    if (lbl) lbl.textContent = el.value + '%';
  },

  /* ── FULLSCREEN ── */
  onFullscreen(cb) {
    if (cb.checked) document.documentElement.requestFullscreen?.();
    else            document.exitFullscreen?.();
  },

  /* ── LOGOUT ── */
  logout() {
    if (!confirm('Deseja realmente sair da conta?')) return;
    sessionStorage.removeItem('cos_user');
    window.location.href = '../index.html';
  },

  /* ── TOPBAR SYNC ── */
  _syncTopbar() {
    const c = CHARS[this.s.activeChar] || CHARS.kael;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('topbar-name',   this.s.playerName || c.name);
    set('topbar-level',  c.level);
    set('topbar-avatar', c.initial);
  },

  /* ── UI HELPERS ── */
  _msg(text, type) {
    const el = document.getElementById('save-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'save-bar-msg' + (type ? ' ' + type : '');
    clearTimeout(this._msgTimer);
    this._msgTimer = setTimeout(() => { el.textContent = ''; el.className = 'save-bar-msg'; }, 3500);
  },

  _toast(text, err = false) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = text;
    t.className = 'toast' + (err ? ' error' : '');
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }
};

function toggleSearch() {
  document.getElementById('search-wrap').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => Cfg.init());

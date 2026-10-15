/* ============================================
   CROWN OF SHADOWS — home.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const user = (() => {
    try { return JSON.parse(sessionStorage.getItem('cos_user')); } catch(_) { return null; }
  })();

  // Redireciona para login se não autenticado
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Preenche topbar — prioriza personagem ativo do jogo
  const nameEl   = document.getElementById('topbar-name');
  const avatarEl = document.getElementById('topbar-avatar');
  const levelEl  = document.getElementById('topbar-level');

  const CHAR_MAP = {
    kael:   { name: 'Kael',   initial: 'K', level: 8 },
    lunara: { name: 'Lunara', initial: 'L', level: 7 },
    tharok: { name: 'Tharok', initial: 'T', level: 9 },
    sylien: { name: 'Sylien', initial: 'S', level: 8 },
    harley: { name: 'Harley', initial: 'H', level: 7 },
  };
  const activeId  = localStorage.getItem('cos_active_char') || 'kael';
  const activeChar = CHAR_MAP[activeId] || CHAR_MAP['kael'];

  if (nameEl)   nameEl.textContent   = activeChar.name;
  if (avatarEl) avatarEl.textContent = activeChar.initial;
  if (levelEl)  levelEl.textContent  = activeChar.level;

  // Preenche progressão com dados do jogo se existir
  const game = (() => {
    try { return JSON.parse(localStorage.getItem('cos_game')); } catch(_) { return null; }
  })();

  if (game && game.chars) {
    const hero = game.chars.find(c => c.id === game.selectedCharId) || game.chars[0];
    if (hero) {
      const lvlEl   = document.getElementById('prog-level');
      const xpEl    = document.getElementById('prog-xp');
      const fillEl  = document.getElementById('prog-bar-fill');
      const classEl = document.getElementById('prog-class');
      const topLvl  = document.getElementById('topbar-level');

      if (lvlEl)   lvlEl.textContent  = hero.level;
      if (topLvl)  topLvl.textContent = hero.level;
      if (classEl) classEl.textContent = hero.class;

      const xpNeeded = hero.level * 100;
      const xpPct    = Math.min(100, Math.round((hero.xp / xpNeeded) * 100));
      if (xpEl)   xpEl.textContent  = hero.xp + ' / ' + xpNeeded + ' EXP';
      if (fillEl) fillEl.style.width = xpPct + '%';
    }
  }

  // Links da sidebar
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.getElementById('sidebar').classList.remove('sb-open');
        window.location.href = href;
      }
    });
  });

  // Marca link ativo baseado na página atual
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sb-link[data-page]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(currentPage) && currentPage !== '') {
      link.classList.add('active');
    }
  });

  // Fecha sidebar ao clicar fora (mobile)
  document.addEventListener('click', e => {
    const sb = document.getElementById('sidebar');
    if (sb.classList.contains('sb-open') && !sb.contains(e.target) && !e.target.closest('.topbar-hamburger')) {
      sb.classList.remove('sb-open');
    }
    // Fecha busca ao clicar fora
    const sw = document.getElementById('search-wrap');
    if (sw && sw.classList.contains('open') && !sw.contains(e.target)) {
      sw.classList.remove('open');
    }
  });
});

function toggleSearch() {
  const wrap = document.getElementById('search-wrap');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) {
    setTimeout(() => document.getElementById('topbar-search-input').focus(), 310);
  }
}

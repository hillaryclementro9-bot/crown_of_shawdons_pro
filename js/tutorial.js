/* ============================================
   CROWN OF SHADOWS — tutorial.js
   ============================================ */
const Tutorial = (() => {
  let step = 0;

  const STEPS = [
    {
      title: 'SEU HERÓI',
      text:  'Este é seu personagem. Clique nele para selecioná-lo e ver suas habilidades.',
      target: '#char-list',
      pos: 'right',
    },
    {
      title: 'MOVIMENTAÇÃO',
      text:  'Clique em um personagem no tabuleiro para selecioná-lo. Depois clique em uma área iluminada para mover.',
      target: '#board-wrap',
      pos: 'center',
    },
    {
      title: 'O MESTRE',
      text:  'O Mestre conduz sua aventura. Preste atenção às suas palavras — elas revelam perigos, pistas e caminhos escondidos.',
      target: '.g-master-box',
      pos: 'top',
    },
    {
      title: 'SUAS ESCOLHAS',
      text:  'Suas decisões mudam a aventura. Algumas ações revelam caminhos. Outras podem colocar todo o grupo em perigo.',
      target: '#panel-right',
      pos: 'left',
    },
    {
      title: 'TESTES DE DADO',
      text:  'Algumas ações dependem da sorte e das habilidades do personagem. Role o D20 para continuar.',
      target: '.g-dice-wrap',
      pos: 'left',
      requireRoll: true,
    },
    {
      title: 'INVENTÁRIO',
      text:  'Relíquias, chaves e objetos encontrados durante a exploração podem ser utilizados a qualquer momento.',
      target: '.g-icon-btn',
      pos: 'bottom',
    },
    {
      title: 'SEU GRUPO',
      text:  'Cada herói possui habilidades únicas. Escolher o personagem certo para uma situação pode mudar completamente o resultado.',
      target: '#panel-left',
      pos: 'right',
    },
  ];

  function start() {
    step = 0;
    const overlay = document.getElementById('tutorial-overlay');
    overlay.classList.add('active');
    showStep();
  }

  function showStep() {
    const s = STEPS[step];
    if (!s) { finish(); return; }

    document.getElementById('tut-step-label').textContent = `ETAPA ${step+1} / ${STEPS.length}`;
    document.getElementById('tut-title').textContent = s.title;
    document.getElementById('tut-text').textContent  = s.text;

    // Dots
    const dots = document.getElementById('tut-dots');
    dots.innerHTML = '';
    STEPS.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tut-dot' + (i === step ? ' active' : '');
      dots.appendChild(d);
    });

    // Next button
    const btn = document.getElementById('tut-btn-next');
    if (step === STEPS.length - 1) {
      btn.textContent = '⚔ COMEÇAR A JORNADA';
    } else if (s.requireRoll) {
      btn.textContent = '🎲 ROLAR DADO';
      btn.onclick = () => {
        Game.rollDice(Characters.getActive(), 'Tutorial');
        setTimeout(() => { btn.textContent = 'PRÓXIMO →'; btn.onclick = next; }, 700);
      };
      positionSpotlight(s.target, s.pos);
      positionBox(s.pos);
      return;
    } else {
      btn.textContent = 'PRÓXIMO →';
      btn.onclick = next;
    }

    positionSpotlight(s.target, s.pos);
    positionBox(s.pos);
  }

  function positionSpotlight(selector, pos) {
    const el = document.querySelector(selector);
    const spot = document.getElementById('tut-spotlight');
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    const pad = 8;
    spot.style.display = 'block';
    spot.style.left   = (r.left - pad) + 'px';
    spot.style.top    = (r.top  - pad) + 'px';
    spot.style.width  = (r.width  + pad*2) + 'px';
    spot.style.height = (r.height + pad*2) + 'px';
  }

  function positionBox(pos) {
    const box  = document.getElementById('tut-box');
    const spot = document.getElementById('tut-spotlight');
    const sr   = spot.getBoundingClientRect();
    const bw   = box.offsetWidth  || 340;
    const bh   = box.offsetHeight || 200;
    const vw   = window.innerWidth, vh = window.innerHeight;
    const gap  = 20;
    let left, top;

    switch(pos) {
      case 'right':
        left = Math.min(sr.right + gap, vw - bw - 10);
        top  = Math.max(10, sr.top + sr.height/2 - bh/2);
        break;
      case 'left':
        left = Math.max(10, sr.left - bw - gap);
        top  = Math.max(10, sr.top + sr.height/2 - bh/2);
        break;
      case 'top':
        left = Math.max(10, sr.left + sr.width/2 - bw/2);
        top  = Math.max(10, sr.top - bh - gap);
        break;
      case 'bottom':
        left = Math.max(10, sr.left + sr.width/2 - bw/2);
        top  = Math.min(vh - bh - 10, sr.bottom + gap);
        break;
      default: // center
        left = vw/2 - bw/2;
        top  = vh/2 - bh/2;
    }

    box.style.left = left + 'px';
    box.style.top  = top  + 'px';
  }

  function next() {
    step++;
    if (step >= STEPS.length) { finish(); return; }
    showStep();
  }

  function skip()   { finish(); }

  function finish() {
    document.getElementById('tutorial-overlay').classList.remove('active');
    localStorage.setItem('cos_tut_done', '1');
    Game.narrate('"Agora você conhece as regras." Uma pausa. "Mas conhecer as regras não significa estar preparado para aquilo que existe nas sombras."');
    Game.showTurnBanner('⚔ A JORNADA COMEÇA');
  }

  return { start, next, skip };
})();

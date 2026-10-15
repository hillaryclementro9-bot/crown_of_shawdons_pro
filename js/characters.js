/* ============================================
   CROWN OF SHADOWS — characters.js
   ============================================ */
const Characters = (() => {

  const DATA = {
    harley: {
      id:'harley', name:'Harley', class:'Maga Arcana',
      icon:'🌙', color:'#9b59b6', colorDark:'#6c3483',
      hp:80, maxHp:80, mp:150, maxMp:150,
      stats:{ str:8, dex:14, int:20, wis:16, cha:15 },
      status:'Normal',
      skills:[
        {id:'orb',    icon:'✨', label:'Orbe Arcano',      desc:'Lança um orbe de energia arcana. Dano: 2d8+INT.'},
        {id:'runes',  icon:'📖', label:'Interpretar Runas', desc:'Decifra inscrições mágicas antigas.'},
        {id:'detect', icon:'🔮', label:'Detectar Magia',    desc:'Revela auras mágicas e armadilhas ocultas.'},
      ],
      portrait:'🧙‍♀️',
      bio:'Cresceu nas ruas de Ashenveil entre grimórios proibidos. Seus olhos violetas enxergam o que outros não podem.',
      quote:'"As sombras não me assustam. Elas me obedecem."',
    },
    morgan: {
      id:'morgan', name:'Morgan', class:'Guerreira de Ferro',
      icon:'⚔', color:'#c0392b', colorDark:'#922b21',
      hp:130, maxHp:130, mp:40, maxMp:40,
      stats:{ str:20, dex:14, int:10, wis:12, cha:13 },
      status:'Normal',
      skills:[
        {id:'strike', icon:'⚔', label:'Golpe Poderoso',  desc:'Ataque devastador. Dano: 3d6+STR.'},
        {id:'shield', icon:'🛡', label:'Proteger',        desc:'Protege um aliado adjacente até o próximo turno.'},
        {id:'break',  icon:'💥', label:'Arrombar',        desc:'Destrói portas, grades e obstáculos físicos.'},
      ],
      portrait:'⚔️',
      bio:'Criada em meio à guerra. Encontrou nas ruínas uma pedra marcada com o símbolo de uma espada.',
      quote:'"Eu não recuo. Nunca."',
    },
    lyria: {
      id:'lyria', name:'Lyria', class:'Ladra das Sombras',
      icon:'🗡', color:'#2c3e50', colorDark:'#1a252f',
      hp:90, maxHp:90, mp:60, maxMp:60,
      stats:{ str:12, dex:20, int:14, wis:13, cha:16 },
      status:'Normal',
      skills:[
        {id:'shadow', icon:'🗡', label:'Ataque Sombrio',  desc:'Ataque furtivo. Dano: 2d6+DEX. Bônus se oculta.'},
        {id:'pick',   icon:'🔓', label:'Abrir Fechadura', desc:'Abre qualquer fechadura sem a chave.'},
        {id:'scout',  icon:'👁', label:'Investigar',      desc:'Examina a área em busca de armadilhas e segredos.'},
        {id:'stealth',icon:'🌑', label:'Furtividade',     desc:'Torna-se difícil de detectar por 2 turnos.'},
      ],
      portrait:'🗡️',
      bio:'Não acredita em profecias. Até roubar um mapa que não deveria existir.',
      quote:'"Não é roubo se o dono não sabe que perdeu."',
    },
    kael: {
      id:'kael', name:'Kael', class:'Patrulheiro do Norte',
      icon:'🏹', color:'#27ae60', colorDark:'#1e8449',
      hp:105, maxHp:105, mp:55, maxMp:55,
      stats:{ str:15, dex:18, int:13, wis:17, cha:12 },
      status:'Normal',
      skills:[
        {id:'arrow',   icon:'🏹', label:'Flecha do Caçador', desc:'Disparo preciso. Dano: 2d8+DEX. Alcance longo.'},
        {id:'track',   icon:'👣', label:'Rastrear',          desc:'Encontra rastros e segue criaturas.'},
        {id:'survive', icon:'🌲', label:'Sobrevivência',     desc:'Usa o ambiente a seu favor. Cura 1d6 HP.'},
        {id:'observe', icon:'👁', label:'Observar',          desc:'Analisa inimigos, revelando fraquezas.'},
      ],
      portrait:'🏹',
      bio:'Patrulheiro veterano do Norte. Encontrou uma fortaleza com dezenas de esqueletos ajoelhados.',
      quote:'"A espada não mente. O homem que a empunha, sim."',
    },
    darius: {
      id:'darius', name:'Darius', class:'Cavaleiro Amaldiçoado',
      icon:'💀', color:'#7f8c8d', colorDark:'#566573',
      hp:125, maxHp:125, mp:75, maxMp:75,
      stats:{ str:18, dex:12, int:14, wis:10, cha:11 },
      status:'Amaldiçoado',
      skills:[
        {id:'blade',  icon:'⚔', label:'Lâmina Amaldiçoada', desc:'Ataque sombrio. Dano: 2d10+STR. Drena vida.'},
        {id:'resist', icon:'🛡', label:'Resistir',           desc:'Reduz dano recebido em 50% por 1 turno.'},
        {id:'sense',  icon:'🌑', label:'Sentir a Coroa',     desc:'Detecta fragmentos da Coroa nas proximidades.'},
        {id:'shadow', icon:'💀', label:'Poder Sombrio',      desc:'Libera energia das sombras. Dano em área: 3d6.'},
      ],
      portrait:'💀',
      bio:'Ex-membro da Guarda Real. Encontrou uma espada antiga e aceitou o poder que ela oferecia.',
      quote:'"Aquilo dentro de mim... é parte da Coroa."',
    },
  };

  // Runtime HP/MP (mutable)
  const runtime = {};
  Object.keys(DATA).forEach(id => {
    runtime[id] = { hp: DATA[id].hp, mp: DATA[id].mp, status: DATA[id].status };
  });

  function get(id)       { return { ...DATA[id], ...runtime[id] }; }
  function getAll()      { return Object.keys(DATA).map(id => get(id)); }
  function getOrder()    { return GameState.get().turnOrder; }
  function getActive()   { const s = GameState.get(); return get(s.turnOrder[s.activeCharIndex]); }

  function damage(id, amount) {
    runtime[id].hp = Math.max(0, runtime[id].hp - amount);
    if (runtime[id].hp === 0) runtime[id].status = 'Inconsciente';
  }
  function heal(id, amount) {
    runtime[id].hp = Math.min(DATA[id].maxHp, runtime[id].hp + amount);
    if (runtime[id].status === 'Inconsciente' && runtime[id].hp > 0) runtime[id].status = 'Normal';
  }
  function spendMp(id, amount) {
    runtime[id].mp = Math.max(0, runtime[id].mp - amount);
  }
  function restoreMp(id, amount) {
    runtime[id].mp = Math.min(DATA[id].maxMp, runtime[id].mp + amount);
  }

  return { get, getAll, getOrder, getActive, damage, heal, spendMp, restoreMp, DATA };
})();

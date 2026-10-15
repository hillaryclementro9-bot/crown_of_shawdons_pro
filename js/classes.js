/* ============================================
   CROWN OF SHADOWS — classes.js
   ============================================ */

const CLASSES_DATA = {

  guerreiro: {
    id: 'guerreiro', name: 'GUERREIRO', icon: '⚔',
    role: 'TANQUE / DANO',
    artClass: 'guerreiro-art',
    desc: 'Mestre das armas e armaduras pesadas. O Guerreiro é a muralha viva da party — absorve golpes devastadores enquanto protege os aliados com disciplina e força inabalável.',
    combatStyle: 'Estilo de combate: Linha de frente, controle de área, proteção de aliados.',
    attrs: [
      { name: 'Força',        val: 18, max: 20 },
      { name: 'Destreza',     val: 12, max: 20 },
      { name: 'Constituição', val: 16, max: 20 },
      { name: 'Inteligência', val: 10, max: 20 },
      { name: 'Sabedoria',    val: 13, max: 20 },
      { name: 'Carisma',      val: 11, max: 20 },
    ],
    vantagens: [
      'Maior pool de vida de todas as classes',
      'Pode usar qualquer tipo de arma e armadura',
      'Habilidade de provocar inimigos, forçando-os a atacar o Guerreiro',
      'Bônus de armadura passivo que aumenta com o nível',
      'Resistência a efeitos de atordoamento e knockback',
    ],
    desvantagens: [
      'Mobilidade reduzida com armaduras pesadas',
      'Mana muito limitada — poucas habilidades mágicas',
      'Dependente de equipamentos de qualidade para ser eficaz',
      'Vulnerável a magias de área e venenos',
    ],
    habilidades: [
      { icon: '⚔', name: 'Golpe Poderoso',   desc: 'Ataque devastador que ignora 3 de armadura do alvo.',    cost: '2 Stamina', level: 'Nv. 1' },
      { icon: '🛡', name: 'Escudo de Ferro',  desc: 'Reduz todo dano recebido em 4 por 1 turno.',             cost: '1 Stamina', level: 'Nv. 1' },
      { icon: '💢', name: 'Fúria de Batalha', desc: '+4 de dano por 3 turnos. Não pode recuar.',              cost: '3 Stamina', level: 'Nv. 3' },
      { icon: '🗿', name: 'Resistência',      desc: 'Recupera 6 HP ao final de cada turno em combate.',       cost: 'Passiva',   level: 'Nv. 5' },
      { icon: '📣', name: 'Provocar',         desc: 'Força todos os inimigos em 6m a atacar o Guerreiro.',    cost: '2 Stamina', level: 'Nv. 7' },
      { icon: '🌪', name: 'Redemoinho',       desc: 'Ataca todos os inimigos adjacentes causando 2d8 dano.',  cost: '4 Stamina', level: 'Nv. 10' },
    ],
    equip: [
      { icon: '⚔', slot: 'ARMA',      name: 'Espada Longa / Machado de Guerra' },
      { icon: '🛡', slot: 'ESCUDO',    name: 'Escudo de Torre / Escudo de Aço' },
      { icon: '🪖', slot: 'ARMADURA',  name: 'Armadura de Placas Completa' },
      { icon: '⛑', slot: 'CAPACETE',  name: 'Elmo de Aço Temperado' },
      { icon: '📿', slot: 'AMULETO',   name: 'Amuleto de Resistência' },
      { icon: '💍', slot: 'ANEL',      name: 'Anel de Força Bruta' },
    ],
    tree: [
      { id: 'g1',  name: 'Treinamento Básico', icon: '⚔', level: 'Nv. 1',  desc: 'Fundamentos do combate',    unlocked: true,  children: ['g2'] },
      { id: 'g2',  name: 'Golpe Poderoso',     icon: '💥', level: 'Nv. 3',  desc: '+2d6 dano no ataque',       unlocked: true,  children: ['g3a','g3b'] },
      { id: 'g3a', name: 'Fúria de Batalha',   icon: '💢', level: 'Nv. 5',  desc: '+4 dano por 3 turnos',      unlocked: true,  children: ['g4a'] },
      { id: 'g3b', name: 'Escudo de Ferro',    icon: '🛡', level: 'Nv. 5',  desc: '-4 dano recebido',          unlocked: false, children: ['g4b'] },
      { id: 'g4a', name: 'Redemoinho',         icon: '🌪', level: 'Nv. 8',  desc: 'Ataca todos adjacentes',    unlocked: false, children: ['g5'] },
      { id: 'g4b', name: 'Fortaleza',          icon: '🗿', level: 'Nv. 8',  desc: '+20 HP máximo',             unlocked: false, children: ['g5'] },
      { id: 'g5',  name: 'Campeão de Guerra',  icon: '👑', level: 'Nv. 12', desc: 'Habilidade lendária',       unlocked: false, children: [] },
    ],
  },

  arqueiro: {
    id: 'arqueiro', name: 'ARQUEIRO', icon: '🏹',
    role: 'DANO / SUPORTE',
    artClass: 'arqueiro-art',
    desc: 'Precisão letal à distância. O Arqueiro domina o campo de batalha com flechas certeiras, mobilidade superior e a capacidade de eliminar alvos antes mesmo de serem vistos.',
    combatStyle: 'Estilo de combate: Dano à distância, mobilidade, controle de posicionamento.',
    attrs: [
      { name: 'Força',        val: 11, max: 20 },
      { name: 'Destreza',     val: 19, max: 20 },
      { name: 'Constituição', val: 13, max: 20 },
      { name: 'Inteligência', val: 14, max: 20 },
      { name: 'Sabedoria',    val: 16, max: 20 },
      { name: 'Carisma',      val: 12, max: 20 },
    ],
    vantagens: [
      'Maior alcance de ataque de todas as classes físicas',
      'Alta mobilidade — pode atacar e mover no mesmo turno',
      'Acesso a flechas especiais com efeitos variados',
      'Bônus de dano crítico elevado com arcos',
      'Pode atacar inimigos sem provocar ataques de oportunidade',
    ],
    desvantagens: [
      'Frágil em combate corpo a corpo',
      'Dependente de munição — flechas têm custo',
      'Penalidade de ataque em espaços fechados',
      'Baixa vida comparada às classes de linha de frente',
    ],
    habilidades: [
      { icon: '🏹', name: 'Flecha Certeira',   desc: 'Ataque com +5 de precisão e +1d8 dano.',              cost: '1 Stamina', level: 'Nv. 1' },
      { icon: '🌑', name: 'Sombra Veloz',      desc: 'Move-se sem provocar ataques de oportunidade.',       cost: '2 Stamina', level: 'Nv. 1' },
      { icon: '👁', name: 'Olho de Águia',     desc: 'Revela inimigos ocultos em 30m por 3 turnos.',        cost: 'Passiva',   level: 'Nv. 3' },
      { icon: '🌧', name: 'Chuva de Flechas',  desc: 'Ataca todos os inimigos em área 4x4.',                cost: '4 Stamina', level: 'Nv. 5' },
      { icon: '🎯', name: 'Tiro Perfurante',   desc: 'Flecha atravessa até 3 inimigos em linha.',           cost: '3 Stamina', level: 'Nv. 7' },
      { icon: '💨', name: 'Rajada Veloz',      desc: 'Dispara 3 flechas no mesmo turno com -2 precisão.',   cost: '3 Stamina', level: 'Nv. 10' },
    ],
    equip: [
      { icon: '🏹', slot: 'ARMA',      name: 'Arco Longo / Arco Curto Élfico' },
      { icon: '🗡', slot: 'SECUNDÁRIA', name: 'Adaga de Emergência' },
      { icon: '🧥', slot: 'ARMADURA',  name: 'Couro Endurecido / Manto das Sombras' },
      { icon: '🎩', slot: 'CAPACETE',  name: 'Capuz do Caçador' },
      { icon: '📿', slot: 'AMULETO',   name: 'Amuleto da Floresta' },
      { icon: '🧤', slot: 'LUVAS',     name: 'Luvas de Precisão Arcana' },
    ],
    tree: [
      { id: 'a1',  name: 'Tiro Básico',       icon: '🏹', level: 'Nv. 1',  desc: 'Fundamentos do arco',       unlocked: true,  children: ['a2'] },
      { id: 'a2',  name: 'Flecha Certeira',   icon: '🎯', level: 'Nv. 3',  desc: '+5 precisão, +1d8 dano',    unlocked: true,  children: ['a3a','a3b'] },
      { id: 'a3a', name: 'Chuva de Flechas',  icon: '🌧', level: 'Nv. 5',  desc: 'Área 4x4 de flechas',       unlocked: true,  children: ['a4a'] },
      { id: 'a3b', name: 'Sombra Veloz',      icon: '🌑', level: 'Nv. 5',  desc: 'Sem ataques de oport.',     unlocked: false, children: ['a4b'] },
      { id: 'a4a', name: 'Rajada Veloz',      icon: '💨', level: 'Nv. 8',  desc: '3 flechas por turno',       unlocked: false, children: ['a5'] },
      { id: 'a4b', name: 'Tiro Perfurante',   icon: '💥', level: 'Nv. 8',  desc: 'Atravessa 3 inimigos',      unlocked: false, children: ['a5'] },
      { id: 'a5',  name: 'Lenda do Arco',     icon: '👑', level: 'Nv. 12', desc: 'Habilidade lendária',       unlocked: false, children: [] },
    ],
  },
};

  barbaro: {
    id: 'barbaro', name: 'BÁRBARO', icon: '🪓',
    role: 'DANO BRUTO',
    artClass: 'barbaro-art',
    desc: 'Fúria incontrolável transformada em poder devastador. O Bárbaro ignora a dor e a estratégia — ele simplesmente destrói tudo que está à sua frente com força bruta primitiva.',
    combatStyle: 'Estilo de combate: Dano máximo, resistência extrema, combate corpo a corpo agressivo.',
    attrs: [
      { name: 'Força',        val: 20, max: 20 },
      { name: 'Destreza',     val: 10, max: 20 },
      { name: 'Constituição', val: 18, max: 20 },
      { name: 'Inteligência', val: 8,  max: 20 },
      { name: 'Sabedoria',    val: 10, max: 20 },
      { name: 'Carisma',      val: 9,  max: 20 },
    ],
    vantagens: [
      'Maior dano físico bruto de todas as classes',
      'Frenesi aumenta dano e velocidade drasticamente',
      'Resistência natural a dano físico quando em fúria',
      'Recupera HP ao derrotar inimigos',
      'Imune a efeitos de medo e encantamento durante o frenesi',
    ],
    desvantagens: [
      'Praticamente sem acesso a magia',
      'Frenesi causa dano ao próprio Bárbaro',
      'Inteligência baixa limita opções de diálogo e puzzles',
      'Difícil de controlar — pode atacar aliados em frenesi extremo',
    ],
    habilidades: [
      { icon: '🪓', name: 'Frenesi',         desc: '+6 dano, mas recebe 2 de dano por turno.',          cost: '2 Stamina', level: 'Nv. 1' },
      { icon: '🗿', name: 'Pele de Pedra',   desc: 'Reduz todo dano físico recebido em 3.',             cost: 'Passiva',   level: 'Nv. 1' },
      { icon: '📣', name: 'Rugido de Guerra',desc: 'Inimigos próximos ficam amedrontados por 2 turnos.',cost: '3 Stamina', level: 'Nv. 3' },
      { icon: '🩸', name: 'Sede de Sangue',  desc: 'Recupera 4 HP ao derrotar um inimigo.',             cost: 'Passiva',   level: 'Nv. 5' },
      { icon: '💀', name: 'Golpe Mortal',    desc: 'Ataque único com 3x dano. Recarrega em 3 turnos.',  cost: '5 Stamina', level: 'Nv. 8' },
      { icon: '🌋', name: 'Fúria Primordial',desc: 'Entra em estado de fúria total por 5 turnos.',      cost: '6 Stamina', level: 'Nv. 12' },
    ],
    equip: [
      { icon: '🪓', slot: 'ARMA',      name: 'Machado de Guerra / Clava Gigante' },
      { icon: '🧥', slot: 'ARMADURA',  name: 'Peles de Urso / Armadura de Ossos' },
      { icon: '💀', slot: 'CAPACETE',  name: 'Crânio de Dragão / Elmo de Chifres' },
      { icon: '📿', slot: 'AMULETO',   name: 'Dente de Besta Ancestral' },
      { icon: '💍', slot: 'ANEL',      name: 'Anel de Força Bruta' },
      { icon: '🧤', slot: 'LUVAS',     name: 'Manoplas de Ferro Bruto' },
    ],
    tree: [
      { id: 'b1',  name: 'Instinto Selvagem', icon: '🪓', level: 'Nv. 1',  desc: 'Fundamentos da fúria',      unlocked: true,  children: ['b2'] },
      { id: 'b2',  name: 'Frenesi',           icon: '💢', level: 'Nv. 3',  desc: '+6 dano, -2 HP/turno',      unlocked: true,  children: ['b3a','b3b'] },
      { id: 'b3a', name: 'Sede de Sangue',    icon: '🩸', level: 'Nv. 5',  desc: '+4 HP ao matar inimigo',    unlocked: true,  children: ['b4a'] },
      { id: 'b3b', name: 'Pele de Pedra',     icon: '🗿', level: 'Nv. 5',  desc: '-3 dano físico recebido',   unlocked: false, children: ['b4b'] },
      { id: 'b4a', name: 'Golpe Mortal',      icon: '💀', level: 'Nv. 8',  desc: '3x dano, recarga 3 turnos', unlocked: false, children: ['b5'] },
      { id: 'b4b', name: 'Rugido de Guerra',  icon: '📣', level: 'Nv. 8',  desc: 'Medo em todos próximos',    unlocked: false, children: ['b5'] },
      { id: 'b5',  name: 'Fúria Primordial',  icon: '🌋', level: 'Nv. 12', desc: 'Habilidade lendária',       unlocked: false, children: [] },
    ],
  },

  mago: {
    id: 'mago', name: 'MAGO', icon: '✨',
    role: 'DANO MÁGICO',
    artClass: 'mago-art',
    desc: 'Domínio absoluto das artes arcanas. O Mago estuda décadas para dominar feitiços que podem destruir exércitos inteiros — mas seu corpo frágil exige proteção constante dos aliados.',
    combatStyle: 'Estilo de combate: Dano mágico em área, controle de campo, suporte arcano.',
    attrs: [
      { name: 'Força',        val: 8,  max: 20 },
      { name: 'Destreza',     val: 14, max: 20 },
      { name: 'Constituição', val: 11, max: 20 },
      { name: 'Inteligência', val: 20, max: 20 },
      { name: 'Sabedoria',    val: 17, max: 20 },
      { name: 'Carisma',      val: 15, max: 20 },
    ],
    vantagens: [
      'Maior dano mágico de todas as classes',
      'Acesso ao maior repertório de feitiços do jogo',
      'Feitiços de área devastadores que atingem múltiplos inimigos',
      'Pode aprender feitiços de qualquer escola mágica',
      'Teletransporte e mobilidade mágica avançada',
    ],
    desvantagens: [
      'Vida muito baixa — morre rapidamente se atacado',
      'Dependente de mana — fica indefeso quando esgota',
      'Feitiços poderosos têm tempo de conjuração longo',
      'Armaduras pesadas bloqueiam o uso de magia',
    ],
    habilidades: [
      { icon: '🔥', name: 'Bola de Fogo',     desc: 'Dano 6d6 em área de 4m. Teste de Destreza.',       cost: '4 Mana', level: 'Nv. 1' },
      { icon: '⚡', name: 'Raio Arcano',      desc: 'Dano 3d8 em linha reta, atravessa inimigos.',       cost: '3 Mana', level: 'Nv. 1' },
      { icon: '🔮', name: 'Escudo de Força',  desc: 'Absorve até 12 de dano. Dura 3 turnos.',            cost: '2 Mana', level: 'Nv. 3' },
      { icon: '🌀', name: 'Teletransporte',   desc: 'Move-se instantaneamente até 15m.',                 cost: '3 Mana', level: 'Nv. 5' },
      { icon: '❄', name: 'Tempestade Gélida', desc: 'Congela todos os inimigos em área 6x6 por 2 turnos.',cost: '5 Mana', level: 'Nv. 8' },
      { icon: '☄', name: 'Meteoro',           desc: 'Dano 10d10 em área enorme. Conjuração: 2 turnos.',  cost: '8 Mana', level: 'Nv. 12' },
    ],
    equip: [
      { icon: '🪄', slot: 'ARMA',      name: 'Cajado Arcano / Varinha de Cristal' },
      { icon: '📖', slot: 'GRIMÓRIO',  name: 'Grimório de Feitiços Avançados' },
      { icon: '🧥', slot: 'ARMADURA',  name: 'Manto Arcano Encantado' },
      { icon: '🎩', slot: 'CHAPÉU',    name: 'Chapéu do Arquimago' },
      { icon: '📿', slot: 'AMULETO',   name: 'Amuleto de Mana Infinita' },
      { icon: '💍', slot: 'ANEL',      name: 'Anel do Arquimago' },
    ],
    tree: [
      { id: 'm1',  name: 'Míssil Mágico',    icon: '✨', level: 'Nv. 1',  desc: 'Feitiço básico de dano',    unlocked: true,  children: ['m2'] },
      { id: 'm2',  name: 'Bola de Fogo',     icon: '🔥', level: 'Nv. 3',  desc: '6d6 dano em área',          unlocked: true,  children: ['m3a','m3b'] },
      { id: 'm3a', name: 'Tempestade Gélida',icon: '❄',  level: 'Nv. 5',  desc: 'Congela área 6x6',          unlocked: true,  children: ['m4a'] },
      { id: 'm3b', name: 'Raio em Cadeia',   icon: '⚡', level: 'Nv. 5',  desc: 'Salta entre 4 inimigos',    unlocked: false, children: ['m4b'] },
      { id: 'm4a', name: 'Meteoro',          icon: '☄',  level: 'Nv. 8',  desc: '10d10 dano em área',        unlocked: false, children: ['m5'] },
      { id: 'm4b', name: 'Teletransporte',   icon: '🌀', level: 'Nv. 8',  desc: 'Teleporte instantâneo 15m', unlocked: false, children: ['m5'] },
      { id: 'm5',  name: 'Arquimago',        icon: '👑', level: 'Nv. 12', desc: 'Habilidade lendária',       unlocked: false, children: [] },
    ],
  },

  feiticeiro: {
    id: 'feiticeiro', name: 'FEITICEIRO', icon: '🌙',
    role: 'CONTROLE / DANO',
    artClass: 'feiticeiro-art',
    desc: 'Poder das trevas canalizado através de pactos sombrios. O Feiticeiro manipula almas, dobra a realidade e drena a força vital dos inimigos — mas cada uso do poder tem um preço.',
    combatStyle: 'Estilo de combate: Controle de inimigos, drenagem de vida, debuffs e magia sombria.',
    attrs: [
      { name: 'Força',        val: 9,  max: 20 },
      { name: 'Destreza',     val: 16, max: 20 },
      { name: 'Constituição', val: 12, max: 20 },
      { name: 'Inteligência', val: 15, max: 20 },
      { name: 'Sabedoria',    val: 11, max: 20 },
      { name: 'Carisma',      val: 18, max: 20 },
    ],
    vantagens: [
      'Habilidade de drenar vida dos inimigos para se curar',
      'Maldições e debuffs que enfraquecem drasticamente os inimigos',
      'Pode invocar criaturas sombrias para lutar ao seu lado',
      'Imune a efeitos de medo e necromancia',
      'Carisma alto permite manipulação em diálogos',
    ],
    desvantagens: [
      'Classe mais difícil de dominar do jogo',
      'Algumas habilidades causam dano ao próprio Feiticeiro',
      'Pacto sombrio pode ter consequências narrativas negativas',
      'Frágil fisicamente — baixa vida e armadura',
    ],
    habilidades: [
      { icon: '🌑', name: 'Maldição das Sombras', desc: '-3 em todos os testes do alvo por 3 turnos.',    cost: '2 Mana', level: 'Nv. 1' },
      { icon: '💀', name: 'Pacto Sombrio',        desc: 'Sacrifica 4 HP para causar 8 de dano sombrio.',  cost: '1 Mana', level: 'Nv. 1' },
      { icon: '👻', name: 'Drenagem de Alma',     desc: 'Rouba 5 HP do alvo e recupera para si.',         cost: '3 Mana', level: 'Nv. 3' },
      { icon: '🦇', name: 'Voo das Trevas',       desc: 'Torna-se intangível por 1 turno. Imune a dano.', cost: '4 Mana', level: 'Nv. 5' },
      { icon: '🕸', name: 'Teia de Almas',        desc: 'Prende até 3 inimigos por 2 turnos.',            cost: '4 Mana', level: 'Nv. 8' },
      { icon: '🌑', name: 'Eclipse Sombrio',      desc: 'Escuridão total em área 8x8 por 3 turnos.',      cost: '6 Mana', level: 'Nv. 12' },
    ],
    equip: [
      { icon: '🦴', slot: 'ARMA',      name: 'Varinha de Osso de Dragão / Cajado das Trevas' },
      { icon: '🧥', slot: 'ARMADURA',  name: 'Manto das Sombras Eternas' },
      { icon: '🎩', slot: 'CAPUZ',     name: 'Capuz do Pacto Sombrio' },
      { icon: '📿', slot: 'AMULETO',   name: 'Amuleto do Pacto Sombrio' },
      { icon: '💍', slot: 'ANEL',      name: 'Anel da Drenagem de Almas' },
      { icon: '📖', slot: 'GRIMÓRIO',  name: 'Tomo das Trevas Proibidas' },
    ],
    tree: [
      { id: 'f1',  name: 'Toque Sombrio',      icon: '🌑', level: 'Nv. 1',  desc: 'Feitiço básico das trevas', unlocked: true,  children: ['f2'] },
      { id: 'f2',  name: 'Pacto Sombrio',      icon: '💀', level: 'Nv. 3',  desc: 'Sacrifica HP por dano',     unlocked: true,  children: ['f3a','f3b'] },
      { id: 'f3a', name: 'Drenagem de Alma',   icon: '👻', level: 'Nv. 5',  desc: 'Rouba 5 HP do alvo',        unlocked: true,  children: ['f4a'] },
      { id: 'f3b', name: 'Maldição das Trevas',icon: '🕸', level: 'Nv. 5',  desc: '-3 em todos os testes',     unlocked: false, children: ['f4b'] },
      { id: 'f4a', name: 'Eclipse Sombrio',    icon: '🌑', level: 'Nv. 8',  desc: 'Escuridão total 8x8',       unlocked: false, children: ['f5'] },
      { id: 'f4b', name: 'Voo das Trevas',     icon: '🦇', level: 'Nv. 8',  desc: 'Intangível por 1 turno',    unlocked: false, children: ['f5'] },
      { id: 'f5',  name: 'Senhor das Trevas',  icon: '👑', level: 'Nv. 12', desc: 'Habilidade lendária',       unlocked: false, children: [] },
    ],
  },

};

/* ── CONTROLLER ── */
const Classes = (() => {
  let current = null;

  function init() {
    // Sync topbar with active character
    const CHAR_MAP = {
      kael:   { name: 'Kael',   initial: 'K', level: 8 },
      lunara: { name: 'Lunara', initial: 'L', level: 7 },
      tharok: { name: 'Tharok', initial: 'T', level: 9 },
      sylien: { name: 'Sylien', initial: 'S', level: 8 },
      harley: { name: 'Harley', initial: 'H', level: 7 },
    };
    const activeId   = localStorage.getItem('cos_active_char') || 'kael';
    const activeChar = CHAR_MAP[activeId] || CHAR_MAP['kael'];
    const nameEl   = document.getElementById('topbar-name');
    const levelEl  = document.getElementById('topbar-level');
    const avatarEl = document.getElementById('topbar-avatar');
    if (nameEl)   nameEl.textContent   = activeChar.name;
    if (levelEl)  levelEl.textContent  = activeChar.level;
    if (avatarEl) avatarEl.textContent = activeChar.initial;

    document.addEventListener('click', e => {
      const sw = document.getElementById('search-wrap');
      if (sw && sw.classList.contains('open') && !sw.contains(e.target)) sw.classList.remove('open');
    });
  }

  function open(id) {
    const c = CLASSES_DATA[id];
    if (!c) return;
    current = id;

    // Header
    const art = document.getElementById('modal-header-art');
    art.className = 'modal-header-art ' + c.artClass;
    document.getElementById('modal-header-icon').textContent  = c.icon;
    document.getElementById('modal-class-role').textContent   = c.role;
    document.getElementById('modal-class-name').textContent   = c.name;
    document.getElementById('modal-class-desc').textContent   = c.desc;
    document.getElementById('modal-combat-style').textContent = c.combatStyle;

    // Attrs
    const attrsEl = document.getElementById('modal-attrs');
    attrsEl.innerHTML = c.attrs.map(a => {
      const mod = Math.floor((a.val - 10) / 2);
      const pct = Math.round((a.val / a.max) * 100);
      return `<div class="attr-block">
        <span class="attr-block-name">${a.name.toUpperCase()}</span>
        <span class="attr-block-val">${a.val}</span>
        <div class="attr-block-bar"><div class="attr-block-fill" style="width:${pct}%"></div></div>
        <span class="attr-block-mod">${mod >= 0 ? '+' : ''}${mod} modificador</span>
      </div>`;
    }).join('');

    // Vantagens
    document.getElementById('modal-vantagens').innerHTML =
      c.vantagens.map(v => `<li>${v}</li>`).join('');

    // Desvantagens
    document.getElementById('modal-desvantagens').innerHTML =
      c.desvantagens.map(d => `<li>${d}</li>`).join('');

    // Habilidades
    document.getElementById('modal-habilidades').innerHTML =
      c.habilidades.map(h => `
        <div class="hab-card">
          <span class="hab-icon">${h.icon}</span>
          <div class="hab-info">
            <span class="hab-name">${h.name}</span>
            <span class="hab-level">${h.level}</span>
            <span class="hab-desc">${h.desc}</span>
            <span class="hab-cost">${h.cost}</span>
          </div>
        </div>`).join('');

    // Equipamentos
    document.getElementById('modal-equip').innerHTML =
      c.equip.map(e => `
        <div class="equip-rec-item">
          <span class="equip-rec-icon">${e.icon}</span>
          <div class="equip-rec-info">
            <span class="equip-rec-slot">${e.slot}</span>
            <span class="equip-rec-name">${e.name}</span>
          </div>
        </div>`).join('');

    // Árvore
    renderTree(c.tree);

    // Reset to first tab
    tab('attrs', document.querySelector('.modal-tab'));

    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderTree(nodes) {
    const container = document.getElementById('modal-tree');
    container.innerHTML = '';

    // Build adjacency map
    const map = {};
    nodes.forEach(n => { map[n.id] = n; });

    // Find root (no node has it as child)
    const childIds = new Set(nodes.flatMap(n => n.children));
    const roots = nodes.filter(n => !childIds.has(n.id));

    function buildNode(node) {
      const div = document.createElement('div');
      div.className = 'tree-node ' + (node.unlocked ? 'unlocked' : 'locked');
      div.innerHTML = `
        <div class="tree-node-box">
          ${!node.unlocked ? '<span class="tree-node-lock">🔒</span>' : ''}
          <span class="tree-node-icon">${node.icon}</span>
          <span class="tree-node-name">${node.name}</span>
          <span class="tree-node-level">${node.level}</span>
          <span class="tree-node-desc">${node.desc}</span>
        </div>`;
      return div;
    }

    function buildLevel(nodeIds) {
      if (!nodeIds || nodeIds.length === 0) return null;

      const row = document.createElement('div');
      row.className = 'tree-row';

      nodeIds.forEach(id => {
        const node = map[id];
        if (!node) return;

        const branch = document.createElement('div');
        branch.className = 'tree-branch';
        branch.appendChild(buildNode(node));

        if (node.children && node.children.length > 0) {
          const connV = document.createElement('div');
          connV.className = 'tree-connector-v';
          branch.appendChild(connV);

          if (node.children.length === 1) {
            const childLevel = buildLevel(node.children);
            if (childLevel) branch.appendChild(childLevel);
          } else {
            // Fork
            const forkRow = document.createElement('div');
            forkRow.className = 'tree-branch-row';
            node.children.forEach(cid => {
              const childNode = map[cid];
              if (!childNode) return;
              const childBranch = document.createElement('div');
              childBranch.className = 'tree-branch';
              childBranch.appendChild(buildNode(childNode));

              if (childNode.children && childNode.children.length > 0) {
                const cv = document.createElement('div');
                cv.className = 'tree-connector-v';
                childBranch.appendChild(cv);
                const grandLevel = buildLevel(childNode.children);
                if (grandLevel) childBranch.appendChild(grandLevel);
              }
              forkRow.appendChild(childBranch);
            });
            branch.appendChild(forkRow);
          }
        }

        row.appendChild(branch);
      });

      return row;
    }

    const rootIds = roots.map(r => r.id);
    const tree = buildLevel(rootIds);
    if (tree) container.appendChild(tree);
  }

  function close(e, force) {
    if (!force && e && e.target !== document.getElementById('modal-overlay')) return;
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function tab(paneId, btn) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById('pane-' + paneId);
    if (pane) pane.classList.remove('hidden');
    if (btn)  btn.classList.add('active');
  }

  return { init, open, close, tab };
})();

function toggleSearch() {
  const wrap = document.getElementById('search-wrap');
  wrap.classList.toggle('open');
  if (wrap.classList.contains('open')) {
    setTimeout(() => document.getElementById('topbar-search-input').focus(), 310);
  }
}

document.addEventListener('DOMContentLoaded', Classes.init);

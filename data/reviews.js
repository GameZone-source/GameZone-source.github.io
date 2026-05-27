const reviews = [
  {
    slug: 'elden-ring',
    title: 'Elden Ring',
    genre: 'RPG',
    studio: 'FromSoftware',
    publisher: 'Bandai Namco',
    releaseDate: '2022-02-25',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    score: 9.4,
    cover: '/imagens/elden-ring.avif',
    summary: 'RPG de mundo aberto com exploração livre, combate técnico e chefes memoráveis.',
    description:
      'Elden Ring combina a dificuldade da série Souls com uma estrutura aberta que recompensa curiosidade. O review destaca liberdade de exploração, combate profundo, direção de arte marcante e alto valor de replay.',
    criteria: [
      { label: 'Gameplay', score: 9.5, weight: 35 },
      { label: 'Narrativa', score: 9.0, weight: 20 },
      { label: 'Visual', score: 9.5, weight: 20 },
      { label: 'Som', score: 9.0, weight: 10 },
      { label: 'Custo-benefício', score: 9.0, weight: 15 }
    ],
    pros: ['Mundo aberto denso', 'Combate profundo', 'Chefes memoráveis', 'Alta rejogabilidade'],
    cons: ['Curva de dificuldade alta', 'Pouca orientação para iniciantes'],
    price: 249,
    featured: true
  },
  {
    slug: 'forza-horizon-5',
    title: 'Forza Horizon 5',
    genre: 'Corrida',
    studio: 'Playground Games',
    publisher: 'Xbox Game Studios',
    releaseDate: '2021-11-09',
    platforms: ['PC', 'Xbox Series', 'Xbox One'],
    score: 9.0,
    cover: '/imagens/forza-horizon.avif',
    summary: 'Corrida em mundo aberto com México vibrante, centenas de carros e eventos constantes.',
    description:
      'Forza Horizon 5 entrega uma experiência acessível e técnica ao mesmo tempo. O mundo aberto funciona como vitrine para carros, eventos, clima dinâmico e progressão contínua.',
    criteria: [
      { label: 'Gameplay', score: 9.0, weight: 35 },
      { label: 'Narrativa', score: 7.0, weight: 15 },
      { label: 'Visual', score: 9.5, weight: 25 },
      { label: 'Som', score: 8.5, weight: 10 },
      { label: 'Custo-benefício', score: 9.0, weight: 15 }
    ],
    pros: ['Direção visual forte', 'Variedade de carros', 'Boa acessibilidade', 'Conteúdo recorrente'],
    cons: ['Narrativa pouco relevante', 'Progressão pode parecer repetitiva'],
    price: 199,
    featured: false
  },
  {
    slug: 'call-of-duty-modern-warfare-ii',
    title: 'Call of Duty: Modern Warfare II',
    genre: 'FPS',
    studio: 'Infinity Ward',
    publisher: 'Activision',
    releaseDate: '2022-10-28',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    score: 8.2,
    cover: '/imagens/call-of-duty.webp',
    summary: 'FPS com gunplay preciso, campanha intensa e multiplayer competitivo.',
    description:
      'Modern Warfare II mantém a força da franquia no ritmo, resposta das armas e variedade de modos. O multiplayer é robusto, mas progressão e balanceamento ainda exigem atenção.',
    criteria: [
      { label: 'Gameplay', score: 8.8, weight: 40 },
      { label: 'Narrativa', score: 7.4, weight: 15 },
      { label: 'Visual', score: 8.4, weight: 20 },
      { label: 'Som', score: 8.8, weight: 10 },
      { label: 'Custo-benefício', score: 7.2, weight: 15 }
    ],
    pros: ['Gunplay excelente', 'Campanha variada', 'Multiplayer forte', 'Som de armas convincente'],
    cons: ['Progressão irregular', 'Balanceamento muda com frequência'],
    price: 299,
    featured: false
  },
  {
    slug: 'civilization-vi',
    title: 'Civilization VI',
    genre: 'Estratégia',
    studio: 'Firaxis Games',
    publisher: '2K Games',
    releaseDate: '2016-10-21',
    platforms: ['PC', 'Mac', 'iOS', 'Android', 'Console'],
    score: 8.6,
    cover: '/imagens/civilization.avif',
    summary: 'Estratégia por turnos com profundidade, planejamento e alta rejogabilidade.',
    description:
      'Civilization VI transforma decisões de longo prazo em uma experiência estratégica profunda. É um jogo ideal para quem gosta de sistemas, planejamento e consequências graduais.',
    criteria: [
      { label: 'Gameplay', score: 9.0, weight: 40 },
      { label: 'Narrativa', score: 7.0, weight: 10 },
      { label: 'Visual', score: 8.0, weight: 15 },
      { label: 'Som', score: 8.2, weight: 10 },
      { label: 'Custo-benefício', score: 9.2, weight: 25 }
    ],
    pros: ['Profundidade estratégica', 'Partidas diferentes', 'Boa curva de aprendizado', 'Conteúdo extenso'],
    cons: ['Partidas muito longas', 'IA adversária oscila'],
    price: 129,
    featured: false
  },
  {
    slug: 'ea-sports-fc-25',
    title: 'EA Sports FC 25',
    genre: 'Esportes',
    studio: 'EA Vancouver',
    publisher: 'EA Sports',
    releaseDate: '2024-09-27',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    score: 7.8,
    cover: '/imagens/ea-fc.jpeg',
    summary: 'Futebol sólido com ajustes táticos, boa apresentação e monetização controversa.',
    description:
      'EA Sports FC 25 melhora elementos táticos e mantém forte apelo competitivo. A experiência em campo é consistente, mas o modelo de pacotes ainda prejudica a percepção de justiça.',
    criteria: [
      { label: 'Gameplay', score: 8.2, weight: 35 },
      { label: 'Narrativa', score: 7.0, weight: 10 },
      { label: 'Visual', score: 8.0, weight: 20 },
      { label: 'Som', score: 7.5, weight: 10 },
      { label: 'Custo-benefício', score: 7.4, weight: 25 }
    ],
    pros: ['Partidas fluidas', 'Licenças fortes', 'Modo carreira melhorado', 'Boa apresentação'],
    cons: ['Ultimate Team controverso', 'Evolução anual limitada'],
    price: 349,
    featured: false
  },
  {
    slug: 'no-mans-sky',
    title: "No Man's Sky",
    genre: 'Aventura',
    studio: 'Hello Games',
    publisher: 'Hello Games',
    releaseDate: '2016-08-09',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    score: 9.2,
    cover: '/imagens/no-mans-sky.avif',
    summary: 'Exploração espacial que evoluiu por anos até virar referência em suporte pós-lançamento.',
    description:
      "No Man's Sky é um caso raro de recuperação de produto. Atualizações constantes transformaram a experiência em um universo amplo, cooperativo e cheio de objetivos de exploração.",
    criteria: [
      { label: 'Gameplay', score: 8.8, weight: 30 },
      { label: 'Narrativa', score: 7.8, weight: 15 },
      { label: 'Visual', score: 9.2, weight: 20 },
      { label: 'Som', score: 8.5, weight: 10 },
      { label: 'Custo-benefício', score: 9.8, weight: 25 }
    ],
    pros: ['Atualizações gratuitas', 'Escala impressionante', 'Exploração relaxante', 'Boa evolução técnica'],
    cons: ['Loop pode ficar repetitivo', 'Narrativa difusa'],
    price: 199,
    featured: false
  }
]

const detailsBySlug = {
  'elden-ring': {
    detailedGenre: 'RPG / Soulslike',
    testedOn: 'PlayStation 5',
    duration: '60 a 150+ horas',
    verdictLabel: 'Obra-prima',
    articleSections: [
      {
        title: 'Uma obra-prima que redefine o gênero',
        paragraphs: [
          'Elden Ring é o resultado de uma parceria improvável e brilhante: FromSoftware, criadora da série Souls, e George R.R. Martin, autor de Game of Thrones. O resultado é um RPG de mundo aberto que não abre mão da dificuldade característica dos jogos da FromSoft, mas presenteia o jogador com uma liberdade de exploração que a série nunca havia experimentado antes.',
          'O jogo foi lançado em fevereiro de 2022 e rapidamente se tornou um dos títulos mais discutidos e elogiados dos últimos anos. Com mais de 20 milhões de cópias vendidas e o prêmio de Jogo do Ano no The Game Awards 2022, Elden Ring consolidou a FromSoftware como uma das desenvolvedoras mais respeitadas da indústria.'
        ]
      },
      {
        title: 'Exploração sem mãos dadas',
        paragraphs: [
          'O ponto central de Elden Ring é a sua filosofia de design: o jogo não te explica nada. Não há setas apontando para onde ir, não há missões claramente marcadas, não há mapa que te diz o que fazer. Você é jogado nas Terras Intermediárias e precisa descobrir tudo por conta própria, sejam os segredos da história, os atalhos dos mapas ou a fraqueza de cada chefe.',
          'Essa abordagem pode frustrar quem vem acostumado com RPGs mais guiados, mas para quem entra com a mentalidade certa, a sensação de descoberta é incomparável. Encontrar uma área escondida, desvendar a origem de um personagem misterioso ou finalmente derrotar um chefe que te matou cinquenta vezes gera uma satisfação que poucos jogos conseguem replicar.'
        ]
      },
      {
        title: 'Combate técnico e recompensador',
        paragraphs: [
          'O sistema de combate de Elden Ring herda todo o DNA dos Souls. Cada golpe tem peso, cada esquiva precisa ser calculada, e um momento de descuido pode custar tudo. A diferença é que agora o jogo oferece muito mais opções: dezenas de armas com movimentos únicos, magias poderosas, invocações de espíritos aliados e até a possibilidade de andar a cavalo pelo mundo aberto.'
        ]
      },
      {
        title: 'Apresentação visual e sonora impecável',
        paragraphs: [
          'O mundo das Terras Intermediárias é visualmente deslumbrante. De campos dourados com árvores eternas a castelos de lava, prisões submarinas e pântanos amaldiçoados, cada área tem uma identidade visual distinta e memorável. A trilha sonora orquestral, especialmente durante os confrontos com chefes, é uma das melhores composições dos últimos anos nos games.'
        ]
      }
    ],
    pros: ['Mundo aberto enorme e repleto de segredos', 'Combate profundo com inúmeras possibilidades de build', 'Direção de arte e trilha sonora excepcionais', 'Alta rejogabilidade com diferentes classes e estilos', 'Narrativa rica explorada através de itens e ambiente', 'Chefes memoráveis e desafiadores'],
    cons: ['Dificuldade pode afastar jogadores casuais', 'Performance no PC problemática no lançamento', 'Área final do jogo mais fraca que o restante', 'Ausência de mapa para dungeons internas'],
    verdict:
      'Elden Ring é um dos melhores jogos desta geração, talvez de todas. Consegue o feito raro de ser simultaneamente acessível o suficiente para novos jogadores e profundo o bastante para satisfazer os veteranos da série Souls. Se você tem disposição para enfrentar um desafio real, este é um jogo obrigatório.'
  },
  'forza-horizon-5': {
    detailedGenre: 'Corrida / Mundo Aberto',
    testedOn: 'Xbox Series X',
    gamePass: 'Sim, desde o lançamento',
    verdictLabel: 'Excelente',
    articleSections: [
      {
        title: 'O melhor jogo de corrida da geração',
        paragraphs: [
          'Forza Horizon 5 é a evolução de uma série que já era excelente, levada a um nível inédito de polimento e escala. Desenvolvido pela Playground Games e lançado em novembro de 2021, o jogo é ambientado no México e entrega um dos mundos abertos mais bonitos e vivos já criados para um simulador de corrida.',
          'Com mais de 700 carros licenciados, biomas variados que vão de vulcões a praias tropicais e florestas tropicais, e um calendário dinâmico de estações que transforma completamente o mapa a cada semana, Forza Horizon 5 é um jogo que dificilmente para de surpreender.'
        ]
      },
      {
        title: 'Um México incrível para se perder',
        paragraphs: [
          'O cenário escolhido para esta edição foi uma das melhores decisões da Playground Games. O México oferece uma diversidade absurda de ambientes: você pode subir um vulcão nevado, correr por cânions rochosos, atravessar planícies áridas, se aventurar pela selva ou chegar em praias com palmeiras, tudo isso dentro de um único mapa coeso e bem construído.'
        ]
      },
      {
        title: 'Gameplay acessível e satisfatório',
        paragraphs: [
          'Forza Horizon 5 encontra um equilíbrio raro: é divertido tanto para quem gosta de simulação quanto para quem prefere arcade. O sistema de ajudas pode ser configurado livremente, de modo que um iniciante com todas as assistências ligadas e um piloto veterano com simulação completa podem conviver no mesmo mundo sem conflito.'
        ]
      },
      {
        title: 'Disponível no Game Pass',
        paragraphs: [
          'Um dos maiores trunfos de Forza Horizon 5 é estar disponível no Xbox Game Pass desde o lançamento. Para quem tem acesso ao serviço, é literalmente um dos melhores retornos sobre investimento disponíveis no mercado de games atualmente.'
        ]
      }
    ],
    pros: ['Cenário do México visualmente deslumbrante', 'Mais de 700 carros licenciados com modelagem detalhada', 'Conteúdo novo toda semana via Festival Playlist', 'Acessível para iniciantes e veteranos', 'Disponível no Game Pass', 'Modo fotográfico excepcional'],
    cons: ['História principal genérica e sem profundidade', 'Alguns bugs persistem mesmo anos após o lançamento', 'Paywall para carros mais raros via pacotes DLC', 'IA dos adversários ainda deixa a desejar'],
    verdict:
      'Forza Horizon 5 é o melhor jogo de corrida de mundo aberto disponível hoje. Se você tem qualquer interesse em automóveis, em exploração ou simplesmente quer um jogo relaxante e espetacular visualmente, este é uma escolha certeira, especialmente com acesso via Game Pass.'
  },
  'call-of-duty-modern-warfare-ii': {
    detailedGenre: 'FPS / Ação',
    testedOn: 'PC',
    duration: '6 a 8h (campanha)',
    verdictLabel: 'Muito Bom',
    articleSections: [
      {
        title: 'A volta de uma franquia icônica',
        paragraphs: [
          'Call of Duty: Modern Warfare II é a continuação direta do reboot de 2019 e chega com promessas grandes: campanha cinematográfica, multiplayer refinado e a estreia do modo Warzone 2.0. Desenvolvido pela Infinity Ward e lançado em outubro de 2022, o jogo consegue cumprir boa parte do que prometeu, especialmente no que diz respeito à campanha solo.'
        ]
      },
      {
        title: 'Campanha curta mas intensa',
        paragraphs: [
          'A campanha de Modern Warfare II dura cerca de 6 a 8 horas, o que é curto para os padrões de 2022, mas o que existe dentro dessas horas é de alta qualidade. As missões variam bastante: há infiltrações furtivas em refinarias, perseguições de carro pela rodovia, emboscadas na selva mexicana e até uma fase de sobrevivência em uma área residencial que se tornou um dos momentos mais criativos da franquia em anos.'
        ]
      },
      {
        title: 'Multiplayer sólido com algumas ressalvas',
        paragraphs: [
          'O multiplayer é onde a maioria dos jogadores vai passar a maior parte do tempo, e aqui a experiência é sólida mas não sem falhas. O gunplay é excelente, provavelmente o melhor da série até hoje. A sensação de atirar com cada arma é precisa e satisfatória, e o sistema de customização de armas via Gunsmith oferece possibilidades quase infinitas de personalização.',
          'O problema está na progressão. O sistema de desbloqueio de armas é confuso e pouco intuitivo, exigindo que o jogador equipe armas específicas para desbloquear outras da mesma família.'
        ]
      },
      {
        title: 'Warzone 2.0: um começo promissor',
        paragraphs: [
          'O lançamento simultâneo com o Warzone 2.0 foi um movimento ousado. O novo battle royale traz mecânicas diferentes do original, como o sistema de gulag com dois versus dois e as zonas de contrato espalhadas pelo mapa. A recepção inicial foi mista, mas ao longo dos meses o jogo evoluiu consideravelmente com as atualizações.'
        ]
      }
    ],
    pros: ['Gunplay preciso e satisfatório, o melhor da série', 'Campanha variada com momentos criativos', 'Gráficos e áudio de alto nível', 'Sistema de customização de armas profundo', 'Warzone 2.0 traz conteúdo gratuito robusto'],
    cons: ['Campanha curta demais (6 a 8 horas)', 'Sistema de progressão confuso e frustrante', 'Ausência de Modo Zumbis no lançamento', 'Mapas do multiplayer desbalanceados inicialmente'],
    verdict:
      'Call of Duty: Modern Warfare II entrega uma experiência sólida, especialmente para fãs da franquia. A campanha vale cada minuto, e o multiplayer oferece centenas de horas de jogo. Não é perfeito, mas é um dos melhores Call of Duty dos últimos anos.'
  },
  'civilization-vi': {
    detailedGenre: 'Estratégia por Turnos',
    testedOn: 'PC (Steam)',
    duration: '20h por partida (infinito)',
    verdictLabel: 'Muito Bom',
    articleSections: [
      {
        title: 'Mais uma rodada, e de repente é de madrugada',
        paragraphs: [
          'Civilization VI é o sexto capítulo da série de estratégia por turnos mais influente da história dos games. Desenvolvido pela Firaxis Games e lançado em outubro de 2016, o jogo foi continuamente expandido com DLCs e expansões que o tornaram mais completo e profundo a cada ano. Em 2025, com todas as expansões, é simplesmente o melhor jogo de estratégia disponível.',
          'A premissa é simples de entender, mas impossível de dominar completamente: você lidera uma civilização desde a pré-história até o futuro, gerenciando cidades, tecnologia, diplomacia, religião e guerra para alcançar um dos múltiplos tipos de vitória disponíveis.'
        ]
      },
      {
        title: 'O que há de novo no VI?',
        paragraphs: [
          'A grande novidade de Civilization VI em relação ao seu predecessor é o sistema de distritos. Em vez de empilhar todos os edifícios dentro de uma única cidade, agora você precisa construir distritos especializados fora dos limites urbanos, um distrito científico aqui, um militar ali, um de entretenimento além das montanhas.'
        ]
      },
      {
        title: 'Expansões que transformam o jogo',
        paragraphs: [
          'Civilization VI base já é excelente, mas as duas expansões principais, Rise & Fall e Gathering Storm, elevam a experiência a outro patamar. Rise & Fall introduz o sistema de Eras e Governadores. Gathering Storm traz clima e catástrofes naturais, forçando o jogador a pensar no impacto ambiental de suas decisões industriais.'
        ]
      },
      {
        title: 'Disponível em tudo',
        paragraphs: [
          'Uma das maiores vantagens de Civilization VI é sua disponibilidade. O jogo roda bem em PCs modestos, está disponível em praticamente todas as plataformas e há até versões gratuitas para celular com boa parte do conteúdo.'
        ]
      }
    ],
    pros: ['Profundidade estratégica incomparável no gênero', 'Alta rejogabilidade, cada partida é única', 'Expansões adicionam camadas interessantes', 'Disponível em múltiplas plataformas incluindo celular', 'Visual colorido e identidade artística forte', 'Comunidade ativa com mods gratuitos'],
    cons: ['IA dos adversários pouco desafiadora nas fases finais', 'Custo alto se comprar todas as expansões no preço cheio', 'Curva de aprendizado íngreme para iniciantes', 'Turnos finais podem ficar muito lentos'],
    verdict:
      'Civilization VI com todas as expansões é o ápice da série e um dos melhores jogos de estratégia já criados. Se você tem paciência para aprender e adorar pensar em cada decisão, vai perder facilmente centenas de horas aqui, e não vai se arrepender de nenhuma delas.'
  },
  'ea-sports-fc-25': {
    detailedGenre: 'Simulação de Futebol',
    testedOn: 'PlayStation 5',
    verdictLabel: 'Bom',
    articleSections: [
      {
        title: 'O sucessor do FIFA tenta se reinventar',
        paragraphs: [
          'EA Sports FC 25 é a segunda edição da franquia após a separação da EA Sports com a FIFA, e chega com a missão de mostrar que a série tem vida própria sem o selo da federação. Lançado em setembro de 2024, o jogo traz melhorias pontuais no gameplay, novidades no Ultimate Team e uma revisão no modo Carreira que agradou boa parte da comunidade.'
        ]
      },
      {
        title: 'Gameplay: mais fluido, mais físico',
        paragraphs: [
          'O maior destaque técnico do FC 25 é o sistema FC IQ, que melhora a inteligência dos jogadores em campo. Os atletas agora tomam decisões mais coerentes com suas características reais, um lateral ofensivo avança mais, um volante de marcação cobre espaços diferentes de um meia criativo.'
        ]
      },
      {
        title: 'Ultimate Team: o modo que move o mundo',
        paragraphs: [
          'O Ultimate Team continua sendo o modo mais popular e mais lucrativo do jogo. O elefante na sala continua sendo o modelo de negócio baseado em pacotes aleatórios, a mecânica de gacha ainda existe e ainda é problemática, especialmente considerando que o público-alvo inclui menores de idade.'
        ]
      },
      {
        title: 'Modo Carreira com novidades bem-vindas',
        paragraphs: [
          'O modo Carreira, historicamente negligenciado, recebeu atenção real nesta edição. Agora é possível assumir o papel de treinador com mais ferramentas táticas, e o sistema de desenvolvimento de jovens promissores foi reformulado.'
        ]
      }
    ],
    pros: ['Gameplay fluido e responsivo como sempre', 'FC IQ melhora o comportamento dos jogadores em campo', 'Modo Carreira com melhorias bem-vindas', 'Visual de última geração impressionante no PS5/Xbox Series', 'Licenças de ligas, times e jogadores reais'],
    cons: ['Ultimate Team ainda depende de pacotes aleatórios', 'Poucas novidades para justificar o preço cheio', 'Modo Pro Clubs pouco atualizado', 'Servidores online instáveis nas primeiras semanas'],
    verdict:
      'EA Sports FC 25 é um jogo de futebol sólido com melhorias reais sobre o antecessor. Se você é fã da franquia e joga Ultimate Team ou Carreira, vai gostar. Se está esperando uma revolução, ela ainda não chegou, mas o jogo cumpre bem o que promete.'
  },
  'no-mans-sky': {
    detailedGenre: 'Aventura / Exploração',
    testedOn: 'PC (Steam)',
    servicePrice: 'Gratuito no PS Plus / Game Pass',
    verdictLabel: 'Excelente',
    articleSections: [
      {
        title: 'A maior virada da história dos games',
        paragraphs: [
          "No Man's Sky é talvez o caso de redenção mais impressionante da indústria dos games. Lançado em 2016 pela pequena Hello Games, o jogo chegou ao mercado muito aquém das expectativas criadas pelo marketing, gerando uma das maiores controvérsias do ano. Oito anos e mais de 25 atualizações gratuitas depois, o jogo é irreconhecível, e está melhor do que qualquer um imaginou que poderia estar."
        ]
      },
      {
        title: '18 quintilhões de planetas, e cada um é único',
        paragraphs: [
          "A proposta central de No Man's Sky é a exploração de um universo proceduralmente gerado com 18 quintilhões de planetas. Cada planeta tem sua própria flora, fauna, clima, minerais e atmosfera. Você pode pousar em qualquer superfície visível, andar até o horizonte, subir de volta para a nave e voar para outro planeta. Sem telas de carregamento. Sem fronteiras invisíveis."
        ]
      },
      {
        title: 'Muito mais do que exploração',
        paragraphs: [
          "O grande equívoco sobre No Man's Sky hoje é pensar que é só um jogo de exploração. Com todas as atualizações, o jogo inclui: construção de bases elaboradas, criação de fazendas e frotas de naves, exploração de masmorras procedurais, combate espacial e de superfície, narrativas de missões envolventes e multijogador cooperativo para até 32 pessoas.",
          'A Hello Games lançou todas essas adições gratuitamente, sem cobrar pelos conteúdos adicionados após o lançamento. Para jogadores que compraram o jogo em 2016, receberam literalmente um jogo novo de graça, várias vezes.'
        ]
      },
      {
        title: 'Ainda imperfeito, mas inesquecível',
        paragraphs: [
          "No Man's Sky não é perfeito. A narrativa principal ainda é relativamente fraca, o combate poderia ser mais elaborado, e a vastidão do universo pode fazer o jogo parecer vazio para quem busca uma experiência mais direcionada. Mas para o jogador que se deixa perder na exploração, o game oferece algo que poucos títulos conseguem: a genuína sensação de aventura e descoberta."
        ]
      }
    ],
    pros: ['Universo procedural com escala inimaginável', 'Todas as atualizações são gratuitas', 'Multiplayer cooperativo para até 32 jogadores', 'Construção de bases extremamente elaborada', 'Disponível no PS Plus e Game Pass', 'História de redenção que inspira a indústria'],
    cons: ['Combate ainda simples e pouco refinado', 'Narrativa principal sem grande impacto emocional', 'Grind intenso nas fases iniciais', 'Pode parecer monótono para quem não curte exploração'],
    verdict:
      "No Man's Sky em 2024 é um dos melhores exemplos de como um desenvolvedor pode transformar fracasso em sucesso através de trabalho duro e compromisso com o jogador. Se você ama exploração, construção e a sensação de que o universo é literalmente infinito, este jogo vai te prender por centenas de horas."
  }
}

for (const review of reviews) {
  Object.assign(review, detailsBySlug[review.slug] || {})
}

function weightedScore(review) {
  const totalWeight = review.criteria.reduce((sum, item) => sum + item.weight, 0)
  const weighted = review.criteria.reduce((sum, item) => sum + item.score * item.weight, 0)
  return Math.round((weighted / totalWeight) * 10) / 10
}

module.exports = { reviews, weightedScore }

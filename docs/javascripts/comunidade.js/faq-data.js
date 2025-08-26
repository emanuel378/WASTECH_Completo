const faqData = [
  {
    category: "Participação",
    questions: [
      {
        question: "Como faço para participar?",
        answer: "Você pode visitar a horta mais próxima e falar com os responsáveis, ou se cadastrar pelo site."
      },
      {
        question: "Precisa pagar para participar?",
        answer: "Não. A participação nas hortas é voluntária e gratuita."
      },
      {
        question: "Quais são os requisitos para ser voluntário?",
        answer: "Não há requisitos específicos, apenas interesse em contribuir com a horta comunitária."
      },
      {
        question: "Posso levar meus filhos para participar?",
        answer: "Sim, crianças são bem-vindas, desde que acompanhadas por um adulto responsável."
      },
      {
        question: "É necessário ter experiência com jardinagem?",
        answer: "Não, oferecemos orientações para iniciantes nas hortas."
      },
      {
        question: "Como me torno um líder de horta?",
        answer: "Entre em contato com a administração para saber sobre vagas de liderança e os critérios."
      },
      {
        question: "Posso participar esporadicamente?",
        answer: "Sim, você pode ajudar quando puder, sem compromisso de frequência fixa."
      },
      {
        question: "Há limite de vagas para voluntários?",
        answer: "Depende da horta. Algumas têm capacidade limitada, então verifique com os coordenadores."
      },
      {
        question: "Preciso levar minhas próprias ferramentas?",
        answer: "Não, as hortas geralmente fornecem ferramentas, mas você pode trazer as suas, se preferir."
      },
      {
        question: "Como sei se minha participação foi confirmada?",
        answer: "Após o cadastro ou contato, você receberá uma confirmação por e-mail ou diretamente na horta."
      }
    ]
  },
  {
    category: "Funcionamento",
    questions: [
      {
        question: "Quais os horários de funcionamento?",
        answer: "Geralmente das 7h30 às 18h, de segunda a sábado."
      },
      {
        question: "Como sei onde está a horta mais próxima?",
        answer: "Você pode pesquisar na Internet por Hortas Comunitárias juntamente com o nome da sua Cidade ou Bairro."
      },
      {
        question: "As hortas funcionam em feriados?",
        answer: "Depende da horta. Verifique os detalhes no site ou com os responsáveis."
      },
      {
        question: "Posso colher alimentos da horta?",
        answer: "Sim, voluntários podem colher alimentos para uso pessoal, respeitando as regras da horta."
      },
      {
        question: "As hortas têm ferramentas disponíveis?",
        answer: "Sim, a maioria das hortas fornece ferramentas básicas para os voluntários."
      },
      {
        question: "Como é feita a manutenção das hortas?",
        answer: "A manutenção é realizada por voluntários e coordenadores, com apoio da comunidade."
      },
      {
        question: "As hortas têm supervisão profissional?",
        answer: "Algumas hortas contam com agrônomos ou jardineiros experientes para orientação."
      },
      {
        question: "O que acontece com os alimentos colhidos?",
        answer: "Os alimentos são compartilhados entre voluntários, doados ou usados em eventos comunitários."
      },
      {
        question: "As hortas funcionam no inverno?",
        answer: "Sim, mas o cultivo pode ser ajustado para plantas adequadas à estação."
      },
      {
        question: "Como é gerenciada a segurança nas hortas?",
        answer: "As hortas têm regras de segurança, e algumas possuem cercas ou vigilância comunitária."
      }
    ]
  },
  {
    category: "Produtos e Cultivo",
    questions: [
      {
        question: "Quais tipos de alimentos são cultivados?",
        answer: "Hortaliças, ervas, frutas e legumes variados, dependendo da horta."
      },
      {
        question: "As hortas são orgânicas?",
        answer: "Sim, a maioria das hortas segue práticas orgânicas, evitando pesticidas químicos."
      },
      {
        question: "Posso sugerir o que plantar?",
        answer: "Sim, sugestões são bem-vindas e podem ser discutidas com os coordenadores."
      },
      {
        question: "Como é feita a irrigação das hortas?",
        answer: "A irrigação varia, mas muitas hortas usam sistemas manuais ou automáticos sustentáveis."
      },
      {
        question: "Quais técnicas de cultivo são usadas?",
        answer: "Técnicas como agricultura orgânica, permacultura e rotação de culturas são comuns."
      },
      {
        question: "Como é feito o controle de pragas?",
        answer: "Usamos métodos naturais, como plantas repelentes e predadores naturais, sem pesticidas químicos."
      },
      {
        question: "As hortas produzem sementes próprias?",
        answer: "Algumas hortas produzem sementes para replantio, promovendo autossustentabilidade."
      },
      {
        question: "Posso aprender sobre compostagem nas hortas?",
        answer: "Sim, muitas hortas oferecem oficinas de compostagem para voluntários."
      },
      {
        question: "Quais são os melhores meses para plantar?",
        answer: "Depende da região e do clima, mas os coordenadores podem orientar sobre o calendário de plantio."
      },
      {
        question: "As hortas cultivam plantas medicinais?",
        answer: "Sim, algumas hortas incluem ervas medicinais, como camomila e hortelã."
      }
    ]
  },
  {
    category: "Comunidade",
    questions: [
      {
        question: "As hortas organizam eventos comunitários?",
        answer: "Sim, muitas hortas promovem oficinas, feiras e eventos educativos."
      },
      {
        question: "Como posso ajudar além de cultivar?",
        answer: "Você pode ajudar com organização de eventos, divulgação ou doações de materiais."
      },
      {
        question: "Há grupos de apoio para iniciantes?",
        answer: "Sim, algumas hortas oferecem grupos de mentoria para novos voluntários."
      },
      {
        question: "Posso criar uma horta comunitária na minha região?",
        answer: "Sim, entre em contato com a administração para orientações sobre como iniciar."
      },
      {
        question: "As hortas aceitam doações?",
        answer: "Sim, doações de sementes, ferramentas ou recursos são muito bem-vindas."
      },
      {
        question: "As hortas promovem inclusão social?",
        answer: "Sim, as hortas são abertas a todos, incentivando diversidade e inclusão."
      },
      {
        question: "Posso organizar um evento na horta?",
        answer: "Sim, com aprovação dos coordenadores, você pode propor eventos como oficinas ou feiras."
      },
      {
        question: "As hortas têm parcerias com escolas?",
        answer: "Algumas hortas colaboram com escolas para projetos educativos e visitas."
      },
      {
        question: "Como posso divulgar a horta na minha comunidade?",
        answer: "Você pode compartilhar nas redes sociais ou organizar eventos locais com apoio dos coordenadores."
      },
      {
        question: "Há programas para jovens nas hortas?",
        answer: "Sim, algumas hortas têm programas específicos para envolver jovens em atividades agrícolas."
      }
    ]
  }
];
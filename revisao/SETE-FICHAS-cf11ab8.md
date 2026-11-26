# Revisão das sete fichas e correção do nome da tília

Data: **26/11/2026**. Base: `cf11ab885475a56dfcc6ee7f03e18c570b9d9819`; cache `agenda-v74` → `agenda-v75`. Entrega como patch, sem publicação.

## Âmbito e grau de certeza

Alteram-se as sete fichas pedidas e, na tília, **só** `nome_cientifico`, para `Tilia platyphyllos`. Não mudam tratamentos, tarefas, interface, pesquisa ou lógica das listas. `index.html` mantém-se byte a byte; não existe `app.html` versionado nesta base. O `sw.js` muda apenas o nome da cache.

As fontes estão em [FONTES-sete-fichas-cf11ab8.json](FONTES-sete-fichas-cf11ab8.json), com URL, secção e data de consulta; as revisões por campo estão nas fichas. `parcial` não significa calendário local validado. As janelas mensais conservadas sem comprovação recebem registo provisório ou ficam em `por_rever`. A identificação botânica das plantas fotografadas não é certificada por esta revisão; a fonte de uma espécie não confirma que uma fotografia corresponda a ela.

Não se uniformiza a escala numérica de dificuldade como se fosse uma medida científica. Em particular, o valor 3 do pitósporo é uma estimativa editorial conservadora para condições domésticas e fica por rever. Também não se acrescenta um substrato ou uma dose universal de adubo/hormona.

## Alterações e limites por ficha

| Ficha | Correção | Limite que permanece explícito |
|---|---|---|
| `castanheiro_india` | Semente como via principal para obter a espécie; sementes sem secagem; setembro acrescentado à sementeira. Propagação vegetativa para conservar uma cultivar. Poda ligeira no fim do inverno/início da primavera, em fevereiro–março. Aviso de ingestão inclui flores e distingue a castanha comestível. | Meses locais e dificuldade não validados; fevereiro–março na enxertia continua por confirmar. Mantêm-se julho–agosto e as notas de borbulha em lasca, com fonte específica de ‘Baumannii’, sem generalizar o protocolo a todas as cultivares. |
| `pimento_padron` | Alfobre com calor e luz, transplante condicionado ao tempo real; sai a garantia de fim das geadas em meados de abril. Separa fruto verde para consumo de fruto maduro para semente; explica isolamento e descendência F1. Corrige a associação simplista rega/picante. | Calendário de Sardoura não validado. A denominação Padrón não certifica o lote de sementes, uma identidade clonal ou o direito à DOP Pemento de Herbón. A nota prática aparece na ficha através de `sementeira.nota`. |
| `poligala` | Estacas herbáceas no início do verão e semi-lenhosas depois, junho–setembro. Aviso de geada reforçado. Aviso Xylella apenas em Plantar e Estaquia. | Março–abril na sementeira não tem protocolo primário recuperado; outubro na plantação só se as condições permitirem abrigo e ausência de geada. Não se alega uma deteção na AMP. |
| `pitosporo_tenuifolium` | Mantém julho–setembro para estacas semi-lenhosas, com dificuldade 3 provisória. A conservação da cultivar é por via vegetativa, sem exclusividade absoluta da estaca. Distingue-o de `P. undulatum` no aviso legal. | Os meses locais, a dificuldade numérica e a frequência herdada de aparo de sebe não ficam certificados pela ficha RHS. |
| `lima_dedo` | Enxertia passa a único método recomendado para conservar a cultivar; estaquia continua disponível. Avisos de frio e adubação mais prudentes. | Não se transfere o calendário australiano para Portugal: enxertia, estaquia, plantação, floração e colheita locais continuam parcialmente por confirmar. Não foi recuperado aqui um protocolo primário suficiente de estacas. |
| `tuia_gigante` | Semi-lenhosas em agosto–setembro, separadas de um eventual protocolo de lenhosas de inverno. Sementeira em fevereiro–março. A recuperação da madeira velha deixa de ser declarada impossível. Aviso de ingestão e alergia cutânea. | Conversão das estações em meses é provisória; um protocolo de lenhosas não foi declarado inviável, apenas não foi incluído neste calendário. |
| `cipreste_comum` | Semi-lenhosas em agosto–setembro; sai a extensão automática até novembro. Exemplar isolado sem poda de rotina, sebe com aparo ligeiro no verde. | Março–abril na sementeira e a dificuldade não foram confirmados. Não se generaliza um protocolo de lenhosas de outras coníferas a esta espécie. |

Fontes decisivas: Forest Research e RHS para castanheiro-da-Índia; NIH/NCCIH para a sua ingestão; RHS, Seed Savers Exchange, University of Minnesota e Concello de Padrón para o pimento; perfis RHS para os três arbustos/coníferas e o guia de coníferas para a poda; NSW Primefact 979 para a lima-dedo. A informação australiana é sobretudo observacional e não sustenta doses ou meses portugueses.

## Toxicidade e estatuto: o que ficou confirmado

- Castanheiro-da-Índia e tuia: os avisos de toxicidade têm fontes específicas. No pimento, trata-se de irritação no manuseamento e variabilidade do picante de um fruto alimentar, não de classificar o fruto como venenoso.
- Polígala, pitósporo, lima-dedo e cipreste: `toxicidade: null` mantém-se com registo **provisório**. Não equivale a «planta não tóxica»; não foi recuperada uma avaliação primária suficiente da planta inteira e dos diferentes usos. Na lima-dedo, conhecer o uso alimentar da polpa não permite generalizar aos restantes órgãos.
- No **anexo II do DL 92/2019**, consultado no texto consolidado do Diário da República, **Aesculus hippocastanum não consta**; Pittosporum tenuifolium também não consta, enquanto **Pittosporum undulatum consta**. A conferência desta lista não está pendente.
- Os outros cinco táxones desta ronda também não foram encontrados nesse anexo; isso não constitui uma declaração de que todas as utilizações e movimentações são livres. O artigo 13.º trata separadamente da introdução de exóticas na natureza. Não se generaliza a ausência do anexo a ausência de risco ecológico, de regras fitossanitárias, de condicionantes locais ou de proteção de exemplares classificados.
- `autoctone: false` no pimento deixa de estar vazio: trata-se de uma cultura de origem americana, selecionada em cultivo. Não se altera o estatuto de origem herdado dos restantes seis táxones sem uma revisão de distribuição própria.
- A alteração do nome da tília foi pedida e não certifica os protocolos herdados de `Tilia spp.`. Esses campos terão de ser revistos para a espécie, incluindo a enxertia anteriormente registada ao nível do género.

O levantamento geográfico e a tabela de deteções estão em [XYLELLA-levantamento.md](XYLELLA-levantamento.md). Só a polígala recebe um novo aviso Xylella.

## Variações esperadas nas contagens

As alterações de época decorrem da distinção do tipo de material e da estação indicada pela fonte, com adaptação mensal provisória. A sementeira do castanheiro-da-Índia acompanha a recolha já prevista em setembro, sem obrigar a conservar sementes secas. A poda passa para o fim do inverno; a tuia passa a sementeira para essa estação. A polígala ganha o período herbáceo do início do verão. As duas coníferas deixam de sugerir a mesma técnica semi-lenhosa até novembro.

Variação em relação a `cf11ab8` (as outras seis categorias não mudam):

| Mês | Podas | Sementeira de viveiro | Estaquia |
|---|---:|---:|---:|
| Janeiro | −1 | 0 | 0 |
| Fevereiro | 0 | +1 | 0 |
| Março | +1 | 0 | 0 |
| Abril | 0 | −1 | 0 |
| Maio | 0 | 0 | 0 |
| Junho | 0 | 0 | +1 |
| Julho | 0 | 0 | +1 |
| Agosto | 0 | 0 | +2 |
| Setembro | 0 | +1 | 0 |
| Outubro | 0 | 0 | −2 |
| Novembro | 0 | 0 | −2 |
| Dezembro | −1 | 0 | 0 |

A previsão para 26/11 é: Podas 7, Tratamentos 32, Plantar 113, Estaquia **16**, Sementeira 42, Divisão 9, Colheita 29; Enxertia e Alporquia 0. As duas retiradas de novembro são a tuia e o cipreste, não uma falha do contador.

## Verificação e aplicação

Executados nesta entrega:

- `node verificar.js --revisao`: sem erros; 156 espécies, 58 grupos, 22 tarefas. Os avisos de texto amendoeira/pessegueiro (dois) e feijão/milho já existiam.
- Os 29 ficheiros de testes anteriores e o novo `testar-sete-fichas-xylella.cjs`: **30/30 a passar**.
- O teste novo executa as funções reais de listas, contagens, avisos e fichas da interface atual. Confere as 108 combinações, as variações mensais, as notas visíveis, o alcance das alterações por id, a tília e a tabela Xylella. Ignora espécies acrescentadas depois da base; não compara `index.html` ou `sw.js` com a base. Pode fixar-se `AGENDA_RONDA_SETE` ao commit aceite numa execução histórica.
- Não houve execução de Chromium nesta entrega. Ficam para a aplicação pelo Claude o ensaio visual, a descarga/atualização real de `agenda-v74` para `agenda-v75`, a verificação das caches antigas e o funcionamento offline.

Aplicar sobre a base indicada com `git apply --check ficheiro.patch` e depois `git apply ficheiro.patch`. Correr o verificador e os 30 testes antes da publicação. No browser, conferir sobretudo a ausência das duas coníferas em Estaquia de novembro, a polígala em junho, o castanheiro-da-Índia em setembro na Sementeira, o aviso só nos dois botões combinados e os avisos completos nas fichas.

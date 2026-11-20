# Podas — primeira ronda sobre 0d9de9b

Base exata: `0d9de9b774db89a92473d87198da725a20b554d8`. Consulta e revisão: **20-11-2026**.

## Âmbito

A base tem **74 espécies com pelo menos uma poda entre dezembro e março**. Esta entrega revê **nove fichas**: videira de vinho, macieira, pereira, figueira, oliveira, kiwi, laranjeira, limoeiro e tangerineira. **Ficam 65 dessas espécies por rever**, incluindo a ficha separada de uva de mesa. Uma revisão da videira de vinho não certifica automaticamente essa outra ficha.

Cada uma recebe `revisao.poda` com `estado: parcial`, `verificado: [texto, tecnica]` e `por_rever: [meses]`. Fontes e limites ficam no próprio registo. **Nenhuma lista de meses foi alterada nem validada para Sardoura.** Mantiveram-se os lembretes existentes, agora com condições mais claras nos textos visíveis.

A revisão incide em plantas estabelecidas/de produção. Não é um manual de formação, recuperação de árvores abandonadas ou reconversão de sistemas de condução. No kiwi e na videira, o campo `poda` inclui também operações em verde: foram lidas e corrigidas as indicações associadas necessárias para que esse campo não fique contraditório. Isto não corresponde a uma revisão das restantes operações das fichas.

## Decisões

| Ficha | Meses mantidos | Alteração e fundamento |
|---|---|---|
| Videira (vinho) | Inverno: 12,1,2,3; verde: 4,5,6,7 | Substituir o prazo genérico por repouso/abrolhamento e cuidados sanitários. Março continua condicionado. Desponta ligada à floração; retirar a indicação inespecífica de desfolha em junho. [V1,V2] |
| Macieira | 11,12,1,2 | Limitar a orientação a árvores adultas de copa livre e evitar cortes uniformes que eliminem madeira frutífera. [P1] |
| Pereira | 11,12,1,2 | Mesma delimitação; não apresentar esta técnica como universal para árvores jovens ou formas conduzidas. [P1] |
| Figueira | 3,4 | Distinguir lampos/vindimos e preservar madeira relevante para a primeira produção, se a cultivar a tiver. [F1,F2] |
| Oliveira | 2,3,4 | Poda moderada condicionada ao frio, tempo seco e estado sanitário. [O1,O2] |
| Kiwi | Inverno: 12,1,2; verde: 6,7 | Renovação nas femininas adultas e poda principal dos machos após a floração; higiene perante PSA. [K1,K2,K3] |
| Laranjeira | 3,4,5 | Condicionar a intervenção ao frio e ciclo da cultivar. [C1] |
| Limoeiro | 3,4,5 | A produção sobreposta impede usar uma regra indiferenciada de fim de colheita. [C1] |
| Tangerineira | 3,4,5 | Mesma condição de frio, cultivar e colheita. [C1] |

Na videira, a CVRVV recomenda ordenar o trabalho segundo a precocidade de abrolhamento, começando pelas castas tardias. Logo, ser uma casta tardia não justifica, por si só, deixá-la para março. Carga e sistema de poda dependem do vigor e da condução; não foi imposto um número de gomos.

Na figueira, o manual português distingue os dois tipos de produção. A fonte britânica foi usada apenas para a prudência relativa às geadas, sem importar a ideia de que apenas uma produção consegue amadurecer. Não se alterou a colheita da ficha, que continua fora do âmbito.

No kiwi, a orientação refere plantas adultas; durante a formação, machos e fêmeas podem exigir intervenções semelhantes. Não se transplantaram números de varas nem meses do Oregon para a parcela portuguesa.

## Notas mensais e extensão do diff

Na app, `notas.podas[mês]` **substitui** o texto de `poda[].tipo`. Atualizar só `tipo` deixaria muitas correções escondidas. Foram sincronizadas as notas relevantes. A nota de abril dos citrinos deixou de misturar uma instrução de plantação com a poda; não foram alterados os dados de plantação.

Âmbito permitido em `plantas.json`: `poda`, `notas.podas` e `revisao.poda`, apenas nas nove fichas identificadas. Não se tocaram identificação, propagação, colheita ou restantes campos. Em `tratamentos.json`, a única alteração é retirar `revisao.adaptacao_local` da primeira intervenção da figueira: mantém `estado: suspenso`, `meses: []` e todos os restantes dados.

`sw.js`: cache `agenda-v41` → `agenda-v42`. `index.html` e `calendario.json` ficam idênticos à base. Esta entrega prepara um patch; não publica nem altera o repositório remoto.

## Fontes consultadas

Localizadores detalhados, data e aspetos sustentados constam também de `fontes/PODAS-0d9de9b.json` e dos nove registos em `plantas.json`.

- **V1 — CVRVV, Intervenções na videira.** [Página](https://viticultura.cvrvv.pt/pt/a-vinha/cultura/intervencoes-na-videira/). Época, produção, cuidados sanitários, desladroamento, desponta e desfolha.
- **V2 — CCDR-Norte, Norte Transmontano, circular 13/2025, 19 de novembro.** [PDF](https://agricultura.ccdr-n.pt/component/phocadownload/category/73-avisos-agricolas?download=859%3Acircular-13eant). Apenas medidas culturais das doenças do lenho.
- **P1 — RHS, Apples and pears: winter pruning.** [Página](https://www.rhs.org.uk/fruit/apples/winter-pruning). Repouso, âmbito das árvores adultas de copa livre, hábitos de frutificação e intensidade.
- **F1 — Rui Maia de Sousa / INIAV, Manual de Boas Práticas de Fruticultura: figueira.** [Cópia institucional ISA](https://fenix.isa.ulisboa.pt/downloadFile/844497944593242/Manual%20da_Figueira.pdf). Tipos de produção e poda; não foram adotadas receitas químicas.
- **F2 — RHS, Figs: pruning and training.** [Página](https://www.rhs.org.uk/fruit/figs/fig-pruning-and-training). Usada apenas a época relativa às geadas.
- **O1 — CCDR-Norte, Terra Quente, circular 1/2025, 28 de fevereiro.** [PDF](https://agrodigital.ccdr-n.pt/sia/Portals/0/Avisos/Circulares/TerraQuente/Circular%201%20Terra%20Quente.pdf). Poda de formação/frutificação; não se transferiu o calendário regional.
- **O2 — DRAP Centro, Tuberculose ou Ronha da Oliveira, 2013.** [Cópia CCDR Centro](https://www.ccdrc.pt/wp-content/uploads/2025/02/tuberculose_oliveira_2013.pdf). Apenas higiene/tempo seco; excluídas receitas e produtos.
- **K1 — Oregon State University Extension, Growing kiwifruit in your home garden, EM 9322.** [Página](https://extension.oregonstate.edu/catalog/em-9322-growing-kiwifruit-your-home-garden). Poda de plantas adultas, femininas/masculinas e perda de seiva após retoma da atividade.
- **K2 — CCDR-Norte, EDM, circular 01/2025, 12 de fevereiro, p. 2.** [PDF](https://portal.drapnorte.gov.pt/component/phocadownload/category/73-avisos-agricolas?download=803%3Acirc-01-2025-edm-12fev2025). PSA: trabalho em seco, ordem das plantas e lenhas.
- **K3 — DGAV, Plano de ação nacional para o controlo da PSA do kiwi, maio de 2013, § 8.1, pp. 17–18.** [PDF](https://www.drapnorte.gov.pt/drapn/conteudos/lca/PAN-PSA%20KIWI_2013.pdf). Usada apenas a higiene dos instrumentos; as obrigações e receitas históricas não foram dadas como atuais. O primeiro acesso falhou por timeout; a leitura posterior permitiu consultar a secção.
- **C1 — Universidade do Algarve, Poda de Citrinos na Região Mediterrânica. Manual Técnico, capítulo VII, pp. 45–47.** [PDF](https://sapientia.ualg.pt/bitstreams/6e3d4f25-edec-49f5-b852-ce776aafd6f1/download). Critérios de época por cultivar, frio e colheita. Não certifica março–maio em Sardoura.

## Verificação

- `node verificar.js --revisao`: sem erros; mantém o aviso já existente feijão/milho.
- `node revisao/testar-revisao.cjs`: 20/20 cenários.
- `node revisao/testar-tratamentos-inverno.cjs`: passa.
- `node revisao/testar-podas-inverno.cjs`: compara com a base exata, limita o diff às nove fichas/campos e ao metadado da figueira, confirma meses idênticos e compara **108 combinações** categoria/mês. Presenças e contagens iguais; restantes botões com as mesmas notas; condições novas visíveis na lógica de Podas.
- Resumo: nove fichas com revisão explícita; **22 parciais e uma suspensão** no conjunto, **2169 campos/intervenções sem registo**. Isto não é uma percentagem de exatidão agronómica.
- **Não concluído: renderização e atualização/offline em Chromium.** O Chromium local falhou ao iniciar; o browser remoto não conseguiu aceder à app local. Os testes Node não certificam apresentação visual, instalação do service worker nem funcionamento offline.

Depois de aplicar, verificar no browser Podas em dezembro, fevereiro, março e maio: texto do kiwi com machos/fêmeas, prudência da oliveira em fevereiro, fim da poda da videira condicionado em março, citrinos sem data fixa. Confirmar também a transição v41 → v42 e a leitura dos dados novos offline. No patch não há alteração de meses: o número de plantas/medidas deve permanecer igual em todos os meses.

## Aplicação

Na raiz do repositório, com a base indicada e sem alterações locais sobrepostas:

```sh
git apply --check /caminho/revisao-podas-inverno-0d9de9b.patch
git apply /caminho/revisao-podas-inverno-0d9de9b.patch
node verificar.js --revisao
node revisao/testar-revisao.cjs
node revisao/testar-tratamentos-inverno.cjs
node revisao/testar-podas-inverno.cjs
```

O teste novo exige que o commit base exista no histórico local. A revisão seguinte deve abranger as 65 fichas restantes e, separadamente, a validação local das janelas das nove aqui tratadas.

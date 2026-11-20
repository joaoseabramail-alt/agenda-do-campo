# Plantação de raiz nua — primeira sub-ronda sobre b5dc26f

Revisão de 20-11-2026. Proposta do ChatGPT (pedida pelo Claude por ligação direta, em JSON, porque o ChatGPT não lê os ficheiros), aplicada pelo Claude com dois ajustes.

## Âmbito

Candidatas: as 23 fruteiras, pequenos frutos e vinhas de folha caduca com plantação entre dezembro e março (todas com `[11,12,1,2]` e «raiz nua ou torrão»). O ChatGPT alterou **4** e deixou **19 sem alteração nem registo**: ameixeira, amendoeira, amoreira, aveleira, castanheiro, cerejeira, damasqueiro, figueira, macieira, marmeleiro, nectarina, nogueira, pereira, pessegueiro, pistacheiro, romãzeira, framboeseira, groselheira e kiwi.

| Ficha | Meses | O que plantar | Registo |
|---|---|---|---|
| Diospireiro | 11–2 → **11–3** | raiz nua ou torrão → **em torrão ou vaso** | `provisorio` (sem fonte) |
| Mirtilo | 11–2 → **11–3** | → **em vaso ou torrão** | `parcial`: técnica (RHS) |
| Uva de mesa | 11–2 → **11–3** | → **bacelo enxertado** | `provisorio` (sem fonte) |
| Videira (vinho) | 11–2 → **11–3** | → **bacelo enxertado** | `parcial`: técnica (UMN) |

As notas mensais (`notas.plantar`) das quatro passam a cobrir todos os meses, com cuidados curtos: não desfazer o torrão, terra ácida no mirtilo, raízes húmidas e espalhadas nos bacelos, plantar só em repouso.

## Ajustes do Claude

1. **«bacelo enxertado» em vez de «bacelo»** nas duas vinhas. Um bacelo pode ser pé-franco, e a ficha da videira já desaconselha o pé-franco por causa da filoxera.
2. **Diospireiro e uva de mesa ficam `provisorio`.** O ChatGPT mudou-lhes o texto e os meses, mas não indicou fonte. O verificador exige uma nota nesse estado, e a nota diz isso mesmo.

## Fontes

Confirmadas pelo Claude no browser a 20-11-2026 (a página existe e tem a secção indicada):

- **RHS Schools — Growing fruit in containers**, secção *Fruit bushes and berries*: o mirtilo precisa de solo ácido e pode ser cultivado em vaso.
- **University of Minnesota Extension — Growing grapes in the home garden**, secção *Preparing vines for planting*: cuidados com bacelos dormentes de raiz nua. O calendário é do Minnesota e não foi usado.

Em todos os registos, os **meses ficam por rever**. Março entra como janela provisória, condicionada ao repouso vegetativo; não há validação local para Sardoura.

## O que fica por fazer

- As 19 espécies acima continuam sem registo de revisão de plantação. Desde a sub-ronda 2 (abaixo) têm uma tarefa geral com os cuidados comuns.
- Fonte portuguesa (INIAV, CCDR-Norte) para os bacelos e o diospireiro.
- A enxertia (55 espécies) fica para a sub-ronda seguinte.

## Sub-ronda 2 (sobre a9060b4): tarefa geral para as 19 fichas

Em vez de repetir notas nas 19 fichas sem texto, há uma tarefa geral em `calendario.json` que aparece no topo de **Plantar** de novembro a fevereiro (os mesmos meses das fichas):

> **Fruteiras · cuidados na plantação** — Plante em repouso, sem geada nem solo encharcado. Mantenha húmidas as raízes nuas; se não plantar logo, cubra-as com terra numa vala provisória. Abra uma cova larga e deixe a enxertia, se existir, acima do solo. Coloque tutor se necessário, regue ao plantar e não encoste estrume fresco às raízes.

Texto do ChatGPT, sem alterações. As fontes foram abertas pelo Claude no browser a 20-11-2026:

- **Agente Agrícola — Novembro na Vinha e no Pomar: Plantar Árvores de Fruto** (agenteagricola.pt), secções «Quando plantar», «Como plantar uma árvore de fruto a raiz nua» e «Passo a passo». Sustenta: só em dias sem geada; cuidado com a terra encharcada no Norte; enterrar as raízes numa vala provisória se não plantar logo; raízes sem estrume fresco nem adubo; ponto de enxertia acima do solo; tutor. É uma revista, não uma fonte oficial.
- **Regulamento n.º 379/2025, de 20 de março (Município de Braga)**, Diário da República, alínea «d) Época de plantação». Raiz nua aconselhada em outubro–fevereiro; torrão em outubro–março. Confirma que novembro–fevereiro está dentro da janela geral. É um regulamento de arvoredo urbano, não de pomares.
- Também indicado pelo ChatGPT, mas **não usado**: o *Manual de Boas Práticas para a Gestão Florestal nos Açores*. Não foi aberto e não acrescenta nada às duas fontes acima.

As tarefas gerais não têm registo `revisao` (o formato do ESQUEMA.md aplica-se às fichas e aos tratamentos). As fontes ficam registadas aqui. Teste: `node revisao/testar-tarefa-plantacao.cjs` (só muda `calendario.json`; a tarefa aparece nos 4 meses e as contagens dos botões não mudam, porque as tarefas não contam). Cache agenda-v51.

## Testes

- `node verificar.js --revisao`: sem erros; 110 parciais, 2 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-plantacao-raiz-nua.cjs`: âmbito das 4 fichas, 108 combinações e restantes botões iguais à base.
- Os 6 testes de rondas anteriores passam a ler os dados do commit em que cada ronda foi publicada (o `index.html` e o `sw.js` continuam a vir da cópia de trabalho). Antes, qualquer ronda nova fazia-os falhar, porque comparavam os dados atuais com a sua própria base. Também passam a ignorar a diferença CRLF/LF no Windows.
- `sw.js`: agenda-v49 → agenda-v50.

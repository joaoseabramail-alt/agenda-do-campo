# Enxertia das ornamentais e florestais — primeira sub-ronda sobre 144774f

Revisão de 20-11-2026. O Claude abriu as fontes primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web.

## Ponto de partida

São 35 fichas com enxertia: 24 ornamentais e 11 florestais.
- **Quase todas sem notas:** 31 têm só fevereiro–março (ou meses parecidos), sem nota, e aparecem só pelo nome nas listas agrupadas por dificuldade.
- **Com notas ou nota geral:** a roseira, o castanheiro-da-índia, a magnólia-acuminata e a tramazeira.
- **Prioridade:** nesta sub-ronda, a roseira. O pinheiro-manso também era prioritário, porque em Portugal se enxerta para pinhão, mas ficou de fora.

## Roseira — `parcial` (técnica e texto)

- **Meses e dificuldade iguais:** julho–setembro, moderada.
- **Nota geral (nova):** «Se estiver seco, regue o porta-enxerto nas duas semanas antes; na primavera, corte acima da borbulha.»
- **Notas por mês:**
  - julho: «Borbulha em T em roseira-brava, com tempo fresco.»
  - agosto: «Use um ramo que já deu flor, sem folhas; ate com fita de borracha ou ráfia húmida.»
  - setembro: «Borbulha em T no fim do verão, com tempo fresco.»
- **Ajuste do Claude:** passou o texto do ChatGPT do infinitivo ao imperativo, como no resto da app.
- **Fonte:** RHS, *T-budding* (Quick facts; When to T-bud; How to T-bud), aberta pelo Claude no browser.
  - A borbulha em T é usada nas roseiras e noutras Rosáceas, do meio para o fim do verão, com tempo fresco.
  - Se estiver seco, regar os porta-enxertos nas duas semanas anteriores, para a casca levantar: a fonte diz que isto é crucial.
  - Na roseira, usar um ramo que já deu flor, com 3 ou 4 gomos, sem folhas.
  - Na primavera seguinte, cortar acima da borbulha.
- **Meses:** a fonte é britânica, por isso ficam por rever.

## Pinheiro-manso — não revisto

A fonte certa é o *Manual Ilustrado de Enxertia do Pinheiro Manso* (INIAV / Estação Florestal Nacional, 2007), em iniav.pt. É um PDF de cerca de 5 MB. Não foi descarregado nem lido, porque neste ambiente não há como ler PDFs. O mesmo acontece com o manual *Enxertia de Árvores de Fruto* (IPVC, RevitAGRI).

## Testes

- `node verificar.js --revisao`: sem erros; 123 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-roseira.cjs`: o resto da base fica igual.
- O teste do diospireiro passa a ler os dados de 144774f. Cache agenda-v58.

## Ficam por rever

- **As outras 34 ornamentais e florestais.**
- **As 14 plantas de fruto por rever:** castanheiro, cerejeira, amendoeira, damasqueiro (fonte), amoreira, aveleira, feijoa, figueira, medronheiro, nespereira, pistacheiro, romãzeira, kiwi, uva de mesa e videira.

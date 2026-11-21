# Enxertia da cerejeira e da amendoeira — sobre 3ca136f

Revisão de 21-11-2026. O Claude abriu as fontes primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web. É a primeira ronda das fruteiras que ficaram por rever, pela ordem combinada a partir do dossier técnico de enxertia de 20-11-2026.

## Cerejeira — `parcial` (técnica)

- **Meses e dificuldade iguais:** fevereiro, março e agosto; fácil.
- **Notas por mês:**
  - fevereiro: «Colha garfos dormentes do ano anterior, da grossura de um lápis; guarde-os no frio em saco fechado.»
  - março: «Enxerte com o porta-enxerto ativo: inglesa em tronco fino, fenda a partir de 5 cm, casca se for grosso.»
  - agosto: igual («Borbulha em T ou de lasca.»), por rever.
- **Fonte:** Oregon State University Extension, *Cherry tree grafting, how and when?*
  - Garfo por volta do fim de março (Oregon).
  - Inglês em tronco da grossura de um lápis; fenda a partir de cerca de 5 cm; fenda ou casca a partir de 7–10 cm.
  - Garfos do ano anterior colhidos dormentes, guardados no frigorífico em saco fechado com papel húmido.
  - Pega melhor com o solo e o ar a aquecer e o porta-enxerto ativo.
- **Ajustes do Claude:** o ChatGPT tinha tirado os critérios de diâmetro e de conservação dos garfos; o Claude repô-los. O ChatGPT propunha retirar agosto; o Claude manteve-o por rever, porque a fonte não fala da borbulha mas também não a contradiz.

## Amendoeira — `parcial` (técnica)

- **Meses e dificuldade iguais:** fevereiro, março, julho e agosto; fácil.
- **Notas:** julho e agosto passam a «Borbulha em T enquanto a casca do porta-enxerto descolar; o porta-enxerto habitual é o pessegueiro.» Fevereiro fica igual, por rever.
- **Fontes:**
  - UC Davis, *Almond Orchard Development* (Field Budding): borbulha no início do verão (Califórnia), que pode continuar enquanto a casca descolar; a borbulha em T é a mais comum.
  - Utah State University, *Almonds in the Home Garden*: propaga-se habitualmente sobre plântulas de pessegueiro.
- **Retirado:** «olho dormente», que nenhuma fonte refere.
- **Ajuste do Claude:** o ChatGPT propunha retirar todos os meses por falta de fonte mensal; o Claude manteve-os por rever, porque nenhuma fonte os contradiz.

## Notas sobre o dossier técnico

- A contagem estava certa: 27 fruteiras com enxertia, 13 revistas e 14 por rever. O damasqueiro, provisório, contava nas duas listas.
- Na tabela de decisão, o pistacheiro e a romãzeira parecem ter as preferências trocadas em relação às fichas.
- A fonte S10 (Utah State) não fala de épocas; serve só para o porta-enxerto.

## Testes

- `node verificar.js --revisao`: sem erros; 125 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-cerejeira-amendoeira.cjs`: o resto da base fica igual.
- O teste da roseira passa a ler os dados de 3ca136f. Cache agenda-v59.

## Ficam por rever

- **Nas duas:** os meses (fontes dos EUA); a borbulha de agosto da cerejeira; o garfo de fevereiro–março da amendoeira.
- **As 12 fruteiras seguintes:** aveleira, nespereira, feijoa; figueira, romãzeira, medronheiro; videira e uva de mesa; kiwi, pistacheiro; castanheiro, amoreira; e a fonte do damasqueiro.

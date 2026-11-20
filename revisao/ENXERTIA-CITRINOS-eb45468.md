# Enxertia — terceira sub-ronda sobre eb45468: citrinos

Revisão de 20-11-2026, feita entre o Claude e o ChatGPT por ligação direta. Abrange a laranjeira, o limoeiro e a tangerineira, que têm dados iguais.

## O que muda (meses e dificuldade iguais: abril–setembro, fácil)

- **Nota geral:** «Borbulha em T quando a casca do porta-enxerto descola com facilidade.» Só muda a palavra: «se solta» passa a «descola».
- **Notas mensais de abril, maio e agosto retiradas**, porque repetiam a nota geral. De abril a agosto, a linha mostra a nota geral.
- **Setembro:** «Borbulha cedo no mês, com calor para a união pegar; proteja o enxerto da geada.» A proposta do ChatGPT era «Fazer cedo, enquanto há calor suficiente para a união pegar.». O Claude acrescentou a proteção contra a geada, que a fonte indica para os enxertos de outono.

Decisão do ChatGPT, aceite: manter setembro. A fonte não justifica retirá-lo por causa do frio em Sardoura; a nota pede que se faça cedo e que se proteja o enxerto.

## Fonte (aberta pelo Claude no browser a 20-11-2026)

**UC Cooperative Extension Ventura County, *Answers to frequently asked questions about Citrus***. Secções «Budding and grafting of avocado and citrus»: «When to Bud or Graft», «Budding» e «How to make a T-bud». O que diz:
- a enxertia faz-se melhor na primavera ou no outono, quando a casca se separa facilmente da madeira, e cedo o bastante para o calor ajudar a união a pegar;
- os citrinos enxertados no outono têm de ser protegidos da geada;
- a borbulha é o método padrão nos citrinos, e a borbulha em T é geralmente o melhor método.

Sustenta **técnica e texto**. É da Califórnia costeira, mais amena do que Sardoura: os meses ficam por rever. Registos `parcial` nas três fichas.

## Testes

- `node verificar.js --revisao`: sem erros; 119 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-citrinos.cjs`: só mudam a nota geral, as notas mensais e os registos das 3 fichas. As 108 combinações, as contagens e as outras linhas ficam iguais à base.
- O teste dos Prunus passa a ler os dados de eb45468. Cache agenda-v54.

## Ficam por rever (enxertia)

- **Prunus:** cerejeira, amendoeira e uma fonte para o damasqueiro.
- **Outras plantas de fruto:** amoreira, aveleira, castanheiro, diospireiro, feijoa, figueira, medronheiro, nespereira, nogueira, oliveira, pistacheiro, romãzeira, kiwi, uva de mesa e videira.
- **As 35 ornamentais e florestais.**

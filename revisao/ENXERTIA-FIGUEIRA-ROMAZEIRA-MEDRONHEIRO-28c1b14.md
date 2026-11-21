# Enxertia da figueira, da romãzeira e do medronheiro — sobre 28c1b14

Revisão de 21-11-2026. O Claude abriu as fontes primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web. Nestas três plantas, a questão era se a enxertia deve aparecer no calendário.

## Figueira — `parcial` (técnica e texto)

- **Meses e dificuldade iguais:** março–abril, moderada; ficam por rever.
- **Nota geral (nova):** «Propague por estacas dormentes; raramente enxerte por borbulha de lasca ou placa, inglês ou fenda.»
- **Fonte:** UF/IFAS, *The Fig* (MG214), secção Propagation.
  - As figueiras propagam-se normalmente por estacas dormentes (cerca de 15 cm, com a base em madeira de 2 anos).
  - Raramente se propagam por borbulha de lasca ou de placa, ou por enxerto inglês, lateral, de incrustação ou de fenda.
- **Na app:** o método recomendado da ficha já era a estaca, por isso a linha da enxertia não diz «Método recomendado».

## Romãzeira — `parcial` (texto)

- **Meses e dificuldade iguais:** março–abril, moderada; a técnica e os meses ficam por rever.
- **Nota geral (nova):** «Propague de preferência por estacas lenhosas, colhidas no fim do outono ou início do inverno.»
- **Fontes:**
  - UGA, *Pomegranate Production* (C 997): as estacas lenhosas são o meio preferido (madeira do ano, da grossura de um lápis, no fim do outono ou início do inverno).
  - UF/IFAS, *The Pomegranate* (MG056): propaga-se facilmente no inverno por estacas lenhosas; a mergulhia também resulta.
- **Ainda sem fonte para a enxertia:** nenhuma das duas fontes fala de enxertia. A enxertia continua no calendário, porque não há fonte que a contradiga. O guia UF/IFAS HS1349, citado no dossier, ficou por abrir.
- **Ajuste do Claude:** acrescentou a época de colheita das estacas, que vem na fonte da UGA.

## Medronheiro — `suspenso`

- **Meses:** retirados fevereiro e março. A enxertia deixa de aparecer no calendário.
- **Motivo:** não se encontrou fonte fiável sobre a enxertia do medronheiro.
  - O dossier técnico e a pesquisa do Claude só encontraram trabalhos sobre estacas, semente e micropropagação.
  - Encontraram também um guia de jardinagem que fala de enxertia, mas sem porta-enxerto, sem época e sem resultados.
- **Repor** quando houver uma fonte com a técnica, o porta-enxerto e a época.

## Testes

- `node verificar.js --revisao`: sem erros; 131 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-figueira-romazeira-medronheiro.cjs`: o resto da base fica igual; o medronheiro já não aparece na enxertia em nenhum mês.
- O teste da aveleira, da nespereira e da feijoa passa a ler os dados de 28c1b14. Cache agenda-v62.

## Ficam por rever

- **Fruteiras:** videira e uva de mesa; kiwi e pistacheiro; castanheiro e amoreira; e a fonte do damasqueiro.
- **As outras 33 ornamentais e florestais.**

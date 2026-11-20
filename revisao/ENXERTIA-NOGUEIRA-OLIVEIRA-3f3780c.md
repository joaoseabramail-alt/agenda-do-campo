# Enxertia — quarta sub-ronda sobre 3f3780c: nogueira e oliveira

Revisão de 20-11-2026. Desta vez o Claude procurou e abriu as fontes primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web (assim os pedidos não excedem o tempo de espera).

## Nogueira — `parcial` (técnica)

- **Meses:** [3,4,5,6] → **[4,5,6,8,9]**.
  - Sai março: a fonte diz que o garfo se faz depois de o porta-enxerto ter folhas.
  - Entram agosto e setembro: borbulha de outono, do fim de agosto a meados de setembro.
- **Sai a regra dos «15 °C»:** a fonte não a dá. Pesquisas sobre o calo da nogueira apontam para temperaturas bem mais altas, mas não foram usadas como fonte.
- **Nota geral:** «A inglesa é o garfo mais comum; a borbulha de placa é frequente e a de T também resulta.»
- **Notas por mês:**
  - abril e maio: «Garfo só com o porta-enxerto já com folhas; corte-o 7–10 dias antes, para escorrer a seiva.»
  - junho: «Garfo ou placa; evite as duas semanas antes e depois de chuva forte, por causa da seiva.»
  - agosto e setembro: borbulha de placa ou em T, quando a casca descolar nos dois ramos.
- **Ajuste do Claude:** a proposta do ChatGPT dizia «Garfo no fim da primavera, depois de o porta-enxerto ter folhas» em abril, maio e junho, e perdia o conselho da seiva, que a fonte apresenta como o principal problema. O Claude repôs esse conselho em abril, maio e junho.
- **Fonte:** UC Davis Fruit & Nut Research and Information Center, *Walnut Propagation*, secções Budding, Patch & T-budding e Grafting. É da Califórnia: os meses ficam por rever.

## Oliveira — `provisorio`

- **Meses iguais:** [3,4,5].
- **Nota geral:** «Na enxertia de coroa, os garfos são colocados entre a casca e a madeira.»
- **Abril e maio:** «A coroa faz-se na primavera, quando a casca descola.»
- **Sai a borbulha de maio**, que não tinha fonte.
- **Base:** a Revista Jardins, «Enxertia: o que é, quando fazer e quais os principais tipos», descreve a coroa em geral: primavera, quando a casca se destaca, em ramos ou troncos grossos. Mas não fala da oliveira. Por isso fica provisória.
- **Candidata a fonte:** o manual *Enxertia de Árvores de Fruto* (J. Raúl Rodrigues, projeto RevitAGRI, IPVC). É um PDF e não foi lido.

## Testes

- `node verificar.js --revisao`: sem erros; 121 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-nogueira-oliveira.cjs`: as outras plantas e os outros botões ficam iguais à base.
- O teste da plantação da vinha passa a ler os dados de 3f3780c. Cache agenda-v56.

## Ficam por rever (enxertia)

- **Plantas de fruto:** cerejeira, amendoeira, damasqueiro (fonte), amoreira, aveleira, castanheiro, diospireiro, feijoa, figueira, medronheiro, nespereira, pistacheiro, romãzeira, kiwi, uva de mesa e videira.
- **As 35 ornamentais e florestais.**

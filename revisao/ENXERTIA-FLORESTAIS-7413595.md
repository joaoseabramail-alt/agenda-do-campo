# Enxertia das florestais — sobre 7413595

Revisão de 24-11-2026: carvalho-alvarinho, carvalho-negral, carvalho-dos-pântanos, sobreiro, cerejeira-brava, vidoeiro e azevinho.

- O ChatGPT procurou as fontes na web, em dois pedidos, porque o primeiro excedeu o tempo. O Claude abriu-as no browser.
- O ChatGPT escreveu as notas sem consultar a web. O Claude repôs na nota dos carvalhos o motivo que a fonte dá e começou a do sobreiro pela bolota.

Todas ficam `parcial`. A dificuldade não muda.

**Conclusão comum:** nestas árvores, a enxertia é coisa de viveiro, para clones e cultivares. O normal é a semente, e as notas passam a dizê-lo.

## Carvalhos: alvarinho, negral e dos pântanos (só texto)

- **Meses iguais:** fevereiro–março. Ficam por rever, tal como o método.
- **Nota:** «Prefira a bolota: enxerte só cultivares ou clones escolhidos; a enxertia tende a encurtar a vida da árvore.»
- **Trees and Shrubs Online (Quercus):**
  - os carvalhos devem criar-se de bolota sempre que possível;
  - a enxertia fica para variedades especiais, espécies raras e clones, e só quando é mesmo necessária;
  - tende a encurtar a vida da árvore e a atrasar o crescimento.

## Sobreiro (só texto)

- **Meses iguais:** fevereiro–março. Ficam por rever.
- **Nota:** «Prefira a bolota; a enxertia, de árvores escolhidas pela cortiça, exige garfo e porta-enxerto compatíveis.»
- **iForest (revisão de 2023):**
  - a planta de bolota em viveiro é a técnica mais usada;
  - a enxertia de árvores escolhidas pela cortiça tem dado bons resultados;
  - o êxito depende sobretudo da compatibilidade entre o garfo e o porta-enxerto.

## Cerejeira-brava (técnica e texto)

- **Meses iguais:** fevereiro–março. Ficam por rever.
- **Nota:** «Garfo dormente de cerca de 15 cm e 3 gomos: lateral antes da rebentação; inglês em março ou início de abril.»
- **EFSA (viveiros do Reino Unido):**
  - a maioria dos viveiros não enxerta e usa semente;
  - quando enxertam, fazem garfo lateral no fim do inverno ou no início da primavera, e inglês em março ou no início de abril.

## Vidoeiro (meses, técnica e texto)

- **Meses: de fevereiro–março para janeiro–fevereiro.**
  - Março sai, por ficar fora do intervalo da fonte.
  - Janeiro entra.
- **Nota:** «A maioria dos viveiros não enxerta; quando o faz, usa garfo lateral ou inglês, de novembro a fevereiro.»
- **EFSA (viveiros do Reino Unido, *B. pendula* e *B. pubescens*):** a maioria dos viveiros não enxerta; quando enxertam, fazem garfo lateral ou inglês, de novembro a fevereiro.

## Azevinho (técnica e texto)

- **Meses iguais:** fevereiro–março. Ficam por rever.
- **Nota:** «Variedades: não se mantêm por semente; use estaca ou enxerte na primavera sobre azevinho de semente.»
- **Trees and Shrubs Online (*Ilex aquifolium*):** as variedades propagam-se por estaca ou por enxertia, esta na primavera, sobre plântulas da espécie.

## Sem alterações

- **Freixo:** as fontes encontradas são de investigação sobre a doença do freixo, sem orientação prática para a enxertia.

## Testes

- `node verificar.js --revisao`: sem erros; 153 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-florestais.cjs`: o resto da base fica igual.
- O teste da 2.ª ronda das ornamentais passa a ler os dados de 7413595.
- Cache agenda-v71.

## Ficam por rever

- **16 plantas:**
  - freixo, tramazeira e lilás (sem fonte suficiente);
  - árvore-de-ferro, azereiro, cornus-kousa, ginkgo, liquidâmbar, olaia, pilriteiro, plátano, stewartia, tília, buganvília, hibisco e osmanto.
- **Fruteiras:** a amoreira e a fonte do damasqueiro.

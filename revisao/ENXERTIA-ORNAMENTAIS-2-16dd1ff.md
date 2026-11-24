# Enxertia das ornamentais, 2.ª ronda — sobre 16dd1ff

Revisão de 24-11-2026: castanheiro-da-índia, camélia, azálea e hamamélis. A tramazeira e o lilás ficaram sem alterações.

- O ChatGPT procurou as fontes na web e o Claude abriu-as no browser.
- O ChatGPT escreveu as notas sem consultar a web. O Claude reescreveu as da camélia, da azálea e da hamamélis, para serem mais claras.

Todas ficam `parcial`.

## Castanheiro-da-índia (técnica)

- **Meses:** fevereiro–março e, **acrescentados, julho e agosto**, com a nota «Borbulha em lasca.»
- **RHS ('Baumannii'):** estacas lenhosas do início a meados do inverno, ou borbulha em lasca de meados ao fim do verão.
- **A nota geral mantém-se, mas sem fonte aberta.**
  - A nota é «cultivares sobre porta-enxerto de semente».
  - Fica por rever, tal como fevereiro–março.
  - A revisão da *Biological Flora* (Wiley) pediu uma verificação anti-robô e não foi lida.

## Camélia (técnica e texto)

- **Meses iguais:** fevereiro–abril. Ficam por rever.
- **Nota:** «Fenda sobre camélia em vaso da grossura de um lápis; mantenha húmido debaixo de um frasco, à sombra.»
- **Southern California Camellia Society:**
  - fenda, em geral em fevereiro ou no início de março;
  - porta-enxerto: camélia em vaso da grossura de um lápis, ou uma camélia velha cortada;
  - garfo de madeira madura;
  - sempre húmido debaixo de um frasco, à sombra.

## Azálea (meses, técnica e texto)

- **Meses: de março–maio para janeiro–fevereiro**, porque a fonte os contradiz.
- **Nota geral:** «Nas azáleas, prefira estacas: as enxertadas deitam muitos rebentos do porta-enxerto.»
- **Janeiro e fevereiro:** «Garfo lateral sobre rododendro novo da grossura de um lápis, logo acima do colo; em estufa aquecida.»
- **Trees and Shrubs Online:**
  - os viveiristas ainda enxertam rododendros, sobretudo para multiplicar depressa uma seleção nova;
  - garfo lateral em janeiro ou fevereiro, sobre *R. ponticum* novo, em estufa aquecida;
  - as azáleas de folha caduca hoje raramente se enxertam, e as enxertadas devem evitar-se.
- **Dificuldade:** fica por rever.

## Hamamélis (só texto)

- **Meses iguais:** janeiro–março. Ficam por rever, tal como o método.
- **Nota:** «Cultivares sobre H. virginiana ou H. vernalis; corte os rebentos que nasçam do porta-enxerto.»
- **UMass Extension:** as cultivares enxertam-se muitas vezes sobre *H. vernalis* ou *H. virginiana*, e os rebentos do porta-enxerto devem ser cortados.

## Sem alterações

- **Tramazeira:** Trees and Shrubs Online só fala do género *Sorbus*: recomenda a semente sempre que possível, mas admite que às vezes é preciso enxertar. Não dá método, época nem porta-enxerto.
- **Lilás:** a única fonte encontrada foi um artigo de 1960 no Papers Past (Nova Zelândia), mas o texto não está na página.

## Testes

- `node verificar.js --revisao`: sem erros; 146 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-ornamentais-2.cjs`: o resto da base fica igual.
- O teste da 1.ª ronda passa a ler os dados de 8ae131a.
- Cache agenda-v70.

## Ficam por rever

- **Ornamentais e florestais (23):**
  - tramazeira e lilás (sem fonte suficiente);
  - árvore-de-ferro, azereiro, azevinho, carvalhos (alvarinho, dos pântanos, negral), cerejeira-brava, cornus-kousa, freixo, ginkgo, liquidâmbar, olaia, pilriteiro, plátano, sobreiro, stewartia, tília, vidoeiro, buganvília, hibisco e osmanto.
- **Fruteiras:** a amoreira e a fonte do damasqueiro.

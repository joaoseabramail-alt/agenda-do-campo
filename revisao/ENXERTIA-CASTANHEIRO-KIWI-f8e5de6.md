# Enxertia do castanheiro e do kiwi — sobre f8e5de6

Revisão de 23-11-2026. As fontes são o quadro de Bizkaia, já lido na ronda da vinha, a página da FAO e a página do IPB, abertas pelo Claude. O ChatGPT escreveu as notas sem consultar a web.

## Leitura do quadro de Bizkaia

O Claude mediu a posição de cada célula na página (texto extraído com o pypdf, mantendo a disposição) e comparou-a com os cabeçalhos das colunas.

- **Castanheiro (linha CASTAÑO):**
  - fenda: abril;
  - inglês: abril;
  - borbulha em escudo: agosto–setembro;
  - placa: abril–maio.
  - Há ainda «Agosto-Sept.» na coluna da coroa. Não se usou: é a posição menos segura, e a coroa no fim do verão é pouco habitual.
- **Kiwi (linha KIWI):**
  - garfo lateral: março–abril;
  - coroa: maio;
  - borbulha: agosto–setembro (na coluna da placa ou do escudo; a posição não permite separar);
  - lasca: abril–maio e setembro.
- **Texto geral (p. 5):** nos enxertos de primavera, a vegetação do porta-enxerto deve estar mais adiantada do que a do garfo.

## Castanheiro — `parcial` (técnica e texto)

- **Meses:** de março–junho para **março–junho, agosto e setembro**. Entram agosto e setembro, com a borbulha em escudo. Março e junho ficam por rever, porque o quadro não os refere.
- **Dificuldade:** igual (moderada).
- **Nota geral:** «Coroa em abril, flauta em maio–junho.» passa a «Em plântulas, fenda ou lasca; em rebentos de talhadia com 4–5 cm, coroa.» (FAO). A coroa sai de abril, porque o quadro não a põe nesse mês.
- **Notas por mês:**
  - abril: «Fenda ou inglês, com o porta-enxerto mais adiantado que o garfo; garfos dormentes guardados no frio.»
  - maio: «Placa ou flauta (canutilho), com borbulhas do ano.»
  - junho: igual (flauta quando a casca se separa com facilidade).
  - agosto e setembro: «Borbulha em escudo (T): o gomo pega agora e só rebenta na primavera seguinte.»
- **Outras fontes:**
  - FAO, projeto da Universidade de Florença: em plântulas, a fenda e a lasca são os melhores métodos; em rebentos de talhadia com 4–5 cm, a coroa.
  - IPB: a flauta é tradicional no castanheiro.

## Kiwi — `parcial` (técnica e texto)

- **Meses:** de fevereiro–março para **fevereiro–maio, agosto e setembro**. Fevereiro fica sem nota e por rever: nenhuma fonte o refere nem o contradiz.
- **Dificuldade:** igual (moderada).
- **Notas por mês (novas):**
  - março: «Garfo lateral, com o porta-enxerto mais adiantado que o garfo.»
  - abril: «Garfo lateral ou borbulha em lasca, com o porta-enxerto mais adiantado que o garfo.»
  - maio: «Enxertia de coroa ou borbulha em lasca.»
  - agosto: «Borbulha de placa ou em escudo: o gomo só rebenta na primavera seguinte.»
  - setembro: «Borbulha de placa, em escudo ou em lasca: só rebenta na primavera seguinte.»
- **O PDF da UC Davis** sobre o kiwi continua por ler (não se descarregou).

## Ajuste do Claude

O ChatGPT pôs «enxerte quando o porta-enxerto estiver mais adiantado que o garfo» na nota geral, que aparece em todos os meses, incluindo agosto. O Claude passou-a para as notas da primavera.

## Testes

- `node verificar.js --revisao`: sem erros; 135 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-castanheiro-kiwi.cjs`: o resto da base fica igual. As contagens só mudam nos meses que entram.
- O teste da vinha passa a ler os dados de f8e5de6. Cache agenda-v64.

## Ficam por rever

- **Fruteiras:** o pistacheiro, a amoreira e a fonte do damasqueiro. O quadro de Bizkaia não tem nenhuma destas três.
- **As outras 33 ornamentais e florestais.**

# Enxertia do pinheiro-manso — sobre e31c267

Revisão de 21-11-2026. O PDF da fonte foi descarregado com autorização do utilizador, e o Claude extraiu e leu o texto (pypdf). O ChatGPT não o conseguiu abrir (403) e escreveu as notas a partir dos excertos que o Claude lhe passou, sem consultar a web.

## Pinheiro-manso — `parcial` (meses, técnica e texto)

- **Meses:** de março–maio para **abril–maio**. Março sai, porque fica fora da época do manual.
- **Dificuldade:** igual (difícil), por rever; o manual não fala disso.
- **Nota geral (nova):** «Fenda cheia terminal no lançamento do ano de um pinheiro com 2–3 anos de plantação, vigoroso e são.»
- **Notas por mês:**
  - abril: «Enxerte na segunda quinzena, quando as agulhas do garfo começam a despontar sob as escamas.»
  - maio: «Até meados do mês. Garfo em bisel até 6 cm, fita PVC e, por cima, saco de papel com plástico furado.»
- **Fonte:** INIAV / Estação Florestal Nacional, *Manual Ilustrado de Enxertia do Pinheiro Manso* (2007).
  - Planeamento da Enxertia (pp. 15–19 do manual):
    - técnica de fenda cheia terminal;
    - «geralmente» entre a última quinzena de abril e a primeira de maio, conforme o desenvolvimento dos garfos e dos porta-enxertos;
    - porta-enxerto no 2.º ou 3.º ano depois da plantação, vigoroso, são, com o lançamento principal ligeiramente avermelhado;
    - garfo do lançamento do ano, com as agulhas a começar a despontar sob as escamas;
    - garfos guardados a 4 °C, no máximo 2–3 dias, e nunca no congelador.
  - A Técnica da Enxertia (pp. 21–24):
    - enxertar no lançamento mais vigoroso do ano;
    - garfo em bisel, com 6 cm no máximo;
    - apertar com fita PVC;
    - cobrir com um saco de papel kraft com um saco de plástico perfurado por dentro;
    - tirar o papel 1–1,5 meses depois e o plástico antes do fim do verão;
    - tirar a fita pouco antes da primavera seguinte.
- **Adaptação local:** `documentada`. É um manual nacional; em Sardoura, guie-se pelas agulhas do garfo a despontar.
- **Ajustes do Claude:** o ChatGPT tinha tirado a idade do porta-enxerto, o sinal das agulhas e o saco de cobertura. O Claude repô-los.

## O PDF do kiwi

O PDF da UC Davis sobre o kiwi (*Kiwifruit Propagation*, ucanr.edu) não se descarregou, porque o servidor não respondeu, e o ChatGPT também não o conseguiu abrir. O kiwi continua por rever.

## Testes

- `node verificar.js --revisao`: sem erros; 126 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-pinheiro-manso.cjs`: o resto da base fica igual. Em março, a enxertia perde o pinheiro-manso; em abril, a lista «Difícil», que só tinha o pinheiro-manso, dá lugar à linha dele, com as notas.
- O teste da cerejeira e da amendoeira passa a ler os dados de e31c267. Cache agenda-v60.

## Ficam por rever

- **As outras 33 ornamentais e florestais.**
- **Nas fruteiras:** aveleira, nespereira, feijoa; figueira, romãzeira, medronheiro; videira e uva de mesa; kiwi, pistacheiro; castanheiro, amoreira; e a fonte do damasqueiro.

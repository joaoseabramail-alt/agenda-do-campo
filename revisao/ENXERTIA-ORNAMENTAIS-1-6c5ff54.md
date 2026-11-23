# Enxertia das ornamentais, 1.ª ronda — sobre 6c5ff54

Revisão de 23-11-2026: bordo-japonês, cerejeira-do-Japão, glicínia e três magnólias.

- O ChatGPT procurou as fontes na web e o Claude abriu-as no browser.
- O ChatGPT escreveu as notas sem consultar a web. O Claude passou-as para a forma de tratamento da app e repôs os critérios concretos das fontes.

Todas ficam `parcial`: os meses e a dificuldade ficam por rever, porque as fontes são de outros climas.

## Bordo-japonês (técnica e texto)

- **Meses iguais:** fevereiro–março.
- **Nota:** «Garfo lateral sobre bordo-japonês de semente com 1–3 anos, gomos a inchar; ate com fita e cubra com cera.»
- **Alabama Extension:**
  - garfo lateral de revestimento no inverno, do fim de janeiro ao início de março;
  - porta-enxerto: *Acer palmatum* de semente, com os gomos a inchar, aquecido 1–2 semanas em estufa;
  - garfo dormente.
- **RHS:** as cultivares de *A. palmatum* enxertam-se sobre *A. palmatum*.

## Cerejeira-do-Japão (técnica e texto)

- **Meses:** fevereiro–março e, **acrescentados, julho e agosto.**
- **Nota geral:** «Porta-enxerto: cerejeira-brava (Prunus avium).»
- **Notas por mês:**
  - fevereiro e março: «Enxerte de garfo antes de a seiva subir.»
  - julho e agosto: «Faça borbulha em lasca.»
- **Fontes:**
  - RHS, 'Kanzan': propaga-se por borbulha em lasca ou por enxertia;
  - RHS, ornamentais: enxertia de garfo no início da primavera; borbulha do meio do verão ao início do outono;
  - Oregon State: as cultivares enxertam-se muitas vezes sobre *P. avium*.

## Glicínia (só texto)

- **Meses iguais:** dezembro–fevereiro. Ficam por rever, tal como a técnica.
- **Nota:** «Enxertia de viveirista, para as cultivares com nome; em casa, prefira a mergulhia no verão.»
- **RHS:**
  - os viveiristas enxertam-na e as cultivares com nome são quase sempre enxertadas;
  - para quem a tem em casa, a mergulhia no verão é o mais fácil;
  - não dá época, método nem porta-enxerto.

## Magnólia-de-flor-grande (técnica e texto)

- **Meses iguais:** fevereiro–março.
- **Nota:** «Garfo lateral sobre magnólia-de-flor-grande de semente.»
- **Trees and Shrubs Online:** as cultivares enxertam-se no inverno sobre plantas de semente da mesma espécie (América do Norte).

## Magnólia-estrelada e magnólia-pepino (técnica e texto)

- **Meses:** fevereiro–março e, **acrescentado, agosto.**
- **Nota geral:** «Porta-enxerto: magnólia de semente (na Europa, Magnolia kobus).»
- **Notas por mês:**
  - fevereiro: «Enxertia de mesa.»
  - março: «Enxertia à inglesa ou borbulha em lasca.»
  - agosto: «Garfo lateral, o mais habitual, ou borbulha em lasca.»
- **Fontes:**
  - Trees and Shrubs Online: nas magnólias de folha caduca, o habitual é o garfo lateral no verão (agosto é típico na Grã-Bretanha), sobre *M. kobus* na Europa;
  - WVU (género *Magnolia*): enxertia de mesa no inverno, inglês ou borbulha em lasca na primavera, borbulha em lasca no verão.
- **Limite:** nenhuma das fontes trata especificamente estas duas espécies.
- Na magnólia-pepino, a nova nota substitui «Enxertia de garfo em porta-enxerto de magnólia de semente».

## Testes

- `node verificar.js --revisao`: sem erros; 142 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-ornamentais-1.cjs`: o resto da base fica igual.
- O teste do pistacheiro passa a ler os dados de 76f5133.
- Cache agenda-v68.

## Ficam por rever

- 27 ornamentais e florestais, entre elas o castanheiro-da-índia, a tramazeira, a camélia, a azálea, o lilás, a hamamélis, os carvalhos e o sobreiro.
- A amoreira e a fonte do damasqueiro.

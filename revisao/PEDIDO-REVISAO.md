# Pedido de revisão cruzada — Agenda do Campo

Revisão de base: o último commit do ramo `main` (ver o histórico). Ficheiros: `plantas.json` (v3), `tratamentos.json` (v3), `calendario.json` (v2), `verificar.js`, `index.html`, `ESQUEMA.md`.

## O que o Claude já testou nesta ronda

- `node verificar.js`: sem erros. O verificador passou a validar também os meses de `divisao` e de `recolha_sementes`, métodos recomendados sem dados na ficha, intervenções fora do período de vigilância e notas que a app nunca mostra.
- Browser (Chrome, largura de telemóvel): as 108 combinações de botão e mês sem erros e sem a página ficar mais larga do que o ecrã. Também funciona sem internet depois da primeira visita, o modo escuro fica legível e as datas aceitam anos bissextos (29/02/2028).
- Corrigido: 14 meses de intervenção em `tratamentos.json` estavam fora do período de vigilância do grupo (tratamentos de inverno da macieira e pereira, pessegueiro, cerejeira, amendoeira, citrinos e figueira). Agora a vigilância inclui sempre os meses de intervenção.

## O que precisa de revisão agronómica (com fontes)

1. **85 notas escondidas** (`revisao/notas-escondidas.txt`). São notas do calendário antigo que caem fora dos meses da operação na ficha, por isso a app não as mostra. Para cada uma: (a) alargar os meses da operação, (b) mover a nota para outro botão (por exemplo, separar alporques em setembro), ou (c) apagar a nota. Exemplos: o desladroamento da videira em abril, a poda da nogueira em setembro, as estacas da figueira em outubro, a enxertia de flauta do castanheiro em junho, a borbulha de olho vivo da cerejeira em junho, a colheita de garfos em janeiro.
2. **15 culturas alimentares sem ficha de tratamentos:** amoreira, aveleira, diospireiro, marmeleiro, medronheiro, nespereira, pistacheiro, batata-doce, beterraba, chicória, endívia, espargo, milho, nabo e rabanete. Algumas já têm intervenções escritas noutros sítios (por exemplo, o pedrado e a mosca da nespereira, o bichado da aveleira e o cancro do marmeleiro).
3. **44 podas com texto genérico** ("Poda de inverno de forma e limpeza"). Faltam o tipo e o objetivo da poda por espécie (formação, frutificação, renovação), sobretudo nas fruteiras: macieira, pereira, pessegueiro, nectarina, figueira, mirtilo, etc.
4. **Meses sem nenhuma operação:** alporquia em março e dezembro, e sementeira de viveiro em agosto e setembro. Confirmar se é correto.
5. **Colheita das fruteiras:** os meses ainda são um intervalo geral. Falta distinguir as variedades precoces, médias e tardias.
6. **Os campos ainda vazios** (`adubacao`, `rega`, `exposicao`, `solo`, `floracao`, `resistencia_geada`) só devem ser preenchidos com fontes, mantendo os nomes dos campos.

## Melhorias da app propostas pelo Claude (para discussão, ainda não feitas)

- A contagem de Plantar (por exemplo, "97 culturas" em novembro) soma todas as espécies dos grupos de árvores. Talvez deva contar só os itens da lista.
- O campo da data ocupa 4 paragens da tecla Tab (dia, mês, ano e calendário). É aceitável, mas pode ser simplificado.
- Um filtro "Só as minhas plantas", quando existir o registo de plantas, reduziria as listas longas de abril e maio.

## Forma de entrega

Um patch sobre o último commit do `main`, como da última vez. Antes de entregar, correr `node verificar.js`, que tem de terminar sem erros. O Claude aplica o patch, corre o verificador, testa no browser as 108 combinações e publica.

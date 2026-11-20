# Enxertia — quinta sub-ronda sobre dc82cc9: diospireiro

Revisão de 20-11-2026. O Claude abriu a fonte primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web.

## Diospireiro — `parcial` (técnica)

- **Meses e dificuldade iguais:** [3,4], moderada.
- **Março:** «Inglesa em repouso, com garfos de dois gomos colhidos dormentes e guardados no frio.» Antes dizia «Enxertia de fenda ou coroa no fim do mês, com garfos guardados no frio.»
- **Abril (nota nova):** «Borbulha em lasca desde o início do crescimento até cerca de um mês após surgirem folhas.»
- **Sai a fenda:** a fonte reserva a fenda no topo sobretudo para mudar a variedade em árvores velhas.
- **Ajuste do Claude:** o ChatGPT pôs a conservação dos garfos numa nota geral. Essa nota apareceria também em abril, junto à borbulha, por isso o Claude juntou-a à nota de março.
- **Fonte:** UF/IFAS, *HS1389: Japanese Persimmon Cultural Practices in Florida*, secções Propagation e Grafting Methods. Aberta pelo Claude no browser.
  - Os métodos comuns são a inglesa, feita no repouso, e a borbulha em lasca.
  - Os garfos colhem-se dormentes, antes de os gomos incharem, e guardam-se no frio.
  - A borbulha em lasca de primavera vai do início do crescimento até cerca de um mês depois das folhas; a de outono faz-se mais de seis semanas antes da primeira geada.
- **Meses:** a fonte é da Florida, por isso ficam por rever.
- **Borbulha de outono:** fica por decidir. Com geadas em novembro, seria entre meados de setembro e meados de outubro, mas falta confirmar em Sardoura.

## Castanheiro — não revisto

- **Fontes oficiais recusadas:** as duas melhores páginas encontradas não abriram, porque o browser recusou a navegação: a Direção Regional de Agricultura da Madeira («A enxertia do castanheiro») e o site Ruralidades.
- **Fonte genérica:** a Revista Jardins associa a coroa ao castanheiro, mas sem meses nem a enxertia de flauta.

## Testes

- `node verificar.js --revisao`: sem erros; 122 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-diospireiro.cjs`: o resto da base fica igual.
- O teste da nogueira e da oliveira passa a ler os dados de dc82cc9. Cache agenda-v57.

## Ficam por rever (enxertia)

- **Plantas de fruto:** castanheiro, cerejeira, amendoeira, damasqueiro (fonte), amoreira, aveleira, feijoa, figueira, medronheiro, nespereira, pistacheiro, romãzeira, kiwi, uva de mesa e videira.
- **As 35 ornamentais e florestais.**

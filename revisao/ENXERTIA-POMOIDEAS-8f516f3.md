# Enxertia — primeira sub-ronda sobre 8f516f3: macieira, pereira e marmeleiro

Revisão de 20-11-2026, feita entre o Claude e o ChatGPT por ligação direta (o ChatGPT não lê os ficheiros; recebe os dados no pedido e responde em JSON).

## Como correu

- O pedido abrangia as 27 plantas de fruto com enxertia. O ChatGPT só reviu **3**: macieira, pereira e marmeleiro.
- Na primeira versão, algumas notas ficaram menos informativas do que as atuais. Por exemplo, "quando os gomos do porta-enxerto começam a inchar" passou a "ajuste à rebentação". O Claude contestou isso.
- Os dois pedidos seguintes, que incluíam os Prunus, excederam o tempo de espera, porque o ChatGPT ia pesquisar à web.
- A versão final das notas saiu de um pedido mais curto, sem pesquisa nova, que só usava as fontes já confirmadas.

## O que muda (meses e dificuldade iguais)

| Ficha | Antes | Depois |
|---|---|---|
| Macieira | Fenda (2), fenda ou coroa e «Época principal em Castelo de Paiva» (3), borbulha (8–9); nota geral «Fenda em fevereiro–março; borbulha em agosto.» | Garfo em 2–3 «quando os gomos do porta-enxerto começam a inchar»; borbulha em T em 8–9 «casca que descola e olho dormente que rebenta na primavera seguinte». Nota geral retirada (redundante). |
| Pereira | Igual à macieira | Fenda em 2–3, com o mesmo critério; borbulha em escudo em 8–9. Mantém-se a nota geral sobre porta-enxertos. |
| Marmeleiro | Igual em 2–3; nota longa em 8 | Garfo em 2–3; borbulha em T em 8. |

Retirada nas três a afirmação «Época principal em Castelo de Paiva», que nunca teve validação local. A coroa deixou de aparecer em março. Fica coberta pela palavra «garfo» na macieira e no marmeleiro, mas não na pereira, onde a fonte só fala de fenda.

## Fontes (abertas pelo Claude no browser a 20-11-2026)

- **F1 — IPB/ESA, *Biologia da reprodução das plantas com flor*, «2. Tipos de reprodução assexuada»**, tipos de enxertia (garfo e gomo). A enxertia de garfo (fenda, inglesa, coroa…) faz-se «geralmente no final do inverno/início da primavera, pouco antes do abrolhamento». É genérica: não fala de espécies. Sustenta a **técnica** nas três.
- **F2 — Revista Jardins, «Método biológico da pereira»**, Técnicas de cultivo: Multiplicação. Na pereira, escudo em agosto–setembro e fenda em fevereiro–março. Sustenta **técnica e meses** só na pereira (referência geral, não de Sardoura).
- Também confirmadas, mas não usadas nos registos: UGA, *Propagating Deciduous Fruit Plants Common to Georgia* (B818), sobre porta-enxertos; OSU, *Propagating Fruit Trees by Budding*.

Registos `revisao["propagacao.enxertia"]`, todos `parcial`:
- pereira: verificado técnica e meses; por rever texto e dificuldade;
- macieira e marmeleiro: verificado técnica; por rever meses, texto e dificuldade;
- nas três, `adaptacao_local` provisória.

## Por rever (24 de 27)

- **Prunus (prioridade):** ameixeira, amendoeira, cerejeira, damasqueiro, pessegueiro e nectarina. Os meses 7–8 de borbulha foram acrescentados em 7a020da sem fonte.
- **Citrinos:** laranjeira, limoeiro, tangerineira.
- **Outras fruteiras:** amoreira, aveleira, castanheiro, diospireiro, feijoa, figueira, medronheiro, nespereira, nogueira, oliveira, pistacheiro e romãzeira.
- **Kiwi e vinhas:** kiwi, uva de mesa e videira.
- As 35 ornamentais e florestais com enxertia.

## Testes

- `node verificar.js --revisao`: sem erros; 113 parciais, 2 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-pomoideas.cjs`: só mudam as notas, a nota geral da macieira e os registos das 3 fichas. Meses e dificuldade iguais; 108 combinações; contagens e restantes linhas iguais à base.
- O teste da tarefa de plantação passa a ler os dados de 8f516f3. Cache agenda-v52.

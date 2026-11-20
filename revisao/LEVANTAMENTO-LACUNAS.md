# Levantamento das lacunas dos dados agrícolas

Base: commit seguinte a `6263ae1`, 20/11/2026. **Levantamento sem alterar dados.** 149 espécies, 58 grupos de tratamentos e 21 tarefas.

## 1. Estado da informação

| Estado | Espécies | Onde está a prova |
|---|---|---|
| **Revistas com fontes guardadas no repositório** | 12 florestais: pinheiro-manso, pinheiro-bravo, choupo-negro, choupo-branco, choupo-tremedor, carvalho-cerquinho, azinheira, tramazeira, sorveira, teixo, ulmeiro, pereira-brava | `revisao/FLORESTAIS-e729811.md` (22 ligações) |
| **Revistas com fontes, mas as fontes não ficaram guardadas** | 5 espécies novas (jacarandá, mélia, magnólia-pepino, cipreste-de-Monterey, cladrástis), no commit `aef27b6` | Só a mensagem do commit. Os relatórios ficaram na conversa e não no repositório. |
| **Revistas só em parte, com fontes não guardadas** | 23 fichas (commit `7a020da`) | Só os aspetos legais e de propagação, por exemplo o estatuto da lantana, a filoxera da videira e os citrinos nucelares. As podas, os tratamentos e os meses não foram revistos aí. |
| **Calendário com adaptação explícita a Sardoura** | 11 com `nota_sardoura` (amendoeira, castanheiro, nespereira, pistacheiro, jacarandá, cipreste, 3 choupos, azinheira, pinheiro-bravo) e 21 com `geada` (aviso de geada tardia) | Campos dos dados |
| **Calendário geral do Norte litoral, sem confirmação local** | Todas as outras espécies (cerca de 115) | Os meses vêm de calendários gerais. Ninguém os confirmou para Sardoura. |
| **Suspenso** | Sementeira da pereira-brava | Nota «Calendário suspenso nesta revisão» |

As revisões gerais (as rondas 2 a 8) alteraram textos das 149 espécies. Quase todas as alterações foram de redação e coerência: avisos, notas escondidas e o tipo de intervenção. Não permitem dizer que os meses de cada espécie foram confirmados.

**Nenhum dado tem fonte nem data de revisão.** Não existe campo para isso em `plantas.json` nem em `tratamentos.json`. Nenhum dos 58 grupos de tratamentos tem uma fonte ou uma ligação.

## 2. Textos genéricos, que não são errados mas são pouco específicos

| Campo | Espécies com um texto partilhado por 3 ou mais |
|---|---|
| Adubação | 119 (o texto mais comum aparece em 49) |
| Rega | 92 |
| Geada (resistência) | 83 |
| Solo | 50 |

Há também cerca de 30 textos que pedem ao utilizador para «confirmar», por exemplo: «confirme a espécie», «confirme o enquadramento da parcela» e «confirme a rusticidade». São avisos legítimos, mas mostram onde os dados não decidem por ele.

## 3. Impacto nos próximos meses (dezembro a março)

| Operação | Espécies ou grupos com indicação nestes meses |
|---|---|
| Plantação (sobretudo raiz nua) | 113 |
| Poda | 74 |
| Sementeira | 74 |
| Enxertia | 55 |
| Estacas | 28 |
| **Tratamentos com fitofármaco** | **8 grupos**: macieira e pereira (dez, jan, fev, mar), pessegueiro e nectarina (jan, fev), ameixeira e damasqueiro (fev), amendoeira (fev), citrinos (fev), figueira (fev), kiwi (dez, fev), e alface, acelga e espinafre (dez, jan, fev, mar) |

**As lacunas que mais podem afetar decisões**, por ordem:
1. **Tratamentos com fitofármaco de dezembro a março** nos 8 grupos acima. Nenhum tem fonte, e os meses são gerais (a lepra do pessegueiro, o pedrado e o óleo de inverno dependem do estado fenológico e não só do mês).
2. **Podas de inverno das fruteiras de pomóideas, da videira e de outras espécies (74 com poda de dezembro a março).** O momento certo varia com a geada: podar cedo em fundos de vale aumenta os danos. Os meses não foram confirmados para Sardoura. A cerejeira, o damasqueiro e o pessegueiro já estão com poda de verão nos dados.
3. **Plantação de raiz nua e enxertia de fenda.** Dependem da geada local e do estado dos garfos.
4. **Sementeiras de inverno da horta.** O risco é baixo, mas são muitas.

## 4. Proposta de registo de fontes (por decidir, ainda não implementada)

Um campo opcional por espécie, com o estado por operação:

```json
"revisao": {
  "podas":  {"estado": "confirmado", "data": "2026-11-20", "fontes": ["…"]},
  "plantar":{"estado": "adaptado",   "data": "2026-11-20", "fontes": ["…"], "nota": "atrasado 2 semanas em fundos de vale"},
  "enx":    {"estado": "provisorio"}
}
```

O `estado` pode ser `confirmado`, `adaptado` (confirmado e ajustado a Sardoura), `provisorio` ou `suspenso`. Nos tratamentos seria o mesmo campo, por grupo. O `verificar.js` passaria a contar o estado e a avisar quando uma fonte tem mais de N anos. A app mostraria, se se quiser, «revisto em …» na ficha.

## 5. Próximo passo

Falta saber **quais são as plantas que o João tem**. Com essa lista, cruza-se este levantamento com as operações de dezembro a março e escolhe-se a primeira revisão pelo impacto prático.

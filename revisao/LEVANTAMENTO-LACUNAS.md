# Levantamento das lacunas dos dados agrícolas

Base: commit seguinte a `6263ae1`, 20/11/2026. **Levantamento sem alterar dados.** 149 espécies, 58 grupos de tratamentos e 21 tarefas.

## 1. Estado da informação

*Corrigido depois da revisão do ChatGPT. A revisão documental e a adaptação local passam a ser duas coisas separadas.*

### Revisão documental

| Situação | Espécies | Prova |
|---|---|---|
| **Documentação no repositório, com limitações declaradas** | 12 florestais: pinheiro-manso, pinheiro-bravo, choupo-negro, choupo-branco, choupo-tremedor, carvalho-cerquinho, azinheira, tramazeira, sorveira, teixo, ulmeiro e pereira-brava | `revisao/FLORESTAIS-e729811.md`. O próprio relatório diz que «não certifica individualmente todos os campos herdados» (rega, adubação, rusticidade e taxas de sucesso). **Não estão integralmente confirmadas.** |
| **Revisão anterior registada; documentação não recuperada** | 5 espécies novas (`aef27b6`) e 23 fichas (`7a020da`) | Mensagens e diffs dos commits comprovam as alterações; não recuperam as fontes nem certificam a fundamentação. O diff das 23 inclui alterações de meses de propagação e de notas de poda. Não permite concluir uma validação integral do calendário. Uma pesquisa nova fica registada como revisão nova. |
| **Sem revisão documental registada** | As restantes 109 | — |
| **Suspenso** | Sementeira da pereira-brava | Nota «Calendário suspenso nesta revisão» |

Estas três revisões estão agora registadas em `revisoes_anteriores`, em 40 espécies, com o âmbito de cada uma e o estado da documentação. Nenhum campo tem ainda registo de `revisao`, por isso todos contam como `nao_revisto`.

### Adaptação local (Sardoura)

| Situação | Espécies |
|---|---|
| Com `nota_sardoura` | 11 |
| Com `geada` (aviso de geada tardia em março e abril) | 21 |
| Com as duas | 1 (jacarandá) |
| **Sem adaptação local documentada** | **118** |

**Ter `nota_sardoura` ou `geada` não demonstra que os meses foram validados localmente.** Das 11 notas, só cinco tratam da localização da planta: amendoeira, nespereira, pistacheiro, jacarandá e azinheira. As outras seis tratam de raízes (os 3 choupos), de risco de incêndio (pinheiro-bravo), do porta-enxerto (castanheiro) e de doença (cipreste). O aviso `geada` é uma regra geral da app e não uma validação de meses.

Também não está provado de onde vêm os meses das 118 espécies («calendário geral do Norte litoral» era uma suposição). Ficam como «sem adaptação local documentada».

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

## 4. Registo de fontes

O formato ficou definido em `ESQUEMA.md` («Registo de revisão»), seguindo a revisão do ChatGPT:
- há cinco estados: `nao_revisto`, `parcial`, `confirmado`, `provisorio` e `suspenso`;
- a adaptação local (`adaptacao_local`) é um atributo separado;
- o alcance diz o que foi verificado e o que está por rever;
- cada fonte tem secção, data de consulta e os aspetos que sustenta;
- a data da revisão é separada da data de consulta;
- nos tratamentos, a revisão faz-se por intervenção;
- se não houver registo, o campo conta como `nao_revisto`.

O `verificar.js` valida o formato: deteta estados, datas, fontes e alcances inválidos, e campos ou ficheiros que não existem. Foi testado com 15 erros de propósito, e todos foram detetados. `node verificar.js --revisao` mostra a contagem. Uma fonte antiga não gera aviso automático.

## 5. Próximo passo

Falta saber **quais são as plantas que o João tem**. Com essa lista, cruza-se este levantamento com as operações de dezembro a março e escolhe-se a primeira revisão pelo impacto prático.

# Enxertia — segunda sub-ronda sobre a98da65: Prunus

Revisão de 20-11-2026, feita entre o Claude e o ChatGPT por ligação direta, com duas espécies por pedido para não exceder o tempo de espera.

## O que muda

| Ficha | Meses | Registo |
|---|---|---|
| Pessegueiro | [2,3,7,8] → **[2,3,8]** | `parcial`: técnica (UGA) |
| Nectarina | [2,3] → **[2,3,8]** | `parcial`: técnica (UGA) |
| Ameixeira | [2,3,7,8] → **[2,3,8]** | `parcial`: técnica (UGA) |
| Damasqueiro | [2,3,7] → **[2,3,8]** | `provisorio`: sem fonte confirmada |

Notas iguais nas quatro:
- **fevereiro e março:** «Enxertia de garfo (fenda ou inglesa), com a planta dormente, antes do novo crescimento.»
- **agosto:** «Borbulha em T no fim do mês: casca que descola e olho dormente que rebenta na primavera seguinte.»

**Porque sai julho.** A fonte (UGA B 818) situa a borbulha de olho dormente («dormant budding») no fim de agosto e início de setembro, e diz que só rebenta na primavera seguinte. A borbulha que faz de meados de junho a julho é outra técnica, a «June budding»: corta-se o porta-enxerto passadas duas a três semanas e o gomo rebenta no mesmo ano. É uma prática de viveiro. As notas de julho diziam «de olho dormente (fim do mês)», o que a fonte não sustenta. Julho tinha sido acrescentado no commit 7a020da, sem fonte. O ChatGPT concordou com a retirada.

## Fontes

- **UGA Extension, *Propagating Deciduous Fruit Plants Common to Georgia* (B 818)**, secções T-budding, Whip Grafting e Cleft Grafting. Aberta pelo Claude no browser a 20-11-2026. Cita «peaches, nectarines […] and plums» entre as fruteiras propagadas por borbulha em T e por enxertia à inglesa. Inglesa em «February or early March while still dormant»; fenda «Late February and March—just before new growth begins». A Geórgia é mais quente do que o Norte de Portugal, por isso sustenta a **técnica**, não os meses de Sardoura.
- **Rejeitadas ou não confirmadas:**
  - *Embrapa, 500 Perguntas (pêssego, nectarina, ameixa)*: Brasil, hemisfério sul; não serve para meses.
  - *NHB (Índia), Apricot DPR*, indicada para o damasqueiro: o PDF descarrega em vez de abrir e não foi lido.
  - Um blogue (*enxames3.wordpress.com*) para a cerejeira e a amendoeira: o próprio ChatGPT não o conseguiu abrir.

## Ficam por rever

- **Cerejeira e amendoeira:** sem fonte confirmada; não se mudou nada. A proposta do ChatGPT punha «época por rever» no texto que aparece na app, o que não ajuda quem a lê.
- **Damasqueiro:** precisa de uma fonte própria.
- **Outras plantas de fruto:** citrinos (laranjeira, limoeiro, tangerineira), amoreira, aveleira, castanheiro, diospireiro, feijoa, figueira, medronheiro, nespereira, nogueira, oliveira, pistacheiro, romãzeira, kiwi, uva de mesa e videira.
- **As 35 ornamentais e florestais com enxertia.**

## Testes

- `node verificar.js --revisao`: sem erros; 116 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-prunus.cjs`: só mudam os meses, as notas e os registos das 4 fichas. As outras plantas em Enxertia e os outros botões ficam iguais à base, e julho deixa de mostrar estes Prunus.
- O teste da sub-ronda 1 (pomóideas) passa a ler os dados de a98da65. Cache agenda-v53.

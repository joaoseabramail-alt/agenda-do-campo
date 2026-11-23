# Enxertia do pistacheiro — sobre 9da13d7 (e o que ficou da amoreira e do damasqueiro)

Revisão de 23-11-2026. O ChatGPT procurou fontes na web para o pistacheiro, a amoreira e o damasqueiro. O Claude abriu as que pôde, e o ChatGPT escreveu a nota sem consultar a web.

## Pistacheiro — `parcial` (técnica e texto)

- **Meses e dificuldade iguais:** maio–agosto, difícil; ficam por rever.
- **Nota geral (nova):** «Enxerte de borbulha em T no início do verão, enquanto a casca do porta-enxerto descolar.»
- **Saem as notas de maio e de junho**, que falavam da enxertia de placa: a fonte aberta não fala de placa.
- **Fonte:** UC ANR, *California Pistachio Research — Pruning & Training Resources* (Field Budding).
  - A variedade enxerta-se de borbulha no porta-enxerto no início do verão, e pode continuar enquanto a casca do porta-enxerto descolar.
  - A borbulha em T é a mais comum.

## Amoreira — sem alterações

- O ChatGPT só encontrou um PDF da UC ANR, segundo o qual a amoreira pega melhor quando se enxerta com o porta-enxerto já com folhas. Se isto se confirmar, contradiz os meses atuais (fevereiro–março).
- Não encontrou fonte em página web. O PDF não foi descarregado nem lido; fica à espera de autorização do utilizador.

## Damasqueiro — continua `provisorio`

- As fontes indicadas pelo ChatGPT, duas páginas da Universidade do Missouri (G6971 e G6972), deram 403 ao Claude.
- Segundo o ChatGPT, são orientações gerais para árvores de fruto e não falam do damasqueiro.

## Testes

- `node verificar.js --revisao`: sem erros; 136 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-pistacheiro.cjs`: o resto da base fica igual.
- O teste do castanheiro e do kiwi passa a ler os dados de 9da13d7. Cache agenda-v65.

## Ficam por rever

- **Fruteiras:** a amoreira e a fonte do damasqueiro.
- **As outras 33 ornamentais e florestais.**

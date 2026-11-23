# Enxertia da videira e da uva de mesa — sobre c774b0f

Revisão de 23-11-2026. O Claude não encontrou fonte que conseguisse abrir: a CVRVV não dá meses, e as páginas dos EUA recusaram a ligação ou não carregaram. O PDF da Universidade Estadual de Washington tem uma tabela que não se consegue ler com segurança, e o da Universidade do Porto deu erro no servidor. A pedido do utilizador, o ChatGPT procurou fontes na web. O Claude abriu a do IPB e leu o PDF de Bizkaia, descarregado com autorização do utilizador. O ChatGPT escreveu as notas.

## Videira e uva de mesa — `parcial` (meses, técnica e texto)

- **Meses:** as duas fichas passam a ter **março, abril, maio, agosto e setembro**. Antes, a videira tinha fevereiro–abril e agosto–setembro, e a uva de mesa só fevereiro–abril.
  - Sai fevereiro: era a enxertia de mesa, trabalho de viveiro. Continua no calendário a tarefa «Videira: enxertia de mesa».
  - Entra maio, segundo o quadro de Bizkaia.
  - As duas fichas ficam iguais, porque são a mesma espécie.
- **Dificuldade:** igual (fácil), por rever.
- **Nota geral:** retirada. Falava da enxertia de mesa, que já não está nestes meses.
- **Notas por mês** (iguais nas duas fichas):
  - março: «Enxerte de garfo pouco antes do abrolhamento, com os gomos do porta-enxerto inchados.»
  - abril: «Fenda ou inglês com garfos de 2–3 gomos, antes de o porta-enxerto crescer ativamente.»
  - maio: «Fenda ou inglês com garfos de 2–3 gomos; se a casca descolar ao rachar, o garfo não pega.»
  - agosto: «Borbulha em lasca, a mais usada na vinha; ate com fita plástica. Rebenta na primavera seguinte.»
  - setembro: «Borbulha em lasca ou garfo lateral: o gomo pega agora e só rebenta na primavera seguinte.»

## Fontes

- **Instituto Politécnico de Bragança (ESA)**, *Tipos de reprodução assexuada*, página web aberta pelo Claude:
  - a enxertia de garfo é «muito usada» na videira-europeia, no fim do inverno ou início da primavera, pouco antes do abrolhamento;
  - as enxertias de gomo de agosto–setembro pegam, mas só abrolham na primavera seguinte. É uma indicação geral, não só para a videira.
- **Diputación Foral de Bizkaia**, *Injertos en frutales* (PDF, 0,4 MB), lido pelo Claude:
  - **Quadro da p. 4, linha VID:** garfo lateral agosto–setembro; fenda abril–maio; inglês abril–maio; borbulha em lasca agosto–setembro. O Claude confirmou as colunas pela posição do texto na página.
  - **Fenda** (pp. 6–7): faz-se com os gomos do porta-enxerto inchados, antes do crescimento ativo; se não, a casca descola ao rachar e o garfo não pega. Os garfos têm 2–3 gomos.
  - **Borbulha em lasca** (p. 19): é a mais usada na videira, porque os gomos são grossos e não ajustam na borbulha em escudo; deve atar-se de preferência com fita plástica.
- **Adaptação local:** `provisoria`. Bizkaia tem clima atlântico parecido com o de Sardoura. Na primavera, guie-se pelos gomos inchados do porta-enxerto.

## Ajustes do Claude

- O ChatGPT tinha deixado de fora vários critérios: os gomos inchados, o risco de a casca descolar na fenda e o facto de a borbulha de agosto–setembro só rebentar na primavera seguinte. O Claude repô-los.
- Uma circular da DRAP Norte indicada pelo ChatGPT (enxertar com tempo seco, sem meses) não foi aberta e não foi usada.

## Testes

- `node verificar.js --revisao`: sem erros; 133 parciais, 3 provisórios, 7 confirmados, 2 suspensos.
- `node revisao/testar-enxertia-vinha.cjs`: o resto da base fica igual; as duas fichas têm as mesmas notas; em fevereiro, só fica a tarefa da enxertia de mesa.
- O teste da figueira, da romãzeira e do medronheiro passa a ler os dados de c774b0f. Cache agenda-v63.

## Ficam por rever

- **Fruteiras:** kiwi e pistacheiro; castanheiro e amoreira; e a fonte do damasqueiro.
- **As outras 33 ornamentais e florestais.**

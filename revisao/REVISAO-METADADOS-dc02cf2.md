# Revisão do formato e dos 40 históricos

Base exata: `dc02cf2a013e3c345d222dc50e4ca01c85d77c4f`. Revisão em 20/11/2026. Patch sem publicação.

## O que está certo

- Os 40 registos são efetivamente 40 espécies diferentes: 12 em `8edfc8d`, 5 em `aef27b6` e 23 em `7a020da`. Cruzei os IDs registados com as fichas alteradas pelos três commits: sem falta nem atribuição a uma espécie não alterada.
- Removendo apenas `revisoes_anteriores`, as 149 fichas de `dc02cf2` são iguais às do seu pai. O commit não alterou dados agrícolas. O patch desta revisão também só altera metadados, documentação, verificação e testes.
- A separação entre revisão atual, histórico e adaptação local faz sentido. A inexistência de fontes recuperadas não foi transformada em confirmação documental.

## 1. P2 — âmbito histórico com afirmações contraditórias ou excessivas

Os 23 históricos dizem que os meses não foram revistos. Porém, o diff de `7a020da` altera precisamente meses de enxertia de ameixeira, amendoeira, cerejeira, damasqueiro, macieira, pereira e pessegueiro; também altera meses de enxertia da videira, sementeira do carvalho-dos-pântanos e estacas da glicínia. Há alterações de notas de poda da videira e do azevinho. Isto não prova validação documental desses meses, mas torna injustificada a afirmação categórica de que ficaram fora da revisão.

Nas cinco espécies, o texto genérico sobre retirada de alporquias **e** recolhas de sementes também foi aplicado a fichas onde só uma dessas operações mudou. Por exemplo, no cipreste-de-Monterey saiu `recolha_sementes`, sem retirada de alporquia nesse commit; no cladrástis saiu `propagacao.alporquia`, sem retirada de recolha.

**Correção nos 28 históricos sem documentação recuperada:** listar os campos efetivamente alterados pelo diff de cada ficha e explicitar que isso não certifica fundamentação agronómica nem revisão integral do calendário. Mantidos commits e estados de documentação. Os 12 históricos florestais continuam ligados ao relatório existente e às limitações declaradas. Atualizado também o levantamento.

## 2. P2 — um aspeto «confirmado» pode não ter fonte que o sustente

Em `verificar.js`, `sustenta` só é validado quando existe; não é exigida cobertura de todos os aspetos verificados.

**Reprodução:** acrescentar numa ficha, em `revisao.rega`, um registo `confirmado`, com data válida, `alcance.verificado: ["texto", "meses"]` e uma fonte válida com `sustenta: ["texto"]`. Na base termina sem erros, embora ninguém sustente `meses`. Retirar `sustenta` da fonte também passa.

**Correção:** cada fonte tem `sustenta` não vazio; nos estados `parcial` e `confirmado`, todos os aspetos declarados verificados têm de ser cobertos pelo conjunto das fontes. Isto é uma verificação de estrutura, não uma avaliação científica automática.

## 3. P2 — metadados malformados interrompem o verificador

**Casos na base:**

- `revisoes_anteriores: {}`: `TypeError` em `.entries()`;
- `revisoes_anteriores: [null]`: `TypeError` ao ler `.commit`;
- `alcance.verificado: {}` com uma fonte e `sustenta: ["texto"]`: `TypeError` em `ver.includes`.

**Correção:** validar tipos antes de percorrer/aceder; apresentar erros estruturais e terminar com código 1, sem exceção. Não se alterou o comportamento da app perante metadados: esta validação é uma ferramenta de manutenção.

## 4. P2 — chaves, tipos e referências incompletamente verificados

Na base, `alcance: {"verificdao": ["texto"]}` num `nao_revisto` passa; uma chave extra em `adaptacao_local` também passa. `nao_revisto` com `data_revisao: "ontem"` não é recusado. Um diretório como `ficheiro: "revisao"` satisfaz `existsSync`, embora não seja um relatório.

**Correção:** validar as chaves e tipos de alcance, fontes, adaptação local e histórico; validar qualquer data fornecida; exigir ficheiro regular dentro do repositório.

**Complemento explícito ao contrato:** fontes agora exigem um localizador (`url` HTTP(S) ou `ficheiro` local). Uma fonte só com título e data deixava a rastreabilidade incompleta; isto é um aperfeiçoamento do formato, não uma fonte histórica recuperada. Documentado em `ESQUEMA.md` e testado com ambos os tipos de localizador.

## 5. Precisões de formato e contagem

- Esclarecido `tratamentos[].revisao` como mapa `{vigiar: registo, problemas: registo}`. O código da base aceitava um único registo genérico, sem distinguir os dois campos. Não há registos atuais desse tipo a migrar. `intervencoes[].revisao` continua a receber diretamente um registo por intervenção.
- `--revisao` passa a mostrar registos explícitos e ausentes separadamente. Na base mostrava `{}`, acompanhado apenas da frase que dizia considerar os ausentes não revistos. O número de ausentes é estrutural: inclui campos presentes vazios/nulos e intervenções; não mede percentagem de recomendações validadas. Nesta base conta 2191 ausentes.
- Documentado que `suspenso` não esconde automaticamente operações na app: a retirada tem de ser efetuada também nos dados do calendário. Nenhuma suspensão foi acrescentada por este patch.

## Testes e aplicação

```sh
git apply --check revisao-metadados-dc02cf2.patch
git apply revisao-metadados-dc02cf2.patch
node revisao/testar-revisao.cjs
node verificar.js --revisao
node revisao/testar-copia.cjs
```

O novo teste usa pastas temporárias com cópias dos dados e ficheiros de fonte fictícios, exclusivamente para verificar estrutura. Não usa esses exemplos como fontes agrícolas reais nem altera os ficheiros do projeto.

Passam 20 cenários do verificador, incluindo dados inválidos, fontes URL/locais e os dois níveis de revisão dos tratamentos. Passam os 15 testes existentes da cópia de segurança, que incluem as 216 combinações categoria/mês com e sem filtro. `node verificar.js` sem erros, mantendo apenas o aviso feijão/milho aceite; `git diff --check` sem problemas. Os dados agrícolas foram comparados novamente com a base, retirando só os metadados: iguais. Aplicabilidade do patch confirmada numa árvore limpa de `dc02cf2`.

Não foram executados testes visuais no navegador nem uma nova revisão agronómica. Não há alterações à interface nem ao service worker.

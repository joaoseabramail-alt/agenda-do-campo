# Revisão do commit 41e7110

Base exata: `41e7110d0f1bf4a3c8e7bd3d7873dd6f31674c29`. Revisão de 20/11/2026. Entrega em patch, sem publicar.

## Resultado

As cinco correções principais passam nos testes de regressão executados. Não encontrei uma nova falha de perda de dados nas alterações de gravação, importação ou exportação. Existe uma falha residual na correção dos avisos e a inconsistência de mensagens sobre desconhecidos assinalada pelo Claude.

## P2 — a presença de um aviso impede outro aviso diferente na ficha

**Local na base:** `index.html:390–391` (`fichaHTML`) e `index.html:427` (abertura da ficha).

O teste `!li.querySelector(':scope > .warn')` usa a presença de **qualquer** aviso para decidir se deve ocultar **todos** os avisos da ficha. Isto só é correto quando a linha já apresenta o conjunto completo.

**Reprodução com os dados atuais:**

1. Escolher uma data de janeiro, por exemplo 15/01/2027.
2. Abrir Podas e localizar Mélia (amargoseira).
3. A linha mostra a toxicidade. O aviso legal não é mostrado neste botão, por causa de `legal_botoes`.
4. Abrir a ficha. O aviso legal também não aparece nela porque a linha contém a toxicidade.
5. Comparar com a ficha da mesma planta aberta pela pesquisa: nessa entrada aparecem ambos os avisos.

Este é um caso que a correção anterior não cobriu, não uma nova perda de dados. A política de avisos por botão permanece intacta; ao abrir a ficha devem estar acessíveis os avisos completos da espécie.

**Correção:** passar à ficha os textos dos avisos já visíveis e acrescentar apenas os que faltam. A presença da toxicidade deixa de suprimir o aviso legal. Os textos continuam a passar por `esc` antes de entrarem no HTML.

## Mensagens para plantas guardadas não reconhecidas

Sim, deve ser explicada a diferença. Não dizer que o utilizador nunca marcou plantas quando existem seleções preservadas.

Com `localStorage.setItem('minhas-plantas', '["especie_futura"]')`, recarregar e abrir As minhas plantas:

> Nenhuma das plantas guardadas é reconhecida por esta versão da app. Tem 1 planta guardada que esta versão da app não reconhece. Continua guardada e é incluída na exportação.

O mesmo aviso adicional aparece quando há uma mistura de plantas reconhecidas e não reconhecidas, com concordância no plural. O contador principal continua a contar apenas plantas disponíveis, conforme a regra acordada.

Na exportação, a mensagem passa a distinguir, por exemplo:

> Ficheiro criado com 1 planta reconhecida e 1 não reconhecida. Todas foram incluídas na cópia.

Não alterei o formato v1, a preservação local dos desconhecidos nem a regra que ignora desconhecidos importados. O ficheiro original continua a ser necessário para os tentar recuperar numa versão futura que os reconheça.

## Patch e verificação

Ficheiros alterados: `index.html`, `sw.js` (cache `agenda-v38`), este relatório e o teste sem dependências `revisao/testar-copia.cjs`.

```sh
git apply --check revisao-copia-41e7110.patch
git apply revisao-copia-41e7110.patch
node revisao/testar-copia.cjs
node verificar.js
```

Na base, as 12 verificações herdadas passam; as três novas verificações (aviso legal da mélia, mensagem da lista e resumo de exportação) falham. No patch passam as 15. A suite inclui as cinco cópias inválidas, falhas de persistência, preservação e exportação de desconhecidos, listas acima de 40 plantas e 216 combinações categoria/mês com e sem filtro.

Executado o JavaScript real da app com Node/VM e DOM/armazenamento mínimos, incluindo os manipuladores de clique e o HTML gerado. **Não foi feita uma nova verificação visual no Chromium**, nem do seletor de ficheiros, download real ou modo offline. Essa confirmação deve ser repetida pelo Claude antes de publicar.

`node verificar.js`: 149 espécies, 58 grupos e 21 tarefas, sem erros; apenas o aviso feijão/milho já aceite. `git diff --check` sem problemas. Aplicabilidade do patch confirmada numa árvore limpa da base exata.

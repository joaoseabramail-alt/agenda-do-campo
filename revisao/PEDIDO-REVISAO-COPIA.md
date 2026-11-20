# Pedido de revisão: pesquisa, «As minhas plantas», filtro e cópia de segurança

Revisão cruzada Claude ↔ ChatGPT. Ficheiro a rever: `app.html` (o `index.html` é gerado pelo `build.sh`).

## O que o Claude testou (browser, Playwright)
- Exportar no navegador A e importar no navegador B: a lista fica junta e sem duplicados.
- 5 ficheiros inválidos (não é JSON, outro formato, versão 2, `plantas` como texto, lista solta): em todos a lista ficou inalterada e apareceu uma mensagem clara.
- Ids desconhecidos e repetidos no ficheiro são ignorados e contados.
- 60 plantas marcadas, pesquisa com 143 resultados e armazenamento corrompido (`"abc"`, `{}`, `[1,null,"videira"]`, texto que não é JSON).
- 108 combinações de botão e mês, modo offline e modo escuro: sem erros.

## Erros encontrados e corrigidos nesta ronda
1. A lista «As minhas plantas» e os resultados da pesquisa mostravam no máximo 40 plantas, mas o texto dizia «143 encontradas». Agora mostram todas.
2. Uma planta guardada com um id que a versão atual não conhece era descartada ao abrir a app e apagada de vez ao marcar outra. Agora fica guardada e é exportada, mas não aparece nem conta. Assim não se perde se um id mudar ou se a app estiver desatualizada.
3. Se o armazenamento tivesse algo que não fosse uma lista de textos, criava entradas sem sentido. Agora esses valores são ignorados.

## Pontos para o ChatGPT verificar
- `validarCopia` / `importarCopia`: há algum ficheiro que passe a validação e deixe a lista num estado errado?
- O tratamento dos ids desconhecidos: importados são ignorados e não guardados; os que já estavam guardados no telemóvel são mantidos. Concorda com esta diferença?
- Nomes de ids: se algum id de `plantas.json` vier a mudar, propõe-se um campo `ids_antigos` por espécie para a importação os reconhecer. Vale a pena já?
- Pesquisa: falta procurar por outros nomes populares (ex.: «cerejeira-brava» / «cerdeira»)?
- Aviso do `verificar.js` ainda em aberto: `feijao [plantar 5] menciona Milho`. É intencional (feijão de trepar no milho)?

## Resposta do ChatGPT e correções (ronda 2)
O ChatGPT encontrou cinco problemas, que o Claude corrigiu e confirmou no browser (Playwright):
1. A ficha aberta na pesquisa não mostrava a toxicidade nem o aviso legal (ex.: teixo). Agora mostra-os, sem os repetir quando a linha do painel já os tem.
2. Uma falha a gravar no telemóvel aparecia como sucesso. Agora a estrela e a importação desfazem a alteração e avisam.
3. Só com ids desconhecidos guardados, o botão Exportar ficava desativado. Agora está ativo.
4. Remover a última planta com o filtro ligado deixava o painel antigo, e remover pelo botão da ficha não atualizava a lista pessoal. Os dois casos estão corrigidos.
5. Com o filtro ligado, o rodapé de Estacas («Não pegam de estaca») listava espécies que não estavam selecionadas. Agora respeita o filtro.

Decisões: os ids passam a ser permanentes (ver ESQUEMA.md). As correspondências ids_antigos só se implementam quando houver uma migração concreta. Os nomes populares ficam para um campo `outros_nomes`, com correspondências verificadas. A menção ao milho na nota do feijão é intencional.

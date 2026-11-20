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

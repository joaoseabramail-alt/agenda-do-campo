# Esquema da base de dados

A app lê três ficheiros. Os meses são números de 1 (janeiro) a 12 (dezembro). A dificuldade vai de 1 (fácil) a 4 (praticamente inviável; a app não mostra estas operações). **A dificuldade mede só a facilidade de obter uma planta (enraizar, germinar, pegar o enxerto). Não diz se a planta sai igual à variedade:** isso está em `fiel_variedade` e `metodo_recomendado`.

## plantas.json → `plantas[]`
| Campo | Tipo | Notas |
|---|---|---|
| `id` | texto | Único, sem espaços. Usado em `tratamentos.json`. |
| `nome`, `nome_cientifico` | texto | |
| `categoria` | texto | `fruteira`, `pequeno fruto`, `vinha`, `hortícola`, `aromática`, `florestal`, `ornamental`, `bolbo` |
| `folha` | texto | `caduca`, `persistente`, `anual` |
| `tipo_lua` | texto | `r` raiz/bolbo, `f` folha/fruto, `a` árvore/arbusto (conselho lunar em Plantar) |
| `propagacao.estacas` / `.sementeira` / `.enxertia` / `.alporquia` | objeto | `{dificuldade, meses[], nota}` |
| `propagacao.sementeira.fiel_variedade` | true / false / null | `false`: a semente não reproduz a variedade (serve para porta-enxertos). `null`: depende (ver `nota_variedade`) |
| `metodo_recomendado` | lista | Métodos que mantêm a variedade: `enxertia`, `estacas`, `alporquia`, `divisao` |
| `nota_variedade` | texto | Explicação curta (por exemplo, porta-enxerto resistente à filoxera) |
| `divisao[]` | lista | `{metodo, meses[]}` (divisão, mergulhia, estolhos, bolbilhos) |
| `sementeira`, `plantacao` (hortícolas) | objeto | `sementeira: {meses[], modo: "direta"/"alfobre"}`, `plantacao: {meses[], o_que}` |
| `plantacao` (restantes) | objeto | `{meses[], o_que}` |
| `poda[]` | lista | `{meses[], tipo}` |
| `colheita` | lista de meses | |
| `recolha_sementes` | lista de meses | |
| `notas` | objeto | Notas por botão e mês: `{"podas": {"1": "texto"}}`. Botões: `podas`, `plantar`, `sem`, `estacas`, `enx`, `alp` |
| `toxicidade`, `legal`, `nota_sardoura` | texto | Aparecem como avisos |
| `invasora` | true | Esconde a espécie de plantar e propagar |
| `geada` | true | Sensível à geada: aviso em março e abril |
| `adubacao`, `rega`, `floracao`, `solo`, `resistencia_geada`, `exposicao`, `autoctone` | — | Ainda por preencher (`null`); a app ainda não os mostra |

## tratamentos.json → `tratamentos[]`
`{grupo, especies[] (ids), problemas, vigiar[] (meses), intervencoes[]: {meses[], tipo, texto}}`

`vigiar` define a janela para vigilância geral. Uma intervenção específica pode estar agendada fora dessa janela, por exemplo para retirar frutos mumificados no inverno.

`tipo`: `monitorizacao` (armadilhas, observação), `cultural` (medidas sem produto) ou `fitofarmaco` (só se houver sintomas, risco ou aviso agrícola; a app nunca recomenda aplicação automática e remete para produtos autorizados no SIFITO).

## calendario.json → `tarefas[]`
`{categoria, meses[], nome, texto}` — tarefas gerais. `categoria`: `podas`, `trat`, `plantar`, `sem`, `estacas`, `enx`, `alp`, `div`, `col`.

Antes de enviar alterações, corra `node verificar.js`: confirma ids, meses, dificuldades, tipos de intervenção e procura notas que mencionam outra espécie.

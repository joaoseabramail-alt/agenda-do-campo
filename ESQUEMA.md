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
| `legal_botoes` | lista opcional | Botões previstos para o aviso `legal`: `podas`, `plantar`, `sem`, `estacas`, `enx`, `alp`, `div`. Se ausente, o aviso aparece em todos os botões. Não afeta `toxicidade` nem o filtro `invasora`. |
| `invasora` | true | Esconde a espécie de plantar e propagar |
| `geada` | true | Sensível à geada: aviso em março e abril |
| `adubacao`, `rega`, `floracao`, `solo`, `resistencia_geada`, `exposicao` | texto ou `null` | Orientações por espécie. Use `null` quando faltar informação validada. A app mostra-os na ficha que abre ao tocar no nome da planta. |
| `autoctone` | booleano ou `null` | Estatuto do táxon em Portugal continental, não da variedade de cultivo. `true` para autóctone e `false` para introduzido (incluindo arqueófitos). Use `null` quando a origem não estiver confirmada ou a ficha agrupar plantas sem um estatuto comum demonstrado. A app ainda não o mostra. |
| `foto` | texto opcional | Título exato da página da Wikipédia em português para a foto da ficha, quando a procura pelo nome científico falha ou dá a foto errada. |

## tratamentos.json → `tratamentos[]`
`{grupo, especies[] (ids), problemas, vigiar[] (meses), intervencoes[]: {meses[], tipo, texto}}`

`vigiar` define a janela para vigilância geral. Uma intervenção específica pode estar agendada fora dessa janela, por exemplo para retirar frutos mumificados no inverno.

`tipo`: `monitorizacao` (armadilhas, observação), `cultural` (medidas sem produto) ou `fitofarmaco` (só se houver sintomas, risco ou aviso agrícola; a app nunca recomenda aplicação automática e remete para produtos autorizados no SIFITO).

## calendario.json → `tarefas[]`
`{categoria, meses[], nome, texto}` — tarefas gerais. `categoria`: `podas`, `trat`, `plantar`, `sem`, `estacas`, `enx`, `alp`, `div`, `col`.

Antes de enviar alterações, corra `node verificar.js`: confirma ids, meses, dificuldades, tipos de intervenção e procura notas que mencionam outra espécie.

## Registo de revisão (`revisao` e `revisoes_anteriores`)

Campos opcionais. **Se não houver `revisao` para um campo, esse campo conta como `nao_revisto`.** Não se preenchem fichas só para as marcar.

### Em `plantas[]`

```json
"revisao": {
  "poda": {
    "estado": "parcial",
    "data_revisao": "2026-11-20",
    "alcance": {"verificado": ["tecnica"], "por_rever": ["meses"]},
    "fontes": [{"titulo": "…", "url": "https://…", "seccao": "p. 12", "consultado": "2026-11-20", "sustenta": ["tecnica"]}],
    "adaptacao_local": {"estado": "provisoria", "nota": "atrasar 2 semanas em fundos de vale"},
    "nota": "…"
  },
  "propagacao.enxertia": {"estado": "provisorio", "data_revisao": "2026-11-20", "nota": "…"}
},
"revisoes_anteriores": [
  {"commit": "aef27b6", "ambito": "…", "documentacao": "nao_recuperada"}
]
```

- **A chave** é o nome de um campo que existe na ficha: `poda`, `plantacao`, `sementeira`, `colheita`, `divisao`, `recolha_sementes`, `legal`, `toxicidade`, `autoctone`, `invasora`, `exposicao`, `solo`, `rega`, `adubacao`, `floracao`, `resistencia_geada` ou `nota_sardoura`. Para a propagação usa-se `propagacao.estacas`, `propagacao.enxertia`, `propagacao.sementeira` ou `propagacao.alporquia`.
- **`estado`** pode ser:

  | Estado | Significado |
  |---|---|
  | `nao_revisto` | Ainda não foi verificado em documentação. |
  | `parcial` | Só alguns aspetos foram verificados, indicados em `alcance`. |
  | `confirmado` | As fontes sustentam os aspetos indicados. |
  | `provisorio` | Informação com reservas ou extrapolação explicada em `nota`. |
  | `suspenso` | Recomendação retirada enquanto se resolve uma dúvida, explicada em `nota`. |

- **`alcance.verificado`** e **`alcance.por_rever`** dizem que aspetos foram e não foram verificados: `meses`, `tecnica`, `dificuldade`, `texto`, `estatuto`, `identificacao` ou `produto`. Confirmar uma técnica não confirma os meses.
- **`data_revisao`** é a data da revisão. É diferente de **`fontes[].consultado`**, que é a data em que cada fonte foi lida. **`fontes[].sustenta`** diz que aspetos essa fonte sustenta.
- Cada fonte exige `titulo` e `consultado` válidos, `sustenta` não vazio e pelo menos um localizador: `url` HTTP(S) ou `ficheiro` relativo à raiz do repositório, apontando para um ficheiro existente (não um diretório). `seccao`, quando fornecida, é um texto não vazio. Nos estados `parcial` e `confirmado`, **todos** os aspetos de `alcance.verificado` têm de constar de `sustenta` de alguma fonte. O verificador confirma a estrutura, não a qualidade científica nem a disponibilidade da página remota.
- **`adaptacao_local`** é separada do estado. Uma recomendação adaptada a Sardoura pode continuar provisória. O seu `estado` pode ser `documentada` ou `provisoria`, sempre com `nota`.
- **`revisoes_anteriores`** regista revisões já feitas. Em `documentacao`, `no_repositorio` exige `ficheiro`; `nao_recuperada` indica uma revisão que aconteceu mas cujas fontes se perderam. Uma pesquisa nova regista-se como nova `revisao`, nunca como recuperação das fontes originais.
- `revisoes_anteriores` é uma lista de objetos com apenas `commit`, `ambito`, `documentacao` e, quando aplicável, `ficheiro`. Uma alteração comprovada pelo diff não demonstra, por si só, validação agronómica. O histórico pode registar campos alterados sem os classificar como confirmados.
- `suspenso` descreve uma recomendação retirada: o metadado, por si só, não esconde operações na app. Quem suspende deve também retirar os respetivos meses/indicações do calendário e documentar o motivo.
- **Uma fonte antiga não invalida o dado.** A necessidade de atualizar depende do assunto (a lei e as listas de produtos mudam mais do que a biologia).

### Em `tratamentos[]`

O objeto de revisão vai **em cada intervenção** (`intervencoes[].revisao`), porque um grupo pode juntar medidas com fundamentos diferentes. Para rever os campos do grupo, `tratamentos[].revisao` é um mapa limitado a `vigiar` e `problemas`, com registos independentes:

```json
"revisao": {
  "vigiar": {"estado": "nao_revisto"},
  "problemas": {"estado": "nao_revisto"}
}
```

Os mesmos registos de revisão são usados em cada valor do mapa e diretamente na intervenção. Não colocar o registo de revisão de uma intervenção no grupo. Não é necessário criar mapas para marcar dados ainda não revistos.

### Regras do `verificar.js`

O verificador dá erro quando:
- falta o `estado`, ou o estado não é um dos cinco acima;
- a chave aponta para um campo que não existe;
- há uma chave desconhecida dentro do registo;
- uma data é inválida ou fica no futuro, ou uma fonte foi `consultado` depois da `data_revisao`;
- um registo `parcial` ou `confirmado` não tem fontes ou não tem `alcance.verificado`;
- um registo `parcial` não tem `por_rever`, ou um `confirmado` tem;
- uma fonte não tem `titulo`, `consultado`, `sustenta` ou localizador válido; ou sustenta um aspeto que não está em `verificado`; ou um aspeto declarado verificado não tem fonte que o sustente;
- um registo `provisorio` ou `suspenso` não tem `nota`;
- um `ficheiro` em `no_repositorio` não existe.

As verificações de tipo e de chaves desconhecidas abrangem também os objetos de fonte, alcance, adaptação local e histórico. Metadados malformados devem produzir mensagens de erro e saída 1, sem interromper o verificador com uma exceção.

Com `node verificar.js --revisao` vê a contagem de registos explícitos por estado e, separadamente, o número de não revistos implícitos. Este último conta os campos de `ALVOS` presentes nas fichas (incluindo valores vazios/nulos), os campos `vigiar` e `problemas` dos grupos e cada intervenção sem registo. Não conta campos inexistentes. É um inventário estrutural, não uma percentagem de recomendações agronomicamente validadas.

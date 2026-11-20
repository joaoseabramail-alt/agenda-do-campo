# Revisão das 11 espécies florestais — 20 de novembro de 2026

Base exata: `e729811e124c00b6e73dc60816cc66d3f5235c39`.
Entrega em patch para aplicação pelo Claude; não publicado.

## Critério

Os diplomas foram consultados nas versões consolidadas do Diário da República e confrontados com orientação do ICNF. As referências legais nos avisos remetem para a **redação atual**, não apenas para o diploma original. Uma janela mensal é indicativa, salvo quando a lei fixa datas. A transposição de estações descritas em fontes britânicas e de calendários ibéricos para Sardoura é uma adaptação de calendário, não um ensaio local de propagação.

Esta revisão confirma identidade/estatuto e corrige os pontos abaixo; **não certifica individualmente todos os campos herdados** de rega, adubação, rusticidade ou taxas de sucesso. Os níveis de dificuldade são apreciações editoriais, não percentagens experimentais. Recomendações genéricas de instalação continuam a precisar de ajuste ao solo, material e clima. Não foi efetuado levantamento de restrições de uma parcela concreta, regulamentos municipais ou editais fitossanitários locais.

## 1. Regras legais corrigidas

### Azinheira

O art. 3.º do [DL n.º 169/2001, consolidado](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2001-167292655) abrange corte/arranque de árvores isoladas e em povoamento, com autorização e exceções expressas. O art. 15.º exige autorização para poda, finalidade produtiva e execução entre **1 de novembro e 31 de março**. O [ICNF](https://www.icnf.pt/api/file/doc/3144f15a3faec1cc) identifica-se como entidade competente para corte e poda.

Alterado `legal`; criada em `poda` uma operação **condicionada à autorização**, com os cinco meses legais. Antes, `poda: []` impedia o aviso de aparecer no calendário de podas. Não se transformou esta época em recomendação de podar todos os anos. O procedimento e a eventual aplicação de exceções devem ser confirmados no caso concreto.

### Pinheiro-bravo e grupo dos pinheiros

Referência: [DL n.º 95/2011, consolidado](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2011-57189341), incluindo DL n.º 123/2015, Retificação n.º 38/2015 e DL n.º 9/2021; [consolidação disponibilizada pela DGAV](https://www.dgav.pt/wp-content/uploads/2025/11/Consolidacao-Decreto-Lei-n.o-95_2011-Diario-da-Republica-n.o-151_2011-Serie-I-de-2011-08-08.pdf). O continente integra a zona de restrição. Os arts. 6.º–11.º e anexos regulam MADC, abate, circulação e sobrantes, com requisitos dependentes da zona, época e material.

Os avisos passam a explicitar comunicação prévia, transporte documentado salvo exceções, abate de árvores em declínio mesmo sem notificação e eliminação de sobrantes. Evitou-se inventar um prazo ou uma regra de transporte únicos para todo o continente. Os anexos distinguem **1 de novembro–1 de abril** e **2 de abril–31 de outubro**. A [orientação do ICNF sobre o nemátodo](https://www.icnf.pt/florestas/fitossanidade/nematododamadeiradopinheiro) distingue sintomas de diagnóstico laboratorial e recomenda remoção preferencial no inverno. Essa preferência não suspende medidas urgentes.

Acrescentado também aviso ao pinheiro-manso, abrangido pelo grupo e pelo género Pinus no diploma. `problemas` passa a mencionar as duas ameaças; vigilância do nemátodo durante todo o ano. A desramação do bravo deixa de mandar cortar rente ao tronco.

### Teixo: existe proteção, mas é necessário distinguir os regimes

O teixo espontâneo deve ser objeto de medidas de proteção específica, por exemplo no art. 8.º do anexo A do [PROF Centro Litoral, Portaria n.º 56/2019](https://diariodarepublica.pt/dr/legislacao-consolidada/portaria/2019-122088134) e do [PROF Entre Douro e Minho, Portaria n.º 58/2019](https://diariodarepublica.pt/dr/legislacao-consolidada/portaria/2019-122086341). A aplicação concreta depende dos instrumentos territoriais e do local. As florestas mediterrânicas de teixo integram o **habitat prioritário 9580*** do [anexo B-I do DL n.º 140/99](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1999-34527675-134907810), também identificado pelo [ICNF](https://www.icnf.pt/api/file/doc/ff832cfca575bc7d).

Isto não demonstra uma obrigação nacional de autorização, idêntica à da azinheira, para qualquer teixo ornamental plantado. Introduzido aviso em todas as operações, incluindo recolha de material silvestre, e limitada a recomendação de poda às plantas ornamentais. Podem ainda existir exemplares classificados e regras municipais. Não se confundiu estatuto de ameaça com proibição legal de corte.

## 2. Propagação: calendário revisto

| Espécie | Calendário usado no patch | Fundamento e limites |
|---|---|---|
| Choupo-negro | Sementeira abril–junho; estacas dezembro–fevereiro | [MITECO — Populus nigra](https://www.miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_Populus%20nigra_caract_MFR_tcm30-139486.pdf): recolha abril–junho e sementeira imediata. [RHS](https://www.rhs.org.uk/plants/13512/populus-nigra/details): estacas lenhosas no inverno. |
| Choupo-branco | Sementeira abril–junho; estacas dezembro–fevereiro; rebentos novembro–fevereiro | [MITECO — Populus alba](https://www.miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_Populus%20alba_caract_MFR_tcm30-139483.pdf): colheita primaveril, sementeira imediata, estacas no repouso antes da rebentação. [RHS](https://www.rhs.org.uk/plants/13503/populus-alba/details): rebentos no outono/fim do inverno. |
| Choupo-tremedor | Sementeira abril–junho; estacas **de raiz** dezembro–fevereiro; rebentos novembro–fevereiro | [MITECO — Populus tremula](https://www.miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_Populus%20tremula_caract_MFR_tcm30-139489.pdf). O [Manual de propagación de árboles y arbustos de ribera](https://riquezanatural.cortesdepallas.es/wp-content/uploads/2018/02/Manual-de-propagaci%C3%B3n-de-%C3%A1rboles-y-arbustos-de-Ribera.pdf), capítulo Populus tremula, especifica raiz no inverno; não tratar como estacas comuns de ramo. [RHS](https://www.rhs.org.uk/plants/13520/populus-tremula/details) para época de separação de rebentos. |
| Ulmeiro | Sementeira **abril–maio**, antes maio–junho; raiz dezembro–fevereiro; rebentos novembro–fevereiro | [MITECO — Ulmus minor](https://www.miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_Ulmus%20minor_caract_MFR_tcm30-139531.pdf): recolha abril–maio e sementeira imediata, sem pré-tratamento. O manual de ribera acima sustenta estaquilhagem de raiz e propagação vegetativa; meses de repouso são adaptação sazonal. |
| Tramazeira | Sementeira março–abril após pré-tratamento, ou setembro–novembro com estratificação natural; estacas **herbáceas maio–junho**; enxertia fevereiro–março | [RHS — Sorbus aucuparia](https://www.rhs.org.uk/plants/17539/sorbus-aucuparia/details) recomenda semente, estacas herbáceas e enxertia. [RHS — estacas herbáceas](https://www.rhs.org.uk/propagation/softwood-cuttings) e [enxertia](https://www.rhs.org.uk/fruit/fruit-trees/grafting-ornamental) sustentam as estações, convertidas em meses indicativos. |
| Sorveira, **Sorbus torminalis** | Sementeira como a tramazeira; estacas herbáceas maio–junho, antes ocultadas como inviáveis; rebentos novembro–fevereiro | [RHS — Sorbus torminalis](https://www.rhs.org.uk/plants/17606/sorbus-torminalis/details) confirma semente e estacas herbáceas. [EUFORGEN](https://www.euforgen.org/fileadmin/templates/euforgen.org/upload/Publications/Technical_guidelines/Technical_guidelines_Sorbus_torminalis.pdf) documenta rebentação de raiz. A separação no repouso é adaptação prática, não uma janela mensal publicada para Sardoura. |

Para ambos os Sorbus, [Forest Research, Raising trees and shrubs from seed, apêndice 1](https://cdn.forestresearch.gov.uk/2007/08/fcpg018.pdf) indica dormência profunda e pré-tratamento quente seguido de frio, com durações variáveis: referência de 2–4 semanas quentes e 16–30 frias. A nota anterior de frio isolado era insuficiente. O outono serve para iniciar o tratamento natural, **não garante germinação na primavera seguinte**. Veja também a [ficha específica de Sorbus torminalis](https://www.forestresearch.gov.uk/tools-and-resources/seed-storage/sorbus-torminalis/).

Nas três espécies de choupo, a maturação observada prevalece sobre o mês; acrescentar abril evita perder sementes precoces. O calendário de divisão pressupõe rebentos enraizados e planta dormente, sem solo congelado ou encharcado.

## 3. Restantes verificações e correções

| Espécie/campo | Decisão e fonte |
|---|---|
| Choupo-negro — `autoctone` | Corrigido para `false`, seguindo o [Flora-On](https://flora-on.pt/?q=Populus+nigra), que o classifica como exótico. Há fontes municipais que usam outra classificação; a opção foi explicitar a fonte e manter consistência com o critério botânico da base. Identificar híbridos/cultivares é uma questão distinta. |
| Choupo-branco — origem local | Mantido `autoctone: true` no âmbito continental do esquema, acrescentando a ressalva territorial: o [Flora-On](https://flora-on.pt/?q=Populus+alba) restringe a origem nativa ao quadrante sudeste; não é autóctone de Sardoura por esse facto. |
| Choupos — distância de segurança | Retirada a prescrição universal de 20 m. A RHS chega a indicar 40 m para P. alba; qualquer distância fixa seria falsa segurança sem avaliar solo e construções. Mantido o aviso sobre raízes vigorosas. |
| Choupo-tremedor — identidade/ecologia | [Arboreto de Barcelos](https://arboretodebarcelos.pt/taxa/populus-tremula-l/): ocorrência portuguesa rara, sobretudo em locais frescos do nordeste. Não é uma recomendação indiscriminada para qualquer terreno de Sardoura. |
| Carvalho-cerquinho | [Flora-On](https://flora-on.pt/?q=Quercus+faginea) confirma identidade e origem. [Plantas Nativas — Manual Técnico](https://rdpc.uevora.pt/rdpc/bitstream/10174/29933/1/PLANTAS_NATIVAS_Manual%20T%C3%A9cnico-compressed.pdf) sustenta sementeira outonal e indiferença edáfica. Solo corrigido; outubro–novembro mantido como parte da janela outonal, não data obrigatória de maturação. [MITECO](https://www.miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_Quercus%20faginea_caract_MFR_tcm30-139393.pdf) documenta maturação mais precoce noutros locais. |
| Azinheira — cultivo | [Flora-On](https://flora-on.pt/?q=Quercus+rotundifolia) e manual técnico acima: espécie autóctone, ambiente mediterrânico seco, sementeira outonal. Janela outubro–dezembro depende de bolotas frescas disponíveis. |
| Teixo — cultivo/toxicidade | [RHS](https://www.rhs.org.uk/plants/18001/taxus-baccata/details/) sustenta estacas semilenhosas e drenagem; [Universidade de Évora](https://museubiodiversidade.uevora.pt/elenco-de-especies/biodiversidade-actual/plantas/gimnospermicas/taxus-baccata/) distingue o arilo carnudo das sementes e restantes partes tóxicas. Corrigida a frase “toda a planta”. |
| Tramazeira/sorveira — identidade | [Flora-On, S. aucuparia](https://flora-on.pt/?q=Sorbus+aucuparia) e [S. torminalis](https://flora-on.pt/?q=Sorbus+torminalis) confirmam origem. Acrescentado que a ficha de sorveira não é a de S. domestica, nome comum ambíguo. |
| Ulmeiro — cultivo | [Flora-On](https://flora-on.pt/?q=Ulmus+minor) e [RHS](https://www.rhs.org.uk/plants/164598/ulmus-minor/details): identidade, solo drenado, rusticidade e necessidade de poda limitada. |
| Pereira-brava — cultivo/propagação | [Flora-On](https://flora-on.pt/?q=Pyrus+cordata) confirma indiferença edáfica; [Kew](https://powo.science.kew.org/taxon/730782-1) inclui Portugal na área nativa. Retirada a preferência obrigatória por solo ácido. O protocolo exato de sementeira não foi confirmado numa fonte técnica primária: calendário suspenso (`meses: []`, dificuldade `null`) em vez de conservar os 2–3 meses de frio e o uso como porta-enxerto sem validação. A [RHS](https://www.rhs.org.uk/plants/80716/pyrus-cordata/details) sustenta uma alternativa: separar rebentos no repouso. |
| Pinheiro-bravo — sementes | [MITECO](https://miteco.gob.es/content/dam/miteco/es/biodiversidad/temas/recursos-geneticos/mfr_pinus%20pinaster_caract_MFR_tcm30-139379.pdf) permite pré-tratamento opcional, incluindo estratificação em sementes armazenadas. Corrigido o absoluto “germinam sem estratificação”. [Flora-On](https://flora-on.pt/?q=Pinus+pinaster) confirma origem. |

## 4. Grafiose: saneamento não deve esperar pelo inverno

O grupo Ulmeiro mandava intervir apenas em novembro–fevereiro. O [Forest Research](https://www.forestresearch.gov.uk/tools-and-resources/pests-and-diseases/database/dutch-elm-disease-ophiostoma-novo-ulmi/) sustenta saneamento precoce: a mera desinfeção da tesoura não resolve a transmissão pelos vetores. A intervenção cultural passa a estar disponível todo o ano, condicionada à suspeita/avaliação. Para impedir que a madeira removida continue a dispersar o vetor, acrescentou-se que não se deve transportá-la como lenha, conforme a orientação técnica do [Ministério da Agricultura do Canadá](https://agriculture.canada.ca/en/agricultural-production/crop-protection/diseases-and-pests-agroforestry/dutch-elm-disease). Esta última é uma medida fitossanitária geral, não uma transposição de legislação canadiana para Portugal.

## 5. Aplicação e validação

Ficheiros: `plantas.json`, `tratamentos.json`, `sw.js` e este registo de revisão. `sw.js` passa de `agenda-v32` para `agenda-v33` para renovar a cache dos dados.

Aplicar na raiz do repositório, sobre a base indicada:

```sh
git apply --check revisao-florestais-e729811.patch
git apply revisao-florestais-e729811.patch
node verificar.js
```

Validação executada: JSON válido; `node verificar.js` sem erros (149 espécies, 58 grupos, 21 tarefas); `git diff --check` sem problemas. Executada a função real `lista` da app em Node/VM nas 108 combinações de categoria/mês. Confirmados: azinheira apenas nos cinco meses legais e com aviso; teixo com aviso em todas as operações disponíveis; nemátodo e saneamento da grafiose todo o ano; ulmeiro em abril e fora de junho; choupos em abril; sementeira da pereira-brava ausente enquanto não validada. O aviso preexistente feijão/milho não resulta deste patch. A revisão não incluiu inspeção visual em navegador; o fluxo do repositório prevê essa verificação e publicação pelo Claude.

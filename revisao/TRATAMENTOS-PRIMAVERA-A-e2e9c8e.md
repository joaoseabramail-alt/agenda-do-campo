# Tratamentos de primavera — ronda A

Base exata: `e2e9c8eaf3ab5c9744ce36fc52f82c5c9cb3ba79`. Revisão e consultas: **20/11/2026**. Entrega como patch; não foi publicado nem enviado para o GitHub. Cache proposta: `agenda-v47` → `agenda-v48`.

## 1. Âmbito e correção da contagem

A base contém **67 intervenções sem registo de revisão** com algum mês entre março e junho. A enumeração do pedido identifica **24 existentes**, não 27: dez `fitofarmaco` e catorze de monitorização/medidas culturais. A referência final à videira não identifica outras três intervenções existentes.

Foram revistas essas 24 e acrescentadas **três vigilâncias distintas na videira**: traça-da-uva, cigarrinha-verde e flavescência dourada/vetor. O resultado são **27 novos registos de revisão**, mas **43 das 67 intervenções originais continuam por rever**, não 40. A ronda B deve partir dessa contagem e da lista no fim deste relatório.

O ficheiro passa de 100 para 103 intervenções, em 58 grupos. As espécies, os campos dos grupos (`vigiar`, `problemas`, `especies`) e todas as intervenções fora do âmbito ficam iguais à base. Não há alterações a `plantas.json`, `calendario.json`, `ESQUEMA.md` ou `verificar.js`.

## 2. Alcance dos registos

Todos os 27 registos são **parciais**: verificados `texto` e `tecnica`; `meses` permanece em `por_rever`, com `adaptacao_local.estado = provisoria`. O registo da flavescência inclui também `estatuto`, sustentado pela Portaria e pelo edital. Não se apresenta um calendário geral como observação validada da parcela de Sardoura.

Nas dez indicações químicas, **`produto` permanece em `por_rever`**. Não se validam marcas, doses, intervalos, número de aplicações, equipamento específico ou programas de proteção. Os textos remetem para a finalidade cultura/inimigo, o ambiente, a categoria de utilizador e o rótulo em vigor. As listas antigas dos avisos foram usadas apenas para técnica e biologia, nunca como prova de autorização atual.

Uma janela mensal é um lembrete de observação/avaliação; não é ordem de pulverização, nem exclui risco fora dela. Alterar meses para evitar uma lacuna evidente não equivale a confirmar os seus limites locais.

## 3. Decisões agronómicas

- **Videira, míldio:** retira a sequência que podia levar a esperar pelas manchas; a prevenção depende da fenologia, molhamento, risco e aviso agrícola. **Oídio:** retira a receita genérica de enxofre/30 °C e inclui o acompanhamento em abril; a chuva não é condição necessária para o oídio.
- **Nogueira:** bacteriose e antracnose ficam explicitamente como dois diagnósticos e duas finalidades. Retira o exemplo genérico de cobre. A precaução com flores femininas abertas segue a circular EDM de 05/05/2026; as receitas mais antigas não prevalecem sobre esse aviso. O bichado deixa de ter um único lembrete em junho.
- **Tomate e batata:** proteção contra míldio orientada para prevenção e risco, não para esperar que a rama esteja destruída. A vigilância de Tuta acompanha a cultura, incluindo verão. A apanha manual de escaravelho fica limitada à escala em que é praticável, abrangendo ovos, larvas e adultos.
- **Couves:** começa pela identificação da lagarta, observação e remoção de pequenos focos. Sai o exemplo universal de Bacillus; não se transfere uma autorização entre espécies de couve. A vigilância de afídeos acompanha as culturas além de abril.
- **Buxo:** reconhece atividade larvar já em março. Distingue lagartas vivas de borboletas ou estragos antigos e deixa o posicionamento de um eventual produto dependente do seu rótulo. A monitorização preexistente #0 não foi dada como revista: continua para a ronda B.
- **Roseira e extremosa:** reconhecer o oídio, avaliar danos e condições de cultivo antes de ponderar fungicida. Fontes estrangeiras sustentam somente biologia e técnica; não autorizam usos em Portugal nem validam meses de Sardoura.
- **Prunóideas e citrinos, afídeos:** observação de rebentos/folhas e auxiliares, sem converter cada colónia numa pulverização. Na cerejeira, a indicação é para cerejeiras de fruto. A mosca-da-cereja acompanha a maturação e as variedades tardias; a indicação não se estende automaticamente à cerejeira-do-Japão incluída no grupo.
- **Oliveira:** separar acompanhamento de voo de decisão de combate; proteger a floração e acompanhar o desenvolvimento dos frutos. A população de mosca capturada não demonstra, por si só, infestação da azeitona.
- **Castanheiro:** a observação das galhas inclui a preservação de Torymus; não recomenda cortar galhas verdes ou secas por rotina. Este texto não resolve nem dá como revista a intervenção de cancro #0, fora desta ronda.

### As três vigilâncias da videira

`#3`: **Lobesia botrana** — armadilha antes do voo e observação de inflorescências/cachos. Capturas, por si só, não mandam tratar.

`#4`: **Empoasca vitis** — detetar adultos não substitui observar ninfas nas folhas. É diferente do vetor da flavescência.

`#5`: **Scaphoideus titanus / flavescência dourada** — consultar medidas oficiais da campanha e comunicar suspeitas. A Portaria 267/2023 e o Edital 1/2026/FD_ST impõem regras próprias, que não podem ser dispensadas por um critério genérico de risco da cigarrinha-verde. O Anexo I do edital de 2026, p. 6, coloca todas as freguesias de Castelo de Paiva na coluna de três tratamentos. Isso é evidência de **2026**: o texto da app não fixa esse número, datas ou produtos para a próxima campanha. A obrigação de comunicar suspeitas não termina com os meses do lembrete.

Na lógica existente da app, uma monitorização ativa substitui o alerta geral do grupo. Por isso a nova entrada da traça conserva a referência à vigilância de **míldio, oídio e podridão cinzenta**; não se deixa desaparecer silenciosamente o terceiro problema já listado. Não se reviu por extensão todo o campo `problemas` do grupo, nem se pretende que estas três entradas esgotem todos os problemas da vinha.

## 4. Verificação SIFITO e limites

Evidência: [`fontes/SIFITO-primavera-A-2026-11-20.json`](fontes/SIFITO-primavera-A-2026-11-20.json). Contém as dez consultas, filtros e URL efetivos, totais recebidos/declarados, SHA-256 de cada resposta e uma matriz com **16 testemunhos de finalidades** para as dez indicações. É uma projeção identificável da consulta, não a resposta integral arquivada; o hash não permite reconstruir a resposta nem demonstrar uma ausência futura. A reprodução da consulta depende do serviço e pode devolver resultados diferentes após alterações de autorizações.

Os testemunhos conservam número/tipo de autorização, cultura, inimigo, nomes científicos, ambiente, situação particular, categoria de utilizador e validade da finalidade. Selecionaram-se usos que incluem ar livre e com `DataValidF1` não anterior à consulta; não se tomou uma lista publicada, sem verificar esses campos, como prova suficiente de validade. A omissão da designação comercial evita sugerir uma escolha, mas o número de autorização continua a permitir localizar o registo: é documentação, não validação do produto para utilização.

| Indicação | Verificação realizada |
|---|---|
| Videira #0 e #1 | Míldio e oídio separados; testemunhos que explicitam uva de mesa e de vinificação. |
| Nogueira #0 | Finalidade bacteriose em nogueira. |
| Nogueira #1 | Bacteriose e antracnose verificadas separadamente; sem afirmar aptidão simultânea de um produto. |
| Tomate #0 | Tomateiro/míldio; excluído tomateiro-arbóreo. |
| Batata #1 | Batateira/míldio; excluída batata-doce. |
| Couves #0 | Testemunho de Pieris brassicae para cada uma das seis culturas do grupo, incluindo a entrada couve-portuguesa que explicita tronchuda/penca. Não valida outros inimigos por extensão. |
| Buxo #1 | Buxo/Cydalima perspectalis, com ambiente que inclui ar livre. |
| Roseira #1 | Roseira/oídio, sem usar um grupo genérico como substituto. |
| Extremosa #0 | Pesquisa nominal Extremosa: zero. Pesquisa por ornamentais: finalidade para árvores/arbustos/coníferas ornamentais, Oidium sp., ao ar livre. A identificação do oídio da Lagerstroemia como Oidium sp./Erysiphe lagerstroemiae é sustentada pela UF/IFAS. É um **enquadramento de grupo**, não um resultado nominal positivo; confirmar sempre o rótulo e eventuais restrições concretas. |

Não se encontrou uma lacuna de finalidade que obrigasse a suspender uma destas dez indicações condicionais. **Zero resultados para o nome comum da extremosa não prova ausência de autorização**, porque há grupos culturais. Inversamente, uma finalidade para uma ornamental só em estufa ou para outro oídio identificado não bastaria. A suspensão anterior da figueira permanece intacta.

As autorizações e regras consultadas em novembro de 2026 não são garantia de validade na primavera seguinte. A app remete para a consulta atual antes de qualquer uso.

## 5. Meses alterados e vigilâncias novas

Índices a partir de zero, preservados para todas as intervenções existentes. As alterações abaixo são explícitas e provisórias; as restantes nove intervenções revistas mantêm os meses.

| Grupo e intervenção | Antes | Depois | Motivo e limite |
|---|---|---|---|
| Macieira e pereira #2 | 4 | 4, 5, 6, 7 | Abril–julho em vez de um único lembrete em abril: manter a observação entre a instalação e a entrada seguinte, de agosto, que fica intacta. Limites mensais locais por rever. |
| Pessegueiro e nectarina #1 | 3, 4 | 3, 4, 5, 6 | Prolonga o lembrete até junho para acompanhar os rebentos da primavera; não valida os limites da estação em Sardoura. |
| Ameixeira e damasqueiro #1 | 3, 4 | 3, 4, 5, 6 | Prolonga o lembrete até junho para acompanhar os rebentos da primavera; não valida os limites da estação em Sardoura. |
| Cerejeira #0 | 4 | 4, 5, 6 | Abril–junho em vez de abril isolado: acompanhar os rebentos durante a primavera. Meses locais por rever. |
| Cerejeira #1 | 4, 5 | 4, 5, 6, 7 | Acrescenta junho e julho, para não interromper a observação das variedades tardias; a ficha regional situa a emergência entre fim de maio e início de julho, dependente do local. Abril serve de preparação, não de previsão de voo. |
| Oliveira #0 | 5 | 5, 6 | Acrescenta junho para abranger florações mais tardias; a fase da oliveira prevalece sobre o mês. |
| Videira e uva de mesa #1 | 5, 6, 7 | 4, 5, 6, 7 | Acrescenta abril: a pré-floração e os avisos regionais de abril já exigem acompanhamento. O pintor e a casta, não julho, determinam o fim do período sensível. |
| Citrinos #1 | 4 | 4, 5, 6 | Prolonga a observação dos rebentos durante a primavera; a técnica não confirma os meses específicos de Sardoura. |
| Nogueira #0 | 4 | 3, 4 | Acrescenta março porque o abrolhamento pode começar nesse mês, como documentado pelo aviso regional de 12/03/2021. Não significa tratar antes de a nogueira entrar na fase sensível. |
| Nogueira #1 | 5 | 5, 6 | Acrescenta junho para acompanhar tecidos novos e períodos húmidos após a floração; a persistência do risco e os limites locais continuam por rever. |
| Nogueira #2 | 6 | 5, 6, 7, 8 | Maio–agosto em vez de junho isolado: a fonte portuguesa descreve adultos em maio–junho e outra geração em julho–agosto. Ajustar início e fim ao voo local. |
| Tomate #1 | 6 | 4, 5, 6, 7, 8, 9, 10 | Alarga junho isolado a abril–outubro para acompanhar a cultura instalada, incluindo ataques de verão documentados regionalmente. Janela indicativa de cultivo, não validação de risco em todos esses meses. |
| Batata #1 | 5, 6 | 3, 4, 5, 6, 7 | Março–julho em vez de maio–junho: culturas com rama não ficam sem risco fora desses dois meses. Lembrete provisório segundo o ciclo; colheitas tardias podem exigir observação posterior, que os meses não excluem. |
| Couves e brócolos #1 | 2, 3, 4 | 2, 3, 4, 5, 6, 7, 8, 9, 10 | Prolonga fevereiro–abril até outubro, acompanhando as culturas de primavera e verão; não certifica os limites mensais de Sardoura nem exclui ataques no inverno. |
| Buxo #1 | 4, 5, 6, 7, 8, 9 | 3, 4, 5, 6, 7, 8, 9 | Acrescenta março: o aviso regional de 12/03/2021 documenta lagartas já ativas. A monitorização #0 fica para a ronda B; em março mantém-se também o lembrete geral do grupo. |
| Videira e uva de mesa #3 | nova | 3, 4, 5, 6, 7, 8, 9 | Nova vigilância, março–setembro como janela provisória. O início depende do voo local; os avisos de março e abril mostram que é preciso preparar cedo a observação. Preserva os três alertas de doença do lembrete geral substituído na lista. |
| Videira e uva de mesa #4 | nova | 4, 5, 6, 7, 8, 9 | Nova vigilância, abril–setembro como lembrete provisório; observação de ninfas e risco da parcela prevalecem sobre as capturas de adultos. |
| Videira e uva de mesa #5 | nova | 4, 5, 6, 7, 8, 9 | Nova vigilância, abril–setembro como lembrete de consulta e acompanhamento. Não fixa datas, número de aplicações nem produtos para campanhas futuras; obrigações e comunicação de suspeita não se limitam a estes meses. |

A ampliação do lembrete químico do buxo a março não revê a vigilância #0. Nesse mês continua a aparecer também o alerta geral do grupo, conforme a lógica existente. Uma extensão de monitorização pode apenas substituir o alerta genérico, sem aumentar o contador; por isso as diferenças não são a simples soma dos meses acrescentados.

## 6. Contador de Tratamentos

Contagens obtidas executando a função real `contar('trat', mês)` da app presente, com os dados anteriores e os novos. O teste fixa os valores esperados e verifica as linhas de todas as intervenções nos doze meses.

| Mês | Base v47 | Proposta v48 | Variação |
|---|---:|---:|---:|
| 1 | 22 | 22 | +0 |
| 2 | 33 | 33 | +0 |
| 3 | 50 | 54 | +4 |
| 4 | 64 | 68 | +4 |
| 5 | 78 | 81 | +3 |
| 6 | 76 | 82 | +6 |
| 7 | 71 | 74 | +3 |
| 8 | 66 | 68 | +2 |
| 9 | 60 | 62 | +2 |
| 10 | 49 | 49 | +0 |
| 11 | 32 | 32 | +0 |
| 12 | 22 | 22 | +0 |

## 7. Aviso geral, cache e manutenção dos testes

O aviso geral de Tratamentos em `index.html` ainda impunha enxofre abaixo de 30 °C e uma regra genérica de aplicação de manhã/fim de tarde. Contradizia a retirada das receitas dos dados. A alteração limita-se a esse texto: prevenção antes dos sintomas quando aplicável, medidas oficiais e condições concretas do rótulo. Não altera a lógica nem o desenho da interface.

`sw.js`: só se altera o nome da cache para `agenda-v48`. As regras introduzidas em `e2e9c8e` para JSON, fontes, fotografias e pedidos externos ficam intactas.

Os cinco testes antigos de podas comparavam globalmente `tratamentos.json` com bases antigas. Essa imobilização foi retirada; conservam-se as verificações das fichas de poda e das listas. O teste de inverno usa a mesma base atual de tratamentos nos dois lados da comparação de podas. As 14 intervenções da primeira ronda de tratamentos continuam sob o seu teste, agora com contagens de revisão limitadas a essas 14. O teste novo compara **todas as intervenções fora do âmbito** com `e2e9c8e`, incluindo todas as revisões anteriores; não afrouxa esse contrato.

O teste de metadados passa a copiar para a pasta temporária as fontes locais já referenciadas nos dados, para os casos válidos não falharem por faltar o documento SIFITO da nova ronda. Mantém os casos malformados e os resultados esperados.

Nenhum destes testes compara `index.html` ou `sw.js` com a base. Os testes de listas executam a lógica atual, sem a substituir por uma imitação. As verificações de texto não pretendem certificar agronomia: a sustentação está nas fontes.

## 8. Verificações e confirmação pendente

Executados em Node:

- `node verificar.js --revisao`: sem erros; **108 parciais, 7 confirmados e 1 suspenso**; 41/103 intervenções com registo. O aviso herdado feijão/milho mantém-se.
- `node revisao/testar-tratamentos-primavera-A.cjs`: 24 existentes + 3 novas; 108 combinações, doze contagens, âmbito, meses, fontes locais, dez indicações e cobertura SIFITO.
- Os cinco testes de podas e o teste de tratamentos de inverno: passam.
- `node revisao/testar-revisao.cjs`: os 20 cenários passam.
- Aplicação do patch numa cópia limpa da base e comparação dos ficheiros: passam, sem diferenças entre os ficheiros aplicados e os preparados.

**Não foi feito teste Chromium, instalação, atualização real v47 → v48 ou modo offline nesta ronda.** Ficam para o Claude antes de publicar. Verificar em particular:

1. Março: nogueira/bacteriose, batata/míldio, buxo e vigilância da traça da videira.
2. Abril: oídio da videira e as três novas vigilâncias, sem confundir os dois tipos de cigarrinha.
3. Julho: mosca-da-cereja nas variedades tardias; agosto: bichado da nogueira; setembro: vigilância de Tuta.
4. Textos de cobre na nogueira, preservação das galhas no castanheiro e retirada do limite genérico de enxofre no aviso geral.
5. Contagens acima; ausência de notas antigas das intervenções revistas; atualização real, cache única v48 e dados novos offline.

## 9. Fontes por intervenção

URLs, secções e data de consulta ficam em cada `revisao.fontes`, junto ao dado que sustentam. Relação única dos documentos usados:

- [CCDR-Norte, EDM, Circular 08/2026, 21 de maio](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=887:circ-08-22-maio-2026-eeadm-compressed) — Secções Bichado das pomóideas; Cigarrinha-verde (estimativa do risco); Traça-do-buxo. Datas e produtos de 2026 não são prescrições para campanhas seguintes.
- [DRAPN, EDM, Circular 04/2018 — divulgação sobre afídios nas prunóideas](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_04_2018.pdf) — Divulgação: afídios na ameixeira, cerejeira, damasqueiro e pessegueiro; sintomas nos rebentos e folhas; não usar as antigas indicações químicas
- [RHS, Aphids](https://www.rhs.org.uk/biodiversity/aphids) — Symptoms, Management e Biology; observar colónias e auxiliares; não valida um calendário português
- [DRAPN, EDM, Divulgação técnica 07/2012 — Mosca da Cereja](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_07_2012.pdf) — Ficha final: Rhagoletis cerasi, maturação varietal, armadilhas amarelas; apenas biologia e observação
- [DRAPN, EDM, Circular 08/2018, 22 de maio](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_08_2018.pdf) — Castanheiro: preservar galhas verdes e secas; Oliveira: traça na floração; Tomateiro: deteção precoce de Tuta; apenas técnica/biologia
- [DRAPN, EDM, Circular 14/2019, 24 de julho](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_14_2019.pdf) — p. 5: mosca da azeitona e Tuta absoluta; monitorização sem transpor as antigas indicações de produtos
- [CCDR-Norte, EDM, Circular 04/2026, 7 de abril](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=873:circ-04-2026-eaedm) — pp. 1–2: míldio e traça da videira
- [DGAV, SIFITO — consulta de finalidades em 20/11/2026](https://sifito.dgav.pt/divulgacao/usos) — Matriz de verificação: Extremosa #0; testemunhos de existência, não seleção de produto
- [CCDR-Norte, EDM, Circular 05/2026, 27 de abril](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=879:circ-05-abril-2026-eaedm) — Secções Oídio da videira, Podridão cinzenta e Cigarrinha-verde.
- [CCDR-Norte, EDM, Circular 09/2026, 15 de junho](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=893:circ-09-2026-eaedm) — pp. 2–3: traça, cigarrinha-verde e vetor da flavescência; p. 5: míldio e escaravelho da batateira
- [CCDR-Algarve, Circular 06/2025 — citrinos](https://arba.pt/wp-content/uploads/2025/09/Circular_06_2025.pdf) — 1.3 e 1.4: observar rebentos jovens, mineira e afídeos; técnica, sem transpor calendário algarvio nem recomendações químicas
- [CCDR-Norte, EDM, Circular 02/2025, 11 de março](https://drapnsiapd.utad.pt/sia/Portals/0/Avisos/Circulares/EntreDouro/Circular%2002%20_2025_%20EAEDM.pdf) — Citrinos: mineira dos rebentos, importância nas árvores jovens e reenxertadas; rebentação tenra, não folhas velhas
- [INIAV/IPB, Procedimentos para largadas e monitorização de Torymus sinensis, versão 02, fevereiro de 2021](https://www.dgav.pt/metodologia-para-largadas-e-monitorizacao-de-torymus-sinensis-final/) — I.1–I.2 e II: galhas após abrolhamento, acompanhamento técnico e monitorização do parasitoide
- [DRAPN, EDM, Circular 03/2021, 12 de março](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_03_2021.pdf) — Secção Traça-da-uva: armadilhas até ao fim de março (biologia e técnica, não produtos antigos)
- [CCDR-Norte, EDM, Circular 06/2026, 5 de maio](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=883:circ-06-maio-2026-eaedm) — p. 2: bacteriose da nogueira; precaução com cobre na floração feminina
- [CNCFS / António Ramos, Nogueira: Estado da Produção, maio de 2017](https://cncfs.pt/sites/default/files/documentos/2024-04/nogueiraproducao.pdf) — 8.4, pp. impressas 53–55 (PDF 60–62): bichado e antracnose; apenas biologia e técnica de observação, não receitas químicas antigas
- [DRAPN, EDM, Circular 09/2021](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_09_2021.pdf) — pp. 6–7: míldio da batateira e do tomateiro; humidade persistente e prevenção; não as listas antigas de produtos
- [Iowa State University Extension, Colorado Potato Beetle Control in the Home Garden](https://yardandgarden.extension.iastate.edu/how-to/colorado-potato-beetle-control-home-garden) — Hand Picking; só apanha manual em pequena escala, sem importar calendários ou produtos norte-americanos
- [CCDR-Norte, EDM, Circular 03/2024, 20 de março](https://agricultura.ccdr-n.pt/component/phocadownload/category/73-avisos-agricolas?download=751:circ-03-2024-edm-20-mar2024-ccdr) — pp. 6–7: princípios da proteção contra míldio da batateira desde a instalação, observação e prevenção; apenas técnica, não a lista de produtos de 2024
- [CCDR-Norte, EDM, Circular 13/2026, 23 de setembro](https://agrodigital.ccdr-n.pt/sia/Portals/0/Avisos/Circulares/EntreDouro/CIRC_13_EAEDM_2026_compressed.pdf) — p. 7: lagarta verde da couve; observação e remoção manual de ovos/lagartas em hortas familiares
- [RHS, Mealy cabbage aphid](https://www.rhs.org.uk/biodiversity/mealy-cabbage-aphid) — Symptoms, Management e Biology; técnica e biologia, sem validar meses portugueses
- [RHS, Rose powdery mildew](https://www.rhs.org.uk/disease/rose-powdery-mildew) — Symptoms, Non-chemical control e Biology; apenas biologia e técnica, não produtos britânicos
- [UF/IFAS, Key Plant, Key Pests: Crapemyrtle (Lagerstroemia), revisão fevereiro de 2025](https://ask.ifas.ufl.edu/publication/ep560) — Powdery Mildew (Oidium sp./Erysiphe lagerstroemiae); biologia/identificação, sem transpor meses da Florida nem produtos dos EUA
- [DGAV, Portaria 267/2023, de 21 de agosto](https://www.dgav.pt/wp-content/uploads/2023/08/Portaria-267.2023-flavescencia_gesfito.pdf) — Artigos 3.º e 5.º–7.º: informação da suspeita e medidas oficiais contra flavescência dourada e vetor
- [DGAV, Edital 1/2026/FD_ST, de 28 de abril](https://www.dgav.pt/wp-content/uploads/2026/04/Edital-_1_FD_-ST_2026_DGAV.pdf) — pontos 1–3 e Anexo I, p. 6: Castelo de Paiva; só enquadramento da campanha de 2026, não prescrição para anos seguintes
- [DGAV, Flavescência dourada — legislação e medidas da campanha](https://www.dgav.pt/plantas/conteudo/sanidade-vegetal/inspecao-fitossanitaria/informacao-fitossanitaria/flavescencia-dourada/) — Portaria 267/2023, despacho e edital da campanha; verificar atualizações antes de agir

Além destas fontes, o [Manual SIFITO da DGAV, maio de 2026](https://www.dgav.pt/wp-content/uploads/2026/06/SIFITO-Manual-de-Consulta_rev_20260529_M.pdf), §2.2, explica a consulta das finalidades e das condições. As datas dos avisos de 2026 foram lidas nos próprios PDF: o catálogo e o nome do ficheiro nem sempre coincidem com a data impressa. As fontes antigas de biologia não foram apresentadas como listas atuais de produtos.

## 10. Restantes 43 intervenções originais de março–junho sem revisão

Esta listagem não é uma revisão dessas recomendações. Inclui o #0 do buxo e o #0 da roseira, que não estavam na enumeração de 24. Não deve ser descrita como «as outras 40».

| Grupo | Índices ainda sem revisão |
|---|---|
| Romãzeira | #0 |
| Mirtilo | #0 |
| Morangueiro | #0 |
| Framboeseira e groselheira | #0 |
| Pimento e beringela | #0 |
| Alho, cebola e alho-francês | #0 |
| Fava, ervilha e feijão | #0 |
| Cenoura | #0 |
| Buxo | #0 |
| Roseira | #0 |
| Camélia e azálea | #0, #1 |
| Loureiro | #0 |
| Carvalhos | #0 |
| Pinheiro-manso e pinheiro-bravo | #1, #3 |
| Sobreiro | #0 |
| Hortênsia | #0 |
| Loendro | #0 |
| Sardinheira | #0 |
| Marmeleiro | #0 |
| Nespereira | #0 |
| Espargo | #0 |
| Milho | #0 |
| Amoreira | #0 |
| Aveleira | #0 |
| Diospireiro | #0, #1 |
| Medronheiro | #0 |
| Pistacheiro | #0, #1 |
| Batata-doce | #0, #1 |
| Beterraba | #0, #1 |
| Chicória | #0 |
| Endívia | #0 |
| Rabanete | #0, #1 |
| Cipreste-de-Monterey | #0, #1 |
| Ulmeiro | #0, #1 |

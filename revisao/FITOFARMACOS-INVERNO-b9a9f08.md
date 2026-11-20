# Primeira revisão agronómica — tratamentos de dezembro a março

Base: `b9a9f086ee1c143fbc2284481058e79d5322af33`. Revisão e consulta das fontes: **20-11-2026**.

## Âmbito e resultado

Na base há **10 intervenções com `tipo: fitofarmaco` que incluem dezembro, janeiro, fevereiro ou março**, distribuídas pelos oito grupos pedidos. Foram revistas individualmente. Acrescentaram-se à revisão duas medidas culturais associadas e o aguado dos citrinos, cuja ausência no inverno era uma lacuna. A indicação química da figueira fica suspensa e recebe uma observação separada: **14 registos novos de revisão**, em oito grupos, com 100 intervenções no total da base.

Resultado: **13 registos `parcial` e um `suspenso`**. Os parciais verificam texto e fundamento técnico; **não certificam os meses em Sardoura**. Nas indicações químicas, `produto` permanece por rever: não foi selecionado nem validado um produto comercial/rótulo para cada cultura e inimigo. Não se afirma que uma substância, um grupo de culturas ou a menção num boletim autorize a sua utilização.

As fontes regionais de 2026 documentam o posicionamento biológico observado nessa campanha. **Não são uma previsão nem uma ordem de tratamento para o inverno de 2026/2027.** A decisão exige observação da parcela, fenologia, risco e aviso da época. As ampliações mensais abaixo são janelas provisórias para lembrar essa avaliação, não aplicações adicionais prescritas.

## Decisões por intervenção

Índices abaixo contam a partir de **zero**, como em `tratamentos.json`.

| Grupo / intervenção | Meses antes → depois | Decisão e fundamento |
|---|---|---|
| Macieira e pereira / 0 | 12,1 → 1,2,3 | Alinhar a avaliação de cochonilhas e afídeos com repouso/inchamento dos gomos; evitar tratamento indiscriminado. [F1] |
| Macieira e pereira / 1 | 2,3 → iguais | Pedrado: proteção preventiva por fenologia e chuva; distinguir a sensibilidade das duas culturas. [F1] |
| Pessegueiro e nectarina / 0 | 1,2 → 1,2,3 | Corrigir «antes de os gomos incharem»: observar os primeiros sinais nos gomos **foliares**; não esperar sintomas. [F2,F3] |
| Ameixeira e damasqueiro / 0 | 2 → 2,3,4 | Moniliose: considerar botões florais/floração/queda das pétalas, chuva e diferenças entre culturas. [F4,F5] |
| Ameixeira e damasqueiro / 2 | 11,12 → 11,12,1,2 | Remover frutos mumificados também durante o repouso; retirar compostagem e indicação legal de queima sem verificação. [F5] |
| Amendoeira / 0 | 2 → 2,3 | Centrar a intervenção na moniliose à floração; separar o crivado, evitando uma indicação indiferenciada para os dois alvos. [F6] |
| Citrinos / 0 | 2 → 12,1,2,3 | **Passa a monitorização**: identificar cochonilha, ataque, auxiliares e fase da praga; retirar óleo calendarizado em fevereiro. [F7,F10] |
| Citrinos / 3 | 9,10,11 → 9,10,11,12,1,2,3 | Aguado também no inverno húmido e eventualmente primavera; proteção condicionada e drenagem. [F3,F4] |
| Figueira / 0 | 2 → vazio | **Suspensa a indicação química** por falta de confirmação de finalidade aplicável; retirada do calendário. [F8,F11] |
| Figueira / 1 (nova) | — → 2,3 | Observação antes do abrolhamento e avaliação técnica se houver infestação. [F8] |
| Kiwi / 0 | 2 → 12,1,2 | Higiene na poda de inverno e remoção dos ramos sintomáticos. [F3,F9] |
| Kiwi / 1 | 2 → 12,1,2 | Proteção preventiva dos cortes após a poda; não confundir com cura do material infetado. [F3] |
| Kiwi / 2 | 11,12 → iguais | Distinguir lesões da colheita/queda das folhas das feridas da poda. [F12] |
| Alface, acelga e espinafre / 0 | 9–5 → iguais | Medidas não químicas primeiro; moluscicida só se necessário; confirmar a finalidade para **cada** hortícola. [F10,F12] |

Não foram alteradas fichas em `plantas.json`, tarefas gerais, funções da app, restantes grupos ou restantes intervenções destes grupos. As indicações de outono do pessegueiro e da amendoeira, as armadilhas do bichado e a monitorização de primavera/verão permanecem sem revisão nesta ronda. Também não foram certificados os campos `vigiar` ou `problemas` dos grupos.

A nectarina foi tratada como forma de *Prunus persica* para o fundamento biológico da lepra, sem presumir a equivalência das designações numa autorização. A fonte UC para damasqueiro sustenta biologia e fenologia, não calendários ou produtos portugueses. As janelas mensais são uma escolha editorial provisória explicitada no registo, não uma conclusão das fontes.

## Figueira: verificação direta no SIFITO

A página pública carregou a tabela por um pedido de leitura identificado no seu próprio código. A pesquisa filtrada por `NomeCultura` igual a `Figueira` devolveu **162 registos de 162**. Todos tinham a cultura pedida. Não havia entradas cujo inimigo contivesse «cochon»; havia quatro registos de óleo parafínico, todos contra **aranhiço-vermelho**, não cochonilha.

A transcrição das colunas de identificação de todos esses registos, o URL exato, o filtro e as contagens estão em [fontes/SIFITO-figueira-2026-11-20.json](fontes/SIFITO-figueira-2026-11-20.json). Foram omitidas doses/instruções; a transcrição não é um rótulo. Não se extrapolou esta pesquisa para uma alegação de inexistência absoluta de autorizações: finalidades agrupadas, usos menores, autorizações de emergência e utilizações ainda permitidas de finalidades canceladas podem exigir consultas adicionais. **Não foi confirmada uma dessas vias para a cochonilha da figueira.**

O manual agronómico menciona óleo antes do abrolhamento. Isso sustenta uma técnica, mas não a legalidade atual da finalidade. Por isso a indicação química anterior fica com `estado: suspenso` **e** `meses: []`. O metadado isolado não a esconderia na app. A observação criada em separado mantém visível a necessidade de inspecionar a planta.

## Fontes e limites

Todas consultadas em **20-11-2026**; cada intervenção contém também título, URL, secção, data e `sustenta` no próprio registo `revisao`.

- **F1 — CCDR-Norte, circular EDM 03/2026, 13 de março, pp. 5–7.** [PDF](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=870:circ-03-13mar-2026). Pedrado, afídeos e cochonilha de São José. Usado para risco e posicionamento, sem transcrever listas de produtos.
- **F2 — CCDR-Norte, circular EDM 02/2026, 25 de fevereiro, p. 5.** [PDF](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=866:circ-2-2026-eaedm-pdf). Lepra do pessegueiro.
- **F3 — CCDR-Norte, circular EDM 01/2026, 23 de janeiro, pp. 2, 6–7.** [PDF](https://agricultura.ccdr-n.pt/divulgacao/component-phocadownload-categories/73-avisos-agricolas/157-entre-douro-e-minho/161-2026?download=861:circ-01-2026-compressed). PSA, gomos foliares do pessegueiro, gomose/aguado. A data usada é a do PDF; a página de catálogo apresenta outra data.
- **F4 — DRAP Norte, circular EDM 03/2019, p. 5.** [PDF](https://www.drapnorte.gov.pt/drapn/conteudos/edm/Circular_03_2019.pdf). Moniliose da ameixeira e aguado na primavera. Fonte antiga usada só para biologia/condições de risco. **A lista histórica de produtos não foi reutilizada.**
- **F5 — UC IPM, Apricot: Brown Rot Blossom and Twig Blight.** [Página](https://ipm.ucanr.edu/agriculture/apricot/brown-rot-blossom-and-twig-blight/), secções *Comments on the Disease* e *Management*. Risco no damasqueiro e saneamento de múmias. Sem transpor dosagens, intervalos, produtos ou meses da Califórnia.
- **F6 — INIAV, Manual de boas práticas de fruticultura: amendoeira.** [PDF](https://www.iniav.pt/images/publicacoes/livros-manuais/manual_de_fruticultura_amendoeira.pdf), secção *Proteção fitossanitária*. Distingue moniliose e crivado; não valida fevereiro em todas as variedades.
- **F7 — CCDR-Algarve, circular 05/2025, 24 de junho, pp. 1–2.** [Cópia na ARBA](https://arba.pt/wp-content/uploads/2025/09/Circular_05_2025.pdf), cochonilhas e citrinos em MPB. Documento da entidade emissora alojado por uma associação. Fundamenta observação e fase vulnerável; não sustenta um calendário algarvio aplicado a Sardoura.
- **F8 — Rui Maia de Sousa / INIAV, Manual de boas práticas de fruticultura: figueira.** [Cópia no ISA](https://fenix.isa.ulisboa.pt/downloadFile/844497944593242/Manual%20da_Figueira.pdf), pp. 11–12 do PDF, *Ceroplastes rusci*. Técnica anterior ao abrolhamento; não prova autorização em 2026.
- **F9 — DGAV, Plano de ação nacional para o controlo da PSA do kiwi, maio de 2013, § 8.1, pp. 16–17.** [PDF](https://www.drapnorte.gov.pt/drapn/conteudos/lca/PAN-PSA%20KIWI_2013.pdf). Usada apenas a orientação de higiene e prevenção da dispersão. Não foram dadas como atuais as obrigações legais, regras de queima, desinfetantes ou concentrações do documento antigo.
- **F10 — DGAV, Proteção Integrada e Modos de Produção.** [Página](https://www.dgav.pt/plantas/conteudo/sanidade-vegetal/protecao-integrada-e-modos-de-producao/), implementação dos princípios de proteção integrada. Fundamenta a decisão por estimativa do risco e preferência por meios não químicos.
- **F11 — DGAV, SIFITO.** [Finalidades autorizadas](https://sifito.dgav.pt/divulgacao/usos) e [Manual de Consulta, maio de 2026](https://www.dgav.pt/wp-content/uploads/2026/06/SIFITO-Manual-de-Consulta_rev_20260529_M.pdf), § 2.2, pp. 15–22. Uma finalidade inclui cultura, inimigo e condições específicas. A consulta direta documentada acima abrange a figueira; não foi feita uma validação exaustiva de produtos dos outros sete grupos.
- **F12 — CCDR-Norte, circular EDM 13/2026, 23 de setembro, pp. 2 e 7.** [PDF](https://agrodigital.ccdr-n.pt/sia/Portals/0/Avisos/Circulares/EntreDouro/CIRC_13_EAEDM_2026_compressed.pdf). Lesões da colheita/queda das folhas no kiwi; prevenção e recurso condicionado a moluscicidas nas hortícolas.

## O que fica por resolver

1. Observar variedades, fenologia e historial de ataques em Sardoura. Uma fonte regional não valida automaticamente uma parcela.
2. Antes de qualquer aplicação, confirmar produto, número da autorização, cultura/inimigo e todas as condições do rótulo, incluindo tipo de utilização. A app não escolhe produtos nem substitui essa verificação.
3. Resolver especificamente a finalidade para a cochonilha da figueira antes de reativar a indicação química. Ter óleo autorizado para outro inimigo não resolve a questão.
4. Rever o crivado da amendoeira como alvo separado e as intervenções de outono/primavera/verão excluídas desta ronda.
5. Não confundir as 13 revisões parciais com a revisão integral da base. O resumo passa de 2191 para **2178 campos/intervenções sem registo**; essa redução não significa que os restantes aspetos das intervenções tenham sido confirmados.

## Verificação do patch

- `node verificar.js --revisao`: sem erros; mantém apenas o aviso conhecido feijão/milho.
- `node revisao/testar-revisao.cjs`: 20/20 cenários.
- `node revisao/testar-tratamentos-inverno.cjs`: 108 combinações categoria/mês, correspondência entre dados e linhas de Tratamentos e cenários específicos desta revisão.
- Comparação com a base: apenas as 13 intervenções selecionadas foram alteradas, mais a nova observação da figueira; restantes dados e código da interface iguais. `sw.js` passa de `agenda-v40` a `agenda-v41`.
- Estes testes executam a lógica real de geração de listas em Node, **não são testes de renderização no Chromium**. Verificar no browser após aplicar: pesquisa/ficha, tratamentos em janeiro/março, ausência da indicação química da figueira e atualização/offline com cache v41.

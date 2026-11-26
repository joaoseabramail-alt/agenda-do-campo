# Xylella: Sardoura, zonas demarcadas e espécies da base

Consulta: **26/11/2026**. Base: `cf11ab885475a56dfcc6ee7f03e18c570b9d9819` (156 fichas). Este levantamento não altera tratamentos nem acrescenta avisos às restantes plantas.

## Delimitação: conclusão e prova consultada

**Santa Maria de Sardoura fica fora das zonas demarcadas de Baião e da Área Metropolitana do Porto nos documentos consultados, incluindo as respetivas zonas tampão.** A proximidade do Douro ou de Baião não permite deduzir que uma propriedade esteja dentro da delimitação.

| Zona | Documento oficial | Conferência no PDF |
|---|---|---|
| Baião | [Despacho 79/G/2024, 09/12/2024](https://www.dgav.pt/wp-content/uploads/2024/12/Despacho_79_G_2024_ZDXf_Baiao_dez24.pdf) | Mapa p. 4; lista de freguesias p. 5 |
| Baião | [Edital 2/2025/XF/N, 10/01/2025](https://www.dgav.pt/wp-content/uploads/2025/01/ZD-BAIAO-EDITAL_2_2025_XF-N.pdf) | Lista p. 2; mapa anexo p. 7 |
| AMP | [Despacho 75/G/2026, 06/05/2026](https://www.dgav.pt/wp-content/uploads/2026/05/Despacho75_2026_AMP-Contencao.pdf) | Mapa p. 6; freguesias p. 7; esclarecimento administrativo p. 8 |
| AMP | [Edital 19/2026/XF/N, 06/05/2026](https://www.dgav.pt/wp-content/uploads/2026/05/Edital19_2026.pdf) | Listagem pp. 4–5; mapa anexo p. 10 |

Baião: a lista exaustiva abrange parcialmente Campelo e Ovil, Gove, Grilo, Santa Cruz do Douro e São Tomé de Covelas e Valadares, em Baião, e Soalhães, em Marco de Canaveses. Não inclui Castelo de Paiva. O mapa representa a zona demarcada e os focos, não apenas os pontos positivos.

AMP: em Castelo de Paiva consta **somente Pedorido, parcialmente**. A nota 4 do anexo esclarece a desagregação da antiga União de Freguesias de Raiva, Pedorido e Paraíso ao abrigo da Lei 25-A/2025: só Pedorido permanece parcialmente abrangida. Não se deve aplicar a delimitação à antiga união inteira. Santa Maria de Sardoura não consta da lista. A cartografia do anexo é coerente com essa delimitação ocidental do concelho.

Foram lidos os anexos e vistos os mapas dos dois despachos. Os mapas anexos dos editais foram conferidos com as mesmas delimitações. A conclusão resulta do cruzamento de mapa e lista administrativa, não de uma medição por distância ou de uma interseção GIS de uma parcela. O mapa de Baião tem data cartográfica de 30/10/2024; o da AMP, de 24/03/2026. São os mapas incorporados nos atos acima. Os KML disponibilizados na página da DGAV com data de novembro de 2024 não foram usados como substitutos do despacho da AMP de 2026.

A [página da DGAV](https://www.dgav.pt/plantas/conteudo/sanidade-vegetal/inspecao-fitossanitaria/informacao-fitossanitaria/xylella-fastidiosa/) permite verificar atualizações. Esta conclusão reporta-se aos dois atos consultados; não é uma garantia permanente de ausência da bactéria. Os URL e SHA-256 dos cinco PDF descarregados constam de [FONTES-sete-fichas-cf11ab8.json](FONTES-sete-fichas-cf11ab8.json).

## O que muda, e o que a localização não dispensa

Há três conceitos diferentes:

- **Hospedeira/vegetal especificado:** pertença às listas regulamentares, com alcance por espécie ou género e por subespécie da bactéria.
- **Deteção na AMP:** táxon que consta da lista local de deteções; não prova infeção de uma planta do João nem de todas as espécies de um género.
- **Restrições de circulação:** dependem do material, origem, destino, zona e condições autorizadas. Estar fora de uma zona não permite trazer de lá livremente plantas para plantar.

O despacho da AMP distingue o interior da zona infetada, a faixa de contenção e a zona tampão. As alíneas c)–g) regulam plantação, circulação e comercialização dos materiais abrangidos, com exceções sujeitas a condições e autorização. As alíneas b) e h) tratam das intervenções perante positivos. Não se convertem estas regras numa ordem de abate preventivo de plantas em Sardoura nem num tratamento químico doméstico.

Também existem condições de produção e primeira circulação fora das zonas demarcadas: ver artigo 25 do [Regulamento de Execução (UE) 2020/1201, versão consolidada de 24/11/2025](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02020R1201-20251124), pp. 18–19 do PDF. A polígala está nos anexos e na regra específica do artigo 25(2). Não resumir isto a «só há regras dentro da zona» ou a «toda a troca particular está automaticamente autorizada». Antes de movimentar material de risco, confirmar a situação concreta e a documentação aplicável com a DGAV.

**Na app, o aviso novo entra apenas na polígala, em `plantar` e `estacas`.** A ficha mostra-o igualmente. O botão `sem` não o recebe: as definições e regras aqui citadas excluem sementes. Isso não dispensa outras regras de sementes eventualmente aplicáveis. Não se acrescentam avisos Xylella às restantes fichas nesta ronda.

## Deteções da AMP e correspondências com a base

Fonte da tabela: [lista DGAV atualizada em 06/05/2026](https://www.dgav.pt/wp-content/uploads/2026/04/Xf_Listaespeciesinfetadas_ZD-AMP_26_2.pdf), 82 entradas. O segmento `/2026/04/` do URL não é a data de atualização impressa. O Edital 19/2026 reproduz a listagem.

São **26 fichas relacionadas**: 20 correspondências de espécie, uma variedade dessa espécie, três fichas abrangidas por entradas de género e duas fichas genéricas com sobreposição apenas parcial. Não se apresentam as 26 como 26 espécies individualmente detetadas. A correspondência estruturada, incluindo o número da entrada oficial, está em [XYLELLA-correspondencias-cf11ab8.json](XYLELLA-correspondencias-cf11ab8.json).

| Ficha (`id`) | Táxon na lista local | Alcance da correspondência |
|---|---|---|
| `castanheiro` | Castanea sativa | espécie |
| `laranjeira` | Citrus sinensis | espécie; a base escreve × |
| `limoeiro` | Citrus limon | espécie; a base escreve × |
| `tangerineira` | Citrus reticulata | espécie |
| `oliveira` | Olea europaea | espécie |
| `pessegueiro` | Prunus persica | espécie |
| `nectarina` | Prunus persica | variedade da espécie da lista; não entrada independente |
| `framboeseira` | Rubus idaeus | espécie |
| `alecrim` | Salvia rosmarinus | espécie; sinónimo histórico Rosmarinus officinalis |
| `loureiro` | Laurus nobilis | espécie |
| `azevinho` | Ilex aquifolium | espécie |
| `carvalho_alvarinho` | Quercus robur | espécie |
| `extremosa` | Lagerstroemia indica | espécie |
| `liquidambar` | Liquidambar styraciflua | espécie |
| `magnolia_grandiflora` | Magnolia grandiflora | espécie |
| `platano` | Platanus × hispanica | espécie híbrida |
| `sanguinho` | Frangula alnus | espécie |
| `sobreiro` | Quercus suber | espécie |
| `hibisco` | Hibiscus syriacus | espécie |
| `loendro` | Nerium oleander | espécie |
| `louro_cerejo` | Prunus laurocerasus | espécie |
| `roseira` | Rosa | género; a lista não identifica espécies |
| `videira` | Vitis sp. | género; não demonstra infeção de todas as castas |
| `uva_mesa` | Vitis sp. | género; mesma entrada da videira |
| `lavanda` | Lavandula angustifolia / L. dentata / L. stoechas | sobreposição parcial com Lavandula spp.; não todo o género |
| `sardinheira` | Pelargonium graveolens | sobreposição parcial com Pelargonium spp.; não todo o género |

A entrada da lavanda agrupa aqui os números 47–49; a tabela JSON indica o primeiro. A ausência de uma espécie nesta lista não demonstra resistência à Xylella nem exclui outras regras regulamentares.

Evitar correspondências só pelo nome comum: `Quercus coccinea` e `Q. rubra` não são o `carvalho_pantanos` (`Q. palustris`) da base; `Prunus cerasifera` não é `ameixeira` (`P. domestica`); `Rubus ulmifolius` não é `amoreira` (`Morus nigra / M. alba`). As restantes magnólias da base não são `M. × soulangeana` nem `M. grandiflora`. A murta (`Myrtus communis`) está na lista oficial mas não na base.

**A polígala e a lima-dedo não constam desta lista local.** Também não se deve transportar para ela a lista geral de hospedeiras que inclui amendoeira, cerejeira, nogueira e outras culturas. O aviso da polígala fundamenta-se no seu estatuto regulamentar e no risco da circulação de material, não numa suposta deteção na AMP.

## Limitações e próxima verificação

Não foi feita prospeção de campo, análise laboratorial ou confirmação botânica das plantas fotografadas. Perante suspeita, comunicar aos serviços oficiais; sintomas de secura, isoladamente, não diagnosticam Xylella. Rever os atos e a delimitação antes de uma decisão de circulação futura. Não fica uma verificação geográfica ou legal por concluir neste levantamento relativamente aos dois despachos identificados; permanece a necessidade normal de acompanhar as atualizações oficiais.

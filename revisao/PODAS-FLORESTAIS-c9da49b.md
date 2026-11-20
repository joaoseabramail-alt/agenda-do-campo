# Revisão das podas das 21 florestais (sobre c9da49b)

Data: 2026-11-20. Base: `c9da49b` (cache `agenda-v45`). Cache nova: `agenda-v46`.

## Como foi feita

O ChatGPT reviu as 21 fichas em quatro lotes e devolveu as decisões em JSON (meses, texto, estado e fonte). O Claude construiu o patch a partir dessas decisões e confirmou quatro fontes nas páginas originais: a tabela da Asociación Forestal de Galicia e os regulamentos de arvoredo de Braga (n.º 379/2025) e de Gouveia (n.º 112/2026). Fez também quatro correções, descritas abaixo. As outras URLs respondem (HTTP 200), mas o conteúdo não foi lido página a página.

Estados, segundo o ESQUEMA.md:

- `confirmado` (7): as fontes sustentam os meses e o texto.
- `parcial` (14): os meses ficam em `por_rever`.

Em todas as fichas, `adaptacao_local` fica `provisoria`.

## Meses alterados (7 fichas)

| Ficha | Antes | Depois | Estado | Base |
|---|---|---|---|---|
| azevinho | 2, 3, 4 | 3, 4 | confirmado | RHS, poda ligeira no fim do inverno e início da primavera |
| carvalho_alvarinho | 12, 1, 2 | 7, 8 | confirmado | AFG: *Quercus robur* «entre julio y agosto» (confirmado na página) |
| pilriteiro | 12, 1, 2 | 1, 2 | confirmado | RHS, guia do pilriteiro |
| salgueiro_cinzento | 12, 1, 2 | 2, 3 | parcial | RHS; compromisso com a floração por confirmar |
| sanguinho | 12, 1, 2 | 2, 3 | confirmado | RHS, *Frangula alnus* |
| tramazeira | 12, 1, 2 | 2, 3 | confirmado | Univ. Utah: fim do inverno, antes da rebentação |
| teixo | 3, 4, 8, 9 | 8, 9 | parcial | Retirada a primavera por precaução com as geadas tardias; a fonte (Cornell) sustenta a toxicidade, não a época |

## Meses mantidos (14 fichas)

- **Confirmados:** azinheira e ulmeiro.
- **Parciais:** amieiro, carvalho_negral, carvalho_cerquinho, choupo, choupo_negro, choupo_branco, choupo_tremedor, freixo, sorveira, pereira_brava, pinheiro_manso e pinheiro_bravo.

O texto foi revisto em todas, exceto na azinheira e no pinheiro-bravo. O sentido mantém-se: pouca poda, preservar a forma natural, e os ramos grandes são avaliados por um técnico.

## Regras legais e de segurança (mantidas)

- **Azinheira:** o texto e os meses ficam sem alterações. A poda só se faz com autorização prévia do ICNF, de 1/11 a 31/03, com finalidade produtiva. Fonte: catálogo RUBUS do ICNF.
- **Pinheiro-bravo:** o texto e os meses ficam sem alterações (MADC, nemátodo, sobrantes, sem cortes rentes ao tronco).
- **Pinheiro-manso:** o texto passa a referir o MADC e as regras do nemátodo, como no pinheiro-bravo. As notas de poda de janeiro e dezembro foram retiradas: mandavam fazer «corte rente ao tronco» e sobrepunham-se ao texto, contra o que já tinha sido decidido em FLORESTAIS-e729811.md.
- **Teixo:** mantêm-se o aviso de toxicidade e a confirmação do regime de proteção nos exemplares silvestres. O campo `toxicidade` não muda.
- **Ulmeiro:** mantêm-se a desinfeção das ferramentas e o aviso da grafiose.
- **Azevinho:** mantém-se «origem legal».

## Correções do Claude às propostas do ChatGPT

1. **Amieiro:** a proposta de agosto–setembro baseava-se numa só página genérica (plantref.org), que fala de «fim do verão ou outono» sem indicar meses. Ficam dezembro–fevereiro, com estado parcial.
2. **Azinheira:** fica o texto original. A reformulação proposta trocava «não é uma recomendação de poda anual» por «não é uma poda anual».
3. **Pinheiro-bravo:** fica o texto original. A proposta trocava «cumprir o MADC» por «preencha previamente o MADC» e retirava «nem deixar cortes rentes ao tronco».
4. **Pinheiro-manso:** passa a parcial (a fonte do ICNF sustenta o texto, não os meses) e perde as notas que diziam «corte rente».

## Pontos por rever

- **Freixo:** a tabela galega indica «entre junio y agosto» para *Fraxinus*. Ficou o inverno, sem fonte para os meses.
- **Choupos:** a tabela galega indica «invierno y repaso de chupones en verano». A RHS (fim do verão) não foi usada para mudar os meses em Portugal.
- **Pinheiros:** a tabela galega sugere os meses quentes e secos para *Pinus pinaster*. Fica o inverno por prudência por causa do nemátodo; a época de desramação está por confirmar.
- **Carvalho-cerquinho:** o regulamento de Gouveia põe a formação de árvores jovens de meados de maio a meados de junho. Os meses atuais cobrem só a manutenção.

## Fontes

O catálogo está em `revisao/fontes/PODAS-FLORESTAIS-c9da49b.json`. Cada ficha guarda as suas fontes em `revisao.poda.fontes`.

## Contador de Podas

| | jan | fev | mar | abr | mai | jun | jul | ago | set | out | nov | dez |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| c9da49b | 41 | 49 | 33 | 35 | 24 | 24 | 30 | 27 | 8 | 2 | 7 | 35 |
| depois | 37 | 47 | 35 | 34 | 24 | 24 | 31 | 28 | 8 | 2 | 7 | 30 |

## Testes

- O verificador não dá erros: 81 registos parciais, 7 confirmados e 1 suspenso.
- `revisao/testar-podas-florestais.cjs` (novo) passa.
- `testar-podas-ornamentais.cjs` passa a teste de regressão das suas 14 fichas.
- Os outros cinco testes passam sem alterações.

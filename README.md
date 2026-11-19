# Agenda do Campo

App para telemóvel que diz, para cada dia, o que **podar**, **tratar**, **plantar**, **estacar**, **enxertar** e **alporcar**, segundo o mês e a fase da lua (tradição popular). Calendário ajustado a Santa Maria de Sardoura, Castelo de Paiva (vale do Douro e do Paiva, região dos Vinhos Verdes).

## Instalar no Android
1. Abra https://joaoseabramail-alt.github.io/agenda-do-campo/ no Chrome.
2. Toque em ⋮ → **Instalar app** (ou *Adicionar ao ecrã principal*).

Depois de instalada, funciona sem internet.

## Base de dados
A app gera o calendário de cada dia a partir de três ficheiros. Para mudar a informação agrícola, basta editar estes ficheiros, sem mexer no código:

- `plantas.json` — espécies: nome, nome científico, categoria, propagação (estacas, sementeira, enxertia, alporquia, divisão) com dificuldade (1 fácil a 4 inviável) e meses, poda, plantação, colheita, toxicidade e estatuto legal.
- `tratamentos.json` — pragas e doenças por grupo de plantas, com os meses de vigilância separados dos meses de intervenção.
- `calendario.json` — tarefas gerais que não são de uma espécie (colher garfos, preparar material, etc.).

Os meses são números de 1 (janeiro) a 12 (dezembro).

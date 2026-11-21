# Enxertia da aveleira, da nespereira e da feijoa — sobre c13ba53

Revisão de 21-11-2026. O Claude abriu as fontes primeiro e passou o conteúdo ao ChatGPT, que escreveu as notas sem consultar a web.

## Aveleira — `parcial` (técnica, texto e dificuldade)

- **Meses:** de fevereiro–março para **abril–maio**.
- **Dificuldade:** igual (difícil), agora confirmada: a fonte diz que, no campo, os resultados variam muito.
- **Nota geral (nova):** «Garfos de dois gomos colhidos em dezembro e guardados a 0 °C em saco fechado; ate bem a união.»
- **Notas por mês:**
  - abril: «No campo, com folhas abertas no porta-enxerto e dias perto de 21 °C, para a seiva não encharcar a união.»
  - maio: «Até meados do mês: com dias quentes e sol forte, o garfo murcha antes de a união pegar.»
- **Fonte:** Oregon State University, *Growing Hazelnuts in the Pacific Northwest: Plant Propagation* (EM 9075).
  - **No campo:**
    - esperar por dias perto ou acima de 21 °C e por folhas abertas no porta-enxerto;
    - no Oregon, isto acontece de meados de abril a meados de maio;
    - o início do verão é arriscado.
  - **Em bancada** (dezembro–fevereiro): é preciso aquecer só a união acima de 21 °C.
  - **Garfos:** bem dormentes, colhidos em meados de dezembro e guardados a cerca de 0 °C; garfo de dois gomos.
  - **Outros métodos:** a borbulha não dá resultado na aveleira; o método comum é a mergulhia.
- **Porque saem fevereiro e março:** no campo ainda não há folhas nem calor, e a enxertia em bancada exige equipamento para aquecer a união. O ChatGPT propunha mantê-los, com uma nota sobre a bancada; o Claude não aceitou.

## Nespereira — `parcial` (técnica e texto)

- **Meses e dificuldade iguais:** abril–maio, moderada; ficam por rever.
- **Nota geral (nova):** «Fenda, placa lateral ou inglês, ou borbulha; sobre plântula de nespereira ou marmeleiro (ananicante).» A nota de abril («Enxertia de fenda.») sai, porque a nota geral já a cobre.
- **Fonte:** UF/IFAS, *Loquat Growing in the Florida Home Landscape* (MG050), secção Propagation. A fonte não indica épocas.

## Feijoa — `parcial` (técnica, texto e dificuldade)

- **Dificuldade:** de moderada para **difícil**.
- **Meses iguais:** março–abril; ficam por rever.
- **Nota geral (nova):** «Fenda ou inglês com lingueta; trabalhe com cuidado, pois a madeira dura racha facilmente.» A nota de abril sai.
- **Fonte:** UF/IFAS, *Growing Feijoa Fruit in Florida* (HS1424), secção Propagation.
  - A enxertia é difícil, porque a madeira é dura e racha com facilidade.
  - Houve êxito com fenda e com inglês com lingueta.
  - Aconselha várias cultivares num porta-enxerto comum.
  - A fonte não indica épocas.
  - O dossier dizia que esta página não abria; o Claude abriu-a sem problemas.

## Testes

- `node verificar.js --revisao`: sem erros; 129 parciais, 3 provisórios, 7 confirmados, 1 suspenso.
- `node revisao/testar-enxertia-aveleira-nespereira-feijoa.cjs`: o resto da base fica igual. As contagens só mudam onde a aveleira entra ou sai.
- O teste do pinheiro-manso passa a ler os dados de c13ba53. Cache agenda-v61.

## Ficam por rever

- **Fruteiras:** figueira, romãzeira e medronheiro; videira e uva de mesa; kiwi e pistacheiro; castanheiro e amoreira; e a fonte do damasqueiro.
- **As outras 33 ornamentais e florestais.**

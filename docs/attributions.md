# Créditos e fontes dos materiais visuais

Coleta realizada em 27 de outubro de 2026 para a prévia local da landing page Direcional.

## Empreendimentos e imagens

As 12 imagens em `public/images/properties/` foram baixadas das páginas públicas oficiais abaixo. São perspectivas artísticas, imagens decoradas e plantas ilustradas publicadas pela Direcional; não devem ser descritas como fotografias de apartamentos entregues.

| Arquivos | Empreendimento e página oficial |
| --- | --- |
| `nature-varzea-*.jpg` (5 imagens) | [Nature Várzea — Recife/PE](https://www.direcional.com.br/empreendimentos/nature-varzea/) |
| `inove-residence-*.jpg` (4 imagens) | [Inove Residence — Contagem/MG](https://www.direcional.com.br/empreendimentos/inove-residence/) |
| `boulevard-ville-*.jpg` (3 imagens) | [Conquista Boulevard Ville — Camaçari/BA](https://www.direcional.com.br/empreendimentos/boulevard-2/) |

Todos os arquivos foram validados como JPEG de 1920 × 1080 pixels. O [catálogo do frontend](../src/content/properties.ts) associa as imagens às páginas oficiais de cada empreendimento. Nenhuma imagem genérica foi associada a um empreendimento. As imagens e fontes foram preservadas em `public/images/` e `public/fonts/` na aplicação Next.js.

Os direitos dos materiais pertencem à Direcional e aos respectivos titulares. O uso nesta etapa corresponde à composição de uma prévia local solicitada. Para publicação comercial, confirmar a autorização de uso das imagens e os memoriais e condições oficiais vigentes. Mobiliário, decoração, equipamentos e paisagismo das perspectivas são ilustrativos.

## Dados do catálogo

Os quartos, endereços, diferenciais e áreas foram consultados nas páginas oficiais. A coleta identificou diferenças entre os cards da home e as plantas/fichas técnicas:

- Nature Várzea: usar **40,67 m²** para o apartamento tipo de 2 quartos. O Garden acrescenta 6,81 m². A home resume 47 m².
- Inove Residence: a página apresenta diferentes tipologias de 1, 2 e 3 quartos. O card da home anuncia **66 m² e 3 quartos**, sem vincular a medida a uma planta específica. A planta baixada identifica apartamento ponta tipo dos blocos 02 e 03, com 3 quartos e suíte, mas não informa a metragem. Exibir **2 e 3 quartos · Consulte as plantas**, sem generalizar 66 m². Varanda e suíte dependem da tipologia.
- Conquista Boulevard Ville: o apartamento tipo de 2 quartos tem **36,24 m²**; o térreo Garden de 2 quartos tem área privativa total de **51,34 m²**. O card da home resume 51 m².

Os rodapés oficiais condicionam a comercialização ao registro de incorporação e orientam consultar o corretor. A prévia não deve prometer disponibilidade, concessão de crédito, preços ou subsídios sem validação.

## Canais oficiais

Os botões de contato podem levar diretamente aos endereços já publicados pelo site oficial, sem envio de dados pela aplicação local:

- Geral: https://wa.me/message/C25RGOWHEC52I1
- Nature Várzea: https://wa.me/message/3624RUVO5ERFP1
- Inove Residence: https://wa.me/message/3DFGTIW4HNHYE1
- Conquista Boulevard Ville: https://wa.me/message/ILCERDLCWKFNM1

Os links foram lidos do DOM oficial; nenhuma mensagem foi enviada.

## Tipografia

`public/fonts/roboto-regular.woff2` e `roboto-bold.woff2` são os arquivos Roboto de pesos 400 e 700 carregados pelo [tema oficial Direcional](https://www.direcional.com.br/wp-content/themes/direcional-theme/dist/styles/main_1764557a.css). Não são fontes de plugins.

A licença do [projeto upstream Roboto](https://github.com/googlefonts/roboto-2/blob/main/LICENSE), Apache License 2.0, foi preservada em `public/fonts/LICENSE-Roboto.txt`.

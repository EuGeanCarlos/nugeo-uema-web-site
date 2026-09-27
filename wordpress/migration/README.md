# Árvore e preservação do portal

Fonte: https://www.nugeo.uema.br/ — levantamento público em 27/09/2026.

O inventário `homepage-inventory.json` guarda a árvore original e os links encontrados na página inicial. O tema contém a cópia revisável `nugeo/inc/site-tree.json`; menus continuam editáveis pelo WordPress. A avaliação local usa as três páginas abaixo:

- `/laboratorios/labmet/`: Tempo (previsão, chuva de 24h, condição atmosférica), Clima (avaliação mensal, previsão trimestral, histórico até 2018, climatologia), estações (sobre PCDs e dados), satélites, secas, queimadas, marés e informativos climáticos.
- `/laboratorios/labhidro/`: regiões hidrográficas do Maranhão, Atlântico Nordeste Ocidental, Tocantins-Araguaia, Parnaíba, bacias maranhenses e federais.
- `/laboratorios/labgeo/`: áreas de atuação, relatórios Codevasf, publicações, equipe técnica e agendamento de visitas.

Quem Somos, Notícias e Acervo Técnico permanecem ligados ao site oficial no menu principal. Conteúdos de demonstração na home e no rodapé continuam identificados como exemplos. As páginas dos laboratórios oferecem acesso à apresentação original completa; o texto científico e as imagens do LABHIDRO ainda estão no portal original.

Projetos e Atividades de Campo (LABGEO) e o atendimento de Laudos Técnicos (LABMET) não tinham destinos funcionais na origem. São pendências editoriais registradas nas páginas, sem inventar URLs. O link encurtado dos informativos e os serviços externos precisam de validação dos responsáveis.

## O que está preservado nesta etapa

A navegação pública observada, seus três níveis e os destinos originais estão acessíveis no tema local. Equipe Técnica e Agende sua visita, encontrados na página do LABGEO fora do menu principal, foram acrescentados. O menu antigo local foi conservado; a nova posição principal usa um menu separado. A ativação do ZIP não altera páginas, menus ou banco de dados. O importador é exclusivo do Playground local e não faz parte do ZIP.

## O que ainda não é uma migração completa

As consultas REST de páginas/categorias/posts retornaram HTTP 403. Os arquivos pages.json e categories.json vazios representam falha de acesso, não ausência de conteúdo. O levantamento público não comprova todo o histórico, páginas órfãs, anexos, shortcodes, formulários ou conteúdo dependente de plugins. Manter links externos preserva acesso, mas não é backup.

Antes da substituição em produção:

1. Obter backup do banco, wp-content/uploads, plugins e tema antigo; exportar também Ferramentas → Exportar → Todo o conteúdo (WXR não substitui backup de mídia).
2. Clonar esses dados em homologação e comparar quantidades de páginas, posts, categorias e anexos; conferir menus, URLs e arquivos de download.
3. Atribuir o menu existente à posição Navegação principal; manter IDs, slugs e permalinks. Não executar os seeds locais na produção.
4. Aplicar o modelo Laboratório NUGEO nas páginas importadas. Para slugs diferentes, preencher o campo personalizado `_nugeo_laboratory` com LABMET, LABHIDRO ou LABGEO. O modelo sempre exibe o conteúdo do editor.
5. Mapear URLs importadas via opção `nugeo_legacy_url_map` (URL original => ID da página publicada) e revisar links por categoria. Revalidar formulários, equipe, contatos e conteúdos científicos.
6. Validar acessibilidade e as integrações de tradução, VLibras e alto contraste do portal antigo; essas integrações ainda não foram reproduzidas nesta etapa.
7. Somente depois da conferência de conteúdo e do plano de restauração, substituir o tema público.

## Validação local

`node scripts/test-laboratories.mjs` (em frontend/nugeo-web) compara todos os itens do menu inventariado, os links de cada laboratório, o terceiro nível por teclado, larguras 390/1440 e axe. `npm run test:theme` cobre 320–1920, busca, posts, 404 e movimento reduzido. O ZIP é instalado em uma instância descartável pelo blueprint de teste.

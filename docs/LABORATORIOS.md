# Laboratórios — arquitetura e revisão

## Organização

O produto continua sendo o tema clássico WordPress em `wordpress/nugeo`. A Home, os menus e o acervo existente foram preservados.

- `page-laboratory.php`: WordPress Loop, proteção por senha, navegação das seções e conteúdo do editor.
- `inc/laboratories.php`: árvore histórica, links e seleção do template existente.
- `inc/laboratories/registry.php`: resolve o laboratório por slug ou metadado e carrega somente módulos permitidos.
- `inc/laboratories/labmet.php`: conteúdo estruturado do briefing fornecido.
- `inc/laboratories/labhidro.php` e `labgeo.php`: textos demonstrativos explicitamente identificados, pendências editoriais e estrutura para os futuros briefings.
- `template-parts/laboratories/`: hero, overview, areas, monitoring, products, team e resources. Os layouts são compartilhados; os conteúdos são independentes. Essa organização evita duplicar os mesmos componentes em três diretórios.
- `assets/laboratories/labhidro.svg` e `labgeo.svg`: ilustrações vetoriais abstratas; não representam instalações, mapas ou medições reais.
- `assets/theme.css`: estilos adicionais dos laboratórios. `assets/site.css` é o resultado compilado.

## Editar e substituir conteúdo

Edite o arquivo PHP do laboratório correspondente. Os campos `pending` registram as pendências internas e não são publicados. Missão e visão do LABMET não foram inventadas: estão vazias, com indicação de validação pendente no layout.

A imagem destacada da página substitui o painel tipográfico/ilustração do hero. Os membros da equipe aceitam `photo_id` (ID de anexo WordPress); sem foto, o card usa somente texto, sem retrato artificial. Os produtos aceitam `url`, `pdf`, `image_id`, `map`, `dashboard`, `source` e `updated_at`. Campos vazios não geram links fictícios.

Os textos livres no editor WordPress continuam aparecendo em Informações complementares. Nenhum conteúdo anterior foi apagado. Esta etapa não adiciona ACF, nem transforma cada produto em uma nova página.

As referências INMET, CPTEC/INPE, FUNCEME, CEPAGRI/UNICAMP e Embrapa aparecem pelos nomes fornecidos, sem URLs inventadas. Links Lattes e e-mails são os do briefing; os testes verificam a presença e o formato, não a disponibilidade de servidores externos.

## Referência temporal e conteúdo pendente

Gunter de Azevedo Reschke foi informado como responsável até 30/06/2026. Essa data aparece na ficha e no card; a página não presume que ele continua na chefia. Confirmar coordenação atual, composição e titulação da equipe, missão, visão, fotografias e destinos dos produtos sem link.

LABHIDRO e LABGEO possuem apresentação, missão, visão, objetivos, áreas, catálogo e modelos de equipe para avaliação. Textos e imagens são identificados como ilustrativos. Não há pesquisadores, contatos, instrumentos, números ou medições fictícios. O acervo oficial permanece separado desses exemplos.

## Playground: causa reproduzida e correção local

Diagnóstico de 30/09/2026, PHP 8.3, WordPress 7.1.2, CLI 3.1.55:

1. O PHP mínimo (`echo 'NUGEO PHP OK'`) passou.
2. `seed-local.php` falhou com exit code 255 ao carregar o WordPress.
3. O shutdown revelou `Cannot escape data without an active database connection`; o erro subjacente de `$wpdb->last_error` foi `SQLSTATE[HY000]: General error: 5 database is locked`, durante `PRAGMA journal_mode`.
4. A verificação nativa confirmou o banco em WAL e `PRAGMA quick_check = ok`. Não havia outra instância do Playground ativa. O erro também ocorreu fora do sandbox.
5. Após preservar o banco, convertê-lo para journal DELETE e definir `SQLITE_JOURNAL_MODE=DELETE` no wp-config local, passaram o PHP mínimo, seed-local isolado, seed-navigation isolado e a combinação completa. Isso resolve a falha reproduzida nesta instalação Windows; não prova a ausência de toda causa possível de lock SQLite.

`scripts/prepare-local-wordpress.mjs` verifica integridade, cria uma cópia consistente com VACUUM INTO antes de converter um banco WAL e configura o wp-config local. Requer o Node com módulo `node:sqlite` (ambiente validado: Node 25). Não modifica o tema distribuído nem uma instalação de produção em MySQL.

`scripts/start-wordpress.ps1` adquire um mutex do projeto e verifica a porta 9400 antes de preparar o banco. Uma segunda execução é recusada. Não se deve rodar diagnósticos que abram o mesmo banco enquanto o servidor estiver ativo. Nunca apagar o banco para contornar um lock.

Cópia anterior ao diagnóstico: `.playground/diagnostics/before-laboratories.sqlite`. Relatórios das quatro fases ficam no mesmo diretório, ignorado pelo Git. A comparação de ID, título, texto, status e parent dos 66 registros de wp_posts antes/depois resultou no mesmo SHA-256. Credenciais e backups permanecem fora do Git e do ZIP.

## Seed e rotas

`seed-laboratories.php`, chamado pelo seed-local, cria somente páginas ausentes e adiciona identificação/template aos laboratórios. Conserva os textos do editor, o status das páginas existentes e templates personalizados. Funciona também quando o seed inicial já foi executado. O seed-navigation mantém a árvore anterior.

- http://127.0.0.1:9400/laboratorios/labmet/
- http://127.0.0.1:9400/laboratorios/labhidro/
- http://127.0.0.1:9400/laboratorios/labgeo/

## Comandos de validação

Na raiz efetiva do repositório:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-wordpress.ps1
node scripts/check-theme-php.mjs
```

Em `frontend/nugeo-web`:

```powershell
npm run build:theme
npm run lint
npm run build
node scripts/test-laboratories.mjs
npm run test:theme
```

O teste dos laboratórios verifica as três rotas em 320, 390, 768, 1440 e 1920px, todos os links históricos, seções, âncoras, fotos/ilustrações, seis membros do LABMET, cinco categorias de produtos, navegação por teclado, axe em celular/desktop e conteúdo sem JavaScript. Capturas locais ficam em `releases/audit` (ignorado).

Esta entrega fica sem commit para revisão do usuário.

## Resultados da revisão

- Build do tema, `npm run lint` e `npm run build`: aprovados.
- Sintaxe de todos os 33 PHP (tema e seeds): aprovada em PHP 8.0 e 8.3.
- 33 PHP em UTF-8 válido, sem BOM; nenhum dos padrões de mojibake relatados foi encontrado nos módulos novos.
- Laboratórios: 3 páginas × 5 larguras, 32 itens de menu históricos, conteúdo, imagens, âncoras, equipe, axe, teclado e versão sem JavaScript: aprovados.
- Home: 7 larguras, axe mobile/desktop, menu, Escape, resize, cabeçalho fixo, pesquisa, páginas, posts, 404, sem JavaScript e movimento reduzido: aprovados.
- Segunda inicialização do servidor: recusada, preservando a instância existente.
- Ajustados dois excessos de largura em 320px (quebras do painel tipográfico e título do LABGEO); testes repetidos com sucesso.

A instalação nova revelou uma segunda causa de erro 255: `request_filesystem_credentials()` não estava disponível durante o download de idioma. O seed passou a carregar `wp-admin/includes/file.php` antes do instalador de traduções. Se o pacote pt_BR não puder ser obtido, o seed registra a limitação e permite nova tentativa, em vez de marcar a tradução como instalada.

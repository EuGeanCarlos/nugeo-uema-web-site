<?php
/** Apenas para a instalação local criada pelo Playground; não faz parte do ZIP. */
require_once '/wordpress/wp-load.php';
if ('nugeo' !== get_stylesheet()) { switch_theme('nugeo'); }
require_once '/wordpress/wp-content/themes/nugeo/functions.php';
if (!get_option('nugeo_local_locale_initialized')) {
    if (!in_array('pt_BR', get_available_languages(), true)) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/translation-install.php';
        wp_download_language_pack('pt_BR');
    }
    update_option('WPLANG', 'pt_BR');
    if (in_array('pt_BR', get_available_languages(), true)) {
        update_option('nugeo_local_locale_initialized', 1);
    } else {
        error_log('NUGEO: pacote pt_BR indisponível; a próxima inicialização tentará novamente.');
    }
}
// Remove somente os exemplos padrão da instalação isolada, de forma reversível.
if (!get_option('nugeo_local_default_content_cleaned')) {
    $default_post = get_post(1);
    if ($default_post && 'Hello world!' === $default_post->post_title) { wp_trash_post(1); }
    $default_page = get_page_by_path('sample-page');
    if ($default_page && 'Sample Page' === $default_page->post_title) { wp_trash_post($default_page->ID); }
    update_option('nugeo_local_default_content_cleaned', 1);
}
// Credenciais locais ficam fora da raiz pública e fora do Git/ZIP.
if (!get_option('nugeo_local_access_initialized') && file_exists(__DIR__ . '/.local-access.json')) {
    $access = json_decode(file_get_contents(__DIR__ . '/.local-access.json'), true);
    if (!empty($access['username']) && !empty($access['password'])) {
        $admin = get_user_by('login', $access['username']);
        if ($admin && user_can($admin, 'manage_options')) {
            wp_set_password($access['password'], $admin->ID);
            update_option('nugeo_local_access_initialized', 1);
        }
    }
}
if (get_option('nugeo_local_seeded')) { require __DIR__ . '/seed-laboratories.php'; return; }
update_option('blogname', 'NUGEO | UEMA');
update_option('blogdescription', 'Núcleo Geoambiental — Universidade Estadual do Maranhão');
update_option('timezone_string', 'America/Fortaleza');
update_option('date_format', 'j \d\e F \d\e Y');
update_option('permalink_structure', '/%postname%/');
update_option('blog_public', 0);
update_option('default_comment_status', 'closed');

function nugeo_demo_page($title, $slug, $content, $parent = 0) {
    return wp_insert_post(array('post_title' => $title, 'post_name' => $slug, 'post_content' => $content, 'post_type' => 'page', 'post_status' => 'publish', 'post_parent' => $parent, 'comment_status' => 'closed'));
}
$notice = '<!-- wp:paragraph {"backgroundColor":"light"} --><p class="has-light-background-color has-background"><strong>Ambiente local de avaliação.</strong> Este conteúdo demonstra a apresentação do tema. Textos institucionais e dados científicos devem ser validados antes da publicação.</p><!-- /wp:paragraph -->';
$home = nugeo_demo_page('Início', 'inicio', '');
$news = nugeo_demo_page('Notícias', 'noticias', '');
$about = nugeo_demo_page('O NUGEO', 'sobre', $notice . '<!-- wp:heading --><h2 class="wp-block-heading">Ciência, território e sociedade</h2><!-- /wp:heading --><!-- wp:paragraph --><p>O portal reúne as áreas de meteorologia, recursos hídricos e geotecnologias apresentadas no projeto NUGEO/UEMA. Esta página poderá receber a história oficial do núcleo, sua missão e a apresentação da equipe.</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Uma página editável</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Abra esta página no painel do WordPress para editar os textos, inserir imagens e experimentar os blocos. O tema mantém a tipografia, as cores e os espaçamentos do portal.</p><!-- /wp:paragraph -->');
$labs = nugeo_demo_page('Laboratórios e unidades técnicas', 'laboratorios', $notice . '<!-- wp:paragraph --><p>Conheça as áreas de atuação apresentadas no projeto. As páginas abaixo são editáveis pelo painel.</p><!-- /wp:paragraph -->');
foreach (nugeo_laboratories() as $lab) {
    nugeo_demo_page($lab['title'] . ' — ' . $lab['acronym'], basename($lab['slug']), $notice . '<!-- wp:paragraph --><p>' . esc_html($lab['description']) . '</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Pesquisa e atuação</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Espaço reservado para a equipe apresentar linhas de pesquisa, projetos, infraestrutura e formas de contato. Nenhum indicador científico foi simulado nesta página.</p><!-- /wp:paragraph -->', $labs);
}
$data = nugeo_demo_page('Dados e produtos ambientais', 'dados', $notice . '<!-- wp:paragraph --><p>Este catálogo apresenta as frentes previstas para o portal. A conexão com fontes oficiais de dados será desenvolvida após a definição e validação das integrações.</p><!-- /wp:paragraph -->');
foreach (nugeo_products() as $product) {
    nugeo_demo_page($product['title'], basename($product['slug']), $notice . '<!-- wp:paragraph --><p>' . esc_html($product['description']) . '</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Integração em preparação</h2><!-- /wp:heading --><!-- wp:paragraph --><p>A fonte de dados deste produto ainda não está conectada. Não há medições, previsões ou mapas operacionais nesta demonstração.</p><!-- /wp:paragraph -->', $data);
}
$category = wp_insert_term('Demonstração', 'category');
$category_id = is_wp_error($category) ? 1 : (int) $category['term_id'];
foreach (array('Conheça a nova apresentação do portal NUGEO', 'Um espaço para compartilhar pesquisas e publicações', 'Informação ambiental com clareza e acessibilidade') as $index => $title) {
    wp_insert_post(array('post_title' => $title, 'post_status' => 'publish', 'post_type' => 'post', 'post_category' => array($category_id), 'post_content' => $notice . '<!-- wp:paragraph --><p>Esta é uma publicação de exemplo para avaliar o tema. Ela permite testar a listagem de notícias, a pesquisa e a leitura de uma publicação completa em diferentes tamanhos de tela.</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Conteúdo gerenciado pelo WordPress</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Título, texto, categoria e imagem destacada podem ser alterados no painel. O tema apresenta esses conteúdos utilizando o mesmo padrão visual da página inicial.</p><!-- /wp:paragraph -->', 'post_excerpt' => 'Publicação de exemplo para avaliar o layout, a pesquisa e a leitura de notícias. Não representa uma notícia oficial do NUGEO.', 'comment_status' => 'closed'));
}
update_option('show_on_front', 'page');
update_option('page_on_front', $home);
update_option('page_for_posts', $news);
$menu = wp_create_nav_menu('Navegação NUGEO');
if (!is_wp_error($menu)) {
    foreach (array($home, $about, $labs, $data, $news) as $id) {
        wp_update_nav_menu_item($menu, 0, array('menu-item-object-id' => $id, 'menu-item-object' => 'page', 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish'));
    }
    set_theme_mod('nav_menu_locations', array('primary' => $menu, 'footer' => $menu));
}
update_option('nugeo_local_seeded', 1);
require __DIR__ . '/seed-laboratories.php';
flush_rewrite_rules();

<?php
/** Local evaluation only. Never included in the installable theme. */
require_once '/wordpress/wp-load.php';
if (get_option('nugeo_local_navigation_v1') || !get_option('nugeo_local_seeded')) { return; }
$source_ids = array('LABMET' => 54, 'LABHIDRO' => 230, 'LABGEO' => 776);
$lab_urls = array();
foreach (nugeo_laboratories() as $lab) {
    $page = get_page_by_path($lab['slug']);
    if (!$page) { continue; }
    $source = 'https://www.nugeo.uema.br/?page_id=' . $source_ids[$lab['acronym']];
    // Keep existing editor content. Replace only our explicitly identified initial demo.
    if (false !== strpos($page->post_content, 'Espaço reservado para a equipe')) {
        $content = '<p>Esta página reúne os acessos às áreas de atuação e aos conteúdos de ' . esc_html($lab['title']) . '.</p><p><a href="' . esc_url($source) . '">Consultar a apresentação completa no portal oficial NUGEO/UEMA</a></p>';
        if ('LABGEO' === $lab['acronym']) {
            $content .= '<p><strong>Projetos e Atividades de Campo:</strong> esses itens aparecem no portal original sem uma página de destino. Permanecem registrados para revisão editorial.</p>';
        }
        if ('LABMET' === $lab['acronym']) {
            $content .= '<h2>Laudos Técnicos</h2><p>O portal apresenta este serviço, mas ainda não fornece um link de atendimento. Consulte o laboratório pelo canal institucional.</p>';
        }
        wp_update_post(array('ID' => $page->ID, 'post_title' => $lab['title'], 'post_content' => $content));
    }
    update_post_meta($page->ID, '_wp_page_template', 'page-laboratory.php');
    update_post_meta($page->ID, '_nugeo_laboratory', $lab['acronym']);
    $lab_urls[$lab['acronym']] = get_permalink($page);
}
$menu = wp_create_nav_menu('NUGEO — árvore do portal oficial');
if (is_wp_error($menu)) { return; }
function nugeo_local_menu_items($menu, $items, $parent = 0) {
    foreach ($items as $item) {
        $id = wp_update_nav_menu_item($menu, 0, array('menu-item-title' => $item['label'], 'menu-item-url' => $item['url'], 'menu-item-type' => 'custom', 'menu-item-status' => 'publish', 'menu-item-parent-id' => $parent));
        if (!is_wp_error($id) && $item['children']) { nugeo_local_menu_items($menu, $item['children'], $id); }
    }
}
$tree = nugeo_site_tree();
$tree[0]['url'] = home_url('/');
foreach (array(2 => 'LABMET', 3 => 'LABHIDRO', 4 => 'LABGEO') as $index => $acronym) {
    $tree[$index]['url'] = $lab_urls[$acronym];
    $tree[$index]['children'] = nugeo_lab_resources($acronym);
}
nugeo_local_menu_items($menu, $tree);
$locations = get_theme_mod('nav_menu_locations', array());
$locations['primary'] = $menu;
set_theme_mod('nav_menu_locations', $locations);
update_option('nugeo_local_navigation_v1', 1);

<?php
defined('ABSPATH') || exit;

/** Navigation snapshot of the public site, 27 September 2026. No database mutations. */
function nugeo_site_tree() {
    static $tree;
    if (null === $tree) {
        $tree = json_decode(ltrim(file_get_contents(__DIR__ . '/site-tree.json'), "\xEF\xBB\xBF"), true) ?: array();
    }
    return $tree;
}

function nugeo_lab_resources($acronym) {
    $indices = array('LABMET' => 2, 'LABHIDRO' => 3, 'LABGEO' => 4);
    $tree = nugeo_site_tree();
    $items = $tree[$indices[$acronym]]['children'] ?? array();
    $extras = array(
        'LABGEO' => array('Equipe Técnica' => 'https://www.nugeo.uema.br/?page_id=9221', 'Agende sua visita' => 'https://www.nugeo.uema.br/?page_id=8553'),
        'LABMET' => array('Informativos Climáticos' => 'https://bit.ly/2YqsztP'),
    );
    foreach ($extras[$acronym] ?? array() as $label => $url) {
        $items[] = array('label' => $label, 'url' => $url, 'children' => array());
    }
    return $items;
}

/** Resolve original IDs only when explicitly mapped to imported content. */
function nugeo_resource_url($url) {
    $map = get_option('nugeo_legacy_url_map', array());
    $id = (int) ($map[$url] ?? 0);
    return $id && 'publish' === get_post_status($id) ? get_permalink($id) : $url;
}

function nugeo_resource_links($items) {
    echo '<ul class="nugeo-resource-links">';
    foreach ($items as $item) {
        echo '<li><a href="' . esc_url(nugeo_resource_url($item['url'])) . '">' . esc_html($item['label']) . '</a>';
        if (!empty($item['children'])) { nugeo_resource_links($item['children']); }
        echo '</li>';
    }
    echo '</ul>';
}

function nugeo_tree_menu($items, $nested = false) {
    echo '<ul class="' . ($nested ? 'sub-menu' : 'nugeo-menu') . '">';
    foreach ($items as $item) {
        echo '<li class="' . ($item['children'] ? 'menu-item-has-children' : 'menu-item') . '"><a href="' . esc_url(nugeo_resource_url($item['url'])) . '">' . esc_html($item['label']) . '</a>';
        if ($item['children']) { nugeo_tree_menu($item['children'], true); }
        echo '</li>';
    }
    echo '</ul>';
}

function nugeo_laboratory_template($template) {
    if (is_page()) {
        foreach (nugeo_laboratories() as $lab) {
            if (get_page_uri() === $lab['slug']) { return get_template_directory() . '/page-laboratory.php'; }
        }
    }
    return $template;
}
add_filter('template_include', 'nugeo_laboratory_template');

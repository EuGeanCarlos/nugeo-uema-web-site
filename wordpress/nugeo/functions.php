<?php
/** Configuração do tema NUGEO. */
defined('ABSPATH') || exit;

require_once get_template_directory() . '/inc/content.php';
require_once get_template_directory() . '/inc/laboratories.php';
require_once get_template_directory() . '/inc/customizer.php';

function nugeo_setup() {
    load_theme_textdomain('nugeo', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_editor_style('assets/site.css');
    add_theme_support('custom-logo', array('height' => 100, 'width' => 200, 'flex-height' => true, 'flex-width' => true));
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
    register_nav_menus(array('primary' => __('Navegação principal', 'nugeo'), 'footer' => __('Links do rodapé', 'nugeo')));
    add_image_size('nugeo-card', 840, 560, true);
}
add_action('after_setup_theme', 'nugeo_setup');

function nugeo_assets() {
    $version = wp_get_theme()->get('Version');
    foreach (array('site.css', 'theme.js') as $asset) {
        $file = get_template_directory() . '/assets/' . $asset;
        $url = get_template_directory_uri() . '/assets/' . $asset;
        $asset_version = file_exists($file) ? (string) filemtime($file) : $version;
        if (str_ends_with($asset, '.css')) {
            wp_enqueue_style('nugeo-site', $url, array(), $asset_version);
        } else {
            wp_enqueue_script('nugeo-interactions', $url, array(), $asset_version, array('strategy' => 'defer', 'in_footer' => true));
        }
    }
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'nugeo_assets');

function nugeo_icon($name, $class = '') {
    $url = get_template_directory_uri() . '/assets/icons.svg#' . sanitize_key($name);
    echo '<svg class="nugeo-icon ' . esc_attr($class) . '" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="' . esc_url($url) . '"></use></svg>';
}

function nugeo_asset($path) {
    return get_template_directory_uri() . '/assets/' . ltrim($path, '/');
}

function nugeo_page_url($slug) {
    $page = get_page_by_path($slug);
    return $page && 'publish' === $page->post_status ? get_permalink($page) : '';
}

function nugeo_posts_url() {
    $page = (int) get_option('page_for_posts');
    return $page ? get_permalink($page) : add_query_arg('post_type', 'post', home_url('/'));
}

function nugeo_primary_fallback() {
    $tree = nugeo_site_tree();
    $tree[0]['url'] = home_url('/');
    foreach (nugeo_laboratories() as $index => $lab) {
        $url = nugeo_page_url($lab['slug']);
        $tree[$index + 2]['url'] = $url ?: 'https://www.nugeo.uema.br/?page_id=' . array(54, 230, 776)[$index];
        $tree[$index + 2]['children'] = nugeo_lab_resources($lab['acronym']);
    }
    nugeo_tree_menu($tree);
}

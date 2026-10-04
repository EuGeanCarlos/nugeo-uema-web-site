<?php
/** Local only: fill missing pages and metadata without replacing editor content. */
require_once '/wordpress/wp-load.php';
$parent = get_page_by_path('laboratorios');
if (!$parent) {
    $parent_id = wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_name' => 'laboratorios', 'post_title' => 'Laboratórios'), true);
    if (is_wp_error($parent_id)) { throw new RuntimeException($parent_id->get_error_message()); }
} else { $parent_id = $parent->ID; }
foreach (nugeo_laboratories() as $lab) {
    $page = get_page_by_path($lab['slug']);
    $id = $page ? $page->ID : wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_name' => basename($lab['slug']), 'post_parent' => $parent_id, 'post_title' => $lab['title'], 'post_content' => '', 'comment_status' => 'closed'), true);
    if (is_wp_error($id)) { throw new RuntimeException($id->get_error_message()); }
    update_post_meta($id, '_nugeo_laboratory', $lab['acronym']);
    if (!get_post_meta($id, '_wp_page_template', true) || 'default' === get_post_meta($id, '_wp_page_template', true)) {
        update_post_meta($id, '_wp_page_template', 'page-laboratory.php');
    }
}

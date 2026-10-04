<?php
defined('ABSPATH') || exit;
/** Allowlisted modules; shared templates avoid repeating each laboratory's layout. */
function nugeo_laboratory_profile($page_id = 0) {
    $page_id = $page_id ?: get_queried_object_id();
    $slug = get_post_field('post_name', $page_id);
    $acronym = get_post_meta($page_id, '_nugeo_laboratory', true);
    foreach (nugeo_laboratories() as $base) {
        $key = basename($base['slug']);
        if ($key !== $slug && $base['acronym'] !== $acronym) { continue; }
        $profile = require __DIR__ . '/' . $key . '.php';
        return array_merge($base, $profile, array('key' => $key));
    }
    return null;
}
function nugeo_laboratory_section($section, $lab) {
    if (!in_array($section, array('hero', 'overview', 'areas', 'monitoring', 'products', 'team', 'resources'), true)) { return; }
    get_template_part('template-parts/laboratories/' . $section, null, array('lab' => $lab));
}

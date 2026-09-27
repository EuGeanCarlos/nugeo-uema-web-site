<?php
defined('ABSPATH') || exit;
// Uma listagem explícita de posts deve continuar sendo uma listagem.
if (is_home() && isset($_GET['post_type']) && 'post' === $_GET['post_type']) {
    get_template_part('index');
    return;
}
get_header();
?>
<main id="conteudo-principal" tabindex="-1">
    <?php get_template_part('template-parts/home/hero'); ?>
    <?php get_template_part('template-parts/home/laboratories'); ?>
    <?php get_template_part('template-parts/home/products'); ?>
    <?php if (is_page() && have_posts()) : while (have_posts()) : the_post(); if (trim(get_the_content())) : ?>
        <section class="nugeo-section nugeo-home-editor"><div class="nugeo-container nugeo-prose"><?php the_content(); ?></div></section>
    <?php endif; endwhile; endif; ?>
    <?php get_template_part('template-parts/home/news'); ?>
</main>
<?php get_footer(); ?>

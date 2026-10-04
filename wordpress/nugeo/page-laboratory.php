<?php
/** Template Name: Laboratório NUGEO */
defined('ABSPATH') || exit;
get_header();
?>
<main id="conteudo-principal" class="nugeo-laboratory" tabindex="-1">
<?php while (have_posts()) : the_post(); $lab = nugeo_laboratory_profile(get_the_ID()); ?>
<article <?php post_class(); ?>>
<?php if ($lab && !post_password_required()) : ?>
    <?php nugeo_laboratory_section('hero', $lab); ?>
    <nav class="nugeo-lab-nav" aria-label="Nesta página"><div class="nugeo-container">
        <a href="#sobre">Sobre</a><a href="#areas">Áreas de atuação</a>
        <?php if ($lab['monitoring']) : ?><a href="#monitoramento">Monitoramento</a><?php endif; ?>
        <a href="#produtos">Produtos</a><a href="#equipe">Equipe e contato</a><a href="#acervo">Acervo e serviços</a>
    </div></nav>
    <?php foreach (array('overview', 'areas', 'monitoring', 'products', 'team', 'resources') as $section) { nugeo_laboratory_section($section, $lab); } ?>
    <?php if (trim(get_the_content())) : ?>
        <section class="nugeo-lab-section nugeo-container" aria-labelledby="editor-title"><h2 id="editor-title">Informações complementares</h2><div class="nugeo-prose"><?php the_content(); wp_link_pages(); ?></div></section>
    <?php endif; ?>
    <nav class="nugeo-container nugeo-child-pages" aria-label="Outros laboratórios">
    <?php foreach (nugeo_laboratories() as $other) : $url = nugeo_page_url($other['slug']); if ($url && $other['acronym'] !== $lab['acronym']) : ?>
        <a href="<?php echo esc_url($url); ?>"><?php echo esc_html($other['title']); ?><?php nugeo_icon('arrow-right'); ?></a>
    <?php endif; endforeach; ?>
    </nav>
<?php else : ?>
    <header class="nugeo-page-heading"><div class="nugeo-container"><h1><?php the_title(); ?></h1></div></header>
    <div class="nugeo-container nugeo-article-body nugeo-prose"><?php the_content(); wp_link_pages(); ?></div>
<?php endif; ?>
</article>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>

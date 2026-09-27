<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="conteudo-principal" class="nugeo-listing" tabindex="-1">
    <header class="nugeo-page-heading"><div class="nugeo-container">
        <p class="nugeo-eyebrow">NUGEO / UEMA</p>
        <h1><?php if (is_search()) { printf(esc_html__('Resultados para: %s', 'nugeo'), esc_html(get_search_query())); } elseif (is_archive()) { the_archive_title(); } else { esc_html_e('Notícias e publicações', 'nugeo'); } ?></h1>
        <?php if (is_archive()) : ?><div class="nugeo-archive-description"><?php the_archive_description(); ?></div><?php endif; ?>
    </div></header>
    <div class="nugeo-container nugeo-section">
        <?php if (have_posts()) : ?>
            <div class="nugeo-news-grid"><?php while (have_posts()) : the_post(); get_template_part('template-parts/content', 'card'); endwhile; ?></div>
            <?php the_posts_pagination(array('mid_size' => 1, 'prev_text' => '← Anteriores', 'next_text' => 'Próximas →')); ?>
        <?php else : ?>
            <div class="nugeo-empty-state"><?php nugeo_icon('search'); ?><h2><?php echo is_search() ? esc_html__('Nenhum resultado encontrado', 'nugeo') : esc_html__('Ainda não há publicações', 'nugeo'); ?></h2><p>Experimente pesquisar por outro termo ou volte à página inicial.</p><?php get_search_form(); ?><a class="nugeo-text-link" href="<?php echo esc_url(home_url('/')); ?>">Voltar ao início <?php nugeo_icon('arrow-right'); ?></a></div>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>

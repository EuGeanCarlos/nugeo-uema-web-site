<?php defined('ABSPATH') || exit; $nugeo_news = new WP_Query(array('post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => 3, 'ignore_sticky_posts' => true, 'no_found_rows' => true)); ?>
<section class="nugeo-section" id="noticias" aria-labelledby="news-title">
    <div class="nugeo-container">
        <?php nugeo_section_heading('Notícias e publicações', 'Conhecimento que circula', 'Acompanhe pesquisas, atividades e publicações das equipes do NUGEO.', 'news-title'); ?>
        <?php if ($nugeo_news->have_posts()) : ?>
            <div class="nugeo-news-grid">
                <?php while ($nugeo_news->have_posts()) : $nugeo_news->the_post(); get_template_part('template-parts/content', 'card'); endwhile; ?>
            </div>
            <div class="nugeo-section-action"><a class="nugeo-button nugeo-button-outline" href="<?php echo esc_url(nugeo_posts_url()); ?>">Todas as notícias <?php nugeo_icon('arrow-right'); ?></a></div>
        <?php else : ?>
            <div class="nugeo-empty-state"><?php nugeo_icon('newspaper'); ?><h3>Em breve, novas publicações</h3><p>As notícias publicadas no WordPress aparecerão aqui.</p></div>
        <?php endif; wp_reset_postdata(); ?>
    </div>
</section>

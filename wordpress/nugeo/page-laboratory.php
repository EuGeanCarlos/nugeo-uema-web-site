<?php
/** Template Name: Laboratório NUGEO */
defined('ABSPATH') || exit;
get_header();
$laboratory = null;
foreach (nugeo_laboratories() as $candidate) {
    if (basename($candidate['slug']) === get_post_field('post_name', get_queried_object_id()) || get_post_meta(get_queried_object_id(), '_nugeo_laboratory', true) === $candidate['acronym']) {
        $laboratory = $candidate;
        break;
    }
}
?>
<main id="conteudo-principal" tabindex="-1">
<?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('nugeo-article'); ?>>
        <header class="nugeo-page-heading"><div class="nugeo-container">
            <a class="nugeo-breadcrumb" href="<?php echo esc_url(home_url('/#laboratorios')); ?>">Início / Laboratórios</a>
            <?php if ($laboratory) : ?><p class="nugeo-eyebrow"><?php echo esc_html($laboratory['acronym']); ?></p><?php endif; ?>
            <h1><?php the_title(); ?></h1>
            <?php if ($laboratory) : ?><p class="nugeo-section-description"><?php echo esc_html($laboratory['description']); ?></p><?php endif; ?>
        </div></header>
        <div class="nugeo-container nugeo-article-body">
            <?php if (has_post_thumbnail()) : ?><div class="nugeo-featured-image"><?php the_post_thumbnail('large'); ?></div><?php endif; ?>
            <div class="nugeo-prose"><?php the_content(); wp_link_pages(); ?></div>
            <?php if ($laboratory && !post_password_required()) : ?>
                <section class="nugeo-lab-resources" aria-labelledby="lab-resources-title">
                    <h2 id="lab-resources-title">Áreas, serviços e publicações</h2>
                    <p>Consulte os conteúdos do laboratório. Os links para o portal oficial mantêm o acesso aos documentos e às séries históricas durante a migração.</p>
                    <div class="nugeo-resource-grid">
                        <?php foreach (nugeo_lab_resources($laboratory['acronym']) as $resource) : ?>
                            <section class="nugeo-resource-card" data-reveal>
                                <h3><a href="<?php echo esc_url(nugeo_resource_url($resource['url'])); ?>"><?php echo esc_html($resource['label']); ?> <?php nugeo_icon('arrow-up-right'); ?></a></h3>
                                <?php if ($resource['children']) { nugeo_resource_links($resource['children']); } ?>
                            </section>
                        <?php endforeach; ?>
                    </div>
                </section>
                <nav class="nugeo-child-pages" aria-label="Outros laboratórios">
                    <?php foreach (nugeo_laboratories() as $other) : $url = nugeo_page_url($other['slug']); if ($url && $other['acronym'] !== $laboratory['acronym']) : ?>
                        <a href="<?php echo esc_url($url); ?>"><?php echo esc_html($other['title']); ?><?php nugeo_icon('arrow-right'); ?></a>
                    <?php endif; endforeach; ?>
                </nav>
            <?php endif; ?>
        </div>
    </article>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>

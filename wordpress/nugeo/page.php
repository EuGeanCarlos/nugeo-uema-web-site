<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="conteudo-principal" tabindex="-1">
    <?php while (have_posts()) : the_post(); ?>
        <article <?php post_class('nugeo-article'); ?>>
            <header class="nugeo-page-heading"><div class="nugeo-container"><a class="nugeo-breadcrumb" href="<?php echo esc_url(home_url('/')); ?>">Início /</a><h1><?php the_title(); ?></h1></div></header>
            <div class="nugeo-container nugeo-article-body">
                <?php if (has_post_thumbnail()) : ?><div class="nugeo-featured-image"><?php the_post_thumbnail('large'); ?></div><?php endif; ?>
                <div class="nugeo-prose"><?php the_content(); wp_link_pages(); ?></div>
                <?php if (!post_password_required()) : $nugeo_children = get_pages(array('parent' => get_the_ID(), 'sort_column' => 'menu_order,post_title', 'post_status' => 'publish')); if ($nugeo_children) : ?>
                    <nav class="nugeo-child-pages" aria-label="Nesta seção"><?php foreach ($nugeo_children as $child) : ?><a href="<?php echo esc_url(get_permalink($child)); ?>"><?php echo esc_html($child->post_title); ?><?php nugeo_icon('arrow-right'); ?></a><?php endforeach; ?></nav>
                <?php endif; endif; ?>
            </div>
        </article>
        <?php if (comments_open() || get_comments_number()) : comments_template(); endif; ?>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>

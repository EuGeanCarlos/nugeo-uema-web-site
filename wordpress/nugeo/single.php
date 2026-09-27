<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="conteudo-principal" tabindex="-1">
    <?php while (have_posts()) : the_post(); ?>
        <article <?php post_class('nugeo-article'); ?>>
            <header class="nugeo-page-heading"><div class="nugeo-container">
                <a class="nugeo-breadcrumb" href="<?php echo esc_url(nugeo_posts_url()); ?>">Notícias e publicações /</a>
                <h1><?php the_title(); ?></h1>
                <div class="nugeo-post-meta"><time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(get_the_date()); ?></time><span>Por <?php the_author(); ?></span></div>
            </div></header>
            <div class="nugeo-container nugeo-article-body">
                <?php if (has_post_thumbnail()) : ?><div class="nugeo-featured-image"><?php the_post_thumbnail('large'); ?></div><?php endif; ?>
                <div class="nugeo-prose"><?php the_content(); wp_link_pages(); ?></div>
                <?php the_post_navigation(array('prev_text' => '← %title', 'next_text' => '%title →')); ?>
            </div>
        </article>
        <?php if (comments_open() || get_comments_number()) : comments_template(); endif; ?>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>

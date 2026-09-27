<?php defined('ABSPATH') || exit; ?>
<article <?php post_class('nugeo-news-card'); ?> data-reveal>
    <a class="nugeo-news-image" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
        <?php if (has_post_thumbnail()) : the_post_thumbnail('nugeo-card', array('loading' => 'lazy', 'alt' => '')); else : ?>
            <div class="nugeo-news-placeholder"><?php nugeo_icon('newspaper'); ?><span>NUGEO / UEMA</span></div>
        <?php endif; ?>
    </a>
    <div class="nugeo-news-body">
        <div class="nugeo-news-meta"><time datetime="<?php echo esc_attr(get_the_date(DATE_W3C)); ?>"><?php echo esc_html(get_the_date()); ?></time><?php $nugeo_categories = get_the_category(); if ($nugeo_categories) : ?><span><?php echo esc_html($nugeo_categories[0]->name); ?></span><?php endif; ?></div>
        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 25)); ?></p>
        <a class="nugeo-text-link" href="<?php the_permalink(); ?>">Ler publicação <span class="screen-reader-text"><?php the_title(); ?></span><?php nugeo_icon('arrow-up-right'); ?></a>
    </div>
</article>

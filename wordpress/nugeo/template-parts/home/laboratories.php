<?php defined('ABSPATH') || exit; ?>
<section class="nugeo-section" id="laboratorios" aria-labelledby="laboratories-title">
    <div class="nugeo-container">
        <?php nugeo_section_heading('Estrutura científica', 'Laboratórios e unidades técnicas', 'Diferentes áreas do conhecimento, um propósito em comum: transformar ciência em informação para o Maranhão.', 'laboratories-title'); ?>
        <div class="nugeo-labs-grid">
            <?php foreach (nugeo_laboratories() as $lab) : $url = nugeo_page_url($lab['slug']); $page = get_page_by_path($lab['slug']); ?>
                <article class="nugeo-lab-card" data-reveal>
                    <div class="nugeo-lab-visual nugeo-lab-<?php echo esc_attr($lab['theme']); ?>">
                        <?php if ($page && has_post_thumbnail($page->ID)) : echo get_the_post_thumbnail($page->ID, 'nugeo-card', array('loading' => 'lazy', 'class' => 'nugeo-lab-photo')); else : ?>
                            <div class="nugeo-lab-grid-art" aria-hidden="true"></div>
                            <?php nugeo_icon($lab['icon'], 'nugeo-lab-symbol'); ?>
                        <?php endif; ?>
                        <span class="nugeo-lab-acronym"><?php echo esc_html($lab['acronym']); ?></span>
                    </div>
                    <div class="nugeo-lab-body">
                        <h3><?php echo esc_html($lab['title']); ?></h3>
                        <p><?php echo esc_html($lab['description']); ?></p>
                        <?php if ($url) : ?><a class="nugeo-text-link" href="<?php echo esc_url($url); ?>">Conhecer o laboratório <span class="screen-reader-text"><?php echo esc_html($lab['acronym']); ?></span><?php nugeo_icon('arrow-up-right'); ?></a>
                        <?php else : ?><span class="nugeo-muted">Página em preparação</span><?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

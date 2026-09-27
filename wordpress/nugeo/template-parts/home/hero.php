<?php defined('ABSPATH') || exit; ?>
<section class="nugeo-hero" aria-labelledby="hero-title" id="inicio">
    <img class="nugeo-hero-image" src="<?php echo esc_url(get_theme_mod('nugeo_hero_image') ?: nugeo_asset('nugeo-hero.webp')); ?>" alt="" width="1920" height="1080" fetchpriority="high" decoding="async">
    <div class="nugeo-hero-overlay" aria-hidden="true"></div>
    <div class="nugeo-container nugeo-hero-inner">
        <div class="nugeo-hero-copy">
            <p class="nugeo-eyebrow nugeo-hero-eyebrow">NUGEO · Pesquisa, ensino e extensão</p>
            <h1 id="hero-title"><?php echo esc_html(get_theme_mod('nugeo_hero_title', 'Ciência, monitoramento e inovação para o')); ?> <span><?php echo esc_html(get_theme_mod('nugeo_hero_highlight', 'território maranhense')); ?></span></h1>
            <p class="nugeo-hero-description"><?php echo esc_html(get_theme_mod('nugeo_hero_description', 'Produzimos conhecimento, dados e soluções em meteorologia, recursos hídricos, geotecnologias e estudos ambientais para apoiar decisões e promover qualidade de vida.')); ?></p>
            <div class="nugeo-hero-actions">
                <a class="nugeo-button" href="#laboratorios">Conhecer laboratórios <?php nugeo_icon('arrow-right'); ?></a>
                <a class="nugeo-button nugeo-button-glass" href="#dados">Dados e produtos <?php nugeo_icon('database'); ?></a>
            </div>
        </div>
        <a class="nugeo-scroll-hint" href="#laboratorios">Explore o núcleo <?php nugeo_icon('arrow-down'); ?></a>
    </div>
</section>
<div class="nugeo-container nugeo-expertise" aria-label="Áreas de atuação">
    <?php foreach (array('cloud-sun' => 'Meteorologia', 'droplets' => 'Recursos hídricos', 'map-pinned' => 'Geotecnologias', 'flask-conical' => 'Pesquisa e extensão') as $icon => $label) : ?>
        <div><?php nugeo_icon($icon); ?><span><?php echo esc_html($label); ?></span></div>
    <?php endforeach; ?>
</div>

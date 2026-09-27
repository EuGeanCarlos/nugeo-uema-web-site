<?php defined('ABSPATH') || exit; ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('nugeo-site'); ?>>
<?php wp_body_open(); ?>
<a class="nugeo-skip" href="#conteudo-principal"><?php esc_html_e('Ir para o conteúdo principal', 'nugeo'); ?></a>
<aside class="nugeo-institutional" aria-label="Vínculo institucional">
    <div class="nugeo-container">
        <span>Universidade Estadual do Maranhão</span>
        <a href="https://www.uema.br" target="_blank" rel="noopener noreferrer">Portal UEMA <?php nugeo_icon('external-link'); ?><span class="screen-reader-text"> (abre em nova aba)</span></a>
    </div>
</aside>
<header class="nugeo-header" id="site-header">
    <div class="nugeo-container nugeo-header-inner">
        <div class="nugeo-brand">
            <?php if (has_custom_logo()) : the_custom_logo(); else : ?>
                <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="NUGEO — Página inicial"><img src="<?php echo esc_url(nugeo_asset('nugeo-logo.svg')); ?>" width="248" height="150" alt="NUGEO — Núcleo Geoambiental da UEMA"></a>
            <?php endif; ?>
        </div>
        <nav class="nugeo-navigation" id="primary-navigation" aria-label="<?php esc_attr_e('Navegação principal', 'nugeo'); ?>">
            <?php wp_nav_menu(array('theme_location' => 'primary', 'container' => false, 'menu_class' => 'nugeo-menu', 'fallback_cb' => 'nugeo_primary_fallback', 'depth' => 0)); ?>
        </nav>
        <div class="nugeo-header-actions">
            <a class="nugeo-button nugeo-button-small nugeo-data-action" href="<?php echo esc_url(home_url('/#dados')); ?>">Dados e produtos <?php nugeo_icon('arrow-up-right'); ?></a>
            <button type="button" class="nugeo-icon-button" data-search-toggle aria-expanded="false" aria-controls="site-search" aria-label="Abrir pesquisa"><?php nugeo_icon('search'); ?></button>
            <button type="button" class="nugeo-icon-button nugeo-menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation" aria-label="Abrir menu principal"><?php nugeo_icon('menu'); ?></button>
        </div>
    </div>
    <div class="nugeo-search-panel" id="site-search" hidden>
        <div class="nugeo-container"><?php get_search_form(); ?></div>
    </div>
    <noscript><div class="nugeo-container nugeo-search-panel"><?php get_search_form(); ?></div></noscript>
</header>

<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<header class="nugeo-lab-hero"><div class="nugeo-container nugeo-lab-hero-grid">
<div>
    <a class="nugeo-breadcrumb" href="<?php echo esc_url(home_url('/#laboratorios')); ?>">Início / Laboratórios</a>
    <p class="nugeo-eyebrow"><?php echo esc_html($lab['acronym']); ?><?php if ($lab['year']) : ?><span>Desde <?php echo esc_html($lab['year']); ?></span><?php endif; ?></p>
    <h1><?php echo esc_html($lab['title']); ?></h1><p class="nugeo-lab-lead"><?php echo esc_html($lab['summary']); ?></p>
    <?php if ($lab['illustrative']) : ?><p class="nugeo-lab-notice"><strong>Conteúdo ilustrativo.</strong> Textos e ilustração demonstram a estrutura e serão substituídos pelo conteúdo oficial.</p><?php endif; ?>
    <div class="nugeo-lab-actions"><a class="nugeo-button" href="#produtos">Explorar produtos <?php nugeo_icon('arrow-right'); ?></a><a class="nugeo-lab-text-link" href="#equipe">Equipe e contato</a></div>
</div>
<?php if (has_post_thumbnail()) : ?>
    <figure class="nugeo-lab-hero-image"><?php echo get_the_post_thumbnail(get_the_ID(), 'large', array('loading' => 'eager')); ?></figure>
<?php elseif ($lab['illustrative']) : ?>
    <figure class="nugeo-lab-hero-image"><img src="<?php echo esc_url(nugeo_asset('laboratories/' . $lab['key'] . '.svg')); ?>" width="640" height="480" alt="<?php echo esc_attr('Composição abstrata ilustrativa para o ' . $lab['acronym'] . ', sem representar medições ou instalações reais.'); ?>"><figcaption>Ilustração conceitual • sem dados geográficos reais</figcaption></figure>
<?php else : ?>
    <div class="nugeo-lab-hero-aside"><p class="nugeo-eyebrow">Observação e pesquisa</p><p>Atmosfera.<br>Clima.<br>Território.</p><span>Conhecimento ambiental para o Maranhão</span></div>
<?php endif; ?>
</div></header>

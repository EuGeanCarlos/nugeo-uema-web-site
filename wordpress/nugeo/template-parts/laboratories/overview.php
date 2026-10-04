<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<section class="nugeo-lab-section nugeo-container" id="sobre" aria-labelledby="sobre-title">
<p class="nugeo-eyebrow">Identidade institucional</p><h2 id="sobre-title">Sobre o <?php echo esc_html($lab['acronym']); ?></h2>
<div class="nugeo-lab-overview"><div>
    <p class="nugeo-lab-introduction"><?php echo esc_html($lab['introduction']); ?></p>
    <div class="nugeo-lab-principles"><?php foreach (array('mission' => 'Missão', 'vision' => 'Visão', 'objectives' => 'Objetivos') as $key => $title) : ?>
        <section><h3><?php echo esc_html($title); ?></h3><p><?php echo esc_html($lab[$key] ?: 'Texto institucional aguardando validação.'); ?></p></section>
    <?php endforeach; ?></div>
</div>
<aside class="nugeo-lab-facts" aria-label="Identificação institucional"><h3>Ficha institucional</h3><dl>
    <div><dt>Nome</dt><dd><?php echo esc_html($lab['title']); ?></dd></div><div><dt>Sigla</dt><dd><?php echo esc_html($lab['acronym']); ?></dd></div>
    <div><dt>Ano de criação</dt><dd><?php echo esc_html($lab['year'] ?: 'A informar'); ?></dd></div>
    <div><dt>Coordenação<?php if ($lab['coordinator']) { echo ' — referência histórica'; } ?></dt><dd><?php echo esc_html($lab['coordinator'] ?: 'A informar'); ?><?php if ($lab['coordinator_reference']) : ?><small><?php echo esc_html($lab['coordinator_reference']); ?></small><?php endif; ?></dd></div>
    <div><dt>E-mail institucional</dt><dd><?php if ($lab['email']) : ?><a href="<?php echo esc_url('mailto:' . $lab['email']); ?>"><?php echo esc_html($lab['email']); ?></a><?php else : ?>A informar<?php endif; ?></dd></div>
</dl></aside></div>
</section>

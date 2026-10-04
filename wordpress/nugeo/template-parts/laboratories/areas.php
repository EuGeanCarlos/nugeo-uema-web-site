<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<section class="nugeo-lab-band" id="areas" aria-labelledby="areas-title"><div class="nugeo-container nugeo-lab-section">
<p class="nugeo-eyebrow">Conhecimento em conexão</p><h2 id="areas-title">Áreas de atuação</h2>
<?php if ($lab['illustrative']) : ?><p class="nugeo-lab-caption">Organização ilustrativa baseada na apresentação disponível do laboratório.</p><?php endif; ?>
<div class="nugeo-lab-areas"><?php foreach ($lab['areas'] as $area) : ?><div data-reveal><?php nugeo_icon($area[1]); ?><h3><?php echo esc_html($area[0]); ?></h3></div><?php endforeach; ?></div>
</div></section>

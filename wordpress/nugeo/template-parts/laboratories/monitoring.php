<?php defined('ABSPATH') || exit; $lab = $args['lab']; if (!$lab['monitoring']) { return; } ?>
<section class="nugeo-lab-section nugeo-container" id="monitoramento" aria-labelledby="monitoramento-title">
<p class="nugeo-eyebrow">Da observação à análise</p><h2 id="monitoramento-title">Monitoramento</h2>
<p class="nugeo-lab-caption">Atividades descritas no briefing do LABMET. Esta página apresenta as frentes de trabalho; não exibe medições em tempo real.</p>
<div class="nugeo-lab-grid"><?php foreach ($lab['monitoring'] as $index => $item) : ?><section class="nugeo-lab-card-detail" data-reveal><span class="nugeo-lab-number" aria-hidden="true"><?php echo esc_html(sprintf('%02d', $index + 1)); ?></span><h3><?php echo esc_html($item['title']); ?></h3><p><?php echo esc_html($item['text']); ?></p></section><?php endforeach; ?></div>
</section>

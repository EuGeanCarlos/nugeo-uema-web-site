<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<section class="nugeo-lab-band" id="acervo" aria-labelledby="lab-resources-title"><div class="nugeo-container nugeo-lab-section nugeo-lab-resources">
<p class="nugeo-eyebrow">Memória e continuidade</p><h2 id="lab-resources-title">Acervo e serviços do laboratório</h2>
<p class="nugeo-lab-caption">Acessos do portal oficial preservados durante a migração, incluindo documentos e séries históricas.</p>
<div class="nugeo-resource-grid"><?php foreach (nugeo_lab_resources($lab['acronym']) as $resource) : ?><section class="nugeo-resource-card" data-reveal><h3><a href="<?php echo esc_url(nugeo_resource_url($resource['url'])); ?>"><?php echo esc_html($resource['label']); ?> <?php nugeo_icon('arrow-up-right'); ?></a></h3><?php if ($resource['children']) { nugeo_resource_links($resource['children']); } ?></section><?php endforeach; ?></div>
<?php if ($lab['references']) : ?><div class="nugeo-lab-references"><h3>Referências institucionais citadas no briefing</h3><p><?php echo esc_html(implode(' · ', $lab['references'])); ?></p></div><?php endif; ?>
</div></section>

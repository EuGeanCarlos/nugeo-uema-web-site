<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<section class="nugeo-lab-band" id="produtos" aria-labelledby="produtos-title"><div class="nugeo-container nugeo-lab-section">
<p class="nugeo-eyebrow">Ciência acessível</p><h2 id="produtos-title">Catálogo de produtos</h2>
<p class="nugeo-lab-caption"><?php echo esc_html($lab['illustrative'] ? 'Catálogo ilustrativo para avaliação da estrutura. Os materiais serão cadastrados após validação institucional.' : 'Produtos organizados por área. Consulte os acervos disponíveis; os itens sem link ainda aguardam a publicação dos materiais.'); ?></p>
<div class="nugeo-lab-grid"><?php foreach ($lab['products'] as $product) : ?>
<section class="nugeo-lab-card-detail nugeo-lab-product" data-reveal>
    <?php if ($product['image_id']) { echo wp_get_attachment_image($product['image_id'], 'medium_large'); } ?>
    <h3><?php echo esc_html($product['title']); ?></h3><ul><?php foreach ($product['items'] as $item) : ?><li><?php echo esc_html($item); ?></li><?php endforeach; ?></ul>
    <div class="nugeo-lab-product-links">
    <?php $has_link = false; foreach (array('url' => 'Consultar acervo relacionado', 'pdf' => 'Abrir PDF', 'map' => 'Abrir mapa', 'dashboard' => 'Abrir painel') as $field => $label) : if (!empty($product[$field])) : $has_link = true; ?>
        <a href="<?php echo esc_url(nugeo_resource_url($product[$field])); ?>"><?php echo esc_html($label); ?> <?php nugeo_icon('arrow-up-right'); ?></a>
    <?php endif; endforeach; if (!$has_link) : ?><span>Materiais a disponibilizar</span><?php endif; ?>
    </div>
    <?php if ($product['updated_at']) : ?><small>Atualização: <?php echo esc_html($product['updated_at']); ?></small><?php endif; ?>
    <?php if ($product['source']) : ?><small>Fonte: <?php echo esc_html($product['source']); ?></small><?php endif; ?>
</section>
<?php endforeach; ?></div>
</div></section>

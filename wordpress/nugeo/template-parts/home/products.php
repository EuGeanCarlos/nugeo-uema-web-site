<?php defined('ABSPATH') || exit; ?>
<section class="nugeo-section nugeo-products" id="dados" aria-labelledby="products-title">
    <div class="nugeo-container">
        <div class="nugeo-products-heading">
            <?php nugeo_section_heading('Informação para a sociedade', 'Dados ambientais para o Maranhão', 'Explore os produtos e as frentes de monitoramento do núcleo.', 'products-title'); ?>
            <?php nugeo_icon('database', 'nugeo-section-symbol'); ?>
        </div>
        <div class="nugeo-products-grid">
            <?php foreach (nugeo_products() as $product) : $url = nugeo_page_url($product['slug']); ?>
                <article class="nugeo-product-card" data-reveal>
                    <div class="nugeo-product-top"><span class="nugeo-product-icon"><?php nugeo_icon($product['icon']); ?></span><span class="nugeo-product-tag"><?php echo esc_html($product['tag']); ?></span></div>
                    <h3><?php echo esc_html($product['title']); ?></h3>
                    <p><?php echo esc_html($product['description']); ?></p>
                    <?php if ($url) : ?><a class="nugeo-text-link" href="<?php echo esc_url($url); ?>">Explorar <span class="screen-reader-text"><?php echo esc_html($product['title']); ?></span><?php nugeo_icon('arrow-right'); ?></a>
                    <?php else : ?><span class="nugeo-muted">Conteúdo em preparação</span><?php endif; ?>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

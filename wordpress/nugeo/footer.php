<?php defined('ABSPATH') || exit; ?>
<footer class="nugeo-footer" id="contato">
    <div class="nugeo-container nugeo-footer-grid">
        <div class="nugeo-footer-brand">
            <a href="<?php echo esc_url(home_url('/')); ?>"><img src="<?php echo esc_url(nugeo_asset('nugeo-logo-white.svg')); ?>" width="384" height="204" loading="lazy" alt="NUGEO — Página inicial"></a>
            <p>Ciência e informação para compreender o clima, a água e o território do Maranhão.</p>
            <a class="nugeo-footer-uema" href="https://www.uema.br" target="_blank" rel="noopener noreferrer">Universidade Estadual do Maranhão <?php nugeo_icon('external-link'); ?><span class="screen-reader-text"> (abre em nova aba)</span></a>
        </div>
        <nav aria-label="Institucional">
            <h2>Explore o NUGEO</h2>
            <?php if (has_nav_menu('footer')) : wp_nav_menu(array('theme_location' => 'footer', 'container' => false, 'depth' => 1)); else : ?>
                <ul>
                    <?php if (nugeo_page_url('sobre')) : ?><li><a href="<?php echo esc_url(nugeo_page_url('sobre')); ?>">O NUGEO</a></li><?php endif; ?>
                    <li><a href="<?php echo esc_url(home_url('/#laboratorios')); ?>">Laboratórios</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#dados')); ?>">Dados e produtos</a></li>
                    <li><a href="<?php echo esc_url(nugeo_posts_url()); ?>">Notícias e publicações</a></li>
                </ul>
            <?php endif; ?>
        </nav>
        <div class="nugeo-footer-contact">
            <h2>Fale com o núcleo</h2>
            <address>
                <p><?php nugeo_icon('map-pin'); ?><span><?php echo esc_html(get_theme_mod('nugeo_contact_address', 'Cidade Universitária Paulo VI — São Luís, Maranhão')); ?></span></p>
                <?php $nugeo_phone = get_theme_mod('nugeo_contact_phone', ''); if ($nugeo_phone) : ?>
                    <p><?php nugeo_icon('phone'); ?><a href="tel:<?php echo esc_attr(preg_replace('/[^+0-9]/', '', $nugeo_phone)); ?>"><?php echo esc_html($nugeo_phone); ?></a></p>
                <?php endif; ?>
                <?php $nugeo_email = get_theme_mod('nugeo_contact_email', ''); if ($nugeo_email) : ?>
                    <p><?php nugeo_icon('mail'); ?><a href="mailto:<?php echo esc_attr($nugeo_email); ?>"><?php echo esc_html($nugeo_email); ?></a></p>
                <?php endif; ?>
            </address>
        </div>
    </div>
    <div class="nugeo-container nugeo-footer-bottom">
        <p>© <?php echo esc_html(wp_date('Y')); ?> NUGEO / UEMA. Ciência a serviço da sociedade.</p>
        <div><?php if (get_privacy_policy_url()) : ?><a href="<?php echo esc_url(get_privacy_policy_url()); ?>">Privacidade</a><?php endif; ?><a class="nugeo-back-top" href="#site-header">Voltar ao topo <?php nugeo_icon('arrow-up'); ?></a></div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>

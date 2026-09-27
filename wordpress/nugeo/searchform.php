<?php defined('ABSPATH') || exit; $nugeo_search_id = wp_unique_id('nugeo-search-'); ?>
<form role="search" method="get" class="nugeo-search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label class="screen-reader-text" for="<?php echo esc_attr($nugeo_search_id); ?>">Pesquisar no portal NUGEO</label>
    <input id="<?php echo esc_attr($nugeo_search_id); ?>" type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>" placeholder="Pesquisar notícias, páginas e publicações" required>
    <button class="nugeo-button" type="submit"><?php nugeo_icon('search'); ?><span>Pesquisar</span></button>
</form>

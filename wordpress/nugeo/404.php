<?php defined('ABSPATH') || exit; get_header(); ?>
<main id="conteudo-principal" class="nugeo-container nugeo-section" tabindex="-1">
    <div class="nugeo-empty-state"><p class="nugeo-eyebrow">Erro 404</p><h1>Não encontramos esta página</h1><p>O endereço pode ter mudado. Use a pesquisa ou continue pela página inicial.</p><?php get_search_form(); ?><a class="nugeo-button" href="<?php echo esc_url(home_url('/')); ?>">Voltar ao início <?php nugeo_icon('arrow-right'); ?></a></div>
</main>
<?php get_footer(); ?>

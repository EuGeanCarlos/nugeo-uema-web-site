<?php defined('ABSPATH') || exit; if (post_password_required()) { return; } ?>
<section class="nugeo-container nugeo-comments" id="comments" aria-label="Comentários">
    <?php if (have_comments()) : ?><h2>Comentários</h2><ol class="comment-list"><?php wp_list_comments(array('style' => 'ol', 'short_ping' => true)); ?></ol><?php the_comments_pagination(); endif; ?>
    <?php comment_form(); ?>
</section>

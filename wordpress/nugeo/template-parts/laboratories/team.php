<?php defined('ABSPATH') || exit; $lab = $args['lab']; ?>
<section class="nugeo-lab-section nugeo-container" id="equipe" aria-labelledby="equipe-title">
<p class="nugeo-eyebrow">Pessoas e conhecimento</p><h2 id="equipe-title">Equipe e contato</h2>
<?php if ($lab['team']) : ?>
    <p class="nugeo-lab-caption">Equipe e titulações informadas no briefing. A chefia está referenciada até 30/06/2026; a composição atual aguarda confirmação institucional.</p>
    <div class="nugeo-lab-grid"><?php foreach ($lab['team'] as $person) : ?>
    <section class="nugeo-lab-card-detail nugeo-lab-person" data-reveal>
        <?php if ($person['photo_id']) { echo wp_get_attachment_image($person['photo_id'], 'thumbnail'); } ?>
        <h3><?php echo esc_html($person['name']); ?></h3><p class="nugeo-lab-role"><?php echo esc_html($person['role']); ?></p>
        <ul><?php foreach ($person['qualifications'] as $qualification) : ?><li><?php echo esc_html($qualification); ?></li><?php endforeach; ?></ul>
        <?php if ($person['area']) : ?><p><strong>Área:</strong> <?php echo esc_html($person['area']); ?></p><?php endif; ?>
        <div class="nugeo-lab-person-links"><a href="<?php echo esc_url('mailto:' . $person['email']); ?>"><?php echo esc_html($person['email']); ?></a><a href="<?php echo esc_url($person['lattes']); ?>">Currículo Lattes <?php nugeo_icon('arrow-up-right'); ?><span class="screen-reader-text"> de <?php echo esc_html($person['name']); ?></span></a></div>
    </section>
    <?php endforeach; ?></div>
<?php else : ?>
    <p class="nugeo-lab-caption">Estrutura ilustrativa. Os nomes, fotografias e contatos serão inseridos após o envio do briefing oficial.</p>
    <div class="nugeo-lab-grid"><?php foreach (array('Coordenação', 'Pesquisa', 'Apoio técnico') as $role) : ?><section class="nugeo-lab-card-detail"><p class="nugeo-eyebrow">Modelo de card</p><h3><?php echo esc_html($role); ?></h3><p>Espaço para nome, cargo, formação e área de atuação.</p><p class="nugeo-lab-caption">Foto e contatos a cadastrar.</p></section><?php endforeach; ?></div>
<?php endif; ?>
</section>

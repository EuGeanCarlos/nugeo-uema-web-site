<?php
defined('ABSPATH') || exit;

function nugeo_laboratories() {
    return array(
        array('slug' => 'laboratorios/labmet', 'acronym' => 'LABMET', 'title' => 'Laboratório de Meteorologia', 'description' => 'Monitoramento atmosférico, previsão do tempo e estudos climáticos para o Maranhão.', 'icon' => 'cloud-sun', 'theme' => 'weather'),
        array('slug' => 'laboratorios/labhidro', 'acronym' => 'LABHIDRO', 'title' => 'Laboratório de Recursos Hídricos', 'description' => 'Hidrologia, qualidade da água e monitoramento das bacias hidrográficas.', 'icon' => 'droplets', 'theme' => 'water'),
        array('slug' => 'laboratorios/labgeo', 'acronym' => 'LABGEO', 'title' => 'Laboratório de Geoprocessamento', 'description' => 'Cartografia, sensoriamento remoto e análise territorial a serviço da pesquisa.', 'icon' => 'map-pinned', 'theme' => 'land'),
    );
}

function nugeo_products() {
    return array(
        array('slug' => 'dados/previsao-do-tempo', 'title' => 'Previsão do tempo', 'description' => 'Informações meteorológicas para os municípios do Maranhão.', 'icon' => 'cloud-sun', 'tag' => 'Meteorologia'),
        array('slug' => 'dados/chuvas', 'title' => 'Chuvas observadas', 'description' => 'Registros de precipitação e distribuição espacial das chuvas.', 'icon' => 'cloud-rain', 'tag' => 'Precipitação'),
        array('slug' => 'dados/condicoes-atmosfericas', 'title' => 'Condições atmosféricas', 'description' => 'Sistemas meteorológicos e acompanhamento da atmosfera.', 'icon' => 'wind', 'tag' => 'Atmosfera'),
        array('slug' => 'dados/estacoes-meteorologicas', 'title' => 'Estações meteorológicas', 'description' => 'Conheça a rede de coleta e observação ambiental.', 'icon' => 'gauge', 'tag' => 'Observação'),
        array('slug' => 'dados/imagens-de-satelite', 'title' => 'Imagens de satélite', 'description' => 'Sensoriamento remoto e observação da Terra.', 'icon' => 'satellite', 'tag' => 'Geotecnologias'),
        array('slug' => 'dados/monitoramento-de-secas', 'title' => 'Monitoramento de secas', 'description' => 'Informação climática para acompanhamento de estiagens.', 'icon' => 'droplets', 'tag' => 'Climatologia'),
    );
}

function nugeo_section_heading($eyebrow, $title, $description = '', $id = '') {
    ?>
    <div class="nugeo-section-heading" data-reveal>
        <p class="nugeo-eyebrow"><?php echo esc_html($eyebrow); ?></p>
        <h2<?php if ($id) { echo ' id="' . esc_attr($id) . '"'; } ?>><?php echo esc_html($title); ?></h2>
        <?php if ($description) : ?><p class="nugeo-section-description"><?php echo esc_html($description); ?></p><?php endif; ?>
    </div>
    <?php
}

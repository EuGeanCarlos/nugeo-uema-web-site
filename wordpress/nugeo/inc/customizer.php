<?php
defined('ABSPATH') || exit;

function nugeo_customize_register($manager) {
    $manager->add_section('nugeo_home', array('title' => __('NUGEO — Página inicial', 'nugeo'), 'priority' => 30));
    $fields = array(
        'hero_title' => array('Título principal', 'Ciência, monitoramento e inovação para o'),
        'hero_highlight' => array('Destaque do título', 'território maranhense'),
        'hero_description' => array('Descrição', 'Produzimos conhecimento, dados e soluções em meteorologia, recursos hídricos, geotecnologias e estudos ambientais para apoiar decisões e promover qualidade de vida.'),
        'contact_address' => array('Endereço', 'Cidade Universitária Paulo VI — São Luís, Maranhão'),
        'contact_phone' => array('Telefone institucional (opcional)', ''),
        'contact_email' => array('E-mail institucional (opcional)', ''),
    );
    foreach ($fields as $key => $field) {
        $manager->add_setting('nugeo_' . $key, array('default' => $field[1], 'sanitize_callback' => 'contact_email' === $key ? 'sanitize_email' : 'sanitize_text_field'));
        $manager->add_control('nugeo_' . $key, array('section' => 'nugeo_home', 'label' => $field[0], 'type' => 'hero_description' === $key ? 'textarea' : 'text'));
    }
    $manager->add_setting('nugeo_hero_image', array('default' => '', 'sanitize_callback' => 'esc_url_raw'));
    $manager->add_control(new WP_Customize_Image_Control($manager, 'nugeo_hero_image', array('section' => 'nugeo_home', 'label' => __('Imagem principal', 'nugeo'))));
}
add_action('customize_register', 'nugeo_customize_register');

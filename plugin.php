<?php

/**
 * Plugin Name: Administrate
 * Plugin URI:  https://wordpress.org/plugins/administrate/
 * Description: A simple admin.
 * Author:      Ella Iseulde Van Dorpe
 * Author URI:  https://iseulde.com
 * Version:     0.0.1
 * Text Domain:
 * Domain Path:
 * License:
 * License URI:
 */

require 'Mustache/Autoloader.php';

Mustache_Autoloader::register();

register_activation_hook( __FILE__, 'administrate_init' );
register_activation_hook( __FILE__, 'flush_rewrite_rules' );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

add_action( 'admin_menu', 'administrate_menu' );

function administrate_menu() {
  $GLOBALS['menu'][1000] = array( 'Administrate', 'read', home_url( '/administrate/' ), '', 'menu-top', '', 'dashicons-randomize' );
}

add_action( 'init', 'administrate_init' );
add_action( 'parse_request', 'administrate_parse_request' );

function administrate_init() {
  add_rewrite_rule( '^administrate/?$', 'index.php?administrate_route=/', 'top' );
  add_rewrite_rule( '^administrate/(.*)?', 'index.php?administrate_route=/$matches[1]', 'top' );

  $GLOBALS['wp']->add_query_var( 'administrate_route' );
}

function administrate_parse_request() {
  if ( empty( $GLOBALS['wp']->query_vars['administrate_route'] ) ) {
    return;
  }

  administrate_load_template( $GLOBALS['wp']->query_vars['administrate_route'] );
}

function administrate_load_template( $route ) {
  $routes = array(
    '/' => 'index',
    '/posts' => 'posts',
    '/posts/([\d]+)' => 'post',
    '/media/' => 'media',
    '/media/([\d]+)' => 'medium',
  );

  foreach ( $routes as $pattern => $template ) {
    if ( preg_match( '@^' . $pattern . '$@i', $route, $matches ) ) {
      $server = rest_get_server();

      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['id'])) {
          $method = 'PUT';
        } else {
          $method = 'POST';
        }
      } else {
        $method = 'GET';
      }

      $me = new WP_REST_Request( 'GET', '/wp/v2/users/me' );
      $me = $server->dispatch( $me );
      $me = $me->get_data();

      $request = new WP_REST_Request( $method, '/wp/v2' . $route );

      $request->set_query_params( array_merge( $_GET, array(
        'context' => 'edit',
        'status' => 'any',
        'per_page' => '20',
      ) ) );

      $request->set_body_params( wp_unslash( $_POST ) );

      $result = $server->dispatch( $request );

      $headers = $result->get_headers();

      $item_count = (int) empty( $headers['X-WP-Total'] ) ? '0' : $headers['X-WP-Total'];
      $page_count = (int) empty( $headers['X-WP-TotalPages'] ) ? '0' : $headers['X-WP-TotalPages'];
      $page = (int) empty( $_GET['page'] ) ? '1' : $_GET['page'];
      $prev_url = $next_url = '';

      if ( $page > 1 ) {
        $prev_url = http_build_query( array_merge( $_GET, array(
          'page' => $page - 1
        ) ) );
      }

      if ( $page < $page_count ) {
        $next_url = http_build_query( array_merge( $_GET, array(
          'page' => $page + 1
        ) ) );
      }

      $object = $result->get_data();

      if ( isset( $object['content'] ) ) {
        $object['content']['raw'] = wpautop( $object['content']['raw'] );
      }

      $mustache = new Mustache_Engine;

      echo $mustache->render(
        file_get_contents( __DIR__ . '/' . $template .'.html' ),
        array(
          'item_count' => $item_count,
          'page_count' => $page_count,
          'page' => $page,
          'prev_url' => $prev_url,
          'next_url' => $next_url,
          'me' => $me,
          'object' => $object,
          'plugin_url' => plugins_url( '/', __FILE__ ),
          'admin_url' => admin_url(),
          'administrate_url' => home_url( '/administrate/' ),
          'includes_url' => includes_url(),
          '__' => function( $v = '' ) {
            return __( $v );
          },
          'date_long' => function( $v = '', $helper ) {
            return date_i18n( __( 'Y/m/d' ), strtotime( $helper->render( $v ) ) );
          },
        )
      );

      exit;
    }
  }
}

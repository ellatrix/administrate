<?php

/**
 * Plugin Name: Administrate
 * Plugin URI: https://github.com/avryl/administrate
 * Description: An alternative JavaScript powered WordPress admin.
 * Author: Janneke Van Dorpe
 * Author URI: http://jannekevandorpe.com
 * Version: 0.1
 * Text Domain: administrate
 * Domain Path: /languages/
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! function_exists( 'add_action' ) ) {
	return;
}

if ( ! class_exists( 'Administrate' ) ) {
	class Administrate {
		const VERSION = '0.1';
		const MIN_WP_VERSION = '4.1-alpha';
		const MIN_JSON_API_VERSION = '1.1.1';

		function __construct() {
			add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
		}

		function plugins_loaded() {
			load_plugin_textdomain( 'administrate', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

			$version = str_replace( '-src', '', $GLOBALS['wp_version'] );

			if ( empty( $version ) || version_compare( $version, self::MIN_WP_VERSION, '<' ) ) {
				add_action( 'admin_notices', array( $this, 'min_wp_version_notice' ) );
				return;
			}

			if ( defined( 'JSON_API_VERSION' ) ) {
				add_action( 'admin_notices', array( $this, 'min_json_api_version_notice' ) );
				return;
			}

			if ( ! defined( 'ADMINISTRATE_PATH' ) ) {
				define( 'ADMINISTRATE_PATH', apply_filters( 'administrate_path', 'administrate' ) );
			}

			require_once dirname( __FILE__ ) . '/WP-API/plugin.php';

			add_action( 'wp_json_server_before_serve', array( $this, 'wp_json_server_before_serve' ) );
			add_action( 'parse_request', array( $this, 'parse_request' ), 0 );
			add_action( 'admin_menu', array( $this, 'admin_menu' ) );
			add_action( 'registered_post_type', array( $this, 'registered_post_type' ), 10, 2 );
		}

		function min_wp_version_notice() {
			echo (
				'<div class="error">' .
					'<p>' .
						'<strong>Administrate</strong> only works with WordPress version ' . self::MIN_WP_VERSION . ' or higher.' .
					'</p>' .
				'</div>'
			);
		}

		function min_json_api_version_notice() {
			echo (
				'<div class="error">' .
					'<p>' .
						'Please disable the JSON REST API to enable <strong>Administrate</strong>.' .
					'</p>' .
				'</div>'
			);
		}

		function wp_json_server_before_serve() {
			register_json_route( 'administrate', '/lang', array(
				'methods' => WP_JSON_Server::READABLE,
				'callback' => array( $this, 'get_translation' ),
			) );
		}

		function get_translation() {
			return $GLOBALS['l10n'];
		}

		function parse_request( $wp ) {
			if ( strpos( $wp->request, ADMINISTRATE_PATH ) === 0 ) {
				$next = substr( $wp->request, strlen( ADMINISTRATE_PATH ), 1 );
				( $next === '/' || $next === false ) && $this->load();
			}
		}

		function is_dev() {
			return file_exists( dirname( __FILE__ ) . '/js/bundle.dev.js' );
		}

		function is_debugging() {
			return ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) || $this->is_dev();
		}

		function min() {
			return $this->is_debugging() ? '' : '.min';
		}

		function accepts_gzip() {
			return isset( $_SERVER['HTTP_ACCEPT_ENCODING'] ) && stripos( $_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip' ) !== false;
		}

		function gzip( $path ) {
			return ( $this->accepts_gzip() && ! $this->is_debugging() ) ? 'gz.php?path=' . urlencode( $path ) : $path;
		}

		function return_logged_in() {
			return 'logged_in';
		}

		function load() {
			add_filter( 'auth_redirect_scheme', array( $this, 'return_logged_in' ) );

			auth_redirect();

			load_textdomain( 'default', WP_LANG_DIR . '/admin-' . get_locale() . '.mo' );

			header( 'Content-Type: ' . get_option( 'html_type' ) . '; charset=' . get_option( 'blog_charset' ) );

			if ( $GLOBALS['is_IE'] ) {
				header( 'X-UA-Compatible: IE=edge' );
			}

			// We might be sending over 1 MB with l10n.
			if ( $this->accepts_gzip() ) {
				ob_start( 'ob_gzhandler' );
			}

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="utf-8">
		<title><?php _e( 'Loading&hellip;' ); ?></title>
	</head>
	<body class="wp-core-ui progress">
		<link rel="stylesheet" href="<?php echo includes_url( 'css/dashicons.css', 'relative' ); ?>" type="text/css" media="all">
		<div id="root-loader" class="dashicons dashicons-wordpress" style="display:block;width:200px;height:200px;font-size:200px;color:#e0e0e0;position:absolute;top:50%;left:50%;margin-top:-100px;margin-left:-100px;"></div>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&amp;subset=latin%2Clatin-ext" type="text/css" media="all">
		<link rel="stylesheet" href="<?php echo includes_url( 'css/buttons.css', 'relative' ); ?>" type="text/css" media="all">
		<link rel="stylesheet" href="<?php echo includes_url( 'css/editor.css', 'relative' ); ?>" type="text/css" media="all">
		<link rel="stylesheet" href="<?php echo admin_url( 'css/forms.css', 'relative' ); ?>" type="text/css" media="all">
		<link rel="stylesheet" href="<?php echo $this->url( $this->gzip( 'css/' . ( $this->is_debugging() ? 'index' : 'bundle' ) . $this->min() . '.css' ), 'relative' ); ?>" type="text/css" media="all">
		<div id="root">
			<script type="text/javascript" src="https://tinymce.cachefly.net/4.1/tinymce.min.js"></script>
			<script type="text/javascript" src="<?php echo admin_url( 'js/editor.js', 'relative' ); ?>"></script>
			<script type="text/javascript">
				/* <![CDATA[ */
				window._settings = <?php echo json_encode( array(
					'API' => array(
						'root' => json_url( 'wp' ),
						'nonce' => wp_create_nonce( 'wp_json' )
					),
					'root' => $this->administrate_url( '', 'relative' ),
					'adminURL' => admin_url( '', 'relative' )
				) ); ?>;
				window._l10n = <?php echo json_encode( (array) $GLOBALS['l10n'] ); ?>;
				window._start_of_week = window.parseInt( <?php echo json_encode( get_option( 'start_of_week' ) ); ?>, 10 );
				window._postStati = <?php echo json_encode( (array) $GLOBALS['wp_post_statuses'] ); ?>;
				window._query = <?php echo ( $query = json_encode( $_GET ) ) === '[]' ? '{}' : $query; ?>;
				/* ]]> */
			</script>
			<script type="text/javascript" src="<?php echo $this->url( $this->gzip( 'js/bundle' . ( $this->is_dev() ? '.dev' : $this->min() ) . '.js' ), 'relative' ); ?>"></script>
			<?php if ( $this->is_dev() ) { ?><script type="text/javascript" src="//localhost:35729/livereload.js"></script><?php } ?>
		</div>
	</body>
</html>
<?php

			exit;
		}

		function admin_menu() {
			$pagenow = $GLOBALS['pagenow'];
			$path = array();

			if ( preg_match( '/^options-(.*?)\.php$/', $pagenow, $matches ) ) {
				$path = array( 'settings', $matches[1] );
			}

			if ( empty( $path[0] ) ) {
				switch ( $pagenow ) {
					case 'edit.php':
					case 'post.php':
					case 'post-new.php':
						if ( isset( $_GET['post'] ) ) {
							$post_type = get_post_type( $_GET['post'] );
						} else if ( isset( $_GET['post_type'] ) ) {
							$post_type = $_GET['post_type'];
						} else {
							$post_type = 'post';
						}

						if ( $post_type ) {
							$post_type_object = get_post_type_object( $post_type );

							if ( $post_type_object ) {
								$path[0] = $post_type_object->multiple_name;
							}
						}

						break;
					case 'upload.php':
					case 'media-new.php':
						$path[0] = 'media';
						break;
					case 'edit-comments.php':
					case 'comment.php':
						$path[0] = 'comments';
						break;
					case 'themes.php':
					case 'theme-editor.php':
					case 'widgets.php':
						$path[0] = 'appearance';
						break;
					case 'plugins.php':
					case 'plugin-install.php':
					case 'plugin-editor.php':
						$path[0] = 'plugins';
						break;
					case 'users.php':
					case 'user-new.php':
					case 'user-edit.php':
					case 'profile.php':
						$path[0] = 'users';
						break;
					case 'tools.php':
					case 'import.php':
					case 'export.php':
						$path[0] = 'tools';
						break;
					case 'update-core.php':
						$path[0] = 'updates';
						break;
				}
			}

			if ( ! empty( $path[0] ) && empty( $path[1] ) ) {
				switch ( $pagenow ) {
					case 'post.php':
						if ( ! empty( $_GET['post'] ) ) {
							$path[1] = $_GET['post'];
						}

						break;
					case 'comment.php':
						if ( ! empty( $_GET['c'] ) ) {
							$path[1] = $_GET['c'];
						}

						break;
					case 'user-edit.php':
						if ( ! empty( $_GET['user_id'] ) ) {
							$path[1] = $_GET['user_id'];
						}

						break;
					case 'profile.php':
						$path[1] = 'me';
						break;
					case 'import.php':
						$path[1] = 'import';
						break;
					case 'export.php':
						$path[1] = 'export';
						break;
				}
			}

			$path = join( '/', $path );

			if ( ! empty( $path ) ) {
				$path .= '/';
			}

			$GLOBALS['menu'][1000] = array(
				__( 'Administrate' ),
				'read',
				$this->administrate_url( $path, 'relative' ),
				'',
				'menu-top',
				'',
				'dashicons-randomize'
			);
		}

		function registered_post_type( $post_type, $args ) {
			if ( ! isset( $args->multiple_name ) ) {
				switch ( $args->name ) {
					case 'post':
						$args->multiple_name = 'posts';
						break;
					case 'page':
						$args->multiple_name = 'pages';
						break;
					case 'attachment':
						$args->multiple_name = 'media';
						break;
					default:
						$args->multiple_name = $args->name;
						break;
				}
			}

			$GLOBALS['wp_post_types'][ $post_type ] = $args;
		}

		function url( $path, $scheme = null ) {
			return set_url_scheme( plugin_dir_url( __FILE__ ) . ltrim( $path, '/' ), $scheme );
		}

		function administrate_url( $path = '', $scheme = null ) {
			return home_url( ADMINISTRATE_PATH . '/' . ltrim( $path, '/' ), $scheme );
		}
	}

	new Administrate;
}

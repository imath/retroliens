<?php
/**
 * Ajoute une barre latérale à l'éditeur de blocs pour envoyer des rétroliens.
 *
 * @package   retroliens
 * @author    imath
 * @license   GPL-2.0+
 * @link      https://imathi.eu
 *
 * @wordpress-plugin
 * Plugin Name:       Rétroliens
 * Plugin URI:        https://github.com/imath/retroliens
 * Description:       Ajoute une barre latérale à l'éditeur de blocs pour envoyer des rétroliens.
 * Version:           1.0.0
 * Author:            imath
 * Author URI:        https://github.com/imath
 * Text Domain:       retroliens
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages/
 * GitHub Plugin URI: https://github.com/imath/retroliens
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Retroliens' ) ) :
	/**
	 * Main Class
	 *
	 * @since 1.0.0
	 */
	class Retroliens {
		/**
		 * Instance of this class.
		 *
		 * @var object $instance
		 */
		protected static $instance = null;

		/**
		 * Initializes the plugin
		 */
		private function __construct() {
			$this->inc();
		}

		/**
		 * Returns an instance of this class.
		 *
		 * @since 1.0.0
		 */
		public static function start() {

			// If the single instance hasn't been set, set it now.
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Loads needed files.
		 *
		 * @since 1.0.0
		 */
		private function inc() {
			$inc_path = plugin_dir_path( __FILE__ ) . 'inc/';

			require $inc_path . 'globals.php';
			require $inc_path . 'functions.php';
			require $inc_path . 'template.php';
		}
	}

endif;

/**
 * Starts plugin.
 *
 * @since 1.0.0
 *
 * @return Retroliens The main instance of the plugin.
 */
function retroliens() {
	return Retroliens::start();
}
add_action( 'plugins_loaded', 'retroliens', 5 );

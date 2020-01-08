<?php
/**
 * Set Plugin's Globals.
 *
 * @package   retroliens
 * @subpackage \inc\globals
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Set Plugin's Globals.
 *
 * @since 1.0.0
 */
function retroliens_set_globals() {
	$r = retroliens();

	$r->version = '1.0.0-alpha';

	$r->inc_path = plugin_dir_path( __FILE__ );
	$r->js_url   = plugins_url( 'js/', dirname( __FILE__ ) );
	$r->dist_url = plugins_url( 'dist/', dirname( __FILE__ ) );
}
add_action( 'plugins_loaded', 'retroliens_set_globals', 10 );

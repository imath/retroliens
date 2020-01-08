<?php
/**
 * Functions
 *
 * @package   retroliens
 * @subpackage \inc\globals
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Manage TrackBacks Sidebar for the Blocks Editor.
 *
 * @since  1.0.0
 */
function retroliens_register_script() {
	$r = retroliens();

	wp_register_script(
		'retroliens',
		$r->dist_url . 'index.js',
		array( 'wp-edit-post' ),
		$r->version,
		true
	);
}
add_action( 'init', 'retroliens_register_script', 7 );

/**
 * Adds the Manage TrackBacks Sidebar to the Blocks Editor.
 *
 * @since  1.0.0
 */
function retroliens_enqueue_script() {
	wp_enqueue_script( 'retroliens' );
}
add_action( 'enqueue_block_editor_assets', 'retroliens_enqueue_script' );

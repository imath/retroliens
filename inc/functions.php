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

/**
 * Fetches the `to_ping` post field.
 *
 * @since 1.0.0
 *
 * @param WP_Post $post The post object.
 * @return array        The list of trackbacks to ping.
 */
function retroliens_get_to_ping( $post ) {
	$to_ping    = array();
	$trackbacks = get_post_field( 'to_ping', $post->ID );

	if ( $trackbacks ) {
		$urls    = trim( $trackbacks, "\n" );
		$to_ping = explode( "\n", $urls );
	}

	return $to_ping;
}

/**
 * Sanitizes the `to_ping` field.
 *
 * @since 1.0.0
 *
 * @param string|array $trackbacks The trackbacks to ping for the post.
 * @return string                  The sanitized trackbacks to ping for the post.
 */
function retroliens_sanitize_to_ping( $trackbacks ) {
	$to_ping = '';

	if ( ! $trackbacks ) {
		return $to_ping;
	}

	if ( is_array( $trackbacks ) ) {
		$to_ping = implode( ' ', $trackbacks );
	}

	return sanitize_trackback_urls( $to_ping );
}

/**
 * Registers the `to_ping` and `pinged` fields.
 *
 * @since 1.0.0
 */
function retroliens_register_rest_fields() {
	register_rest_field(
		'post',
		'to_ping',
		array(
			'get_callback' => 'retroliens_get_to_ping',
			'schema'       => array(
				'description'       => __( 'Liste des rétroliens à notifier', 'retroliens' ),
				'type'              => 'array',
				'items'             => array(
					'type'   => 'string',
					'format' => 'uri',
				),
				'default'           => array(),
				'context'           => array( 'edit' ),
				'sanitize_callback' => 'retroliens_sanitize_to_ping',
			),
		)
	);
}
add_action( 'rest_api_init', 'retroliens_register_rest_fields' );

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
 * Fetches the trackback post fields.
 *
 * @since 1.0.0
 *
 * @param array $prepared Prepared response array.
 * @return array          The list of trackbacks to ping.
 */
function retroliens_get_trackbacks( $prepared, $field ) {
	$retval = array();

	if ( ! $prepared ) {
		return $retval;
	}

	if ( is_object( $prepared ) ) {
		$prepared = (array) $prepared;
	}

	if ( ! isset( $prepared['id'] ) ) {
		return $retval;
	}

	$trackbacks = get_post_field( $field, $prepared['id'] );

	if ( $trackbacks ) {
		$urls   = trim( $trackbacks, "\n" );
		$retval = explode( "\n", $urls );
	}

	return $retval;
}

/**
 * Formats trackbacks list the way WordPress expects it.
 *
 * @since 1.0.0
 *
 * @param array $trackbacks The list of trackbacks.
 * @return string The space separated list of trackbacks.
 */
function retroliens_prepare_trackbacks( $trackbacks ) {
	if ( $trackbacks && is_array( $trackbacks ) ) {
		return implode( ' ', $trackbacks );
	}

	return '';
}

/**
 * Sanitizes the trackbacks.
 *
 * @since 1.0.0
 *
 * @param string|array $trackbacks The trackbacks to ping for the post.
 * @return string                  The sanitized trackbacks to ping for the post.
 */
function retroliens_sanitize_trackbacks( $trackbacks ) {
	$retval = retroliens_prepare_trackbacks( $trackbacks );

	if ( $retval ) {
		$retval = sanitize_trackback_urls( $retval );
	}

	return $retval;
}

/**
 * Overloads the prepared post object with `to_ping` and `pinged` properties when needed.
 *
 * @since 1.0.0
 *
 * @param stdClass        $prepared_post An object representing a single post prepared
 *                                       for inserting or updating the database.
 * @param WP_REST_Request $request       REST Request object.
 */
function retroliens_rest_pre_insert_filter( $prepared_post, $request ) {
	$to_ping = $request->get_param( 'to_ping' );

	if ( $to_ping ) {
		$prepared_post->to_ping = retroliens_prepare_trackbacks( $to_ping );
	}

	$pinged = $request->get_param( 'pinged' );

	if ( $pinged ) {
		$prepared_post->pinged = retroliens_prepare_trackbacks( $pinged );
	}

	return $prepared_post;
}

/**
 * Uses the Post Attributes to save the trackbacks.
 *
 * @since 1.0.0
 */
function retroliens_rest_prepare_item_for_database_filters() {
	$post_types = get_post_types_by_support( 'trackbacks' );

	foreach ( $post_types as $post_type ) {
		add_filter( "rest_pre_insert_{$post_type}", 'retroliens_rest_pre_insert_filter', 10, 2 );
	}
}
add_action( 'init', 'retroliens_rest_prepare_item_for_database_filters', 1000 );

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
			'get_callback' => 'retroliens_get_trackbacks',
			'schema'       => array(
				'description'       => __( 'Liste des rétroliens à notifier', 'retroliens' ),
				'type'              => 'array',
				'items'             => array(
					'type'   => 'string',
					'format' => 'uri',
				),
				'default'           => array(),
				'context'           => array( 'edit' ),
				'sanitize_callback' => 'retroliens_sanitize_trackbacks',
			),
		)
	);

	register_rest_field(
		'post',
		'pinged',
		array(
			'get_callback' => 'retroliens_get_trackbacks',
			'schema'       => array(
				'description'       => __( 'Liste des rétroliens notifiés', 'retroliens' ),
				'type'              => 'array',
				'items'             => array(
					'type'   => 'string',
					'format' => 'uri',
				),
				'default'           => array(),
				'context'           => array( 'edit' ),
				'sanitize_callback' => 'retroliens_sanitize_trackbacks',
			),
		)
	);
}
add_action( 'rest_api_init', 'retroliens_register_rest_fields' );

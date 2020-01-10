<?php
/**
 * Template functions
 *
 * @package   retroliens
 * @subpackage \inc\template
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Displays the Trackback URL just before the comment form.
 *
 * If you don't like this positionning, simply use `remove_action( 'comment_form_before', 'le_retrolien' );` to
 * put it where you want using the template tag `<?php le_retrolien(); ?>`.
 *
 * @since 1.0.0
 */
function le_retrolien() {
	$post      = get_post();
	$post_type = get_post_type( $post );

	if ( ! $post_type || ! is_singular( $post_type ) || ! post_type_supports( $post_type, 'trackbacks' ) || ! pings_open( $post ) ) {
		return;
	}

	?>
	<div id="retroliens-post-trackback">
		<details>
			<summary id="retroliens-post-trackback-button" role="button" aria-expanded="false" tabindex="0">
				<label for="retroliens-post-trackback-input"><?php esc_html_e( 'Proposer un rétrolien', 'retrolien' ); ?></label>
			</summary>
			<div id="retroliens-post-trackback-url">
				<input type="text" value="<?php echo esc_url( get_trackback_url() ); ?>" id="retroliens-post-trackback-input" aria-describedby="retroliens-post-trackback-description" tabindex="0" readonly/>

				<p class="description" id="retroliens-post-trackback-description">
					<?php esc_html_e( 'Copier l’URL ci-dessus pour ajouter un rétrolien vers cet article depuis votre éditeur de contenu WordPress.', 'retrolien' ); ?>
				</p>
			</div>
		</details>
	</div>
	<div id="retroliens-post-trackback-after"></div>

	<script type="text/javascript">
		( function( window, document ) {
			var supportedBrowser = false;

			if ( document.querySelector ) {
				if ( window.addEventListener ) {
					supportedBrowser = true;
				}
			}

			var summaryToggle = function( e ) {
				var summary = e.currentTarget, details = document.querySelector( '#retroliens-post-trackback-url' );

				if ( 'false' === summary.getAttribute( 'aria-expanded' ) ) {
					details.style.display = 'block';
					summary.setAttribute( 'aria-expanded', 'true' );
				} else {
					details.style.display = 'none';
					summary.setAttribute( 'aria-expanded', 'false' );
				}
			};

			var trackBackSelect = function( e ) {
				e.currentTarget.select();
			};

			if ( supportedBrowser ) {
				// Styles
				document.querySelector( '#retroliens-post-trackback-url' ).style.display = 'none';
				document.querySelector( '#retroliens-post-trackback-button label' ).style.display = 'inline-block';
				document.querySelector( '#retroliens-post-trackback-button label' ).style.fontWeight = 'bold';
				document.querySelector( '#retroliens-post-trackback' ).style.width = '100%';
				document.querySelector( '#retroliens-post-trackback details' ).style.float = 'right';
				document.querySelector( '#retroliens-post-trackback-after' ).style.clear = 'both';
				document.querySelector( '#retroliens-post-trackback-after' ).style.marginBottom = '2em';
				document.querySelector( '#retroliens-post-trackback-input' ).style.width = '96%';

				// Events.
				document.querySelector( '#retroliens-post-trackback-button' ).addEventListener( 'click', summaryToggle );

				document.querySelector( '#retroliens-post-trackback-input' ).addEventListener( 'click', trackBackSelect );
			}
		} )( window, document );
	</script>
	<?php
}
add_action( 'comment_form_before', 'le_retrolien' );

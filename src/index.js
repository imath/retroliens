/**
 * WordPress dependencies.
 */
const { createElement } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
const { __ } = wp.i18n;

/**
 * Internal dependencies.
 */
import TrackbacksSend from './components/trackbacks-send';
import SentTrackbacks from './components/sent-trackbacks';

function RetroliensSidebar() {
	return (
		<PluginSidebar
			name='retroliens/manage'
			title={ __( 'Rétroliens', 'retroliens' ) }
			icon='admin-links'
		>
			<TrackbacksSend />
			<SentTrackbacks />
		</PluginSidebar>
	);
}

/**
 * See: https://make.wordpress.org/support/user-manual/building-your-wordpress-community/trackbacks-and-pingbacks/#trackbacks
 */
registerPlugin( 'retroliens', {
	render: RetroliensSidebar,
} );

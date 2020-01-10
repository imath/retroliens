/**
 * WordPress dependencies.
 */
const { createElement } = wp.element;
const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
const { __ } = wp.i18n;
const {
	Panel,
	PanelBody,
	PanelRow,
} = wp.components;

/**
 * Internal dependencies.
 */
import AddTrackbacks from './components/add-trackbacks';
import TrackbacksToSend from './components/trackbacks-to-send';
import SentTrackbacks from './components/sent-trackbacks';

function RetroliensSidebar() {
	return (
		<PluginSidebar
			name='retroliens/manage'
			title={ __( 'Rétroliens', 'retroliens' ) }
			icon='admin-links'
		>
			<Panel>
				<PanelBody
					title={ __( 'Envoyer des rétroliens', 'retroliens' ) }
					initialOpen={ true }
					className="retroliens-sidebar-panel-body add-retroliens"
				>
					<PanelRow>
						<AddTrackbacks />
					</PanelRow>
				</PanelBody>
			</Panel>
			<TrackbacksToSend />
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

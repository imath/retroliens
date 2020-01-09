const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
const { createElement, Component } = wp.element;
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { Panel, PanelBody, PanelRow } = wp.components;
const { compose } = wp.compose;

function SendTrackbacks( { post } ) {
	console.log( post );
	return (
		<p>
			{ __( 'Placeholder for the textarea', 'retroliens' ) }
		</p>
	);
};

const TrackbacksToSend = compose( [
	withSelect( ( select ) => {
		const post = select( 'core/editor' ).getCurrentPost();

		return {
			post: post.to_ping
		};
	} ),
	/*withDispatch( ( dispatch ) => ( {
		onUpdate( trackback ) {
			dispatch( 'core/editor' ).editPost( {
				to_ping: { trackback },
			} );
		},
	} ) ),*/
] )( SendTrackbacks );

function RetroliensSidebar() {
	return (
		<PluginSidebar
			name='retroliens/manage'
			title={ __( 'Trackbacks', 'retroliens' ) }
			icon='admin-links'
		>
			<Panel>
				<PanelBody
					title={ __( 'Envoyer des Trackbacks', 'retroliens' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<p>{ __( 'Trackbacks', 'retroliens' ) }</p>
						<TrackbacksToSend />
					</PanelRow>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
					title={ __( 'Gérer les Trackbacks', 'retroliens' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<p>{ __( 'Trackbacks', 'retroliens' ) }</p>
					</PanelRow>
				</PanelBody>
			</Panel>
		</PluginSidebar>
	);
}

/**
 * See: https://make.wordpress.org/support/user-manual/building-your-wordpress-community/trackbacks-and-pingbacks/#trackbacks
 */
registerPlugin( 'retroliens', {
	render: RetroliensSidebar,
} );

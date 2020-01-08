const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
const { createElement, Component } = wp.element;
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { Panel, PanelBody, PanelRow, G, Path, SVG } = wp.components;
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
			post: post
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

function RetroliensSidebarIcon() {
	return (
		<SVG
			aria-hidden='true'
			role='img'
			className='dashicon trackback-icon'
			focusable='false'
			width='20'
			height='20'
			viewBox='0 0 100 100'
			xmlns='http://www.w3.org/2000/svg'
		>
			<G>
				<Path d="M82.25,69.742H16.74c-0.485,1.293-2.015,2.41-2.712,2.865v0.221V79H85v-6.172v-0.209  C84.285,72.176,82.695,71.066,82.25,69.742L82.25,69.742z"/>
				<Path d="M55,27H44.025c-1.104,0-2-0.896-2-2s0.896-2,2-2H55c1.104,0,2,0.896,2,2S56.104,27,55,27z"/>
				<Path d="M83.154,63.322c-0.824-0.417-1.754-1.207-1.836-1.562c-1.752-12.246-6.957-28.546-31.805-28.546  c-24.849,0-30.055,16.3-31.81,28.562c-0.079,0.345-1.022,1.146-1.833,1.549c-0.833,0.41-1.271,1.283-1.06,2.189  C15.023,66.418,15.83,67,16.759,67h65.509c0.931,0,1.735-0.582,1.947-1.486C84.427,64.607,83.986,63.734,83.154,63.322z   M38.334,44.196c-2.81,1.465-5.334,3.249-7.503,5.301c-0.387,0.366-0.881,0.547-1.375,0.547c-0.53,0-1.06-0.209-1.453-0.625  c-0.759-0.802-0.725-2.068,0.078-2.828c2.438-2.307,5.265-4.307,8.404-5.943c0.978-0.509,2.188-0.131,2.698,0.849  C39.694,42.478,39.313,43.686,38.334,44.196z"/>
			</G>
		</SVG>
	);
}

function RetroliensSidebar() {
	return (
		<PluginSidebar
			name='retroliens/manage'
			title={ __( 'Trackbacks', 'retroliens' ) }
			icon={ RetroliensSidebarIcon }
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

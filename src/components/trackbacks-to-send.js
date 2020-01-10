/**
 * WordPress dependencies.
 */
const { createElement, Component } = wp.element;
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const {
	Panel,
	PanelBody,
	PanelRow,
	Dashicon,
} = wp.components;
const { compose } = wp.compose;
const { filterURLForDisplay } = wp.url;

/**
 * External dependencies.
 */
const { indexOf, pull, head } = lodash;

class ManageTrackbacks extends Component {
    constructor() {
		super( ...arguments );

        this.state = {
			trackbacks: [],
			pinged: [],
		};
	}

    componentDidMount() {
		const { trackbacks, pinged } = this.props;
		let state = {};

		if ( trackbacks ) {
			state.trackbacks = trackbacks;
		}

		if ( pinged ) {
			state.pinged = pinged;
		}

		this.setState( state );
	}

	removeTrackback( e, url ) {
		e.preventDefault();

		const { trackbacks } = this.state;
		const { onRemoveTrackBack } = this.props;
		pull( trackbacks, url );

		this.setState( { trackacks: trackbacks } );

		// Makes sure the Update button is refreshed.
		return onRemoveTrackBack( [... trackbacks, [''] ] );
	}

	render() {
		const { trackbacks, pinged } = this.state;
		let trackbacksList, postLink, linkDisplay;

		if ( ! trackbacks || ! trackbacks.length ) {
			return null;
		}

		if ( ! head( trackbacks ) ) {
			return null;
		}

		trackbacksList = trackbacks.map( ( url, id ) => {
			postLink = url.replace( 'wp-trackback.php', '' )
						  .replace( '/trackback', '' );
			linkDisplay = filterURLForDisplay( postLink );

			if ( url && -1 === indexOf( pinged, url ) ) {
				return (
					<li key={ 'trackback-' + id }>
						<a href="#" onClick={ ( e ) => this.removeTrackback( e, url ) }>
							<Dashicon icon="trash" />
						</a> <a href={ postLink }>{ linkDisplay }</a>
					</li>
				);
			}
		} );

		return (
			<Panel>
				<PanelBody
					title={ __( 'Rétroliens à envoyer', 'retroliens' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<ul>{ trackbacksList }</ul>
					</PanelRow>
				</PanelBody>
			</Panel>
		);
	}
}

const TrackbacksToSend = compose( [
	withSelect( ( select ) => {
		const post = select( 'core/editor' ).getCurrentPost();

		return {
			trackbacks: post.to_ping,
			pinged: post.pinged,
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onRemoveTrackBack( trackbacks ) {
			dispatch( 'core/editor' ).editPost( {
				to_ping: trackbacks[0],
			} );
		},
	} ) ),
] )( ManageTrackbacks );

export default TrackbacksToSend;

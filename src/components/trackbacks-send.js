/**
 * WordPress dependencies.
 */
const { createElement, Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ExternalLink,
	Button,
	Dashicon,
	Snackbar,
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
			trackback: '',
			trackbacks: [],
			pinged: [],
			error: null,
		};

		this.removeNotice = this.removeNotice.bind( this );
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

	addTrackback( e ) {
		e.preventDefault();

		const { trackbacks, pinged, trackback } = this.state;
		const { onAddTrackBack } = this.props;
		let allTrackbacks = trackbacks;

		if ( trackback && -1 === indexOf( trackbacks, trackback ) && -1 === indexOf( pinged, trackback ) ) {
			allTrackbacks = [ ...allTrackbacks, trackback ];
			this.setState( {
				error: null,
				trackback: '',
				trackbacks: allTrackbacks,
			} );

			return onAddTrackBack( allTrackbacks );
		} else {
			this.setState( {
				trackback: '',
				error: 1,
			} );
		}
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

	removeNotice() {
		this.setState( {
			error: null,
		} );
	}

	render() {
		const { trackback, trackbacks, pinged, error } = this.state;
		let trackbacksList, postLink, linkDisplay, ManageTrackbacks;

		if ( trackbacks && trackbacks.length && head( trackbacks ) ) {
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

			ManageTrackbacks = (
				<Panel>
					<PanelBody
						title={ __( 'Rétroliens à envoyer', 'retroliens' ) }
						initialOpen={ true }
						className="retroliens-sidebar-panel-body manage-retroliens"
					>
						<PanelRow>
							<ul>{ trackbacksList }</ul>
						</PanelRow>
					</PanelBody>
				</Panel>
			);
		}

		return (
			<Fragment>
				<Panel>
					<PanelBody
						title={ __( 'Envoyer des rétroliens', 'retroliens' ) }
						initialOpen={ true }
						className="retroliens-sidebar-panel-body add-retroliens"
					>
						<PanelRow>
							<div>
								<TextControl
									label={ __( 'URL de destination', 'retroliens' ) }
									value={ trackback }
									type='url'
									onChange={ ( url ) => {
										this.setState( { trackback: url } );
									} }
								/>
								<Button isPrimary={ true } isLarge={ true } onClick={ ( e ) => this.addTrackback( e ) }>
									{ __( 'Ajouter', 'retroliens' ) }
								</Button>
								<p className="description">
									<Dashicon icon="info" /> { __( 'Un rétrolien est une manière de notifier les anciens systèmes de blog que vous avez fait un lien vers eux. Si vous faites des liens vers des sites WordPress, ils seront notifiés automatiquement à l’aide des pings, sans que vous n’ayez rien à faire.', 'retroliens' ) }
									<br/>
									<ExternalLink href="https://wordpress.org/support/article/introduction-to-blogging/#comments" hrefLang="en">
										{ __( 'En savoir plus sur les pings (en).', 'retroliens' ) }
									</ExternalLink>
								</p>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
				{ ManageTrackbacks }
				{ error && (
					<Snackbar onRemove={ this.removeNotice }>
						{ __( 'Ce rétrolien est déjà « à envoyer » ou « envoyé ».', 'retroliens' ) }
					</Snackbar>
				) }
			</Fragment>
		);
	}
}

const TrackbacksSend = compose( [
	withSelect( ( select ) => {
		const post = select( 'core/editor' ).getCurrentPost();

		return {
			trackbacks: post.to_ping,
			pinged: post.pinged,
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		onAddTrackBack( trackbacks ) {
			dispatch( 'core/editor' ).editPost( {
				to_ping: trackbacks,
			} );
		},
		onRemoveTrackBack( trackbacks ) {
			dispatch( 'core/editor' ).editPost( {
				to_ping: trackbacks[0],
			} );
		},
	} ) ),
] )( ManageTrackbacks );

export default TrackbacksSend;

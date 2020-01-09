const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editPost;
const { createElement, Component } = wp.element;
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
} = wp.components;
const { compose } = wp.compose;

const { filterURLForDisplay } = wp.url;
const { indexOf, pull, head } = lodash;

class SendTrackbacks extends Component {
    constructor() {
		super( ...arguments );

        this.state = {
			trackback: '',
			trackbacks: [],
		};
	}

	addTrackback( e ) {
		e.preventDefault();

		const { trackbacks, trackback } = this.state;
		const { onAddTrackBack } = this.props;
		let allTrackbacks = trackbacks;

		if ( trackback ) {
			allTrackbacks = [ ...allTrackbacks, trackback ];
			this.setState( {
				trackback: '',
				trackbacks: allTrackbacks,
			} );

			return onAddTrackBack( allTrackbacks );
		}
	}

	render() {
		const { trackback, trackbacks } = this.state;

		return (
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
					{ __( 'Ajouter', 'risk-ops' ) }
				</Button>
				<p className="description">
					<Dashicon icon="info" /> { __( 'Un rétrolien est une manière de notifier les anciens systèmes de blog que vous avez fait un lien vers eux. Si vous faites des liens vers des sites WordPress, ils seront notifiés automatiquement à l’aide des pings, sans que vous n’ayez rien à faire.', 'retroliens' ) }
					<br/>
					<ExternalLink href="https://wordpress.org/support/article/introduction-to-blogging/#comments" hrefLang="en">
						En savoir plus sur les pings (en).
					</ExternalLink>
				</p>
			</div>
		);
	}
}

const AddTrackbacks = compose( [
	withDispatch( ( dispatch ) => ( {
		onAddTrackBack( trackbacks ) {
			dispatch( 'core/editor' ).editPost( {
				to_ping: trackbacks,
			} );
		},
	} ) ),
] )( SendTrackbacks );

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
		const { onResetTrackBack, onRemoveTrackBack } = this.props;
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

class ViewSentTrackbacks extends Component {
    constructor() {
		super( ...arguments );

        this.state = {
			pinged: [],
		};
	}

    componentDidMount() {
		const { pinged } = this.props;

		if ( pinged ) {
			this.setState( {
				pinged: pinged,
			} );
		}
	}

	render() {
		const { pinged } = this.state;
		let pingedList, postLink, linkDisplay;

		if ( ! pinged || ! pinged.length ) {
			return null;
		}

		pingedList = pinged.map( ( url, id ) => {
			postLink = url.replace( 'wp-trackback.php', '' )
						  .replace( '/trackback', '' );
			linkDisplay = filterURLForDisplay( postLink );

			if ( url ) {
				return (
					<li key={ 'pinged-' + id }>
						<Dashicon icon="yes" /> <a href={ postLink }>{ linkDisplay }</a>
					</li>
				);
			}
		} );

		return (
			<Panel>
				<PanelBody
					title={ __( 'Rétroliens envoyés', 'retroliens' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<ul>{ pingedList }</ul>
					</PanelRow>
				</PanelBody>
			</Panel>
		);
	}
}

const SentTrackbacks = compose( [
	withSelect( ( select ) => {
		const post = select( 'core/editor' ).getCurrentPost();

		return {
			pinged: post.pinged
		};
	} ),
] )( ViewSentTrackbacks );

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

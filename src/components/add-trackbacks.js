/**
 * WordPress dependencies.
 */
const { createElement, Component } = wp.element;
const { __ } = wp.i18n;
const { withDispatch } = wp.data;
const {
	TextControl,
	ExternalLink,
	Button,
	Dashicon,
} = wp.components;
const { compose } = wp.compose;

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

export default AddTrackbacks;

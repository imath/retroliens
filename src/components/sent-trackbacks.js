/**
 * WordPress dependencies.
 */
const { createElement, Component } = wp.element;
const { __ } = wp.i18n;
const { withSelect } = wp.data;
const {
	Panel,
	PanelBody,
	PanelRow,
	Dashicon,
} = wp.components;
const { compose } = wp.compose;
const { filterURLForDisplay } = wp.url;

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

export default SentTrackbacks;

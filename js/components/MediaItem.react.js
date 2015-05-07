var React = require( 'react/addons' );
var el = React.createElement;

var cx = require( '../utils/cx' );
// var selection = require( './selection' );

module.exports = React.createClass( {
	// mixins: [ React.addons.PureRenderMixin ],
	render: function() {
		var model = this.props.post;
		var details = model.get( 'media_details' );
		var image = null;

		if ( model.get( 'media_type' ) === 'image' ) {
			image = el( 'img', {
				src: model.get( 'source_url' ),
				className: details.height > details.width ? 'portrait' : 'landscape'
			} );
		} else {
			image = el( 'img', {
				src: model.get( 'source_url' )
			} );
		}

		return (
			el( 'li', {
				className: cx( {
					'wp-media-tile': true
					// 'wp-media-tile-selected': selection.get( model )
				} ),
				onClick: this.onClick
			},
				el( 'div', null,
					el( 'div', null,
						el( 'div', null,
							image
						)
					)
				)
			)
		);
	},
	onClick: function() {
		// var self = this;

		// if ( selection.get( this.props.model ) ) {
		// 	selection.remove( this.props.model );
		// } else {
		// 	selection.add( this.props.model );

		// 	_.defer( function() {
		// 		self.getDOMNode().scrollIntoView();
		// 	} );
		// }
	},
	componentDidMount: function() {
		// if ( selection.get( this.props.model ) ) {
		// 	this.getDOMNode().scrollIntoView();
		// }
	}
} );

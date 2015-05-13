var React = require( 'react' );
var el = React.createElement;

var PostsEditStore = require( '../stores/PostsEditStore' );
var PostEditStore = require( '../stores/PostEditStore' );

module.exports = React.createClass( {
	componentWillReceiveProps: function( nextProps ) {
		var id = nextProps.params.id;
		var post;

		if ( id ) {
			post = PostsEditStore.get( { id: id } );

			if ( post ) {
				PostEditStore.clear().set( post.attributes );
			} else {
				PostEditStore.clear().set( { id: id } );

				if ( id ) {
					PostEditStore.fetch( {
						data: {
							context: 'edit'
						}
					} );
				}
			}
		}


	},
	render: function() {
		// if ( this.state.route === 'media' ) {
		// 	return (
		// 		el( 'div', { className: 'body' },
		// 			el( require( './Media.react' ) )
		// 		)
		// 	);
		// } else {
			return (
				el( 'div', { className: 'body' },
					el( require( './ListPanel.react' ) ),
					el( require( './Content.react' ) )
				)
			);
		// }
	}
} );

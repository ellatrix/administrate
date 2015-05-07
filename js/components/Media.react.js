var React = require( 'react' );
var el = React.createElement;
var Scrollable = require( './Scrollable.react' );
var MediaItem = require( './MediaItem.react' );
var MediaLibrary = require( '../stores/MediaLibrary' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			posts: MediaLibrary
		};
	},
	componentDidMount: function() {
		MediaLibrary.on( 'add remove reset change', this._onChange );

		if ( MediaLibrary.length <= 1 ) {
			MediaLibrary.fetch( {
				data: {
					context: 'edit',
					post_status: 'any',
					posts_per_page: window._query.posts_per_page || '30'
				}
			} );
		}
	},
	componentWillUnmount: function() {
		MediaLibrary.off( 'add remove reset change', this._onChange );
	},
	render: function() {
		if ( ! this.state.posts.length ) {
			return null;
		}

		console.log(this.state.posts);

		var items = this.state.posts.map( function( post ) {
				if ( ! post.get( 'id' ) ) {
					return null;
				}

				return (
					el( MediaItem, {
						key: post.get( 'id' ),
						post: post
					} )
				);
			}, this );

		if ( ! items.length ) {
			return null;
		}

		return (
			el( 'ul', { className: 'the-list', 'data-columns': '8' },
				items
			)
		);
	},
	_onChange: function() {
		this.setState( {
			posts: MediaLibrary
		} );
	}
} );

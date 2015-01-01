var React = require( 'react' );
var el = React.createElement;
var ListItem = require( './ListItem.react' );
var PostsEditStore = require( '../stores/PostsEditStore' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			posts: PostsEditStore
		};
	},
	componentDidMount: function() {
		PostsEditStore.on( 'add remove reset change', this._onChange );

		if ( PostsEditStore.length <= 1 ) {
			PostsEditStore.fetch( {
				data: {
					context: 'edit',
					post_status: 'any'
				}
			} );
		}
	},
	componentWillUnmount: function() {
		PostsEditStore.off( 'add remove reset change', this._onChange );
	},
	render: function() {
		if ( ! this.state.posts.length ) {
			return null;
		}

		var items = this.state.posts.map( function( post ) {
				return (
					el( ListItem, {
						key: post.get( 'id' ),
						post: post
					} )
				);
			}, this );

		if ( ! items.length ) {
			return null;
		}

		return (
			el( 'div', { className: 'the-list', tabIndex: 0 },
				items
			)
		);
	},
	_onChange: function() {
		this.setState( {
			posts: PostsEditStore
		} );
	}
} );

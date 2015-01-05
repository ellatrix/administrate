var PostsEditStore = require( './PostsEditStore' );
var PostModel = require( './PostModel' );
var RouterStore = require( './RouterStore' );

var PostEditStore = new PostModel();

function set( ID ) {
	var post = PostsEditStore.get( { id: ID } );

	if ( post ) {
		PostEditStore.clear().set( post.attributes );
	} else {
		PostEditStore.clear().set( { id: ID } );

		if ( ID ) {
			PostEditStore.fetch( {
				data: {
					context: 'edit'
				}
			} );
		}
	}
}

RouterStore.on( 'change', function() {
	var args = RouterStore.get( 'args' );

	if ( RouterStore.get( 'route' ) === 'posts' ) {
		set( args[0] || 0 );
	}
} );

PostEditStore.on( 'change', function() {
	PostsEditStore.add( PostEditStore.attributes, { merge: true } );
} );

module.exports = PostEditStore;

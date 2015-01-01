var PostsEditStore = require( './PostsEditStore' );
var PostModel = require( './PostModel' );
var RouterStore = require( './RouterStore' );

var PostEditStore = new PostModel();

function set( ID ) {
	var post = PostsEditStore.get( { id: ID } );

	if ( post ) {
		PostEditStore.set( post.toJSON() );
	} else {
		PostEditStore.set( { id: ID } );
		PostEditStore.fetch( {
		    data: {
				context: 'edit'
			}
		} );
	}
}

RouterStore.on( 'change', function() {
	var args = RouterStore.get( 'args' );

	if ( RouterStore.get( 'route' ) === 'posts' && args[0] ) {
		set( args[0] );
	}
} );

PostEditStore.on( 'change', function() {
	PostsEditStore.add( PostEditStore.toJSON(), { merge: true } );
} );

module.exports = PostEditStore;

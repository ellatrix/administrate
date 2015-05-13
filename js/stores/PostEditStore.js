var PostsEditStore = require( './PostsEditStore' );
var PostModel = require( './PostModel' );

var PostEditStore = new PostModel();

PostEditStore.on( 'change', function() {
	PostsEditStore.add( PostEditStore.attributes, { merge: true } );
} );

module.exports = PostEditStore;

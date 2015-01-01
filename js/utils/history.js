var Backbone = require( './backbone' );

Backbone.history.start( {
	pushState: true,
	root: window._settings.root
} );

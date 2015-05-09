var Backbone = require( '../utils/backbone' );
var RouterStore = require( '../stores/RouterStore' );

/**
 * A Backbone router which listens to browser history,
 * forwarding routing events to a "RouterStore"
 */
var Router = Backbone.Router.extend( {
	routes: {
		'(/)': 'dashboard',
		'posts/': 'posts',
		'posts/:id/': 'posts',
		'media/': 'media',
		'media/:id/': 'media',
		'pages/': 'pages',
		'pages/:id/': 'pages',
		'comments/': 'comments',
		'appearance/': 'appearance',
		'plugins/': 'plugins',
		'users/': 'users',
		'tools/': 'tools',
		'settings/*path': 'settings',
		'help/*path': 'help'
	},
	navigate: function( fragment ) {
		var options = Backbone.history.options,
			args = arguments,
			ret;

		if ( fragment === '' || fragment === '/' ) {
			Backbone.history.stop();
			Backbone.history.start( { pushState: options.pushState, root: '/' } );

			args[0] = options.root;

			ret = Backbone.Router.prototype.navigate.apply( this, args );

			Backbone.history.stop();
			Backbone.history.start( { pushState: options.pushState, root: options.root } );

			return ret;
		}

		return Backbone.Router.prototype.navigate.apply( this, arguments );
	}
} );

var router = new Router();

/**
 * Whenever a route event happens, pass it through to the RouterStore.
 */
router.on( 'route', function( route, args ) {
	RouterStore.set( {
		route: route,
		args: args
	} );
} );

module.exports = router;

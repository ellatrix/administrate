var Backbone = require( 'backbone' );
var sync = Backbone.sync;

Backbone.$ = require( 'jquery' );

Backbone.sync = function( method, model, options ) {
	var beforeSend = options.beforeSend;

	options = options || {};

	if ( window._settings.API.nonce ) {
		options.beforeSend = function( xhr ) {
			xhr.setRequestHeader( 'X-WP-Nonce', window._settings.API.nonce );

			if ( beforeSend ) {
				return beforeSend.apply( this, arguments );
			}
		};
	}

	return sync( method, model, options );
};

module.exports = Backbone;

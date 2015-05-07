var Backbone = require( 'backbone' );

module.exports = Backbone.Model.extend( {
	idAttribute: 'id',
	urlRoot: window._settings.API.root + '/media'
} );

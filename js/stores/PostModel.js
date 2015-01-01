var Backbone = require( 'backbone' );
var parseable_dates = [ 'date', 'modified', 'date_gmt', 'modified_gmt' ];
var _ = require( 'underscore' );
var moment = require( 'moment' );

module.exports = Backbone.Model.extend( {
	idAttribute: 'id',
	urlRoot: window._settings.API.root + '/posts',
	toJSON: function() {
		var attributes = _.clone( this.attributes );

		_.each( parseable_dates, function( key ) {
			if ( key in attributes ) {
				if ( attributes[ key ] ) {
					attributes[ key ] = moment( attributes[ key ] ).toISOString();
				}
			}
		} );

		return attributes;
	},
	parse: function( attributes ) {
		_.each( parseable_dates, function( key ) {
			if ( key in attributes ) {
				if ( attributes[ key ] ) {
					attributes[ key ] = moment( attributes[ key ] + 'Z' ).toDate();
				}
			}
		} );

		return attributes;
	}
} );

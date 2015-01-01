var Backbone = require( 'backbone' );
var _ = require( 'underscore' );
var PostModel = require( './PostModel' );

module.exports = Backbone.Collection.extend( {
	model: PostModel,
	url: window._settings.API.root + '/posts',
	initialize: function() {
		this.state = {
			data: {},
			currentPage: null,
			totalPages: null,
			totalObjects: null
		};
	},
	sync: function( method, model, options ) {
		if ( 'read' === method ) {
			var self = this,
				success = options.success;

			if ( options.data ) {
				self.state.data = _.clone( options.data );

				delete self.state.data.page;
			} else {
				self.state.data = options.data = {};
			}

			if ( typeof options.data.page === 'undefined' ) {
				self.state.currentPage = null;
				self.state.totalPages = null;
				self.state.totalObjects = null;
			} else {
				self.state.currentPage = options.data.page - 1;
			}

			options.success = function( data, textStatus, request ) {
				self.state.totalPages = parseInt( request.getResponseHeader( 'X-WP-TotalPages' ), 10 );
				self.state.totalObjects = parseInt( request.getResponseHeader( 'X-WP-Total' ), 10 );

				if ( self.state.currentPage === null ) {
					self.state.currentPage = 1;
				} else {
					self.state.currentPage++;
				}

				if ( success ) {
					return success.apply( this, arguments );
				}
			};
		}

		return Backbone.sync( method, model, options );
	}
} );

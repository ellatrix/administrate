var views = require( './view' );

views.register( 'gallery', {
	View: {
		getHtml: function() {
			return 'gallery';
		}
	}
} );

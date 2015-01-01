var $ = require(  'jquery');
var count = 1;

module.exports = {
	start: function() {
		if ( ! count ) {
			$( document.body ).addClass( 'progress' );
		}

		count++;
	},
	stop: function() {
		if ( count ) {
			count--;
		}

		if ( ! count ) {
			$( document.body ).removeClass( 'progress' );
		}
	}
};

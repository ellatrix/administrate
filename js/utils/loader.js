var count = 1;

module.exports = {
	start: function() {
		if ( ! count ) {
			document.body.className = document.body.className + ' progress';
		}

		count++;
	},
	stop: function() {
		if ( count ) {
			count--;
		}

		if ( ! count ) {
			document.body.className = document.body.className.replace( ' progress', '' );
		}
	}
};

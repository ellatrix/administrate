var React = require( 'react' );
var el = React.createElement;

module.exports = React.createClass( {
	render: function() {

		/*
		Filter: search, category, date, status, sticky
		Sort by visible data
		Create new
		Select: edit, trash
		*/
		return (
			el( 'div', { className: 'list' },
				el( 'div', { className: 'list-options' },
					el( 'div', { className: 'dashicons dashicons-search' } )
				),
				el( require( './List.react' ) )
			)
		);
	}
} );

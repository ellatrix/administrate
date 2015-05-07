var React = require( 'react' );
var el = React.createElement;
var RouterStore = require( '../stores/RouterStore' );

module.exports = React.createClass( {
	render: function() {
		if ( RouterStore.get( 'route' ) !== 'posts' ) {
			return null;
		}

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

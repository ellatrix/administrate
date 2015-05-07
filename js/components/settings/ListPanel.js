var React = require( 'react' );
var el = React.createElement;

module.exports = React.createClass( {
	render: function() {
		return (
			el( 'div', { className: 'list' },
				el( require( './List' ) )
			)
		);
	}
} );

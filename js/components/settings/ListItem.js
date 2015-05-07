var React = require( 'react' );
var el = React.createElement;
var A = require( '../Link.react' );
var l10n = require( '../../utils/l10n' );

module.exports = React.createClass( {
	render: function() {
		return (
			el( A, {
				href: 'settings/' + this.props.page.id
			},
				l10n.__( this.props.page.title )
			)
		);
	}
} );

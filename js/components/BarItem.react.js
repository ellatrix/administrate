var React = require( 'react' );
var el = React.createElement;
import { __ } from '../utils/l10n';
var icon = 'dashicons-before dashicons-';
import { Link } from 'react-router';

module.exports = React.createClass( {
	render: function() {
		return (
			el( 'li', null,
				el( Link, {
					to: this.props.to,
					className: icon + ( this.props.icon || 'admin-' + this.props.text.toLowerCase() )
				},
					__( this.props.text )
				)
			)
		);
	}
} );

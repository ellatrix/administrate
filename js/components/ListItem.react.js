var React = require( 'react' );
var el = React.createElement;
var A = require( './Link.react' );
var l10n = require( '../utils/l10n' );
var moment = require( 'moment' );

module.exports = React.createClass( {
	render: function() {
		var title, status, _status, _moment, date;

		if ( ! this.props.post.get( 'title' ) ) {
			return null;
		}

		title = this.props.post.get( 'title' ).raw || l10n.__( '(no title)' );
		_status = this.props.post.get( 'status' );
		_moment = moment( this.props.post.get( 'date' ) );

		if ( _moment.isAfter() ) {
			_status = 'sheduled';
			status = window._postStati.future.label;
			date = _moment.format( 'LLL' );
		} else if ( _status === 'publish' ) {
			date = _moment.format( 'LL' );
		} else {
			status = window._postStati[ _status ].label;
		}

		if ( status ) {
			status = (
				el( 'span', { className: 'status' },
					status
				)
			);
		}

		if ( date ) {
			date = (
				el( 'span', { className: 'date' },
					date
				)
			);
		}

		return (
			el( A, {
				className: _status,
				href: 'posts/' + this.props.post.get( 'id' ) + '/' + window.location.search
			},
				el( 'div', { className: 'title' },
					title
				),
				el( 'div', null,
					status,
					date
				)
			)
		);
	}
} );

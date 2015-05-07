var React = require( 'react' );
var el = React.createElement;
var A = require( './Link.react' );
var l10n = require( '../utils/l10n' );
var moment = require( 'moment' );
var cx = require( '../utils/cx' );
var PostEditStore = require( '../stores/PostEditStore' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			open: false,
			active: false
		};
	},
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

		console.log(title);

		return (
			el( A, {
				className: cx( [ _status, cx( { 'open': this.state.open } ) ] ),
				href: 'posts/' + this.props.post.get( 'id' ) + '/' + window.location.search,
				onClick: this._onClick
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
	},
	_onClick: function() {
		if ( this.props.post.id === PostEditStore.id ) {
			this.setState( { open: ! this.state.open } );
		}
	}
} );

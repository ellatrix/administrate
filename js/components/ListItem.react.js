import { default as React, createElement as el } from 'react';
import A from './Link.react';
import { __ } from '../utils/l10n';
import moment from 'moment';
import cx from '../utils/cx';
import PostEditStore from '../stores/PostEditStore';

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

		title = this.props.post.get( 'title' ).raw || __( '(no title)' );
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

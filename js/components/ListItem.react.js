import { Component, createElement as el } from 'react';
import A from './Link.react';
import { __ } from '../utils/l10n';
import moment from 'moment';
import cx from '../utils/cx';
import PostEditStore from '../stores/PostEditStore';

export default class PostCard extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			open: false
		};

		this._onClick = this._onClick.bind( this );
	}

	render() {
		const { id, title, date, status } = this.props.post;

		var dateMoment = moment( date );
		var dateLabel;

		if ( ! title ) {
			return null;
		}

		if ( dateMoment.isAfter() ) {
			dateLabel = dateMoment.format( 'LLL' );
		} else if ( status === 'publish' ) {
			dateLabel = dateMoment.format( 'LL' );
		}

		return (
			el( A, {
				className: cx( [ status, cx( { 'open': this.state.open } ) ] ),
				href: 'posts/' + id + '/' + window.location.search,
				onClick: this._onClick
			},
				el( 'div', { className: 'title' },
					title.raw || __( '(no title)' )
				),
				el( 'div', null,
					status === 'publish' ? null : el( 'span', { className: 'status' },
						window._postStati[ status ].label
					),
					dateLabel ? el( 'span', { className: 'date' },
						dateLabel
					) : null
				)
			)
		);
	}

	_onClick() {
		if ( this.props.post.id === PostEditStore.id ) {
			this.setState( { open: ! this.state.open } );
		}
	}
}

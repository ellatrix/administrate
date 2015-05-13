import { Component, createElement as el } from 'react';
import { __ } from '../utils/l10n';
import moment from 'moment';
import { Link } from 'react-router';

export default class PostCard extends Component {

	constructor( props ) {
		super( props );
	}

	render() {
		const { title, date, status } = this.props.post;

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
			el( Link, {
				className: status,
				to: 'post',
				params: this.props.post
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

}

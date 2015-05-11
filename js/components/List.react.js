import { Component, createElement as el } from 'react';
import Scrollable from './Scrollable.react';
import ListItem from './ListItem.react';
import PostsEditStore from '../stores/PostsEditStore';

export default class PostList extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			posts: PostsEditStore
		};

		this._onChange = this._onChange.bind( this );
	}

	componentDidMount() {
		PostsEditStore.on( 'add remove reset change', this._onChange );

		if ( PostsEditStore.length <= 1 ) {
			PostsEditStore.fetch( {
				data: {
					context: 'edit',
					post_status: 'any',
					posts_per_page: window._query.posts_per_page || '30'
				}
			} );
		}
	}

	componentWillUnmount() {
		PostsEditStore.off( 'add remove reset change', this._onChange );
	}

	render() {
		if ( ! this.state.posts.length ) {
			return null;
		}

		return (
			el( Scrollable, { className: 'the-list' },
				this.state.posts.map( post =>
					el( ListItem, {
						key: post.id,
						post: post.attributes
					} )
				)
			)
		);
	}

	_onChange() {
		this.setState( {
			posts: PostsEditStore
		} );
	}
}

import React from 'react';
import A from './Link.react';

var el = React.createElement;

/**
 * Admin bar component.
 */
export default React.createClass( {

	render() {
		return (
			el( 'div', { className: 'bar' },
				el( A, {
					href: '',
					className: 'dashicons dashicons-wordpress'
				} ),
				el( A, {
					href: 'posts',
					className: 'dashicons dashicons-admin-post'
				} ),
				el( A, {
					href: 'pages',
					className: 'dashicons dashicons-admin-page'
				} ),
				el( A, {
					href: 'comments',
					className: 'dashicons dashicons-admin-comments'
				} ),
				el( A, {
					href: 'media',
					className: 'dashicons dashicons-admin-media'
				} ),
				el( 'div', { className: 'bar-right' },
					el( A, {
						href: 'appearance',
						className: 'dashicons dashicons-admin-appearance'
					} ),
					el( A, {
						href: 'plugins',
						className: 'dashicons dashicons-admin-plugins'
					} ),
					el( A, {
						href: 'settings',
						className: 'dashicons dashicons-admin-settings'
					} ),
					el( A, {
						href: 'help',
						className: 'dashicons dashicons-editor-help'
					} ),
					el( 'img', {
						height: 26,
						width: 26,
						src: 'http://0.gravatar.com/avatar/fee611dacac99d496068e201d81650d6?s=52&d=mm&r=g'
					} )
				)
			)
		);
	}

} );

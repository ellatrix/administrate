import React from 'react';
import { Link } from 'react-router';

var el = React.createElement;

/**
 * Admin bar component.
 */
export default React.createClass( {

	render() {
		return (
			el( 'div', { className: 'bar' },
				el( Link, {
					to: '/',
					className: 'dashicons dashicons-wordpress'
				} ),
				el( Link, {
					to: 'posts',
					className: 'dashicons dashicons-admin-post'
				} ),
				el( Link, {
					to: 'pages',
					className: 'dashicons dashicons-admin-page'
				} ),
				el( Link, {
					to: 'comments',
					className: 'dashicons dashicons-admin-comments'
				} ),
				el( Link, {
					to: 'media',
					className: 'dashicons dashicons-admin-media'
				} ),
				el( 'div', { className: 'bar-right' },
					el( Link, {
						to: 'appearance',
						className: 'dashicons dashicons-admin-appearance'
					} ),
					el( Link, {
						to: 'plugins',
						className: 'dashicons dashicons-admin-plugins'
					} ),
					el( Link, {
						to: 'settings',
						className: 'dashicons dashicons-admin-settings'
					} ),
					el( Link, {
						to: 'help',
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

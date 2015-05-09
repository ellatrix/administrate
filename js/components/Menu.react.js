var React = require( 'react' );
var el = React.createElement;
var MenuItem = require( './MenuItem.react' );

/**
 * A menu component that we're not using at the moment.
 */
module.exports = React.createClass( {
	render: function() {
		return (
			el( 'ul', { className: 'menu' },
				el( MenuItem, {
					href: '',
					icon: 'dashboard',
					text: 'Dashboard'
				} ),
				el( 'li', { className: 'separator' } ),
				el( MenuItem, {
					icon: 'admin-post',
					text: 'Posts'
				} ),
				el( MenuItem, {
					text: 'Media'
				} ),
				el( MenuItem, {
					icon: 'admin-page',
					text: 'Pages'
				} ),
				el( MenuItem, {
					text: 'Comments'
				} ),
				el( 'li', { className: 'separator' } ),
				el( MenuItem, {
					text: 'Appearance'
				} ),
				el( MenuItem, {
					text: 'Plugins'
				} ),
				el( MenuItem, {
					text: 'Users'
				} ),
				el( MenuItem, {
					text: 'Tools'
				} ),
				el( MenuItem, {
					text: 'Settings'
				} )
			)
		);
	}
} );

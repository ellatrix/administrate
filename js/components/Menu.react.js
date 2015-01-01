var React = require( 'react' );
var el = React.createElement;
var MenuItem = require( './MenuItem.react' );
var AdminURL = require( './AdminURL.react' );
var l10n = require( '../utils/l10n' );

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
				} ),
				el( 'li', { className: 'separator' } ),
				el( 'li', null,
					el( AdminURL, { className: 'dashicons-before dashicons-randomize' },
						l10n.__( 'Old Admin', 'administrate' )
					)
				)
			)
		);
	}
} );

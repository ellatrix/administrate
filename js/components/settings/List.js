var React = require( 'react' );
var el = React.createElement;
var Scrollable = require( '../Scrollable.react' );
var ListItem = require( './ListItem' );

module.exports = React.createClass( {
	render: function() {
		var pages = [
			{
				id: 'general',
				title: 'General'
			},
			{
				id: 'writing',
				title: 'Writing'
			},
			{
				id: 'reading',
				title: 'Reading'
			},
			{
				id: 'discussion',
				title: 'Discussion'
			},
			{
				id: 'media',
				title: 'Media'
			},
			{
				id: 'permalinks',
				title: 'Permalinks'
			}
		];

		var items = pages.map( function( page ) {
				return (
					el( ListItem, {
						key: page.id,
						page: page
					} )
				);
			}, this );

		if ( ! items.length ) {
			return null;
		}

		return (
			el( Scrollable, { className: 'the-list' },
				items
			)
		);
	}
} );

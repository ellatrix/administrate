var React = require( 'react' );
var el = React.createElement;
var RouterStore = require( '../stores/RouterStore' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			route: RouterStore.get( 'route' )
		};
	},
	componentDidMount: function() {
		RouterStore.on( 'change', this._onChange );
	},
	componentWillUnmount: function() {
		RouterStore.off( 'change', this._onChange );
	},
	render: function() {
		if ( this.state.route === 'media' ) {
			return (
				el( 'div', { className: 'body' },
					el( require( './Media.react' ) )
				)
			);
		} else if ( this.state.route === 'settings' ) {
			return (
				el( 'div', { className: 'body' },
					el( require( './settings/ListPanel' ) )
				)
			);
		} else {
			return (
				el( 'div', { className: 'body' },
					el( require( './ListPanel.react' ) ),
					el( require( './Content.react' ) )
				)
			);
		}
	},
	_onChange: function() {
		this.setState( {
			route: RouterStore.get( 'route' )
		} );
	}
} );

var React = require( 'react' );
var el = React.createElement;
var RouterStore = require( '../stores/RouterStore' );
var loader = require( '../utils/loader' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			route: RouterStore.get( 'route' )
		};
	},
	componentDidMount: function() {
		loader.stop();
		RouterStore.on( 'change', this._onChange );
	},
	componentWillUnmount: function() {
		RouterStore.off( 'change', this._onChange );
	},
	render: function() {
		return (
			el( 'div', null,
				el( require( './Bar.react' ) ),
				el( require( './Menu.react' ) ),
				el( require( './ListPanel.react' ) ),
				el( require( './Content.react' ) )
			)
		);
	},
	_onChange: function() {
		this.setState( {
			route: RouterStore.get( 'route' )
		} );
	}
} );

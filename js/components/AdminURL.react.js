var React = require( 'react' );
var el = React.createElement;
var RouterStore = require( '../stores/RouterStore' );

module.exports = React.createClass( {
	getInitialState: function() {
		return {
			url: ''
		};
	},
	componentDidMount: function() {
		RouterStore.on( 'change', this._onChange );
	},
	componentWillUnmount: function() {
		RouterStore.off( 'change', this._onChange );
	},
	render: function() {
		return (
			el( 'a', {
				href: window._settings.adminURL + this.state.url,
				className: this.props.className
			},
				this.props.children
			)
		);
	},
	_onChange: function() {
		var args = RouterStore.get( 'args' ),
			url;

		// TODO: Needs to detect a post type etc.

		switch ( RouterStore.get( 'route' ) ) {
			case 'posts':
				if ( args && args[0] ) {
					url = 'post.php?post=' + args[0] + '&action=edit';
				} else {
					url = 'edit.php';
				}

				break;
			default:
				url = '';
		}

		if ( url !== this.state.url ) {
			this.setState( {
				url: url
			} );
		}
	}
} );

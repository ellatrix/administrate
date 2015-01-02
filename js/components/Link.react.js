var React = require( 'react' );
var el = React.createElement;
var router = require( '../router/main' );
var RouterStore = require( '../stores/RouterStore' );
var cx = require( '../utils/cx' );

function addTrailingSlash( string ) {
	if ( string.substring( string.length - 1, string.length ) === '/' ) {
		return string;
	} else {
		return string + '/';
	}
}

module.exports = React.createClass( {
	// mixins: [ React.addons.PureRenderMixin ],
	getInitialState: function() {
		return {
			active: this.isActive()
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
				href: addTrailingSlash( window._settings.root + this.props.href ),
				onClick: this._onClick,
				className: cx( [
					this.props.className,
					cx( {
						'active': this.state.active
					} )
				] )
			},
				 this.props.children
			)
		);
	},
	_onClick: function( event ) {
		if ( event.shiftKey || event.ctrlKey || event.altKey || event.metaKey ) {
			return;
		}

		router.navigate( addTrailingSlash( this.props.href ), { trigger: true } );

		event.preventDefault();
	},
	_onChange: function() {
		var active = this.isActive();

		if ( active !== this.state.active ) {
			this.setState( {
				active: active
			} );
		}
	},
	isActive: function() {
		var activeHref = window.location.pathname.substring( window._settings.root.length );

		return this.props.href ?
			activeHref.substring( 0, this.props.href.length ) === this.props.href &&
				activeHref.charAt( this.props.href.length ) === '/' :
			! activeHref;
	}
} );

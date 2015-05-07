var React = require( 'react/addons' );
var el = React.createElement;
var cx = require( '../utils/cx' );

var scrollable = {
	mixins: [ React.addons.PureRenderMixin ],
	getInitialState: function() {
		return {
			topShadow: false,
			bottomShadow: false
		};
	},
	render: function() {
		return (
			el( 'div', {
				className: this.props.className,
				'data-columns': this.props['data-columns']
			},
				el( 'div', {
					className: cx( {
						scrollable: true,
						'top-shadow': this.state.topShadow,
						'bottom-shadow': this.state.bottomShadow
					} ),
					ref: 'scrollable',
					onScroll: this.updateState
				},
					this.props.children
				),
				el( 'div', { className: 'top-shadow' } ),
				el( 'div', { className: 'bottom-shadow' } )
			)
		);
	},
	updateState: function( event ) {
		var target = event && event.target || this.refs.scrollable.getDOMNode();
		var scrollTop = target.scrollTop;
		var scrollHeight = target.scrollHeight;
		var clientHeight = target.clientHeight;

		this.setState( {
			topShadow: !! scrollTop,
			bottomShadow: scrollTop + clientHeight < scrollHeight
		} );
	}
};

scrollable.componentDidMount = scrollable.componentDidUpdate = scrollable.updateState;

module.exports = React.createClass( scrollable );

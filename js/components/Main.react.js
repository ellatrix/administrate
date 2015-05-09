import React from 'react';
import Bar from './Bar.react';
import Menu from './Menu.react';
import Body from './Body.react';
import RouterStore from '../stores/RouterStore';
import loader from '../utils/loader';

var el = React.createElement;

/**
 * The main application React component.
 */
export default React.createClass( {

	getInitialState() {
		return {
			route: RouterStore.get( 'route' )
		};
	},

	componentDidMount() {
		loader.stop();
		RouterStore.on( 'change', this._onChange );
	},

	componentWillUnmount() {
		RouterStore.off( 'change', this._onChange );
	},

	render() {
		return (
			el( 'div', {},
				el( Bar ),
				el( Menu ),
				el( Body )
			)
		);
	},

	_onChange() {
		this.setState( {
			route: RouterStore.get( 'route' )
		} );
	}

} );

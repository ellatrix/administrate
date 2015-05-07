import React from 'react';
import Bar from './Bar.react';
import Menu from './Menu.react';
import Body from './Body.react';
import RouterStore from '../stores/RouterStore';
import loader from '../utils/loader';

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
			<div>
				<Bar />
				<Menu />
				<Body />
			</div>
		);
	},

	_onChange() {
		this.setState( {
			route: RouterStore.get( 'route' )
		} );
	}

} );

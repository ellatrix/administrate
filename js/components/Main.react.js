import { Component, createElement as el } from 'react';
import Bar from './Bar.react';
import Body from './Body.react';
import RouterStore from '../stores/RouterStore';

export default class extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			route: RouterStore.get( 'route' )
		};

		this._onChange = this._onChange.bind( this );
	}

	componentDidMount() {
		RouterStore.on( 'change', this._onChange );
	}

	componentWillUnmount() {
		RouterStore.off( 'change', this._onChange );
	}

	render() {
		return (
			el( 'div', null,
				el( Bar ),
				el( Body )
			)
		);
	}

	_onChange() {
		this.setState( {
			route: RouterStore.get( 'route' )
		} );
	}

}

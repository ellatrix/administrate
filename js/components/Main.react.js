import { Component, createElement as el } from 'react';
import { RouteHandler } from 'react-router';
import Bar from './Bar.react';

export default class extends Component {

	constructor( props ) {
		super( props );
	}

	render() {
		return (
			el( 'div', null,
				el( Bar ),
				el( RouteHandler )
			)
		);
	}

}

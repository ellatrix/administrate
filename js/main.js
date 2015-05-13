import { render, createElement as el } from 'react'
import observer from './utils/observer'
import { Route, run, HistoryLocation } from 'react-router'
import Main from './components/Main.react'
import Body from './components/Body.react'

// observer.observe( document, {
// 	attributes: true,
// 	childList: true,
// 	subtree: true
// } );

// Localise Moment.js.
import './utils/moment'

var routes = (
	el( Route, { path: window._settings.root, handler: Main },
		el( Route, { name: 'posts', path: 'posts/', handler: Body } ),
		el( Route, { name: 'post', path: 'posts/:id/', handler: Body } ),
		el( Route, { name: 'pages', path: 'pages/', handler: Body } ),
		el( Route, { name: 'comments', path: 'comments/', handler: Body } ),
		el( Route, { name: 'media', path: 'media/', handler: Body } ),
		el( Route, { name: 'appearance', path: 'appearance/', handler: Body } ),
		el( Route, { name: 'plugins', path: 'plugins/', handler: Body } ),
		el( Route, { name: 'settings', path: 'settings/', handler: Body } ),
		el( Route, { name: 'help', path: 'help/', handler: Body } )
	)
);

run( routes, HistoryLocation, Root => {
	render( el( Root ), document.getElementById( 'root' ) )
} );

document.body.removeChild( document.getElementById( 'root-loader' ) )

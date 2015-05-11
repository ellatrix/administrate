import { render, createElement as el } from 'react';
import $ from 'jquery';
import Main from './components/Main.react';
import observer from './utils/observer';

// Localise Moment.js.
require( './utils/moment' );

// observer.observe( document, {
// 	attributes: true,
// 	childList: true,
// 	subtree: true
// } );

// Render the UI.
render( el( Main ), document.getElementById( 'root' ) );
document.body.removeChild( document.getElementById( 'root-loader' ) );

// Start the router.
require( './router/main' );

// Start history.
require( './utils/history' );

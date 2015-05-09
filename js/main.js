import React from 'react';
import $ from 'jquery';
import loader from './utils/loader';
import Main from './components/Main.react';
import observer from './utils/observer';

var el = React.createElement;

// Localise Moment.js.
require( './utils/moment' );

$( document ).ajaxSend( loader.start ).ajaxComplete( loader.stop );

// observer.observe( document, {
// 	attributes: true,
// 	childList: true,
// 	subtree: true
// } );

// Render the UI.
React.render( el( Main ), document.getElementById( 'root' ) );
document.body.removeChild( document.getElementById( 'root-loader' ) );

// Start the router.
require( './router/main' );

// Start history.
require( './utils/history' );

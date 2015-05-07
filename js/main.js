import React from 'react';
import $ from 'jquery';
import loader from './utils/loader';
import Main from './components/Main.react';

var el = React.createElement;

// Localise Moment.js.
require( './utils/moment' );

$( document ).ajaxSend( loader.start ).ajaxComplete( loader.stop );

// Start a DOM mutation observer.
// require( './utils/MutationObserver' );

// Render the UI.
React.render( el( Main ), document.getElementById( 'root' ) );
document.body.removeChild( document.getElementById( 'root-loader' ) );

// Start the router.
require( './router/main' );

// Start history.
require( './utils/history' );

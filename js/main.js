var React = require( 'react' );
var el = React.createElement;
var $ = require( 'jquery' );
var loader = require( './utils/loader' );

// Localise Moment.js.
require( './utils/moment' );

$( document ).ajaxSend( loader.start ).ajaxComplete( loader.stop );

// Start a DOM mutation observer.
// require( './utils/MutationObserver' );

// Render the UI.
React.render( el( require( './components/Main.react' ) ), document.getElementById( 'root' ) );
document.body.removeChild( document.getElementById( 'root-loader' ) );

// Start the router.
require( './router/main' );

// Start history.
require( './utils/history' );

import { render, createElement as el } from 'react';
import $ from 'jquery';
import Main from './components/Main.react';
import observer from './utils/observer';

// observer.observe( document, {
// 	attributes: true,
// 	childList: true,
// 	subtree: true
// } );

// Localise Moment.js.
import './utils/moment';

// Render the UI.
render( el( Main ), document.getElementById( 'root' ) );
document.body.removeChild( document.getElementById( 'root-loader' ) );

// Start the router.
import './router/main';

// Start history.
import './utils/history';

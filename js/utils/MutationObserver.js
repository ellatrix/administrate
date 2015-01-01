/* jshint devel:true */

var _ = require( 'underscore' );

var Observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

new Observer( function( MutationRecords ) {
	_.each( MutationRecords, function( MutationRecord ) {
		if ( MutationRecord.addedNodes.length ) {
			_.each( MutationRecord.addedNodes, function( node ) {
				console.log( 'Added node', node );
			} );
		}

		if ( MutationRecord.removedNodes.length ) {
			_.each( MutationRecord.removedNodes, function( node ) {
				console.log( 'Removed node', node );
			} );
		}

		if ( MutationRecord.attributeName ) {
			console.log( 'Changed attribute "' + MutationRecord.attributeName + '"', MutationRecord.target );
		}
	} );
} )
.observe( document, {
	attributes: true,
	childList: true,
	subtree: true
} );

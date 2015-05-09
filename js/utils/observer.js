export default new MutationObserver( function( records ) {
	records.forEach( function( record ) {
		[ 'addedNodes', 'removedNodes' ].forEach( function( prop ) {
			if ( record[ prop ].length ) {
				let nodes = [].slice.call( record[ prop ] );

				window.console.log( prop, ...nodes );
			}
		} );

		if ( record.type === 'attributes' ) {
			window.console.log( record.type, record.attributeName, record.target );
		}
	} );
} );

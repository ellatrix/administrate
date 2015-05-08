var cache = {};
var textarea = document.createElement( 'textarea' );

function decodeHTMLEntities( string ) {
	if ( string.indexOf( '&' ) === -1 ) {
		return string;
	}

	if ( cache[ string ] ) {
		return cache[ string ];
	}

	textarea.innerHTML = string;

	return cache[ string ] = textarea.value;
}

export function __( text, domain, _index ) {
	domain = domain || 'default';
	domain = window._l10n[ domain ];
	_index = _index || 0;

	if ( text && domain && domain.entries[ text ] ) {
		text = domain.entries[ text ].translations[ _index ];
	}

	return decodeHTMLEntities( text );
}

export function _x( text, context, domain ) {
	return __( context + '\u0004' + text, domain );
}

export function _n( single, plural, number, domain ) {
	number = parseInt( number, 10 );
	domain = domain || 'default';
	domain = window._l10n[ domain ];

	if ( number === 1 ) {
		if ( single && domain.entries[ single ] ) {
			single = domain.entries[ single ].translations[ 0 ];
		}

		return decodeHTMLEntities( single );
	}

	if ( plural && domain.entries[ single ] ) {
		plural = domain.entries[ single ].translations[ 1 ];
	}

	return decodeHTMLEntities( plural );
}

export function isRtl() {
	return _x( 'ltr', 'text direction' ) === 'rtl';
}

var cache = {};
var textarea = document.createElement( 'textarea' );

module.exports = {
	__: function( text, domain, _index ) {
		domain = domain || 'default';
		domain = window._l10n[ domain ];
		_index = _index || 0;

		if ( text && domain && domain.entries[ text ] ) {
			text = domain.entries[ text ].translations[ _index ];
		}

		return this.decodeHTMLEntities( text );
	},
	_x: function( text, context, domain ) {
		return this.__( context + '\u0004' + text, domain );
	},
	_n: function( single, plural, number, domain ) {
		number = parseInt( number, 10 );
		domain = domain || 'default';
		domain = window._l10n[ domain ];

		if ( number === 1 ) {
			if ( single && domain.entries[ single ] ) {
				single = domain.entries[ single ].translations[ 0 ];
			}

			return this.decodeHTMLEntities( single );
		}

		if ( plural && domain.entries[ single ] ) {
			plural = domain.entries[ single ].translations[ 1 ];
		}

		return this.decodeHTMLEntities( plural );
	},
	isRtl: function() {
		return this._x( 'ltr', 'text direction' ) === 'rtl';
	},
	decodeHTMLEntities: function( string ) {
		if ( string.indexOf( '&' ) === -1 ) {
			return string;
		}

		if ( cache[ string ] ) {
			return cache[ string ];
		}

		textarea.innerHTML = string;

		return cache[ string ] = textarea.value;
	}
};

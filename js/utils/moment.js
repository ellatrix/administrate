var l10n = require( './l10n' );
var moment = require( 'moment' );

var meridiem = {
	am: l10n.__( 'am' ),
	AM: l10n.__( 'AM' ),
	pm: l10n.__( 'pm' ),
	PM: l10n.__( 'PM' )
};

// See https://gist.github.com/NTICompass/9375143.
var map = {
	d: 'DD',
	D: 'ddd',
	j: 'D',
	l: 'dddd',
	N: 'E',
	S: '[S]',
	w: 'd',
	z: function() {
		return this.format( 'DDD' ) - 1;
	},
	W: 'W',
	F: 'MMMM',
	m: 'MM',
	M: 'MMM',
	n: 'M',
	t: function() {
		return this.daysInMonth();
	},
	L: function() {
		return this.isLeapYear() ? 1 : 0;
	},
	o: 'GGGG',
	Y: 'YYYY',
	y: 'YY',
	a: 'a',
	A: 'A',
	B: function(){
		var thisUTC = this.clone().utc(),
			swatch = ( ( thisUTC.hours() + 1 ) % 24 ) + ( thisUTC.minutes() / 60 ) + ( thisUTC.seconds() / 3600 );

		return Math.floor( swatch * 1000 / 24 );
	},
	g: 'h',
	G: 'H',
	h: 'hh',
	H: 'HH',
	i: 'mm',
	s: 'ss',
	u: '[u]',
	e: '[e]',
	I: function() {
		return this.isDST() ? 1 : 0;
	},
	O: 'ZZ',
	P: 'Z',
	T: '[T]',
	Z: function(){
		return parseInt( this.format( 'ZZ' ), 10 ) * 36;
	},
	c: 'YYYY-MM-DD[T]HH:mm:ssZ',
	r: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
	U: 'X'
};

moment.fn.formatPHP = function( format ) {
	var self = this;

	return format.replace( /[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, function( format ) {
		return typeof map[ format ] === 'function' ? map[ format ].call( self ) : map[ format ];
	} );
};

moment.locale( 'user', {
	months: [
		l10n.__( 'January' ),
		l10n.__( 'February' ),
		l10n.__( 'March' ),
		l10n.__( 'April' ),
		l10n.__( 'May' ),
		l10n.__( 'June' ),
		l10n.__( 'July' ),
		l10n.__( 'August' ),
		l10n.__( 'September' ),
		l10n.__( 'October' ),
		l10n.__( 'November' ),
		l10n.__( 'December' )
	],
	monthsShort: [
		l10n.__( 'Jan_January_abbreviation' ),
		l10n.__( 'Feb_February_abbreviation' ),
		l10n.__( 'Mar_March_abbreviation' ),
		l10n.__( 'Apr_April_abbreviation' ),
		l10n.__( 'May_May_abbreviation' ),
		l10n.__( 'Jun_June_abbreviation' ),
		l10n.__( 'Jul_July_abbreviation' ),
		l10n.__( 'Aug_August_abbreviation' ),
		l10n.__( 'Sep_September_abbreviation' ),
		l10n.__( 'Oct_October_abbreviation' ),
		l10n.__( 'Nov_November_abbreviation' ),
		l10n.__( 'Dec_December_abbreviation' )
	],
	weekdays: [
		l10n.__( 'Sunday' ),
		l10n.__( 'Monday' ),
		l10n.__( 'Tuesday' ),
		l10n.__( 'Wednesday' ),
		l10n.__( 'Thursday' ),
		l10n.__( 'Friday' ),
		l10n.__( 'Saturday' )
	],
	weekdaysShort: [
		l10n.__( 'Sun' ),
		l10n.__( 'Mon' ),
		l10n.__( 'Tue' ),
		l10n.__( 'Wed' ),
		l10n.__( 'Thu' ),
		l10n.__( 'Fri' ),
		l10n.__( 'Sat' )
	],
	weekdaysMin: [
		l10n.__( 'S_Sunday_initial' ),
		l10n.__( 'M_Monday_initial' ),
		l10n.__( 'T_Tuesday_initial' ),
		l10n.__( 'W_Wednesday_initial' ),
		l10n.__( 'T_Thursday_initial' ),
		l10n.__( 'F_Friday_initial' ),
		l10n.__( 'S_Saturday_initial' )
	],
	relativeTime: {
		future: l10n.__( '%s from now' ),
		past: l10n.__( '%s ago' ),
		s: l10n._n( '%s min', '%s mins', 1 ).replace( '%s', '1' ),
		m: l10n._n( '%s min', '%s mins', 1 ).replace( '%s', '1' ),
		mm: l10n._n( '%s min', '%s mins', 2 ).replace( '%s', '%d' ),
		h: l10n._n( '%s hour', '%s hours', 1 ).replace( '%s', '1' ),
		hh: l10n._n( '%s hour', '%s hours', 2 ).replace( '%s', '%d' ),
		d: l10n._n( '%s day', '%s days', 1 ).replace( '%s', '1' ),
		dd: l10n._n( '%s day', '%s days', 2 ).replace( '%s', '%d' ),
		M: l10n._n( '%s month', '%s months', 1 ).replace( '%s', '1' ),
		MM: l10n._n( '%s month', '%s months', 2 ).replace( '%s', '%d' ),
		y: l10n._n( '%s year', '%s years', 1 ).replace( '%s', '1' ),
		yy: l10n._n( '%s year', '%s years', 2 ).replace( '%s', '%d' )
	},
	// ordinal: function ( number ) {
	// 	return number;
	// },
	week: {
		dow: window._start_of_week,
		doy: 4
	},
	meridiem: function( h, m, isLower ) {
		if ( h > 11 ) {
			return isLower ? meridiem.pm : meridiem.PM;
		} else {
			return isLower ? meridiem.am : meridiem.AM;
		}
    },
    longDateFormat : {
		LT: moment().formatPHP( l10n.__( 'g:i a' ) ),
		// LTS: "h:mm:ss A",
		L: moment().formatPHP( l10n.__( 'Y/m/d' ) ),
		// l: "M/D/YYYY",
		LL: moment().formatPHP( l10n.__( 'F j, Y' ) ),
		// ll: "MMM D YYYY",
		LLL: moment().formatPHP( l10n.__( 'F j, Y g:i a' ) )
		// lll: "MMM D YYYY LT",
		// LLLL: "dddd, MMMM Do YYYY LT",
		// llll: "ddd, MMM D YYYY LT"
    }
} );

import moment from 'moment';
import { __, _n } from './l10n';

var meridiem = {
	am: __( 'am' ),
	AM: __( 'AM' ),
	pm: __( 'pm' ),
	PM: __( 'PM' )
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
		var thisUTC = this.clone().utc();
		var swatch = ( ( thisUTC.hours() + 1 ) % 24 ) + ( thisUTC.minutes() / 60 ) + ( thisUTC.seconds() / 3600 );

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
		__( 'January' ),
		__( 'February' ),
		__( 'March' ),
		__( 'April' ),
		__( 'May' ),
		__( 'June' ),
		__( 'July' ),
		__( 'August' ),
		__( 'September' ),
		__( 'October' ),
		__( 'November' ),
		__( 'December' )
	],
	monthsShort: [
		__( 'Jan_January_abbreviation' ),
		__( 'Feb_February_abbreviation' ),
		__( 'Mar_March_abbreviation' ),
		__( 'Apr_April_abbreviation' ),
		__( 'May_May_abbreviation' ),
		__( 'Jun_June_abbreviation' ),
		__( 'Jul_July_abbreviation' ),
		__( 'Aug_August_abbreviation' ),
		__( 'Sep_September_abbreviation' ),
		__( 'Oct_October_abbreviation' ),
		__( 'Nov_November_abbreviation' ),
		__( 'Dec_December_abbreviation' )
	],
	weekdays: [
		__( 'Sunday' ),
		__( 'Monday' ),
		__( 'Tuesday' ),
		__( 'Wednesday' ),
		__( 'Thursday' ),
		__( 'Friday' ),
		__( 'Saturday' )
	],
	weekdaysShort: [
		__( 'Sun' ),
		__( 'Mon' ),
		__( 'Tue' ),
		__( 'Wed' ),
		__( 'Thu' ),
		__( 'Fri' ),
		__( 'Sat' )
	],
	weekdaysMin: [
		__( 'S_Sunday_initial' ),
		__( 'M_Monday_initial' ),
		__( 'T_Tuesday_initial' ),
		__( 'W_Wednesday_initial' ),
		__( 'T_Thursday_initial' ),
		__( 'F_Friday_initial' ),
		__( 'S_Saturday_initial' )
	],
	relativeTime: {
		future: __( '%s from now' ),
		past: __( '%s ago' ),
		s: _n( '%s min', '%s mins', 1 ).replace( '%s', '1' ),
		m: _n( '%s min', '%s mins', 1 ).replace( '%s', '1' ),
		mm: _n( '%s min', '%s mins', 2 ).replace( '%s', '%d' ),
		h: _n( '%s hour', '%s hours', 1 ).replace( '%s', '1' ),
		hh: _n( '%s hour', '%s hours', 2 ).replace( '%s', '%d' ),
		d: _n( '%s day', '%s days', 1 ).replace( '%s', '1' ),
		dd: _n( '%s day', '%s days', 2 ).replace( '%s', '%d' ),
		M: _n( '%s month', '%s months', 1 ).replace( '%s', '1' ),
		MM: _n( '%s month', '%s months', 2 ).replace( '%s', '%d' ),
		y: _n( '%s year', '%s years', 1 ).replace( '%s', '1' ),
		yy: _n( '%s year', '%s years', 2 ).replace( '%s', '%d' )
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
		LT: moment().formatPHP( __( 'g:i a' ) ),
		// LTS: "h:mm:ss A",
		L: moment().formatPHP( __( 'Y/m/d' ) ),
		// l: "M/D/YYYY",
		LL: moment().formatPHP( __( 'F j, Y' ) ),
		// ll: "MMM D YYYY",
		LLL: moment().formatPHP( __( 'F j, Y g:i a' ) )
		// lll: "MMM D YYYY LT",
		// LLLL: "dddd, MMMM Do YYYY LT",
		// llll: "ddd, MMM D YYYY LT"
    }
} );

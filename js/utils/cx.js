import _ from 'underscore';

export default function( ClassNames ) {
	if ( _.isArray( ClassNames ) ) {
		return _.compact( ClassNames ).join( ' ' ) || null;
	}

	return _.filter( _.keys( ClassNames ), function( ClassName ) {
		return ClassNames[ ClassName ];
	} ).join( ' ' ) || null;
};

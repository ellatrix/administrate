<?php

function administrate_get_file( $path ) {
	$path = realpath( $path );

	if ( ! $path || ! is_file( $path ) ) {
		return false;
	}

	return file_get_contents( $path );
}

if ( ! isset( $_GET['path'] ) ) {
	die;
}

$path = urldecode( $_GET['path'] );
$ext = substr( strrchr( $path, '.' ), 1 );
$dir = dirname( __FILE__ ) . '/';

if ( $ext === 'css' ) {
	$mime = 'text/css';
} else {
	$mime = 'application/javascript';
}

header( 'Content-Type: ' . $mime . '; charset=UTF-8' );
header( 'Vary: Accept-Encoding' );
header( 'Expires: ' . gmdate( 'D, d M Y H:i:s', time() + 31536000 ) . ' GMT');
header( 'Cache-Control: public, max-age=31536000' );

if (
	isset( $_SERVER['HTTP_ACCEPT_ENCODING'] ) &&
	stripos( $_SERVER['HTTP_ACCEPT_ENCODING' ], 'gzip' ) !== false &&
	( $file = administrate_get_file( $dir . $path . '.gz' ) )
) {
	header( 'Content-Encoding: gzip' );
	echo $file;
} else {
	echo administrate_get_file( $dir . $path );
}

die;

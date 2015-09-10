"use strict";

var test = require( "ava" );
var bl72ToLatLng = require( "./" );

test( "main", function( t ) {
    var o = bl72ToLatLng( 235166, 148974 );

    t.is( o.latitude, 50.645173 );
    t.is( o.longitude, 5.572941 );

    t.end();
} );

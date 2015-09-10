"use strict";

// algorithms adapted from http://zoologie.umh.ac.be/tc/algorithms.aspx

module.exports = function( x, y ) {
    var LongRef = 0.076042943,
        nLamb = 0.7716421928,
        aCarre = Math.pow( 6378388, 2 ),
        bLamb = 6378388 * ( 1 - ( 1 / 297 ) ),
        eCarre = ( aCarre - Math.pow( bLamb, 2 ) ) / aCarre,
        KLamb = 11565915.812935,
        eLamb = Math.sqrt( eCarre ),
        eSur2 = eLamb / 2,
        Tan1 = ( x - 150000.01256 ) / ( 5400088.4378 - y ),
        Lambda = LongRef + ( 1 / nLamb ) * ( 0.000142043 + Math.atan( Tan1 ) ),
        RLamb = Math.sqrt( Math.pow( ( x - 150000.01256 ), 2 ) + Math.pow( ( 5400088.4378 - y ), 2 ) ),
        TanZDemi = Math.pow( ( RLamb / KLamb ), ( 1 / nLamb ) ),
        Lati1 = 2 * Math.atan( TanZDemi ),
        Haut = 0,
        eSin, Mult1, Mult2, Mult, LatiN, Diff, lat, lng,
        Lat, Lng, LatWGS84, LngWGS84, DLat, DLng, Dh, dy, dx, dz, da, df, LWa, Rm, Rn,
        LWb, LWf, LWe2, SinLat, SinLng, CoSinLat, CoSinLng, Adb;

    do {
        eSin = eLamb * Math.sin( Lati1 );
        Mult1 = 1 - eSin;
        Mult2 = 1 + eSin;
        Mult = Math.pow( ( Mult1 / Mult2 ), ( eLamb / 2 ) );
        LatiN = ( Math.PI / 2 ) - ( 2 * ( Math.atan( TanZDemi * Mult ) ) );
        Diff = LatiN - Lati1;
        Lati1 = LatiN;
    } while( Math.abs( Diff ) > 0.0000000277777 );

    lat = ( LatiN * 180 ) / Math.PI;
    lng = ( Lambda * 180 ) / Math.PI;

    Lat = ( Math.PI / 180 ) * lat;
    Lng = ( Math.PI / 180 ) * lng;

    SinLat = Math.sin( Lat );
    SinLng = Math.sin( Lng );
    CoSinLat = Math.cos( Lat );
    CoSinLng = Math.cos( Lng );

    dx = -125.8;
    dy = 79.9;
    dz = -100.5;
    da = -251.0;
    df = -0.000014192702;

    LWf = 1 / 297;
    LWa = 6378388;
    LWb = ( 1 - LWf ) * LWa;
    LWe2 = ( 2 * LWf ) - ( LWf * LWf );
    Adb = 1 / ( 1 - LWf );

    Rn = LWa / Math.sqrt( 1 - LWe2 * SinLat * SinLat );
    Rm = LWa * ( 1 - LWe2 ) / Math.pow( ( 1 - LWe2 * Lat * Lat ), 1.5 );

    DLat = -dx * SinLat * CoSinLng - dy * SinLat * SinLng + dz * CoSinLat;
    DLat = DLat + da * ( Rn * LWe2 * SinLat * CoSinLat ) / LWa;
    DLat = DLat + df * ( Rm * Adb + Rn / Adb ) * SinLat * CoSinLat;
    DLat = DLat / ( Rm + Haut );

    DLng = ( -dx * SinLng + dy * CoSinLng ) / ( ( Rn + Haut ) * CoSinLat );
    Dh = dx * CoSinLat * CoSinLng + dy * CoSinLat * SinLng + dz * SinLat;
    Dh = Dh - da * LWa / Rn + df * Rn * Lat * Lat / Adb;

    LatWGS84 = ( ( Lat + DLat ) * 180 ) / Math.PI;
    LngWGS84 = ( ( Lng + DLng ) * 180 ) / Math.PI;

    return {
        "latitude": +( LatWGS84.toFixed( 6 ) ),
        "longitude": +( LngWGS84.toFixed( 6 ) )
    };
};

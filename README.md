# bl72ToLatLng [![Build Status](https://travis-ci.org/leny/bl72ToLatLng.svg?branch=master)](https://travis-ci.org/leny/bl72ToLatLng)

> Conversion from Belgian Lambert 72 projection to WGS84 latitude/longitude.

* * *

## Install

```
$ npm install --save bl72tolatlng
```

## Usage

```js
var bl72ToLatLng = require( "bl72tolatlng" );

bl72ToLatLng( 235166, 148974 ); // returns { "latitude": 50.645173, "longitude": 5.572941 }
```

## License

Algorithms are taken from [this site](http://zoologie.umh.ac.be/tc/algorithms.aspx).

MIT © [leny](http://leny.me)

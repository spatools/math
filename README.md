# Geomath [![Build Status](https://travis-ci.org/spatools/math.png)](https://travis-ci.org/spatools/math) [![NPM version](https://badge.fury.io/js/geomath.png)](http://badge.fury.io/js/geomath) [![Bower version](https://badge.fury.io/bo/geomath.png)](http://badge.fury.io/bo/geomath)

AMD Geometry and Matrix modules using reuse pattern for better performance

## Installation

Using Bower:

```console
$ bower install geomath --save
```

Using NuGet: 

```console
$ Install-Package GeoMath
```

Using NPM:

```console
$ npm install geomath --save
```

## Usage

You could use geomath in different context.

### Browser (with built file)

Include built script in your HTML file.

```html
<script type="text/javascript" src="path/to/geomath.min.js"></script>
```

### Browser (AMD from source)

#### Configure RequireJS.

```javascript
requirejs.config({
    paths: {
        math: 'path/to/geomath'
    }
});
```

Then include promise in your dependencies.

#### Load all modules (not recommended) 

```javascript
define(["math"], function() {
    math.geometry // Geometry Functions
    math.matrix
    math.matrix.M3 // Matrix 3x3 Functions
    math.matrix.M4 // Matrix 4x4 Functions
    math.matrix.V2 // Vector 2 Functions
    math.matrix.V3 // Vector 3 Functions
});
```

#### Load modules independently

```javascript
define(["math"], function() {
    math.geometry // Geometry Functions
    math.matrix
    math.matrix.M3 // Matrix 3x3 Functions
    math.matrix.M4 // Matrix 4x4 Functions
    math.matrix.V2 // Vector 2 Functions
    math.matrix.V3 // Vector 3 Functions
});
```

### Node (installed using NPM)

Call require to register Promise to global object

```javascript
var math = require("geomath");
// Or
var matrix3 = require("geomath/matrix3");
```


## Documentation

For now documentation can be found in code.
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var base = require("./base");
    if (base.ArrayType === Array) {
        exports.x = [1.0, 0.0];
        exports.y = [0.0, 1.0];
        exports.$ = function (x, y) {
            return [x, y];
        };
        exports.clone = function (vector) {
            return [vector[0], vector[1]];
        };
    }
    else {
        exports.x = new base.ArrayType([1.0, 0.0]);
        exports.y = new base.ArrayType([0.0, 1.0]);
        exports.$ = function (x, y) {
            return new base.ArrayType([x, y]);
        };
        exports.clone = function (vector) {
            return new base.ArrayType(vector);
        };
    }
    exports.u = exports.x;
    exports.v = exports.y;
    //#endregion
    //#region Operation Methods
    /** Return a vector 2 by performing r = a + b */
    function add(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        return r;
    }
    exports.add = add;
    /** Return a vector 2 by performing r = a - b */
    function sub(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        return r;
    }
    exports.sub = sub;
    exports.substract = sub;
    /** Return a vector 2 by performing r = -a */
    function neg(a, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = -a[0];
        r[1] = -a[1];
        return r;
    }
    exports.neg = neg;
    exports.negate = neg;
    /** Return result of operation performing r = dot(a, b) */
    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    exports.dot = dot;
    /** Return a vector 2 by performing cross operation : r = a x b */
    function cross(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = a[1] - b[1];
        r[1] = b[0] - a[0];
        return r;
    }
    exports.cross = cross;
    /** Return a vector 2 by performing r = m * v */
    function mul3x3(m, b, r) {
        var x = exports.v[0], y = exports.v[1], z = exports.v[2];
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = m[0] * x + m[1] * y + m[6];
        r[1] = m[2] * x + m[3] * y + m[7];
        return r;
    }
    exports.mul3x3 = mul3x3;
    //#endregion
    //#region Transformation Methods
    /** Normalize given vector 2 by performing  r = a / |a|. */
    function normalize(a, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        var im = 1.0 / length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;
        return r;
    }
    exports.normalize = normalize;
    /** Return given vector 2 scaled by performing  r = a * k. */
    function scale(a, k, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        r[0] = a[0] * k;
        r[1] = a[1] * k;
        return r;
    }
    exports.scale = scale;
    //#endregion
    //#region Information Methods
    /** Direction from a to b. Return a direction vector 2 by performing r = (a - b) / |a - b|. The result is the normalized. */
    function direction(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        return normalize(sub(a, b, r), r);
    }
    exports.direction = direction;
    /** Return length of the given vector 2 by performing r = |a|. */
    function length(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    }
    exports.length = length;
    /** Return length squared of the given vector 2 by performing r = |a|*|a|. */
    function lengthSquared(a) {
        return a[0] * a[0] + a[1] * a[1];
    }
    exports.lengthSquared = lengthSquared;
});
//#endregion

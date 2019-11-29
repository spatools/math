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
    //#region Init Methods
    exports._temp1 = new base.ArrayType(3), exports._temp2 = new base.ArrayType(3), exports._temp3 = new base.ArrayType(3);
    if (base.ArrayType === Array) {
        exports.x = [1.0, 0.0, 0.0];
        exports.y = [0.0, 1.0, 0.0];
        exports.z = [0.0, 0.0, 1.0];
        exports.$ = function (x, y, z) {
            return [x, y, z];
        };
        exports.clone = function (v) {
            return [v[0], v[1], v[2]];
        };
    }
    else {
        exports.x = new base.ArrayType([1.0, 0.0, 0.0]);
        exports.y = new base.ArrayType([0.0, 1.0, 0.0]);
        exports.z = new base.ArrayType([0.0, 0.0, 1.0]);
        exports.$ = function (x, y, z) {
            return new base.ArrayType([x, y, z]);
        };
        exports.clone = function (v) {
            return new base.ArrayType(v);
        };
    }
    exports.u = exports.x;
    exports.v = exports.y;
    //#endregion
    //#region Operation Methods
    /** Return a vector 3 by performing r = a + b */
    function add(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        return r;
    }
    exports.add = add;
    /** Return a vector 3 by performing r = a - b */
    function sub(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        return r;
    }
    exports.sub = sub;
    exports.substract = sub;
    /** Return a vector 3 by performing r = -a */
    function neg(a, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        r[0] = -a[0];
        r[1] = -a[1];
        r[2] = -a[2];
        return r;
    }
    exports.neg = neg;
    exports.negate = neg;
    /** Return a vector 3 by performing r = dot(a, b) */
    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    exports.dot = dot;
    /** Return a vector 3 by performing cross operation : r = a x b */
    function cross(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        r[0] = a[1] * b[2] - a[2] * b[1];
        r[1] = a[2] * b[0] - a[0] * b[2];
        r[2] = a[0] * b[1] - a[1] * b[0];
        return r;
    }
    exports.cross = cross;
    /** Return a vector 3 by performing r = m * v */
    function mul4x4(m, v, r) {
        var tmp = exports._temp1;
        if (r === undefined)
            r = new base.ArrayType(3);
        tmp[0] = m[3];
        tmp[1] = m[7];
        tmp[2] = m[11];
        var w = dot(v, tmp) + m[15];
        tmp[0] = m[0];
        tmp[1] = m[4];
        tmp[2] = m[8];
        r[0] = (dot(v, tmp) + m[12]) / w;
        tmp[0] = m[1];
        tmp[1] = m[5];
        tmp[2] = m[9];
        r[1] = (dot(v, tmp) + m[13]) / w;
        tmp[0] = m[2];
        tmp[1] = m[6];
        tmp[2] = m[10];
        r[2] = (dot(v, tmp) + m[14]) / w;
        return r;
    }
    exports.mul4x4 = mul4x4;
    //#endregion
    //#region Transformation Methods
    /** Normalize given vector 3 by performing  r = a / |a|. */
    function normalize(a, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        var im = 1.0 / length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;
        r[2] = a[2] * im;
        return r;
    }
    exports.normalize = normalize;
    /** Return given vector 3 scaled by performing  r = a * k. */
    function scale(a, k, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        r[0] = a[0] * k;
        r[1] = a[1] * k;
        r[2] = a[2] * k;
        return r;
    }
    exports.scale = scale;
    //#endregion
    //#region Information Methods
    /** Direction from a to b. Return a direction vector 3 by performing r = (a - b) / |a - b|. The result is the normalized. */
    function direction(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);
        return normalize(sub(a, b, r), r);
    }
    exports.direction = direction;
    /** Return length of the given vector 3 by performing r = |a|. */
    function length(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    }
    exports.length = length;
    /** Return length squared of the given vector 3 by performing r = |a|*|a|. */
    function lengthSquared(a) {
        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    }
    exports.lengthSquared = lengthSquared;
});
//#endregion

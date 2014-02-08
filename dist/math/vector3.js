define(["require", "exports", "./base"], function(require, exports, base) {
    exports._temp1 = new base.ArrayType(3);
    exports._temp2 = new base.ArrayType(3);
    exports._temp3 = new base.ArrayType(3);

    exports.x;
    exports.y;
    exports.z;

    exports.$;

    exports.clone;

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
    } else {
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

    function add(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];

        return r;
    }
    exports.add = add;

    function sub(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];

        return r;
    }
    exports.sub = sub;
    exports.substract = exports.sub;

    function neg(a, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        r[0] = -a[0];
        r[1] = -a[1];
        r[2] = -a[2];

        return r;
    }
    exports.neg = neg;
    exports.negate = exports.neg;

    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    exports.dot = dot;

    function cross(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        r[0] = a[1] * b[2] - a[2] * b[1];
        r[1] = a[2] * b[0] - a[0] * b[2];
        r[2] = a[0] * b[1] - a[1] * b[0];

        return r;
    }
    exports.cross = cross;

    function mul4x4(m, v, r) {
        var w;
        var tmp = exports._temp1;
        if (r === undefined)
            r = new base.ArrayType(3);

        tmp[0] = m[3];
        tmp[1] = m[7];
        tmp[2] = m[11];
        w = exports.dot(v, tmp) + m[15];
        tmp[0] = m[0];
        tmp[1] = m[4];
        tmp[2] = m[8];
        r[0] = (exports.dot(v, tmp) + m[12]) / w;
        tmp[0] = m[1];
        tmp[1] = m[5];
        tmp[2] = m[9];
        r[1] = (exports.dot(v, tmp) + m[13]) / w;
        tmp[0] = m[2];
        tmp[1] = m[6];
        tmp[2] = m[10];
        r[2] = (exports.dot(v, tmp) + m[14]) / w;
        return r;
    }
    exports.mul4x4 = mul4x4;

    function normalize(a, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        var im = 1.0 / exports.length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;
        r[2] = a[2] * im;

        return r;
    }
    exports.normalize = normalize;

    function scale(a, k, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        r[0] = a[0] * k;
        r[1] = a[1] * k;
        r[2] = a[2] * k;

        return r;
    }
    exports.scale = scale;

    function direction(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        return exports.normalize(exports.sub(a, b, r), r);
    }
    exports.direction = direction;

    function length(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    }
    exports.length = length;

    function lengthSquared(a) {
        return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    }
    exports.lengthSquared = lengthSquared;
});

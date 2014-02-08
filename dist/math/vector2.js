define(["require", "exports", "./base"], function(require, exports, base) {
    exports.x;
    exports.y;

    exports.$;

    exports.clone;

    if (base.ArrayType === Array) {
        exports.x = [1.0, 0.0];
        exports.y = [0.0, 1.0];

        exports.$ = function (x, y) {
            return [x, y];
        };
        exports.clone = function (vector) {
            return [vector[0], vector[1]];
        };
    } else {
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

    function add(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];

        return r;
    }
    exports.add = add;

    function sub(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];

        return r;
    }
    exports.sub = sub;
    exports.substract = exports.sub;

    function neg(a, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = -a[0];
        r[1] = -a[1];

        return r;
    }
    exports.neg = neg;
    exports.negate = exports.neg;

    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }
    exports.dot = dot;

    function cross(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = a[1] - b[1];
        r[1] = b[0] - a[0];

        return r;
    }
    exports.cross = cross;

    function mul3x3(m, b, r) {
        var x = exports.v[0], y = exports.v[1], z = exports.v[2];
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = m[0] * x + m[1] * y + m[6];
        r[1] = m[2] * x + m[3] * y + m[7];

        return r;
    }
    exports.mul3x3 = mul3x3;

    function normalize(a, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        var im = 1.0 / exports.length(a);
        r[0] = a[0] * im;
        r[1] = a[1] * im;

        return r;
    }
    exports.normalize = normalize;

    function scale(a, k, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        r[0] = a[0] * k;
        r[1] = a[1] * k;

        return r;
    }
    exports.scale = scale;

    function direction(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(2);

        return exports.normalize(exports.sub(a, b, r), r);
    }
    exports.direction = direction;

    function length(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    }
    exports.length = length;

    function lengthSquared(a) {
        return a[0] * a[0] + a[1] * a[1];
    }
    exports.lengthSquared = lengthSquared;
});

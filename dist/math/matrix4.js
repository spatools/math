define(["require", "exports", "./base", "./vector3"], function(require, exports, base, V3) {
    exports._temp1 = new base.ArrayType(16);
    exports._temp2 = new base.ArrayType(16);

    exports.I;

    exports.$;

    exports.clone;

    if (base.ArrayType === Array) {
        exports.I = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0];

        exports.$ = function (m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
            return [
                m00, m01, m02, m03,
                m04, m05, m06, m07,
                m08, m09, m10, m11,
                m12, m13, m14, m15];
        };

        exports.clone = function (m) {
            return [
                m[0], m[1], m[2], m[3],
                m[4], m[5], m[6], m[7],
                m[8], m[9], m[10], m[11],
                m[12], m[13], m[14], m[15]];
        };
    } else {
        exports.I = new base.ArrayType([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0]);

        exports.$ = function (m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15) {
            return new base.ArrayType([
                m00, m01, m02, m03,
                m04, m05, m06, m07,
                m08, m09, m10, m11,
                m12, m13, m14, m15]);
        };

        exports.clone = function (m) {
            return new base.ArrayType(m);
        };
    }

    exports.identity = exports.I;

    function topLeft3x3(m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);

        r[0] = m[0];
        r[1] = m[1];
        r[2] = m[2];
        r[3] = m[4];
        r[4] = m[5];
        r[5] = m[6];
        r[6] = m[8];
        r[7] = m[9];
        r[8] = m[10];

        return r;
    }
    exports.topLeft3x3 = topLeft3x3;

    function toString(m) {
        return Array.prototype.join.call(m, ",");
    }
    exports.toString = toString;

    function toCss2dMatrix(m) {
        return "matrix(" + m[0] + "," + m[1] + "," + m[4] + "," + m[5] + "," + m[12] + "," + m[13] + ")";
    }
    exports.toCss2dMatrix = toCss2dMatrix;

    function toCss3dMatrix(m) {
        return "matrix3d(" + exports.toString(m) + ")";
    }
    exports.toCss3dMatrix = toCss3dMatrix;

    function fromCssMatrix(css, r) {
        var c = css.match(/matrix(3d)?\(([^\)]+)\)/i)[2].split(",");
        if (c.length === 16) {
            if (r === undefined)
                r = exports.clone(exports.I);

            for (var i = 0; i < c.length; i++) {
                r[i] = parseFloat(c[i]);
            }
        } else {
            if (r === undefined)
                r = exports.clone(exports.I);

            r[0] = parseFloat(c[0]);
            r[1] = parseFloat(c[1]);
            r[4] = parseFloat(c[2]);
            r[5] = parseFloat(c[3]);
            r[12] = parseFloat(c[4]);
            r[13] = parseFloat(c[5]);
        }

        return r;
    }
    exports.fromCssMatrix = fromCssMatrix;

    function inverse(m, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
            return null;
        }
        det = 1.0 / det;

        r[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        r[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        r[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        r[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        r[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        r[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        r[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        r[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        r[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        r[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        r[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        r[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        r[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        r[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        r[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        r[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return r;
    }
    exports.inverse = inverse;

    function inverseOrthonormal(m, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        exports.transpose(m, r);

        var t = [m[12], m[13], m[14]];

        r[3] = r[7] = r[11] = 0;
        r[12] = -V3.dot([r[0], r[4], r[8]], t);
        r[13] = -V3.dot([r[1], r[5], r[9]], t);
        r[14] = -V3.dot([r[2], r[6], r[10]], t);

        return r;
    }
    exports.inverseOrthonormal = inverseOrthonormal;

    function inverseTo3x3(m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);

        var a11 = m[10] * m[5] - m[6] * m[9], a21 = -m[10] * m[1] + m[2] * m[9], a31 = m[6] * m[1] - m[2] * m[5], a12 = -m[10] * m[4] + m[6] * m[8], a22 = m[10] * m[0] - m[2] * m[8], a32 = -m[6] * m[0] + m[2] * m[4], a13 = m[9] * m[4] - m[5] * m[8], a23 = -m[9] * m[0] + m[1] * m[8], a33 = m[5] * m[0] - m[1] * m[4];

        var det = m[0] * (a11) + m[1] * (a12) + m[2] * (a13);
        if (det === 0) {
            throw new Error("matrix not invertible");
        }

        var idet = 1.0 / det;

        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;

        return r;
    }
    exports.inverseTo3x3 = inverseTo3x3;

    function mul(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var a11 = a[0];
        var a21 = a[1];
        var a31 = a[2];
        var a41 = a[3];
        var a12 = a[4];
        var a22 = a[5];
        var a32 = a[6];
        var a42 = a[7];
        var a13 = a[8];
        var a23 = a[9];
        var a33 = a[10];
        var a43 = a[11];
        var a14 = a[12];
        var a24 = a[13];
        var a34 = a[14];
        var a44 = a[15];

        var b11 = b[0];
        var b21 = b[1];
        var b31 = b[2];
        var b41 = b[3];
        var b12 = b[4];
        var b22 = b[5];
        var b32 = b[6];
        var b42 = b[7];
        var b13 = b[8];
        var b23 = b[9];
        var b33 = b[10];
        var b43 = b[11];
        var b14 = b[12];
        var b24 = b[13];
        var b34 = b[14];
        var b44 = b[15];

        r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return r;
    }
    exports.mul = mul;
    exports.multiply = exports.mul;

    function mulAffine(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var a11 = a[0];
        var a21 = a[1];
        var a31 = a[2];
        var a12 = a[4];
        var a22 = a[5];
        var a32 = a[6];
        var a13 = a[8];
        var a23 = a[9];
        var a33 = a[10];
        var a14 = a[12];
        var a24 = a[13];
        var a34 = a[14];

        var b11 = b[0];
        var b21 = b[1];
        var b31 = b[2];
        var b12 = b[4];
        var b22 = b[5];
        var b32 = b[6];
        var b13 = b[8];
        var b23 = b[9];
        var b33 = b[10];
        var b14 = b[12];
        var b24 = b[13];
        var b34 = b[14];

        r[0] = a11 * b11 + a12 * b21 + a13 * b31;
        r[1] = a21 * b11 + a22 * b21 + a23 * b31;
        r[2] = a31 * b11 + a32 * b21 + a33 * b31;
        r[3] = 0;
        r[4] = a11 * b12 + a12 * b22 + a13 * b32;
        r[5] = a21 * b12 + a22 * b22 + a23 * b32;
        r[6] = a31 * b12 + a32 * b22 + a33 * b32;
        r[7] = 0;
        r[8] = a11 * b13 + a12 * b23 + a13 * b33;
        r[9] = a21 * b13 + a22 * b23 + a23 * b33;
        r[10] = a31 * b13 + a32 * b23 + a33 * b33;
        r[11] = 0;
        r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
        r[15] = 1;

        return r;
    }
    exports.mulAffine = mulAffine;
    exports.multiplyAffine = exports.mulAffine;

    function transpose(m, r) {
        if (m === r) {
            var tmp = 0.0;

            tmp = m[1];
            m[1] = m[4];
            m[4] = tmp;
            tmp = m[2];
            m[2] = m[8];
            m[8] = tmp;
            tmp = m[3];
            m[3] = m[12];
            m[12] = tmp;
            tmp = m[6];
            m[6] = m[9];
            m[9] = tmp;
            tmp = m[7];
            m[7] = m[13];
            m[13] = tmp;
            tmp = m[11];
            m[11] = m[14];
            m[14] = tmp;

            return m;
        }

        if (r === undefined)
            r = new base.ArrayType(16);

        r[0] = m[0];
        r[1] = m[4];
        r[2] = m[8];
        r[3] = m[12];
        r[4] = m[1];
        r[5] = m[5];
        r[6] = m[9];
        r[7] = m[13];
        r[8] = m[2];
        r[9] = m[6];
        r[10] = m[10];
        r[11] = m[14];
        r[12] = m[3];
        r[13] = m[7];
        r[14] = m[11];
        r[15] = m[15];

        return r;
    }
    exports.transpose = transpose;

    function transposeSelf(m) {
        var tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;

        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;
        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;
        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;
        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;
        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;

        return m;
    }
    exports.transposeSelf = transposeSelf;

    function makeFrustum(left, right, bottom, top, znear, zfar, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var X = 2 * znear / (right - left);
        var Y = 2 * znear / (top - bottom);
        var A = (right + left) / (right - left);
        var B = (top + bottom) / (top - bottom);
        var C = -(zfar + znear) / (zfar - znear);
        var D = -2 * zfar * znear / (zfar - znear);

        r[0] = 2 * znear / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 * znear / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = (right + left) / (right - left);
        r[9] = (top + bottom) / (top - bottom);
        r[10] = -(zfar + znear) / (zfar - znear);
        r[11] = -1;
        r[12] = 0;
        r[13] = 0;
        r[14] = -2 * zfar * znear / (zfar - znear);
        r[15] = 0;

        return r;
    }
    exports.makeFrustum = makeFrustum;

    function makePerspective(fovy, aspect, znear, zfar, r) {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return exports.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar, r);
    }
    exports.makePerspective = makePerspective;

    function makeOrtho(left, right, bottom, top, znear, zfar, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var tX = -(right + left) / (right - left);
        var tY = -(top + bottom) / (top - bottom);
        var tZ = -(zfar + znear) / (zfar - znear);
        var X = 2 / (right - left);
        var Y = 2 / (top - bottom);
        var Z = -2 / (zfar - znear);

        r[0] = 2 / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (zfar - znear);
        r[11] = 0;
        r[12] = -(right + left) / (right - left);
        r[13] = -(top + bottom) / (top - bottom);
        r[14] = -(zfar + znear) / (zfar - znear);
        r[15] = 1;

        return r;
    }
    exports.makeOrtho = makeOrtho;

    function makeOrtho2D(left, right, bottom, top, r) {
        return exports.makeOrtho(left, right, bottom, top, -1, 1, r);
    }
    exports.makeOrtho2D = makeOrtho2D;

    function makeLookAt(eye, center, up, r) {
        var z = V3.direction(eye, center, V3._temp1);
        var x = V3.normalize(V3.cross(up, z, V3._temp2), V3._temp2);
        var y = V3.normalize(V3.cross(z, x, V3._temp3), V3._temp3);

        var tm1 = exports._temp1;
        var tm2 = exports._temp2;

        tm1[0] = x[0];
        tm1[1] = y[0];
        tm1[2] = z[0];
        tm1[3] = 0;
        tm1[4] = x[1];
        tm1[5] = y[1];
        tm1[6] = z[1];
        tm1[7] = 0;
        tm1[8] = x[2];
        tm1[9] = y[2];
        tm1[10] = z[2];
        tm1[11] = 0;
        tm1[12] = 0;
        tm1[13] = 0;
        tm1[14] = 0;
        tm1[15] = 1;

        tm2[0] = 1;
        tm2[1] = 0;
        tm2[2] = 0;
        tm2[3] = 0;
        tm2[4] = 0;
        tm2[5] = 1;
        tm2[6] = 0;
        tm2[7] = 0;
        tm2[8] = 0;
        tm2[9] = 0;
        tm2[10] = 1;
        tm2[11] = 0;
        tm2[12] = -eye[0];
        tm2[13] = -eye[1];
        tm2[14] = -eye[2];
        tm2[15] = 1;

        if (r === undefined)
            r = new base.ArrayType(16);

        return exports.mul(tm1, tm2, r);
    }
    exports.makeLookAt = makeLookAt;

    function makeTranslate(v, r) {
        var x = r[0], y = r[1], z = r[2];

        if (r === undefined)
            r = new base.ArrayType(16);

        r[0] = 1;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 1;
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = 1;
        r[11] = 0;
        r[12] = x;
        r[13] = y;
        r[14] = z;
        r[15] = 1;

        return r;
    }
    exports.makeTranslate = makeTranslate;

    function makeTranslate1(k, r) {
        return exports.makeTranslate([k, k, k], r);
    }
    exports.makeTranslate1 = makeTranslate1;

    function translate(v, m, r) {
        var x = v[0], y = v[1], z = v[2], m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43;

        if (base.engine === "css") {
            if (r === m) {
                m[12] += x;
                m[13] += y;
                m[14] += z;

                return m;
            }

            if (r === undefined)
                r = new base.ArrayType(16);

            m11 = m[0];
            m21 = m[1];
            m31 = m[2];
            m41 = m[3];
            m12 = m[4];
            m22 = m[5];
            m32 = m[6];
            m42 = m[7];
            m13 = m[8];
            m23 = m[9];
            m33 = m[10];
            m43 = m[11];

            r[0] = m11;
            r[1] = m21;
            r[2] = m31;
            r[3] = m41;
            r[4] = m12;
            r[5] = m22;
            r[6] = m32;
            r[7] = m42;
            r[8] = m13;
            r[9] = m23;
            r[10] = m33;
            r[11] = m43;

            r[12] = m[12] + x;
            r[13] = m[13] + y;
            r[14] = m[14] + z;
            r[15] = 1;
        } else {
            if (r === m) {
                m[12] += m[0] * x + m[4] * y + m[8] * z;
                m[13] += m[1] * x + m[5] * y + m[9] * z;
                m[14] += m[2] * x + m[6] * y + m[10] * z;
                m[15] += m[3] * x + m[7] * y + m[11] * z;

                return m;
            }

            if (r === undefined)
                r = new base.ArrayType(16);

            m11 = m[0];
            m21 = m[1];
            m31 = m[2];
            m41 = m[3];
            m12 = m[4];
            m22 = m[5];
            m32 = m[6];
            m42 = m[7];
            m13 = m[8];
            m23 = m[9];
            m33 = m[10];
            m43 = m[11];

            r[0] = m11;
            r[1] = m21;
            r[2] = m31;
            r[3] = m41;
            r[4] = m12;
            r[5] = m22;
            r[6] = m32;
            r[7] = m42;
            r[8] = m13;
            r[9] = m23;
            r[10] = m33;
            r[11] = m43;

            r[12] = m11 * x + m12 * y + m13 * z + m[12];
            r[13] = m21 * x + m22 * y + m23 * z + m[13];
            r[14] = m31 * x + m32 * y + m33 * z + m[14];
            r[15] = m41 * x + m42 * y + m43 * z + m[15];
        }

        return r;
    }
    exports.translate = translate;

    function translate1(k, m, r) {
        return exports.translate([k, k, k], m, r);
    }
    exports.translate1 = translate1;

    function translateSelf(v, m) {
        var x = v[0], y = v[1], z = v[2];

        if (base.engine === "css") {
            m[12] += x;
            m[13] += y;
            m[14] += z;
        } else {
            m[12] += m[0] * x + m[4] * y + m[8] * z;
            m[13] += m[1] * x + m[5] * y + m[9] * z;
            m[14] += m[2] * x + m[6] * y + m[10] * z;
            m[15] += m[3] * x + m[7] * y + m[11] * z;
        }

        return m;
    }
    exports.translateSelf = translateSelf;

    function makeScale(v, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var x = r[0], y = r[1], z = r[2];

        r[0] = x;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = y;
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = z;
        r[11] = 0;
        r[12] = 0;
        r[13] = 0;
        r[14] = 0;
        r[15] = 1;

        return r;
    }
    exports.makeScale = makeScale;

    function makeScale1(k, r) {
        return exports.makeScale([k, k, k], r);
    }
    exports.makeScale1 = makeScale1;

    function scale(v, m, r) {
        var x = v[0], y = v[1], z = v[2];

        if (r === m) {
            m[0] *= x;
            m[1] *= x;
            m[2] *= x;
            m[3] *= x;
            m[4] *= y;
            m[5] *= y;
            m[6] *= y;
            m[7] *= y;
            m[8] *= z;
            m[9] *= z;
            m[10] *= z;
            m[11] *= z;
            return m;
        }

        if (r === undefined)
            r = new base.ArrayType(16);

        r[0] = m[0] * x;
        r[1] = m[1] * x;
        r[2] = m[2] * x;
        r[3] = m[3] * x;
        r[4] = m[4] * y;
        r[5] = m[5] * y;
        r[6] = m[6] * y;
        r[7] = m[7] * y;
        r[8] = m[8] * z;
        r[9] = m[9] * z;
        r[10] = m[10] * z;
        r[11] = m[11] * z;
        r[12] = m[12];
        r[13] = m[13];
        r[14] = m[14];
        r[15] = m[15];

        return r;
    }
    exports.scale = scale;

    function scale1(k, m, r) {
        return exports.scale([k, k, k], m, r);
    }
    exports.scale1 = scale1;

    function scaleAt(v, pt, m, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var tmp = exports.makeScale(v);
        var tmpPoint = exports.transformPointAffine(tmp, pt);

        exports.translate([pt[0] - tmpPoint[0], pt[1] - tmpPoint[1], pt[2] - tmpPoint[2]], tmp, tmp);
        exports.mul(m, tmp, r);

        return r;
    }
    exports.scaleAt = scaleAt;

    function makeRotate(angle, axis, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        axis = V3.normalize(axis, V3._temp1);
        var x = axis[0], y = axis[1], z = axis[2];
        var c = Math.cos(angle);
        var c1 = 1 - c;
        var s = Math.sin(angle);

        r[0] = x * x * c1 + c;
        r[1] = y * x * c1 + z * s;
        r[2] = z * x * c1 - y * s;
        r[3] = 0;
        r[4] = x * y * c1 - z * s;
        r[5] = y * y * c1 + c;
        r[6] = y * z * c1 + x * s;
        r[7] = 0;
        r[8] = x * z * c1 + y * s;
        r[9] = y * z * c1 - x * s;
        r[10] = z * z * c1 + c;
        r[11] = 0;
        r[12] = 0;
        r[13] = 0;
        r[14] = 0;
        r[15] = 1;

        return r;
    }
    exports.makeRotate = makeRotate;

    function rotate(angle, axis, m, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var a0 = axis[0], a1 = axis[1], a2 = axis[2];
        var l = Math.sqrt(a0 * a0 + a1 * a1 + a2 * a2);
        var x = a0, y = a1, z = a2;

        if (l !== 1.0) {
            var im = 1.0 / l;
            x *= im;
            y *= im;
            z *= im;
        }

        var c = Math.cos(angle);
        var c1 = 1 - c;
        var s = Math.sin(angle);
        var xs = x * s;
        var ys = y * s;
        var zs = z * s;
        var xyc1 = x * y * c1;
        var xzc1 = x * z * c1;
        var yzc1 = y * z * c1;

        var m11 = m[0];
        var m21 = m[1];
        var m31 = m[2];
        var m41 = m[3];
        var m12 = m[4];
        var m22 = m[5];
        var m32 = m[6];
        var m42 = m[7];
        var m13 = m[8];
        var m23 = m[9];
        var m33 = m[10];
        var m43 = m[11];

        var t11 = x * x * c1 + c;
        var t21 = xyc1 + zs;
        var t31 = xzc1 - ys;
        var t12 = xyc1 - zs;
        var t22 = y * y * c1 + c;
        var t32 = yzc1 + xs;
        var t13 = xzc1 + ys;
        var t23 = yzc1 - xs;
        var t33 = z * z * c1 + c;

        r[0] = m11 * t11 + m12 * t21 + m13 * t31;
        r[1] = m21 * t11 + m22 * t21 + m23 * t31;
        r[2] = m31 * t11 + m32 * t21 + m33 * t31;
        r[3] = m41 * t11 + m42 * t21 + m43 * t31;
        r[4] = m11 * t12 + m12 * t22 + m13 * t32;
        r[5] = m21 * t12 + m22 * t22 + m23 * t32;
        r[6] = m31 * t12 + m32 * t22 + m33 * t32;
        r[7] = m41 * t12 + m42 * t22 + m43 * t32;
        r[8] = m11 * t13 + m12 * t23 + m13 * t33;
        r[9] = m21 * t13 + m22 * t23 + m23 * t33;
        r[10] = m31 * t13 + m32 * t23 + m33 * t33;
        r[11] = m41 * t13 + m42 * t23 + m43 * t33;

        if (r !== m) {
            r[12] = m[12];
            r[13] = m[13];
            r[14] = m[14];
            r[15] = m[15];
        }

        return r;
    }
    exports.rotate = rotate;

    function rotateAt(angle, pt, axis, m, r) {
        if (r === undefined)
            r = new base.ArrayType(16);

        var tmp = exports.makeRotate(angle, axis);
        var tmpPoint = exports.transformPointAffine(tmp, pt);

        exports.translate([pt[0] - tmpPoint[0], pt[1] - tmpPoint[1], pt[2] - tmpPoint[2]], tmp, tmp);
        exports.mul(m, tmp, r);

        return r;
    }
    exports.rotateAt = rotateAt;

    function transformPoint(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];

        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12];
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13];
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14];
        var w = m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15];

        if (w !== 1.0) {
            r[0] /= w;
            r[1] /= w;
            r[2] /= w;
        }

        return r;
    }
    exports.transformPoint = transformPoint;

    function transformLine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];
        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2;
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2;
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2;
        var w = m[3] * v0 + m[7] * v1 + m[11] * v2;

        if (w !== 1.0) {
            r[0] /= w;
            r[1] /= w;
            r[2] /= w;
        }

        return r;
    }
    exports.transformLine = transformLine;

    function transformPointAffine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];

        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12];
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13];
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14];

        return r;
    }
    exports.transformPointAffine = transformPointAffine;

    function transformLineAffine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(3);

        var v0 = v[0], v1 = v[1], v2 = v[2];
        r[0] = m[0] * v0 + m[4] * v1 + m[8] * v2;
        r[1] = m[1] * v0 + m[5] * v1 + m[9] * v2;
        r[2] = m[2] * v0 + m[6] * v1 + m[10] * v2;

        return r;
    }
    exports.transformLineAffine = transformLineAffine;

    function getBoundingClientRect(e, m) {
        var w = e.offsetWidth, h = e.offsetHeight, tl = [0, 0, 0], tr = [w, 0, 0], bl = [0, h, 0], br = [w, h, 0];

        exports.transformPointAffine(m, tl, tl);
        exports.transformPointAffine(m, tr, tr);
        exports.transformPointAffine(m, bl, bl);
        exports.transformPointAffine(m, br, br);

        return {
            left: Math.min(tl[0], tr[0], bl[0], br[0]),
            top: Math.min(tl[1], tr[1], bl[1], br[1]),
            right: Math.max(tl[0], tr[0], bl[0], br[0]),
            bottom: Math.max(tl[1], tr[1], bl[1], br[1])
        };
    }
    exports.getBoundingClientRect = getBoundingClientRect;

    function getTransformationMatrix(e) {
        var c = getComputedStyle(e, null);
        c = (c.transform || c.OTransform || c.WebkitTransform || c.msTransform || c.MozTransform || "none");
        return c === "none" ? exports.clone(exports.I) : exports.fromCssMatrix(c);
    }
    exports.getTransformationMatrix = getTransformationMatrix;

    function getRelativePosition(x, y, e) {
        var m = exports.getAbsoluteTransformationMatrix(e), invert = exports.inverse(m);

        return exports.transformPointAffine(invert, [x, y, 0]);
    }
    exports.getRelativePosition = getRelativePosition;

    var isBuggy;
    function detectBuggy() {
        var div = document.createElement("div"), rect, result;

        div.style.cssText = "width:200px;height:200px;position:fixed;-moz-transform:scale(2);";
        document.body.appendChild(div);

        rect = div.getBoundingClientRect();
        result = !!(getComputedStyle(div, null).MozTransform && (rect.bottom - rect.top < 300));
        div.parentNode.removeChild(div);

        return result;
    }
    function M4_getAbsoluteTransformationMatrixBuggy(x) {
        var transformationMatrix = exports.clone(exports.I), docElem = document.documentElement, parentRect, rect, t, c, s, origin, split;

        while (x && x !== document.documentElement) {
            t = exports.clone(exports.I);
            parentRect = x.parentNode && x.parentNode.getBoundingClientRect ? x.parentNode.getBoundingClientRect() : null;
            rect = x.getBoundingClientRect();

            if (parentRect) {
                exports.translateSelf([rect.left - parentRect.left, rect.top - parentRect.top, 0], t);
            }

            s = getComputedStyle(x, null);
            c = (s.MozTransform || "none");

            if (c !== "none") {
                c = exports.fromCssMatrix(c);

                origin = s.MozTransformOrigin || "0 0";
                if (origin.indexOf("%") !== -1) {
                    origin = "0 0";
                }
                split = origin.split(" ");
                origin = exports.translate([split[0], split[1], 0], exports.I);

                exports.mul(t, origin, t);
                exports.mul(t, c, t);
                exports.mul(t, exports.inverse(origin), t);
                exports.mul(t, transformationMatrix, transformationMatrix);
            }

            x = x.parentNode;
        }

        exports.translateSelf([-window.pageXOffset, -window.pageYOffset, 0], transformationMatrix);

        return transformationMatrix;
    }
    function M4_getAbsoluteTransformationMatrix(element) {
        var transformationMatrix = exports.clone(exports.I), x = element, rect = element.getBoundingClientRect(), docElem = document.documentElement, c, r;

        while (x && x !== docElem) {
            c = getComputedStyle(x, null);
            c = (c.transform || c.WebkitTransform || c.msTransform || c.MozTransform || c.OTransform || "none");

            if (c !== "none") {
                c = exports.fromCssMatrix(c);
                exports.mul(c, transformationMatrix, transformationMatrix);
            }

            x = x.parentNode;
        }

        r = exports.getBoundingClientRect(element, transformationMatrix);
        exports.translateSelf([rect.left - r.left, rect.top - r.top, 0], transformationMatrix);

        return transformationMatrix;
    }

    function getAbsoluteTransformationMatrix(e) {
        if (isBuggy === undefined)
            isBuggy = detectBuggy();

        return isBuggy ? M4_getAbsoluteTransformationMatrixBuggy(e) : M4_getAbsoluteTransformationMatrix(e);
    }
    exports.getAbsoluteTransformationMatrix = getAbsoluteTransformationMatrix;
});

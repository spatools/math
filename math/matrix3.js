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
        exports.I = [1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0];
        exports.$ = function (m00, m01, m02, m03, m04, m05, m06, m07, m08) {
            return [m00, m01, m02,
                m03, m04, m05,
                m06, m07, m08];
        };
        exports.clone = function (m) {
            return [m[0], m[1], m[2],
                m[3], m[4], m[5],
                m[6], m[7], m[8]];
        };
    }
    else {
        exports.I = new base.ArrayType([
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
        ]);
        exports.$ = function (m00, m01, m02, m03, m04, m05, m06, m07, m08) {
            return new base.ArrayType([
                m00, m01, m02,
                m03, m04, m05,
                m06, m07, m08
            ]);
        };
        exports.clone = function (m) {
            ///<summary>Clone the given 3x3 matrix</summary>
            ///<param name="m" type="Float32Array">The 3x3 matrix to clone</param>
            ///<return type="Float32Array">Return a new matrix with values from argument</return>
            return new base.ArrayType(m);
        };
    }
    exports.identity = exports.I;
    //#endregion
    //#region String Methods
    /** Return a string representation of the given matrix */
    function toString(m) {
        return Array.prototype.join.call(m, ",");
    }
    exports.toString = toString;
    /** Return a CSS 2D representation of the given matrix */
    function toCssMatrix(m) {
        return "matrix(" + m[0] + "," + m[1] + "," + m[3] + "," + m[4] + "," + m[6] + "," + m[7] + ")";
    }
    exports.toCssMatrix = toCssMatrix;
    /** Return a CSS 3D representation of the given matrix */
    function toCss3dMatrix(m) {
        return "matrix3d(" + m[0] + "," + m[1] + ",0,0," + m[3] + "," + m[4] + ",0,0,0,0,1,0," + m[6] + "," + m[7] + ",0,1)";
    }
    exports.toCss3dMatrix = toCss3dMatrix;
    function fromCssMatrix(css, r) {
        var c = css.match(/matrix(3d)?\(([^\)]+)\)/i)[2].split(",");
        if (r === undefined)
            r = exports.clone(exports.I);
        if (c.length === 16) {
            r[0] = parseFloat(c[0]);
            r[1] = parseFloat(c[1]);
            r[3] = parseFloat(c[4]);
            r[4] = parseFloat(c[5]);
            r[6] = parseFloat(c[12]);
            r[7] = parseFloat(c[13]);
        }
        else {
            r[0] = parseFloat(c[0]);
            r[1] = parseFloat(c[1]);
            r[3] = parseFloat(c[2]);
            r[4] = parseFloat(c[3]);
            r[6] = parseFloat(c[4]);
            r[7] = parseFloat(c[5]);
        }
        return r;
    }
    exports.fromCssMatrix = fromCssMatrix;
    //#endregion
    //#region Operations Methods
    /** Computes the inverse of the given matrix */
    function inverse(m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var m11 = m[0], m21 = m[1], m31 = m[2], m12 = m[3], m22 = m[4], m32 = m[5], m13 = m[6], m23 = m[7], m33 = m[8], b21 = m33 * m22 - m32 * m23, b22 = -m33 * m12 + m32 * m13, b23 = m23 * m12 - m22 * m13;
        var det = m11 * b21 + m21 * b22 + m31 * b23;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        r[0] = b21 * det;
        r[1] = (-m33 * m21 + m31 * m23) * det;
        r[2] = (m32 * m21 - m31 * m22) * det;
        r[3] = b22 * det;
        r[4] = (m33 * m11 - m31 * m13) * det;
        r[5] = (-m32 * m11 + m31 * m12) * det;
        r[6] = b23 * det;
        r[7] = (-m23 * m11 + m21 * m13) * det;
        r[8] = (m22 * m11 - m21 * m12) * det;
        return r;
    }
    exports.inverse = inverse;
    /** Transpose the given matrix to r. */
    function transpose(m, r) {
        if (m === r) {
            var m21 = m[1], m31 = m[2], m32 = m[5];
            m[1] = m[3];
            m[2] = m[6];
            m[3] = m21;
            m[5] = m[7];
            m[6] = m31;
            m[7] = m32;
            return m;
        }
        if (r === undefined)
            r = new base.ArrayType(9);
        r[0] = m[0];
        r[1] = m[3];
        r[2] = m[6];
        r[3] = m[1];
        r[4] = m[4];
        r[5] = m[7];
        r[6] = m[2];
        r[7] = m[5];
        r[8] = m[8];
        return r;
    }
    exports.transpose = transpose;
    /** Transpose the given matrix to itself. */
    function transposeSelf(m) {
        var m21 = m[1], m31 = m[2], m32 = m[5];
        m[1] = m[3];
        m[2] = m[6];
        m[3] = m21;
        m[5] = m[7];
        m[6] = m31;
        m[7] = m32;
        return m;
    }
    exports.transposeSelf = transposeSelf;
    /** Return a new matrix by performing r = a * b */
    function mul(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var m11 = a[0], m21 = a[1], m31 = a[2], m12 = a[3], m22 = a[4], m32 = a[5], m13 = a[6], m23 = a[7], m33 = a[8], b11 = b[0], b21 = b[1], b31 = b[2], b12 = b[3], b22 = b[4], b32 = b[5], b13 = b[6], b23 = b[7], b33 = b[8];
        r[0] = b11 * m11 + b21 * m12 + b31 * m13;
        r[1] = b11 * m21 + b21 * m22 + b31 * m23;
        r[2] = b11 * m31 + b21 * m32 + b31 * m33;
        r[3] = b12 * m11 + b22 * m12 + b32 * m13;
        r[4] = b12 * m21 + b22 * m22 + b32 * m23;
        r[5] = b12 * m31 + b22 * m32 + b32 * m33;
        r[6] = b13 * m11 + b23 * m12 + b33 * m13;
        r[7] = b13 * m21 + b23 * m22 + b33 * m23;
        r[8] = b13 * m31 + b23 * m32 + b33 * m33;
        return r;
    }
    exports.mul = mul;
    exports.multiply = mul;
    /** Return a new matrix by performing r = a * b, ensuring r is affine */
    function mulAffine(a, b, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var m11 = a[0], m21 = a[1], m12 = a[3], m22 = a[4], m13 = a[6], m23 = a[7], b11 = b[0], b21 = b[1], b12 = b[3], b22 = b[4], b13 = b[6], b23 = b[7];
        r[0] = b11 * m11 + b21 * m12;
        r[1] = b11 * m21 + b21 * m22;
        r[2] = 0;
        r[3] = b12 * m11 + b22 * m12;
        r[4] = b12 * m21 + b22 * m22;
        r[5] = 0;
        r[6] = b13 * m11 + b23 * m12 + m13;
        r[7] = b13 * m21 + b23 * m22 + m23;
        r[8] = 1;
        return r;
    }
    exports.mulAffine = mulAffine;
    exports.multiplyAffine = mulAffine;
    //#endregion
    //#region Translate Methods
    /** Creates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 2-element vector. */
    function makeTranslate(v, r) {
        var x = v[0], y = v[1];
        if (r === undefined)
            r = new base.ArrayType(9);
        r[0] = 1;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 1;
        r[5] = 0;
        r[6] = x;
        r[7] = y;
        r[8] = 1;
        return r;
    }
    exports.makeTranslate = makeTranslate;
    /** Creates a transformation matrix for a uniform translation among the x and y axes using the given value. */
    function makeTranslate1(k, r) {
        return makeTranslate([k, k], r);
    }
    exports.makeTranslate1 = makeTranslate1;
    /** Concatenates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 1-element vector to the given matrix. */
    function translate(v, m, r) {
        var x = v[0], y = v[1];
        if (r === m) {
            m[6] += x;
            m[7] += y;
            return m;
        }
        if (r === undefined)
            r = new base.ArrayType(9);
        r[0] = m[0];
        r[1] = m[1];
        r[2] = m[2];
        r[3] = m[3];
        r[4] = m[4];
        r[5] = m[5];
        r[6] = m[6] + x;
        r[7] = m[7] + y;
        r[8] = 1;
        return r;
    }
    exports.translate = translate;
    /** Concatenates a transformation matrix for a uniform translation among the x and y axes using the given value to the given matrix. */
    function translate1(k, m, r) {
        return translate([k, k], m, r);
    }
    exports.translate1 = translate1;
    /** Concatenates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 32-element vector to the given matrix and store in it directly. */
    function translateSelf(v, m) {
        m[6] += v[0];
        m[7] += v[1];
        return m;
    }
    exports.translateSelf = translateSelf;
    //#endregion
    //#region Scale Methods
    /** Creates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector. */
    function makeScale(v, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var x = v[0], y = v[1];
        r[0] = x;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = y;
        r[5] = 0;
        r[6] = 0;
        r[7] = 0;
        r[8] = 1;
        return r;
    }
    exports.makeScale = makeScale;
    /** Creates a transformation matrix for a uniform scale by a single scalar value. */
    function makeScale1(k, r) {
        return makeScale([k, k], r);
    }
    exports.makeScale1 = makeScale1;
    /** Concatenates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector to the given matrix. */
    function scale(v, m, r) {
        var x = v[0], y = v[1];
        if (r === m) {
            m[0] *= x;
            m[1] *= x;
            m[2] *= x;
            m[3] *= y;
            m[4] *= y;
            m[5] *= y;
            return m;
        }
        if (r === undefined)
            r = new base.ArrayType(9);
        r[0] = m[0] * x;
        r[1] = m[1] * x;
        r[2] = m[2] * x;
        r[3] = m[3] * y;
        r[4] = m[4] * y;
        r[5] = m[5] * y;
        r[6] = m[6];
        r[7] = m[7];
        r[8] = m[8];
        return r;
    }
    exports.scale = scale;
    /** Concatenates a transformation matrix for a uniform scale by a single scalar value to the given matrix. */
    function scale1(k, m, r) {
        return scale([k, k], m, r);
    }
    exports.scale1 = scale1;
    /** Concatenates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector at the given center to the given matrix. */
    function scaleAt(v, pt, m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var tmp = makeScale(v), tmpPoint = transformPointAffine(tmp, pt);
        translateSelf([pt[0] - tmpPoint[0], pt[1] - tmpPoint[1]], tmp);
        mul(m, tmp, r);
        return r;
    }
    exports.scaleAt = scaleAt;
    //#endregion
    //#region Rotate Methods
    /** Create a transformation matrix for rotation by given angle radians. */
    function makeRotate(angle, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var c = Math.cos(angle), s = Math.sin(angle);
        r[0] = c;
        r[1] = s;
        r[2] = 0;
        r[3] = -s;
        r[4] = c;
        r[5] = 0;
        r[6] = 0;
        r[7] = 0;
        r[8] = 1;
        return r;
    }
    exports.makeRotate = makeRotate;
    /** Concatenates a rotation of angle radians to the given matrix. */
    function rotate(angle, m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var c = Math.cos(angle), s = Math.sin(angle), m11 = m[0], m21 = m[1], m12 = m[3], m22 = m[4], m13 = m[6], m32 = m[7];
        r[0] = m11 * c + m21 * -s;
        r[1] = m11 * s + m21 * c;
        r[2] = 0;
        r[3] = m12 * c + m22 * -s;
        r[4] = m12 * s + m22 * c;
        r[5] = 0;
        if (r !== m) {
            r[6] = m[6];
            r[7] = m[7];
            r[8] = m[8];
        }
        return r;
    }
    exports.rotate = rotate;
    /** Concatenates a rotation of angle radians using the given center point to the given matrix. */
    function rotateAt(angle, pt, m, r) {
        if (r === undefined)
            r = new base.ArrayType(9);
        var tmp = makeRotate(angle), tmpPoint = transformPointAffine(tmp, pt);
        translateSelf([pt[0] - tmpPoint[0], pt[1] - tmpPoint[1]], tmp);
        mul(m, tmp, r);
        return r;
    }
    exports.rotateAt = rotateAt;
    //#endregion
    //#region Transform Methods
    /** Transform the given point by the given transformation matrix. */
    function transformPoint(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        var x = v[0], y = v[1];
        r[0] = m[0] * x + m[3] * y + m[6];
        r[1] = m[1] * x + m[4] * y + m[7];
        var w = m[2] * x + m[5] * y + m[8];
        if (w !== 1.0) {
            r[0] /= w;
            r[1] /= w;
        }
        return r;
    }
    exports.transformPoint = transformPoint;
    /** Transform the given direction vector by the given transformation matrix. */
    function transformLine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        var x = v[0], y = v[1];
        r[0] = m[0] * x + m[3] * y;
        r[1] = m[1] * x + m[4] * y;
        var w = m[2] * x + m[5] * y;
        if (w !== 1.0) {
            r[0] /= w;
            r[1] /= w;
        }
        return r;
    }
    exports.transformLine = transformLine;
    /** Transform the given point by the given transformation matrix, assuming that it's orthonormal. */
    function transformPointAffine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        var x = v[0], y = v[1];
        r[0] = m[0] * x + m[3] * y + m[6];
        r[1] = m[1] * x + m[4] * y + m[7];
        return r;
    }
    exports.transformPointAffine = transformPointAffine;
    /** Transform the given direction vector by the given transformation matrix, assuming that it's orthonormal. */
    function transformLineAffine(m, v, r) {
        if (r === undefined)
            r = new base.ArrayType(2);
        var x = v[0], y = v[1];
        r[0] = m[0] * x + m[3] * y;
        r[1] = m[1] * x + m[4] * y;
        return r;
    }
    exports.transformLineAffine = transformLineAffine;
    //#endregion
    //#region DOM Methods
    /** Return the bounding box for the given element transformed by the given matrix. */
    function getBoundingClientRect(e, m) {
        var w = e.offsetWidth, h = e.offsetHeight, tl = [0, 0], tr = [w, 0], bl = [0, h], br = [w, h];
        transformPointAffine(m, tl, tl);
        transformPointAffine(m, tr, tr);
        transformPointAffine(m, bl, bl);
        transformPointAffine(m, br, br);
        return {
            left: Math.min(tl[0], tr[0], bl[0], br[0]),
            top: Math.min(tl[1], tr[1], bl[1], br[1]),
            right: Math.max(tl[0], tr[0], bl[0], br[0]),
            bottom: Math.max(tl[1], tr[1], bl[1], br[1])
        };
    }
    exports.getBoundingClientRect = getBoundingClientRect;
    /** Return the transformation matrix of the given element. */
    function getTransformationMatrix(e) {
        var s = getComputedStyle(e, null), t = s.transform || s.OTransform || s.WebkitTransform || s.msTransform || s.MozTransform || "none";
        return t === "none" ? exports.clone(exports.I) : fromCssMatrix(t);
    }
    exports.getTransformationMatrix = getTransformationMatrix;
    /** Return the given position relative to specified element, by calculating transformation on the element */
    function getRelativePosition(x, y, e) {
        var m = getAbsoluteTransformationMatrix(e), invert = inverse(m);
        return transformPointAffine(invert, [x, y]);
    }
    exports.getRelativePosition = getRelativePosition;
    //#endregion
    //#region Get Absolute Transformation Matrix
    var isBuggy;
    function detectBuggy() {
        var div = document.createElement("div");
        div.style.cssText = "width:200px;height:200px;position:fixed;-moz-transform:scale(2);";
        document.body.appendChild(div);
        var rect = div.getBoundingClientRect(), cp = getComputedStyle(div, null), result = !!(cp.MozTransform && cp.MozTransform !== "none" && ((rect.bottom - rect.top) < 300)); // wow
        div.parentNode.removeChild(div);
        return result;
    }
    function M3_getAbsoluteTransformationMatrixBuggy(x) {
        var transformationMatrix = exports.clone(exports.I), docElem = document.documentElement;
        var parentRect, rect, t, c, s, origin;
        while (x && x !== docElem) {
            t = exports.clone(exports.I);
            parentRect = x.parentNode && x.parentNode.getBoundingClientRect ? x.parentNode.getBoundingClientRect() : null;
            rect = x.getBoundingClientRect();
            if (parentRect) {
                translateSelf([rect.left - parentRect.left, rect.top - parentRect.top], t);
            }
            s = getComputedStyle(x, null);
            c = (s.MozTransform || "none");
            if (c !== "none") {
                c = fromCssMatrix(c);
                origin = s.MozTransformOrigin || "0 0";
                if (origin.indexOf("%") !== -1) { // Firefox gives 50% 50% when there is no transform!? and pixels (50px 30px) otherwise
                    origin = "0 0";
                }
                origin = translate(origin.split(" "), exports.I);
                mul(t, origin, t);
                mul(t, c, t);
                mul(t, inverse(origin), t);
                mul(t, transformationMatrix, transformationMatrix);
            }
            x = x.parentNode;
        }
        translateSelf([-window.pageXOffset, -window.pageYOffset], transformationMatrix);
        return transformationMatrix;
    }
    function M3_getAbsoluteTransformationMatrix(element) {
        var transformationMatrix = exports.clone(exports.I), rect = element.getBoundingClientRect(), docElem = document.documentElement;
        var x = element, c;
        while (x && x !== docElem) {
            c = getComputedStyle(x, null);
            c = (c.transform || c.WebkitTransform || c.msTransform || c.MozTransform || c.OTransform || "none");
            if (c !== "none") {
                c = fromCssMatrix(c);
                mul(c, transformationMatrix, transformationMatrix);
            }
            x = x.parentNode;
        }
        var r = getBoundingClientRect(element, transformationMatrix);
        translateSelf([rect.left - r.left, rect.top - r.top], transformationMatrix);
        return transformationMatrix;
    }
    /** Return the absolute transformation by multiplying each parent matrix transformation */
    function getAbsoluteTransformationMatrix(e) {
        if (isBuggy === undefined)
            isBuggy = detectBuggy();
        return isBuggy ? M3_getAbsoluteTransformationMatrixBuggy(e) : M3_getAbsoluteTransformationMatrix(e);
    }
    exports.getAbsoluteTransformationMatrix = getAbsoluteTransformationMatrix;
});
//#endregion

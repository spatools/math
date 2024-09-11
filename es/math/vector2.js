import * as base from "./base";
//#region Init Methods
export let x;
export let y;
/** Create a new vector 2 with the given arguments */
export let $;
/** Return a copy of the given vector 2 */
export let clone;
if (base.ArrayType === Array) {
    x = [1.0, 0.0];
    y = [0.0, 1.0];
    $ = function (x, y) {
        return [x, y];
    };
    clone = function (vector) {
        return [vector[0], vector[1]];
    };
}
else {
    x = new base.ArrayType([1.0, 0.0]);
    y = new base.ArrayType([0.0, 1.0]);
    $ = function (x, y) {
        return new base.ArrayType([x, y]);
    };
    clone = function (vector) {
        return new base.ArrayType(vector);
    };
}
export const u = x;
export const v = y;
//#endregion
//#region Operation Methods
/** Return a vector 2 by performing r = a + b */
export function add(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
}
/** Return a vector 2 by performing r = a - b */
export function sub(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
}
export const substract = sub;
/** Return a vector 2 by performing r = -a */
export function neg(a, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
}
export const negate = neg;
/** Return result of operation performing r = dot(a, b) */
export function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}
/** Return a vector 2 by performing cross operation : r = a x b */
export function cross(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = a[1] - b[1];
    r[1] = b[0] - a[0];
    return r;
}
/** Return a vector 2 by performing r = m * v */
export function mul3x3(m, b, r) {
    const x = v[0], y = v[1], z = v[2];
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = m[0] * x + m[1] * y + m[6];
    r[1] = m[2] * x + m[3] * y + m[7];
    return r;
}
//#endregion
//#region Transformation Methods
/** Normalize given vector 2 by performing  r = a / |a|. */
export function normalize(a, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    const im = 1.0 / length(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
}
/** Return given vector 2 scaled by performing  r = a * k. */
export function scale(a, k, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
}
//#endregion
//#region Information Methods
/** Direction from a to b. Return a direction vector 2 by performing r = (a - b) / |a - b|. The result is the normalized. */
export function direction(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(2);
    return normalize(sub(a, b, r), r);
}
/** Return length of the given vector 2 by performing r = |a|. */
export function length(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
/** Return length squared of the given vector 2 by performing r = |a|*|a|. */
export function lengthSquared(a) {
    return a[0] * a[0] + a[1] * a[1];
}
//#endregion

import * as base from "./base";
//#region Init Methods
export const _temp1 = new base.ArrayType(3), _temp2 = new base.ArrayType(3), _temp3 = new base.ArrayType(3);
export let x;
export let y;
export let z;
/** Return a copy of the given vector 3 */
export let $;
/** Create a new vector 3 with the given arguments */
export let clone;
if (base.ArrayType === Array) {
    x = [1.0, 0.0, 0.0];
    y = [0.0, 1.0, 0.0];
    z = [0.0, 0.0, 1.0];
    $ = function (x, y, z) {
        return [x, y, z];
    };
    clone = function (v) {
        return [v[0], v[1], v[2]];
    };
}
else {
    x = new base.ArrayType([1.0, 0.0, 0.0]);
    y = new base.ArrayType([0.0, 1.0, 0.0]);
    z = new base.ArrayType([0.0, 0.0, 1.0]);
    $ = function (x, y, z) {
        return new base.ArrayType([x, y, z]);
    };
    clone = function (v) {
        return new base.ArrayType(v);
    };
}
export const u = x;
export const v = y;
//#endregion
//#region Operation Methods
/** Return a vector 3 by performing r = a + b */
export function add(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
}
/** Return a vector 3 by performing r = a - b */
export function sub(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
export const substract = sub;
/** Return a vector 3 by performing r = -a */
export function neg(a, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
}
export const negate = neg;
/** Return a vector 3 by performing r = dot(a, b) */
export function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/** Return a vector 3 by performing cross operation : r = a x b */
export function cross(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
/** Return a vector 3 by performing r = m * v */
export function mul4x4(m, v, r) {
    const tmp = _temp1;
    if (r === undefined)
        r = new base.ArrayType(3);
    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    const w = dot(v, tmp) + m[15];
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
//#endregion
//#region Transformation Methods
/** Normalize given vector 3 by performing  r = a / |a|. */
export function normalize(a, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    const im = 1.0 / length(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
/** Return given vector 3 scaled by performing  r = a * k. */
export function scale(a, k, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    return r;
}
//#endregion
//#region Information Methods
/** Direction from a to b. Return a direction vector 3 by performing r = (a - b) / |a - b|. The result is the normalized. */
export function direction(a, b, r) {
    if (r === undefined)
        r = new base.ArrayType(3);
    return normalize(sub(a, b, r), r);
}
/** Return length of the given vector 3 by performing r = |a|. */
export function length(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
/** Return length squared of the given vector 3 by performing r = |a|*|a|. */
export function lengthSquared(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
}
//#endregion

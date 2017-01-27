import M4 = require("./matrix4");
export declare type Vector3 = [number, number, number];
export declare const _temp1: any, _temp2: any, _temp3: any;
export declare let x: Vector3;
export declare let y: Vector3;
export declare let z: Vector3;
/** Return a copy of the given vector 3 */
export declare let $: (x: number, y: number, z: number) => Vector3;
/** Create a new vector 3 with the given arguments */
export declare let clone: (v: Vector3) => Vector3;
export declare const u: [number, number, number];
export declare const v: [number, number, number];
/** Return a vector 3 by performing r = a + b */
export declare function add(a: Vector3, b: Vector3, r?: Vector3): Vector3;
/** Return a vector 3 by performing r = a - b */
export declare function sub(a: Vector3, b: Vector3, r?: Vector3): Vector3;
export declare const substract: typeof sub;
/** Return a vector 3 by performing r = -a */
export declare function neg(a: Vector3, r?: Vector3): Vector3;
export declare const negate: typeof neg;
/** Return a vector 3 by performing r = dot(a, b) */
export declare function dot(a: Vector3, b: Vector3): number;
/** Return a vector 3 by performing cross operation : r = a x b */
export declare function cross(a: Vector3, b: Vector3, r?: Vector3): Vector3;
/** Return a vector 3 by performing r = m * v */
export declare function mul4x4(m: M4.Matrix4, v: Vector3, r?: Vector3): Vector3;
/** Normalize given vector 3 by performing  r = a / |a|. */
export declare function normalize(a: Vector3, r?: Vector3): Vector3;
/** Return given vector 3 scaled by performing  r = a * k. */
export declare function scale(a: Vector3, k: number, r?: Vector3): Vector3;
/** Direction from a to b. Return a direction vector 3 by performing r = (a - b) / |a - b|. The result is the normalized. */
export declare function direction(a: Vector3, b: Vector3, r?: Vector3): Vector3;
/** Return length of the given vector 3 by performing r = |a|. */
export declare function length(a: Vector3): number;
/** Return length squared of the given vector 3 by performing r = |a|*|a|. */
export declare function lengthSquared(a: Vector3): number;

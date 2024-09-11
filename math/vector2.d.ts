import * as M3 from "./matrix3";
export declare type Vector2 = [number, number];
export declare let x: Vector2;
export declare let y: Vector2;
/** Create a new vector 2 with the given arguments */
export declare let $: (x: number, y: number) => Vector2;
/** Return a copy of the given vector 2 */
export declare let clone: (vector: Vector2) => Vector2;
export declare const u: [number, number];
export declare const v: [number, number];
/** Return a vector 2 by performing r = a + b */
export declare function add(a: Vector2, b: Vector2, r?: Vector2): Vector2;
/** Return a vector 2 by performing r = a - b */
export declare function sub(a: Vector2, b: Vector2, r?: Vector2): Vector2;
export declare const substract: typeof sub;
/** Return a vector 2 by performing r = -a */
export declare function neg(a: Vector2, r?: Vector2): Vector2;
export declare const negate: typeof neg;
/** Return result of operation performing r = dot(a, b) */
export declare function dot(a: Vector2, b: Vector2): number;
/** Return a vector 2 by performing cross operation : r = a x b */
export declare function cross(a: Vector2, b: Vector2, r?: Vector2): Vector2;
/** Return a vector 2 by performing r = m * v */
export declare function mul3x3(m: M3.Matrix3, b: Vector2, r?: Vector2): Vector2;
/** Normalize given vector 2 by performing  r = a / |a|. */
export declare function normalize(a: Vector2, r?: Vector2): Vector2;
/** Return given vector 2 scaled by performing  r = a * k. */
export declare function scale(a: Vector2, k: number, r?: Vector2): Vector2;
/** Direction from a to b. Return a direction vector 2 by performing r = (a - b) / |a - b|. The result is the normalized. */
export declare function direction(a: Vector2, b: Vector2, r?: Vector2): Vector2;
/** Return length of the given vector 2 by performing r = |a|. */
export declare function length(a: Vector2): number;
/** Return length squared of the given vector 2 by performing r = |a|*|a|. */
export declare function lengthSquared(a: Vector2): number;

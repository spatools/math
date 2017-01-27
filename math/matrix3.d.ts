import V2 = require("./vector2");
export declare type Matrix3 = [number, number, number, number, number, number, number, number, number];
export interface BoundingBox {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
/** Representation of 3x3 matrix identity */
export declare let I: Matrix3;
/** Create a new 3x3 matrix with the given arguments */
export declare let $: (m00: number, m01: number, m02: number, m03: number, m04: number, m05: number, m06: number, m07: number, m08: number) => Matrix3;
/** Create a copy of the given 3x3 matrix */
export declare let clone: (m: Matrix3) => Matrix3;
export declare const identity: [number, number, number, number, number, number, number, number, number];
/** Return a string representation of the given matrix */
export declare function toString(m: Matrix3): string;
/** Return a CSS 2D representation of the given matrix */
export declare function toCssMatrix(m: Matrix3): string;
/** Return a CSS 3D representation of the given matrix */
export declare function toCss3dMatrix(m: Matrix3): string;
export declare function fromCssMatrix(css: string, r?: Matrix3): Matrix3;
/** Computes the inverse of the given matrix */
export declare function inverse(m: Matrix3, r?: Matrix3): Matrix3;
/** Transpose the given matrix to r. */
export declare function transpose(m: Matrix3, r?: Matrix3): Matrix3;
/** Transpose the given matrix to itself. */
export declare function transposeSelf(m: Matrix3): Matrix3;
/** Return a new matrix by performing r = a * b */
export declare function mul(a: Matrix3, b: Matrix3, r?: Matrix3): Matrix3;
export declare const multiply: typeof mul;
/** Return a new matrix by performing r = a * b, ensuring r is affine */
export declare function mulAffine(a: Matrix3, b: Matrix3, r?: Matrix3): Matrix3;
export declare const multiplyAffine: typeof mulAffine;
/** Creates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 2-element vector. */
export declare function makeTranslate(v: V2.Vector2, r?: Matrix3): Matrix3;
/** Creates a transformation matrix for a uniform translation among the x and y axes using the given value. */
export declare function makeTranslate1(k: number, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 1-element vector to the given matrix. */
export declare function translate(v: V2.Vector2, m: Matrix3, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for a uniform translation among the x and y axes using the given value to the given matrix. */
export declare function translate1(k: number, m: Matrix3, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for translating each of the x and y axes by the amount given in the corresponding element of the 32-element vector to the given matrix and store in it directly. */
export declare function translateSelf(v: V2.Vector2, m: Matrix3): Matrix3;
/** Creates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector. */
export declare function makeScale(v: V2.Vector2, r?: Matrix3): Matrix3;
/** Creates a transformation matrix for a uniform scale by a single scalar value. */
export declare function makeScale1(k: number, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector to the given matrix. */
export declare function scale(v: V2.Vector2, m: Matrix3, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for a uniform scale by a single scalar value to the given matrix. */
export declare function scale1(k: number, m: Matrix3, r?: Matrix3): Matrix3;
/** Concatenates a transformation matrix for scaling each of the x and y axes by the amount given in the corresponding element of the 2-element vector at the given center to the given matrix. */
export declare function scaleAt(v: V2.Vector2, pt: V2.Vector2, m: Matrix3, r?: Matrix3): Matrix3;
/** Create a transformation matrix for rotation by given angle radians. */
export declare function makeRotate(angle: number, r?: Matrix3): Matrix3;
/** Concatenates a rotation of angle radians to the given matrix. */
export declare function rotate(angle: number, m: Matrix3, r?: Matrix3): Matrix3;
/** Concatenates a rotation of angle radians using the given center point to the given matrix. */
export declare function rotateAt(angle: number, pt: V2.Vector2, m: Matrix3, r?: Matrix3): Matrix3;
/** Transform the given point by the given transformation matrix. */
export declare function transformPoint(m: Matrix3, v: V2.Vector2, r?: V2.Vector2): V2.Vector2;
/** Transform the given direction vector by the given transformation matrix. */
export declare function transformLine(m: Matrix3, v: V2.Vector2, r?: V2.Vector2): V2.Vector2;
/** Transform the given point by the given transformation matrix, assuming that it's orthonormal. */
export declare function transformPointAffine(m: Matrix3, v: V2.Vector2, r?: V2.Vector2): V2.Vector2;
/** Transform the given direction vector by the given transformation matrix, assuming that it's orthonormal. */
export declare function transformLineAffine(m: Matrix3, v: V2.Vector2, r?: V2.Vector2): V2.Vector2;
/** Return the bounding box for the given element transformed by the given matrix. */
export declare function getBoundingClientRect(e: HTMLElement, m: Matrix3): BoundingBox;
/** Return the transformation matrix of the given element. */
export declare function getTransformationMatrix(e: HTMLElement): Matrix3;
/** Return the given position relative to specified element, by calculating transformation on the element */
export declare function getRelativePosition(x: number, y: number, e: HTMLElement): V2.Vector2;
/** Return the absolute transformation by multiplying each parent matrix transformation */
export declare function getAbsoluteTransformationMatrix(e: HTMLElement): Matrix3;

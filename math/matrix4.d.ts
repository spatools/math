import * as V3 from "./vector3";
import * as M3 from "./matrix3";
export declare type Matrix4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export interface BoundingBox {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export declare let _temp1: any;
export declare let _temp2: any;
/** Identity 4x4 Matrix */
export declare let I: Matrix4;
/** Create new Matrix 4x4 */
export declare let $: (m00: number, m01: number, m02: number, m03: number, m04: number, m05: number, m06: number, m07: number, m08: number, m09: number, m10: number, m11: number, m12: number, m13: number, m14: number, m15: number) => Matrix4;
/** Clone the given 4x4 matrix */
export declare let clone: (m: Matrix4) => Matrix4;
export declare const identity: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
/** Return the top left 3x3 matrix from the given 4x4 matrix */
export declare function topLeft3x3(m: Matrix4, r?: M3.Matrix3): M3.Matrix3;
/** Return a string representation of the given matrix */
export declare function toString(m: Matrix4): string;
/** Return a CSS 2D representation of the given matrix */
export declare function toCss2dMatrix(m: Matrix4): string;
/** Return a CSS 3D representation of the given matrix */
export declare function toCss3dMatrix(m: Matrix4): string;
/** Return a 4x4 Matrix from the given CSS string */
export declare function fromCssMatrix(css: string, r?: Matrix4): Matrix4;
/** Computes the inverse of the given matrix */
export declare function inverse(m: Matrix4, r?: Matrix4): Matrix4;
/** Computes the inverse of the given matrix, assuming that the matrix is orthonormal */
export declare function inverseOrthonormal(m: Matrix4, r?: Matrix4): Matrix4;
/** Computes the inverse of the given matrix, calculate only top left 3x3 */
export declare function inverseTo3x3(m: Matrix4, r?: M3.Matrix3): M3.Matrix3;
/** Return a new matrix by performing r = a * b */
export declare function mul(a: Matrix4, b: Matrix4, r?: Matrix4): Matrix4;
export declare const multiply: typeof mul;
/** Return a new matrix by performing r = a * b, assuming a and b are affine (elements 3,7,11,15 = 0,0,0,1) */
export declare function mulAffine(a: Matrix4, b: Matrix4, r?: Matrix4): Matrix4;
export declare const multiplyAffine: typeof mulAffine;
/** Transpose the given matrix into r. */
export declare function transpose(m: Matrix4, r?: Matrix4): Matrix4;
/** Transpose the given matrix to itself. */
export declare function transposeSelf(m: Matrix4): Matrix4;
/** Creates a matrix for a projection frustum with the given parameters */
export declare function makeFrustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, r?: Matrix4): Matrix4;
/** Creates a matrix for a perspective projection with the given parameters */
export declare function makePerspective(fovy: number, aspect: number, znear: number, zfar: number, r?: Matrix4): Matrix4;
/** Creates a matrix for an orthogonal frustum projection with the given parameters */
export declare function makeOrtho(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, r?: Matrix4): Matrix4;
/** Creates a matrix for a 2D orthogonal frustum projection with the given parameters. znear and zfar are assumed to be -1 and 1, respectively. */
export declare function makeOrtho2D(left: number, right: number, bottom: number, top: number, r?: Matrix4): Matrix4;
/** Creates a perspective matrix from the given parameters. */
export declare function makeLookAt(eye: V3.Vector3, center: V3.Vector3, up: V3.Vector3, r?: Matrix4): Matrix4;
/** Creates a transformation matrix for translating each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector. */
export declare function makeTranslate(v: V3.Vector3, r?: Matrix4): Matrix4;
/** Creates a transformation matrix for a uniform translation among the x, y, z axes using the given value. */
export declare function makeTranslate1(k: number, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for translating each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector to the given matrix. */
export declare function translate(v: V3.Vector3, m: Matrix4, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for a uniform translation among the x, y, z axes using the given value to the given matrix. */
export declare function translate1(k: number, m: Matrix4, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for translating each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector and store in it directly. */
export declare function translateSelf(v: V3.Vector3, m: Matrix4): Matrix4;
/** Creates a transformation matrix for scaling each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector. */
export declare function makeScale(v: V3.Vector3, r?: Matrix4): Matrix4;
/** Creates a transformation matrix for a uniform scale by a single scalar value. */
export declare function makeScale1(k: number, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for scaling each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector to the given matrix. */
export declare function scale(v: V3.Vector3, m: Matrix4, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for a uniform scale by a single scalar value to the given matrix. */
export declare function scale1(k: number, m: Matrix4, r?: Matrix4): Matrix4;
/** Concatenates a transformation matrix for scaling each of the x, y, and z axes by the amount given in the corresponding element of the 3-element vector at the given center to the given matrix. */
export declare function scaleAt(v: V3.Vector3, pt: V3.Vector3, m: Matrix4, r?: Matrix4): Matrix4;
/** Create a transformation matrix for rotation by angle radians about the 3-element vector axis. */
export declare function makeRotate(angle: number, axis: V3.Vector3, r?: Matrix4): Matrix4;
/** Concatenates a rotation of angle radians about the 3-element vector axis to the given matrix. */
export declare function rotate(angle: number, axis: V3.Vector3, m: Matrix4, r?: Matrix4): Matrix4;
/** Concatenates a rotation of angle radians about the 3-element vector axis at the given center point to the given matrix. */
export declare function rotateAt(angle: number, pt: V3.Vector3, axis: V3.Vector3, m: Matrix4, r?: Matrix4): Matrix4;
/** Transform the given point using the specified transformation matrix. */
export declare function transformPoint(m: Matrix4, v: V3.Vector3, r?: V3.Vector3): V3.Vector3;
/** Transform the given direction vector by the given transformation matrix. */
export declare function transformLine(m: Matrix4, v: V3.Vector3, r?: V3.Vector3): V3.Vector3;
/** Transform the given point by the given transformation matrix, assuming that it's orthonormal. */
export declare function transformPointAffine(m: Matrix4, v: V3.Vector3, r?: V3.Vector3): V3.Vector3;
/** Transform the given direction vector by the given transformation matrix, assuming that it's orthonormal. */
export declare function transformLineAffine(m: Matrix4, v: V3.Vector3, r?: V3.Vector3): V3.Vector3;
/** Return the bounding box for the given element transformed by the given matrix. */
export declare function getBoundingClientRect(e: HTMLElement, m: Matrix4): BoundingBox;
/** Return the transformation matrix of the given element. */
export declare function getTransformationMatrix(e: HTMLElement): Matrix4;
/** Return the given position relative to specified element, by calculating transformation on the element */
export declare function getRelativePosition(x: number, y: number, e: HTMLElement): V3.Vector3;
/** Return the absolute transformation by multiplying each parent matrix transformation */
export declare function getAbsoluteTransformationMatrix(e: HTMLElement): Matrix4;

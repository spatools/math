export interface Point {
    x: number;
    y: number;
}
export interface CenterAreaResult extends Point {
    a: number;
}
/** Calculate area for given set of points, if two points, calculate length */
export declare function area(pts: Point[], signed?: boolean): number;
/** Calculate center for given set of points */
export declare function center(pts: Point[], _area?: number): Point;
/** Calculate center and area for given set of points (more efficient than both methods separated */
export declare function centerArea(pts: Point[], signed?: boolean): CenterAreaResult;

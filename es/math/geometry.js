/** Calculate area for given set of points, if two points, calculate length */
export function area(pts, signed = false) {
    let p1, p2;
    switch (pts.length) {
        case 0:
        case 1:
            return 0;
        case 2:
            p1 = pts[0];
            p2 = pts[1];
            const x = p2.x - p1.x, y = p2.y - p1.y;
            return Math.sqrt((x * x) + (y * y));
        default:
            const len = pts.length;
            if (!equals(pts[0], pts[len - 1])) {
                pts = pts.concat([pts[0]]);
            }
            let det = 0, i = 0;
            for (; i < len; i++) {
                p1 = pts[i];
                p2 = pts[i + 1];
                det += p1.x * p2.y - p1.y * p2.x;
            }
            return signed ?
                det / 2 :
                Math.abs(det) / 2;
    }
}
/** Calculate center for given set of points */
export function center(pts, _area) {
    let p1, p2;
    switch (pts.length) {
        case 0:
            return null;
        case 1:
            p1 = pts[0];
            return { x: p1.x, y: p1.y };
        case 2:
            p1 = pts[0];
            p2 = pts[1];
            return {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };
        default:
            const len = pts.length, pArea = (_area || area(pts, true)) * 6;
            if (!equals(pts[0], pts[len - 1])) {
                pts = pts.concat([pts[0]]);
            }
            let x = 0, y = 0, i = 0, det;
            for (; i < len; i++) {
                p1 = pts[i];
                p2 = pts[i + 1];
                det = p1.x * p2.y - p2.x * p1.y;
                x += (p1.x + p2.x) * det;
                y += (p1.y + p2.y) * det;
            }
            return {
                x: x / pArea,
                y: y / pArea
            };
    }
}
/** Calculate center and area for given set of points (more efficient than both methods separated */
export function centerArea(pts, signed = false) {
    let p1, p2, x, y;
    switch (pts.length) {
        case 0:
            return null;
        case 1:
            p1 = pts[0];
            return { x: p1.x, y: p1.y, a: 0 };
        case 2:
            p1 = pts[0];
            p2 = pts[1];
            x = p2.x - p1.x;
            y = p2.y - p1.y;
            return {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2,
                a: Math.sqrt((x * x) + (y * y))
            };
        default:
            const len = pts.length;
            if (!equals(pts[0], pts[len - 1])) {
                pts = pts.concat([pts[0]]);
            }
            let area = 0, i = 0, det;
            for (x = y = 0; i < len; i++) {
                p1 = pts[i];
                p2 = pts[i + 1];
                det = p1.x * p2.y - p2.x * p1.y;
                x += (p1.x + p2.x) * det;
                y += (p1.y + p2.y) * det;
                area += det;
            }
            area /= 2;
            det = area * 6;
            return {
                x: x / det,
                y: y / det,
                a: signed ?
                    area :
                    Math.abs(area)
            };
    }
}
function equals(pt1, pt2) {
    return pt1.x === pt2.x && pt1.y === pt2.y;
}

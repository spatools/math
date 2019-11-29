(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /** Calculate area for given set of points, if two points, calculate length */
    function area(pts, signed) {
        if (signed === void 0) { signed = false; }
        var p1, p2;
        switch (pts.length) {
            case 0:
            case 1:
                return 0;
            case 2:
                p1 = pts[0];
                p2 = pts[1];
                var x = p2.x - p1.x, y = p2.y - p1.y;
                return Math.sqrt((x * x) + (y * y));
            default:
                var len = pts.length;
                if (!equals(pts[0], pts[len - 1])) {
                    pts = pts.concat([pts[0]]);
                }
                var det = 0, i = 0;
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
    exports.area = area;
    /** Calculate center for given set of points */
    function center(pts, _area) {
        var p1, p2;
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
                var len = pts.length, pArea = (_area || area(pts, true)) * 6;
                if (!equals(pts[0], pts[len - 1])) {
                    pts = pts.concat([pts[0]]);
                }
                var x = 0, y = 0, i = 0, det = void 0;
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
    exports.center = center;
    /** Calculate center and area for given set of points (more efficient than both methods separated */
    function centerArea(pts, signed) {
        if (signed === void 0) { signed = false; }
        var p1, p2, x, y;
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
                var len = pts.length;
                if (!equals(pts[0], pts[len - 1])) {
                    pts = pts.concat([pts[0]]);
                }
                var area_1 = 0, i = 0, det = void 0;
                for (x = y = 0; i < len; i++) {
                    p1 = pts[i];
                    p2 = pts[i + 1];
                    det = p1.x * p2.y - p2.x * p1.y;
                    x += (p1.x + p2.x) * det;
                    y += (p1.y + p2.y) * det;
                    area_1 += det;
                }
                area_1 /= 2;
                det = area_1 * 6;
                return {
                    x: x / det,
                    y: y / det,
                    a: signed ?
                        area_1 :
                        Math.abs(area_1)
                };
        }
    }
    exports.centerArea = centerArea;
    function equals(pt1, pt2) {
        return pt1.x === pt2.x && pt1.y === pt2.y;
    }
});

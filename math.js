(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./math/geometry", "./math/matrix"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _geometry = require("./math/geometry");
    var _matrix = require("./math/matrix");
    exports.geometry = _geometry;
    exports.matrix = _matrix;
});

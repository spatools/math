(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./vector2", "./vector3", "./matrix3", "./matrix4"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var vector2 = require("./vector2");
    var vector3 = require("./vector3");
    var matrix3 = require("./matrix3");
    var matrix4 = require("./matrix4");
    exports.V2 = vector2;
    exports.V3 = vector3;
    exports.M3 = matrix3;
    exports.M4 = matrix4;
});

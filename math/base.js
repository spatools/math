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
    exports.ArrayType = Array;
    exports.arrayTypes = { simple: Array };
    exports.engine = "css";
    exports.engines = { css: "css", webgl: "webgl", tree: "treejs" }; // future implementation
    var win = window;
    if ("Float32Array" in win) {
        exports.ArrayType = Float32Array;
        exports.arrayTypes.float32 = Float32Array;
    }
    if ("Float64Array" in win) {
        exports.arrayTypes.float64 = Float64Array;
    }
    if ("WebGLFloatArray" in win) {
        exports.arrayTypes.webgl = win.WebGLFloatArray;
    }
});

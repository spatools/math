define(["require", "exports"], function(require, exports) {
    exports.ArrayType = Array;
    exports.arrayTypes = { simple: Array };

    exports.engine = "css";
    exports.engines = { css: "css", webgl: "webgl", tree: "treejs" };

    if ("Float32Array" in window) {
        exports.ArrayType = Float32Array;
        exports.arrayTypes.float32 = Float32Array;
    }

    if ("Float64Array" in window) {
        exports.arrayTypes.float64 = Float64Array;
    }

    if ("WebGLFloatArray" in window) {
        exports.arrayTypes.webgl = window.WebGLFloatArray;
    }
});

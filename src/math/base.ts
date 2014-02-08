/// <reference path="../math.d.ts" />

export var ArrayType: any = Array;
export var arrayTypes: any = { simple: Array };

export var engine = "css";
export var engines = { css: "css", webgl: "webgl", tree: "treejs" }; //future implementation

if ("Float32Array" in window) {
    ArrayType = Float32Array;
    arrayTypes.float32 = Float32Array;
}

if ("Float64Array" in window) {
    arrayTypes.float64 = Float64Array;
}

if ("WebGLFloatArray" in window) {
    arrayTypes.webgl = window.WebGLFloatArray;
}

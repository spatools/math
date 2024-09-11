export let ArrayType = Array;
export const arrayTypes = { simple: Array };
export let engine = "css";
export const engines = { css: "css", webgl: "webgl", tree: "treejs" }; // future implementation
const win = window;
if ("Float32Array" in win) {
    ArrayType = Float32Array;
    arrayTypes.float32 = Float32Array;
}
if ("Float64Array" in win) {
    arrayTypes.float64 = Float64Array;
}
if ("WebGLFloatArray" in win) {
    arrayTypes.webgl = win.WebGLFloatArray;
}

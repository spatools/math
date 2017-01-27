export interface ArrayTypes {
    simple: typeof Array;
    float32?: typeof Float32Array;
    float64?: typeof Float64Array;
    webgl?: typeof Float32Array;
}

export let ArrayType: any = Array;
export const arrayTypes = { simple: Array } as ArrayTypes;

export let engine = "css";
export const engines = { css: "css", webgl: "webgl", tree: "treejs" }; // future implementation

const win = window as any;

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

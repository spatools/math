export interface ArrayTypes {
    simple: typeof Array;
    float32?: typeof Float32Array;
    float64?: typeof Float64Array;
    webgl?: typeof Float32Array;
}
export declare let ArrayType: any;
export declare const arrayTypes: ArrayTypes;
export declare let engine: string;
export declare const engines: {
    css: string;
    webgl: string;
    tree: string;
};

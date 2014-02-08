interface Point {
    x: number;
    y: number;
}

interface CenterAreaResult extends Point {
    a: number;
}

interface WebGLFloatArray extends Float32Array { }

interface BoundingBox {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

interface Window {
    WebGLFloatArray: WebGLFloatArray;
}

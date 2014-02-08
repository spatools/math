define(["require", "exports", "./vector2", "./vector3", "./matrix3", "./matrix4"], function(require, exports, vector2, vector3, matrix3, matrix4) {
    var result = {
        V2: vector2,
        V3: vector3,
        M3: matrix3,
        M4: matrix4
    };

    
    return result;
});

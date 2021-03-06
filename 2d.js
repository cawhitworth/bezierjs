var Point = function(x,y) {
    var x = Number(x);
    var y = Number(y);

    var scaleBy = function(dimensions) {
        return Point(x * dimensions.w, y * dimensions.h);
    };

    var translateBy = function(point) {
        return Point(x + point.x, y + point.y);
    };

    return {
        x: x,
        y: y,
        scaleBy: scaleBy,
        translateBy: translateBy
    };
};

var Dimension = function(w,h) {
    var _w = Number(w);
    var _h = Number(h);

    return {
        w: _w,
        h: _h
    };
};

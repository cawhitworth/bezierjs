var curve = function(ctx) {

    var resolution = 100;

    var drawScaledCurve = function(bezier_function, origin, scale) {
        ctx.beginPath();
        var start = bezier_function(0).translateBy(origin);
        ctx.moveTo(start.x, start.y);

        for(t = 1; t <= resolution; t += 1)
        {
            var pt = bezier_function(t / resolution)
                .scaleBy(scale)
                .translateBy(origin);
            ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke();
    };

    var drawCurve = function(bezier_function, origin) {
        origin = origin || Point(0,0);
        drawScaledCurve(bezier_function, origin, Dimension(1,1));
    };

    var drawScaledPoints = function(points, origin, scale) {
        ctx.beginPath();
        var start = points[0].translateBy(origin);
        ctx.moveTo(start.x, start.y);

        for(t = 1; t < points.length; t += 1)
        {
            var pt = points[t]
                .scaleBy(scale)
                .translateBy(origin);
            ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke();
    };

    return {
        drawCurve: drawCurve,
        drawScaledCurve: drawScaledCurve,
        drawScaledPoints: drawScaledPoints
    };
};

var curve = function(ctx) {

    var drawCurve = function(bezier_function, origin) {
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);

        // If we go from 0 to 1 in 1/steps increments, we run into FP rounding
        // errors; this ensures we always get a complete curve
        var steps = 100;
        for(t = 0; t <= steps; t += 1)
        {
            var pt = bezier_function(t / steps);
            ctx.lineTo(pt.x, pt.y);
        }
        console.log("Woo");
        ctx.stroke();
    }

    return { drawCurve: drawCurve };
};

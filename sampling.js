var sampling = (function() {

    var nearest_neighbour = function(resolution, data) {
        // Sampling?
        var idx = 0, success = 0, fail = 0, cont = 0, deltaAcc = 0.0;
        var THRESHOLD = 1 / (2*resolution);
        var sampledData = [];
        for(x = 0; x <= resolution; x++) {
            var xx = x / resolution;

            var p = undefined;
            do {
                var delta = data[idx].x - xx;

                if (Math.abs(delta) < THRESHOLD) {
                    success ++; deltaAcc += Math.abs(delta);
                    p = Point(xx, data[idx].y);
                    break;
                }

                if(delta >= 0) {
                    fail ++; deltaAcc += Math.abs(delta);
                    p = Point(xx, data[idx].y);
                    break;
                }
                cont++;
                idx++;
            } while (idx < resolution);

            if (p === undefined) {
                p = Point(xx, data[resolution].y);
            }

            sampledData.push(p);

        }
        return {
            sampledData: sampledData,
            success: success,
            fail: fail,
            cont: cont,
            deltaAcc: deltaAcc
        };
    }

    var interpolated = function(resolution, data) {
        var idx = 0;
        var sampledData = [];
        for(x = 0; x <= resolution; x++)
        {
            var xx = x/resolution;
            do {
                var p1 = data[idx];
                var p2 = data[idx+1];

                if(p1.x <= xx &&
                   p2.x >= xx)
                {
                    var d = p2.x - p1.x;
                    var dp1 = (xx-p1.x) / d;

                    var y = bezier.lerp( data[idx].y, data[idx+1].y, dp1 );
                    sampledData.push( Point(xx, y) );
                    break;
                }
                idx ++;
            } while (idx <= resolution)
        }

        return { sampledData : sampledData };
    }

    return {
        nearest_neighbour : nearest_neighbour,
        interpolated: interpolated
    };

})();

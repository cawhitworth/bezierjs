var sampling = (function() {

    var nearest_neighbour = function(resolution, data) {
        // Sampling?
        var idx = 0, success = 0, fail = 0, cont = 0, deltaAcc = 0.0;
        var THRESHOLD = 1 / (2*resolution);
        var found = [];
        var sampledData = [];
        for(x = 0; x <= resolution; x++) {
            var xx = x / resolution;

            do {
                var delta = data[idx].x - xx;

                if (Math.abs(delta) < THRESHOLD) {
                    success ++; deltaAcc += Math.abs(delta);
                    sampledData.push(Point(xx, data[idx].y));
                    break;
                }

                if(delta > 0) {
                    fail ++; deltaAcc += Math.abs(delta);
                    sampledData.push(Point(xx, data[idx].y));
                    break;
                }
                cont++;
                idx++;
            } while (idx < resolution);
        }
        return {
            sampledData: sampledData,
            success: success,
            fail: fail,
            cont: cont,
            deltaAcc: deltaAcc
        };
    }

    return {nearest_neighbour : nearest_neighbour};

})();

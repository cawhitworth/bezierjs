var sampling = (function() {

    var sample = function(resolution, data) {
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
                    found.push( [ data[idx].x, xx, "Yes"] );
                    sampledData.push( { x: xx, y: data[idx].y } );
                    break;
                }

                if(delta > 0) {
                    fail ++; deltaAcc += Math.abs(delta);
                    found.push( [ data[idx].x, xx, "No"] );
                    sampledData.push( { x: xx, y: data[idx].y } );
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

    return {sample : sample};

})();

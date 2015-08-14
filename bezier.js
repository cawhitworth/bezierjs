var bezier = (function() {

    // Linearly interpolate between a and b
    var lerp = function(a, b, t) {
          return a + t * (b - a);
    }

    // Linearly interpolate between two points

    var lerpPt = function(p0, p1, t) {
        return Point(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
    }

    // first-order - literally just lerping between two points

    var firstOrder = function(p0, p1) {
        return function(t) {
            return lerpPt(p0, p1, t);
        }
    }

    // second order - lerp between two first-order functions

    var secondOrder = function(p0, p1, p2) {
        var f1 = firstOrder(p0, p1);
        var f2 = firstOrder(p1, p2);
        return function(t) {
            var pf1 = f1(t);
            var pf2 = f2(t);
            return lerpPt(pf1, pf2, t);
        }
    }

    // third order - lerp between two second-order functions

    var thirdOrder = function(p0, p1, p2, p3) {
          var f1 = secondOrder(p0, p1, p2);
          var f2 = secondOrder(p1, p2, p3);
          return function(t) {
              var pf1 = f1(t);
              var pf2 = f2(t);
              return lerpPt(pf1, pf2, t);
          }
    }

    return { firstOrder: firstOrder,
             secondOrder: secondOrder,
             thirdOrder: thirdOrder };
})();

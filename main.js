var draw = function() {
    var canvas = $("#screen")[0];
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var renderer = curve(ctx);

    var p0 = Point($("#p0x").val(), $("#p0y").val());
    var p1 = Point($("#p1x").val(), $("#p1y").val());
    var p2 = Point($("#p2x").val(), $("#p2y").val());
    var p3 = Point($("#p3x").val(), $("#p3y").val());

    var f = bezier.thirdOrder(p0, p1, p2, p3);
    var points = [];

    var resolution = Number($("#resolution").val());

    for(t = 0; t <= resolution; t++) {
        points.push(f(t / resolution));
    };

    ctx.strokeStyle = '#ff0000';

    var scale = Dimension(400, 200);
    renderer.drawScaledPoints(points, Point(100, 200), scale );

    var result = sampling.nearest_neighbour(resolution, points);
    ctx.strokeStyle = '#00ff00';
    renderer.drawScaledPoints(result.sampledData, Point(100, 200), scale);

    var result = sampling.interpolated(resolution, points);
    ctx.strokeStyle = '#0000ff';
    renderer.drawScaledPoints(result.sampledData, Point(100, 200), scale);
};

$(function() {
    $(".coord").attr("step", "0.05");
    $(".coord").on("change", draw);
    $("#resolution").on("change", draw);
    draw();
    $("#redraw").click(draw);
});

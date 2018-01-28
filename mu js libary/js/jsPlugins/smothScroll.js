function scroll(y, duration) {
    var initialY =
        document.documentElement.scrollTop || document.body.scrollTop;
    var baseY = (initialY + y) * 0.5;
    var difference = initialY - baseY;
    var startTime = performance.now();

    function step() {
        var normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo(
            0,
            baseY + difference * Math.cos(normalizedTime * Math.PI)
        );
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

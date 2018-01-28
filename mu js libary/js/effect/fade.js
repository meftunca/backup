var fade = function (el) {
    this.out = function (delay) {
        if (!delay) {
            delay = 400;
        }
        var h;
        if (!window.getComputedStyle(el).opacity) {
            h = 1;
        } else {
            h = window.getComputedStyle(el).opacity;
        }

        var effect = setInterval(function () {
            if (h < 0.1) {
                el.style.opacity = 0;
                window.clearInterval(effect);
            } else {
                h -= 0.1;
                el.style.opacity = h;
            }
        }, delay / 7);

        return this;
    };
    this.in = function (delay) {
        if (!delay) {
            delay = 400;
        }
        var h = 0;
        el.style.opacity = 0;
        var effect = setInterval(function () {
            h += 0.1;
            if (h > 1) {
                window.clearInterval(effect)
            } else {
                el.style.opacity = h;
            }
        }, delay / 7);
        return this;
    };
    this.toggle = function (delay) {
        if (window.getComputedStyle(el).opacity > 0) {
            this.out(delay);
        } else {
            this.in(delay);
        }
        return this;
    };
    return this;
};
var slide = (el) => {
    this.setup = function (delay, event) {
        window.clearInterval();
        var hg = el.offsetHeight;
        return el.style.cssText =
            "display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
    };
    this.effect = true;
    this.up = function (delay) {
        if (!delay) {
            delay = 200;
        }
        this.setup(delay);
        var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
        var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
        var pad = padT + padB;
        var hg = el.offsetHeight - pad;
        var s = el.style;
        el.setAttribute("data-slide", "up");
        var effect = setInterval(function () {
            hg -= parseFloat(hg / delay) * 3;
            s.height = hg + "px";
            if (hg < 100) {
                hg -= (hg / delay) * 8;
            }
            if (hg <= pad) {
                s.paddingTop = 0;
                s.paddingBottom = 0;
                s.color = "transparent";
            }
            if (hg < 2) {
                s.height = 0;
                window.clearInterval(effect);
                setTimeout(function () {
                    s.borderWidth = "0";
                    setTimeout(function () {
                        s.cssText = "";
                        s.display = "none";
                    }, 1)
                }, 1)
            }
        }, "fast");
        return this.down;
    };
    this.down = function (delay) {
        if (!delay) {
            delay = 200;
        }
        this.effect = false;
        this.setup(delay);
        var padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
        var padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
        var hg = Number(window.getComputedStyle(el).height.replace("px", "")),
            h = 0;
        var pad = padT + padB;
        var s = el.style;
        s.height = 0;
        s.paddingTop = 0;
        s.paddingBottom = 0;
        s.color = "transparent";
        el.setAttribute("data-slide", "down");

        var effect = setInterval(function () {
            h += parseFloat(hg / delay) * 3;
            s.height = h + "px";
            if (h > pad) {
                s.color = "";
                s.paddingTop = "";
                s.paddingBottom = "";
            }
            if (h >= hg) {
                window.clearInterval(effect);
                setTimeout(function () {
                    s.cssText = "";
                    s.display = "block";
                }, 1)
            }
        }, "fast")
        return this.up;

    };
    this.toggle = function (delay) {
        this.setup(delay);
        if (el.getAttribute("data-slide") == "up" || el.hasAttribute("data-slide") == false || el.offsetHeight < 1) {
            this.down(delay);
        } else if (el.getAttribute("data-slide") == "down") {
            this.up(delay);
        }
        return this;
    };
    return this;
};
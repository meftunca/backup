let slide = (el) => {
    this.setup = function (delay, event) {
        window.clearInterval();
        let hg = el.offsetHeight;
        return el.style.cssText =
            "display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
    };
    this.effect = true;
    this.up = (delay) => {
        if (!delay) {
            delay = 200;
        }
        this.setup(delay);
        let computed = window.getComputedStyle(el),
            padT = Number(computed.paddingBottom.replace("px", "")),
            padB = Number(computed.paddingTop.replace("px", "")),
            pad = padT + padB,
            hg = el.offsetHeight - pad,
            s = el.style;
        el.setAttribute("data-slide", "up");
        let effect = setInterval (() => {
            hg -= parseFloat (hg / delay) * 3;
            s.height = hg + "px";
            if (hg < 50) {
                hg -= parseFloat (hg / delay) * 5;
            }
            if (hg <= pad) {
                s.paddingTop = 0;
                s.paddingBottom = 0;
                s.color = "transparent";
            }
            if (hg < 2) {
                s.height = 0;
                window.clearInterval (effect);
                setTimeout (() => {
                    s.borderWidth = "0";
                    setTimeout (() => {
                        s.cssText = "overflow:hidden";
                        s.display = "none";
                    }, delay)
                }, delay)
            }
        }, 1);
        return this.down;
    };
    this.down = (delay) => {
        if (!delay) {
            delay = 200;
        }
        this.effect = false;
        this.setup(delay);
        let computed = window.getComputedStyle(el),
            padT = Number(computed.paddingBottom.replace("px", "")),
            padB = Number(computed.paddingTop.replace("px", "")),
            hg = Number(computed.height.replace("px", "")),
            h = 0,
            pad = padT + padB,
            s = el.style;
        s.height = 0;
        s.paddingTop = 0;
        s.paddingBottom = 0;
        s.color = "transparent";
        el.setAttribute("data-slide", "down");

        let effect = setInterval (() => {
            h += parseFloat (hg / delay) * 2;
            s.height = h + "px";
            if (h > pad) {
                s.color = "";
                s.paddingTop = "";
                s.paddingBottom = "";
            }
            if (h >= hg) {
                window.clearInterval (effect);
                setTimeout (() => {
                    s.cssText = "overflow:hidden";
                    s.display = "block";
                }, delay)
            }
        }, 0);
        return this.up;

    };
    this.toggle = (delay) => {
        if (el.getAttribute("data-slide") === "up" || el.hasAttribute("data-slide") === false || el.offsetHeight < 1) {
            this.down(delay);
        } else if (el.getAttribute("data-slide") === "down") {
            this.up(delay);
        }
      return this;
    };
    return this;
};
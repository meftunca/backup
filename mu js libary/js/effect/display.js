var view = function (el) {
    this.hide = function (delay) {
        if (!delay) {
            el.style.display = "none";
        } else {
            var effect = setTimeout(function () {
                el.style.display = "none";
            }, delay);
            clearTimeout(effect)
        }
        return this;
    };
    this.show = function (delay) {
        if (!delay) {
            el.style.display = "block";
        } else {
            var effect = setTimeout(function () {
                el.style.display = "block";
            }, delay)
            clearTimeout(effect)
        }
        return this;
    };
    this.toggle = function (delay) {
        if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
            this.show(delay);
        } else {
            this.hide(delay);
        }
        return this;
    };
    return this;
};
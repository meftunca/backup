(function () {
    var range = document.querySelectorAll("input[type=range]");
    Array.prototype.forEach.call(range, function (el, i) {
        var overlay_cr = document.createElement("aside"),
            ovs = overlay_cr.style;
        overlay_cr.classList.add("range-overlay");
        el.parentNode.appendChild(overlay_cr);
        var change_range = function () {
            var el_v = el.value,
                value_item = el.parentNode.querySelector(".range-value");
            function rangeOffset() {
                var width = el.offsetWidth - 15;
                var max = parseFloat(el.max);
                var min = parseFloat(el.min);
                var val = parseFloat(el.value);
                var percent = (parseFloat(el.value) - min) / (max - min);
                return (percent * width);
            }
            ovs.width = rangeOffset() + "px";

            value_item.innerHTML = el_v;
            value_item.style.left = rangeOffset() + "px";
        };
        change_range();
        el.addEventListener("click touch", change_range, false);
        el.addEventListener("change", change_range, false);
        //mouse
        el.addEventListener("mouseenter", change_range, false);
        el.addEventListener("mousemove", change_range, false);
        el.addEventListener("mousedown", change_range, false);
        el.addEventListener("mouseover", change_range, false);
        el.addEventListener("mouseout", change_range, false);

        //touch
        el.addEventListener("touchstart", change_range, false);
        el.addEventListener("touchend", change_range, false);
        el.addEventListener("touchcancel", change_range, false);
        el.addEventListener("touchmove", change_range, false);
    }
    );
})();
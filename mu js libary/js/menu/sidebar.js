let sidebar = (item, parameter) => {
    this.item = item !== undefined
        ? document.querySelectorAll (".sidebar-toggle" + item)
        : document.querySelectorAll (".sidebar-toggle");
    this.parameter = parameter !== undefined ? parameter : null;
    let autoclose = this.parameter !== null ? this.parameter.autoclose : true,
        position = this.parameter !== null ? this.parameter.position : "left",
        overlay = this.parameter !== null ? this.parameter.overlay : "overlay",
        isClickInside,
        run = (position) => {
        Array.prototype.forEach.call (this.item, function (el) {
            let id = el.getAttribute ("data-href"),
                content = document.querySelector(".sidebar[data-id=" + id + "]");
            el.addEventListener ("click", (e) => {
                e.preventDefault();
                content.classList.toggle ("show");
                document.body.classList.toggle("overlay")
            });
            if (autoclose !== undefined && autoclose === "true" || autoclose === true) {
                window.addEventListener ("click", function (e) {
                    e.preventDefault();
                     isClickInside = el.contains (e.target) || content.contains (e.target);
                    if (!isClickInside) {
                        if (content.classList.contains ("show")) {
                            document.body.classList.remove("overlay");
                            content.classList.remove ("show");
                        }
                    }
                });
            }
        });
    };
    run (position);
};
sidebar ();
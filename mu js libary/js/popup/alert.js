
let alert = document.querySelectorAll(".alert-toggle");
Array.prototype.forEach.call(alert, function (el) {
    let id = el.getAttribute("data-href"),
        content = document.querySelector(".alert[data-id=" + id + "]"),
        closeItem = document.querySelector(".alert-close"),
        position = el.getAttribute("alert-position");
    position = position.split("-").map(String);
    let posX = position[1],
        posY = position[0],
        s = content.style,
        hg, wd,closeTimer=2000,
        Wwd = window.innerWidth,
        Whg = window.innerHeight;
    s.position = "absolute";
    let alertY = (pos) => {
            if (pos === "top") {
                s.top = 20 + "px";
            } else if (pos === "center") {
                s.top = Whg / 2 - hg + "px";
            } else if (pos === "bottom") {
                s.top = Whg - 80 + "px";
            }
        },
        alertX = (pos) => {
            if (pos === "left") {
                s.left = 20 + "px";
            } else if (pos === "center") {
                s.left = Wwd / 2 - wd / 2 + "px";
            } else if (pos === "right") {
                s.right = 20 + "px";
            }
        },close = ()=>{
                let s = content.style,
                    o = 10;
                s.transtion = "all 0.4s ease-in-out";
                let effect = setInterval(() => {
                    o -= 1;
                    s.opacity = o / 10;
                    if (o === 0) {
                        window.clearInterval(effect);
                        content.classList.remove("active");
                        s.display = "none";
                    }
                }, 40);
        },run =  () => {
            content.classList.add("active");
            hg = content.offsetHeight;
            alertY(posY);
            wd = content.offsetWidth;
            alertX(posX);
            let timeOut = setTimeout(()=>{
                content.classList.remove("active");
            },closeTimer);
        };
    el.addEventListener("click", run, false);
    closeItem.addEventListener("click",close, false);
});

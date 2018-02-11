let lightbox = document.querySelectorAll(".lightbox-link:not([disabled])");
Array.prototype.forEach.call(lightbox, function (el) {
    let url = el.getAttribute("data-href"),
        type = el.getAttribute("data-type"),
        lightbox = document.querySelector(".lightbox");
    content = document.querySelector(".lightbox-content");
    el.addEventListener("click", function () {
        lightbox.classList.add("show");
        let item = type === "image" ? "img" : "iframe";
        let create_item = document.createElement(item);
        create_item.src = url;
        create_item.classList.add("lightbox-item");
        document.querySelector(".lightbox-content").innerHTML = "";
        document.querySelector(".lightbox-content").appendChild(create_item);
        let close = document.querySelector(".lightbox-close");
        let duration = Number(window.getComputedStyle(close)["transitionDuration"].replace("s", "") * 1000);
        close.addEventListener("click", function () {
            lightbox.classList.remove("show");
            lightbox.classList.add("out");
            setTimeout(function () {
                lightbox.classList.remove("out");
            }, duration);
            create_item.remove();
        });
    });

});
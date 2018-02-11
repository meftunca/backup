let navbarCollapse = document.querySelectorAll(".collapse-toggle[data-collapse=navbar]");
Array.prototype.forEach.call(navbarCollapse, function (el) {
    let id = el.getAttribute("data-href");
    let menu = el.closest(".navbar").querySelector(".navbar-collapse[data-id=" + id + "]");
    el.onclick = function () {
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
            slide(menu).up(300);
        } else {
            menu.classList.add("show");
            slide(menu).down(300);
        }
    }
});
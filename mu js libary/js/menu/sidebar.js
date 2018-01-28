var sidebar = document.querySelectorAll(".sidebar-toggle");
Array.prototype.forEach.call(sidebar, function (el) {
    var id = el.getAttribute("data-href"),
     content = document.querySelector(".sidebar[data-id=" + id + "]"),
     autoClose = content.getAttribute("data-auto-close") ;
    el.onclick = function () {
        content.classList.toggle("show");
    }
    if(autoClose !== undefined && autoClose === "true"){
        document.addEventListener("click", function (event) {
            var isClickInside = el.contains(event.target) || content.contains(event.target);
            if (!isClickInside) {
                if (content.classList.contains("show")) {
                    content.classList.remove("show");
                }
            }
        });
    }

});
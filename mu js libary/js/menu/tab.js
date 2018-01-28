var tabs = document.querySelectorAll(".tab-group");
Array.prototype.forEach.call(tabs, function (el) {
    var tab = el.querySelector(".tab"), content = el.querySelector(".content-group");
    tab.querySelector(".tab-item:first-of-type").classList.add("active");
    content.querySelector(".tab-content:first-of-type").classList.add("active");
    let clears=(par)=>{
            document.querySelector(".tab-item[data-href=" + par + "]").classList.remove("active");
            document.querySelector(".tab-content[data-id=" + par + "]").classList.remove("active");
    }
    let item = el.querySelectorAll(".tab > .tab-item");
    Array.prototype.forEach.call(item, function (el) {
        el.addEventListener("click", function (e) {
            let id = el.getAttribute("data-href"),lostId;
            if (el.classList.contains("active")) {
                lostId = el.getAttribute("data-href");
                clears(lostId);
            }
            
             document.querySelector(".tab-item[data-href=" + id + "]").classList.add("active");
            document.querySelector(".tab-content[data-id=" + id + "]").classList.add("active");

        }, false);
    });

});
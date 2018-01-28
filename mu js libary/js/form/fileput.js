var fileput = document.getElementsByClassName("fileput");
Array.prototype.forEach.call(fileput, function (el) {
    let text = el.getElementsByClassName("fileput-text")[0],
        btn = el.getElementsByClassName("fileput-btn")[0],
        list = el.getElementsByClassName("fileput-list")[0],
        input = el.querySelector("input[type=file]"),
        arr = [],
        vals;
    btn.onclick = function (e) {
        input.click();
        arr = [];


    }
    input.onchange = function (e) {
        list.querySelector("ul").innerHTML = "";
        vals = input.value;
        json = input.files;
        for (let i of json) {
            arr.push(i);
        }
        for (let i of arr) {
            var li = document.createElement("li");
            li.className = "item";
            li.innerHTML = i.name;
            list.querySelector("ul").append(li);
        }
        slide(list).down(100);
    }
});
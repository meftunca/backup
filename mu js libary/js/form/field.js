let fieldList = document.querySelectorAll(".field");
Array.prototype.forEach.call(fieldList, function (package) {
    let queryLabel = package.querySelector("label"),
        queryInput = package.querySelector("input");
    if (queryLabel !== undefined && queryInput !== undefined) {
        let fieldMainFunc = () => {
            let id = queryInput.id,
                For = queryLabel.getAttribute("for"),
                lenQuery = 0;
            queryInput.addEventListener("focus", function (e) {
                queryLabel.classList.add("show");
            });
            queryInput.addEventListener("focusout", function (e) {
                lenQuery = queryInput.value.length;
                if(lenQuery === 0){
                    queryLabel.classList.remove("show");
                }
            });
        };
        //runner event for fieldMainFunc
        return fieldMainFunc();

    } else {
        return false;
    }
});
var dropdown = document.querySelectorAll(".dropdown .dropdown-toggle");
Array.prototype.forEach.call(
    dropdown,
    function (el) {
        let menu = el.parentNode.querySelector(".dropdown-menu"),
            classL = menu.classList,
            menuHeight = 200,menuWidth = 200;

        el.addEventListener("click", function () {
            let bodyRect = document.body.getBoundingClientRect(),
                elRect = this.getBoundingClientRect(),
                topQuery = () => {
                    let topQuery = elRect.top - menuHeight;
                    if (topQuery <= 0) {
                        if(classL.contains("dropup"))
                           { classL.remove("dropup");}
                        menu.style.cssText ="position:absolute;transform:translateY("+0+"px);";
                    } else {
                        if(!classL.contains("dropup"))
                        { classL.add("dropup");}
                        menu.style.cssText ="position:absolute;transform:translateY(-"+(0)+"px);";
                    }

                },
                leftQuery = () => {
                    let leftQuery = elRect.left - menuWidth;
                    console.log(leftQuery);
                    if (leftQuery <= 0) {
                        if(!classL.contains("dropright"))
                           { classL.remove("dropright");}
                           console.log("object");
                        menu.style.cssText ="position:absolute;transform:translatex("+0+"px);";
                    } else {
                        if(!classL.contains("dropleft"))
                        { classL.add("dropleft");}
                        menu.style.cssText ="position:absolute;transform:translatex(-"+(0)+"px);";
                    }
                };

            function toggles() {
                if (classL.contains("show")) {
                    classL.add("out");
                    classL.remove("show");
                    setTimeout(function () {
                        classL.remove("out");
                    }, "400");
                } else {
                    classL.add("show");
                    menuHeight = menu.clientHeight;
                    menuWidth = menu.clientWidth;
                    console.log("menu yüksekliği : " + menuHeight,"menu genişliği : " + menuWidth);
                }
            }

            function defaults() {
                toggles();
                topQuery();
                leftQuery();
                window.addEventListener("change", function () {
                    if (classL.contains("show")) {
                        classL.add("out");
                        classL.remove("show");
                        setTimeout(function () {
                            classL.remove("out");
                        }, "380");
                    }
                })
                document.addEventListener("click", function (event) {
                    var isClickInside = el.contains(event.target) || menu.contains(event.target);
                    if (!isClickInside) {
                        if (classL.contains("show")) {
                            classL.add("out");
                            classL.remove("show");
                            setTimeout(function () {
                                classL.remove("out");
                            }, "380");
                        }
                    }
                }, false);
            }

            if (el.getAttribute("data-collapse") === "dropdown") {
                if (window.innerWidth <= 769) {
                    slide(menu).toggle(100);
                } else {
                    defaults();
                }
                window.addEventListener("resize", function () {
                    if (window.innerWidth >= 769) {
                        menu.removeAttribute("style");
                        defaults();
                    }

                });
            } else {
                defaults()
            }


        }, false);
    }
);
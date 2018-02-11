{
    let view = function (el) {
        this.hide = function (delay) {
            if (!delay) {
                el.style.display = "none";
            } else {
                let effect = setTimeout(function () {
                    el.style.display = "none";
                }, delay);
                clearTimeout(effect)
            }
            return this;
        };
        this.show = function (delay) {
            if (!delay) {
                el.style.display = "block";
            } else {
                let effect = setTimeout(function () {
                    el.style.display = "block";
                }, delay)
                clearTimeout(effect)
            }
            return this;
        };
        this.toggle = function (delay) {
            if (window.getComputedStyle(el) === "none" || el.style.display === "none") {
                this.show(delay);
            } else {
                this.hide(delay);
            }
            return this;
        };
        return this;
    };
    let fade = function (el) {
        this.out = function (delay) {
            if (!delay) {
                delay = 400;
            }
            let h;
            if (!window.getComputedStyle(el).opacity) {
                h = 1;
            } else {
                h = window.getComputedStyle(el).opacity;
            }

            let effect = setInterval(function () {
                if (h < 0.1) {
                    el.style.opacity = 0;
                    window.clearInterval(effect);
                } else {
                    h -= 0.1;
                    el.style.opacity = h;
                }
            }, delay / 7);

            return this;
        };
        this.in = function (delay) {
            if (!delay) {
                delay = 400;
            }
            let h = 0;
            el.style.opacity = 0;
            let effect = setInterval(function () {
                h += 0.1;
                if (h > 1) {
                    window.clearInterval(effect)
                } else {
                    el.style.opacity = h;
                }
            }, delay / 7);
            return this;
        };
        this.toggle = function (delay) {
            if (window.getComputedStyle(el).opacity > 0) {
                this.out(delay);
            } else {
                this.in(delay);
            }
            return this;
        };
        return this;
    };
    let slide = (el) => {
        this.setup = function (delay, event) {
            window.clearInterval();
            let hg = el.offsetHeight;
            return el.style.cssText =
                "display:block;overflow:hidden; transition: transform 0.4s cubic-bezier(0, 1, 0.5, 1);";
        };
        this.effect = true;
        this.up = function (delay) {
            if (!delay) {
                delay = 200;
            }
            this.setup(delay);
            let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
            let padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
            let pad = padT + padB;
            let hg = el.offsetHeight - pad;
            let s = el.style;
            el.setAttribute("data-slide", "up");
            let effect = setInterval(function () {
                hg -= parseFloat(hg / delay) * 3;
                s.height = hg + "px";
                if (hg < 100) {
                    hg -= (hg / delay) * 8;
                }
                if (hg <= pad) {
                    s.paddingTop = 0;
                    s.paddingBottom = 0;
                    s.color = "transparent";
                }
                if (hg < 2) {
                    s.height = 0;
                    window.clearInterval(effect);
                    setTimeout(function () {
                        s.borderWidth = "0";
                        setTimeout(function () {
                            s.cssText = "";
                            s.display = "none";
                        }, 1)
                    }, 1)
                }
            }, "fast");
            return this.down;
        };
        this.down = function (delay) {
            if (!delay) {
                delay = 200;
            }
            this.effect = false;
            this.setup(delay);
            let padT = Number(window.getComputedStyle(el).paddingBottom.replace("px", ""));
            let padB = Number(window.getComputedStyle(el).paddingTop.replace("px", ""));
            let hg = Number(window.getComputedStyle(el).height.replace("px", "")),
                h = 0;
            let pad = padT + padB;
            let s = el.style;
            s.height = 0;
            s.paddingTop = 0;
            s.paddingBottom = 0;
            s.color = "transparent";
            el.setAttribute("data-slide", "down");

            let effect = setInterval(function () {
                h += parseFloat(hg / delay) * 3;
                s.height = h + "px";
                if (h > pad) {
                    s.color = "";
                    s.paddingTop = "";
                    s.paddingBottom = "";
                }
                if (h >= hg) {
                    window.clearInterval(effect);
                    setTimeout(function () {
                        s.cssText = "";
                        s.display = "block";
                    }, 1)
                }
            }, "fast")
            return this.up;

        };
        this.toggle = function (delay) {
            this.setup(delay);
            if (el.getAttribute("data-slide") == "up" || el.hasAttribute("data-slide") == false || el.offsetHeight < 1) {
                this.down(delay);
            } else if (el.getAttribute("data-slide") == "down") {
                this.up(delay);
            }
            return this;
        };
        return this;
    };
    let rangeSlider = (function () {
        let range = document.querySelectorAll(".range-group input[type=range]");
        Array.prototype.forEach.call(range, function (el, i) {
            let overlay_cr = document.createElement("aside"),
                ovs = overlay_cr.style;
            overlay_cr.classList.add("range-overlay");
            el.parentNode.appendChild(overlay_cr);
            let change_range = function () {
                let el_v = el.value,
                    value_item = el.parentNode.querySelector(".range-value");
                function rangeOffset() {
                    let width = el.offsetWidth - 15;
                    let max = parseFloat(el.max);
                    let min = parseFloat(el.min);
                    let val = parseFloat(el.value);
                    let percent = (parseFloat(el.value) - min) / (max - min);
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
        });
    })();


    let dropdown = document.querySelectorAll(".dropdown .dropdown-toggle");
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
                        let isClickInside = el.contains(event.target) || menu.contains(event.target);
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
    let collapse = document.querySelectorAll(".collapse-toggle[data-collapse]");
    Array.prototype.forEach.call(collapse, function (el, i) {
        let item_id = el.getAttribute("data-href");
        let menu = document.querySelector("[data-id='" + item_id + "']");
        el.onclick = function () {
            slide(menu).toggle()
        }
    });

    let accordion = document.querySelectorAll(".accordion-menu a.toggle");
    Array.prototype.forEach.call(accordion, function (el, i) {
        el.onclick = function () {
            let parent = el.parentNode.parentNode;
            if (parent.querySelector(".accordion.show") && !el.classList.contains("show")) {
                slide(parent.querySelector(".accordion.show")).up(150);
                parent.querySelector(".accordion.show").classList.remove("show");
                parent.querySelector(".toggle.show").classList.remove("show");

                setTimeout(() => {
                    el.classList.toggle("show");
                    let menu = el.parentNode.querySelector(".accordion");
                    menu.classList.toggle("show");
                    slide(menu).toggle(150);
                }, 50);
            } else {
                el.classList.toggle("show");
                let menu = el.parentNode.querySelector(".accordion");
                menu.classList.toggle("show");
                slide(menu).toggle(150);
            }
        }
    });

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
    let modal = document.querySelectorAll(".modal-toggle");
    Array.prototype.forEach.call(modal, function (el) {
        let toggleName = el.getAttribute("data-toggle");
        let modal_body = document.body.querySelector(".modal[data-type=" + toggleName + "]");
        let modal_content = modal_body.querySelector(".modal-content");
        el.onclick = function (event) {
            modal_body.classList.add("show");
            modal_content.classList.add("in");
            let close = modal_content.querySelectorAll(".close");
            for (i in close) {
                close[i].onclick = function (event) {
                    modal_content.classList.add("out");
                    modal_content.classList.remove("in");
                    let effect = setTimeout(function () {
                        modal_body.classList.remove("show");
                        modal_content.classList.remove("out");
                    }, 490)
                }
            }
        };
        document.addEventListener("click", function (event) {
            let isClickInside = el.contains(event.target) || modal_content.contains(event.target);
            if (!isClickInside) {
                if (modal_body.classList.contains("show")) {
                    modal_content.classList.add("out");
                    modal_content.classList.remove("in");
                    setTimeout(function () {
                        modal_body.classList.remove("show");
                        modal_content.classList.remove("out");
                    }, 490);
                }
            }
        });
        window.addEventListener("change", function () {
            let clone_mdl = document.body.querySelectorAll(".modal");
            Array.prototype.forEach.call(clone_mdl, function (el) {
                let cln = el.cloneNode(true);
                el.outerHTML = "";
                document.body.appendChild(cln);
            });
        });
    });
    let lightbox = document.querySelectorAll(".lightbox-link");
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
    let sidebar = document.querySelectorAll(".sidebar-toggle");
    Array.prototype.forEach.call(sidebar, function (el) {
        let id = el.getAttribute("data-href"),
         content = document.querySelector(".sidebar[data-id=" + id + "]"),
         autoClose = content.getAttribute("data-auto-close") ;
        el.onclick = function () {
            content.classList.toggle("show");
        }
        if(autoClose !== undefined && autoClose === "true"){
            document.addEventListener("click", function (event) {
                let isClickInside = el.contains(event.target) || content.contains(event.target);
                if (!isClickInside) {
                    if (content.classList.contains("show")) {
                        content.classList.remove("show");
                    }
                }
            });
        }

    });
    let selectbox = document.querySelectorAll(".dropdown-toggle[data-toggle=selectbox]");
    Array.prototype.forEach.call(selectbox, function (el) {
        let parent = el.parentNode,
            menu = el.parentNode.querySelector(".dropdown-menu[data-type=selectbox]"),
            name = menu.getAttribute("input-name"),
            val = menu.getAttribute("input-value");
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = val;
        parent.parentNode.appendChild(input);
        let select_item = menu.querySelectorAll("[select-value]");
        for (i in select_item) {
            select_item[i].onclick = function () {
                val = this.getAttribute("select-value");
                el.innerHTML = val;
                input.setAttribute("value", val);
                el.setAttribute("input-value", val);
                input.setAttribute("value", val);

            };
        }

    });

    let tabContent = document.querySelectorAll(".tab-group");
    Array.prototype.forEach.call(tabContent, function (targetItem) {
        let contentGroup = targetItem.querySelector(".content-group"),
            tabGroup = targetItem.querySelector(".tab"),
            linkItem = tabGroup.querySelectorAll(".tab-item");
        /**default Settings */
        if (!tabGroup.querySelector(".tab-item.active")) {
            tabGroup.firstElementChild.classList.add("active");
        }
        if (!contentGroup.querySelector(".tab-content.active")) {
            contentGroup.firstElementChild.classList.add("active");
        }
        Array.prototype.forEach.call(linkItem, function (link) {
            link.addEventListener("click", function (e) {
                let href = this.getAttribute("data-href"),
                    tabGroup = this.closest(".tab"),
                    contentGroups = tabGroup.nextSibling;
                /** remove active class */
                if (tabGroup.querySelector(".tab-item.active")) {
                  let href2 =tabGroup.querySelector(".tab-item.active").getAttribute("data-href");
                     tabGroup.querySelector(".tab-item.active").classList.remove("active");
                     this.closest(".tab-group").querySelector(".tab-content[data-id=" + href2 + "]").classList.remove("active");
                   }
                /** add active class */
                this.classList.add("active");
                contentGroup.querySelector(".tab-content[data-id=" + href + "]").classList.add("active");

            });
        });


    });

    let popover = document.querySelectorAll(".popover-toggle");
    Array.prototype.forEach.call(popover, function (el) {
        let id = el.getAttribute("data-id");
        el.addEventListener("click", function () {
            el.parentNode.querySelector(".popover-content[data-href=" + id + "]").classList.toggle("show");
        }, false);
    });
    let cardJs = document.querySelectorAll(".card-toggle");
    Array.prototype.forEach.call(cardJs, function (el) {
        let id = el.getAttribute("data-id");
        el.addEventListener("click", function () {
            document.querySelector(".card-toggle-content[data-href=" + id + "]").classList.toggle("show");
        }, false)
    });
    let carousel = function (el) {

        let content = el.querySelector(".carousel-content"),
            count = content.childElementCount,
            responsive = JSON.parse(content.getAttribute("data-grid")),
            widths,
            d_widths = el.offsetWidth,
            c_widths = d_widths * count,
            autoplay = el.getAttribute("data-autoplay"),
            autoplay_timer = el.getAttribute("data-timer"),
            is_pagination = content.getAttribute("data-pagination"),
            config = {
                "lg": 1024,
                "md": 768,
                "sm": 667
            },
            step,
            pagination_content = el.querySelector(".carousel-pagination"),
            slide_item = content.querySelector(".slide-item");
        content.firstElementChild.classList.add("active");
        content.style.transition = "all 0.4s ease-in-out";
        this.autoplayEffect = null;

        index_settings = function () {
            let slides = content.querySelectorAll(".slide-item");
            for (i in slides) {
                slides[i].tabIndex = i;
            }
        };
        index_settings();
        size = function (widths) {
            let item_resize = el.querySelectorAll(".slide-item");
            Array.prototype.forEach.call(item_resize, function (item_size) {
                item_size.style.width = widths + "px";
            });
        };
        let responsive_grid = function () {
            if (responsive) {
                if (window.innerWidth >= config.lg) {
                    if (responsive.xl != undefined) {
                        itemCount = responsive.xl;
                        widths = Number(d_widths) / Number(responsive.xl);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth >= config.md) {
                    if (responsive.lg != undefined) {
                        itemCount = responsive.lg;
                        widths = Number(d_widths) / Number(responsive.lg);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth >= config.sm) {
                    if (responsive.md != undefined) {
                        itemCount = responsive.md;
                        widths = Number(d_widths) / Number(responsive.md);
                    } else {
                        widths = d_widths;
                    }
                } else if (window.innerWidth < config.sm) {
                    if (responsive.sm != undefined) {
                        itemCount = responsive.sm;
                        widths = Number(d_widths) / Number(responsive.sm);
                    } else {
                        widths = d_widths;
                    }
                } else {
                    widths = d_widths;
                }
            } else {
                widths = d_widths;
            }

            size(widths);
            c_widths = widths * content.lastElementChild.tabIndex;
            content.style.width = c_widths;

            return widths;
        };

        autoplay_ = function () {
            if (autoplay === "true") {
                let i = 0;
                let last_i = content.lastElementChild.tabIndex;
                this.autoplayEffect = setInterval(function () {
                    if (last_i > i) {
                        content.style.marginLeft = "-" + d_widths * i + "px";
                        content.children.item(i + 1).classList.add("active");
                        content.children.item(i).classList.remove("active");
                    } else {
                        content.lastElementChild.classList.remove("active");
                        content.firstElementChild.classList.add("active");
                        content.style.marginLeft = 0;
                        i = 0;
                    }
                    i++;
                }, Number(autoplay_timer));
            }
        };

        pagination = function () {
            if (is_pagination) {
                let pagination_item = el.querySelector(".carousel-pagination");
                for (let i = 0; i < count; i++) {
                    let p_item = document.createElement("a");
                    p_item.href = "#!";
                    p_item.classList.add("item");
                    p_item.tabIndex = i;
                    pagination_item.appendChild(p_item);
                }
            }
        };


        slider_next = function (el) {
            let content = el.querySelector(".carousel-content");
            let last_i = content.lastElementChild.tabIndex;
            let i = content.querySelector(".slide-item.active").tabIndex + 1;
            step = d_widths / responsive_grid();
            widths = d_widths / step;
            if (step > 1) {
                last_i = last_i - step + 1;
            }
            if (i <= last_i) {
                content.children.item(i).classList.add("active");
                content.children.item(i - 1).classList.remove("active");
                let ml_ = widths * i;
                content.style.marginLeft = "-" + ml_ + "px";

                i++;
            } else {
                i = 1;
                content.lastElementChild.classList.remove("active");
                content.firstElementChild.classList.add("active");
                content.style.marginLeft = 0;
            }
        };
        slider_prev = function () {
            let content = el.querySelector(".carousel-content");
            let last_i = content.lastElementChild.tabIndex;
            let i = content.querySelector(".slide-item.active").tabIndex;
            step = d_widths / responsive_grid();
            widths = d_widths / step;
            if (i >= 1) {
                content.children.item(i - 1).classList.add("active");
                content.children.item(i).classList.remove("active");
                i--;

                let ml_ = widths * i;
                content.style.marginLeft = "-" + ml_ + "px";

            } else {
                i = last_i;
                content.lastElementChild.classList.add("active");
                content.firstElementChild.classList.remove("active");
                if (step > 1) {
                    last_i = last_i - step + 1;
                }
                let ml_ = widths * (last_i - 1);
                content.style.marginLeft = "-" + ml_ + "px";
                i--;
            }

        };
        slider_direction = function (el) {
            let prev = el.querySelector(".carousel-prev-btn");
            let next = el.querySelector(".carousel-next-btn");
            if (el.contains(prev) && el.contains(next)) {
                prev.addEventListener("click", function () {
                    window.clearInterval(this.autoplayEffect);
                    slider_prev(el);
                }, false);

                next.addEventListener("click", function () {
                    window.clearInterval(this.autoplayEffect);
                    slider_next(el);
                }, false);
            }
            if (el.contains(pagination_content)) {
                pagination();

                let paginate = pagination_content.querySelectorAll(".item");
                Array.prototype.forEach.call(paginate, function (el) {
                    el.addEventListener("click", function () {
                        window.clearInterval(this.autoplayEffect);
                        let last_i = el.parentNode.lastChild.tabIndex,
                            i = el.tabIndex;
                        let ml_ = widths * i;
                        content.style.marginLeft = "-" + ml_ + "px";
                    }, false);
                });

            }


        };
        window.addEventListener("resize", function () {
            d_widths = el.offsetWidth;
            responsive_grid();
        }, false);
        if (c_widths > content.style.marginLeft) {}
        responsive_grid();
        slider_direction(el);
        autoplay_();
        return this;
    };

    let carousel_ = document.querySelectorAll(".carousel-slider");
    for (el of carousel_) {
        let id = el.getAttribute("id");
        carousel(el);
    }
    let alert = document.querySelectorAll(".alert-toggle");
    Array.prototype.forEach.call(alert, function (el) {
        let id = el.getAttribute("data-href"),
            content = document.querySelector(".alert[data-id=" + id + "]"),
            close = document.querySelector(".alert-close[data-href=" + id + "]"),
            position = el.getAttribute("alert-position");
        position = position.split("-").map(String);
        let posX = position[1],
            posY = position[0],
            s = content.style,
            hg, wd,
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
            }
        el.addEventListener("click", function () {
            content.classList.add("active");
            hg = content.offsetHeight;
            alertY(posY);
            wd = content.offsetWidth;
            alertX(posX)
        }, false);
    });
    let alert_close = document.querySelectorAll(".alert-close");

    Array.prototype.forEach.call(alert_close, function (el) {
        el.addEventListener("click", function () {
            //el.parentNode.style.display = "none";
            let parent = el.parentNode,
                s = el.parentNode.style,
                o = 10;
            s.transtion = "all 0.4s ease-in-out";
            let effect = setInterval(() => {
                o -= 1;
                s.opacity = o / 10;
                if (o === 0) {
                    window.clearInterval(effect);
                    parent.classList.remove("active");
                    s.display = "none";
                }
            }, 40);
        }, false);
    });
    let chip = document.querySelectorAll("[data-type=chip]");
    Array.prototype.forEach.call(chip, function (el) {
        el.addEventListener("keypress", function (e) {
            if (e.keyCode == 13) {
                let val = el.value;
                let chips = document.createElement("div"),
                    span = document.createElement("span"),
                    close = document.createElement("button");
                chips.classList.add("chip");
                span.classList.add("chip-name");
                span.innerHTML = val;
                close.classList.add("close", "icon", "icon-x");
                chips.appendChild(span);
                chips.appendChild(close);
                el.parentNode.appendChild(chips);
                close.addEventListener("click", function () {
                    close.parentNode.remove();
                }, false);
            }
        }, false);
    });
    let progress = document.querySelectorAll(".progress-bar");
    Array.prototype.forEach.call(progress, function (el) {
        el.style.transition = "all 0.4s ease-in-out";
        let wd = el.getAttribute("aria-valuenow"),
            text = el.getAttribute("aria-valuetext");
        el.style.width = wd;
        el.innerHTML = text;
    });
    let datepicker = (function () {
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            month_count = 12,
            months_short = [],
            months_long = [],
            day_count,
            days = [],
            week_day_count = 7,
            week_day = [],
            lastday = function (y, m) {
                return new Date(y, m + 1, 0).getDate();
            };

        function getArrayMonths() {
            for (let i = 0; i < month_count; i++) {
                let objDate = new Date(year, i, 10),
                    locale = navigator.language,
                    month_l = objDate.toLocaleString(locale, {
                        month: "long"
                    }),
                    month_s = objDate.toLocaleString(locale, {
                        month: "short"
                    });
                months_long.push(month_l);
                months_short.push(month_s);
            }
            return false;
        }

        function getArrayday() {
            days = [];
            week_day = [];
            for (let i = 0; i <= day_count; i++) {
                let objDate = new Date(year, month, i),
                    locale = navigator.language,
                    day_l = objDate.toLocaleString(locale, {
                        day: "numeric"
                    }),
                    weekDay = objDate.toLocaleString(locale, {
                        weekday: "short"
                    });
                days.push(day_l);
                week_day.push(weekDay);
            }
        }

        function week_day_name() {
            for (let i = 0; i < week_day_count; i++) {
                let objDate = new Date(year, month, i),
                    locale = navigator.language,
                    weekDay = objDate.toLocaleString(locale, {
                        weekday: "short"
                    });
                week_day.push(weekDay);
            }
        }

        let setup = function (par = null) {
            if (par == null) {
                par = document;
                return par;
            }
            day_count = lastday(year, month);
            getArrayMonths();
            getArrayday();
            let day_c_parent_head = par.querySelector(".datepicker-body-head");
            let day_c_parent_day = par.querySelector(".datepicker-body-content");
            for (i in week_day) {
                if (i - 1 < 6) {
                    let day_c = document.createElement("h6");
                    day_c.classList.add("datepicker-days");
                    day_c.innerHTML = week_day[i];
                    day_c_parent_head.appendChild(day_c);
                } else {
                    break;
                }
            }
            for (i in days) {
                let day_c = document.createElement("div");
                day_c.classList.add("datepicker-days");
                day_c.href = "#!";
                day_c.innerHTML = days[i];
                day_c.tabIndex = days[i];

                day_c_parent_day.appendChild(day_c);
                if (i == day) {
                    day_c.classList.add("active");
                }
                let x = 1;
                if (i < days[x]) {
                    day_c.classList.add("date-gray");
                }

                day_c.addEventListener("click", function () {
                        this.parentNode.querySelector(".datepicker-days.active")
                            .classList.remove("active");
                        this.classList.add("active");
                        day = this.tabIndex;
                        par.classList.remove("active");
                        par.querySelector(".date-summary").innerHTML = day + " " + months_long[month] + " " + year;
                        par.parentNode.querySelector("input[type=hidden]").value = day + "-" + months_long[month] + "-" + year;
                    },
                    false
                );

                x++;
            }
            if (days.length < 35) {
                for (let a = 1; a <= 35 - days.length; a++) {
                    let day_c = document.createElement("span");
                    day_c.classList.add("datepicker-days", "date-gray");
                    day_c.innerHTML = a;
                    day_c_parent_day.appendChild(day_c);
                }
            }
            let head_summary = par.querySelector("a.date-summary");
            head_summary.innerHTML = day + " " + months_long[month] + " " + year;
            return this;
        };
        window.addEventListener("load", function () {
            setup();
        }, true);

        function clears(par = null) {
            if (par == null) {
                par = document.querySelector(".datepicker")
            }
            let day = par.querySelectorAll(".datepicker-days");
            for (i in day) {
                day[i].outerHTML = "";
            }
        }

        function input_val(params) {
            return (params.value = day + "-" + month + "-" + year);
        }

        let datepicker = [document.getElementsByClassName("datepicker-toggle"), document.querySelectorAll("[data-toggle=datepicker]"), document.querySelectorAll("[data-select=datepicker]")];
        Array.prototype.forEach.call(datepicker, function (picker) {
            Array.prototype.forEach.call(picker, function (el) {
                let that = el;
                let datepicker_create = document.createElement("div");
                datepicker_create.classList.add("datepicker");
                datepicker_create.setAttribute("data-input-name", that.getAttribute("data-name"));
                let input_cr = document.createElement("input");
                input_cr.type = "hidden";
                input_cr.name = that.getAttribute("data-name");

                el.addEventListener("click", function (e) {
                    datepicker_create.classList.toggle("active");
                    datepicker_create.style.left = that.offsetLeft + "px";
                    datepicker_create.style.top = that.offsetTop + that.offsetHeight + 10 + "px";
                }, false);

                el.parentNode.appendChild(datepicker_create);
                el.parentNode.appendChild(input_cr);
                input_val(input_cr);

                datepicker_create.innerHTML =
                    '<span class="tip"></span><div class="datepicker-head"><a href="#!" class="prev-date">&#8651;</a><a class="date-summary"></a><a href="#!" class="next-date">&#8652;</a></div><div class="datepicker-body"><div class="datepicker-body-head"></div><div class="datepicker-body-content"></div></div>';
                el = datepicker_create;
                setup(el);
                let prev_date = el.querySelectorAll(".prev-date");
                Array.prototype.forEach.call(
                    prev_date,
                    function (prev) {
                        prev.addEventListener(
                            "click",
                            function () {
                                if (month < 1) {
                                    month = 11;
                                    year -= 1;
                                } else {
                                    month -= 1;
                                }
                                clears(el);
                                day_count = lastday(year, month);
                                setup(el);
                            }, false);
                    }
                );

                let next_date = el.querySelectorAll(".next-date");
                Array.prototype.forEach.call(next_date, function (next) {
                    next.addEventListener(
                        "click",
                        function () {
                            if (month > 10) {
                                month = 0;
                                year += 1;
                            } else {
                                month += 1;
                            }
                            clears(el);
                            day_count = lastday(year, month);
                            setup(el);
                        }, false);
                });
                let menu = el.querySelectorAll("a.date-summary");
                Array.prototype.forEach.call(menu, function (summary) {
                    summary.addEventListener("click",
                        function () {
                            let c_menu = document.createElement("div");
                            c_menu.classList.add("datepicker-menu");
                            let dpicker = el;
                            dpicker.appendChild(c_menu);
                            c_menu.classList.add("active");
                            for (let i = year - 6; i <= year + 5; i++) {
                                let item = document.createElement("aside");
                                item.classList.add("datepicker-years");
                                item.tabIndex = i;
                                item.innerHTML = i;
                                if (year == i) {
                                    item.classList.add("active");
                                }
                                c_menu.appendChild(item);
                            }

                            let d_years = el.querySelectorAll(".datepicker-years");
                            Array.prototype.forEach.call(d_years, function (el_year) {
                                el_year.addEventListener("click", function () {
                                    year = this.tabIndex;
                                    el_year.parentNode.innerHTML = "";
                                    input_val(summary);

                                    for (i in months_long) {
                                        if (i < 12) {
                                            let item = document.createElement("aside");
                                            item.classList.add("datepicker-months");
                                            item.tabIndex = i;
                                            item.innerHTML = months_long[i];
                                            c_menu.appendChild(item);
                                            if (month == i) {
                                                item.classList.add("active");
                                            }
                                        }

                                    }
                                    let d_months = el.querySelectorAll(".datepicker-months");
                                    Array.prototype.forEach.call(d_months, function (i) {
                                        i.addEventListener("click", function (el_month) {
                                            c_menu.classList.remove("active");
                                            month = this.tabIndex;
                                            summary.innerHTML = day + " " + months_long[month] + " " + year;
                                            el.classList.remove("active");
                                            el.parentNode.querySelector("input[type=hidden]").value = summary.innerHTML.replace(" ", "-");
                                        }, true);
                                    });
                                });
                            });
                        },
                        true
                    );
                });
            });
        });

    })();
    let fileput = document.getElementsByClassName("fileput");
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
                let li = document.createElement("li");
                li.className = "item";
                li.innerHTML = i.name;
                list.querySelector("ul").append(li);
            }
            slide(list).down(100);
        }
    });
    /*waves effect*/
    ;
    (function (window) {
        'use strict';
        let Waves = Waves || {};
        let $$ = document.querySelectorAll.bind(document);
        // Find exact position of element
        function isWindow(obj) {
            return obj !== null && obj === obj.window;
        }

        function getWindow(elem) {
            return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        function offset(elem) {
            let docElem, win, box = {
                    top: 0,
                    left: 0
                },
                doc = elem && elem.ownerDocument;
            docElem = doc.documentElement;
            if (typeof elem.getBoundingClientRect !== typeof undefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        }

        function convertStyle(obj) {
            let style = '';
            for (let a in obj) {
                if (obj.hasOwnProperty(a)) {
                    style += (a + ':' + obj[a] + ';');
                }
            }
            return style;
        }
        let Effect = {
            // Effect delay
            duration: 750,
            show: function (e, element) {
                // Disable right click
                if (e.button === 2) {
                    return false;
                }
                let el = element || this;
                // Create ripple
                let ripple = document.createElement('div');
                ripple.className = 'waves-ripple';
                el.appendChild(ripple);
                // Get click coordinate and element witdh
                let pos = offset(el);
                let relativeY = (e.pageY - pos.top);
                let relativeX = (e.pageX - pos.left);
                let scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';
                // Support for touch devices
                if ('touches' in e) {
                    relativeY = (e.touches[0].pageY - pos.top);
                    relativeX = (e.touches[0].pageX - pos.left);
                }
                // Attach data to element
                ripple.setAttribute('data-hold', Date.now());
                ripple.setAttribute('data-scale', scale);
                ripple.setAttribute('data-x', relativeX);
                ripple.setAttribute('data-y', relativeY);
                // Set ripple position
                let rippleStyle = {
                    'top': relativeY + 'px',
                    'left': relativeX + 'px'
                };
                ripple.className = ripple.className + ' waves-notransition';
                ripple.setAttribute('style', convertStyle(rippleStyle));
                ripple.className = ripple.className.replace('waves-notransition', '');
                // Scale the ripple
                rippleStyle['-webkit-transform'] = scale;
                rippleStyle['-moz-transform'] = scale;
                rippleStyle['-ms-transform'] = scale;
                rippleStyle['-o-transform'] = scale;
                rippleStyle.transform = scale;
                rippleStyle.opacity = '1';
                rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
                rippleStyle['transition-duration'] = Effect.duration + 'ms';
                rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
                ripple.setAttribute('style', convertStyle(rippleStyle));
            },
            hide: function (e) {
                TouchHandler.touchup(e);
                let el = this;
                let width = el.clientWidth * 1.4;
                // Get first ripple
                let ripple = null;
                let ripples = el.getElementsByClassName('waves-ripple');
                if (ripples.length > 0) {
                    ripple = ripples[ripples.length - 1];
                } else {
                    return false;
                }
                let relativeX = ripple.getAttribute('data-x');
                let relativeY = ripple.getAttribute('data-y');
                let scale = ripple.getAttribute('data-scale');
                // Get delay beetween mousedown and mouse leave
                let diff = Date.now() - Number(ripple.getAttribute('data-hold'));
                let delay = 350 - diff;
                if (delay < 0) {
                    delay = 0;
                }
                // Fade out ripple after delay
                setTimeout(function () {
                    let style = {
                        'top': relativeY + 'px',
                        'left': relativeX + 'px',
                        'opacity': '0', // Duration
                        '-webkit-transition-duration': Effect.duration + 'ms',
                        '-moz-transition-duration': Effect.duration + 'ms',
                        '-o-transition-duration': Effect.duration + 'ms',
                        'transition-duration': Effect.duration + 'ms',
                        '-webkit-transform': scale,
                        '-moz-transform': scale,
                        '-ms-transform': scale,
                        '-o-transform': scale,
                        'transform': scale,
                    };
                    ripple.setAttribute('style', convertStyle(style));
                    setTimeout(function () {
                        try {
                            el.removeChild(ripple);
                        } catch (e) {
                            return false;
                        }
                    }, Effect.duration);
                }, delay);
            }, // Little hack to make <input> can perform waves effect
            wrapInput: function (elements) {
                for (let a = 0; a < elements.length; a++) {
                    let el = elements[a];
                    if (el.tagName.toLowerCase() === 'input') {
                        let parent = el.parentNode;
                        // If input already have parent just pass through
                        if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                            continue;
                        }
                        // Put element class and style to the specified parent
                        let wrapper = document.createElement('i');
                        wrapper.className = el.className + ' waves-input-wrapper';
                        let elementStyle = el.getAttribute('style');
                        if (!elementStyle) {
                            elementStyle = '';
                        }
                        wrapper.setAttribute('style', elementStyle);
                        el.className = 'waves-button-input';
                        el.removeAttribute('style');
                        // Put element as child
                        parent.replaceChild(wrapper, el);
                        wrapper.appendChild(el);
                    }
                }
            }
        };
        /**
         * Disable mousedown event for 500ms during and after touch
         */
        let TouchHandler = {
            /* uses an integer rather than bool so there's no issues with
             * needing to clear timeouts if another touch event occurred
             * within the 500ms. Cannot mouseup between touchstart and
             * touchend, nor in the 500ms after touchend. */
            touches: 0,
            allowEvent: function (e) {
                let allow = true;
                if (e.type === 'touchstart') {
                    TouchHandler.touches += 1; //push
                } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                    setTimeout(function () {
                        if (TouchHandler.touches > 0) {
                            TouchHandler.touches -= 1; //pop after 500ms
                        }
                    }, 500);
                } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                    allow = false;
                }
                return allow;
            },
            touchup: function (e) {
                TouchHandler.allowEvent(e);
            }
        };
        /**
         * Delegated click handler for .waves-effect element.
         * returns null when .waves-effect element not in "click tree"
         */
        function getWavesEffectElement(e) {
            if (TouchHandler.allowEvent(e) === false) {
                return null;
            }
            let element = null;
            let target = e.target || e.srcElement;
            while (target.parentElement !== null) {
                if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                    element = target;
                    break;
                } else if (target.classList.contains('waves-effect')) {
                    element = target;
                    break;
                }
                target = target.parentElement;
            }
            return element;
        }
        /**
         * Bubble the click and show effect if .waves-effect elem was found
         */
        function showEffect(e) {
            let element = getWavesEffectElement(e);
            if (element !== null) {
                Effect.show(e, element);
                if ('ontouchstart' in window) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }
                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
        Waves.displayEffect = function (options) {
            options = options || {};
            if ('duration' in options) {
                Effect.duration = options.duration;
            }
            Effect.wrapInput($$('.waves-effect'));
            if ('ontouchstart' in window) {
                document.body.addEventListener('touchstart', showEffect, false);
            }
            document.body.addEventListener('mousedown', showEffect, false);
        };

        Waves.attach = function (element) {
            if (element.tagName.toLowerCase() === 'input') {
                Effect.wrapInput([element]);
                element = element.parentElement;
            }
            if ('ontouchstart' in window) {
                element.addEventListener('touchstart', showEffect, false);
            }
            element.addEventListener('mousedown', showEffect, false);
        };
        window.Waves = Waves;
        document.addEventListener('DOMContentLoaded', function () {
            Waves.displayEffect();
        }, false);
    })(window);

}

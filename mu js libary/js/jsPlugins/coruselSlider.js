// /**
//  * Created by burak on 25.04.2017.
//  */
// (function ($) {
//     $.fn.carousel = function () {
//         var config = {
//                 "lg": 1024,
//                 "md": 768,
//                 "sm": 667
//             },
//             responsive = {},
//             main = this,
//             widthGlobal = $(".carousel-slider").innerWidth(),
//             content = main.find(".carousel-content"),
//             item = content.find(".slide-item"),
//             itemIndis = item.filter(".active").index(),
//             itemCount = null,
//             slideCount = item.length,
//             nextButton = main.find(".carousel-next-btn"),
//             prevButton = main.find(".carousel-prev-btn"),
//             pagination = main.find(".carousel-pagination"),
//             paginate = content.data("pagination"),
//             autoplay = main.data("autoplay"),
//             timer = main.data("autotimer"),widths = null;

//         //responsive settings

//         function windowResp_query() {

//             if (window.innerWidth >= config.lg) {
//                 if (responsive.xl != undefined) {
//                     itemCount = responsive.xl;
//                     widths = Number(widthGlobal) / Number(responsive.xl);
//                     return widths;
//                 }
//             } else if (window.innerWidth >= config.md) {
//                 if (responsive.lg != undefined) {
//                     itemCount = responsive.lg;
//                     widths = Number(widthGlobal) / Number(responsive.lg);
//                     return widths;
//                 }
//             } else if (window.innerWidth >= config.sm) {
//                 if (responsive.md != undefined) {
//                     itemCount = responsive.md;
//                     widths = Number(widthGlobal) / Number(responsive.md);
//                     return widths;
//                 }
//             } else if (window.innerWidth < config.sm) {
//                 if (responsive.sm != undefined) {
//                     itemCount = responsive.sm;
//                     widths = Number(widthGlobal) / Number(responsive.sm);
//                     return widths;
//                 }
//             }
//             //return item.css("width", width);

//         }

//         responsive = content.data("grid");
//         function resp_reset() {
//             if (responsive) {
//                 widthGlobal = main.innerWidth();
//                 windowResp_query();
//                 item.css({"width": widths});
//                 item.filter(":nth-child(" + (itemIndis + 1) + ")").animate({transform: -widths * (itemIndis)}, 'fast');

//             } else {
//                 widths = main.innerWidth();
//                 content.find(".slide-item").css("width", widths);
//             }
//         }
//         resp_reset();
//         $(window).resize(function (e) {
//             resp_reset();
//         });

//         //default settings
//         nextButton.click(function () {
//             content.finish();
//             if (item.eq(slideCount - itemCount).hasClass("active")) {
//                 item.filter(":last-child").removeClass("active");
//                 content.animate({
//                     transform: 0
//                 }, 'fast');
//                 item.filter(":first-child").addClass("active");
//                 autoplay_slider("stop");

//             } else {
//                 content.animate({
//                     transform: "+=-" + widths
//                 }, 'slow');
//                 item.filter(".active").removeClass("active").next(".slide-item").addClass("active");
//             }

//         });
//         prevButton.click(function () {
//             content.finish();
//             if (item.filter(":first-child").hasClass("active")) {
//                 content.animate({
//                     transform: 0
//                 }, 'fast');
//                 item.filter(":last-child").addClass("active");
//                 autoplay_slider("stop");
//             } else {
//                 content.animate({
//                     transform: "+=" + widths
//                 }, 'slow');
//                 item.filter(".active").removeClass("active").prev(".slide-item").addClass("active");
//             }
//         });
//         if (paginate) {
//             pagination.html("");
//             itemCount = (itemCount != null) ? itemCount : 1;
//             var paginate_item = slideCount / itemCount;
//             for (var i = 0; i < paginate_item; i++) {
//                 pagination.append("<div class='item' data-paginate-target='" + i + "'></div>");
//             }
//             pagination.find(".item").click(function () {
//                 content.finish();

//                 var paginate_loc = itemIndis;
//                 var target = $(this).data("paginate-target");

//                 content.animate({
//                     transform: -(widthGlobal * target)
//                 }, 'slow');
//                 item.filter(".active").removeClass("active");
//                 item.eq(target * itemCount).addClass("active");

//             });
//         }
//         if (autoplay = true) {
//             if (timer = true) {
//                 var speed = Number(timer);
//             } else {
//                 speed = 3500;
//             }

//             function autoplay_slider(par) {
//                 if (par = "stop") {
//                     return false;
//                 } else {
//                     if (item.filter(":last-child").hasClass("active")) {
//                         item.filter(".active").removeClass("active");
//                         content.animate({
//                             transform: 0
//                         }, 'slow');
//                         item.filter(":first-child").addClass("active");
//                     } else {
//                         item.filter(".active").removeClass("active").next(".slide-item").addClass("active");
//                         indis = item.filter(".active").index();
//                         content.animate({
//                             transform: -widths * indis
//                         }, 'slow');

//                     }
//                 }

//             }

//             function start_timer() {
//                 return setTimeout(autoplay_slider, speed / 2);
//             }

//             setInterval(start_timer, speed / 2);

//         }
//     };
// }(jQuery));

var carousel = function(el) {
    var content = el.querySelector(".carousel-content"),
        count = content.childElementCount,
        responsive = JSON.parse(content.getAttribute("data-grid")),
        widths,
        d_widths = el.offsetWidth,
        c_widths = d_widths * count,
        autoplay = el.getAttribute("data-autoplay"),
        autoplay_timer = el.getAttribute("data-timer"),
        is_pagination = content.getAttribute("data-pagination"),
        config = { lg: 1024, md: 768, sm: 667 },
        step,
        pagination_content = el.querySelector(".carousel-pagination"),
        slide_item = content.querySelector(".slide-item");
    content.firstElementChild.classList.add("active");
    content.style.transition = "all 0.4s ease-in-out";
    this.autoplayEffect = null;

    index_settings = function() {
        var slides = content.querySelectorAll(".slide-item");
        for (i in slides) {
            slides[i].tabIndex = i;
        }
    };
    index_settings();
    size = function(widths) {
        var item_resize = el.querySelectorAll(".slide-item");
        Array.prototype.forEach.call(item_resize, function(item_size) {
            item_size.style.width = widths + "px";
        });
    };
    var responsive_grid = function() {
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

    autoplay_ = function() {
        if (autoplay === "true") {
            var i = 0;
            var last_i = content.lastElementChild.tabIndex;
            this.autoplayEffect = setInterval(function() {
                if (last_i > i) {
                    content.style.transform = "-" + d_widths * i + "px";
                    content.children.item(i + 1).classList.add("active");
                    content.children.item(i).classList.remove("active");
                } else {
                    content.lastElementChild.classList.remove("active");
                    content.firstElementChild.classList.add("active");
                    content.style.transform = 0;
                    i = 0;
                }
                i++;
            }, Number(autoplay_timer));
        }
    };

    pagination = function() {
        if (is_pagination) {
            var pagination_item = el.querySelector(".carousel-pagination");
            for (var i = 0; i < count; i++) {
                var p_item = document.createElement("a");
                p_item.href = "#!";
                p_item.classList.add("item");
                p_item.tabIndex = i;
                pagination_item.appendChild(p_item);
            }
        }
    };

    slider_next = function(el) {
        var content = el.querySelector(".carousel-content");
        var last_i = content.lastElementChild.tabIndex;
        var i = content.querySelector(".slide-item.active").tabIndex + 1;
        step = d_widths / responsive_grid();
        widths = d_widths / step;
        if (step > 1) {
            last_i = last_i - step + 1;
        }
        if (i <= last_i) {
            content.children.item(i).classList.add("active");
            content.children.item(i - 1).classList.remove("active");
            var ml_ = widths * i;
            content.style.transform = "-" + ml_ + "px";

            i++;
        } else {
            i = 1;
            content.lastElementChild.classList.remove("active");
            content.firstElementChild.classList.add("active");
            content.style.transform = 0;
        }
    };
    slider_prev = function() {
        var content = el.querySelector(".carousel-content");
        var last_i = content.lastElementChild.tabIndex;
        var i = content.querySelector(".slide-item.active").tabIndex;
        step = d_widths / responsive_grid();
        widths = d_widths / step;
        if (i >= 1) {
            content.children.item(i - 1).classList.add("active");
            content.children.item(i).classList.remove("active");
            i--;

            var ml_ = widths * i;
            content.style.transform = "-" + ml_ + "px";
        } else {
            i = last_i;
            content.lastElementChild.classList.add("active");
            content.firstElementChild.classList.remove("active");
            if (step > 1) {
                last_i = last_i - step + 1;
            }
            var ml_ = widths * (last_i - 1);
            content.style.transform = "-" + ml_ + "px";
            i--;
        }
    };
    slider_touch = () => {
        let clicked = false,
            oldx = 0;
        mouse_direction = function(e) {
            direct = e.pageX > oldx ? "right" : "left";
            oldx = e.pageX;
            return direct;
        };
        content.addEventListener(
            "mousedown",
            function(e) {
                e = e || window.event;
                clicked = true;
            },
            true
        );
        content.addEventListener(
            "mousemove",
            function(e) {
                e = e || window.event;
                var MarL = content.style.marginLeft;

                if (clicked === true) {
                    mouse_direction(e);
                    if (direct === "left") {
                        content.style.marginLeft =
                            Number(MarL.replace("px", "")) - e.pageX + "px";
                    } else if (direct === "right") {
                    }
                }
            },
            true
        );
        content.addEventListener(
            "mouseup",
            function(e) {
                e = e || window.event;
                clicked = false;
            },
            true
        );
    };
    slider_touch();
    slider_direction = function(el) {
        var prev = el.querySelector(".carousel-prev-btn");
        var next = el.querySelector(".carousel-next-btn");
        if (el.contains(prev) && el.contains(next)) {
            prev.addEventListener(
                "click",
                function() {
                    window.clearInterval(this.autoplayEffect);
                    slider_prev(el);
                },
                false
            );

            next.addEventListener(
                "click",
                function() {
                    window.clearInterval(this.autoplayEffect);
                    slider_next(el);
                },
                false
            );
        }
        if (el.contains(pagination_content)) {
            pagination();

            var paginate = pagination_content.querySelectorAll(".item");
            Array.prototype.forEach.call(paginate, function(el) {
                el.addEventListener(
                    "click",
                    function() {
                        window.clearInterval(this.autoplayEffect);
                        var last_i = el.parentNode.lastChild.tabIndex,
                            i = el.tabIndex;
                        var ml_ = widths * i;
                        content.style.transform = "-" + ml_ + "px";
                    },
                    false
                );
            });
        }
    };
    window.addEventListener(
        "resize",
        function() {
            d_widths = el.offsetWidth;
            responsive_grid();
        },
        false
    );
    if (c_widths > content.style.transform) {
    }
    responsive_grid();
    slider_direction(el);
    autoplay_();
    return this;
};

var carousel_ = document.querySelectorAll(".carousel-slider");
for (el of carousel_) {
    let id = el.getAttribute("id");
    carousel(el);
}

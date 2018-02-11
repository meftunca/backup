let dropdown = (trigger, parameter) => {
    this.trigger = trigger;
    this.parameter = parameter;
    let menu,
        triggerItem = document.querySelectorAll (this.trigger),
        configure = (el) => {
            let menu = el.parentNode.querySelector (this.parameter.menu),
                classL = menu.classList,
                eventType = this.parameter.type || "click",
                triggerType = eventType === "click"
                    ? "click"
                    : eventType === "hover"
                                  ? "mouseover"
                                  : "click",
                hidden = this.parameter.hidden || "true",
                autoPosition = this.parameter.autoPosition || "true",
                NavbarCollapse = this.parameter.NavbarCollapse || "false",
                showEffect = this.parameter.showEffect || "show",
                hiddenEffect = this.parameter.hiddenEffect || "out",
                waitingEffect = this.parameter.waitingEffect || null,
                menuHeight = this.parameter.height || "auto",
                menuWidth = this.parameter.width || "auto",
                rect = el.getClientRects (),
                wWidth = window.innerWidth,
                wHeight = window.innerHeight,
                display_hidden_position = (type) => {
                    return menu.setAttribute ("data-dropdown-display-coord", type);
                }, display_show_position = () => {
                    if (menu.hasAttribute ("data-dropdown-display-coord")){
                        let backAttr = menu.getAttribute ("data-dropdown-display-coord");
                        menu.classList.add(backAttr);
                        menu.removeAttribute ("data-dropdown-display-coord")
                    }

                };
            menu.classList.add ("show");
            let menuRect = menu.getClientRects ();
            menu.classList.remove ("show");
            let coordQuery = () => {
                    rect = el.getClientRects ()[ 0 ];
                    menuRect = menu.getClientRects ()[ 0 ];
                    if (rect !== undefined && menuRect !== undefined){
                        if (wHeight < rect.y + menuHeight) {
                            !classL.contains ("dropup") ? classL.add ("dropup") : null;
                        }
                        else if (rect.top < menuHeight) {
                            classL.contains ("dropup") ? classL.remove ("dropup") : null;
                            display_hidden_position ("dropup");
                        }
                        else if (wWidth < rect.left + menuWidth) {
                            classL.contains ("dropright") ? classL.remove ("dropright") : classL.add ("dropleft");
                            !classL.contains ("dropleft") ? classL.add ("dropleft") : null;
                            display_hidden_position ("dropright");
                        }
                        else if (rect.left < menuWidth) {
                            classL.contains ("dropleft") ? classL.remove ("dropleft") : classL.add ("dropright");
                            !classL.contains ("dropright") ? classL.add ("dropright") : null;
                            display_hidden_position ("dropleft");
                        }
                        else if (rect.left < menuWidth + rect.width && wWidth < rect.left + menuWidth + rect.width) {
                            classL.contains ("dropleft")
                                ? classL.remove ("dropleft")
                                : classL.contains ("dropright")
                                ? classL.remove ("dropright")
                                : classL.add ("dropright");
                        }else{
                            display_show_position();
                        }
                    }


                },
                toggles = () => {
                    if (classL.contains (showEffect)) {
                        classL.add (hiddenEffect);
                        classL.remove (showEffect);
                        setTimeout (() => {
                            classL.remove (hiddenEffect);
                        }, "400");
                    } else {
                        classL.add (showEffect);
                        menuHeight = menu.clientHeight;
                        menuWidth = menu.clientWidth;
                    }
                },
                defaults = () => {
                    toggles ();
                    if (autoPosition === "true") {
                        coordQuery ();
                    }
                    let clear = () => {
                        if (classL.contains (showEffect)) {
                            classL.add (hiddenEffect);
                            classL.remove (showEffect);
                            setTimeout (() => {
                                classL.remove (hiddenEffect);
                            }, "380");
                        }
                    };
                    if (hidden === "true") {
                        window.addEventListener ("change", clear);
                        document.addEventListener ("click", (event) => {
                            let isClickInside = el.contains (event.target) || menu.contains (event.target);
                            if (!isClickInside) {
                                clear ();
                            }
                        }, false);
                    }

                };

            document.addEventListener ("load", coordQuery, true);
            window.addEventListener ("scroll", () => {
                if (this.parameter.autoPosition === "true" && menu.classList.contains ("show")) {
                    coordQuery ();
                }
            });
            el.addEventListener (triggerType, () => {
                if (el.getAttribute ("data-collapse") === "dropdown") {
                    if (window.innerWidth <= 769) {
                        console.log("mobile")
                        slide (menu).toggle (100);
                    } else {
                        defaults ();
                    }
                    window.addEventListener ("resize", () => {
                        if (window.innerWidth >= 769) {
                            menu.removeAttribute ("style");
                        }
                    });
                } else {
                    defaults ();
                }
            });
        },
        run = (trigger) => {

            Array.prototype.forEach.call (triggerItem, (el) => {
                configure (el);
            });
        };
    return run (triggerItem);
};
dropdown (".dropdown-toggle", {
    type: 'hover ',
    menu: '.dropdown-menu',
    hidden: 'true',
    autoPosition: 'true',
    NavbarCollapse: 'true',
    showEffect: "show",
    hiddenEffect: "out"
});

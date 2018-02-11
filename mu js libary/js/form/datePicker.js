let datepicker = ( () => {
    let datepicker_activator =document.getElementsByClassName ("datepicker-toggle"),
        inputVal, dateSummaryText, datepicker_content,
        date = new Date (),
        year = date.getFullYear (),
        month = date.getMonth (),
        day = date.getDate (),
        month_count = 12,
        months_short = [],
        months_long = [],
        day_count,
        days = [],
        week_day_count = 7,
        week_day = [],
        lastday = (y, m) => {
            return new Date (y, m + 1, 0).getDate ();
        },
        prev_date,
        next_date,
        menu,
        getArrayMonths = () => {
            for (let i = 0; i < month_count; i++) {
                let objDate = new Date (year, i, 10),
                    locale = navigator.language,
                    month_l = objDate.toLocaleString (locale, {
                        month: "long"
                    }),
                    month_s = objDate.toLocaleString (locale, {
                        month: "short"
                    });
                months_long.push (month_l);
                months_short.push (month_s);
            }
            return false;
        }, getArrayday = () => {
            days = [];
            week_day = [];
            for (let i = 0; i <= day_count; i++) {
                let objDate = new Date (year, month, i),
                    locale = navigator.language,
                    day_l = objDate.toLocaleString (locale, {
                        day: "numeric"
                    }),
                    weekDay = objDate.toLocaleString (locale, {
                        weekday: "short"
                    });
                days.push (day_l);
                week_day.push (weekDay);
            }
        }, week_day_name = () => {
            for (let i = 0; i < week_day_count; i++) {
                let objDate = new Date (year, month, i),
                    locale = navigator.language,
                    weekDay = objDate.toLocaleString (locale, {
                        weekday: "short"
                    });
                week_day.push (weekDay);
            }
        }, creator = (par) => {

            let that = par;
            datepicker_content = document.createElement ("div");
            datepicker_content.classList.add ("datepicker");
            datepicker_content.dataset.inputName = that.dataset.name;
            let input_cr = document.createElement ("input");
            input_cr.type = "hidden";
            input_cr.name = that.dataset.name;
            inputVal = input_cr;
            par.parentNode.appendChild (datepicker_content);
            par.parentNode.appendChild (input_cr);
            //input_val (input_cr);
            par = datepicker_content;
            datepicker_content.innerHTML =
                '<span class="tip"></span><div class="datepicker-head"><a href="#!" class="prev-date">&#8651;</a><a class="date-summary"></a><a href="#!" class="next-date">&#8652;</a></div><div class="datepicker-body"><div class="datepicker-body-head"></div><div class="datepicker-body-content"></div></div>';

        },
        setup = (content) => {
            datepicker_content = content;
            day_count = lastday (year, month);
            getArrayMonths ();
            getArrayday ();
            let day_c_parent_head = datepicker_content.querySelector (".datepicker-body-head"),
                day_c_parent_day = datepicker_content.querySelector (".datepicker-body-content");
            for (i in week_day) {
                if (i - 1 < 6) {
                    let day_c = document.createElement ("h6");
                    day_c.classList.add ("datepicker-days");
                    day_c.innerHTML = week_day[ i ];
                    day_c_parent_head.appendChild (day_c);
                } else {
                    break;
                }
            }
            for (i in days) {
                let day_c = document.createElement ("div");
                day_c.classList.add ("datepicker-days");
                day_c.href = "#!";
                day_c.innerHTML = days[ i ];
                day_c.tabIndex = days[ i ];
                day_c_parent_day.appendChild (day_c);

                if (i === day) {
                    day_c.classList.add ("active");
                }
                let x = 1;
                if (i < days[ x ]) {
                    day_c.classList.add ("date-gray");
                }
                day_c.addEventListener ("click", (e) => {
                        let that = e.target;
                        if (that.parentNode.querySelector (".datepicker-days.active") !== null) {
                            that.parentNode.querySelector (".datepicker-days.active").classList.remove ("active");
                            that.classList.add ("active");
                        }
                        day = that.tabIndex;
                        datepicker_content.classList.remove ("active");
                    },
                    false
                );
                x++;
            }
            if (days.length < 35) {
                for (let a = 1; a <= 35 - days.length; a++) {
                    let day_c = document.createElement ("span");
                    day_c.classList.add ("datepicker-days", "date-gray");
                    day_c.innerHTML = a;
                    day_c_parent_day.appendChild (day_c);
                }
            }
            let head_summary = datepicker_content.querySelector ("a.date-summary");
            dateSummaryText = head_summary;
            head_summary.innerHTML = day + " " + months_long[ month ] + " " + year;
        }, clears = (par = null) => {
            if (datepicker_content === null) {
                datepicker_content = document.querySelector (".datepicker.active")
            }
            let day = datepicker_content.querySelectorAll (".datepicker-days");
            for (i in day) {
                day[ i ].outerHTML = "";
            }
        }, input_val = () => {
            dateSummaryText.innerHTML = day + " " + months_long[ month ] + " " + year;
            inputVal.value = day + "-" + Number (month + 1) + "-" + year;
        };
    console.log(datepicker_activator)
    Array.prototype.forEach.call (datepicker_activator, (el) =>{
        creator (el);

        el.addEventListener ("click", function (e) {
            console.log(el.dataset.name)
            let inputName = el.dataset.name,
                datepicker_content = document.querySelector ("[data-input-name='" + inputName + "']"),
                input = document.querySelector ("input[name='" + inputName + "']");
            clears (el);
            setup(datepicker_content);
            datepicker_content = document.querySelector ("[data-input-name='" + inputName + "']");
            datepicker_content.classList.toggle ("active");
            document.body.classList.toggle ("overlay");
            // datepicker_content.style.left = el.offsetLeft + "px";
            // datepicker_content.style.top = el.offsetTop + el.offsetHeight + 10 + "px";

            prev_date = datepicker_content.querySelector (".prev-date");
            next_date = datepicker_content.querySelector (".next-date");
            menu = datepicker_content.querySelector ("a.date-summary");

            prev_date.addEventListener (
                "click",
                () => {
                    console.log ("prev")
                    if (month < 1) {
                        month = 11;
                        year -= 1;
                    } else {
                        month -= 1;
                    }
                    clears (el);
                    day_count = lastday (year, month);
                    setup (datepicker_content);
                }, false);

            next_date.addEventListener (
                "click",
                () => {
                    console.log ("next")
                    if (month > 10) {
                        month = 0;
                        year += 1;
                    } else {
                        month += 1;
                    }
                    clears (el);
                    day_count = lastday (year, month);
                    setup (datepicker_content);
                }, false);
            menu.addEventListener ("click",
                () => {
                    let c_menu = document.createElement ("div");
                    c_menu.classList.add ("datepicker-menu");
                    datepicker_content.appendChild (c_menu);
                    c_menu.classList.add ("active");
                    for (let i = year - 6; i <= year + 5; i++) {
                        let item = document.createElement ("aside");
                        item.classList.add ("datepicker-years");
                        item.tabIndex = i;
                        item.innerHTML = i;
                        if (year === i) {
                            item.classList.add ("active");
                        }
                        c_menu.appendChild (item);
                    }

                    let d_years = datepicker_content.querySelectorAll (".datepicker-years");

                    Array.prototype.forEach.call (d_years, (el_year) => {
                        el_year.addEventListener ("click", (e) => {
                            year = e.target.tabIndex;
                            el_year.parentNode.innerHTML = "";
                            input_val ();
                            for (i in months_long) {
                                if (i < 12) {
                                    let item = document.createElement ("aside");
                                    item.classList.add ("datepicker-months");
                                    item.tabIndex = i;
                                    item.innerHTML = months_long[ i ];
                                    c_menu.appendChild (item);
                                    if (month === i) {
                                        item.classList.add ("active");
                                    }
                                }
                            }
                            let d_months = datepicker_content.querySelectorAll (".datepicker-months");
                            Array.prototype.forEach.call (d_months, (i) => {
                                i.addEventListener ("click", function (e) {
                                    c_menu.classList.remove ("active");
                                    month = e.target.tabIndex;
                                    input_val ();
                                    datepicker_content.classList.remove ("active");
                                    datepicker_content.parentNode.querySelector ("input[type=hidden]").value = menu.innerHTML.replace (" ", "-");
                                }, true);
                            });
                        });
                    });
                },
                true
            );
        }, false);

        // window.addEventListener ("load", () => {
        //     setup ();
        // }, true);
    });


} ) ();
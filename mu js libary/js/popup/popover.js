let popover = () => {
    let popover = document.querySelectorAll ("[data-toggle=popover]")
    Array.prototype.forEach.call (popover, function (poper) {
        let set = poper.dataset,
            rect = poper.getClientRects (),
            rectContent,
            contentCoordinates,
            topContent,
            leftContent,
            popoverPosition = set.arrow !== undefined ? set.arrow : "bottom",
            createItem = function (tag, className, text) {
                let item = document.createElement (tag);
                item.className = className !== undefined && className !== "" ? className : null;
                item.innerHTML = text !== undefined && text !== "" ? text : null;
                //item =  document.body.append(item);
                return item
            };
        let popOverContent = createItem ("div", "popover-content arrow-" + popoverPosition),
            popOverTitle,
            popOverContentText,
            popOverFooter;
        if (set.title !== undefined && set.title !== "") {
            popOverTitle = createItem ("div", "popover-header", set.title);
        }
        if (set.content !== undefined && set.content !== "") {
            popOverContentText = createItem ("div", "popover-body", set.content);
        }
        if (set.footer !== undefined && set.footer !== "") {
            popOverFooter = createItem ("div", "popover-footer", set.footer);
        }

        poper.addEventListener ("click", function (e) {
            let IdGenerate = '_' + Math.random ().toString (36).substr (2, 9),
                popoverHref = e.target.dataset.popoverHref,
                query = document.querySelector (".popover-content[data-popover-id=" + popoverHref + "]");
            if (query) {
                e.target.removeAttribute ("data-popover-href");
                query.remove ();
                e.preventDefault ();
            } else {
                e.target.dataset.popoverHref = IdGenerate;
                popOverContent.append (popOverTitle);
                popOverContent.append (popOverContentText);
                popOverContent.append (popOverFooter);
                document.body.append (popOverContent);
                popOverContent.classList.add ("show");
                popOverContent.dataset.popoverId = IdGenerate;
                rectContent = popOverContent.getClientRects ();
                //popover coordinate
                topContent = rect[ 0 ].y;
                leftContent = rect[ 0 ].x;
                console.log (rectContent, rect)

                if (rect[ 0 ].x + rectContent[ 0 ].width > window.innerWidth) {
                    leftContent = ( window.innerWidth - ( rect[ 0 ].x + rectContent[ 0 ].width ) ) / 2;
                    popOverContent.classList.toggle ("arrow-" + popoverPosition, "arrow-right")
                } else {
                    leftContent = popoverPosition === "left"
                        ? ( rect[ 0 ].left - rectContent[ 0 ].width - 12 )
                        : popoverPosition === "right"
                                      ? rect[ 0 ].right + 12
                                      : (rect[0].left - (rectContent[0].width/2) + (rect[0].width/2));
                }

                if (rect[ 0 ].y + rectContent[ 0 ].height > window.innerHeight) {
                    topContent = ( window.innerWidth - ( rect[ 0 ].y + rectContent[ 0 ].height ) ) / 2;
                } else {
                    topContent = popoverPosition === "top"
                        ? rect[ 0 ].y - rectContent[ 0 ].height - 12
                        : popoverPosition === "bottom"
                                     ? ( rect[ 0 ].y + rect[ 0 ].height + 12 )
                                     : ( rect[ 0 ].y - rectContent[ 0 ].height / 2 + rect[ 0 ].height / 2 );
                }
                leftContent = leftContent < 0 || leftContent > window.innerWidth ? 0 : leftContent;
                topContent = topContent < 0 || topContent > window.innerHeight ? 0 : topContent;
                console.log (leftContent)
                if (set.arrow === "top") {
                    contentCoordinates = "transform:translate3d(" + leftContent + "px," + topContent + "px,0px);";
                } else if (set.arrow === "right") {
                    contentCoordinates = "transform:translate3d(" + leftContent + "px," + topContent + "px,0px);";
                } else if (set.arrow === "left") {
                    contentCoordinates = "transform:translate3d(" + leftContent + "px," + topContent + "px,0px);";
                } else {
                    contentCoordinates = "transform:translate3d(" + leftContent + "px," + topContent + "px,0px);";
                }
                popOverContent.style.cssText = contentCoordinates;
            }


        });
    })
};
popover ();
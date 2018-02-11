/**
* delay
* showEffect
* hiddenEffect
* widths
* heights
*/
let modal = (trigger, parameter) => {
  this.trigger = trigger;
  this.parameter = parameter;
  if (this.parameter) {
    showEffect = this.parameter.showEffect || "show";
    hiddenEffect = this.parameter.hiddenEffect || "out";
    width = this.parameter.width || null;
    height = this.parameter.height || null;
    delay = Number(this.parameter.delay) || 490;
  } else {
    showEffect = "show";
    hiddenEffect = "out";
    width = null;
    height = null;
    delay = 490;
  }
  var trigger = this.trigger
    ? document.querySelectorAll(".modal-toggle" + this.trigger)
    : document.querySelectorAll(".modal-toggle");
  Array.prototype.forEach.call(trigger, function(el) {
    var toggleName = el.getAttribute("data-toggle");
    var modal_body = document.body.querySelector(".modal[data-type=" + toggleName + "]");
    var modal_content = modal_body.querySelector(".modal-content");
    modal_content.style.cssText = "width:" + width + ";height:" + height;

    el.onclick = function(event) {
      modal_body.classList.add(showEffect);
      modal_content.classList.add("in");
      var close = modal_content.querySelectorAll(".close");
      for (i in close) {
        close[i].onclick = function(event) {
          modal_content.classList.add(hiddenEffect);
          modal_content.classList.remove("in");
          var effect = setTimeout(() => {
            modal_body.classList.remove(showEffect);
            modal_content.classList.remove(hiddenEffect);
          }, delay);
        };
      }
    };
    document.addEventListener("click", function(event) {
      var isClickInside = el.contains(event.target) || modal_content.contains(event.target);
      if (!isClickInside) {
        if (modal_body.classList.contains(showEffect)) {
          modal_content.classList.add(hiddenEffect);
          modal_content.classList.remove("in");
          setTimeout(() => {
            modal_body.classList.remove(showEffect);
            modal_content.classList.remove(hiddenEffect);
          }, delay);
        }
      }
    });
    window.addEventListener("change", () => {
      var clone_mdl = document.body.querySelectorAll(".modal");
      Array.prototype.forEach.call(clone_mdl, function(el) {
        var cln = el.cloneNode(true);
        el.outerHTML = "";
        document.body.appendChild(cln);
      });
    });
  });
};

var view = function(el) {
  this.hide = function(delay, callback) {
    if (!delay) {
      el.style.display = "none";
    } else {
      var effect = setTimeout(function() {
        el.style.display = "none";
        return calback();
      }, delay);
      return window.clearTimeout(effect);
    }
    return this;
  };
  this.show = function(delay, callback) {
    if (!delay) {
      el.style.display = "block";
    } else {
      var effect = setTimeout(function() {
        el.style.display = "block";
        return calback();
      }, delay);
      return window.clearTimeout(effect);
    }
    return this;
  };
  this.toggle = function(delay, callback) {
    if (window.getComputedStyle(el).display === "none" || el.style.display === "none") {
      this.show(delay);
    } else {
      this.hide(delay);
    }
    return this;
  };
  return this;
};

let ajax = (parameter) => { //url, method, data, async, done
  this.parameter = parameter;
  this.parameter.method = typeof method !== 'undefined'
    ? method.toUpperCase()
    : 'GET';
  this.parameter.async = typeof async !== 'undefined'
    ? async
    : false;
  let xhReq = new XMLHttpRequest();

  if (this.parameter.method === 'POST') {
    xhReq.open(this.parameter.this.parameter.method, this.parameter.url, this.parameter.async);
    xhReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (document.querySelector('meta[name="csrf-token"]')) {
      xhReq.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute("content"));
    }
    if (typeof this.parameter.data === Object) {
      let query = [];
      for (let key in this.parameter.data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]));
      }
      this.parameter.data = query.join('&');
    }
    xhReq.onreadystatechange = function() {

      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        data = this.responseText;
        if (typeof this.parameter.data === Object) {
          data = JSON.parse(this.parameter.data);
        }
        return done(this.parameter.data);
      }
    };
    xhReq.send(this.parameter.data);
  } else {
    if (typeof this.parameter.data !== 'undefined' && this.parameter.data !== null) {
      this.parameter.url = this.parameter.url + '?' + this.parameter.data;
    }
    xhReq.open(this.parameter.method, this.parameter.url, this.parameter.async);
    xhReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhReq.send();
  }

};

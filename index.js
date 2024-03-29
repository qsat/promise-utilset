// Generated by CoffeeScript 1.7.1
(function() {
  var Promise, defer,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Promise = (require("es6-promise")).Promise;

  defer = function() {
    var p, reject, resolve;
    reject = resolve = null;
    p = new Promise(function(res, rej) {
      var _ref;
      return _ref = [res, rej], resolve = _ref[0], reject = _ref[1], _ref;
    });
    p.resolve = resolve;
    p.reject = reject;
    return p;
  };

  module.exports = {
    defer: defer,
    loadimg: function(src) {
      var d, i;
      d = defer();
      i = new Image;
      if (__indexOf.call(i, "onreadystatechange") >= 0) {
        i.onreadystatechange = function(e) {
          if (i.readyState === "loaded" || i.readyState === "complete") {
            return d.resolve();
          }
        };
      } else {
        i.onload = function() {
          return d.resolve();
        };
        i.onerror = function() {
          return d.resolve();
        };
      }
      i.src = src;
      return d;
    },
    wait: function(ms) {
      var d, id;
      d = defer();
      id = setTimeout(d.resolve(), ms);
      d.then(null, function() {
        return clearTimeout(id);
      });
      return d;
    },
    transEnd: function(e) {
      var d;
      d = defer();
      e.addEventListener("webkitTransitionEnd", d.resolve, false);
      e.addEventListener("mozTransitionEnd", d.resolve, false);
      e.addEventListener("msTransitionEnd", d.resolve, false);
      e.addEventListener("oTransitionEnd", d.resolve, false);
      e.addEventListener("transitionend", d.resolve, false);
      d.then(function() {
        e.removeEventListener("webkitTransitionEnd", d.resolve, false);
        e.removeEventListener("mozTransitionEnd", d.resolve, false);
        e.removeEventListener("msTransitionEnd", d.resolve, false);
        e.removeEventListener("oTransitionEnd", d.resolve, false);
        return e.removeEventListener("transitionend", d.resolve, false);
      });
      return d;
    }
  };

}).call(this);

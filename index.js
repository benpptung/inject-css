'use strict';

var inserted = {};

module.exports = function(css, options) {

  if (inserted[css]) return;
  inserted[css] = true;

  var elm = document.createElement('style');
  elm.setAttribute('type', 'text/css');

  if ('textContent' in elm) {
    elm.textContent = css;
  }
  else {
    elm.styleSheet.cssText = css;
  }

  var head = document.getElementsByTagName('head')[0];
  if (options && options.prepend) {
    head.insertBefore(elm, head.childNodes[0]);
  } else {
    head.appendChild(elm);
  }

  return function() {
    delete inserted[css];
    head.removeChild(elm);
  };
};
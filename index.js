'use strict'

var inserted = {}
var is_client = typeof window === 'object'

exports = module.exports = function(css, options) {

  if (!css) return nop
  if (inserted[css]) return nop

  inserted[css] = true

  var elm = null
  var head = null

  if (is_client) {
    elm = document.createElement('style')
    elm.setAttribute('type', 'text/css')

    if ('textContent' in elm) {
      elm.textContent = css
    }
    else {
      elm.styleSheet.cssText = css
    }

    head = document.getElementsByTagName('head')[0]
    if (options && options.prepend) {
      head.insertBefore(elm, head.childNodes[0])
    }
    else {
      head.appendChild(elm)
    }
  }

  return removeCss

  function removeCss() {
    delete inserted[css]

    if (!is_client) return
    head.removeChild(elm)
  }
}

exports.getCachedCss = function() {
  return Object.keys(inserted)
}
exports.delCachedCss = function() {
  inserted = {}
}

function nop(){ }

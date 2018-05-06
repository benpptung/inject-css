'use strict'

var inserted = {}
var session = {}
var is_client = typeof window === 'object'

/**
 * insert css inside head tag. and return a function to remove css and cached
 * @param  {string} css     css rules string
 * @param  {object} options
 * @return {function}       remove the style element and cached css
 */
exports = module.exports = function(css, options) {
  return insert(inserted, css, options)
}

/**
 * same as module.exports. This for server side rendering
 * if called inside a session.
 * @param  {string} css     css rules string
 * @param  {object} options
 * @return {function}       remove the style element and cached css
 */
exports.session = function(css, options) {
  return insert(session, css, options)
}

/**
 * return css strings in array
 * @return {array}
 */
exports.getCss = getCss
function getCss() {
  return Object.keys(inserted).concat(Object.keys(session))
}
exports.cleanAllCss = function() {
  cleanStore(inserted)
  cleanStore(session)
}

exports.getCssAndResetSess = function() {
  var css = getCss()
  cleanStore(session)
  return css
}
exports.cleanSessCss = function() {
  cleanStore(session)
}

function cleanStore(store) {
  var arr = Object.keys(store)
  for (var i = 0, len = arr.length; i < len; ++i) {
    var fn = store[arr[i]]
    delete store[arr[i]]
    fn()
  }
}
function insert(store, css, options) {

  if (!css) return nop
  if (store[css]) return store[css]
  store[css] = removeCss

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

  var called = false // avoid double call
  return removeCss

  function removeCss() {
    if (called) return
    called = true

    delete store[css]
    if (!is_client) return
    head.removeChild(elm)
  }
}
function nop(){ }

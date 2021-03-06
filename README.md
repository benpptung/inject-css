inject css into the head and return a function to delete


##### Using with browserify

```

const inject = require('inject-css')
const cssStr = require('./styl.scss')
const removeCss = inject(cssStr)

// call removeCss later to remove dom element and cached css

```

Super easy to work with React to add CSS via in SSR or client side


#### Usage

In a general React component: `react-example.js`

```jsx
'use strict'

/**
 * Module Dependencies
 */
const React = require('react')
const is = require('prop-types')
const inherits = require('inherits')
const inject = require('inject-css')

// cbe67ad8 hash auto-generated by IDE template, e.g. smart template in atom
// classhash refer to https://github.com/benpptung/classhash

const classhash = require('classhash')('cbe67ad8')

/**
 * inherits and expose module
 */
inject(require('./styl.scss'))
inherits(ReactExample, React.Component)
module.exports = ReactExample
ReactExample.defaultProps = {}
ReactExample.propTypes = {

  // every React component should have a className prop, so you 
  // can add class using classhash module
  className: is.string
}
const prototype = ReactExample.prototype

/**
 * @constructor
 */
function ReactExample(props) {
  React.Component.call(this, props)
  this.state = {}

  this.classes = classhash({
    'container': props.className
  })
  this.styles = Object.defineProperties({}, {
    'container': {
      get: _=> {
        // write dynamically style here, 
        return {}
      }
    }
  })
}

/**
 * @public
 * @return {ReactElement}
 */
prototype.render = function() {

  var c = this.classes
  var s = this.styles

  return <div className={c['container']} style={s['container']}>

  </div>
}

if (process.env.NODE_ENV !== 'production') {
  ReactExample.displayName = 'ReactExample'
}
```

write the component's css: `styl.scss`

```
$h: cbe67ad8;

  // use atom snippet to auto add the hash, e.g.
  //  '.source.css.scss':
  //    'add hash':
  //      'prefix': 'ah'
  //      'body': '$1#{$h}' 

.container#{$h} {


}

```

In SSR, render the string 
```
'use strict'

const inject = require('inject-css')
const ssr = require('ssr').ReactExample

let ssrHtml = ReactDOMServer.renderToString(
  React.createElement(ssr.ReactExample, null, null)
)


// if inject.session called inside a component, it will clean it automatically
let ssrCSS = inject.getCssAndResetSess().join('')

res.render('index', {ssrHtml, ssrCSS})

```


The above example write React component in traditional prototype inheritance javascript. Yes, it works.
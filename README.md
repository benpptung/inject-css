inject css into the head and return a function to delete


##### Using with browserify

```

const inject = require('inject-css')
const cssStr = require('./styl.scss')
const removeCss = inject(cssStr)

// call removeCss later to remove dom element and cached css

```

Super easy to work with React to add CSS via in SSR or client side

It's completely wrong to render CSS via style object in React. You shou
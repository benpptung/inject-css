inject css into the head and return a function to delete


##### Using with browserify

```

const inject = require('inject-css')
const cssStr = require('./styl.scss')
const removeCss = inject(cssStr)

// call removeCss later to remove dom element and cached css

```

##### For server rendering

get all css inserted by `inject-css`, and render in server


```
const allcss = inject.getCachedCss()

inject.delCachedCss() // clean cached css

```



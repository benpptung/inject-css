inject css into the head and return a function to delete


##### Using with browserify

```

const inject = require('inject-css')

const removeCss = inject(require('./styl.scss'))

removeCss() // remove css

```

##### React server rendering

const allcss = inject.getCachedCss()

inject.
This fork from `https://www.npmjs.com/package/express-module-loader`

```js
'use strict'
const { auto } = require('async')

const moduleLoader = require('global-module-loader')

module.exports = () => cb => auto({
  loadHelpers: cb => moduleLoader.loadHelpers(CONFIG.ROOT, cb),
  loadControllers: cb => moduleLoader.loadController(CONFIG.ROOT, cb),
  loadSchema: cb => moduleLoader.loadSchema(CONFIG.ROOT, cb)
}, cb)
```

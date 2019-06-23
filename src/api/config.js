
const LRU = require("lru-cache")
    , options = {
    max: 500
    , length: function (n, key) { return n * 2 + key.length }
    , dispose: function (key, n) { n.close() }
    , maxAge: 1000 * 60 * 60 }

let config
if (process.__API__) {
    config = process.__API__
} else {
    config = process.__API__ = {
        api: '/api',
        cached:new LRU(options),
        cachedItem: {}
    }
}

module.exports = config

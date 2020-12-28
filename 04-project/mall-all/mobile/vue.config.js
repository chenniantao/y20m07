const dev = require('./webpack.dev.js')
const prod = require('./webpack.prod.js')

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devServer: {
        port: 3003,
        proxy: {
            '/v1': {
                target: 'http://127.0.0.1:3000',
                ws: false,
                changeOrigin: true
            }
        }
    },
})
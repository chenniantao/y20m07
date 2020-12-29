const path = require('path')
// const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/index.less')
            ]
        },
    },   
    css: {
        loaderOptions: {
            less: {
                //自定义主题
                modifyVars: {
                    'hack': 'true; @import "' + path.resolve(__dirname, './src/assets/less/them.less') + '";'
                }
            },
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('pages', path.resolve(__dirname, './src/pages'))
            .set('util', path.resolve(__dirname, './src/util'))
            .set('api', path.resolve(__dirname, './src/api'))
            .set('components', path.resolve(__dirname, './src/components'))
    },
}